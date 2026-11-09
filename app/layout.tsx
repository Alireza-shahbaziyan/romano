import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/common/theme-provider"
import { Toaster } from "@/components/ui/toast"
import { buildSiteMetadata } from "@/lib/seo"
import { ViewTransitions } from "next-view-transitions"

export const metadata: Metadata = buildSiteMetadata()

type RootLayoutProps = {
    children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
    return (
        <html lang="fa" dir="rtl" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/romano_logo.jpg" type="image/svg+xml" />
            </head>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ViewTransitions>{children}</ViewTransitions>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    )
}
