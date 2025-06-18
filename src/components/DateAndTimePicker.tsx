import DatePicker from "./DatePicker"
import TimePicker from "./TimePicker"
import { getDayjs } from "../utils/date"
import React, { useEffect, useState } from "react"
import { DatePickerProps } from "./DatePicker"
import { TimePickerProps } from "./TimePicker"
import "./tw.css"
export interface DateAndTimePickerProps {
  id?: string
  timeId?: string
  dateId?: string
  value: string | null | undefined | Date
  locale: string
  minDate?: string | Date
  maxDate?: string | Date
  onChange: (date: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  combined?: boolean
  AMPM?: boolean
  dateProps?: Omit<
    DatePickerProps,
    "onChange" | "locale" | "disabled" | "placeholder" | "value"
  >
  timeProps?: Omit<
    TimePickerProps,
    "onChange" | "locale" | "disabled" | "placeholder" | "value"
  >
}

const roundToNearest15Minutes = (minute: number) => Math.round(minute / 15) * 15

export const DateAndTimePicker = ({
  id,
  timeId,
  dateId,
  value,
  onChange,
  minDate,
  maxDate,
  locale = "en",
  AMPM = false,
  combined = false,
  className,
  placeholder,
  disabled = false,
  timeProps,
  dateProps,
}: DateAndTimePickerProps) => {
  const dayjs = getDayjs(locale)
  const [dateTime, setDateTime] = useState(() => {
    if (value) {
      const parsedDate = dayjs(value)
      const roundedMinute = roundToNearest15Minutes(parsedDate.minute())
      if (parsedDate.hour() === 0 && roundedMinute === 0) {
        return parsedDate.set("hour", 12).set("minute", 0)
      }
      return parsedDate.set("minute", roundedMinute)
    }
    return null
  })

  useEffect(() => {
    setDateTime(() => {
      if (value) {
        const parsedDate = dayjs(value)
        const roundedMinute = roundToNearest15Minutes(parsedDate.minute())
        if (parsedDate.hour() === 0 && roundedMinute === 0) {
          return parsedDate.set("hour", 12).set("minute", 0)
        }
        return parsedDate.set("minute", roundedMinute)
      }
      return null
    })
  }, [value, dayjs])

  const handleDateChange = (newDate: string) => {
    const currentTime = dateTime ?? dayjs().set("hour", 12).set("minute", 0)
    let updatedDate = dayjs(newDate)
      .set("hour", currentTime.hour())
      .set("minute", currentTime.minute())

    // If minDate exists and the selected date is the same as minDate,
    // set the time to 15 minutes after minDate
    if (minDate && updatedDate.isSame(dayjs(minDate), "day")) {
      const minDateTime = dayjs(minDate)
      updatedDate = updatedDate
        .set("hour", minDateTime.hour())
        .set("minute", roundToNearest15Minutes(minDateTime.minute() + 15))
    }

    // Ensure the selected date is within the allowed range
    if (maxDate && updatedDate.isAfter(dayjs(maxDate))) {
      updatedDate = dayjs(maxDate)
    }

    setDateTime(updatedDate)
    onChange(updatedDate.format("YYYY-MM-DDTHH:mm"))
  }

  const handleTimeChange = (newTime: string) => {
    // Parse the full datetime string properly using dayjs
    const parsedTime = dayjs(newTime)
    const hour = parsedTime.hour()
    const minute = parsedTime.minute()

    const roundedMinute = roundToNearest15Minutes(minute)
    let updatedDate = (dateTime ?? dayjs())
      .set("hour", hour)
      .set("minute", roundedMinute)

    // Check if the selected date is today and the time is before now
    const now = dayjs()
    if (updatedDate.isSame(now, "day") && updatedDate.isBefore(now)) {
      updatedDate = now.add(15, "minute").startOf("minute")
    }

    setDateTime(updatedDate)
    onChange(updatedDate.format("YYYY-MM-DDTHH:mm"))
  }

  if (combined) {
    return (
      <>
        <DatePicker
          id={dateId}
          minDate={minDate || dayjs().toISOString()}
          maxDate={maxDate}
          value={dateTime ? dateTime.format("YYYY-MM-DD HH:mm") : ""}
          onChange={handleDateChange}
          locale={locale}
          disabled={disabled}
          placeholder={placeholder}
          timeModule={
            <TimePicker
              id={timeId}
              AMPM={AMPM}
              disabled={disabled}
              value={dateTime ? dateTime.format("YYYY-MM-DDTHH:mm") : null}
              onChange={handleTimeChange}
              maxDate={maxDate}
              minDate={minDate}
              placeholder={placeholder}
              open={true}
              hideInput={true}
              className="max-w-16"
              {...timeProps}
            />
          }
          {...dateProps}
        />
        <input
          type="hidden"
          data-testid="datetime-picker"
          value={dateTime ? dateTime.format("YYYY-MM-DDTHH:mm") : ""}
        />
      </>
    )
  }

  return (
    <div className={`flex  min-h-12 w-full gap-2 ${className || ""}`} id={id}>
      <div className="w-full">
        <DatePicker
          id={dateId}
          minDate={minDate || dayjs().toISOString()}
          maxDate={maxDate}
          value={dateTime ? dateTime.format("YYYY-MM-DD") : ""}
          onChange={handleDateChange}
          locale={locale}
          disabled={disabled}
          placeholder={placeholder}
          className="col-span-3"
          {...dateProps}
        />
      </div>
      <div className="col-span-2">
        <TimePicker
          id={timeId}
          value={dateTime ? dateTime.format("YYYY-MM-DDTHH:mm") : null}
          onChange={handleTimeChange}
          maxDate={maxDate}
          minDate={minDate}
          disabled={disabled}
          placeholder={placeholder}
          className="w-full"
          {...timeProps}
        />
        <input
          type="hidden"
          data-testid="datetime-picker"
          value={dateTime ? dateTime.format("YYYY-MM-DDTHH:mm") : ""}
        />
      </div>
    </div>
  )
}

export default DateAndTimePicker
