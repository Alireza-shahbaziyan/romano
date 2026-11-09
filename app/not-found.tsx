import { Link } from "next-view-transitions"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site"

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
            <p className="text-xs font-medium text-primary">{siteConfig.name}</p>
            <h1 className="text-4xl font-bold text-foreground">۴۰۴</h1>
            <h2 className="text-2xl font-semibold text-foreground">متاسفانه صفحه پیدا نشد</h2>
            <p className="max-w-md text-sm leading-8 text-muted-foreground">
                صفحه‌ای که دنبالش بودید وجود نداره یا جابه‌جا شده. می‌تونید از منوی فینگر فود دیدن
                کنید یا به صفحه‌ی اصلی برگردید.
            </p>

            <div className="mt-2 flex items-center gap-3">
                <Link href="/">
                    <Button>بازگشت به صفحه اصلی</Button>
                </Link>
                <Link href="/products">
                    <Button variant="outline">مشاهده منوی فینگر فود</Button>
                </Link>
            </div>
        </main>
    )
}
