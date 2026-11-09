import type { Metadata } from "next"
import { Link } from "next-view-transitions"
import { Suspense } from "react"
import { getLatestPosts } from "@/lib/api/post"
import { PostCard } from "@/components/blog/post-card"
import { PageContainer } from "@/components/layout/page-container"
import { PaginationNav } from "@/components/layout/pagination-nav"
import { Skeleton } from "@/components/ui/skeleton"
import { toFaDigits } from "@/lib/utils"

export const dynamic = "force-dynamic"

// ---------------------------------------------------------------------------
// Blog listing — «مجله رومانو فینگر»: ایده‌ها و راهنماهای فینگر فود، دیزاین
// میز و تشریفات مراسم.
//
// The post grid streams inside a <Suspense> boundary within this page —
// deliberately not a segment-level loading.tsx, which would also wrap
// /blog/[slug] and turn its notFound() into a soft-404 (200).
// ---------------------------------------------------------------------------

interface BlogPageProps {
    searchParams: Promise<{ page?: string }>
}

function parsePage(page: string | undefined) {
    const n = Number(page)
    return Number.isFinite(n) && n > 1 ? Math.floor(n) : 1
}

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
    const pageNumber = parsePage((await searchParams).page)
    const canonical = pageNumber > 1 ? `/blog?page=${pageNumber}` : "/blog"

    return {
        title:
            pageNumber > 1
                ? `مجله رومانو فینگر — صفحه ${toFaDigits(pageNumber)}`
                : "مجله رومانو فینگر | ایده‌های فینگر فود و دیزاین میز",
        description:
            "مجله رومانو فینگر؛ ایده‌های فینگر فود تولد، دیزاین میز VIP برای عقد و نامزدی، انتخاب فینگر فود مهمانی و جدیدترین سبک‌های طراحی میز پذیرایی.",
        alternates: { canonical },
    }
}

export default function BlogPage({ searchParams }: BlogPageProps) {
    return (
        <PageContainer className="pb-24">
            <header className="max-w-xl">
                <p className="text-[11px] font-medium text-primary">مجله رومانو فینگر</p>
                <h1 className="mt-3 text-3xl leading-[1.6] font-bold text-foreground lg:text-4xl">
                    ایده‌ها و روایت‌های رومانو فینگر
                </h1>
                <p className="mt-4 text-sm leading-8 text-muted-foreground">
                    از ایده‌های میز فینگر فود تولد تا دیزاین میز VIP برای مراسم عقد و نامزدی — هر
                    چیزی که برای یک پذیرایی خاص و به‌یادماندنی لازم دارید.
                </p>
            </header>

            <Suspense fallback={<PostsSkeleton />}>
                <PostsSection searchParams={searchParams} />
            </Suspense>
        </PageContainer>
    )
}

async function PostsSection({ searchParams }: { searchParams: BlogPageProps["searchParams"] }) {
    const params = await searchParams
    const pageNumber = parsePage(params.page)
    const postList = await getLatestPosts(pageNumber).catch(() => null)
    const posts = postList?.results ?? []

    const itemListLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: posts.map((post, idx) => ({
            "@type": "ListItem",
            position: (pageNumber - 1) * posts.length + idx + 1,
            url: `/blog/${post.slug}`,
            name: post.title,
        })),
    }

    return (
        <>
            {/* rel=prev/next: Next's Metadata API has no field for these, but
                plain <link> tags rendered anywhere in the tree get hoisted
                into <head> automatically in the app router. */}
            {pageNumber > 1 && (
                <link
                    rel="prev"
                    href={pageNumber === 2 ? "/blog" : `/blog?page=${pageNumber - 1}`}
                />
            )}
            {postList?.next && <link rel="next" href={`/blog?page=${pageNumber + 1}`} />}

            {posts.length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
                />
            )}

            {postList === null ? (
                <ErrorState />
            ) : posts.length === 0 ? (
                <EmptyState />
            ) : (
                <ul
                    role="list"
                    className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {posts.map((post, idx) => (
                        <li key={post.slug}>
                            <PostCard post={post} eager={idx < 3} />
                        </li>
                    ))}
                </ul>
            )}

            <PaginationNav
                currentPage={pageNumber}
                hasNext={Boolean(postList?.next)}
                hasPrevious={Boolean(postList?.previous)}
                makeHref={(page) => (page > 1 ? `/blog?page=${page}` : "/blog")}
            />
        </>
    )
}

function PostsSkeleton() {
    return (
        <div
            aria-hidden
            className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
        >
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-4">
                    <Skeleton className="aspect-4/3 w-full rounded-2xl" />
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            ))}
        </div>
    )
}

function EmptyState() {
    return (
        <div className="mt-20 rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="text-sm text-muted-foreground">فعلاً یادداشتی منتشر نشده.</p>
        </div>
    )
}

function ErrorState() {
    return (
        <div className="mt-20 rounded-2xl border border-border bg-muted/30 p-12 text-center">
            <p className="text-sm font-medium text-foreground">دریافت مطالب با مشکل مواجه شد</p>
            <p className="mt-2 text-xs text-muted-foreground">
                لطفاً چند لحظه دیگر دوباره تلاش کنید.
            </p>
            <Link
                href="/blog"
                className="mt-5 inline-flex h-10 items-center rounded-lg border border-border bg-card px-5 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
                تلاش دوباره
            </Link>
        </div>
    )
}
