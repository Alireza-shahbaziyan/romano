"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Link } from "next-view-transitions"
import { Home, Info, Menu as MenuIcon, Newspaper, Phone, UtensilsCrossed, X } from "lucide-react"
import { ModeToggle } from "@/components/layout/mode-toggle"
import { BrandLogo } from "@/components/common/brand-logo"
import { WhatsAppIcon } from "@/components/layout/home-icons"
import { cn } from "@/lib/utils"
import { whatsappOrderLink } from "@/lib/site"

// ---------------------------------------------------------------------------
// Site navigation — «رومانو فینگر».
//
// This business sells through WhatsApp/Instagram, not a cart: the header
// leads with a direct WhatsApp CTA instead of account/cart controls.
// ---------------------------------------------------------------------------

const NAV_LINKS = [
    { label: "خانه", href: "/" },
    { label: "فینگر فود", href: "/products" },
    { label: "مجله", href: "/blog" },
    { label: "درباره ما", href: "/about" },
    { label: "تماس با ما", href: "/contact" },
] as const

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    const pathname = usePathname()
    const isActive = href === "/" ? pathname === "/" : pathname?.startsWith(href)

    return (
        <Link
            href={href}
            className={cn(
                "transition-colors",
                isActive ? "text-foreground" : "text-foreground/55 hover:text-foreground/85"
            )}
        >
            {children}
        </Link>
    )
}

function MenuRow({
    label,
    href,
    icon: Icon,
    onNavigate,
}: {
    label: string
    href: string
    icon: typeof Home
    onNavigate: () => void
}) {
    return (
        <Link
            href={href}
            onClick={onNavigate}
            className="flex items-center gap-3 px-2 py-4 text-sm font-medium text-foreground"
        >
            <Icon className="size-[1.1rem] text-primary" strokeWidth={1.8} />
            {label}
        </Link>
    )
}

export default function SiteMenu() {
    const [open, setOpen] = useState(false)

    return (
        <header className="fixed inset-x-0 top-0 z-9999 border-b border-border/60 bg-background/85 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-295 items-center justify-between px-4 sm:px-6 xl:px-10">
                <BrandLogo />

                {/* Desktop nav */}
                <nav className="hidden items-center gap-8 lg:flex">
                    {NAV_LINKS.map((link) => (
                        <NavLink key={link.href} href={link.href}>
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Desktop actions */}
                <div className="hidden items-center gap-2 lg:flex">
                    <ModeToggle />
                    <a
                        href={whatsappOrderLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                        <WhatsAppIcon className="size-4" />
                        سفارش از واتساپ
                    </a>
                </div>

                {/* Mobile actions */}
                <div className="flex items-center gap-1 lg:hidden">
                    <ModeToggle />
                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        aria-label={open ? "بستن منو" : "باز کردن منو"}
                        aria-expanded={open}
                        className="flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent"
                    >
                        {open ? <X className="size-5" /> : <MenuIcon className="size-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile dropdown */}
            <div
                className={cn(
                    "grid border-t border-border/60 transition-all duration-300 ease-in-out lg:hidden",
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] border-t-0 opacity-0"
                )}
            >
                <div className="overflow-hidden">
                    <nav className="flex flex-col divide-y divide-border/60 px-4">
                        <MenuRow
                            label="خانه"
                            href="/"
                            icon={Home}
                            onNavigate={() => setOpen(false)}
                        />
                        <MenuRow
                            label="فینگر فود"
                            href="/products"
                            icon={UtensilsCrossed}
                            onNavigate={() => setOpen(false)}
                        />
                        <MenuRow
                            label="مجله"
                            href="/blog"
                            icon={Newspaper}
                            onNavigate={() => setOpen(false)}
                        />
                        <MenuRow
                            label="درباره ما"
                            href="/about"
                            icon={Info}
                            onNavigate={() => setOpen(false)}
                        />
                        <MenuRow
                            label="تماس با ما"
                            href="/contact"
                            icon={Phone}
                            onNavigate={() => setOpen(false)}
                        />

                        <a
                            href={whatsappOrderLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setOpen(false)}
                            className="my-4 flex h-11 items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-primary-foreground"
                        >
                            <WhatsAppIcon className="size-[1.15rem]" />
                            سفارش از واتساپ
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    )
}
