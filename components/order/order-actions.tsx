import { Phone } from "lucide-react"
import { cn, toFaDigits } from "@/lib/utils"
import { siteConfig, whatsappOrderLink } from "@/lib/site"
import { InstagramIcon, WhatsAppIcon } from "@/components/layout/home-icons"

// ---------------------------------------------------------------------------
// Direct-ordering call-to-actions.
//
// This website has no cart and no checkout: every order happens through
// WhatsApp, Instagram Direct, or a phone call. These components are the
// single implementation of those contact points — pass a product name and
// the WhatsApp link carries a contextual message like
// «سلام، برای سفارش [نام محصول] تماس می‌گیرم.»
// ---------------------------------------------------------------------------

type CtaSize = "sm" | "md" | "lg"

const sizeClasses: Record<CtaSize, string> = {
    sm: "h-9 px-3.5 text-xs gap-1.5",
    md: "h-11 px-5 text-sm gap-2",
    lg: "h-12 px-6 text-sm gap-2.5",
}

const iconSizes: Record<CtaSize, string> = {
    sm: "size-4",
    md: "size-[1.15rem]",
    lg: "size-5",
}

export function WhatsAppButton({
    productName,
    size = "md",
    className,
}: {
    /** Product name included in the pre-filled WhatsApp message. */
    productName?: string
    size?: CtaSize
    className?: string
}) {
    return (
        <a
            href={whatsappOrderLink(productName)}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "inline-flex items-center justify-center rounded-lg bg-primary font-semibold text-primary-foreground transition-all hover:scale-[1.02] hover:bg-primary/90 active:scale-[0.98]",
                sizeClasses[size],
                className
            )}
        >
            <WhatsAppIcon className={iconSizes[size]} />
            سفارش از واتساپ
        </a>
    )
}

export function InstagramButton({
    size = "md",
    className,
}: {
    size?: CtaSize
    className?: string
}) {
    return (
        <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "inline-flex items-center justify-center rounded-lg border border-border bg-background font-semibold text-foreground transition-colors hover:bg-accent",
                sizeClasses[size],
                className
            )}
        >
            <InstagramIcon className={iconSizes[size]} />
            سفارش از اینستاگرام
        </a>
    )
}

export function PhoneButton({ size = "md", className }: { size?: CtaSize; className?: string }) {
    return (
        <a
            href={siteConfig.phoneHref}
            className={cn(
                "inline-flex items-center justify-center gap-2 rounded-lg font-medium text-muted-foreground transition-colors hover:text-foreground",
                sizeClasses[size],
                className
            )}
        >
            <Phone className={iconSizes[size]} strokeWidth={1.8} />
            {toFaDigits(siteConfig.phone)}
        </a>
    )
}

/**
 * The complete ordering block used on product detail pages and the
 * homepage: WhatsApp (primary), Instagram (secondary), and the phone
 * number — the three ways to place an order with Romano Finger.
 */
export function OrderActions({
    productName,
    size = "md",
    className,
}: {
    productName?: string
    size?: CtaSize
    className?: string
}) {
    return (
        <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
            <WhatsAppButton productName={productName} size={size} />
            <InstagramButton size={size} />
            <PhoneButton size={size} />
        </div>
    )
}

/** Compact inline text used inside copy (e.g. «سفارش: ۰۹۱۳...»). */
export function PhoneInline() {
    return (
        <a
            href={siteConfig.phoneHref}
            dir="ltr"
            className="inline-flex items-center gap-1.5 font-medium text-foreground transition-colors hover:text-primary"
        >
            <Phone className="size-3.5 shrink-0" strokeWidth={1.8} />
            {toFaDigits(siteConfig.phone)}
        </a>
    )
}
