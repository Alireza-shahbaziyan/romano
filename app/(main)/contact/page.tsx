import type { Metadata } from "next"
import { MapPin, Phone } from "lucide-react"
import { PageContainer } from "@/components/layout/page-container"
import { OrderActions, PhoneButton } from "@/components/order/order-actions"
import { InstagramIcon, WhatsAppIcon } from "@/components/layout/home-icons"
import { siteConfig, siteDescription } from "@/lib/site"
import { toFaDigits } from "@/lib/utils"

export const dynamic = "force-dynamic"

// ---------------------------------------------------------------------------
// Contact — WhatsApp, Instagram Direct, and phone are the ordering
// channels for Romano Finger. No contact form: the backend exposes no
// inquiry workflow, and orders are coordinated personally anyway.
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
    title: "تماس با ما | سفارش فینگر فود و رزرو مراسم در یزد",
    description:
        "برای سفارش فینگر فود یزد، دیزاین میز و تشریفات مراسم با رومانو فینگر تماس بگیرید؛ واتساپ، اینستاگرام و شماره ۰۹۱۳۱۹۴۱۳۶۶ در دسترس شماست.",
    alternates: { canonical: "/contact" },
}

const CONTACT_CARDS = [
    {
        icon: WhatsAppIcon,
        label: "سفارش از واتساپ",
        value: "پاسخ‌گویی سریع، هر روز هفته",
        href: siteConfig.whatsappUrl,
        external: true,
    },
    {
        icon: InstagramIcon,
        label: "دایرکت اینستاگرام",
        value: "سفارش و مشاهده نمونه کارها",
        href: siteConfig.instagramUrl,
        external: true,
    },
    {
        icon: Phone,
        label: "تماس تلفنی",
        value: toFaDigits(siteConfig.phone),
        href: siteConfig.phoneHref,
        external: false,
    },
    {
        icon: MapPin,
        label: "موقعیت",
        value: siteConfig.location,
        href: null,
        external: false,
    },
] as const

export default function ContactPage() {
    const localBusinessLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: siteConfig.name,
        alternateName: siteConfig.nameEn,
        description: siteDescription,
        telephone: `+${siteConfig.whatsappUrl.replace("https://wa.me/", "")}`,
        address: {
            "@type": "PostalAddress",
            addressLocality: siteConfig.city,
            addressCountry: "IR",
        },
        sameAs: [siteConfig.instagramUrl],
    }

    return (
        <PageContainer className="pb-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
            />

            <header className="max-w-2xl">
                <p className="text-[11px] font-medium text-primary">تماس با {siteConfig.name}</p>
                <h1 className="mt-2 text-3xl leading-[1.6] font-bold text-foreground lg:text-4xl">
                    سفارش فینگر فود و رزرو مراسم در یزد
                </h1>
                <p className="mt-4 text-sm leading-8 text-muted-foreground">
                    برای سفارش فینگر فود، دیزاین میز پذیرایی و هماهنگی تشریفات مراسم، از طریق واتساپ
                    یا اینستاگرام پیام بدهید یا مستقیم تماس بگیرید. ما با کمال میل راهنمایی‌تان
                    می‌کنیم.
                </p>
            </header>

            {/* Contact channels */}
            <section className="mt-10 grid gap-3 sm:grid-cols-2">
                {CONTACT_CARDS.map((item) => {
                    const Icon = item.icon
                    const content = (
                        <>
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Icon className="size-[1.15rem]" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-xs font-medium text-muted-foreground">
                                    {item.label}
                                </span>
                                <span className="text-sm font-medium text-foreground">
                                    {item.value}
                                </span>
                            </div>
                        </>
                    )

                    return item.href ? (
                        <a
                            key={item.label}
                            href={item.href}
                            target={item.external ? "_blank" : undefined}
                            rel={item.external ? "noopener noreferrer" : undefined}
                            className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4 transition-colors hover:border-primary/40"
                        >
                            {content}
                        </a>
                    ) : (
                        <div
                            key={item.label}
                            className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4"
                        >
                            {content}
                        </div>
                    )
                })}
            </section>

            {/* Ordering band */}
            <section className="mt-14">
                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 lg:p-12">
                    <h2 className="text-lg font-bold text-foreground lg:text-2xl">
                        سفارش و هماهنگی، فقط با یک پیام
                    </h2>
                    <p className="mt-3 max-w-xl text-xs leading-8 text-muted-foreground lg:text-sm">
                        روش سفارش در {siteConfig.name} ساده است: منوی مورد نظرتان را انتخاب کنید، از
                        طریق واتساپ یا دایرکت اینستاگرام پیام بدهید و هماهنگی‌های مراسم را با «
                        {siteConfig.owner}» نهایی کنید.
                    </p>
                    <OrderActions size="lg" className="mt-7" />
                    <div className="mt-6">
                        <PhoneButton size="md" className="px-0" />
                    </div>
                </div>
            </section>
        </PageContainer>
    )
}
