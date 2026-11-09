import { Link } from "next-view-transitions"
import { MapPin, Phone } from "lucide-react"
import { cn, toFaDigits } from "@/lib/utils"
import { getFooterBadges } from "@/lib/api/site"
import type { FooterBadge } from "@/types/site"
import { siteConfig } from "@/lib/site"
import { InstagramIcon, WhatsAppIcon } from "@/components/layout/home-icons"

// ---------------------------------------------------------------------------
// Footer — brand block, quick links, services, and contact channels.
// Ordering happens via WhatsApp / Instagram / phone (no cart on this site),
// so those contact points repeat here at the end of every page.
//
// Footer badges (e.g. Enamad trust seal) are fetched from the backend
// (`/core/footer-badges/`) rather than hardcoded, sorted by `priority`.
// ---------------------------------------------------------------------------

const quickLinks = [
    { label: "خانه", href: "/" },
    { label: "فینگر فود", href: "/products" },
    { label: "مجله", href: "/blog" },
    { label: "درباره ما", href: "/about" },
    { label: "تماس با ما", href: "/contact" },
    { label: "سوالات متداول", href: "/faq" },
]

const services = [
    "فینگر فود تولد",
    "فینگر فود عقد و نامزدی",
    "فینگر فود مهمانی",
    "دیزاین میز پذیرایی و طراحی VIP",
    "تشریفات و پذیرایی مراسم",
]

export default async function Footer({ className = "" }: { className?: string }) {
    const badges = await getFooterBadges().catch(() => [] as FooterBadge[])
    const sortedBadges = [...badges].sort((a, b) => a.priority - b.priority)

    return (
        <footer className={cn("border-t border-border bg-muted/30 pb-10", className)}>
            <div className="mx-auto max-w-295 px-5 pt-14 pb-4 sm:px-8 lg:px-10 lg:pt-16">
                <div className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-8">
                    {/* Brand */}
                    <div className="col-span-2 max-w-md lg:col-span-1">
                        <p className="text-lg font-bold text-foreground">
                            رومانو <span className="text-primary">فینگر</span>
                        </p>
                        <p className="mt-1 text-[10px] font-medium tracking-[0.22em] text-muted-foreground uppercase">
                            Romano Finger
                        </p>
                        <p className="mt-4 text-xs leading-6 text-muted-foreground">
                            {siteConfig.slogan} — {siteConfig.tagline}. فینگر فود یزد با دیزاین میز
                            و طراحی VIP مراسم، به سبک «{siteConfig.owner}».
                        </p>

                        <div className="mt-5 flex items-center gap-3">
                            <a
                                href={siteConfig.whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="واتساپ رومانو فینگر"
                                className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
                            >
                                <WhatsAppIcon className="size-[1.05rem]" />
                            </a>
                            <a
                                href={siteConfig.instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="اینستاگرام رومانو فینگر"
                                className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
                            >
                                <InstagramIcon className="size-[1.05rem]" />
                            </a>
                            <a
                                href={siteConfig.phoneHref}
                                aria-label={`تماس با ${siteConfig.phone}`}
                                className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
                            >
                                <Phone className="size-[1.05rem]" strokeWidth={1.8} />
                            </a>
                        </div>
                    </div>

                    <FooterColumn title="دسترسی سریع" links={quickLinks} />

                    {/* Services — plain list, not links (each service is discussed per-order) */}
                    <div>
                        <p className="text-xs font-medium text-muted-foreground">خدمات ما</p>
                        <ul role="list" className="mt-4 space-y-3">
                            {services.map((service) => (
                                <li key={service} className="flex items-start gap-2">
                                    <span
                                        aria-hidden
                                        className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                                    />
                                    <span className="text-sm text-foreground/90">{service}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <p className="text-xs font-medium text-muted-foreground">تماس با ما</p>
                        <ul role="list" className="mt-4 space-y-3.5">
                            <li>
                                <a
                                    href={siteConfig.phoneHref}
                                    className="flex items-center gap-2 text-sm text-foreground/90 transition-colors hover:text-primary"
                                >
                                    <Phone className="size-4 shrink-0" strokeWidth={1.8} />
                                    {toFaDigits(siteConfig.phone)}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={siteConfig.whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-foreground/90 transition-colors hover:text-primary"
                                >
                                    <WhatsAppIcon className="size-4 shrink-0" />
                                    واتساپ
                                </a>
                            </li>
                            <li>
                                <a
                                    href={siteConfig.instagramUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-foreground/90 transition-colors hover:text-primary"
                                >
                                    <InstagramIcon className="size-4 shrink-0" />
                                    اینستاگرام
                                </a>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-foreground/90">
                                <MapPin className="size-4 shrink-0" strokeWidth={1.8} />
                                {siteConfig.location}
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 flex flex-col-reverse items-center gap-4 border-t border-border pt-6 sm:flex-row sm:justify-between">
                    <p className="text-xs text-muted-foreground">
                        ©{" "}
                        <span className="tabular-nums">{toFaDigits(new Date().getFullYear())}</span>{" "}
                        رومانو فینگر — تمامی حقوق محفوظ است.
                    </p>
                    {sortedBadges.length > 0 && (
                        <div className="flex items-center gap-5">
                            {sortedBadges.map((badge) => (
                                <FooterBadgeItem key={badge.id} badge={badge} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </footer>
    )
}

function FooterBadgeItem({ badge }: { badge: FooterBadge }) {
    const darkHtml = badge.html_2 ?? badge.html

    return (
        <div className="shrink-0 [&_img]:h-25 [&_img]:w-17.5 [&_img]:cursor-pointer [&_img]:object-contain">
            {/* Light mode variant */}
            <div
                className="block dark:hidden"
                title={badge.title}
                dangerouslySetInnerHTML={{ __html: badge.html }}
            />
            {/* Dark mode variant — falls back to `html` when `html_2` isn't set */}
            <div
                className="hidden dark:block"
                title={badge.title}
                dangerouslySetInnerHTML={{ __html: darkHtml }}
            />
        </div>
    )
}

function FooterColumn({
    title,
    links,
}: {
    title: string
    links: { label: string; href: string }[]
}) {
    return (
        <div>
            <p className="text-xs font-medium text-muted-foreground">{title}</p>
            <ul role="list" className="mt-4 space-y-3">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className="text-sm text-foreground/90 transition-colors hover:text-primary"
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
