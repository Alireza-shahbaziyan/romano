import { Link } from "next-view-transitions"
import { toFaDigits } from "@/lib/utils"

// ---------------------------------------------------------------------------
// PaginationNav — shared "قبلی / بعدی" pager for listing pages (blog and
// product catalog). Link building is delegated to `makeHref` so each page
// can carry its own query-string state (filters, search, etc.).
// ---------------------------------------------------------------------------

export function PaginationNav({
    currentPage,
    hasNext,
    hasPrevious,
    makeHref,
    label = "صفحه‌بندی",
}: {
    currentPage: number
    hasNext: boolean
    hasPrevious: boolean
    makeHref: (page: number) => string
    label?: string
}) {
    if (!hasNext && !hasPrevious) return null

    return (
        <nav
            aria-label={label}
            className="mt-16 flex items-center justify-between border-t border-border pt-8"
        >
            {hasPrevious ? (
                <Link
                    href={makeHref(currentPage - 1)}
                    className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                    قبلی
                </Link>
            ) : (
                <span />
            )}

            <span className="text-xs text-muted-foreground">صفحه {toFaDigits(currentPage)}</span>

            {hasNext ? (
                <Link
                    href={makeHref(currentPage + 1)}
                    className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                    بعدی
                </Link>
            ) : (
                <span />
            )}
        </nav>
    )
}
