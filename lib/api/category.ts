import request from "@/lib/api/client"
import type { CategoryList, CategoryMinimal } from "@/types/category"

// ---------------------------------------------------------------------------
// Query params matching the GET /api/categories/ schema (see API.yaml):
//   ordering   -> DRF-style ordering field
//   page       -> page number within the paginated result set
//   page_size  -> number of results per page
//   search     -> free-text search term
// ---------------------------------------------------------------------------

export interface CategoryQueryParams {
    ordering?: string
    page?: number
    page_size?: number
    search?: string
}

function buildCategoriesQuery(params: CategoryQueryParams = {}): string {
    const qs = new URLSearchParams()

    if (params.ordering) qs.set("ordering", params.ordering)
    if (params.page) qs.set("page", String(params.page))
    if (params.page_size) qs.set("page_size", String(params.page_size))
    if (params.search && params.search.trim()) qs.set("search", params.search.trim())

    const query = qs.toString()
    return query ? `?${query}` : ""
}

export function getCategories(params: CategoryQueryParams = {}): Promise<CategoryList> {
    return request<CategoryList>(`/api/categories/${buildCategoriesQuery(params)}`, {
        method: "GET",
    })
}

export function getCategory(slug: string): Promise<CategoryMinimal | null> {
    return request<CategoryMinimal>(`/api/categories/${slug}/`, {
        method: "GET",
    })
}
