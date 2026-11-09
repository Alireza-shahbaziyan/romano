"use client"

import { motion } from "motion/react"
import { Gem, Heart, Sparkles, WandSparkles } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { OrderActions } from "@/components/order/order-actions"
import { siteConfig } from "@/lib/site"
import { Link } from "next-view-transitions"

// ---------------------------------------------------------------------------
// About — the story of Romano Finger: creativity, attention to detail,
// premium presentation, and personal event experiences.
// ---------------------------------------------------------------------------

const VALUES = [
    {
        icon: Sparkles,
        title: "خلاقیت و ایده‌پردازی",
        description:
            "هر مراسم ایده‌ی مخصوص به خودش را دارد؛ از ترکیب رنگ‌ها تا چیدمان میز، همه‌چیز با خلاقیت و سلیقه‌ی شما طراحی می‌شود.",
    },
    {
        icon: Gem,
        title: "توجه به جزئیات",
        description:
            "کیفیت در جزئیات ساخته می‌شود؛ از انتخاب مواد اولیه تازه تا آخرین چیدمان روی میز پذیرایی، همه‌چیز با دقت انجام می‌شود.",
    },
    {
        icon: Heart,
        title: "ارائه‌ی پریمیوم فینگر فود",
        description:
            "فینگر فودهای رومانو با ظرافت و استاندارد بالا آماده و سرو می‌شوند؛ پذیرایی‌ای که هم زیباست و هم خوشمزه.",
    },
    {
        icon: WandSparkles,
        title: "تجربه‌ی شخصی و حرفه‌ای",
        description:
            "از اولین گفت‌وگو تا اجرای مراسم، کنار شما هستیم تا تجربه‌ای شخصی، حرفه‌ای و بدون دغدغه داشته باشید.",
    },
]

const SERVICES = [
    {
        title: "فینگر فود تولد",
        desc: "منوی خاص و هماهنگ با تم جشن تولد شما، از پیش‌غذا تا دسر.",
    },
    {
        title: "فینگر فود عقد و نامزدی",
        desc: "پذیرایی مجلسی و دیزاین میز VIP برای شب‌های خاطره‌انگیز.",
    },
    {
        title: "فینگر فود عروسی و مراسم",
        desc: "تشریفات و پذیرایی کامل جشن‌های بزرگ با چیدمان حرفه‌ای.",
    },
    {
        title: "فینگر فود مهمانی",
        desc: "منوی متناسب با مهمانی‌های خودمانی و رسمی شما در یزد.",
    },
]

const springTransition = { type: "spring" as const, stiffness: 300, damping: 30 }

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: springTransition,
}

export default function AboutContent() {
    return (
        <div className="relative w-full bg-background text-foreground">
            {/* Hero */}
            <section className="relative overflow-hidden border-b border-border/60 pt-28 pb-16 lg:pt-40 lg:pb-24">
                <div className="relative mx-auto flex max-w-295 flex-col gap-5 px-4 sm:px-6 xl:px-10">
                    <motion.span
                        {...fadeUp}
                        className="w-fit rounded-full border border-border/70 bg-muted/70 px-3 py-1 text-[10px] font-medium text-primary"
                    >
                        داستان {siteConfig.name}
                    </motion.span>

                    <motion.h1
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: 0.05 }}
                        className="max-w-3xl text-[32px] leading-[1.55] font-bold text-foreground lg:text-[52px]"
                    >
                        مراسم‌هایی که با هنر، جزئیات و
                        <br className="hidden lg:block" /> عشق ساخته می‌شن
                    </motion.h1>

                    <motion.p
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: 0.1 }}
                        className="max-w-xl text-[13px] leading-9 text-muted-foreground lg:text-sm"
                    >
                        {siteConfig.name} با مدیریت «{siteConfig.owner}» در {siteConfig.location}،
                        ترکیبی از فینگر فود تازه، دیزاین میز پذیرایی و طراحی VIP مراسم است؛ جایی که
                        هر جشن، سبک و شخصیت خودش را پیدا می‌کند.
                    </motion.p>

                    <motion.div
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: 0.15 }}
                        className="mt-4 flex w-fit flex-wrap items-center gap-4 rounded-2xl border border-border/60 bg-muted/40 px-5 py-3 text-center"
                    >
                        <div>
                            <p className="text-lg font-bold text-foreground">۱۰۰٪</p>
                            <p className="text-[10px] text-muted-foreground">
                                طراحی اختصاصی منو و میز
                            </p>
                        </div>

                        <Separator orientation="vertical" className="h-8" />

                        <div>
                            <p className="text-lg font-bold text-foreground">VIP</p>
                            <p className="text-[10px] text-muted-foreground">دیزاین و دکور مراسم</p>
                        </div>

                        <Separator orientation="vertical" className="h-8" />

                        <div>
                            <p className="text-lg font-bold text-foreground">یزد</p>
                            <p className="text-[10px] text-muted-foreground">محل اجرا و تشریفات</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Story */}
            <section className="border-b border-border/60 py-16 lg:py-24">
                <div className="mx-auto grid max-w-295 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 xl:px-10">
                    <motion.div
                        {...fadeUp}
                        className="flex aspect-4/5 w-full flex-col items-center justify-center gap-5 rounded-3xl border border-border/60 bg-muted/40 p-10 text-center"
                    >
                        <span className="flex size-16 items-center justify-center rounded-2xl bg-primary text-2xl font-black text-primary-foreground">
                            R
                        </span>
                        <p className="text-lg leading-10 font-bold text-foreground">
                            «{siteConfig.slogan.replace("✨ ", "")}»
                        </p>
                        <p className="text-xs text-muted-foreground">{siteConfig.tagline}</p>
                    </motion.div>

                    <motion.div {...fadeUp} className="flex flex-col justify-center gap-5">
                        <h2 className="text-xl font-bold text-primary lg:text-2xl">
                            رومانو چطور شروع شد
                        </h2>

                        <p className="text-[13px] leading-9 text-muted-foreground lg:text-sm">
                            رومانو فینگر با یک علاقه‌ی ساده شروع شد: ساختن میزهای پذیرایی که وقتی
                            مهمان‌ها وارد می‌شوند، اول از همه با چشم‌شان لذت ببرند و بعد با طعم‌های
                            تازه و خاص غافلگیر شوند.
                        </p>

                        <p className="text-[13px] leading-9 text-muted-foreground lg:text-sm">
                            هر مراسم با یک گفت‌وگوی صمیمی شروع می‌شود؛ از سلیقه و تم مراسم گرفته تا
                            تعداد مهمان‌ها و جزئیاتی که برای شما مهم است. بعد از آن، منوی فینگر فود
                            و طراحی میز به‌صورت اختصاصی برای شما کنار هم چیده می‌شوند.
                        </p>

                        <p className="text-[13px] leading-9 text-muted-foreground lg:text-sm">
                            نتیجه قرار نیست شبیه هیچ مراسم دیگری باشد؛ هر جشن با رومانو، امضای خودش
                            را دارد.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Values */}
            <section className="border-b border-border/60 py-16 lg:py-24">
                <div className="mx-auto max-w-295 px-4 sm:px-6 xl:px-10">
                    <motion.h2
                        {...fadeUp}
                        className="mb-10 text-xl font-bold text-primary lg:text-2xl"
                    >
                        چیزی که برای ما مهمه
                    </motion.h2>

                    <div className="grid gap-5 sm:grid-cols-2">
                        {VALUES.map((value, i) => (
                            <motion.div
                                key={value.title}
                                {...fadeUp}
                                transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                                className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-muted/25 p-6"
                            >
                                <value.icon className="h-5 w-5 text-primary" strokeWidth={1.8} />

                                <h3 className="text-sm font-bold text-foreground">{value.title}</h3>

                                <p className="text-[12.5px] leading-7 text-muted-foreground">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services recap */}
            <section className="border-b border-border/60 py-16 lg:py-24">
                <div className="mx-auto max-w-295 px-4 sm:px-6 xl:px-10">
                    <motion.h2
                        {...fadeUp}
                        className="mb-10 text-xl font-bold text-primary lg:text-2xl"
                    >
                        تجربه‌ی مراسم‌های ما
                    </motion.h2>

                    <div className="relative flex flex-col gap-8 border-r border-border/60 pr-6 sm:pr-8">
                        {SERVICES.map((step, i) => (
                            <motion.div
                                key={step.title}
                                {...fadeUp}
                                transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                                className="relative"
                            >
                                <span className="absolute top-2 -right-7.75 h-2.5 w-2.5 rounded-full bg-primary sm:-right-[35px]" />

                                <h3 className="text-sm font-bold text-foreground">{step.title}</h3>

                                <p className="mt-1.5 max-w-lg text-[12.5px] leading-7 text-muted-foreground">
                                    {step.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 lg:py-24">
                <motion.div
                    {...fadeUp}
                    className="mx-auto flex max-w-295 flex-col items-center gap-5 px-4 text-center sm:px-6 xl:px-10"
                >
                    <h2 className="text-xl font-bold text-primary lg:text-2xl">
                        بیایید مراسم شما را خاص کنیم
                    </h2>

                    <p className="max-w-md text-[12.5px] leading-8 text-muted-foreground">
                        برای دیدن منوی فینگر فود و هماهنگی دیزاین میز مراسم، همین حالا با ما در تماس
                        باشید.
                    </p>

                    <OrderActions size="lg" />

                    <Link
                        href="/products"
                        className="text-xs font-medium text-foreground underline underline-offset-8 transition-colors hover:text-primary"
                    >
                        مشاهده منوی فینگر فود
                    </Link>
                </motion.div>
            </section>
        </div>
    )
}
