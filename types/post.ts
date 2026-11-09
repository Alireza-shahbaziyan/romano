import type { ProductListItem } from "./product"
import type { BreadcrumbLd, JsonLd, MetaTag } from "./seo"

export interface Author {
    full_name: string
    avatar: string | null
}

export interface PostListItem {
    id: number
    title: string
    slug: string
    excerpt: string
    featured: boolean
    featured_image: string | null
    category: string | null
    author: Author
    published_at: string | null
    view_count: number
}

export interface PostList {
    count: number
    next: string | null
    previous: string | null
    results: PostListItem[]
}

export interface PostMedia {
    id: number
    file: string
    alt_text: string
    is_video: string
}

export interface Post {
    id: number
    title: string
    slug: string
    excerpt: string
    content_html: string
    featured: boolean
    featured_image: string | null
    category: string | null
    author: Author
    view_count: number
    allow_comments: boolean
    media: PostMedia[]
    meta_tag: MetaTag
    json_ld: JsonLd
    breadcrumb_ld: BreadcrumbLd
    /** Products the backend links to this post (same shape as ProductList items). */
    related_products: ProductListItem[]
    published_at: string | null
    updated_at: string
}
