import type { ProductOrdering } from "@/lib/api/product"

// ---------------------------------------------------------------------------
// Shared catalog filter model — plain values and types (no React) used by
// both the server-rendered /products page and the client-side filter bar.
// Keeping these here (outside any "use client" module) lets the server
// import them safely.
// ---------------------------------------------------------------------------

export interface ProductFilterValues {
    category: string | null
    collection: string | null
    search: string
    sort: ProductOrdering
}

export const SORT_OPTIONS: { value: ProductOrdering; label: string }[] = [
    { value: "-created_at", label: "جدیدترین" },
    { value: "created_at", label: "قدیمی‌ترین" },
    { value: "title", label: "عنوان (الفبا)" },
]

export const DEFAULT_SORT: ProductOrdering = "-created_at"

const VALID_SORTS: ProductOrdering[] = SORT_OPTIONS.map((o) => o.value)

export function parseProductFilters(params: {
    category?: string
    collection?: string
    q?: string
    sort?: string
}): ProductFilterValues {
    const sort = params.sort as ProductOrdering | undefined
    return {
        category: params.category || null,
        collection: params.collection || null,
        search: params.q?.trim() ?? "",
        sort: sort && VALID_SORTS.includes(sort) ? sort : DEFAULT_SORT,
    }
}

/** Serializes filter state (and optionally a page) into a query string. */
export function productFiltersToQuery(filters: ProductFilterValues, page = 1): string {
    const params = new URLSearchParams()
    if (filters.category) params.set("category", filters.category)
    if (filters.collection) params.set("collection", filters.collection)
    if (filters.search) params.set("q", filters.search)
    if (filters.sort !== DEFAULT_SORT) params.set("sort", filters.sort)
    if (page > 1) params.set("page", String(page))
    const query = params.toString()
    return query ? `?${query}` : ""
}
