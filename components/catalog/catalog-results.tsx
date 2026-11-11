import { Link } from "next-view-transitions"

import { PaginationNav } from "@/components/layout/pagination-nav"
import { formatFaNumber } from "@/lib/utils"
import { CatalogCard, CatalogCardSkeleton, type CatalogCardItem } from "./catalog-card"

// ---------------------------------------------------------------------------
// CatalogResults — the shared body of the /collection and /category pages.
//
// Renders one of three states around the paginated catalog grid:
//   • error  — the API request failed (`result` is null)
//   • empty  — the API returned no items
//   • grid   — item tiles + count + pagination + ItemList structured data
//
// It is a plain server component: pages fetch via lib/api/* and pass the
// result down, keeping data-fetching out of the UI layer.
// ---------------------------------------------------------------------------

export interface CatalogPageResult {
    count: number
    next: string | null
    previous: string | null
    results: CatalogCardItem[]
}

export function CatalogResults({
    result,
    page,
    pageSize,
    baseHref,
    itemHrefFor,
    countLabel,
    emptyTitle,
    emptyHint,
}: {
    /** The paginated API result, or `null` when the request failed. */
    result: CatalogPageResult | null
    /** Current page number (1-based). */
    page: number
    /** Page size used for the fetch — only used for ItemList positions. */
    pageSize: number
    /** Base path of this listing, used to build pagination links. */
    baseHref: string
    /** Builds the target link for an item slug. */
    itemHrefFor: (slug: string) => string
    /** Noun shown after the result count (e.g. «کالکشن»). */
    countLabel: string
    emptyTitle: string
    emptyHint: string
}) {
    if (result === null) {
        return <CatalogErrorState baseHref={baseHref} />
    }

    const items = result.results

    if (items.length === 0) {
        return <CatalogEmptyState title={emptyTitle} hint={emptyHint} baseHref={baseHref} />
    }

    const itemListLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        numberOfItems: result.count,
        itemListElement: items.map((item, idx) => ({
            "@type": "ListItem",
            position: (page - 1) * pageSize + idx + 1,
            url: itemHrefFor(item.slug),
            name: item.title,
        })),
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
            />

            <p className="mb-5 text-xs text-muted-foreground">
                {formatFaNumber(result.count)} {countLabel}
            </p>

            <ul
                role="list"
                className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-5"
            >
                {items.map((item, idx) => (
                    <li key={item.slug}>
                        <CatalogCard
                            item={item}
                            href={itemHrefFor(item.slug)}
                            eager={idx < 4}
                            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                        />
                    </li>
                ))}
            </ul>

            <PaginationNav
                currentPage={page}
                hasNext={Boolean(result.next)}
                hasPrevious={Boolean(result.previous)}
                makeHref={(target) => (target > 1 ? `${baseHref}?page=${target}` : baseHref)}
            />
        </>
    )
}

/** Grid fallback shown while the page's data streams in. */
export function CatalogGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div
            aria-hidden
            className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-5"
        >
            {Array.from({ length: count }).map((_, i) => (
                <CatalogCardSkeleton key={i} />
            ))}
        </div>
    )
}

function CatalogEmptyState({
    title,
    hint,
    baseHref,
}: {
    title: string
    hint: string
    baseHref: string
}) {
    return (
        <div className="rounded-2xl border border-dashed border-border px-6 py-20 text-center">
            <p className="text-sm font-medium text-foreground">{title}</p>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">{hint}</p>
            <Link
                href={baseHref}
                className="mt-5 inline-flex h-10 items-center rounded-lg border border-border bg-card px-5 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
                تلاش دوباره
            </Link>
        </div>
    )
}

function CatalogErrorState({ baseHref }: { baseHref: string }) {
    return (
        <div className="rounded-2xl border border-border bg-muted/30 px-6 py-20 text-center">
            <p className="text-sm font-medium text-foreground">دریافت اطلاعات با مشکل مواجه شد</p>
            <p className="mt-2 text-xs text-muted-foreground">
                لطفاً چند لحظه دیگر دوباره تلاش کنید یا از طریق واتساپ با ما در تماس باشید.
            </p>
            <Link
                href={baseHref}
                className="mt-5 inline-flex h-10 items-center rounded-lg border border-border bg-card px-5 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
                تلاش دوباره
            </Link>
        </div>
    )
}
