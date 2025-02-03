import React, { FC, useEffect, useRef, useState } from "react"
import { cn } from "../utils/cn"
import type { DayJs } from "../utils/date"
import { getDayjs } from "../utils/date"
import { Backward, Calendar, Forward } from "./Icons"

export interface DatePickerProps {
  maxDate?: string | Date
  minDate?: string | Date
  value: string | Date | null
  onChange: (value: string) => void
  locale: string
  placeholder?: string
  size?: "xs" | "sm" | "md" | "lg"
  forwardIcon?: React.ReactNode
  backwardIcon?: React.ReactNode
  timeModule?: React.ReactNode
  calendarIcon?: React.ReactNode | null
  className?: string
  inputClassName?: string
  calendarClassName?: string
  open?: boolean
  weekStart?: "monday" | "sunday"
}

export const DatePicker: FC<DatePickerProps> = ({
  open: openProp = false,
  value,
  onChange,
  locale = "en",
  size = "md",
  minDate,
  maxDate,
  forwardIcon = <Forward className="w-4 h-4" />,
  backwardIcon = <Backward className="w-4 h-4" />,
  placeholder,
  calendarIcon = <Calendar className="w-6 h-6" />,
  className = "",
  inputClassName = "",
  calendarClassName = "",
  timeModule,
  weekStart = "monday",
}) => {
  const dayjs = getDayjs(locale)
  const [show, setShow] = useState<boolean>(openProp)
  const [currentMonth, setCurrentMonth] = useState<DayJs>(
    dayjs().locale(locale).startOf("month")
  )
  const datePickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // dayjs.locale(locale)

    if (value) {
      const updatedDate = dayjs(value).locale(locale).startOf("day")
      setCurrentMonth(updatedDate)
    } else {
      setCurrentMonth(dayjs().locale(locale))
    }
  }, [value, locale, dayjs])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setShow(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleShow = () => setShow(!show)

  const handleDateSelect = (day: DayJs) => {
    onChange(day.format("YYYY-MM-DD"))
    setShow(false) // Close the date picker
  }

  const handleMonthChange = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    direction: number
  ) => {
    e.stopPropagation()
    setCurrentMonth((current: DayJs) => current.add(direction, "month"))
  }

  const isDateSelectable = (day: DayJs) => {
    const min = minDate ? dayjs(minDate).startOf("day") : null
    const max = maxDate ? dayjs(maxDate).endOf("day") : null

    return (!min || day.isSameOrAfter(min)) && (!max || day.isSameOrBefore(max))
  }

  // Create weekday headers based on the selected week start.
  // For "monday" start, we use the order: [Mon, Tue, ..., Sun]
  const weekDayIndices =
    weekStart === "monday" ? [1, 2, 3, 4, 5, 6, 0] : [0, 1, 2, 3, 4, 5, 6]
  const weekdays = weekDayIndices.map((dayIndex) => {
    const day = dayjs().locale(locale).day(dayIndex)
    return {
      full: day.format("ddd"), // e.g., "Mon"
      short: day.format("dd")[0], // e.g., "M"
    }
  })

  // Adjust initial blank days based on week start.
  // If week starts on monday, a month starting on Sunday (day 0) should leave 6 blank cells.
  const firstDayIndex = currentMonth.startOf("month").day()
  const blankDays = (firstDayIndex - (weekStart === "monday" ? 1 : 0) + 7) % 7

  const daysInMonth = Array.from(
    { length: currentMonth.daysInMonth() },
    (_, i) => currentMonth.date(i + 1)
  )

  // Add size utility mapping
  const sizeClasses = {
    xs: "input-xs text-xs",
    sm: "input-sm text-sm",
    md: "input-md text-base",
    lg: "input-lg text-lg",
  }

  // Add icon size utility mapping
  const iconSizes = {
    xs: {
      calendar: "w-4 h-4",
      arrows: "w-3 h-3",
    },
    sm: {
      calendar: "w-5 h-5",
      arrows: "w-3.5 h-3.5",
    },
    md: {
      calendar: "w-6 h-6",
      arrows: "w-4 h-4",
    },
    lg: {
      calendar: "w-7 h-7",
      arrows: "w-5 h-5",
    },
  }

  // Update default icons with size-based classes
  const sizedForwardIcon = forwardIcon
    ? React.cloneElement(forwardIcon as React.ReactElement, {
        className: iconSizes[size].arrows,
      })
    : null

  const sizedBackwardIcon = backwardIcon
    ? React.cloneElement(backwardIcon as React.ReactElement, {
        className: iconSizes[size].arrows,
      })
    : null

  const sizedCalendarIcon = calendarIcon
    ? React.cloneElement(calendarIcon as React.ReactElement, {
        className: iconSizes[size].calendar,
      })
    : null

  const timeFormat = timeModule ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD"

  return (
    <div className="" ref={datePickerRef}>
      <label
        className={cn(
          "input input-bordered rounded-box flex items-center justify-between gap-2 w-full",
          className,
          sizeClasses[size]
        )}
      >
        <input
          className={cn(inputClassName)}
          type="text"
          value={value ? dayjs(value).locale(locale).format(timeFormat) : ""}
          onClick={toggleShow}
          onChange={(e) => {
            e.preventDefault()
            const newDate = dayjs(e.target.value)
            if (newDate.isValid() && isDateSelectable(newDate)) {
              onChange(newDate.format(timeFormat))
            }
          }}
          placeholder={placeholder}
          readOnly // Prevent keyboard from showing on mobile
        />
        {sizedCalendarIcon}
      </label>
      {show && (
        <div
          className={cn(
            "p-4 bg-base-100 overflow-hidden rounded-box mt-2 absolute min-w-96 z-10 shadow-xl left-1/2 transform -translate-x-1/2 md:left-auto md:transform-none",
            calendarClassName
          )}
        >
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2 capitalize">
                <div onClick={(e: any) => handleMonthChange(e, -1)}>
                  {sizedForwardIcon}
                </div>
                <span>{currentMonth.locale(locale).format("MMMM YYYY")}</span>
                <div onClick={(e: any) => handleMonthChange(e, 1)}>
                  {sizedBackwardIcon}
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 capitalize">
                {weekdays.map((weekday) => (
                  <div
                    key={weekday.full}
                    className="p-2 text-center text-xs md:text-base"
                  >
                    <span className="block md:hidden">{weekday.short}</span>
                    <span className="hidden md:block">{weekday.full}</span>
                  </div>
                ))}
                {Array.from({ length: blankDays }).map((_, i) => (
                  <div key={i} className="p-2"></div>
                ))}
                {daysInMonth.map((day) => {
                  const isSelectable = isDateSelectable(day)
                  return (
                    <button
                      key={day.toString()}
                      className={`p-2 rounded hover:bg-primary hover:text-primary-content whitespace-nowrap capitalize ${
                        day.format("YYYY-MM-DD") ===
                        dayjs(value).locale(locale).format("YYYY-MM-DD")
                          ? "bg-primary text-primary-content"
                          : ""
                      } ${isSelectable ? "" : "opacity-30 cursor-not-allowed"}`}
                      onClick={() => isSelectable && handleDateSelect(day)}
                      disabled={!isSelectable}
                    >
                      {day.date()}
                    </button>
                  )
                })}
              </div>
            </div>
            {timeModule && <div className="border-l pl-4">{timeModule}</div>}
          </div>
        </div>
      )}
    </div>
  )
}

export default DatePicker
