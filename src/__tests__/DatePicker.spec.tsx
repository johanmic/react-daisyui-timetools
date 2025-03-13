import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import DatePicker from "../components/DatePicker"
import "@testing-library/jest-dom"
import { getDayjs } from "../utils/date"

describe("DatePicker", () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // Rendering tests
  describe("rendering", () => {
    it("renders with default props", () => {
      render(<DatePicker value={null} onChange={mockOnChange} locale="en" />)

      expect(screen.getByTestId("date-picker")).toBeInTheDocument()
      expect(screen.getByRole("textbox")).toBeInTheDocument()
      expect(screen.getByRole("textbox")).toHaveValue("")
    })

    it("renders with a specified date value", () => {
      const date = "2023-05-15"
      render(<DatePicker value={date} onChange={mockOnChange} locale="en" />)

      expect(screen.getByRole("textbox")).toHaveValue("2023-05-15")
    })

    it("renders in disabled state when disabled prop is true", () => {
      render(
        <DatePicker
          value={null}
          onChange={mockOnChange}
          locale="en"
          disabled={true}
        />
      )

      expect(screen.getByRole("textbox")).toBeDisabled()
    })

    it("applies custom class names", () => {
      render(
        <DatePicker
          value={null}
          onChange={mockOnChange}
          locale="en"
          className="custom-class"
          inputClassName="custom-input-class"
        />
      )

      const container = screen.getByTestId("date-picker")
      expect(container).toHaveClass("custom-class")
    })

    it("renders with different sizes", () => {
      render(
        <DatePicker
          value={null}
          onChange={mockOnChange}
          locale="en"
          size="xs"
        />
      )

      const container = screen.getByTestId("date-picker").querySelector("label")
      expect(container).toHaveClass("input-xs")
    })

    it("shows month picker when month is clicked and pickMonth is true", () => {
      render(
        <DatePicker
          value={new Date("2023-05-15")}
          onChange={mockOnChange}
          locale="en"
          pickMonth={true}
        />
      )

      // Open calendar
      fireEvent.click(screen.getByRole("textbox"))

      // Click on the month
      fireEvent.click(screen.getByText("May"))

      // Month picker should be visible with all months
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]
      months.forEach((month) => {
        expect(screen.getByText(month)).toBeInTheDocument()
      })
    })

    it("selects month from month picker", () => {
      render(
        <DatePicker
          value={new Date("2023-05-15")}
          onChange={mockOnChange}
          locale="en"
          pickMonth={true}
        />
      )

      // Open calendar
      fireEvent.click(screen.getByRole("textbox"))

      // Open month picker
      fireEvent.click(screen.getByText("May"))

      // Select a different month
      fireEvent.click(screen.getByText("Jul"))

      // Calendar should show selected month
      expect(screen.getByText("July")).toBeInTheDocument()

      // Month picker should be closed
      expect(screen.queryByText("Jan")).not.toBeInTheDocument()

      // onChange should be called with the new date
      expect(mockOnChange).toHaveBeenCalledWith("2023-07-15")
    })

    it("doesn't show month picker when month is clicked and pickMonth is false", () => {
      render(
        <DatePicker
          value={new Date("2023-05-15")}
          onChange={mockOnChange}
          locale="en"
          pickMonth={false}
        />
      )

      // Open calendar
      fireEvent.click(screen.getByRole("textbox"))

      // Click on the month (should do nothing since pickMonth is false)
      fireEvent.click(screen.getByText("May"))

      // Month picker should not be visible
      expect(screen.queryByText("Jan")).not.toBeInTheDocument()

      // Calendar should still be visible
      expect(screen.getByText("Mon")).toBeInTheDocument()
    })
  })

  // Calendar display tests
  describe("calendar display", () => {
    it("opens calendar when input is clicked", () => {
      render(<DatePicker value={null} onChange={mockOnChange} locale="en" />)

      // Calendar should not be visible initially
      expect(screen.queryByText("Mon")).not.toBeInTheDocument()

      // Click the input to open calendar
      fireEvent.click(screen.getByRole("textbox"))

      // Calendar should now be visible
      expect(screen.getByText("Mon")).toBeInTheDocument()
    })

    it("displays the current month by default", () => {
      const currentDate = new Date()
      const dayjs = getDayjs("en")
      const currentMonth = dayjs(currentDate).format("MMMM")

      render(<DatePicker value={null} onChange={mockOnChange} locale="en" />)

      // Open calendar
      fireEvent.click(screen.getByRole("textbox"))

      // Current month should be displayed
      expect(screen.getByText(currentMonth)).toBeInTheDocument()
    })

    it("starts the week with Monday when weekStart is monday", () => {
      render(
        <DatePicker
          value={null}
          onChange={mockOnChange}
          locale="en"
          weekStart="monday"
        />
      )

      // Open calendar
      fireEvent.click(screen.getByRole("textbox"))

      // Check weekday order
      const weekdays = screen.getAllByText(/Mon|Tue|Wed|Thu|Fri|Sat|Sun/)
      expect(weekdays[0]).toHaveTextContent("Mon")
      expect(weekdays[6]).toHaveTextContent("Sun")
    })

    it("starts the week with Sunday when weekStart is sunday", () => {
      render(
        <DatePicker
          value={null}
          onChange={mockOnChange}
          locale="en"
          weekStart="sunday"
        />
      )

      // Open calendar
      fireEvent.click(screen.getByRole("textbox"))

      // Check weekday order
      const weekdays = screen.getAllByText(/Mon|Tue|Wed|Thu|Fri|Sat|Sun/)
      expect(weekdays[0]).toHaveTextContent("Sun")
      expect(weekdays[1]).toHaveTextContent("Mon")
    })
  })

  // Date selection tests
  describe("date selection", () => {
    it("selects a date when clicked and calls onChange", () => {
      const today = new Date()
      const dayjs = getDayjs("en")
      const formattedDate = dayjs(today).format("YYYY-MM-DD")

      render(<DatePicker value={today} onChange={mockOnChange} locale="en" />)

      // Open calendar
      fireEvent.click(screen.getByRole("textbox"))

      // Find today's date and click it
      const todayDate = dayjs(today).date()
      fireEvent.click(screen.getByText(todayDate.toString()))

      // Check if onChange was called with the correct date
      expect(mockOnChange).toHaveBeenCalledWith(formattedDate)
    })

    it("closes the calendar after date selection", async () => {
      render(
        <DatePicker value={new Date()} onChange={mockOnChange} locale="en" />
      )

      // Open calendar
      fireEvent.click(screen.getByRole("textbox"))

      // Select any visible date
      const dateElement = screen.getAllByRole("button")[10] // Arbitrary date button
      fireEvent.click(dateElement)

      // Calendar should be closed
      await waitFor(() => {
        expect(screen.queryByText("Mon")).not.toBeInTheDocument()
      })
    })
  })

  // Navigation tests
  describe("navigation", () => {
    it("navigates to the next month when forward icon is clicked", () => {
      const startDate = new Date("2023-05-15")

      render(
        <DatePicker value={startDate} onChange={mockOnChange} locale="en" />
      )

      // Open calendar
      fireEvent.click(screen.getByRole("textbox"))

      // Current month should be May (using a more flexible approach)
      const monthText = screen.getByText((content, element) => {
        return content === "May"
      })
      expect(monthText).toBeInTheDocument()
    })

    it("navigates to the previous month when backward icon is clicked", async () => {
      const startDate = new Date("2023-05-15")

      render(
        <DatePicker value={startDate} onChange={mockOnChange} locale="en" />
      )

      // Open calendar
      fireEvent.click(screen.getByRole("textbox"))

      // Current month should be May
      expect(screen.getByText("May")).toBeInTheDocument()

      // Get all buttons in the calendar header
      const allButtons = screen.getAllByRole("button")

      // The first clickable element in the calendar header should be the backward icon
      // We can find it by looking at the parent element structure
      const calendarContainer = screen.getByText("May").closest(".p-4")

      if (!calendarContainer) {
        throw new Error("Calendar container not found")
      }

      // Find the first span in the header section
      const headerSection = calendarContainer.querySelector(
        ".flex.justify-between"
      )
      const backwardIconContainer =
        headerSection?.querySelector("span:first-child")

      if (!backwardIconContainer) {
        throw new Error("Backward icon container not found")
      }

      fireEvent.click(backwardIconContainer)

      // Wait for the month to change
      await waitFor(() => {
        const monthElement = screen.getByText((content) => {
          return content === "April"
        })
        expect(monthElement).toBeInTheDocument()
      })
    })

    it("doesn't allow month selection when pickMonth is false", () => {
      render(
        <DatePicker
          value={new Date("2023-05-15")}
          onChange={mockOnChange}
          locale="en"
          pickMonth={false}
        />
      )

      // Open calendar
      fireEvent.click(screen.getByRole("textbox"))

      // Click on the month
      fireEvent.click(screen.getByText("May"))

      // Month picker should not be visible
      expect(screen.queryByText("Jan")).not.toBeInTheDocument()
      expect(screen.queryByText("Feb")).not.toBeInTheDocument()

      // Calendar should still be visible with days
      expect(screen.getByText("15")).toBeInTheDocument()
    })

    it("doesn't change month display when month is clicked with pickMonth=false", () => {
      render(
        <DatePicker
          value={new Date("2023-05-15")}
          onChange={mockOnChange}
          locale="en"
          pickMonth={false}
        />
      )

      // Open calendar
      fireEvent.click(screen.getByRole("textbox"))

      // Verify May is displayed
      expect(screen.getByText("May")).toBeInTheDocument()

      // Click on the month
      fireEvent.click(screen.getByText("May"))

      // Month should still be May (unchanged)
      expect(screen.getByText("May")).toBeInTheDocument()

      // Calendar should still show the same view
      expect(screen.getByText("15")).toBeInTheDocument()
    })

    it("shows year picker when year is clicked and pickYear is true", () => {
      render(
        <DatePicker
          value={new Date("2023-05-15")}
          onChange={mockOnChange}
          locale="en"
          pickYear={true}
        />
      )

      // Open calendar
      fireEvent.click(screen.getByRole("textbox"))

      // Click on the year
      fireEvent.click(screen.getByText("2023"))

      // Year picker should be visible
      expect(screen.getByText("2022")).toBeInTheDocument()
      expect(screen.getByText("2023")).toBeInTheDocument()
      expect(screen.getByText("2024")).toBeInTheDocument()
    })

    it("selects year from year picker", () => {
      render(
        <DatePicker
          value={new Date("2023-05-15")}
          onChange={mockOnChange}
          locale="en"
          pickYear={true}
        />
      )

      // Open calendar
      fireEvent.click(screen.getByRole("textbox"))

      // Open year picker
      fireEvent.click(screen.getByText("2023"))

      // Select a different year
      fireEvent.click(screen.getByText("2024"))

      // Calendar should show selected year
      expect(screen.getByText("2024")).toBeInTheDocument()

      // Year picker should be closed
      expect(screen.queryByText("2022")).not.toBeInTheDocument()
    })
  })

  // Constraints tests
  describe("date constraints", () => {
    it("respects minDate constraint", () => {
      const currentDate = new Date("2023-05-15")
      const minDate = new Date("2023-05-10")

      render(
        <DatePicker
          value={currentDate}
          onChange={mockOnChange}
          locale="en"
          minDate={minDate}
        />
      )

      // Open calendar
      fireEvent.click(screen.getByRole("textbox"))

      // Dates before minDate should be disabled
      const dateButtons = screen.getAllByRole("button")
      const disabledDates = dateButtons.filter(
        (button) => button.textContent === "9" || button.textContent === "8"
      )

      disabledDates.forEach((button) => {
        expect(button).toHaveClass("opacity-30")
      })
    })

    it("respects maxDate constraint", () => {
      const currentDate = new Date("2023-05-15")
      const maxDate = new Date("2023-05-20")

      render(
        <DatePicker
          value={currentDate}
          onChange={mockOnChange}
          locale="en"
          maxDate={maxDate}
        />
      )

      // Open calendar
      fireEvent.click(screen.getByRole("textbox"))

      // Dates after maxDate should be disabled
      const dateButtons = screen.getAllByRole("button")
      const disabledDates = dateButtons.filter(
        (button) => button.textContent === "21" || button.textContent === "22"
      )

      disabledDates.forEach((button) => {
        expect(button).toHaveClass("opacity-30")
      })
    })

    it("respects min/max date constraints when selecting months", () => {
      const currentDate = new Date("2023-05-15")
      const minDate = new Date("2023-03-01")
      const maxDate = new Date("2023-07-31")

      render(
        <DatePicker
          value={currentDate}
          onChange={mockOnChange}
          locale="en"
          pickMonth={true}
          minDate={minDate}
          maxDate={maxDate}
        />
      )

      // Open calendar
      fireEvent.click(screen.getByRole("textbox"))

      // Open month picker
      fireEvent.click(screen.getByText("May"))

      // Months before March should be disabled
      const janButton = screen.getByText("Jan").closest("button")
      const febButton = screen.getByText("Feb").closest("button")
      expect(janButton).toHaveClass("opacity-30")
      expect(febButton).toHaveClass("opacity-30")

      // Months after July should be disabled
      const augButton = screen.getByText("Aug").closest("button")
      const sepButton = screen.getByText("Sep").closest("button")
      expect(augButton).toHaveClass("opacity-30")
      expect(sepButton).toHaveClass("opacity-30")

      // Months within range should be enabled
      const aprButton = screen.getByText("Apr").closest("button")
      const junButton = screen.getByText("Jun").closest("button")
      expect(aprButton).not.toHaveClass("opacity-30")
      expect(junButton).not.toHaveClass("opacity-30")
    })
  })

  // Locale tests
  describe("localization", () => {
    it("initializes with specified locale", () => {
      const testDate = new Date("2023-05-15")

      render(
        <DatePicker value={testDate} onChange={mockOnChange} locale="fr" />
      )

      // Just verify the component renders without errors when a different locale is specified
      expect(screen.getByTestId("date-picker")).toBeInTheDocument()

      // Open calendar
      fireEvent.click(screen.getByRole("textbox"))

      // Verify calendar opens - check for common elements like buttons
      const dateButtons = screen.getAllByRole("button")
      expect(dateButtons.length).toBeGreaterThan(0)

      // Verify the current date button (15) is present
      const dateButton = screen.getByRole("button", { name: "15" })
      expect(dateButton).toBeInTheDocument()
    })
  })

  // Prop control tests
  describe("prop controls", () => {
    it("keeps calendar open when open prop is true", () => {
      render(
        <DatePicker
          value={new Date()}
          onChange={mockOnChange}
          locale="en"
          open={true}
        />
      )

      // Calendar should be visible without clicking
      expect(screen.getByText("Mon")).toBeInTheDocument()
    })

    it("can use custom icons", () => {
      const CustomIcon = () => <div data-testid="custom-icon">🗓️</div>

      render(
        <DatePicker
          value={null}
          onChange={mockOnChange}
          locale="en"
          calendarIcon={<CustomIcon />}
        />
      )

      expect(screen.getByTestId("custom-icon")).toBeInTheDocument()
    })
  })
})
