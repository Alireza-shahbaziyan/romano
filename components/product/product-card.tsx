"use client"

import { useState } from "react"
import Image from "next/image"
import { Link } from "next-view-transitions"
import { Package } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import type { ProductCardData } from "@/lib/product-data"
import { ArrowIcon } from "@/components/layout/home-icons"

// ---------------------------------------------------------------------------
// ProductCard — a presentation-first catalog tile for Romano Finger.
//
// This business takes orders through WhatsApp/Instagram, so the card
// deliberately shows no prices, stock, sizes, or cart controls: just the
// photography, the name, a short description, and a clear path to the
// product page (which carries the ordering buttons).
// ---------------------------------------------------------------------------

function getPrimaryImage(images: ProductCardData["images"]) {
    return images.find((image) => image.is_primary) ?? images[0] ?? null
}

export function ProductCard({
    product,
    eager = false,
    sizes = "(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 22vw",
    badgeLabel,
}: {
    product: ProductCardData
    /** Set for above-the-fold tiles (e.g. the first row) to skip lazy-loading. */
    eager?: boolean
    /** Override the `sizes` attribute for the tile's actual layout width. */
    sizes?: string
    /** Manual badge text (e.g. "پرفروش") shown instead of the default "ویژه" tag. */
    badgeLabel?: string
}) {
    const image = getPrimaryImage(product.images)
    // Tracks whether the actual <Image> has finished decoding, so we can
    // keep a Skeleton over the tile instead of showing empty/broken space
    // while the network fetch is in flight.
    const [imgLoaded, setImgLoaded] = useState(false)
    const collectionLabel = product.collections_list?.[0]

    return (
        <Link
            href={`/products/${product.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-colors hover:border-foreground/25"
        >
            <div className="relative aspect-4/5 w-full shrink-0 overflow-hidden bg-accent">
                {image ? (
                    <>
                        {!imgLoaded && (
                            <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
                        )}
                        <Image
                            src={image.image}
                            alt={image.alt_text || product.title}
                            fill
                            sizes={sizes}
                            quality={70}
                            draggable={false}
                            className={cn(
                                "object-cover transition-all duration-700 ease-out select-none group-hover:scale-[1.035]",
                                !imgLoaded && "opacity-0"
                            )}
                            priority={eager}
                            loading={eager ? undefined : "lazy"}
                            onLoad={() => setImgLoaded(true)}
                        />
                    </>
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <Package className="size-8 text-muted-foreground" />
                    </div>
                )}

                {/* start = right edge in this RTL layout */}
                {(badgeLabel || product.featured) && (
                    <div className="absolute start-2.5 top-2.5">
                        <Badge className="border-transparent bg-foreground/90 text-background backdrop-blur-sm">
                            {badgeLabel ?? "ویژه"}
                        </Badge>
                    </div>
                )}

                <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            <div className="flex flex-1 flex-col gap-2 p-3.5">
                {collectionLabel && (
                    <p className="line-clamp-1 text-[10px] font-medium text-muted-foreground">
                        {collectionLabel}
                    </p>
                )}

                <h3 className="line-clamp-1 text-sm font-semibold text-foreground">
                    {product.title}
                </h3>

                {product.short_description && (
                    <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {product.short_description}
                    </p>
                )}

                <span className="mt-auto flex items-center gap-1 pt-2 text-xs font-medium text-primary">
                    مشاهده و سفارش
                    <ArrowIcon className="size-3 transition-transform duration-300 group-hover:-translate-x-1" />
                </span>
            </div>
        </Link>
    )
}

export function ProductCardSkeleton() {
    return (
        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border/60">
            <Skeleton className="aspect-4/5 w-full rounded-none" />
            <div className="flex flex-col gap-2 p-3.5">
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="mt-1 h-3.5 w-full" />
                <Skeleton className="mt-2 h-3.5 w-1/2" />
            </div>
        </div>
    )
}
