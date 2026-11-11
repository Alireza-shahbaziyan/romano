import type { Metadata } from "next"
import { Link } from "next-view-transitions"
import { Suspense } from "react"

import { PageContainer } from "@/components/layout/page-container"
import { PaginationNav } from "@/components/layout/pagination-nav"
import { ProductCard, ProductCardSkeleton } from "@/components/product/product-card"
import { ProductsFilterBar } from "@/components/product/products-filter-bar"
import { parseProductFilters, productFiltersToQuery } from "@/lib/product-filters"
import { getCategories } from "@/lib/api/category"
import { getCollections } from "@/lib/api/collection"
import { getProducts } from "@/lib/api/product"
import { toProductCardData } from "@/lib/product-data"
import { formatFaNumber } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import type { ProductListItem } from "@/types/product"

export const dynamic = "force-dynamic"

// ---------------------------------------------------------------------------
// Product catalog — «منوی فینگر فود رومانو فینگر».
//
// Server-rendered and fully linkable: search, category, collection, and
// sort all live in the URL query string. No prices or cart controls —
// ordering happens through the product pages via WhatsApp/Instagram.
//
// NOTE: the data sections stream inside <Suspense> boundaries *within* this
// page — deliberately NOT via a segment-level loading.tsx, which would also
// wrap /products/[slug] and turn its notFound() into a soft-404 (200).
// ---------------------------------------------------------------------------

const PAGE_SIZE = 12

interface ProductsPageProps {
    searchParams: Promise<{
        category?: string
        collection?: string
        q?: string
        sort?: string
        page?: string
    }>
}

type SearchParams = ProductsPageProps["searchParams"]

function parsePage(page: string | undefined) {
    const n = Number(page)
    return Number.isFinite(n) && n > 1 ? Math.floor(n) : 1
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "فینگر فود یزد | منوی فینگر فود رومانو فینگر",
        description:
            "منوی فینگر فود رومانو فینگر در یزد؛ فینگر فود تولد، عقد و نامزدی و مهمانی همراه با دیزاین میز پذیرایی و طراحی VIP مراسم. سفارش از واتساپ و اینستاگرام.",
        alternates: { canonical: "/products" },
    }
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
    return (
        <PageContainer className="pb-24">
            <header className="max-w-2xl">
                <p className="text-[11px] font-medium text-primary">فینگر فود یزد</p>
                <h1 className="mt-2 text-3xl font-bold text-foreground lg:text-4xl">
                    منوی فینگر فود رومانو فینگر
                </h1>
                <p className="mt-4 text-sm leading-8 text-muted-foreground">
                    از فینگر فود تولد و عقد و نامزدی گرفته تا فینگر فود مهمانی و پذیرایی مراسم —
                    منوی رومانو فینگر را ببینید و برای سفارش و هماهنگی، مستقیم با ما در تماس باشید.
                </p>
            </header>

            <section className="mt-8">
                <Suspense fallback={<FilterSkeleton />}>
                    <FilterSection searchParams={searchParams} />
                </Suspense>
            </section>

            <section className="mt-8">
                <Suspense fallback={<GridSkeleton />}>
                    <ResultsSection searchParams={searchParams} />
                </Suspense>
            </section>
        </PageContainer>
    )
}

// ---------------------------------------------------------------------------
// Filter controls (search / category / collection / sort) plus the result
// count — streamed first since it's cheap and frames the page.
// ---------------------------------------------------------------------------
async function FilterSection({ searchParams }: { searchParams: SearchParams }) {
    const params = await searchParams
    const filters = parseProductFilters(params)

    const [categories, collections] = await Promise.all([
        getCategories({ page_size: 50 }).catch(() => null),
        getCollections({ page_size: 50 }).catch(() => null),
    ])

    return (
        <ProductsFilterBar
            categories={categories?.results ?? []}
            collections={collections?.results ?? []}
            filters={filters}
        />
    )
}

// ---------------------------------------------------------------------------
// The product grid, structured data, empty/error states, and pagination.
// ---------------------------------------------------------------------------
async function ResultsSection({ searchParams }: { searchParams: SearchParams }) {
    const params = await searchParams
    const filters = parseProductFilters(params)
    const page = parsePage(params.page)

    const products = await getProducts({
        category: filters.category ?? undefined,
        collections: filters.collection ? [filters.collection] : undefined,
        search: filters.search || undefined,
        ordering: filters.sort,
        page,
        page_size: PAGE_SIZE,
    }).catch(() => null)

    const items = products?.results ?? []
    const count = products?.count ?? 0

    // ItemList structured data for the catalog.
    const itemListLd =
        items.length > 0
            ? {
                  "@context": "https://schema.org",
                  "@type": "ItemList",
                  numberOfItems: count,
                  itemListElement: items.map((item, idx) => ({
                      "@type": "ListItem",
                      position: (page - 1) * PAGE_SIZE + idx + 1,
                      url: `/products/${item.slug}`,
                      name: item.title,
                  })),
              }
            : null

    return (
        <>
            {itemListLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
                />
            )}

            {products === null ? (
                <ErrorState />
            ) : items.length === 0 ? (
                <EmptyState
                    hasFilters={Boolean(filters.category || filters.collection || filters.search)}
                />
            ) : (
                <>
                    <p className="mb-5 text-xs text-muted-foreground">
                        {formatFaNumber(count)} فینگر فود
                    </p>
                    <ul
                        role="list"
                        className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-5"
                    >
                        {items.map((item: ProductListItem, idx) => (
                            <li key={item.slug}>
                                <ProductCard
                                    product={toProductCardData(item)}
                                    eager={idx < 4}
                                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                                />
                            </li>
                        ))}
                    </ul>

                    <PaginationNav
                        currentPage={page}
                        hasNext={Boolean(products.next)}
                        hasPrevious={Boolean(products.previous)}
                        makeHref={(target) => `/products${productFiltersToQuery(filters, target)}`}
                    />
                </>
            )}
        </>
    )
}

// ---------------------------------------------------------------------------
// Streaming fallbacks.
// ---------------------------------------------------------------------------
function FilterSkeleton() {
    return (
        <div className="flex flex-col gap-3" aria-hidden>
            <Skeleton className="h-11 w-full rounded-lg" />
            <div className="hidden gap-3 sm:flex">
                <Skeleton className="h-9 w-48 rounded-lg" />
                <Skeleton className="h-9 w-48 rounded-lg" />
                <Skeleton className="h-9 w-40 rounded-lg" />
            </div>
        </div>
    )
}

function GridSkeleton() {
    return (
        <div
            aria-hidden
            className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-5"
        >
            {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    )
}

function EmptyState({ hasFilters }: { hasFilters: boolean }) {
    return (
        <div className="rounded-2xl border border-dashed border-border px-6 py-20 text-center">
            <p className="text-sm font-medium text-foreground">
                {hasFilters
                    ? "فینگر فودی با این فیلترها پیدا نشد"
                    : "فعلاً محصولی در منو قرار نگرفته"}
            </p>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">
                {hasFilters ? (
                    <>
                        فیلترها را تغییر دهید یا{" "}
                        <Link
                            href="/products"
                            className="font-medium text-primary underline underline-offset-4"
                        >
                            همه فینگر فودها
                        </Link>{" "}
                        را ببینید.
                    </>
                ) : (
                    "به‌زودی فینگر فودهای جدید رومانو فینگر اینجا نمایش داده می‌شوند."
                )}
            </p>
        </div>
    )
}

function ErrorState() {
    return (
        <div className="rounded-2xl border border-border bg-muted/30 px-6 py-20 text-center">
            <p className="text-sm font-medium text-foreground">دریافت منو با مشکل مواجه شد</p>
            <p className="mt-2 text-xs text-muted-foreground">
                لطفاً چند لحظه دیگر دوباره تلاش کنید یا از طریق واتساپ با ما در تماس باشید.
            </p>
            <Link
                href="/products"
                className="mt-5 inline-flex h-10 items-center rounded-lg border border-border bg-card px-5 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
                تلاش دوباره
            </Link>
        </div>
    )
}
