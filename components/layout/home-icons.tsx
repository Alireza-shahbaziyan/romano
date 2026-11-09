// ---------------------------------------------------------------------------
// Small line-icon set shared by mobile-home.tsx and desktop-home.tsx — the
// arrow used on "view all" links/CTAs, and the four brand-values icons
// (shipping, guarantee, returns, support). Kept as plain inline SVG rather
// than an icon library dependency, matching how the rest of the home
// components are written.
// ---------------------------------------------------------------------------

export function ArrowIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
            <path
                d="M12 4 4 12M4 12H11M4 12V5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export function TruckIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
            <path
                d="M2 7h11v9H2V7ZM13 10h4l4 3.5V16h-8v-6Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
            />
            <circle cx="6.5" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="17" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.4" />
        </svg>
    )
}

export function ShieldIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
            <path
                d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
            />
            <path
                d="M9 12l2 2 4-4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export function RefreshIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
            <path
                d="M4 12a8 8 0 0 1 13.66-5.66L20 8M20 12a8 8 0 0 1-13.66 5.66L4 16"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M20 4v4h-4M4 20v-4h4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export function HeadsetIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
            <path
                d="M4 13v-1a8 8 0 0 1 16 0v1"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
            />
            <rect
                x="3"
                y="13"
                width="4"
                height="6"
                rx="1.3"
                stroke="currentColor"
                strokeWidth="1.4"
            />
            <rect
                x="17"
                y="13"
                width="4"
                height="6"
                rx="1.3"
                stroke="currentColor"
                strokeWidth="1.4"
            />
            <path
                d="M19 19v.5a3 3 0 0 1-3 3h-2.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
            />
        </svg>
    )
}

export function InstagramIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
            <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="5"
                stroke="currentColor"
                strokeWidth="1.4"
            />
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
        </svg>
    )
}

export function TelegramIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
            <path
                d="M21 4 3 11.2l6 2.1M21 4 14.8 20l-5-6.7M21 4 9 14.5v5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export function ChevronDownIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
            <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
            <path
                d="M12 2.7a9.3 9.3 0 0 0-8 14L2.8 21.2l4.7-1.2A9.3 9.3 0 1 0 12 2.7Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
            <path
                d="M9 8.2c-.3 0-.6.1-.8.4-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.2.2 1.8 2.9 4.5 3.9 2.2.9 2.7.7 3.2.6.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.3l-1.4-.7c-.2-.1-.4-.1-.5.1l-.6.8c-.1.1-.2.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.3-1.6-1.5-1.9-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.2-.5 0-.2 0-.3-.1-.4l-.6-1.5c-.2-.4-.4-.4-.6-.4Z"
                fill="currentColor"
            />
        </svg>
    )
}

export function SparkleIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
            <path
                d="M12 3c.6 3.9 2.1 5.4 6 6-3.9.6-5.4 2.1-6 6-.6-3.9-2.1-5.4-6-6 3.9-.6 5.4-2.1 6-6Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
            />
            <path
                d="M18.5 15.5c.3 1.9 1 2.6 2.9 3-1.9.4-2.6 1.1-2.9 3-.3-1.9-1-2.6-2.9-3 1.9-.4 2.6-1.1 2.9-3Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export function TableSettingIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
            <path
                d="M3 10h18M5 10V7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5V10M4 10v7.5A2.5 2.5 0 0 0 6.5 20h11a2.5 2.5 0 0 0 2.5-2.5V10"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
            />
            <path d="M9 14h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
    )
}
