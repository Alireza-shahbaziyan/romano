import type { CategoryMinimal } from "./category"
import type { CollectionListItem } from "./collection"
import type { BreadcrumbLd, JsonLd, MetaTag } from "./seo"

export type ProductList = {
    count: number
    next: string | null
    previous: string | null
    results: ProductListItem[]
}

export type ProductListItem = {
    id: number
    title: string
    slug: string
    short_description: string
    featured: boolean
    published_at: string | null
    images: ProductImage[]
    variants: ProductVariant[]
    collections_list: string[]
}

export type ProductImage = {
    id: number
    image: string
    media_kind: "gallery" | "size_chart" | "fabric_guide" | "design" | string
    caption: string
    alt_text: string
    is_primary: boolean
}

export type SizeAttributes = {
    key: string
    value: string
    sort_order: number
}

export type ProductSize = {
    name: string
    label: string
    attributes: SizeAttributes[]
}

export type ProductVariant = {
    id: number
    sku: string
    size: ProductSize
    size_name: string
    price: number
    compare_price: number | null
    stock: number
    is_active: boolean
}

export type ProductStatus = "draft" | "active" | "archived"

export interface ProductDetail {
    id: number
    title: string
    slug: string
    short_description: string
    description: string
    status: ProductStatus
    published_at: string | null
    featured: boolean
    collections: CollectionListItem[]
    category: CategoryMinimal
    images: ProductImage[]
    /** Optional audio track URL attached to the product (unused on this website). */
    audio: string | null
    variants: ProductVariant[]
    is_in_wishlist: boolean
    meta_tag: MetaTag
    json_ld: JsonLd
    breadcrumb_ld: BreadcrumbLd
    created_at: string
    updated_at: string
}
