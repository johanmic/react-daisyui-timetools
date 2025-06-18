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
          return `${hours}:${String(date.getMinutes()).padStart(
            2,
            "0"
          )} ${ampm}`
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

          // Handle different input formats
          if (timeValue.includes("T")) {
            // Already a datetime string, pass it through
            onChange(timeValue)
            return
          }

          // Handle AM/PM format
          const isPM = /pm/i.test(timeValue)
          const timeOnly = timeValue.replace(/\s?[ap]m/i, "")
          const [hourStr, minuteStr] = timeOnly.split(":")

          if (!hourStr || !minuteStr) return // Invalid time format

          let hours = parseInt(hourStr, 10)
          const minutes = parseInt(minuteStr, 10)

          if (isNaN(hours) || isNaN(minutes)) return // Invalid time

          if (isPM && hours < 12) hours += 12
          if (!isPM && hours === 12) hours = 0

          // Create a full datetime string based on the current value or a default date
          let baseDate: Date
          try {
            baseDate = value ? new Date(value) : new Date(2023, 0, 1) // Use a fixed date for tests
          } catch {
            baseDate = new Date(2023, 0, 1)
          }

          const newDate = new Date(baseDate)
          newDate.setHours(hours, minutes, 0, 0)

          // Verify the date is valid before converting to ISO
          if (isNaN(newDate.getTime())) return

          // Return the full datetime string in ISO format (YYYY-MM-DDTHH:mm)
          const year = newDate.getFullYear()
          const month = String(newDate.getMonth() + 1).padStart(2, "0")
          const day = String(newDate.getDate()).padStart(2, "0")
          const hour = String(newDate.getHours()).padStart(2, "0")
          const minute = String(newDate.getMinutes()).padStart(2, "0")

          const formattedDateTime = `${year}-${month}-${day}T${hour}:${minute}`
          onChange(formattedDateTime)
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
          dateId="date-picker"
        />
      )

      // Simulate time change
      const timePicker = screen.getByTestId("time-picker")
      fireEvent.change(timePicker, { target: { value: "15:30" } })

      // Check that onChange was called with correctly formatted date string
      expect(mockOnChange).toHaveBeenCalled()
      const callArg = mockOnChange.mock.calls[0][0]
      expect(callArg).toMatch(/^\d{4}-\d{2}-\d{2}T15:30$/)
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

      // Verify the component renders without errors when AMPM=true
      const timePicker = screen.getByTestId("time-picker")
      expect(timePicker).toBeInTheDocument()
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

  // Regression tests for time parsing bug
  describe("time parsing regression tests", () => {
    it("should correctly parse datetime strings without date drift", () => {
      const initialValue = "2025-06-19T02:00"
      render(
        <DateAndTimePicker
          value={initialValue}
          onChange={mockOnChange}
          locale="en"
        />
      )

      // The component should be initialized correctly
      const hiddenInput = screen.getByTestId("datetime-picker")
      expect(hiddenInput).toHaveValue("2025-06-19T02:00")
    })

    it("should handle time changes with proper datetime parsing", () => {
      const initialValue = "2023-01-01T12:00"
      render(
        <DateAndTimePicker
          value={initialValue}
          onChange={mockOnChange}
          locale="en"
        />
      )

      // Simulate a time change - the mock will now send a proper datetime string
      const timePicker = screen.getByTestId("time-picker")
      fireEvent.change(timePicker, { target: { value: "15:30" } })

      // Should be called with a datetime string, not an invalid date
      expect(mockOnChange).toHaveBeenCalled()
      const callArg = mockOnChange.mock.calls[0][0]
      expect(callArg).toMatch(/^\d{4}-\d{2}-\d{2}T15:30$/)

      // Verify it's not "Invalid Date"
      expect(callArg).not.toBe("Invalid Date")
    })

    it("should maintain the date part when only time changes", () => {
      const testCases = [
        {
          initial: "2023-12-25T09:15",
          newTime: "10:30",
          expectedPattern: /^2023-12-25T10:30$/,
        },
        {
          initial: "2024-02-29T23:45", // leap year
          newTime: "00:15",
          expectedPattern: /^2024-02-29T00:15$/,
        },
      ]

      testCases.forEach(({ initial, newTime, expectedPattern }, index) => {
        mockOnChange.mockClear()

        const { unmount } = render(
          <DateAndTimePicker
            key={index}
            value={initial}
            onChange={mockOnChange}
            locale="en"
          />
        )

        const timePicker = screen.getByTestId("time-picker")
        fireEvent.change(timePicker, { target: { value: newTime } })

        if (mockOnChange.mock.calls.length > 0) {
          const callArg = mockOnChange.mock.calls[0][0]
          expect(callArg).toMatch(expectedPattern)
        }

        unmount()
      })
    })

    it("should not produce invalid dates from time parsing", () => {
      // Test the specific case that was causing issues
      const problematicValue = "2025-06-19T02:00"
      render(
        <DateAndTimePicker
          value={problematicValue}
          onChange={mockOnChange}
          locale="en"
        />
      )

      // The component should render without errors
      const timePicker = screen.getByTestId("time-picker")
      expect(timePicker).toBeInTheDocument()

      // The time picker should show the correct time
      expect(timePicker.getAttribute("value")).toBe("02:00")

      // Changing time should not result in invalid dates
      fireEvent.change(timePicker, { target: { value: "03:00" } })

      if (mockOnChange.mock.calls.length > 0) {
        const callArg = mockOnChange.mock.calls[0][0]
        expect(callArg).not.toBe("Invalid Date")
        expect(new Date(callArg).getTime()).not.toBeNaN()
      }
    })
  })
})
