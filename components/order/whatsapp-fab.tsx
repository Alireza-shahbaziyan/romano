import { siteConfig } from "@/lib/site"
import { WhatsAppIcon } from "@/components/layout/home-icons"

// ---------------------------------------------------------------------------
// Floating WhatsApp action — always reachable on every page, since WhatsApp
// is this business's primary ordering channel. Deliberately small and out
// of the way (bottom corner), with a text label on larger screens.
// ---------------------------------------------------------------------------

export function WhatsAppFab() {
    return (
        <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="سفارش از واتساپ"
            className="fixed bottom-5 left-5 z-9999 flex h-12 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.04] active:scale-[0.97]"
        >
            <WhatsAppIcon className="size-5" />
            <span className="hidden sm:inline">سفارش از واتساپ</span>
        </a>
    )
}
