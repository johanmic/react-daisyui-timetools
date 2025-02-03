# react-daisyui-timetools

A modern package delivering flexible and sleek date/time pickers built specifically for [daisyUI](https://daisyui.com). Leveraging Day.js, these components offer a smooth and integrated experience for handling dates and times in your React projects.

## Components

### DatePicker

A stylish, easy-to-use date picker.

#### Usage

```tsx
import DatePicker from "react-daisyui-timetools"
;<DatePicker value="2025-01-01 12:00" onChange={() => {}} />
```

#### Examples

- **Light Theme**

  ```html
  <div data-theme="light" className="rounded-2xl w-48" style={{ width: "390px" }}>
    <DatePicker value="2025-01-01 12:00" onChange={() => {}} />
  </div>
  ```

- **Dark Theme with Custom Icon**
  ```html
  <div data-theme="dark" className="rounded-2xl w-48" style={{ width: "390px" }}>
    <DatePicker value="2025-01-01 12:00" locale="fr" onChange={() => {}} calendarIcon={<div>📅</div>} />
  </div>
  ```

### TimePicker

A precise time selection tool.

#### Usage

```tsx
import TimePicker from "react-daisyui-timetools"
;<TimePicker value="2024-01-01 12:00" onChange={() => {}} interval="60" />
```

#### Examples

- **60 Minutes Interval**

  ```html
  <div data-theme="light" className="rounded-2xl w-32">
    <TimePicker value={new Date()} onChange={() => {}} interval="60" />
  </div>
  ```

- **AM/PM Format**
  ```html
  <div data-theme="light" className="rounded-2xl w-32">
    <TimePicker value="2024-01-01 12:00" AMPM onChange={() => {}} />
  </div>
  ```

### DateAndTimePicker

Combines both date and time picking in one seamless component.

#### Usage

```tsx
import DateAndTimePicker from "react-daisyui-timetools"
;<DateAndTimePicker
  value="2025-01-01 12:00"
  onChange={() => {}}
  locale="en"
  weekStart="sunday"
/>
```

#### Examples

- **Light Theme**
  ```html
  <div data-theme="light" className="rounded-2xl w-48" style={{ width: "390px" }}>
    <DateAndTimePicker value="2025-01-01 12:00" onChange={() => {}} locale="en" weekStart="sunday" />
  </div>
  ```

## Key Benefits

- **DaisyUI Themes Compatibility:** Provides perfect integration with all daisyUI themes.
- **Day.js Integration:** Uses Day.js for powerful date manipulation.
- **Locale Support:** Access over 100 locales (with 16 enabled by default) for internationalization.
- **AM/PM Support:** Simplifies time selection with effective AM/PM toggling.
- **Min Dates:** Ideal for start/end date pickers with support for minimum selectable dates.
- **Focused Functionality:** No range pickers—delivering simplicity and clarity in user interaction.

Elevate your time and date management with `react-daisyui-timetools` and enjoy a clean, customizable, and robust solution.
