import DatePicker from "./DatePicker"
import TimePicker from "./TimePicker"
import { getDayjs } from "../utils/date"
import React, { useEffect, useState } from "react"
import { DatePickerProps } from "./DatePicker"
import { TimePickerProps } from "./TimePicker"

export interface DateAndTimePickerProps {
  value: string | null | undefined | Date
  locale: string
  minDate?: string | Date
  maxDate?: string | Date
  onChange: (date: string) => void
  placeholder?: string
  className?: string
  combined?: boolean
  AMPM?: boolean
  dateProps?: DatePickerProps
  timeProps?: TimePickerProps
}

const roundToNearest15Minutes = (minute: number) => Math.round(minute / 15) * 15

export const DateAndTimePicker = ({
  value,
  onChange,
  minDate,
  maxDate,
  locale = "en",
  AMPM = false,
  combined = false,
  className,
  placeholder,
  timeProps,
  dateProps,
}: DateAndTimePickerProps) => {
  const dayjs = getDayjs(locale)
  const [dateTime, setDateTime] = useState(() => {
    if (value) {
      const parsedDate = dayjs(value)
      if (parsedDate.hour() === 0 && parsedDate.minute() === 0) {
        return parsedDate.set("hour", 12).set("minute", 0)
      }
      return parsedDate
    }
    return null
  })

  useEffect(() => {
    setDateTime(() => {
      if (value) {
        const parsedDate = dayjs(value)
        if (parsedDate.hour() === 0 && parsedDate.minute() === 0) {
          return parsedDate.set("hour", 12)
        }
        return parsedDate
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
    const [hour, minute] = newTime.split(":").map(Number)
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
      <DatePicker
        minDate={minDate || dayjs().toISOString()}
        maxDate={maxDate}
        value={dateTime ? dateTime.format("YYYY-MM-DD HH:mm") : ""}
        onChange={handleDateChange}
        locale={locale}
        placeholder={placeholder}
        timeModule={
          <TimePicker
            AMPM={AMPM}
            value={dateTime ? dateTime.toISOString() : null}
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
    )
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      <DatePicker
        minDate={minDate || dayjs().toISOString()}
        maxDate={maxDate}
        value={dateTime ? dateTime.format("YYYY-MM-DD") : ""}
        onChange={handleDateChange}
        locale={locale}
        placeholder={placeholder}
        {...dateProps}
      />
      <TimePicker
        value={dateTime ? dateTime.toISOString() : null}
        onChange={handleTimeChange}
        maxDate={maxDate}
        minDate={minDate}
        placeholder={placeholder}
        {...timeProps}
      />
    </div>
  )
}

export default DateAndTimePicker
