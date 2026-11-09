"use client"

import { useEffect, useState } from "react"
import { useTransitionRouter } from "next-view-transitions"
import Image from "next/image"
import { motion, AnimatePresence, type PanInfo } from "motion/react"
import {
    ArrowRight,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Package,
    X,
    ZoomIn,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { ProductImage } from "@/types/product"
import type { ProductViewData } from "@/lib/product-data"
import { Separator } from "@/components/ui/separator"
import { OrderActions, PhoneButton } from "@/components/order/order-actions"
import { siteConfig } from "@/lib/site"
import { TableSettingIcon, SparkleIcon, WhatsAppIcon } from "@/components/layout/home-icons"

// ---------------------------------------------------------------------------
// ProductView — the interactive part of a product page: image gallery with
// lightbox, the product story, and the direct-ordering panel.
//
// Orders happen through WhatsApp / Instagram / phone — there are no
// prices, stock counters, sizes, or cart controls anywhere on this page.
// ---------------------------------------------------------------------------

type Props = {
    product: ProductViewData
}

export default function ProductView({ product }: Props) {
    const images =
        product.images.length > 0
            ? product.images
            : [
                  {
                      id: 0,
                      image: "",
                      media_kind: "gallery",
                      caption: "",
                      alt_text: product.title,
                      is_primary: true,
                  },
              ]

    const [activeImageIndex, setActiveImageIndex] = useState(0)
    const [zoomedIndex, setZoomedIndex] = useState<number | null>(null)
    const router = useTransitionRouter()

    const handleBack = () => {
        // router.back() reuses the browser's history entry for the previous
        // page, which is what lets Next.js restore its scroll position.
        if (typeof window !== "undefined" && window.history.length > 1) {
            router.back()
        } else {
            // No page to go back to (e.g. opened this product link directly).
            router.push("/products")
        }
    }

    return (
        <div>
            {/* Back */}
            <button
                type="button"
                onClick={handleBack}
                className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground lg:mb-8"
            >
                <ArrowRight className="size-3.5" />
                بازگشت
            </button>

            {/* Gallery + ordering panel ------------------------------------- */}
            <div
                className={cn(
                    "grid grid-cols-1 gap-6 lg:items-start lg:gap-8 xl:gap-10",
                    images.length > 1 ? "lg:grid-cols-[64px_1fr_380px]" : "lg:grid-cols-[1fr_380px]"
                )}
            >
                {/* Thumbnail rail — desktop only */}
                {images.length > 1 && (
                    <div className="hidden lg:sticky lg:top-24 lg:flex lg:max-h-[72vh] lg:flex-col lg:gap-2 lg:overflow-y-auto">
                        {images.map((img, i) => (
                            <Thumbnail
                                key={img.id}
                                img={img}
                                index={i}
                                active={i === activeImageIndex}
                                onSelect={() => setActiveImageIndex(i)}
                                className="h-16 w-16"
                            />
                        ))}
                    </div>
                )}

                {/* Main image */}
                <div className="min-w-0 lg:sticky lg:top-24">
                    <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-accent">
                        <button
                            onClick={() => setZoomedIndex(activeImageIndex)}
                            aria-label="نمایش تصویر در سایز کامل"
                            className="group absolute inset-0 h-full w-full"
                        >
                            <MainImage image={images[activeImageIndex] ?? images[0]} isFirst />
                            <div className="absolute bottom-3 left-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/85 text-foreground opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                                <ZoomIn className="h-4 w-4" />
                            </div>
                        </button>
                    </div>

                    {/* Thumbnails — mobile only */}
                    {images.length > 1 && (
                        <div className="mt-3 flex gap-2 overflow-x-auto lg:hidden">
                            {images.map((img, i) => (
                                <Thumbnail
                                    key={img.id}
                                    img={img}
                                    index={i}
                                    active={i === activeImageIndex}
                                    onSelect={() => setActiveImageIndex(i)}
                                    className="h-16 w-14 shrink-0"
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Info + ordering panel */}
                <div className="flex flex-col gap-6 lg:sticky lg:top-24">
                    <div>
                        {(product.category?.title || product.collections?.length > 0) && (
                            <p className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-medium text-muted-foreground">
                                {product.category?.title && <span>{product.category.title}</span>}
                                {product.collections?.map((collection) => (
                                    <span key={collection.slug}>
                                        {product.category?.title && (
                                            <span aria-hidden className="ml-2 text-border">
                                                /
                                            </span>
                                        )}
                                        {collection.title}
                                    </span>
                                ))}
                            </p>
                        )}
                        <h1 className="text-[26px] leading-[1.6] font-bold text-foreground lg:text-[30px]">
                            {product.title}
                        </h1>
                        {product.short_description && (
                            <p className="mt-2.5 text-[13px] leading-8 text-muted-foreground">
                                {product.short_description}
                            </p>
                        )}
                    </div>

                    <OrderPanel productName={product.title} />

                    {/* Highlights */}
                    <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-muted/25 p-4">
                        <div className="flex items-center gap-2.5 text-[11.5px] text-muted-foreground">
                            <SparkleIcon className="size-4 shrink-0 text-primary" />
                            تهیه‌شده با مواد اولیه تازه و باکیفیت
                        </div>
                        <div className="flex items-center gap-2.5 text-[11.5px] text-muted-foreground">
                            <TableSettingIcon className="size-4 shrink-0 text-primary" />
                            امکان دیزاین میز پذیرایی و طراحی VIP مراسم
                        </div>
                        <div className="flex items-center gap-2.5 text-[11.5px] text-muted-foreground">
                            <WhatsAppIcon className="size-4 shrink-0 text-primary" />
                            هماهنگی و سفارش سریع از طریق واتساپ
                        </div>
                    </div>
                </div>
            </div>

            {/* Details -------------------------------------------------------- */}
            <div className="mx-auto mt-16 max-w-2xl lg:mt-24">
                {product.description && (
                    <AccordionSection title="توضیحات محصول" defaultOpen>
                        <p className="text-[12.5px] leading-8 whitespace-pre-line text-foreground">
                            {product.description}
                        </p>
                    </AccordionSection>
                )}
                <AccordionSection title="نحوه سفارش" defaultOpen={!product.description}>
                    <ol className="flex flex-col gap-2.5 text-[12.5px] leading-8 text-muted-foreground">
                        <li>۱. فینگر فود مورد نظرتان را از منو انتخاب کنید.</li>
                        <li>
                            ۲. از طریق واتساپ یا دایرکت اینستاگرام پیام بدهید یا با شماره{" "}
                            <span className="font-medium text-foreground">{siteConfig.phone}</span>{" "}
                            تماس بگیرید.
                        </li>
                        <li>۳. منو، تعداد و زمان مراسم با هماهنگی شما نهایی می‌شود.</li>
                        <li>۴. سفارش شما تازه آماده و در مراسم‌تان سرو می‌شود.</li>
                    </ol>
                </AccordionSection>
            </div>

            <Lightbox
                images={images}
                index={zoomedIndex}
                onClose={() => setZoomedIndex(null)}
                onNavigate={setZoomedIndex}
            />
        </div>
    )
}

// ---------------------------------------------------------------------------
// The ordering panel — WhatsApp (with a contextual, product-specific
// message), Instagram Direct, and the business phone number.
// ---------------------------------------------------------------------------
function OrderPanel({ productName }: { productName: string }) {
    return (
        <div className="rounded-2xl border border-primary/25 bg-primary/5 p-5">
            <p className="text-sm font-bold text-foreground">سفارش «{productName}»</p>
            <p className="mt-1.5 text-[11.5px] leading-7 text-muted-foreground">
                برای سفارش، هماهنگی منو و رزرو زمان مراسم، همین حالا از واتساپ یا اینستاگرام پیام
                بدهید. پاسخ‌گویی سریع، هر روز هفته.
            </p>
            <OrderActions productName={productName} size="md" className="mt-4" />
            <Separator className="my-4" />
            <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] text-muted-foreground">تماس مستقیم</span>
                <PhoneButton size="sm" className="px-0" />
            </div>
        </div>
    )
}

// ---------------------------------------------------------------------------
function AccordionSection({
    title,
    defaultOpen = false,
    children,
}: {
    title: string
    defaultOpen?: boolean
    children: React.ReactNode
}) {
    const [open, setOpen] = useState(defaultOpen)

    return (
        <div className="border-b border-border/60">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 py-4 text-right text-[13px] font-bold text-foreground"
            >
                {title}
                <ChevronDown
                    className={cn(
                        "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
                        open && "rotate-180"
                    )}
                />
            </button>
            <div
                className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
            >
                <div className="overflow-hidden">
                    <div className="pb-5">{children}</div>
                </div>
            </div>
        </div>
    )
}

// ---------------------------------------------------------------------------
function MainImage({ image, isFirst = false }: { image: ProductImage; isFirst?: boolean }) {
    return (
        <>
            {image?.image && (
                <Image
                    src={image.image}
                    alt={image.alt_text || "تصویر محصول"}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    quality={75}
                    priority={isFirst}
                    loading={isFirst ? undefined : "eager"}
                    draggable={false}
                    className="object-cover select-none"
                />
            )}
            {!image?.image && (
                <div className="flex h-full w-full items-center justify-center">
                    <Package className="size-10 text-muted-foreground" />
                </div>
            )}
        </>
    )
}

function Thumbnail({
    img,
    index,
    active,
    onSelect,
    className,
}: {
    img: ProductImage
    index: number
    active: boolean
    onSelect: () => void
    className?: string
}) {
    return (
        <button
            onClick={onSelect}
            aria-label={`نمایش تصویر ${index + 1}`}
            aria-current={active}
            className={cn(
                "relative shrink-0 overflow-hidden rounded-lg border bg-accent transition",
                active ? "border-primary" : "border-border/60 opacity-70 hover:opacity-100",
                className
            )}
        >
            {img.image && (
                <Image
                    src={img.image}
                    alt={img.alt_text || `تصویر محصول ${index + 1}`}
                    fill
                    sizes="64px"
                    quality={60}
                    draggable={false}
                    className="object-cover select-none"
                />
            )}
        </button>
    )
}

// ---------------------------------------------------------------------------
// Lightbox — full-screen gallery with keyboard + swipe navigation.
// ---------------------------------------------------------------------------
function Lightbox({
    images,
    index,
    onClose,
    onNavigate,
}: {
    images: ProductImage[]
    index: number | null
    onClose: () => void
    onNavigate: (index: number) => void
}) {
    const [direction, setDirection] = useState(0)
    const isOpen = index !== null
    const hasMultiple = images.length > 1
    const current = isOpen ? images[index] : null

    const goTo = (i: number, dir: number) => {
        if (index === null) return
        const next = ((i % images.length) + images.length) % images.length
        setDirection(dir)
        onNavigate(next)
    }

    useEffect(() => {
        if (!isOpen) return
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, onClose])

    const SWIPE_OFFSET_THRESHOLD = 42
    const SWIPE_VELOCITY_THRESHOLD = 380

    const handleDragEnd = (_: unknown, info: PanInfo) => {
        if (!hasMultiple || index === null) return
        const { offset, velocity } = info
        if (offset.x < -SWIPE_OFFSET_THRESHOLD || velocity.x < -SWIPE_VELOCITY_THRESHOLD) {
            goTo(index + 1, 1)
        } else if (offset.x > SWIPE_OFFSET_THRESHOLD || velocity.x > SWIPE_VELOCITY_THRESHOLD) {
            goTo(index - 1, -1)
        }
    }

    const slideVariants = {
        enter: (dir: number) => ({
            opacity: 0,
            scale: 1.02,
            x: dir >= 0 ? "3%" : "-3%",
        }),
        center: { opacity: 1, scale: 1, x: "0%" },
        exit: (dir: number) => ({
            opacity: 0,
            scale: 0.98,
            x: dir >= 0 ? "-3%" : "3%",
        }),
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-99999 flex items-center justify-center bg-black/85 backdrop-blur-sm"
                >
                    <button
                        onClick={onClose}
                        aria-label="بستن"
                        className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/80 text-foreground opacity-70 backdrop-blur-md transition hover:opacity-100 active:scale-90"
                    >
                        <X className="h-4 w-4" />
                    </button>

                    <motion.div
                        initial={{ scale: 0.92, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.96, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative h-[85vh] w-[92vw] max-w-3xl overflow-hidden"
                    >
                        <AnimatePresence custom={direction} mode="popLayout" initial={false}>
                            <motion.div
                                key={current?.id ?? index}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                drag={hasMultiple ? "x" : false}
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.035}
                                dragTransition={{ bounceStiffness: 800, bounceDamping: 48 }}
                                onDragEnd={handleDragEnd}
                                className="absolute inset-0"
                            >
                                {current?.image && (
                                    <Image
                                        src={current.image}
                                        alt={current.alt_text || "نمایش کامل تصویر محصول"}
                                        fill
                                        sizes="92vw"
                                        quality={80}
                                        draggable={false}
                                        className="object-contain select-none"
                                    />
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {hasMultiple && index !== null && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        goTo(index - 1, -1)
                                    }}
                                    aria-label="تصویر قبلی"
                                    className="absolute top-1/2 right-3 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-background/80 text-foreground opacity-70 backdrop-blur-md transition hover:opacity-100 active:scale-90"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        goTo(index + 1, 1)
                                    }}
                                    aria-label="تصویر بعدی"
                                    className="absolute top-1/2 left-3 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-background/80 text-foreground opacity-70 backdrop-blur-md transition hover:opacity-100 active:scale-90"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>

                                <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                                    {images.map((img, i) => (
                                        <button
                                            key={img.id}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                goTo(i, i > index ? 1 : -1)
                                            }}
                                            aria-label={`تصویر ${i + 1}`}
                                            className={cn(
                                                "h-1 rounded-full transition-all duration-200",
                                                i === index
                                                    ? "w-6 bg-primary"
                                                    : "w-1.5 bg-background/70"
                                            )}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
