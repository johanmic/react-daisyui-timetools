export const cn = (...inputs: (string | undefined | null | false | 0)[]) => {
  return inputs.filter(Boolean).join(" ")
}
