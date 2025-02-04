import { useState } from "react"
import DateAndTimePicker from "../../../src/components/DateAndTimePicker"
const d = new Date()
const dPlusTwoDays = new Date(d.setDate(d.getDate() + 2))
export default function DateAndTimePickerExample() {
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(dPlusTwoDays)

  return (
    <div className="flex md:flex-row flex-col gap-4">
      <div className="rounded-2xl w-48" style={{ width: "390px" }}>
        <div className="opacity-50 text-xs">Date and Time</div>
        <DateAndTimePicker
          value={startDate}
          onChange={(date) => setStartDate(new Date(date))}
          locale="en"
        />
      </div>
      <div className="rounded-2xl w-48" style={{ width: "390px" }}>
        <div className="opacity-50 text-xs">Date and Time</div>
        <DateAndTimePicker
          value={endDate}
          minDate={startDate}
          onChange={(date) => setEndDate(new Date(date))}
          locale="en"
        />
      </div>
    </div>
  )
}
