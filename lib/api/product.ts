import request from "@/lib/api/client"
import { ProductList, ProductDetail } from "@/types/product"

// ---------------------------------------------------------------------------
// Filter params matching the /api/products/ query schema (see API.yaml):
//   category     -> category slug
//   collections  -> comma-separated list of collection slugs
//   featured     -> boolean
//   ordering     -> field name for DRF-style ordering (e.g. "-created_at")
//   page / page_size -> pagination
//   search       -> free-text search term
// ---------------------------------------------------------------------------

export type ProductOrdering = "created_at" | "-created_at" | "title" | "-title"

export interface ProductQueryParams {
    category?: string
    collections?: string[]
    featured?: boolean
    ordering?: ProductOrdering
    page?: number
    page_size?: number
    search?: string
}

function buildProductsQuery(params: ProductQueryParams = {}): string {
    const qs = new URLSearchParams()

    if (params.category) {
        qs.set("category", params.category)
    }
    if (params.collections && params.collections.length > 0) {
        qs.set("collections", params.collections.join(","))
    }
    if (typeof params.featured === "boolean") {
        qs.set("featured", String(params.featured))
    }
    if (params.ordering) {
        qs.set("ordering", params.ordering)
    }
    if (params.page) {
        qs.set("page", String(params.page))
    }
    if (params.page_size) {
        qs.set("page_size", String(params.page_size))
    }
    if (params.search && params.search.trim().length > 0) {
        qs.set("search", params.search.trim())
    }

    const query = qs.toString()
    return query ? `?${query}` : ""
}

/**
 * Generic, filterable products fetch. Pass an AbortSignal from the caller
 * so in-flight requests can be cancelled when the filters change again
 * before the previous request resolves.
 */
export function getProducts(
    params: ProductQueryParams = {},
    signal?: AbortSignal
): Promise<ProductList> {
    return request<ProductList>(`/api/products/${buildProductsQuery(params)}`, {
        method: "GET",
        signal,
    })
}

// Thin, readable wrappers for the two most common call sites.
export function getLatestProducts(pageSize?: number): Promise<ProductList> {
    return getProducts({ ordering: "-created_at", page_size: pageSize })
}

export function getFeaturedProducts(pageSize?: number): Promise<ProductList> {
    return getProducts({ featured: true, page_size: pageSize })
}

export function getProduct(slug: string): Promise<ProductDetail | null> {
    return request<ProductDetail>(`/api/products/${slug}/`, {
        method: "GET",
    })
}
