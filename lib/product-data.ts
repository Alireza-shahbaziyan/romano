import type { ProductImage, ProductDetail, ProductListItem } from "@/types/product"

// ---------------------------------------------------------------------------
// Presentation projections for product data.
//
// This business doesn't publish prices, stock, or sizes — orders are placed
// through WhatsApp/Instagram. These helpers strip the commerce fields
// (variants with prices/stock, wishlist flags, …) before product data
// crosses into client components, so they never end up in the rendered
// HTML/payloads and every card/view stays presentation-only.
// ---------------------------------------------------------------------------

/** The minimal shape ProductCard renders. */
export type ProductCardData = Pick<
    ProductListItem,
    "id" | "slug" | "title" | "short_description" | "featured" | "images" | "collections_list"
>

export function toProductCardData(item: ProductListItem): ProductCardData {
    return {
        id: item.id,
        slug: item.slug,
        title: item.title,
        short_description: item.short_description,
        featured: item.featured,
        images: item.images,
        collections_list: item.collections_list,
    }
}

/** The minimal shape ProductView renders. */
export interface ProductViewData {
    slug: string
    title: string
    short_description: string
    description: string
    images: ProductImage[]
    category: { slug: string; title: string } | null
    collections: { slug: string; title: string }[]
}

export function toProductViewData(product: ProductDetail): ProductViewData {
    return {
        slug: product.slug,
        title: product.title,
        short_description: product.short_description,
        description: product.description,
        images: product.images,
        category: product.category
            ? { slug: product.category.slug, title: product.category.title }
            : null,
        collections: (product.collections ?? []).map((c) => ({ slug: c.slug, title: c.title })),
    }
}
