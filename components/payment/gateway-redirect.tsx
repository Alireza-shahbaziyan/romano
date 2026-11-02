"use client"

import { useEffect } from "react"

export function GatewayRedirect({ url }: { url: string }) {
    useEffect(() => {
        // replace(): the back button must not return to this page and loop
        const timer = setTimeout(() => window.location.replace(url), 400)
        return () => clearTimeout(timer)
    }, [url])

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
            <p>در حال انتقال به درگاه پرداخت...</p>
            <a href={url} className="rounded-md bg-primary px-5 py-2.5 text-primary-foreground">
                ورود به درگاه پرداخت
            </a>
        </main>
    )
}
