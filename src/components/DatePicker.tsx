import React, { FC, useEffect, useRef, useState } from "react"
import { cn } from "../utils/cn"
import type { DayJs } from "../utils/date"
import { getDayjs } from "../utils/date"
import { Backward, Calendar, Forward } from "./Icons"
import "./tw.css"
export interface DatePickerProps {
  id?: string
  maxDate?: string | Date
  minDate?: string | Date
  value: string | Date | null
  disabled?: boolean
  onChange: (value: string) => void
  locale: string
  placeholder?: string
  size?: "xs" | "sm" | "md" | "lg"
  pickYear?: boolean
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
  id,
  value,
  onChange,
  locale = "en",
  size = "md",
  minDate,
  disabled = false,
  pickYear = false,
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
  const [show, setShow] = useState(openProp)
  const [showYearPicker, setShowYearPicker] = useState(false)
  const [currentDate, setCurrentDate] = useState<DayJs | null>(null)
  const dayjs = getDayjs(locale)

  // process min and max dates
  const minDayjs = minDate ? dayjs(minDate) : dayjs().subtract(100, "year")
  const maxDayjs = maxDate ? dayjs(maxDate) : dayjs().add(100, "year")

  const minYear = minDayjs.year()
  const maxYear = maxDayjs.year()

  const datePickerRef = useRef<HTMLDivElement>(null)
  const inputContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // dayjs.locale(locale)

    if (value) {
      const updatedDate = dayjs(value).locale(locale).startOf("day")
      setCurrentDate(updatedDate)
    } else {
      setCurrentDate(dayjs().locale(locale))
    }
  }, [value, locale, dayjs])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setShow(false)
        setShowYearPicker(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleShow = () => {
    const newShow = !show
    setShow(newShow)
    if (!newShow) {
      setShowYearPicker(false)
    }
  }

  const handleDateSelect = (day: DayJs) => {
    setCurrentDate(day)
    onChange(day.format("YYYY-MM-DD"))
    setShow(false)
    setShowYearPicker(false)
  }

  const handleMonthChange = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    direction: number
  ) => {
    e.stopPropagation()
    const newDate = currentDate
      ? currentDate.add(direction, "month")
      : dayjs().locale(locale).add(direction, "month")
    setCurrentDate(newDate)
  }

  const handleYearClick = () => {
    setShowYearPicker(!showYearPicker)
    if (!showYearPicker) {
      setShow(true)
    }
  }

  const handleYearSelect = (year: number) => {
    const newDate = currentDate ? currentDate.year(year) : dayjs().year(year)
    setCurrentDate(newDate)
    setShowYearPicker(false)

    // Trigger onChange with the new year but keep the same date
    onChange(newDate.format("YYYY-MM-DD"))
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
  const firstDayIndex = currentDate?.startOf("month").day() || 0
  const blankDays = (firstDayIndex - (weekStart === "monday" ? 1 : 0) + 7) % 7

  const daysInMonth = Array.from(
    { length: currentDate?.daysInMonth() || 0 },
    (_, i) => currentDate?.date(i + 1) || dayjs().date(i + 1)
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
    <div
      className={`relative ${className}`}
      ref={inputContainerRef}
      id={id}
      data-testid="date-picker"
    >
      <label
        className={cn(
          "input input-bordered rounded-box flex items-center justify-between gap-2 w-full",
          sizeClasses[size],
          className
        )}
      >
        <input
          className={cn(inputClassName)}
          type="text"
          disabled={disabled}
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
          className={`absolute z-10 mt-1 ${calendarClassName}`}
          style={{
            minWidth: inputContainerRef.current?.clientWidth || "auto",
            left: 0,
          }}
        >
          <div className="p-4 rounded-box bg-base-100 shadow">
            {showYearPicker ? (
              <div className="w-full">
                <div className="h-64 overflow-y-auto">
                  <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: maxYear - minYear + 1 }).map(
                      (_, idx) => {
                        const year = minYear + idx
                        return (
                          <button
                            key={year}
                            className={cn(
                              "btn btn-sm w-full",
                              currentDate && currentDate.year() === year
                                ? "btn-primary"
                                : "btn-ghost"
                            )}
                            onClick={() => handleYearSelect(year)}
                          >
                            {year}
                          </button>
                        )
                      }
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-2">
                  {backwardIcon && (
                    <span
                      className="cursor-pointer p-1"
                      onClick={(e) => handleMonthChange(e as any, -1)}
                    >
                      {sizedBackwardIcon}
                    </span>
                  )}

                  <div className="flex-1 flex justify-center items-center">
                    <span className="mx-1">
                      {currentDate
                        ? currentDate.format("MMMM")
                        : dayjs().locale(locale).format("MMMM")}
                    </span>
                    {currentDate && (
                      <span
                        className={cn(
                          "mx-1",
                          pickYear && "cursor-pointer hover:text-primary"
                        )}
                        onClick={handleYearClick}
                      >
                        {currentDate.format("YYYY")}
                      </span>
                    )}
                  </div>

                  {forwardIcon && (
                    <span
                      className="cursor-pointer p-1"
                      onClick={(e) => handleMonthChange(e as any, 1)}
                    >
                      {sizedForwardIcon}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-7 gap-1 capitalize">
                  {weekdays.map((weekday) => (
                    <div
                      key={weekday.full}
                      className="p-2 text-center text-xs md:text-base whitespace-nowrap"
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
                        } ${
                          isSelectable ? "" : "opacity-30 cursor-not-allowed"
                        }`}
                        onClick={() => isSelectable && handleDateSelect(day)}
                        disabled={!isSelectable}
                      >
                        {day.date()}
                      </button>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default DatePicker
