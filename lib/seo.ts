import type { Metadata } from "next"
import { siteConfig, siteDescription, siteKeywords } from "@/lib/site"

// ---------------------------------------------------------------------------
// Shared metadata helpers — kept in one place so every page builds its
// Persian SEO fields (title, description, Open Graph, canonical) the same
// way, and the brand identity isn't copy-pasted across page files.
// ---------------------------------------------------------------------------

/** Full site metadata for the root layout. */
export function buildSiteMetadata(): Metadata {
    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
        title: {
            default: `رومانو فینگر | فینگر فود و دیزاین VIP مراسم در ${siteConfig.city}`,
            template: `%s | ${siteConfig.name}`,
        },
        description: siteDescription,
        keywords: [...siteKeywords],
        applicationName: siteConfig.name,
        authors: [{ name: siteConfig.owner }],
        creator: siteConfig.owner,
        openGraph: {
            type: "website",
            locale: "fa_IR",
            siteName: siteConfig.name,
            title: `${siteConfig.name} | ${siteConfig.tagline}`,
            description: siteDescription,
            url: "/",
        },
        twitter: {
            card: "summary_large_image",
            title: `${siteConfig.name} | ${siteConfig.tagline}`,
            description: siteDescription,
        },
        robots: {
            index: true,
            follow: true,
        },
        alternates: {
            canonical: "/",
        },
    }
}

/**
 * Maps the backend's `meta_tag` payload (see the MetaTag schema in API.yaml)
 * to Next.js Metadata, falling back to the given defaults when a field is
 * empty. Used by product and blog pages, which own their SEO in the CMS.
 */
export function metadataFromMetaTag(
    meta: {
        title?: string
        description?: string
        canonical_url?: string
        is_indexable?: boolean
        og_title?: string
        og_description?: string
        og_image?: string | null
        twitter_card?: string
    },
    fallback: { title: string; description: string; image?: string | null }
): Metadata {
    const title = meta.title || fallback.title
    const description = meta.description || fallback.description
    const ogTitle = meta.og_title || title
    const ogDescription = meta.og_description || description
    const image = meta.og_image ?? fallback.image ?? null
    const isIndexable = meta.is_indexable ?? true

    return {
        title,
        description,
        alternates: meta.canonical_url ? { canonical: meta.canonical_url } : undefined,
        robots: {
            index: isIndexable,
            follow: isIndexable,
        },
        openGraph: {
            type: "article",
            title: ogTitle,
            description: ogDescription,
            url: meta.canonical_url || undefined,
            images: image ? [{ url: image }] : undefined,
        },
        twitter: {
            card: meta.twitter_card === "summary" ? "summary" : "summary_large_image",
            title: ogTitle,
            description: ogDescription,
            images: image ? [image] : undefined,
        },
    }
}
