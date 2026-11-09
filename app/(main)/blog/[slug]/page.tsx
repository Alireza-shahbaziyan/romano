import type { Metadata } from "next"
import Image from "next/image"
import { Link } from "next-view-transitions"
import { notFound } from "next/navigation"
import sanitizeHtml from "sanitize-html"
import { formatPostDate, toFaDigits } from "@/lib/utils"
import { getLatestPosts, getPost } from "@/lib/api/post"
import { estimateReadingTime } from "@/lib/reading-time"
import { metadataFromMetaTag } from "@/lib/seo"
import { CopyLinkButton } from "@/components/blog/copy-link-button"
import { PostCard } from "@/components/blog/post-card"

export const dynamic = "force-dynamic"

// ---------------------------------------------------------------------------
// Article detail — full blog post with reading time, category, sanitized
// HTML body, structured data, and related reading at the end. No comment
// system: discussion happens on the business's WhatsApp/Instagram.
// ---------------------------------------------------------------------------

interface PostPageProps {
    params: Promise<{ slug: string }>
}

// Tags allowed in `content_html` — the backend renders article bodies as
// HTML, so it gets sanitized before being injected into the page.
const ALLOWED_TAGS = [
    "p",
    "br",
    "hr",
    "h2",
    "h3",
    "h4",
    "ul",
    "ol",
    "li",
    "strong",
    "em",
    "b",
    "i",
    "u",
    "span",
    "a",
    "img",
    "blockquote",
    "figure",
    "figcaption",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
]

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const { slug } = await params
    const post = await getPost(slug).catch(() => null)

    // Throwing notFound() here (before the layout shell streams) is what
    // makes an unknown slug respond with a real 404 status, not just the
    // 404 body under a 200.
    if (!post) notFound()

    return metadataFromMetaTag(post.meta_tag, {
        title: post.title,
        description: post.excerpt,
        image: post.featured_image,
    })
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params
    const post = await getPost(slug).catch(() => null)

    if (!post) notFound()

    const readingMinutes = estimateReadingTime(post.content_html)
    const safeContentHtml = sanitizeHtml(post.content_html, {
        allowedTags: ALLOWED_TAGS,
        allowedAttributes: {
            a: ["href", "title", "target", "rel"],
            img: ["src", "alt", "title", "width", "height", "loading"],
            td: ["colspan", "rowspan"],
            th: ["colspan", "rowspan"],
        },
    })

    // Related reading — other articles from the magazine. (The backend has
    // no per-post "related articles" endpoint, so the latest posts are used
    // as real, non-fabricated related reading.)
    const relatedList = await getLatestPosts(1, 4).catch(() => null)
    const related = (relatedList?.results ?? []).filter((p) => p.slug !== post.slug).slice(0, 3)

    return (
        <>
            {/* Structured data — passed through as-is from the API, which
                already owns the shape search engines expect. */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(post.json_ld) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(post.breadcrumb_ld) }}
            />

            <article className="mx-auto max-w-180 px-5 pt-24 pb-24 sm:px-8">
                <header>
                    {post.category && (
                        <p className="text-[11px] font-medium text-primary">{post.category}</p>
                    )}

                    <h1 className="mt-3 text-3xl leading-[1.6] font-bold text-foreground sm:text-4xl">
                        {post.title}
                    </h1>

                    {post.excerpt && (
                        <p className="mt-4 text-base leading-9 text-muted-foreground">
                            {post.excerpt}
                        </p>
                    )}

                    <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-border py-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2.5">
                            {post.author.avatar ? (
                                <Image
                                    src={post.author.avatar}
                                    alt={post.author.full_name}
                                    width={36}
                                    height={36}
                                    className="size-9 rounded-full object-cover"
                                />
                            ) : (
                                <span
                                    aria-hidden
                                    className="flex size-9 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground"
                                >
                                    {post.author.full_name.slice(0, 1)}
                                </span>
                            )}
                            <span className="font-medium text-foreground">
                                {post.author.full_name}
                            </span>
                        </div>
                        {formatPostDate(post.published_at) && (
                            <>
                                <Dot />
                                <time dateTime={post.published_at ?? undefined}>
                                    {formatPostDate(post.published_at)}
                                </time>
                            </>
                        )}
                        <Dot />
                        <span>{toFaDigits(readingMinutes)} دقیقه مطالعه</span>
                    </div>
                </header>

                {post.featured_image && (
                    <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl bg-muted">
                        <Image
                            src={post.featured_image}
                            alt={post.title}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 720px"
                            className="object-cover"
                        />
                    </div>
                )}

                <div
                    className={proseClassName}
                    dangerouslySetInnerHTML={{ __html: safeContentHtml }}
                />

                <footer className="mt-16 flex items-center justify-between border-t border-border pt-8">
                    <Link
                        href="/blog"
                        className="group flex items-center gap-2 text-sm font-medium text-foreground"
                    >
                        <ArrowIcon className="size-3.5 rotate-180 transition-transform group-hover:translate-x-1" />
                        بازگشت به مجله
                    </Link>
                    <CopyLinkButton url={post.meta_tag.canonical_url} />
                </footer>
            </article>

            {related.length > 0 && (
                <section className="mx-auto max-w-295 px-5 pb-24 sm:px-8">
                    <h2 className="border-b border-border pb-4 text-lg font-bold text-foreground lg:text-xl">
                        مطالب مرتبط
                    </h2>
                    <ul
                        role="list"
                        className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {related.map((item) => (
                            <li key={item.slug}>
                                <PostCard post={item} />
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </>
    )
}

function Dot() {
    return (
        <span aria-hidden className="text-border">
            ·
        </span>
    )
}

function ArrowIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
            <path
                d="M12 4 4 12M4 12H11M4 12V5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

// ---------------------------------------------------------------------------
// Typography for `content_html` — hand-styled via Tailwind arbitrary child
// selectors rather than assuming @tailwindcss/typography is installed.
// Targets the flat block-level sequence a rich-text editor typically
// outputs (p / h2 / h3 / ul / ol / blockquote / img / hr as top-level
// siblings), plus `a` and `img` as descendants since those can also appear
// inline inside a paragraph.
// ---------------------------------------------------------------------------
const proseClassName = [
    "mt-10 text-foreground",
    "[&>p]:mt-5 [&>p]:text-[15px] [&>p]:leading-[2.1] [&>p]:text-foreground/90",
    "[&>h2]:mt-12 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-foreground",
    "[&>h3]:mt-9 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-foreground",
    "[&>ul]:mt-5 [&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pr-5 [&>ul]:text-[15px] [&>ul]:leading-[2.1] [&>ul]:text-foreground/90",
    "[&>ol]:mt-5 [&>ol]:list-decimal [&>ol]:space-y-2 [&>ol]:pr-5 [&>ol]:text-[15px] [&>ol]:leading-[2.1] [&>ol]:text-foreground/90",
    "[&>blockquote]:mt-8 [&>blockquote]:border-r-2 [&>blockquote]:border-primary [&>blockquote]:pr-5 [&>blockquote]:text-lg [&>blockquote]:leading-relaxed [&>blockquote]:text-muted-foreground",
    "[&>img]:mt-8 [&>img]:w-full [&>img]:rounded-2xl",
    "[&>figure]:mt-8 [&>figure>figcaption]:mt-2 [&>figure>figcaption]:text-center [&>figure>figcaption]:text-xs [&>figure>figcaption]:text-muted-foreground [&>figure>img]:w-full [&>figure>img]:rounded-2xl",
    "[&>hr]:my-12 [&>hr]:border-border",
    "[&_a]:underline [&_a]:decoration-border [&_a]:underline-offset-4 [&_a]:transition-colors hover:[&_a]:decoration-foreground",
    "[&_strong]:font-semibold [&_strong]:text-foreground",
].join(" ")
