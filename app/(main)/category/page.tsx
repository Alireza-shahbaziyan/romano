import type { Metadata } from "next"
import { Suspense } from "react"

import { PageContainer } from "@/components/layout/page-container"
import { CatalogGridSkeleton, CatalogResults } from "@/components/catalog/catalog-results"
import { getCategories } from "@/lib/api/category"
import { parsePageParam } from "@/lib/utils"

export const dynamic = "force-dynamic"

// ---------------------------------------------------------------------------
// Categories — «دسته‌بندی‌های فینگر فود رومانو فینگر».
//
// Server-rendered listing of the store's product categories
// (GET /api/categories/, paginated). Each tile links into the product
// catalog filtered by that category. Data lives in lib/api/category.ts;
// this page only orchestrates it over the shared catalog UI.
//
// The grid streams inside a <Suspense> boundary within this page (same
// pattern as /products and /blog) so the skeleton shows immediately.
// ---------------------------------------------------------------------------

const PAGE_SIZE = 12

interface CategoryPageProps {
    searchParams: Promise<{ page?: string }>
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "دسته‌بندی‌های فینگر فود رومانو فینگر | فینگر فود یزد",
        description:
            "دسته‌بندی‌های فینگر فود رومانو فینگر در یزد؛ فینگر فود تولد، عقد و نامزدی و مهمانی را در دسته‌های مختلف ببینید و برای سفارش از واتساپ و اینستاگرام اقدام کنید.",
        alternates: { canonical: "/category" },
    }
}

export default function CategoryPage({ searchParams }: CategoryPageProps) {
    return (
        <PageContainer className="pb-24">
            <header className="max-w-2xl">
                <p className="text-[11px] font-medium text-primary">منوی رومانو فینگر</p>
                <h1 className="mt-2 text-3xl font-bold text-foreground lg:text-4xl">
                    دسته‌بندی‌های فینگر فود
                </h1>
                <p className="mt-4 text-sm leading-8 text-muted-foreground">
                    فینگر فودهای رومانو فینگر را در دسته‌بندی‌های مختلف ببینید؛ از فینگر فود تولد
                    و عقد و نامزدی گرفته تا فینگر فود مهمانی و پذیرایی مراسم. برای سفارش و
                    هماهنگی، مستقیم با ما در تماس باشید.
                </p>
            </header>

            <section className="mt-8">
                <Suspense fallback={<CatalogGridSkeleton />}>
                    <CategoriesSection searchParams={searchParams} />
                </Suspense>
            </section>
        </PageContainer>
    )
}

async function CategoriesSection({
    searchParams,
}: {
    searchParams: CategoryPageProps["searchParams"]
}) {
    const params = await searchParams
    const page = parsePageParam(params.page)

    const categories = await getCategories({ page, page_size: PAGE_SIZE }).catch(() => null)

    return (
        <CatalogResults
            result={categories}
            page={page}
            pageSize={PAGE_SIZE}
            baseHref="/category"
            itemHrefFor={(slug) => `/products?category=${slug}`}
            countLabel="دسته‌بندی"
            emptyTitle="فعلاً دسته‌بندی‌ای ثبت نشده"
            emptyHint="به‌زودی دسته‌بندی‌های جدید فینگر فود اینجا نمایش داده می‌شوند."
        />
    )
}
