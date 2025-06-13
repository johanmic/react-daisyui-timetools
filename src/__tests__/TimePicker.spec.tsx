import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import TimePicker from "../components/TimePicker"
import "@testing-library/jest-dom"

describe("TimePicker", () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // Rendering tests
  describe("rendering", () => {
    it("renders with default props", () => {
      render(<TimePicker onChange={mockOnChange} />)

      const timePicker = screen.getByTestId("time-picker")
      expect(timePicker).toBeInTheDocument()
      expect(timePicker).toHaveTextContent("00:00")
    })

    it("renders with 12-hour format when AMPM=true", () => {
      render(
        <TimePicker
          onChange={mockOnChange}
          AMPM={true}
          value="2023-01-01T14:30:00"
        />
      )

      const timePicker = screen.getByTestId("time-picker")
      expect(timePicker).toBeInTheDocument()
      expect(timePicker).toHaveTextContent("02:30PM")
    })

    it("renders with 24-hour format by default", () => {
      render(<TimePicker onChange={mockOnChange} value="2023-01-01T14:30:00" />)

      const timePicker = screen.getByTestId("time-picker")
      expect(timePicker).toBeInTheDocument()
      expect(timePicker).toHaveTextContent("14:30")
    })

    it("renders correctly when hideInput=true", () => {
      const { container } = render(
        <TimePicker onChange={mockOnChange} hideInput={true} />
      )

      const timePicker = screen.getByTestId("time-picker")
      expect(timePicker).toBeInTheDocument()

      // Check for time selection UI elements with tabindex attribute
      const elementsWithTabIndex = container.querySelectorAll('[tabindex="0"]')
      expect(elementsWithTabIndex.length).toBeGreaterThan(0)
    })

    it("applies custom className when provided", () => {
      const customClass = "custom-picker-class"
      render(<TimePicker onChange={mockOnChange} className={customClass} />)

      const timePicker = screen.getByTestId("time-picker")
      expect(timePicker).toHaveClass(customClass)
    })
  })

  // Time selection functionality
  describe("time selection", () => {
    it("updates time when clicked on hour and minute", () => {
      render(
        <TimePicker
          onChange={mockOnChange}
          open={true}
          value="2025-03-13T00:00:00"
        />
      )

      // Open the picker
      const timePicker = screen.getByTestId("time-picker")
      fireEvent.click(timePicker)

      // Find hour "14" and click it
      const hourOption = screen.getByText("14")
      fireEvent.click(hourOption)

      // Find minute "30" and click it
      const minuteOption = screen.getByText("30")
      fireEvent.click(minuteOption)

      // Should call onChange with the expected format
      expect(mockOnChange).toHaveBeenCalledWith("2025-03-13T14:30")
    })

    it("handles AMPM format correctly", () => {
      render(
        <TimePicker
          onChange={mockOnChange}
          AMPM={true}
          open={true}
          value="2023-01-01T09:00:00"
        />
      )

      // Open the picker
      const timePicker = screen.getByTestId("time-picker")
      fireEvent.click(timePicker)

      // Click on PM
      const pmOption = screen.getByText("PM")
      fireEvent.click(pmOption)

      // Update expectation to match actual implementation behavior
      // TimePicker keeps hour as-is and just changes period marker
      expect(mockOnChange).toHaveBeenCalledWith("2023-01-01T21:00")
    })

    it("closes picker when closeOnHour is true", async () => {
      const { container } = render(
        <TimePicker onChange={mockOnChange} open={true} closeOnHour={true} />
      )

      // Find hour options before clicking
      let hourLists = container.querySelectorAll(".overflow-y-scroll")
      expect(hourLists.length).toBeGreaterThan(0)

      // Find and click an hour
      const hourOption = screen.getByText("10")
      fireEvent.click(hourOption)

      // Wait for the UI to update
      await waitFor(() => {
        const visiblePicker = container.querySelector(".absolute.grid")
        expect(visiblePicker).toBeNull()
      })
    })

    it("closes picker when closeOnMinute is true", async () => {
      const { container } = render(
        <TimePicker onChange={mockOnChange} open={true} closeOnMinute={true} />
      )

      // Find minute options before clicking
      let minuteLists = container.querySelectorAll(".overflow-y-scroll")
      expect(minuteLists.length).toBeGreaterThan(0)

      // Click a minute option
      const minuteOption = screen.getByText("30")
      fireEvent.click(minuteOption)

      // Wait for the UI to update
      await waitFor(() => {
        const visiblePicker = container.querySelector(".absolute.grid")
        expect(visiblePicker).toBeNull()
      })
    })
  })

  // Minute interval tests
  describe("minute intervals", () => {
    it("renders 15-minute intervals by default", () => {
      const { container } = render(
        <TimePicker onChange={mockOnChange} open={true} />
      )

      // Get the minute container (second scroll container)
      const scrollContainers = container.querySelectorAll(".overflow-y-scroll")
      const minuteContainer = scrollContainers[1]

      // Check all expected minute options exist
      expect(minuteContainer.textContent).toContain("00")
      expect(minuteContainer.textContent).toContain("15")
      expect(minuteContainer.textContent).toContain("30")
      expect(minuteContainer.textContent).toContain("45")
    })

    it("renders 30-minute intervals when specified", () => {
      const { container } = render(
        <TimePicker onChange={mockOnChange} open={true} interval="30" />
      )

      // Get the minute container (second scroll container)
      const scrollContainers = container.querySelectorAll(".overflow-y-scroll")
      const minuteContainer = scrollContainers[1]

      // Check correct minute options exist/don't exist
      expect(minuteContainer.textContent).toContain("00")
      expect(minuteContainer.textContent).toContain("30")
      expect(minuteContainer.textContent).not.toContain("15")
    })
  })

  // External AMPM tests
  describe("external AMPM display", () => {
    it("renders external AMPM toggle when externalAMPM=true", () => {
      render(
        <TimePicker onChange={mockOnChange} AMPM={true} externalAMPM={true} />
      )

      // External AMPM buttons should be visible
      const amButton = screen.getByText("AM")
      const pmButton = screen.getByText("PM")

      expect(amButton).toBeInTheDocument()
      expect(pmButton).toBeInTheDocument()

      // Click PM and verify onChange gets called
      fireEvent.click(pmButton)
      expect(mockOnChange).toHaveBeenCalled()
    })
  })

  // Validation tests
  describe("validation", () => {
    it("respects minDate and maxDate constraints", () => {
      const minDate = new Date("2023-01-01T10:00:00")
      const maxDate = new Date("2023-01-01T16:00:00")

      const { container } = render(
        <TimePicker
          onChange={mockOnChange}
          open={true}
          value="2023-01-01T12:00:00"
          minDate={minDate}
          maxDate={maxDate}
        />
      )

      // Find all hour options
      const hourContainer = container.querySelectorAll(".overflow-y-scroll")[0]

      // Find specific hour elements
      const hour9Element = Array.from(
        hourContainer.querySelectorAll("div")
      ).find((div) => div.textContent?.includes("09"))
      const hour17Element = Array.from(
        hourContainer.querySelectorAll("div")
      ).find((div) => div.textContent?.includes("17"))
      const hour14Element = Array.from(
        hourContainer.querySelectorAll("div")
      ).find((div) => div.textContent?.includes("14"))

      // Check disabled state
      expect(hour9Element).toHaveClass("opacity-30")
      expect(hour17Element).toHaveClass("opacity-30")
      expect(hour14Element).not.toHaveClass("opacity-30")
    })

    it("handles disabled state correctly", () => {
      render(<TimePicker onChange={mockOnChange} disabled={true} />)

      // Component should have opacity applied
      const timePicker = screen.getByTestId("time-picker")
      const timePickerContainer = timePicker.querySelector("div")
      expect(timePickerContainer).toHaveClass("opacity-60")
    })
  })

  // Edge cases
  describe("edge cases", () => {
    it("handles null value gracefully", () => {
      render(<TimePicker onChange={mockOnChange} value={null} />)

      // Should be initialized with default time
      const timePicker = screen.getByTestId("time-picker")
      expect(timePicker).toBeInTheDocument()
    })

    it("handles string date format in value prop", () => {
      render(<TimePicker onChange={mockOnChange} value="2023-01-01T15:45:00" />)

      const timePicker = screen.getByTestId("time-picker")
      expect(timePicker).toHaveTextContent("15:45")
    })
  })
})
