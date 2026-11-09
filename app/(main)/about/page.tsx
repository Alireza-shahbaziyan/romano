import type { Metadata } from "next"
import AboutContent from "@/components/about/about-content"
import { siteConfig } from "@/lib/site"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
    title: "درباره رومانو فینگر | فینگر فود و دیزاین VIP مراسم در یزد",
    description:
        "رومانو فینگر با مدیریت پریا رادفر؛ خلاقیت، توجه به جزئیات و ارائه‌ی پریمیوم فینگر فود و دیزاین میز VIP برای مراسم تولد، عقد و نامزدی، عروسی و مهمانی در یزد.",
    alternates: { canonical: "/about" },
}

export default function AboutPage() {
    const aboutLd = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: `درباره ${siteConfig.name}`,
        description:
            "رومانو فینگر؛ فینگر فود و دیزاین و دکور VIP مراسم با مدیریت پریا رادفر در یزد.",
        url: "/about",
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutLd) }}
            />
            <AboutContent />
        </>
    )
}
