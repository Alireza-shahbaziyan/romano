import { Link } from "next-view-transitions"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site"

// ---------------------------------------------------------------------------
// BrandLogo — the «رومانو فینگر» wordmark. Pure typography (no image asset),
// so it stays crisp at every size and adapts to light/dark automatically.
// The small monogram tile gives the mark a distinct silhouette in the
// header without leaning on decorative graphics.
// ---------------------------------------------------------------------------

export function BrandLogo({ className }: { className?: string }) {
    return (
        <Link
            href="/"
            aria-label={siteConfig.name}
            className={cn("flex items-center gap-2.5", className)}
        >
            <span
                aria-hidden
                className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-black text-primary-foreground"
            >
                R
            </span>
            <span className="flex flex-col leading-none">
                <span className="text-base font-bold whitespace-nowrap text-foreground">
                    رومانو <span className="text-primary">فینگر</span>
                </span>
                <span className="mt-0.5 text-[9px] font-medium tracking-[0.22em] text-muted-foreground uppercase">
                    Romano Finger
                </span>
            </span>
        </Link>
    )
}

export default BrandLogo
