import { Link } from "next-view-transitions"
import { ArrowIcon } from "@/components/layout/home-icons"

// Shared section header for the homepage — eyebrow + title + optional
// "مشاهده همه" link, sized for mobile by default with `lg:` upgrades.
export function SectionHeader({
    eyebrow,
    title,
    href,
}: {
    eyebrow: string
    title: string
    href?: string
}) {
    return (
        <div className="mb-4 flex items-end justify-between px-5 lg:mb-8 lg:gap-8 lg:border-b lg:border-border lg:px-0 lg:pb-5">
            <div>
                <p className="text-[10px] font-medium text-primary">{eyebrow}</p>
                <h2 className="mt-1.5 text-lg font-bold text-foreground lg:mt-2 lg:text-2xl">
                    {title}
                </h2>
            </div>
            {href && (
                <Link
                    href={href}
                    className="group flex shrink-0 items-center gap-1 text-xs font-medium text-muted-foreground lg:gap-2 lg:pb-1 lg:text-sm lg:text-foreground"
                >
                    <span className="lg:border-b lg:border-transparent lg:transition-colors lg:group-hover:border-foreground">
                        مشاهده همه
                    </span>
                    <ArrowIcon className="size-3 lg:size-3.5 lg:transition-transform lg:group-hover:-translate-x-1" />
                </Link>
            )}
        </div>
    )
}
