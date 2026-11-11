import type { Metadata } from "next"
import { Suspense } from "react"

import { PageContainer } from "@/components/layout/page-container"
import { CatalogGridSkeleton, CatalogResults } from "@/components/catalog/catalog-results"
import { getCollections } from "@/lib/api/collection"
import { parsePageParam } from "@/lib/utils"

export const dynamic = "force-dynamic"

// ---------------------------------------------------------------------------
// Collections — «کالکشن‌های رومانو فینگر».
//
// Server-rendered listing of the store's collections (GET /api/collections/,
// paginated). Each tile links into the product catalog filtered by that
// collection. Data lives in lib/api/collection.ts; this page only
// orchestrates it over the shared catalog UI.
//
// The grid streams inside a <Suspense> boundary within this page (same
// pattern as /products and /blog) so the skeleton shows immediately.
// ---------------------------------------------------------------------------

const PAGE_SIZE = 12

interface CollectionPageProps {
    searchParams: Promise<{ page?: string }>
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "کالکشن‌های رومانو فینگر | دیزاین میز و دکور VIP مراسم در یزد",
        description:
            "کالکشن‌های رومانو فینگر در یزد؛ مجموعه‌های فینگر فود و دیزاین میز پذیرایی با طراحی VIP مراسم تولد، عقد و نامزدی و مهمانی. برای سفارش از واتساپ و اینستاگرام اقدام کنید.",
        alternates: { canonical: "/collection" },
    }
}

export default function CollectionPage({ searchParams }: CollectionPageProps) {
    return (
        <PageContainer className="pb-24">
            <header className="max-w-2xl">
                <p className="text-[11px] font-medium text-primary">مجموعه‌های رومانو فینگر</p>
                <h1 className="mt-2 text-3xl font-bold text-foreground lg:text-4xl">
                    کالکشن‌های رومانو فینگر
                </h1>
                <p className="mt-4 text-sm leading-8 text-muted-foreground">
                    مجموعه‌های فینگر فود و دیزاین میز رومانو فینگر را ببینید؛ از طراحی VIP میز
                    پذیرایی گرفته تا منوهای خاص هر مراسم. برای سفارش و هماهنگی، مستقیم با ما در
                    تماس باشید.
                </p>
            </header>

            <section className="mt-8">
                <Suspense fallback={<CatalogGridSkeleton />}>
                    <CollectionsSection searchParams={searchParams} />
                </Suspense>
            </section>
        </PageContainer>
    )
}

async function CollectionsSection({
    searchParams,
}: {
    searchParams: CollectionPageProps["searchParams"]
}) {
    const params = await searchParams
    const page = parsePageParam(params.page)

    const collections = await getCollections({ page, page_size: PAGE_SIZE }).catch(() => null)

    return (
        <CatalogResults
            result={collections}
            page={page}
            pageSize={PAGE_SIZE}
            baseHref="/collection"
            itemHrefFor={(slug) => `/products?collection=${slug}`}
            countLabel="کالکشن"
            emptyTitle="فعلاً کالکشنی ثبت نشده"
            emptyHint="به‌زودی کالکشن‌های جدید رومانو فینگر اینجا نمایش داده می‌شوند."
        />
    )
}
