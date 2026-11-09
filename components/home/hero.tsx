import Image from "next/image"
import { siteConfig } from "@/lib/site"
import { OrderActions } from "@/components/order/order-actions"

// ---------------------------------------------------------------------------
// Hero — the first thing every visitor sees: the Romano Finger brand, the
// slogan, and the two direct-ordering channels. The photography comes from
// the backend (featured product / collection imagery); when no image is
// available yet, a typographic panel keeps the composition intact instead
// of showing an empty frame.
// ---------------------------------------------------------------------------

export function HeroImage({ image }: { image: { src: string; alt: string } | null }) {
    if (!image) {
        return (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-muted/60">
                <span className="flex size-16 items-center justify-center rounded-2xl bg-primary text-2xl font-black text-primary-foreground">
                    R
                </span>
                <p className="px-6 text-center text-sm font-medium text-muted-foreground">
                    {siteConfig.tagline}
                </p>
            </div>
        )
    }

    return (
        <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(max-width: 1024px) 92vw, 40vw"
            quality={75}
            className="object-cover"
        />
    )
}

export function Hero({ image }: { image: { src: string; alt: string } | null }) {
    return (
        <section className="relative">
            {/* Mobile: stacked copy + photography */}
            <div className="mx-5 mt-22 lg:hidden">
                <div>
                    <p className="text-[11px] font-medium text-primary">
                        فینگر فود یزد — {siteConfig.name}
                    </p>
                    <h1 className="mt-3 text-[1.85rem] leading-[1.45] font-bold text-foreground">
                        {siteConfig.slogan}
                    </h1>
                    <p className="mt-3 text-sm leading-8 text-muted-foreground">
                        {siteConfig.tagline}. طراحی VIP میز پذیرایی و تشریفات مراسم تولد، عقد و
                        نامزدی و مهمانی، به سبک «{siteConfig.owner}».
                    </p>
                    <OrderActions size="md" className="mt-6" />
                </div>

                <div className="relative mt-8 aspect-4/5 overflow-hidden rounded-2xl">
                    <HeroImage image={image} />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/35 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-sm font-semibold text-neutral-50">
                        دیزاین میز پذیرایی و فینگر فود مجلسی
                    </div>
                </div>
            </div>

            {/* Desktop: editorial split */}
            <div className="mx-auto hidden max-w-295 px-8 pt-24 lg:block xl:px-10">
                <div className="grid grid-cols-2 items-center gap-16">
                    <div>
                        <p className="text-xs font-medium text-primary">
                            فینگر فود یزد — {siteConfig.name} | Romano Finger
                        </p>
                        <h1 className="mt-6 text-[3.1rem] leading-[1.5] font-bold text-foreground">
                            {siteConfig.slogan}
                        </h1>
                        <p className="mt-6 max-w-lg text-[15px] leading-9 text-muted-foreground">
                            {siteConfig.tagline}. از فینگر فود تولد و عقد و نامزدی گرفته تا دیزاین
                            میز پذیرایی و تشریفات مراسم — همه‌چیز برای یک مهمانی خاص و به‌یادماندنی
                            در یزد.
                        </p>

                        <OrderActions size="lg" className="mt-9" />

                        <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                            <span>سفارش مستقیم از واتساپ و اینستاگرام</span>
                            <span aria-hidden className="text-border">
                                |
                            </span>
                            <span>{siteConfig.location}</span>
                            <span aria-hidden className="text-border">
                                |
                            </span>
                            <span>مدیریت: {siteConfig.owner}</span>
                        </p>
                    </div>

                    <div className="relative aspect-4/5 w-full max-w-115 justify-self-end overflow-hidden rounded-3xl">
                        <HeroImage image={image} />
                        <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-black/35 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-7 text-base font-semibold text-neutral-50">
                            دیزاین میز پذیرایی و فینگر فود مجلسی
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
