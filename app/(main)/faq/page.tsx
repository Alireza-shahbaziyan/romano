import type { Metadata } from "next"
import FaqContent from "@/components/faq/faq-content"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
    title: "سوالات متداول | سفارش فینگر فود و رزرو مراسم رومانو فینگر",
    description:
        "پاسخ به سوالات متداول درباره نحوه سفارش فینگر فود، رزرو مراسم، دیزاین میز VIP، ارسال در یزد و هماهنگی تشریفات و پذیرایی مراسم با رومانو فینگر.",
    alternates: { canonical: "/faq" },
}

export default function FaqPage() {
    return <FaqContent />
}
