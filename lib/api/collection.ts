import request from "@/lib/api/client"
import { CollectionList } from "@/types/collection"

// ---------------------------------------------------------------------------
// Query params matching the GET /api/collections/ schema (see API.yaml):
//   ordering   -> DRF-style ordering field
//   page       -> page number within the paginated result set
//   page_size  -> number of results per page
//   search     -> free-text search term
// ---------------------------------------------------------------------------

export interface CollectionQueryParams {
    ordering?: string
    page?: number
    page_size?: number
    search?: string
}

function buildCollectionsQuery(params: CollectionQueryParams = {}): string {
    const qs = new URLSearchParams()

    if (params.ordering) qs.set("ordering", params.ordering)
    if (params.page) qs.set("page", String(params.page))
    if (params.page_size) qs.set("page_size", String(params.page_size))
    if (params.search && params.search.trim()) qs.set("search", params.search.trim())

    const query = qs.toString()
    return query ? `?${query}` : ""
}

export function getCollections(params: CollectionQueryParams = {}): Promise<CollectionList> {
    return request<CollectionList>(`/api/collections/${buildCollectionsQuery(params)}`, {
        method: "GET",
    })
}
