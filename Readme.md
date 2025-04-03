<!-- Logo Text -->
<img src="https://johanmic.github.io/react-daisyui-timetools/img/logo-text.png" alt="Logo Text" width="500" align="left" class="block" style="margin-bottom: 20px;" />

<br clear="all" />

<!-- Demo Image -->

A modern package delivering flexible and sleek date/time pickers built specifically for [daisyUI](https://daisyui.com). Leveraging Day.js, these components offer a smooth and integrated experience for handling dates and times in your React projects.

<img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTF6ZDh0ZHpwMW16OXltMmt3ZjZpOWU3aTVxZ2N3dXh0aHN0b3NjbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WW0Dxp75rE756zaxCL/giphy.gif" width="640" class="block" />

## Key Benefits

- **DaisyUI Themes Compatibility:** Provides perfect integration with all daisyUI themes.
- **Language Support built in:** Access over 100 locales (with 16 enabled by default) for i18n.
- **Day.js Integration:** Uses Day.js for powerful date manipulation.
- **AM/PM Support:** Simplifies time selection with effective AM/PM toggling.
- **Date manipulation:** Ideal for start/end date pickers with support for minimum selectable dates.
- **Opionated:** No range pickers. delivering simplicity and clarity in user interaction.

## Installation

```bash
pnpm install react-daisyui-timetools
bun install react-daisyui-timetools
```

## Components

### DatePicker

```tsx
import { DatePicker } from "react-daisyui-timetools"
```

A stylish, easy-to-use date picker.

#### Usage

```tsx
<div data-theme="light" className="rounded-2xl w-48" style={{ width: "390px" }}>
  <DatePicker value="2025-01-01 12:00" onChange={() => {}} />
</div>
```

#### Examples

**Light Theme**

```html
<div data-theme="light" className="rounded-2xl w-48" style={{ width: "390px" }}>
  <DatePicker value="2025-01-01 12:00" onChange={() => {}} />
</div>
```

**Dark Theme with Custom Icon**

```html
<div data-theme="dark" className="rounded-2xl w-48" style={{ width: "390px" }}>
  <DatePicker value="2025-01-01 12:00" locale="fr" onChange={() => {}} calendarIcon={<div>📅</div>} />
</div>
```

### TimePicker

A precise time selection tool.

#### Usage

```tsx
<TimePicker value="2024-01-01 12:00" onChange={() => {}} interval="60" />
```

#### Examples

**60 Minutes Interval**

```html
<div data-theme="light" className="rounded-2xl w-32">
  <TimePicker value={new Date()} onChange={() => {}} interval="60" />
</div>
```

**AM/PM Format**

```html
<div data-theme="light" className="rounded-2xl w-32">
  <TimePicker value="2024-01-01 12:00" AMPM onChange={() => {}} />
</div>
```

### DateAndTimePicker

Combines both date and time picking in one seamless component.

#### Usage

```tsx
<DateAndTimePicker
  value="2025-01-01 12:00"
  onChange={() => {}}
  locale="en"
  weekStart="sunday"
/>
```
