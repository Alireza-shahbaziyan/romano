import { cache } from "react"
import { getProducts } from "@/lib/api/product"
import type { ProductListItem } from "@/types/product"

// ---------------------------------------------------------------------------
// Related products for a product page.
//
// The backend exposes no dedicated "related products" endpoint, so this
// derives related items from real API data instead of inventing one: other
// products from the same category (falling back to the same collection),
// with the current product excluded. Every result is a real product from
// GET /api/products/ — nothing is fabricated here.
//
// Wrapped in React's cache() so a product page that needs related items in
// more than one place only pays for one fetch per request.
// ---------------------------------------------------------------------------
export const getRelatedProducts = cache(async function getRelatedProducts(
    current: Pick<ProductListItem, "id" | "slug"> & {
        category?: { slug: string } | null
        collections?: { slug: string }[]
    },
    limit = 4
): Promise<ProductListItem[]> {
    const categorySlug = current.category?.slug
    const collectionSlug = current.collections?.[0]?.slug

    // Nothing to relate against — return no section rather than fake items.
    if (!categorySlug && !collectionSlug) return []

    const list = await getProducts({
        category: categorySlug,
        collections: categorySlug ? undefined : collectionSlug ? [collectionSlug] : undefined,
        page_size: limit + 1,
    }).catch(() => null)

    if (!list) return []

    return list.results.filter((item) => item.slug !== current.slug).slice(0, limit)
})
