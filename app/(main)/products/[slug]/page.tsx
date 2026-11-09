import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Link } from "next-view-transitions"
import { getProduct } from "@/lib/api/product"
import { getRelatedProducts } from "@/lib/api/related-products"
import { metadataFromMetaTag } from "@/lib/seo"
import { toProductCardData, toProductViewData } from "@/lib/product-data"
import ProductView from "@/components/product/product-view"
import { ProductCard } from "@/components/product/product-card"
import { PageContainer } from "@/components/layout/page-container"
import { ArrowIcon } from "@/components/layout/home-icons"

export const dynamic = "force-dynamic"

// ---------------------------------------------------------------------------
// Product detail — gallery, full description, and the direct-ordering
// section (WhatsApp / Instagram / phone). Related products are derived
// from real API data (same category or collection).
// ---------------------------------------------------------------------------

type Props = {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const product = await getProduct(slug).catch(() => null)

    // Throwing notFound() here (before the layout shell streams) is what
    // makes an unknown slug respond with a real 404 status, not just the
    // 404 body under a 200.
    if (!product) notFound()

    const image =
        product.images.find((i) => i.is_primary)?.image ?? product.images[0]?.image ?? null

    return metadataFromMetaTag(product.meta_tag, {
        title: product.title,
        description: product.short_description || product.description?.slice(0, 160),
        image,
    })
}

export default async function ProductPage({ params }: Props) {
    const { slug } = await params
    const product = await getProduct(slug).catch(() => null)

    if (!product) notFound()

    const related = await getRelatedProducts(product, 4)

    return (
        <PageContainer className="pb-24">
            {/* Structured data — passed through from the API, which owns the
                shape search engines expect (same as the blog pages). */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(product.json_ld) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(product.breadcrumb_ld) }}
            />

            <ProductView product={toProductViewData(product)} />

            {related.length > 0 && (
                <section className="mt-16 lg:mt-24">
                    <div className="mb-6 flex items-end justify-between border-b border-border pb-4">
                        <h2 className="text-lg font-bold text-foreground lg:text-xl">
                            فینگر فودهای مرتبط
                        </h2>
                        <Link
                            href="/products"
                            className="group flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground lg:text-sm"
                        >
                            مشاهده همه
                            <ArrowIcon className="size-3 transition-transform group-hover:-translate-x-1" />
                        </Link>
                    </div>
                    <ul
                        role="list"
                        className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6"
                    >
                        {related.map((item, idx) => (
                            <li key={item.slug}>
                                <ProductCard
                                    product={toProductCardData(item)}
                                    eager={idx < 2}
                                    sizes="(max-width: 1024px) 45vw, 25vw"
                                />
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </PageContainer>
    )
}
