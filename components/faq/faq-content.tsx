"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { CalendarCheck, LayoutPanelTop, Package, Truck, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"
import { OrderActions } from "@/components/order/order-actions"
import { siteConfig } from "@/lib/site"

// ---------------------------------------------------------------------------
// FAQ — ordering, reservation, delivery, and styling questions for
// Romano Finger. Content lives at the top; the accordion layout below.
// ---------------------------------------------------------------------------

const CATEGORIES = [
    {
        id: "order",
        title: "سفارش و رزرو",
        icon: CalendarCheck,
        items: [
            {
                q: "چطور می‌تونم از رومانو فینگر سفارش بدم؟",
                a: "سفارش خیلی ساده‌ست: منوی مورد نظرتون رو از سایت انتخاب کنید و از طریق واتساپ یا دایرکت اینستاگرام پیام بدید. برای هماهنگی سریع‌تر می‌تونید با شماره ۰۹۱۳۱۹۴۱۳۶۶ هم تماس بگیرید.",
            },
            {
                q: "برای سفارش مراسم باید چند روز قبل هماهنگ کنم؟",
                a: "برای مراسم‌هایی مثل تولد، عقد و نامزدی یا مهمانی، پیشنهاد می‌کنیم حداقل چند روز قبل هماهنگی رو انجام بدید تا منو و دیزاین میز به‌صورت اختصاصی برای شما طراحی بشه. برای سفارش‌های فوری هم حتماً پیام بدید تا امکان‌سنجی کنیم.",
            },
            {
                q: "امکان سفارش اختصاصی با تم و سلیقه‌ی خودم وجود داره؟",
                a: "بله؛ دقیقاً تخصص رومانو همینه. رنگ‌ها، تم مراسم، نوع فینگر فود و چیدمان میز رو با هماهنگی شما طراحی می‌کنیم تا همه‌چیز با سلیقه‌ی شما همخوان باشه.",
            },
        ],
    },
    {
        id: "services",
        title: "خدمات و دیزاین",
        icon: LayoutPanelTop,
        items: [
            {
                q: "دیزاین و دکور VIP میز پذیرایی شامل چه خدماتی می‌شه؟",
                a: "طراحی VIP میز شامل چیدمان حرفه‌ای، دکور و تزئین میز پذیرایی، هماهنگی ظروف و جزئیات بصری و اجرای کامل تم مراسم شماست؛ به‌صورتی که میز پذیرایی، نقطه‌ی عطف مراسم باشه.",
            },
            {
                q: "برای چه مراسم‌هایی می‌تونم روی رومانو حساب کنم؟",
                a: "تولد، عقد و نامزدی، عروسی، مهمانی‌های خودمانی و رسمی، مراسم‌های خانوادگی و هر جشنی که بخواید خاص و به‌یادموندنی باشه. تشریفات و پذیرایی مراسم شما در یزد انجام می‌شه.",
            },
        ],
    },
    {
        id: "delivery",
        title: "ارسال و تحویل",
        icon: Truck,
        items: [
            {
                q: "سفارش‌ها رو کجا تحویل می‌دید؟",
                a: `خدمات رومانو فینگر در ${siteConfig.city} ارائه می‌شه؛ هم تحویل سفارش‌ها و هم اجرای دیزاین و تشریفات مراسم در محل شما هماهنگ می‌شه.`,
            },
            {
                q: "فینگر فودها در چه زمانی آماده و تحویل داده می‌شن؟",
                a: "همه‌چیز بر اساس زمان مراسم شما برنامه‌ریزی می‌شه تا فینگر فودها تازه و در بهترین زمان به دستتون برسن. زمان دقیق تحویل یا اجرا، هنگام هماهنگی سفارش نهایی می‌شه.",
            },
        ],
    },
    {
        id: "payment",
        title: "هزینه و نهایی کردن سفارش",
        icon: Wallet,
        items: [
            {
                q: "هزینه‌ی سفارش چطور محاسبه می‌شه؟",
                a: "هزینه به نوع منو، تعداد مهمان‌ها و خدمات دیزاین و تشریفات بستگی داره. بعد از هماهنگی جزئیات، قیمت نهایی به‌صورت شفاف به شما اعلام می‌شه.",
            },
            {
                q: "بعد از ثبت سفارش امکان تغییر هست؟",
                a: "تا زمانی که آماده‌سازی سفارش شروع نشده، امکان تغییرات با هماهنگی وجود داره. کافیه هر چه زودتر از طریق واتساپ به ما اطلاع بدید.",
            },
        ],
    },
    {
        id: "menu",
        title: "منو و محصولات",
        icon: Package,
        items: [
            {
                q: "منوی فینگر فود رومانو شامل چه چیزایی می‌شه؟",
                a: "منوی رومانو شامل انواع فینگر فود شور و شیرین، سوپ و پیش‌غذا، دسر و آیتم‌های مجلسی هست که می‌تونید در بخش «فینگر فود» سایت ببینید. برای دریافت منوی کامل و به‌روز، از واتساپ پیام بدید.",
            },
            {
                q: "امکان حذف یا جایگزینی مواد غذایی به دلیل حساسیت هست؟",
                a: "بله؛ اگر حساسیت غذایی یا محدودیت خاصی دارید، حتماً هنگام سفارش اطلاع بدید تا منو رو متناسب با نیاز شما تنظیم کنیم.",
            },
        ],
    },
]

const springTransition = { type: "spring" as const, stiffness: 300, damping: 30 }

function AccordionItem({
    q,
    a,
    isOpen,
    onToggle,
}: {
    q: string
    a: string
    isOpen: boolean
    onToggle: () => void
}) {
    return (
        <div className="border-b border-border/60 last:border-b-0">
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-4 text-right text-[13px] font-medium text-foreground"
            >
                {q}
                <span
                    aria-hidden
                    className={cn(
                        "shrink-0 text-muted-foreground transition-transform duration-300",
                        isOpen && "rotate-45"
                    )}
                >
                    +
                </span>
            </button>

            <div
                className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
            >
                <div className="overflow-hidden">
                    <p className="pb-4 text-[12.5px] leading-8 text-muted-foreground">{a}</p>
                </div>
            </div>
        </div>
    )
}

export default function FaqContent() {
    // "category:index" so opening a question in one category never affects
    // another — only one question per category is open at a time.
    const [openKey, setOpenKey] = useState<string | null>(null)

    return (
        <div className="relative w-full bg-background text-foreground">
            <section className="border-b border-border/60 pt-28 pb-14 lg:pt-40 lg:pb-20">
                <div className="mx-auto flex max-w-295 flex-col gap-4 px-4 sm:px-6 xl:px-10">
                    <span className="w-fit rounded-full border border-border/70 bg-muted/70 px-3 py-1 text-[10px] font-medium text-primary">
                        راهنمای سفارش
                    </span>
                    <h1 className="text-[30px] leading-[1.55] font-bold text-foreground lg:text-[42px]">
                        سوالات متداول
                    </h1>
                    <p className="max-w-xl text-[13px] leading-8 text-muted-foreground">
                        هر سوالی درباره سفارش فینگر فود، دیزاین میز VIP و تشریفات مراسم دارید، اینجا
                        پیدا می‌کنید. اگر جوابتون اینجا نبود، از واتساپ مستقیم بپرسید.
                    </p>
                </div>
            </section>

            <section className="py-14 lg:py-20">
                <div className="mx-auto flex max-w-295 flex-col gap-12 px-4 sm:px-6 lg:grid lg:grid-cols-[220px_1fr] lg:items-start lg:gap-16 xl:px-10">
                    {/* Category nav — desktop only, mirrors the ids below */}
                    <nav className="hidden flex-col gap-1 lg:sticky lg:top-24 lg:flex">
                        {CATEGORIES.map((cat) => (
                            <a
                                key={cat.id}
                                href={`#${cat.id}`}
                                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12.5px] text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                            >
                                <cat.icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                                {cat.title}
                            </a>
                        ))}
                    </nav>

                    <div className="flex flex-col gap-10">
                        {CATEGORIES.map((cat, ci) => (
                            <motion.div
                                key={cat.id}
                                id={cat.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ ...springTransition, delay: ci * 0.04 }}
                                className="scroll-mt-24"
                            >
                                <div className="mb-2 flex items-center gap-2">
                                    <cat.icon className="h-4 w-4 text-primary" strokeWidth={1.8} />
                                    <h2 className="text-sm font-bold text-foreground">
                                        {cat.title}
                                    </h2>
                                </div>

                                <div className="rounded-2xl border border-border/60 bg-muted/20 px-4">
                                    {cat.items.map((item, i) => {
                                        const key = `${cat.id}:${i}`
                                        return (
                                            <AccordionItem
                                                key={key}
                                                q={item.q}
                                                a={item.a}
                                                isOpen={openKey === key}
                                                onToggle={() =>
                                                    setOpenKey((prev) =>
                                                        prev === key ? null : key
                                                    )
                                                }
                                            />
                                        )
                                    })}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-border/60 py-14 lg:py-20">
                <div className="mx-auto flex max-w-295 flex-col items-center gap-5 px-4 text-center sm:px-6 xl:px-10">
                    <h2 className="text-lg font-bold text-foreground lg:text-2xl">
                        جواب سوالتون رو پیدا نکردید؟
                    </h2>
                    <p className="max-w-sm text-[12.5px] leading-8 text-muted-foreground">
                        همین حالا از واتساپ یا اینستاگرام بپرسید؛ با کمال میل راهنمایی‌تون می‌کنیم.
                    </p>
                    <OrderActions size="lg" />
                </div>
            </section>
        </div>
    )
}
