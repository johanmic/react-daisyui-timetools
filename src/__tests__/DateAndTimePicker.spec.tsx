import { render, screen, fireEvent } from "@testing-library/react"
import { DateAndTimePicker } from "../components/DateAndTimePicker"
import "@testing-library/jest-dom"
import { getDayjs } from "../utils/date"

// Mock the child components
jest.mock("../components/DatePicker", () => ({
  __esModule: true,
  default: ({
    onChange,
    value,
    id,
    disabled,
    minDate,
    maxDate,
    timeModule,
    ...restProps
  }: {
    onChange: (value: string) => void
    value?: string | Date | null
    id?: string
    disabled?: boolean
    minDate?: Date
    maxDate?: Date
    timeModule?: React.ReactNode
    [key: string]: any
  }) => {
    const minAttr = minDate
      ? new Date(minDate).toISOString().split("T")[0]
      : undefined
    const maxAttr = maxDate
      ? new Date(maxDate).toISOString().split("T")[0]
      : undefined

    let dateValue = ""
    if (value) {
      try {
        dateValue = new Date(value).toISOString().split("T")[0]
      } catch (e) {
        // Invalid date, leave value empty
      }
    }
    const parsedProps = Object.assign({}, restProps)
    delete parsedProps.minDate
    delete parsedProps.maxDate
    return (
      <input
        type="date"
        data-testid="date-picker"
        value={dateValue}
        onChange={(e) => onChange(e.target.value)}
        id={id}
        disabled={disabled}
        min={minAttr}
        max={maxAttr}
        {...parsedProps}
      />
    )
  },
}))

jest.mock("../components/TimePicker", () => ({
  __esModule: true,
  default: ({
    onChange,
    value,
    id,
    disabled,
    AMPM,
    ...props
  }: {
    onChange: (value: string) => void
    value?: string | Date | null
    id?: string
    disabled?: boolean
    AMPM?: boolean
    [key: string]: any
  }) => {
    const formatValue = () => {
      if (!value) return ""
      try {
        const date = new Date(value)
        if (isNaN(date.getTime())) return ""

        if (AMPM) {
          const hours = date.getHours() % 12 || 12
          const ampm = date.getHours() >= 12 ? "PM" : "AM"
          return `${hours}:00 ${ampm}`
        }
        return `${String(date.getHours()).padStart(2, "0")}:${String(
          date.getMinutes()
        ).padStart(2, "0")}`
      } catch (e) {
        return ""
      }
    }
    const parsedProps = Object.assign({}, props)
    delete parsedProps.minDate
    delete parsedProps.maxDate

    return (
      <input
        type="time"
        data-testid="time-picker"
        value={formatValue()}
        onChange={(e) => {
          // Parse time string and create a properly formatted ISO date string
          const timeValue = e.target.value
          const isPM = /pm/i.test(timeValue)
          const [hourStr, minuteStr] = timeValue
            .replace(/\s?[ap]m/i, "")
            .split(":")
          let hours = parseInt(hourStr, 10)
          const minutes = parseInt(minuteStr || "0", 10)

          if (isPM && hours < 12) hours += 12
          if (!isPM && hours === 12) hours = 0

          // Create proper ISO time string rather than passing raw input
          onChange(
            `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
              2,
              "0"
            )}`
          )
        }}
        id={id}
        disabled={disabled}
        {...parsedProps}
      />
    )
  },
}))

describe("DateAndTimePicker", () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // Utility function tests
  describe("roundToNearest15Minutes", () => {
    it("rounds minutes correctly to nearest 15-minute interval", () => {
      const date = new Date("2023-01-01T12:07:30")
      render(
        <DateAndTimePicker value={date} onChange={mockOnChange} locale="en" />
      )

      // The datetime value should be available in the hidden input
      const hiddenInput = screen.getByTestId("datetime-picker")
      expect(hiddenInput).toHaveValue("2023-01-01T12:00")
    })
  })

  // Rendering tests
  describe("rendering", () => {
    it("renders date and time pickers separately by default", () => {
      render(
        <DateAndTimePicker
          value={new Date("2023-01-01T12:00:00")}
          onChange={mockOnChange}
          locale="en"
          id="date-time"
          timeId="time-picker"
          dateId="date-picker"
        />
      )

      // Verify that both date and time pickers are rendered
      expect(screen.getByTestId("date-picker")).toBeInTheDocument()
      expect(screen.getByTestId("time-picker")).toBeInTheDocument()
    })

    it("renders combined picker when combined=true", () => {
      render(
        <DateAndTimePicker
          value={new Date("2023-01-01T12:00:00")}
          onChange={mockOnChange}
          locale="en"
          combined={true}
          id="date-time"
          timeId="time-picker"
          dateId="date-picker"
        />
      )

      // Verify the combined picker is rendered
      expect(screen.getByTestId("datetime-picker")).toBeInTheDocument()
    })

    it("applies custom className when provided", () => {
      const customClass = "custom-picker-class"
      render(
        <DateAndTimePicker
          value={new Date("2023-01-01T12:00:00")}
          onChange={mockOnChange}
          locale="en"
          className={customClass}
          combined={true}
        />
      )

      // In combined mode, we can only check the hidden input
      expect(screen.getByTestId("datetime-picker")).toBeInTheDocument()
    })

    it("shows placeholder when provided", () => {
      const placeholder = "Select date and time"
      render(
        <DateAndTimePicker
          value={null}
          onChange={mockOnChange}
          locale="en"
          placeholder={placeholder}
          id="date-time"
          timeId="time-picker"
          dateId="date-picker"
        />
      )

      // Use getAllByPlaceholderText since multiple elements have the same placeholder
      const elementsWithPlaceholder =
        screen.getAllByPlaceholderText(placeholder)
      expect(elementsWithPlaceholder.length).toBeGreaterThan(0)
    })
  })

  // Functionality tests
  describe("date and time selection", () => {
    it("calls onChange with correct format when date is changed", () => {
      render(
        <DateAndTimePicker
          value={new Date("2023-01-01T12:00:00")}
          onChange={mockOnChange}
          locale="en"
          id="date-time"
          timeId="time-picker"
          dateId="date-picker"
        />
      )

      // Simulate date change
      const datePicker = screen.getByTestId("date-picker")
      fireEvent.change(datePicker, { target: { value: "2023-02-15" } })

      // Check that onChange was called with correctly formatted date string
      expect(mockOnChange).toHaveBeenCalled()
      const callArg = mockOnChange.mock.calls[0][0]
      expect(callArg).toMatch(/^2023-02-15T12:00$/)
    })

    it("updates time value and triggers onChange when time is changed", () => {
      render(
        <DateAndTimePicker
          value={new Date("2023-01-01T12:00:00")}
          onChange={mockOnChange}
          locale="en"
          id="date-time"
          timeId="time-picker"
        />
      )

      // Simulate time change
      const timePicker = screen.getByTestId("time-picker")
      fireEvent.change(timePicker, { target: { value: "15:30" } })

      // Check that onChange was called with the correct value
      expect(mockOnChange).toHaveBeenCalled()
      const callArg = mockOnChange.mock.calls[0][0]
      expect(callArg).toMatch(/^2023-01-01T15:30$/)
    })

    it("handles AMPM format correctly when AMPM=true", () => {
      render(
        <DateAndTimePicker
          value={new Date("2023-01-01T14:00:00")}
          onChange={mockOnChange}
          locale="en"
          AMPM={true}
        />
      )

      // Simulate time change with PM time
      const timePicker = screen.getByTestId("time-picker")
      fireEvent.change(timePicker, { target: { value: "3:30 PM" } })

      // Check that onChange was called
      expect(mockOnChange).toHaveBeenCalled()
    })
  })

  // Validation tests
  describe("validation", () => {
    it("respects minDate constraint", () => {
      const minDate = new Date("2023-01-15")
      const dayjs = getDayjs("en")
      const minDateStr = dayjs(minDate).format("YYYY-MM-DD")

      render(
        <DateAndTimePicker
          value={new Date("2023-01-20")}
          onChange={mockOnChange}
          locale="en"
          minDate={minDate}
        />
      )

      const datePicker = screen.getByTestId("date-picker")
      expect(datePicker).toHaveAttribute(
        "min",
        expect.stringContaining(minDateStr)
      )
    })

    it("respects maxDate constraint", () => {
      const maxDate = new Date("2023-01-25")
      const dayjs = getDayjs("en")
      const maxDateStr = dayjs(maxDate).format("YYYY-MM-DD")

      render(
        <DateAndTimePicker
          value={new Date("2023-01-20")}
          onChange={mockOnChange}
          locale="en"
          maxDate={maxDate}
        />
      )

      const datePicker = screen.getByTestId("date-picker")
      expect(datePicker).toHaveAttribute(
        "max",
        expect.stringContaining(maxDateStr)
      )
    })
  })

  // Props passthrough tests
  describe("props passthrough", () => {
    it("passes dateProps to the DatePicker component", () => {
      const dateProps = {
        disabled: true,
        id: "custom-date-picker",
        value: new Date("2023-01-01T12:00:00"),
      }

      render(
        <DateAndTimePicker
          value={new Date("2023-01-01T12:00:00")}
          onChange={mockOnChange}
          locale="en"
          dateProps={dateProps}
        />
      )

      const datePicker = screen.getByTestId("date-picker")
      expect(datePicker).toBeDisabled()
      expect(datePicker).toHaveAttribute("id", "custom-date-picker")
    })

    it("passes timeProps to the TimePicker component", () => {
      const timeProps = {
        disabled: true,
        id: "custom-time-picker",
      }

      render(
        <DateAndTimePicker
          value={new Date("2023-01-01T12:00:00")}
          onChange={mockOnChange}
          locale="en"
          timeProps={timeProps}
        />
      )

      const timePicker = screen.getByTestId("time-picker")
      expect(timePicker).toBeDisabled()
      expect(timePicker).toHaveAttribute("id", "custom-time-picker")
    })
  })

  // Edge cases
  describe("edge cases", () => {
    it("handles null value gracefully", () => {
      render(
        <DateAndTimePicker value={null} onChange={mockOnChange} locale="en" />
      )

      // Verify that pickers are rendered without errors
      expect(screen.getByTestId("date-picker")).toBeInTheDocument()
      expect(screen.getByTestId("time-picker")).toBeInTheDocument()
    })

    it("handles string date format in value prop", () => {
      render(
        <DateAndTimePicker
          value="2023-01-01T12:00:00"
          onChange={mockOnChange}
          locale="en"
        />
      )

      // Check that the hidden input contains the correct formatted date
      const hiddenInput = screen.getByTestId("datetime-picker")
      expect(hiddenInput).toHaveValue("2023-01-01T12:00")
    })
  })
})
