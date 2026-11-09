// Shared SEO structures returned by the backend for every entity
// (products, posts, categories, collections). Mirrors the `MetaTag`
// and `BreadcrumbLd` schemas in API.yaml.

export interface MetaTag {
    title: string
    description: string
    canonical_url: string
    is_indexable: boolean
    og_title: string
    og_description: string
    og_image: string | null
    twitter_card: "summary" | "summary_large_image" | string
}

export interface BreadcrumbItem {
    "@type": "ListItem"
    position: number
    name: string
    item: string
}

export interface BreadcrumbLd {
    "@context": "https://schema.org"
    "@type": "BreadcrumbList"
    itemListElement: BreadcrumbItem[]
}

/** Opaque JSON-LD blob — serialized into a <script> tag as-is. */
export type JsonLd = Record<string, unknown>
