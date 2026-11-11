// ---------------------------------------------------------------------------
// Site-wide brand configuration — the single source of truth for the business
// identity of «رومانو فینگر | Romano Finger» and its direct-ordering links.
//
// There is no cart/checkout on this website: every order happens through
// WhatsApp, Instagram Direct, or a phone call. The helpers at the bottom
// build those links so the contact points stay consistent everywhere
// (header, footer, product pages, contact page, floating button).
//
// The Instagram handle is intentionally configurable via
// NEXT_PUBLIC_INSTAGRAM_URL (see .env.example) so the real business account
// can be added without touching the code.
// ---------------------------------------------------------------------------

const DEFAULT_INSTAGRAM_URL = "https://www.instagram.com/romano.finger/"

export const siteConfig = {
    /** Persian brand name */
    name: "رومانو فینگر",
    /** Latin brand name (used only where English is appropriate) */
    nameEn: "Romano Finger",
    owner: "پریا رادفر",
    slogan: "✨ هر جشن با رومانو خاص‌تر میشه",
    tagline: "فینگر فود و دیزاین و دکور VIP مراسمت با من",

    /** Business phone, as displayed to visitors */
    phone: "09131941366",
    /** tel: link for the same number */
    phoneHref: "tel:+989131941366",

    /** WhatsApp click-to-chat link (international format, no +) */
    whatsappUrl: "https://wa.me/989131941366",

    /** Instagram profile — configurable so the real account can be plugged in later */
    instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || DEFAULT_INSTAGRAM_URL,

    /** Physical service location */
    city: "یزد",
    location: "یزد، ایران",
} as const

/**
 * Builds a contextual WhatsApp order link containing the product name, e.g.
 * `https://wa.me/989131941366?text=سلام، برای سفارش [نام محصول] تماس می‌گیرم.`
 *
 * Without a product name it falls back to a generic ordering message.
 */
export function whatsappOrderLink(productName?: string): string {
    const message = productName
        ? `سلام، برای سفارش ${productName} تماس می‌گیرم.`
        : "سلام، برای سفارش فینگر فود از رومانو فینگر تماس می‌گیرم."

    return `${siteConfig.whatsappUrl}?text=${encodeURIComponent(message)}`
}

/** Instagram link is a plain profile URL — Direct ordering happens in-app. */
export function instagramOrderLink(): string {
    return siteConfig.instagramUrl
}

// ---------------------------------------------------------------------------
// SEO — Persian keywords used naturally across page metadata.
// ---------------------------------------------------------------------------

export const siteKeywords = [
    "رومانو فینگر",
    "فینگر فود یزد",
    "دیزاین میز",
    "طراحی VIP",
    "پریا رادفر",
    "فینگر فود تولد",
    "فینگر فود عقد و نامزدی",
    "فینگر فود مهمانی",
    "دیزاین میز پذیرایی",
    "تشریفات و پذیرایی مراسم",
] as const

export const siteDescription =
    "رومانو فینگر؛ فینگر فود یزد با دیزاین میز و طراحی VIP مراسم. سفارش فینگر فود تولد، عقد و نامزدی و مهمانی به همراه تشریفات و پذیرایی مراسم با مدیریت پریا رادفر. سفارش از طریق واتساپ و اینستاگرام."
