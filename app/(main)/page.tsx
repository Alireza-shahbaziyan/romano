import Image from "next/image"
import { Link } from "next-view-transitions"

import { Hero } from "@/components/home/hero"
import { AboutPreview, ContactBand, Services, ValueStrip } from "@/components/home/sections"
import { SectionHeader } from "@/components/home/section-header"
import { Reveal } from "@/components/layout/scroll-reveal"
import { CatalogCard } from "@/components/catalog/catalog-card"
import { ProductCard } from "@/components/product/product-card"
import { PostCard } from "@/components/blog/post-card"
import { ArrowIcon } from "@/components/layout/home-icons"
import { getFeaturedProducts, getLatestProducts } from "@/lib/api/product"
import { getCategories } from "@/lib/api/category"
import { getCollections } from "@/lib/api/collection"
import { getCustomerGallery } from "@/lib/api/gallery"
import { getLatestPosts } from "@/lib/api/post"
import { toProductCardData } from "@/lib/product-data"
import { siteConfig, siteDescription, siteKeywords } from "@/lib/site"
import type { CategoryListItem } from "@/types/category"
import type { CollectionListItem } from "@/types/collection"
import type { CustomerGalleryItem } from "@/types/gallery"
import type { PostListItem } from "@/types/post"
import type { ProductListItem } from "@/types/product"

export const dynamic = "force-dynamic"

// ---------------------------------------------------------------------------
// Homepage — «رومانو فینگر | Romano Finger».
//
// Every data-driven section renders straight from the backend (products,
// categories, collections, customer gallery, blog) and hides itself
// gracefully when the API has nothing to show — no fabricated content.
// The marketing sections (services, about, contact) live in
// components/home/sections.tsx.
// ---------------------------------------------------------------------------

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export default async function Home() {
    const [featured, latest, categories, collections, gallery, posts] = await Promise.all([
        getFeaturedProducts(8).catch(() => null),
        getLatestProducts(8).catch(() => null),
        getCategories({ page_size: 12 }).catch(() => null),
        getCollections().catch(() => null),
        getCustomerGallery(8).catch(() => null),
        getLatestPosts(1, 4).catch(() => null),
    ])

    // Featured products are the lead taste of the menu; when nothing is
    // marked featured yet, fall back to the newest real products.
    const featuredItems = featured?.results?.length ? featured.results : (latest?.results ?? [])
    const categoryItems = categories?.results ?? []
    const collectionItems = collections?.results ?? []
    const galleryItems = gallery?.results ?? []
    const postItems = posts?.results ?? []

    const heroImage = pickHeroImage(featuredItems, collectionItems)

    // Structured data for local SEO (فینگر فود یزد / رومانو فینگر).
    const localBusinessLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: siteConfig.name,
        alternateName: siteConfig.nameEn,
        description: siteDescription,
        slogan: siteConfig.slogan.replace("✨ ", ""),
        founder: { "@type": "Person", name: siteConfig.owner },
        telephone: `+${siteConfig.whatsappUrl.replace("https://wa.me/", "")}`,
        address: {
            "@type": "PostalAddress",
            addressLocality: siteConfig.city,
            addressCountry: "IR",
        },
        areaServed: siteConfig.location,
        sameAs: [siteConfig.instagramUrl],
        url: SITE_URL,
        image: heroImage?.src ?? undefined,
        keywords: siteKeywords.join("، "),
    }

    return (
        <main className="relative w-full overflow-x-hidden pb-20 lg:pb-28">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
            />

            <Hero image={heroImage} />
            <Reveal>
                <ValueStrip />
            </Reveal>
            <Reveal>
                <FeaturedProducts items={featuredItems.slice(0, 4)} />
            </Reveal>
            <Reveal>
                <CategoriesSection items={categoryItems} />
            </Reveal>
            <Reveal>
                <VipShowcase items={collectionItems} />
            </Reveal>
            <Reveal>
                <Services />
            </Reveal>
            <Reveal>
                <PostsSection items={postItems.slice(0, 3)} />
            </Reveal>
            <Reveal>
                <GallerySection items={galleryItems} />
            </Reveal>
            <Reveal>
                <AboutPreview />
            </Reveal>
            <Reveal>
                <ContactBand />
            </Reveal>
        </main>
    )
}

// ---------------------------------------------------------------------------
// Hero imagery — the first featured product's photo, or the first
// collection photo as a fallback. Purely real backend assets.
// ---------------------------------------------------------------------------
function pickHeroImage(
    products: ProductListItem[],
    collections: CollectionListItem[]
): { src: string; alt: string } | null {
    const productImage = products
        .flatMap((p) => p.images)
        .find((img) => img.image && img.is_primary)

    if (productImage) {
        return { src: productImage.image, alt: productImage.alt_text || productImage.caption }
    }

    const anyProductImage = products.flatMap((p) => p.images).find((img) => img.image)
    if (anyProductImage) {
        return {
            src: anyProductImage.image,
            alt: anyProductImage.alt_text || anyProductImage.caption,
        }
    }

    const collectionImage = collections.find((c) => c.image || c.image_dark)
    if (collectionImage) {
        return {
            src: (collectionImage.image ?? collectionImage.image_dark) as string,
            alt: collectionImage.title,
        }
    }

    return null
}

// ---------------------------------------------------------------------------
// Featured products — a taste of the menu; /products is the full catalog.
// ---------------------------------------------------------------------------
function FeaturedProducts({ items }: { items: ProductListItem[] }) {
    return (
        <section className="mt-14 lg:mx-auto lg:mt-28 lg:max-w-295 lg:px-8 xl:px-10">
            <SectionHeader eyebrow="منوی رومانو فینگر" title="فینگر فودهای ویژه" href="/products" />
            <ul
                role="list"
                className="grid grid-cols-2 gap-3 px-5 lg:mt-10 lg:grid-cols-4 lg:gap-6 lg:px-0"
            >
                {items.map((item, idx) => (
                    <li key={item.slug}>
                        <ProductCard
                            product={toProductCardData(item)}
                            eager={idx < 2}
                            sizes="(max-width: 1024px) 45vw, 25vw"
                            badgeLabel={idx === 0 ? "پیشنهاد رومانو" : undefined}
                        />
                    </li>
                ))}
            </ul>
        </section>
    )
}

// ---------------------------------------------------------------------------
// Categories — the popular product categories, straight from the API.
// ---------------------------------------------------------------------------
function CategoriesSection({ items }: { items: CategoryListItem[] }) {
    if (items.length === 0) return null

    return (
        <section className="mt-14 lg:mx-auto lg:mt-28 lg:max-w-295 lg:px-8 xl:px-10">
            <SectionHeader
                eyebrow="دسته‌بندی‌ها"
                title="محبوب‌ترین دسته‌های فینگر فود"
                href="/category"
            />
            <ul
                role="list"
                className="flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto overscroll-x-contain px-5 pb-1 lg:mt-10 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
            >
                {items.map((category, idx) => (
                    <li key={category.slug} className="w-40 shrink-0 snap-start lg:w-auto">
                        <CatalogCard
                            item={category}
                            href={`/products?category=${category.slug}`}
                            eager={idx < 4}
                            sizes="(max-width: 1024px) 160px, 25vw"
                            headingLevel="h3"
                        />
                    </li>
                ))}
            </ul>
        </section>
    )
}

// ---------------------------------------------------------------------------
// VIP showcase — collection photography as an editorial spotlight:
// one wide tile and one narrow tile, linking into the catalog.
// ---------------------------------------------------------------------------
function VipShowcase({ items }: { items: CollectionListItem[] }) {
    const [primary, secondary] = items
    if (!primary) return null

    return (
        <section className="mt-14 lg:mx-auto lg:mt-28 lg:max-w-295 lg:px-8 xl:px-10">
            <SectionHeader
                eyebrow="دیزاین و دکور VIP"
                title="دیزاین میز پذیرایی و طراحی VIP مراسم"
                href="/collection"
            />
            <div className="grid grid-cols-1 gap-3 px-5 lg:grid-cols-[1.6fr_1fr] lg:gap-5 lg:px-0">
                <SpotlightTile item={primary} eager aspect="aspect-4/5 lg:aspect-16/10" />
                {secondary && (
                    <SpotlightTile item={secondary} aspect="aspect-4/5 lg:aspect-auto lg:h-full" />
                )}
            </div>
        </section>
    )
}

function SpotlightTile({
    item,
    eager,
    aspect,
}: {
    item: CollectionListItem
    eager?: boolean
    aspect: string
}) {
    const hasImage = Boolean(item.image || item.image_dark)
    if (!hasImage) return null

    return (
        <Link
            href={`/products?collection=${item.slug}`}
            className={`group relative block overflow-hidden rounded-2xl ${aspect}`}
        >
            {item.image && (
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${item.image_dark ? "dark:hidden" : ""}`}
                    loading={eager ? "eager" : "lazy"}
                />
            )}
            {item.image_dark && (
                <Image
                    src={item.image_dark}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${item.image ? "hidden dark:block" : ""}`}
                    loading={eager ? "eager" : "lazy"}
                />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 text-neutral-50 lg:p-6">
                <div>
                    <p className="text-sm font-semibold lg:text-base">{item.title}</p>
                    {item.short_description && (
                        <p className="mt-1 line-clamp-1 hidden max-w-lg text-xs text-neutral-200 lg:block">
                            {item.short_description}
                        </p>
                    )}
                </div>
                <ArrowIcon className="size-3.5 transition-transform group-hover:-translate-x-1 lg:size-4" />
            </div>
        </Link>
    )
}

// ---------------------------------------------------------------------------
// Blog preview — the latest articles from the magazine.
// ---------------------------------------------------------------------------
function PostsSection({ items }: { items: PostListItem[] }) {
    if (items.length === 0) return null

    return (
        <section className="mt-14 lg:mx-auto lg:mt-28 lg:max-w-295 lg:px-8 xl:px-10">
            <SectionHeader eyebrow="مجله رومانو" title="آخرین مطالب" href="/blog" />
            <ul
                role="list"
                className="grid grid-cols-1 gap-x-8 gap-y-10 px-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:px-0"
            >
                {items.map((post, idx) => (
                    <li key={post.slug}>
                        <PostCard post={post} eager={idx < 2} />
                    </li>
                ))}
            </ul>
        </section>
    )
}

// ---------------------------------------------------------------------------
// Gallery — real photos of delivered work (customer gallery API),
// doubling as the visual showcase. Links out to Instagram.
// ---------------------------------------------------------------------------
function GallerySection({ items }: { items: CustomerGalleryItem[] }) {
    if (items.length === 0) return null

    return (
        <section className="mt-14 lg:mx-auto lg:mt-28 lg:max-w-295 lg:px-8 xl:px-10">
            <SectionHeader
                eyebrow="نمونه کارها"
                title="گالری رومانو فینگر"
                href={siteConfig.instagramUrl}
            />
            <ul
                role="list"
                className="flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto overscroll-x-contain px-5 pb-1 lg:mt-10 lg:grid lg:grid-cols-4 lg:grid-rows-2 lg:gap-4 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
            >
                {items.slice(0, 8).map((item, idx) => (
                    <li
                        key={item.id}
                        className={`w-56 shrink-0 snap-start lg:w-auto ${idx === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
                    >
                        <a
                            href={siteConfig.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative block h-full overflow-hidden rounded-xl bg-accent"
                        >
                            <div
                                className={`relative w-full ${idx === 0 ? "aspect-4/5 lg:aspect-auto lg:h-full" : "aspect-4/5"}`}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.caption || "نمونه کار رومانو فینگر"}
                                    fill
                                    sizes={
                                        idx === 0
                                            ? "(max-width: 1024px) 224px, 50vw"
                                            : "(max-width: 1024px) 224px, 25vw"
                                    }
                                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                    loading={idx < 4 ? "eager" : "lazy"}
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                {(item.caption || item.customer_name) && (
                                    <div className="absolute inset-x-0 bottom-0 p-3 text-neutral-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        {item.caption && (
                                            <p className="line-clamp-1 text-xs font-medium">
                                                {item.caption}
                                            </p>
                                        )}
                                        {item.customer_name && (
                                            <p className="mt-0.5 text-[10px] text-neutral-200">
                                                {item.customer_name}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    )
}
