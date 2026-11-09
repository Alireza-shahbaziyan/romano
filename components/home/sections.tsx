import { Cake, Heart, PartyPopper, Sparkles, TableProperties, Users } from "lucide-react"
import { HeadsetIcon, ShieldIcon, SparkleIcon, WhatsAppIcon } from "@/components/layout/home-icons"
import { OrderActions, PhoneButton } from "@/components/order/order-actions"
import { siteConfig } from "@/lib/site"

// ---------------------------------------------------------------------------
// Static marketing sections for the homepage: the value strip, the services
// showcase (VIP table styling, decoration, catering), the brand story
// preview, and the closing contact band. All copy is brand content — the
// data-driven sections (products, categories, collections, gallery, blog)
// live in app/(main)/page.tsx and render straight from the API.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Value strip — four quiet trust claims below the hero.
// ---------------------------------------------------------------------------
type ValueItem = {
    icon: typeof WhatsAppIcon
    title: string
    desc: string
}

const VALUES: ValueItem[] = [
    {
        icon: WhatsAppIcon,
        title: "سفارش آسان",
        desc: "سفارش مستقیم از واتساپ و اینستاگرام",
    },
    {
        icon: SparkleIcon,
        title: "طراحی VIP",
        desc: "دیزاین میز و دکور اختصاصی مراسم",
    },
    {
        icon: ShieldIcon,
        title: "تازه و باکیفیت",
        desc: "تهیه با مواد اولیه تازه و مرغوب",
    },
    {
        icon: HeadsetIcon,
        title: "اجرا در یزد",
        desc: "تشریفات و پذیرایی مراسم شما",
    },
]

export function ValueStrip() {
    return (
        <section className="mt-12 px-5 lg:mx-auto lg:mt-24 lg:max-w-295 lg:px-8 xl:px-10">
            <ul
                role="list"
                className="grid grid-cols-2 gap-y-6 border-y border-border py-7 lg:grid-cols-4 lg:py-8"
            >
                {VALUES.map(({ icon: Icon, title, desc }) => (
                    <li key={title} className="flex items-center">
                        <div className="mx-auto flex items-center gap-3">
                            <Icon className="size-5 shrink-0 text-primary" />
                            <div>
                                <p className="text-xs font-semibold text-foreground lg:text-sm">
                                    {title}
                                </p>
                                <p className="mt-0.5 text-[11px] text-muted-foreground lg:text-xs">
                                    {desc}
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

// ---------------------------------------------------------------------------
// Services — the event and catering offer: birthdays, engagements,
// weddings, private parties, VIP table styling and full event hospitality.
// ---------------------------------------------------------------------------
type ServiceItem = {
    icon: typeof Cake
    title: string
    desc: string
}

const SERVICES: ServiceItem[] = [
    {
        icon: Cake,
        title: "فینگر فود تولد",
        desc: "منوی رنگارنگ و خاص برای جشن تولد؛ از فینگر فودهای مجلسی تا دسرهای هماهنگ با تم جشن شما.",
    },
    {
        icon: Heart,
        title: "فینگر فود عقد و نامزدی",
        desc: "پذیرایی شیک و لاکچری برای شب‌های خاطره‌انگیز؛ فینگر فود و دیزاین میز VIP مراسم عقد و نامزدی.",
    },
    {
        icon: Users,
        title: "فینگر فود مهمانی",
        desc: "برای مهمانی‌ها و دورهمی‌های خودمانی و رسمی؛ منوی متناسب با تعداد و سلیقه‌ی مهمان‌های شما.",
    },
    {
        icon: PartyPopper,
        title: "فینگر فود عروسی و مراسم",
        desc: "پذیرایی حرفه‌ای مراسم عروسی و جشن‌های بزرگ با منوی متنوع و چیدمان مجلسی.",
    },
    {
        icon: TableProperties,
        title: "دیزاین میز پذیرایی",
        desc: "طراحی VIP میز پذیرایی، چیدمان و دکور مراسم؛ جزئیاتی که مراسم شما را از همیشه خاص‌تر می‌کند.",
    },
    {
        icon: Sparkles,
        title: "تشریفات و پذیرایی مراسم",
        desc: "از ایده‌پردازی تا اجرا، با نظارت «{siteConfig.owner}» — تشریفات کامل مراسم شما در یزد.",
    },
]

export function Services() {
    return (
        <section id="services" className="mt-16 lg:mt-28">
            <div className="mx-auto max-w-295 px-5 lg:px-8 xl:px-10">
                <div className="max-w-2xl">
                    <p className="text-[10px] font-medium text-primary lg:text-[11px]">
                        تشریفات و پذیرایی مراسم
                    </p>
                    <h2 className="mt-1.5 text-lg font-bold text-foreground lg:text-2xl">
                        خدمات رومانو فینگر برای مراسم شما
                    </h2>
                    <p className="mt-3 text-xs leading-7 text-muted-foreground lg:text-sm">
                        هر مراسمی که در پیش دارید — تولد، عقد و نامزدی، عروسی یا یک مهمانی خودمانی —
                        با فینگر فود تازه و دیزاین میز VIP، به یک خاطره‌ی خاص تبدیل می‌شود.
                    </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-5">
                    {SERVICES.map(({ icon: Icon, title, desc }) => (
                        <div
                            key={title}
                            className="group rounded-xl border border-border/60 bg-card p-6 transition-colors hover:border-primary/40"
                        >
                            <Icon
                                className="size-5 text-primary transition-transform duration-300 group-hover:-translate-y-0.5"
                                strokeWidth={1.7}
                            />
                            <h3 className="mt-4 text-sm font-bold text-foreground">{title}</h3>
                            <p className="mt-2 text-xs leading-6 text-muted-foreground">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ---------------------------------------------------------------------------
// About preview — the brand story teaser with the founder's identity.
// ---------------------------------------------------------------------------
export function AboutPreview() {
    return (
        <section className="mt-16 lg:mt-28">
            <div className="mx-auto grid max-w-295 items-center gap-10 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8 xl:px-10">
                <div>
                    <p className="text-[10px] font-medium text-primary lg:text-[11px]">
                        درباره رومانو فینگر
                    </p>
                    <h2 className="mt-1.5 text-lg font-bold text-foreground lg:text-2xl">
                        خلاقیت، جزئیات و یک پذیرایی به‌یادماندنی
                    </h2>
                    <p className="mt-4 text-xs leading-8 text-muted-foreground lg:text-sm">
                        رومانو فینگر با مدیریت «{siteConfig.owner}» در یزد، ترکیبی از هنر فینگر فود
                        و طراحی VIP میز پذیرایی را کنار هم می‌آورد. هر منو و هر چیدمان با دقت و
                        سلیقه‌ی شما طراحی می‌شود تا مراسم‌تان — از تولد و عقد و نامزدی تا مهمانی‌های
                        خصوصی — واقعاً خاص باشد.
                    </p>
                    <p className="mt-3 text-xs leading-8 text-muted-foreground lg:text-sm">
                        ما به کیفیت مواد اولیه، تازگی، و توجه به جزئیات باور داریم؛ چیزی که در اولین
                        نگاه به میز پذیرایی‌تان کاملاً دیده می‌شود.
                    </p>

                    <a
                        href="/about"
                        className="mt-7 inline-flex h-10 items-center rounded-lg border border-border px-5 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                        داستان رومانو فینگر
                    </a>
                </div>

                <div className="rounded-2xl border border-border/60 bg-muted/40 p-8 lg:p-12">
                    <SparkleIcon className="size-7 text-primary" />
                    <p className="mt-6 text-lg leading-10 font-bold text-foreground lg:text-2xl">
                        «{siteConfig.slogan.replace("✨ ", "")}»
                    </p>
                    <p className="mt-4 text-xs leading-8 text-muted-foreground lg:text-sm">
                        {siteConfig.tagline} — فینگر فود یزد، دیزاین میز پذیرایی و طراحی VIP مراسم.
                    </p>
                    <div className="mt-8 flex items-center gap-3 border-t border-border pt-6">
                        <span className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-black text-primary-foreground">
                            R
                        </span>
                        <div>
                            <p className="text-sm font-bold text-foreground">{siteConfig.owner}</p>
                            <p className="text-[11px] text-muted-foreground">
                                طراح و مدیر مجموعه رومانو فینگر
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// ---------------------------------------------------------------------------
// Contact band — the closing call-to-action with every ordering channel.
// ---------------------------------------------------------------------------
export function ContactBand() {
    return (
        <section id="contact" className="mt-16 px-5 lg:mt-28 lg:px-8 xl:px-10">
            <div className="mx-auto max-w-295 rounded-2xl bg-foreground px-6 py-12 text-background lg:rounded-3xl lg:px-14 lg:py-16">
                <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-xl">
                        <p className="text-[10px] font-medium text-primary lg:text-[11px]">
                            سفارش و هماهنگی
                        </p>
                        <h2 className="mt-2 text-xl leading-10 font-bold text-background lg:text-3xl">
                            سفارش فینگر فود و رزرو مراسم،
                            <br className="hidden lg:block" /> فقط با یک پیام
                        </h2>
                        <p className="mt-4 text-xs leading-8 text-background/70 lg:text-sm">
                            برای سفارش فینگر فود، دیزاین میز و هماهنگی تشریفات مراسم در یزد، از طریق
                            واتساپ یا اینستاگرام پیام بدهید یا تماس بگیرید.
                        </p>
                    </div>

                    <div className="flex flex-col items-start gap-3">
                        <OrderActions
                            size="lg"
                            className="flex-col items-stretch sm:flex-row sm:items-center"
                        />
                        <PhoneButton
                            size="md"
                            className="text-background/70 hover:text-background"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
