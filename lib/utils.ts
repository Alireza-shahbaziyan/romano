import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const faDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"]

/** Converts Latin digits to Persian digits (۰-۹) for Persian-facing UI text. */
export function toFaDigits(value: number | string): string {
    return String(value).replace(/[0-9]/g, (d) => faDigits[Number(d)])
}

/** Formats a number with Persian digits and locale-aware grouping. */
export function formatFaNumber(value: number): string {
    return toFaDigits(value.toLocaleString("fa-IR"))
}

/**
 * Persian long-form date (e.g. «۲۱ مهر ۱۴۰۵»). Returns an empty string for
 * missing or unparseable dates — some backend records carry non-Gregorian
 * or malformed timestamps, which must never crash rendering.
 */
export function formatPostDate(isoDate: string | null | undefined): string {
    if (!isoDate) return ""
    const date = new Date(isoDate)
    if (Number.isNaN(date.getTime())) return ""

    return new Intl.DateTimeFormat("fa-IR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date)
}
