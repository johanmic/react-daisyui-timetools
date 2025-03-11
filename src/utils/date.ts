import dayjs, { Dayjs } from "dayjs"
export type DayJs = Dayjs

import localeData from "dayjs/plugin/localeData"
import RelativeTime from "dayjs/plugin/relativeTime"
import utc from "dayjs/plugin/utc"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"

// Update interface to use the exported DayJs type instead of Dayjs
declare module "dayjs" {
  interface Dayjs {
    isSameOrAfter(date: string | number | DayJs | null): boolean
    fromNow(withoutSuffix?: boolean): string
    utc(keepLocalTime?: boolean): DayJs
    localeData(): any
    isSameOrBefore(date: string | number | DayJs | null): boolean
  }
}

const locales = {
  de: () => import("dayjs/locale/de"),
  en: () => import("dayjs/locale/en"),
  sv: () => import("dayjs/locale/sv"),
  fr: () => import("dayjs/locale/fr"),
  es: () => import("dayjs/locale/es"),
  it: () => import("dayjs/locale/it"),
  nl: () => import("dayjs/locale/nl"),
  pl: () => import("dayjs/locale/pl"),
  pt: () => import("dayjs/locale/pt"),
  ja: () => import("dayjs/locale/ja"),
  nb: () => import("dayjs/locale/nb"),
  da: () => import("dayjs/locale/da"),
  tr: () => import("dayjs/locale/tr"),
  ar: () => import("dayjs/locale/ar"),
  zh: () => import("dayjs/locale/zh"),
  ko: () => import("dayjs/locale/ko"),
}

export const DATE_FORMAT = "DD MMMM YYYY"
export const URL_DATE_FORMAT = "MM-DD-YYYY"
dayjs.extend(RelativeTime)
dayjs.extend(utc)
dayjs.extend(localeData)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

export const getCurrentLocale = () => {
  return dayjs.locale()
}

export const getDayjs = (locale?: string | void) => {
  const langLocale = locales[locale as keyof typeof locales]
  if (langLocale) {
    langLocale().then(({ default: locale }) => {
      dayjs.locale(locale)
    })
  }
  return dayjs
}
