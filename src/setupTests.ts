import "@testing-library/jest-dom"

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveClass(className: string): R
      toBeDisabled(): R
      toHaveValue(value: string | number | boolean): R
      toHaveAttribute(attr: string, value?: string): R
    }
  }
}
