"use client"

import { useState } from "react"
import Image from "next/image"
import { Link } from "next-view-transitions"
import { Package } from "lucide-react"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

// ---------------------------------------------------------------------------
// CatalogCard — the shared tile for collections and product categories.
//
// Both listing pages (/collection and /category) render the same tile so
// the two views stay visually identical: photography (with light/dark
// image pair support), title, short description, and a clear link into the
// product catalog. Strictly typed against the backend's CollectionList /
// CategoryList items — no prices or commerce controls.
// ---------------------------------------------------------------------------

/** The minimal shape the tile renders — satisfied by collection and category items. */
export interface CatalogCardItem {
    slug: string
    title: string
    short_description: string
    image: string | null
    image_dark: string | null
}

export function CatalogCard({
    item,
    href,
    eager = false,
    sizes = "(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw",
    headingLevel: Heading = "h2",
}: {
    item: CatalogCardItem
    /** Where the tile links to (e.g. the filtered product catalog). */
    href: string
    /** Set for above-the-fold tiles to skip lazy-loading. */
    eager?: boolean
    /** Override the `sizes` attribute for the tile's actual layout width. */
    sizes?: string
    /** Card title element — h2 on listing pages, h3 under a section heading. */
    headingLevel?: "h2" | "h3"
}) {
    const hasImage = Boolean(item.image || item.image_dark)
    const [imgLoaded, setImgLoaded] = useState(false)

    return (
        <Link
            href={href}
            className="group block h-full overflow-hidden rounded-xl border border-border/60 bg-card transition-colors hover:border-primary/40"
        >
            <div className="relative aspect-4/3 w-full overflow-hidden bg-accent">
                {hasImage ? (
                    <>
                        {!imgLoaded && (
                            <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
                        )}
                        {item.image && (
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes={sizes}
                                className={cn(
                                    "object-cover transition-transform duration-500 ease-out group-hover:scale-105",
                                    item.image_dark && "dark:hidden",
                                    !imgLoaded && "opacity-0"
                                )}
                                loading={eager ? "eager" : "lazy"}
                                onLoad={() => setImgLoaded(true)}
                            />
                        )}
                        {item.image_dark && (
                            <Image
                                src={item.image_dark}
                                alt={item.title}
                                fill
                                sizes={sizes}
                                className={cn(
                                    "object-cover transition-transform duration-500 ease-out group-hover:scale-105",
                                    item.image && "hidden dark:block",
                                    !imgLoaded && "opacity-0"
                                )}
                                loading={eager ? "eager" : "lazy"}
                                onLoad={() => setImgLoaded(true)}
                            />
                        )}
                    </>
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <Package className="size-7 text-muted-foreground" />
                    </div>
                )}
            </div>

            <div className="p-3.5">
                <Heading className="line-clamp-1 text-sm font-semibold text-foreground">
                    {item.title}
                </Heading>
                {item.short_description && (
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {item.short_description}
                    </p>
                )}
            </div>
        </Link>
    )
}

export function CatalogCardSkeleton() {
    return (
        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border/60">
            <Skeleton className="aspect-4/3 w-full rounded-none" />
            <div className="flex flex-col gap-2 p-3.5">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="mt-1 h-3.5 w-full" />
                <Skeleton className="h-3.5 w-2/3" />
            </div>
        </div>
    )
}
