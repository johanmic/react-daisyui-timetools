import { useState } from "react"
import "./App.css"

import ThemePicker from "./components/thempicker"

import { DatePicker, TimePicker, DateAndTimePicker } from "../../"

import { getDayjs } from "../../src/utils/date"
import Logo from "../../docs/static/img/logo-text.png"

const dayjs = getDayjs()
const defaultDate = dayjs().add(1, "day").format("YYYY-MM-DD")
function App() {
  const [date, setDate] = useState(defaultDate)
  const [startDate, setStartDate] = useState(defaultDate)
  const [endDate, setEndDate] = useState(
    dayjs().add(2, "day").format("YYYY-MM-DD")
  )
  return (
    <div className="container mx-auto flex flex-col justify-center items-center p-4 max-w-2xl">
      <header className="flex justify-between items-center mb-8 w-full p-4">
        <img src={Logo} alt="React Daisyui TimeTools" className="h-16" />
        <ThemePicker />
      </header>

      <section className="space-y-8 w-full max-w-md flex flex-col self-center">
        <h2 className="text-2xl font-bold">Basics</h2>

        <div className="space-y-4">
          <div className="form-control">
            <label className="label">Date with year picker</label>
            <DatePicker
              pickYear
              pickMonth
              minDate={dayjs().subtract(10, "year").format("YYYY-MM-DD")}
              maxDate={dayjs().add(10, "year").format("YYYY-MM-DD")}
              value={date}
              onChange={setDate}
              locale="en"
              placeholder="Select a date"
            />
          </div>

          <div className="form-control">
            <label className="label">Date in Swedish</label>
            <DatePicker
              value={date}
              onChange={setDate}
              locale="sv"
              placeholder="Select a date"
            />
          </div>

          <div className="form-control">
            <label className="label">Date And Time</label>
            <DateAndTimePicker
              value={date}
              onChange={setDate}
              AMPM={true}
              locale="en"
              dateProps={{
                pickMonth: true,
              }}
              placeholder="Select a date"
            />
          </div>

          <div className="form-control">
            <label className="label">
              Date And Time Combined, custom calendar icon
            </label>
            <DateAndTimePicker
              value={date}
              onChange={setDate}
              locale="en"
              placeholder="Select a date"
              dateProps={{
                calendarIcon: <div>x</div>,
              }}
              combined
            />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">
            DateAndTimePicker Start and End Date examples
          </h2>
        </div>
        <div className="space-y-4">
          <div className="form-control">
            <label className="label">Start Date</label>
            <DateAndTimePicker
              value={startDate}
              onChange={setStartDate}
              locale="en"
              combined
              AMPM={false}
              placeholder="Select a date"
            />
            <label className="label">End Date</label>
            <DateAndTimePicker
              value={endDate}
              onChange={setEndDate}
              minDate={startDate}
              combined
              AMPM={false}
              locale="en"
              placeholder="Select a date"
            />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Sizes</h2>
          <div className="space-y-4">
            <div className="form-control">
              <label className="label">Large</label>
              <DatePicker
                value={date}
                onChange={setDate}
                locale="sv"
                size="lg"
                placeholder="Select a date"
              />
              <label className="label">Medium</label>
              <DatePicker
                value={date}
                onChange={setDate}
                locale="sv"
                placeholder="Select a date"
                size="md"
              />
              <label className="label">Small</label>
              <DatePicker
                value={date}
                onChange={setDate}
                locale="sv"
                placeholder="Select a date"
                size="sm"
              />
            </div>
            <div>
              <label className="label">Time</label>
              <TimePicker value={date} onChange={setDate} />
              <label className="label">Time with AM/PM</label>
              <TimePicker value={date} onChange={setDate} AMPM={true} />
            </div>
            <div>
              <label className="label">Disabled</label>
              <TimePicker value={date} onChange={setDate} disabled />
              <label className="label">Outside AMPM</label>
              <TimePicker
                value={date}
                onChange={setDate}
                AMPM={true}
                externalAMPM
              />
            </div>

            <div className="w-72 bg-primary/10">
              <label className="label">Cramped Space</label>
              <DateAndTimePicker
                value={endDate}
                onChange={setEndDate}
                minDate={startDate}
                combined
                AMPM={false}
                locale="en"
                placeholder="Select a date"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="h-96"></div>
    </div>
  )
}

export default App
