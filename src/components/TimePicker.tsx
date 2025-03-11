import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat" // Required to handle specific parse formats
import utc from "dayjs/plugin/utc"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { cn } from "../utils/cn"
import "./tw.css"
dayjs.extend(customParseFormat)
dayjs.extend(utc)

export interface TimePickerProps {
  id?: string
  value?: string | null | Date
  open?: boolean
  onChange: (value: string) => void
  AMPM?: boolean
  maxDate?: Date | string | null
  minDate?: Date | string | null
  closeOnHour?: boolean
  disabled?: boolean
  closeOnMinute?: boolean
  placeholder?: string
  hideInput?: boolean
  size?: "xs" | "sm" | "md" | "lg"
  interval?: "60" | "15" | "30"
  className?: string
  inputClassName?: string
  calendarClassName?: string
  externalAMPM?: boolean
}

// Helper function for padding lists with mode awareness
const getPaddedList = (items: string[]) => {
  const viewportItems = 6 // Number of items visible in viewport
  const paddingItems = Math.floor(viewportItems / 2) + 2 // Base padding

  return [
    ...Array(paddingItems).fill(""), // Top padding
    ...items, // Actual items
    ...Array(paddingItems).fill(""), // Bottom padding
  ]
}

// Modified hours arrays with padding
const twelveHours = getPaddedList(
  Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"))
)

const twentyFourHours = getPaddedList(
  Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"))
)

// Helper that returns the minute options based on the provided interval.
function getMinuteOptions(interval: "60" | "15" | "30"): string[] {
  if (interval === "60")
    return Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"))
  if (interval === "30") return ["00", "30"]
  // default "15"
  return ["00", "15", "30", "45"]
}

// Helper function to get padded minute list from base intervals
const getMinuteIntervals = (intervals: string[]) => {
  const viewportItems = 6 // Number of items visible in viewport
  const paddingItems = Math.floor(viewportItems / 2) + 2 // Base padding

  return [
    ...Array(paddingItems).fill(""), // Top padding
    ...intervals, // Actual intervals
    ...Array(paddingItems).fill(""), // Bottom padding
  ]
}

export function TimePicker({
  id,
  open: openProp = false,
  value,
  onChange,
  AMPM = false,
  maxDate,
  minDate,
  disabled = false,
  className,
  inputClassName,
  calendarClassName,
  closeOnHour = false,
  closeOnMinute = true,
  placeholder,
  hideInput = false,
  interval: intervalProp = "15",
  externalAMPM = false,
}: TimePickerProps) {
  const [open, setOpen] = useState(openProp)
  const [hour, setHour] = useState<string>("12")
  const [minute, setMinute] = useState<string>("00")
  const [period, setPeriod] = useState<"AM" | "PM">("AM")
  const ref = useRef<HTMLDivElement>(null)
  const hourRefs = useRef<(HTMLDivElement | null)[]>(Array(24).fill(null))
  const hourListRef = useRef<HTMLDivElement>(null)
  const minuteListRef = useRef<HTMLDivElement>(null)

  // Compute allowed minute options based on the passed interval prop.
  const computedMinuteOptions = useMemo(() => {
    return getMinuteOptions(intervalProp)
  }, [intervalProp])

  // Create the padded list. This ensures the scroll list has top and bottom spacing.
  const paddedMinuteOptions = useMemo(() => {
    return getMinuteIntervals(computedMinuteOptions)
  }, [computedMinuteOptions])

  const minuteRefs = useRef<(HTMLDivElement | null)[]>(
    Array(paddedMinuteOptions.length).fill(null)
  )
  // Update minuteRefs if the padded list length changes.
  useEffect(() => {
    if (minuteRefs.current.length !== paddedMinuteOptions.length) {
      minuteRefs.current = Array(paddedMinuteOptions.length).fill(null)
    }
  }, [paddedMinuteOptions.length])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    // When a value is provided, update the displayed time.
    // Also, ensure that the minute value is a valid option.
    if (value) {
      const parsedDate = dayjs(value).utc().local()
      const allowedMinutes = computedMinuteOptions
      let formattedMinute = parsedDate.format("mm")
      if (!allowedMinutes.includes(formattedMinute)) {
        formattedMinute = allowedMinutes[0]
      }

      if (AMPM) {
        setHour(parsedDate.format("hh"))
        setPeriod(parsedDate.format("A") as "AM" | "PM")
      } else {
        setHour(parsedDate.format("HH"))
      }
      setMinute(formattedMinute)
    } else {
      setHour(AMPM ? "12" : "00")
      setMinute(computedMinuteOptions[0])
      setPeriod("AM")
    }
  }, [value, AMPM, computedMinuteOptions])

  useEffect(() => {
    if (open) {
      const hourIndex = (AMPM ? twelveHours : twentyFourHours).indexOf(hour)
      const minuteIndex = paddedMinuteOptions.findIndex((m) => m === minute)

      requestAnimationFrame(() => {
        const hourList = hourListRef.current
        const minuteList = minuteListRef.current
        const hourElement = hourRefs.current[hourIndex]
        const minuteElement = minuteRefs.current[minuteIndex]

        if (hourList && minuteList && hourElement && minuteElement) {
          const itemHeight = hourElement.offsetHeight
          const listHeight = hourList.clientHeight
          const viewportCenter = listHeight / 2

          const hourOffset =
            hourElement.offsetTop - viewportCenter + itemHeight / 2
          const minuteOffset =
            minuteElement.offsetTop - viewportCenter + itemHeight / 2

          hourList.scroll({
            top: Math.max(0, hourOffset),
            behavior: "smooth",
          })
          minuteList.scroll({
            top: Math.max(0, minuteOffset),
            behavior: "smooth",
          })
        }
      })
    }
  }, [open, hour, minute, AMPM, paddedMinuteOptions, minuteRefs])

  const isTimeValid = (h: string, m: string): boolean => {
    // Use the provided value as the base date for time comparison
    const baseDate = value ? dayjs(value) : dayjs()
    const selectedTime = baseDate
      .set("hour", parseInt(h))
      .set("minute", parseInt(m))
      .set("second", 0)
      .set("millisecond", 0)

    if (minDate) {
      const min = dayjs(minDate)
      // Only enforce minTime if the base date is the same day as minDate
      if (
        baseDate.startOf("day").isSame(min.startOf("day")) &&
        selectedTime.isBefore(min)
      ) {
        return false
      }
    }

    if (maxDate) {
      const max = dayjs(maxDate)
      // Only enforce maxTime if the base date is the same day as maxDate
      if (
        baseDate.startOf("day").isSame(max.startOf("day")) &&
        selectedTime.isAfter(max)
      ) {
        return false
      }
    }

    return true
  }

  const isHourDisabled = (h: string, period: "AM" | "PM"): boolean => {
    if (!h) return false // Skip empty padding items

    let parsedHour = parseInt(h)
    if (AMPM) {
      if (period === "PM" && parsedHour !== 12) parsedHour += 12
      else if (period === "AM" && parsedHour === 12) parsedHour = 0
    }

    // Use the selected date from value (or today) as the base for comparing times
    const baseDate = value ? dayjs(value) : dayjs()
    const selectedTime = baseDate
      .set("hour", parsedHour)
      .set("minute", 0)
      .set("second", 0)
      .set("millisecond", 0)

    if (minDate) {
      const min = dayjs(minDate)
      if (
        baseDate.startOf("day").isSame(min.startOf("day")) &&
        selectedTime.isBefore(min)
      ) {
        return true
      }
    }

    if (maxDate) {
      const max = dayjs(maxDate)
      if (
        baseDate.startOf("day").isSame(max.startOf("day")) &&
        selectedTime.isAfter(max)
      ) {
        return true
      }
    }

    return false
  }

  const handleTimeSelection = useCallback(
    (newHour: string, newMinute: string, isHourClick: boolean) => {
      if (isTimeValid(newHour, newMinute)) {
        setHour(newHour)
        setMinute(newMinute)

        // Convert selected time to 24-hour format if in AM/PM mode.
        let finalHour = newHour
        if (AMPM) {
          const hourNum = parseInt(newHour)
          if (period === "PM" && hourNum !== 12) {
            finalHour = (hourNum + 12).toString().padStart(2, "0")
          } else if (period === "AM" && hourNum === 12) {
            finalHour = "00"
          }
        }

        onChange(`${finalHour}:${newMinute}`)

        if (isHourClick && closeOnHour) {
          setOpen(false)
        } else if (!isHourClick && closeOnMinute) {
          setOpen(false)
        }
      }
    },
    [AMPM, onChange, closeOnHour, closeOnMinute, period]
  )

  const togglePeriod = useCallback(() => {
    setPeriod((prev) => (prev === "AM" ? "PM" : "AM"))
    handleTimeSelection(hour, minute, true)
  }, [hour, minute, handleTimeSelection])

  return (
    <div
      className={cn("relative", hideInput ? "w-32" : "max-w-48", className)}
      ref={ref}
      id={id}
      data-testid="time-picker"
    >
      {!hideInput && (
        <div className={`flex items-center ${disabled ? "opacity-60" : ""}`}>
          <div
            onClick={() => !disabled && setOpen(!open)}
            className={cn(
              "inline-flex input input-bordered relative justify-center w-32 items-center rounded-box cursor-pointer",
              inputClassName
            )}
          >
            <div className="flex items-center gap-1">
              <span className="text-lg">{hour}</span>
              <span className="text-lg">:</span>
              <span className="text-lg">{minute}</span>
              {!externalAMPM && AMPM && (
                <span className="text-lg ml-1">{period}</span>
              )}
            </div>
          </div>
          {externalAMPM && AMPM && (
            <div className="flex border rounded-box input-bordered flex-col min-h-12 ml-2">
              {["AM", "PM"].map((p) => (
                <button
                  key={p}
                  className={cn(
                    "badge join-item",
                    p === period
                      ? "badge-outline badge-primary"
                      : "badge-outline"
                  )}
                  onClick={() => {
                    setPeriod(p as "AM" | "PM")
                    handleTimeSelection(hour, minute, true)
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      {(open || hideInput) && (
        <div
          className={cn(
            "absolute grid left-0 right-0",
            hideInput ? "top-0" : "top-14 shadow-xl",
            externalAMPM ? "grid-cols-2" : AMPM ? "grid-cols-3" : "grid-cols-2",
            "z-[10] bg-base-100",
            calendarClassName
          )}
        >
          <div
            className="overflow-y-scroll h-72 scroll-smooth "
            ref={hourListRef}
            style={{ scrollPaddingTop: "96px", scrollPaddingBottom: "96px" }}
          >
            {(AMPM ? twelveHours : twentyFourHours).map((h, index) => (
              <div
                ref={(el) => {
                  hourRefs.current[index] = el
                }}
                tabIndex={0}
                className={cn(
                  "flex items-center justify-center text-lg text-center py-3",
                  !h && "invisible",
                  h === hour && "bg-primary text-primary-content",
                  h && !isHourDisabled(h, period)
                    ? "cursor-pointer hover:bg-primary/50 hover:text-primary-content"
                    : "opacity-30 cursor-not-allowed"
                )}
                key={`${h}-${index}`}
                onClick={() =>
                  h &&
                  !isHourDisabled(h, period) &&
                  isTimeValid(h, minute) &&
                  handleTimeSelection(h, minute, true)
                }
              >
                <span className="text-lg">{h}</span>
              </div>
            ))}
          </div>
          <div
            className="overflow-y-scroll h-72 scroll-smooth "
            ref={minuteListRef}
            style={{ scrollPaddingTop: "96px", scrollPaddingBottom: "96px" }}
          >
            {paddedMinuteOptions.map((m, index) => (
              <div
                ref={(el) => {
                  minuteRefs.current[index] = el
                }}
                tabIndex={0}
                className={cn(
                  "flex items-center justify-center text-lg text-center py-3",
                  !m && "invisible",
                  m === minute && "bg-primary text-primary-content",
                  m && isTimeValid(hour, m)
                    ? "cursor-pointer hover:bg-primary/50 hover:text-primary-content"
                    : "opacity-30 cursor-not-allowed"
                )}
                key={`${m}-${index}`}
                onClick={() =>
                  m &&
                  isTimeValid(hour, m) &&
                  handleTimeSelection(hour, m, false)
                }
              >
                <span className="text-lg">{m}</span>
              </div>
            ))}
          </div>
          {!externalAMPM && AMPM && (
            <div className="overflow-y-scroll h-72 ">
              {["AM", "PM"].map((p) => (
                <div
                  key={p}
                  className={cn(
                    "flex items-center justify-center text-lg text-center cursor-pointer py-3",
                    p === period && "bg-primary text-primary-content",
                    "hover:bg-primary/50 hover:text-primary-content"
                  )}
                  onClick={() => {
                    setPeriod(p as "AM" | "PM")
                    handleTimeSelection(hour, minute, true)
                  }}
                >
                  <span className="text-lg">{p}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TimePicker
