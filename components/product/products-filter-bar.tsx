"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search, SlidersHorizontal, X } from "lucide-react"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetTrigger } from "@/components/ui/sheet"
import type { CategoryListItem } from "@/types/category"
import type { CollectionListItem } from "@/types/collection"
import type { ProductOrdering } from "@/lib/api/product"
import {
    DEFAULT_SORT,
    productFiltersToQuery,
    SORT_OPTIONS,
    type ProductFilterValues,
} from "@/lib/product-filters"

// ---------------------------------------------------------------------------
// ProductsFilterBar — the catalog's search / category / collection / sort
// controls. All state lives in the URL query string (server-rendered page),
// so every filtered view is linkable and crawlable; this component only
// translates UI events into navigation.
// ---------------------------------------------------------------------------

const ALL_VALUE = "all"

export function ProductsFilterBar({
    categories,
    collections,
    filters,
}: {
    categories: CategoryListItem[]
    collections: CollectionListItem[]
    filters: ProductFilterValues
}) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()

    // Local draft for the search box so typing doesn't navigate on every
    // keystroke — pushed into the URL 400ms after the user stops typing.
    const [searchDraft, setSearchDraft] = useState(filters.search)
    const skipFirstDebounce = useRef(true)

    // Keep the draft in sync when the URL changes from outside (back/forward).
    useEffect(() => {
        const urlSearch = searchParams.get("q") ?? ""
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSearchDraft((prev) => (prev === urlSearch ? prev : urlSearch))
    }, [searchParams])

    const applyFilters = (next: ProductFilterValues) => {
        const query = productFiltersToQuery(next)
        startTransition(() => {
            router.replace(query ? `${pathname}${query}` : pathname, { scroll: false })
        })
    }

    useEffect(() => {
        if (skipFirstDebounce.current) {
            skipFirstDebounce.current = false
            return
        }
        const timeout = setTimeout(() => {
            if (searchDraft !== filters.search) {
                applyFilters({ ...filters, search: searchDraft })
            }
        }, 400)
        return () => clearTimeout(timeout)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchDraft])

    const activeFilterCount =
        (filters.category ? 1 : 0) +
        (filters.collection ? 1 : 0) +
        (filters.sort !== DEFAULT_SORT ? 1 : 0)

    const clearFilters = () =>
        applyFilters({ category: null, collection: null, search: "", sort: DEFAULT_SORT })

    const categoryLabel =
        categories.find((c) => c.slug === filters.category)?.title ?? "همه دسته‌بندی‌ها"
    const collectionLabel =
        collections.find((c) => c.slug === filters.collection)?.title ?? "همه کالکشن‌ها"

    const selects = (
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Select
                value={filters.category ?? ALL_VALUE}
                onValueChange={(next) =>
                    applyFilters({
                        ...filters,
                        category: next === ALL_VALUE ? null : next,
                    })
                }
            >
                <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="دسته‌بندی">{categoryLabel}</SelectValue>
                </SelectTrigger>
                <SelectContent dir="rtl">
                    <SelectItem value={ALL_VALUE}>همه دسته‌بندی‌ها</SelectItem>
                    {categories.map((category) => (
                        <SelectItem key={category.slug} value={category.slug}>
                            {category.title}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                value={filters.collection ?? ALL_VALUE}
                onValueChange={(next) =>
                    applyFilters({
                        ...filters,
                        collection: next === ALL_VALUE ? null : next,
                    })
                }
            >
                <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="کالکشن">{collectionLabel}</SelectValue>
                </SelectTrigger>
                <SelectContent dir="rtl">
                    <SelectItem value={ALL_VALUE}>همه کالکشن‌ها</SelectItem>
                    {collections.map((collection) => (
                        <SelectItem key={collection.slug} value={collection.slug}>
                            {collection.title}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                value={filters.sort}
                onValueChange={(next) =>
                    applyFilters({ ...filters, sort: next as ProductOrdering })
                }
            >
                <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="مرتب‌سازی">
                        {SORT_OPTIONS.find((o) => o.value === filters.sort)?.label}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent dir="rtl">
                    {SORT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )

    return (
        <div
            className={`flex flex-col gap-3 ${isPending ? "pointer-events-none opacity-60" : ""}`}
            aria-busy={isPending}
        >
            {/* Search */}
            <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <label htmlFor="product-search" className="sr-only">
                    جست‌وجوی فینگر فود
                </label>
                <Input
                    id="product-search"
                    type="search"
                    value={searchDraft}
                    onChange={(e) => setSearchDraft(e.target.value)}
                    placeholder="جست‌وجوی فینگر فود…"
                    className="h-11 rounded-lg border-border/60 bg-card pr-10 pl-9 text-sm"
                />
                {searchDraft && (
                    <button
                        type="button"
                        onClick={() => setSearchDraft("")}
                        aria-label="پاک کردن جست‌وجو"
                        className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {/* Tablet / desktop toolbar */}
            <div className="hidden items-center justify-between gap-4 sm:flex">
                {selects}
                <div className="flex items-center gap-3">
                    {activeFilterCount > 0 && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="text-muted-foreground"
                        >
                            پاک کردن فیلترها
                        </Button>
                    )}
                </div>
            </div>

            {/* Mobile — filters in a bottom sheet */}
            <div className="flex items-center justify-between sm:hidden">
                <Sheet>
                    <SheetTrigger
                        type="button"
                        className={buttonVariants({ variant: "outline", size: "lg" })}
                    >
                        <SlidersHorizontal className="h-3.5 w-3.5" />
                        فیلتر و مرتب‌سازی
                        {activeFilterCount > 0 && (
                            <Badge className="h-5 min-w-5 rounded-full border-transparent bg-foreground px-1 text-[10px] text-background">
                                {activeFilterCount.toLocaleString("fa-IR")}
                            </Badge>
                        )}
                    </SheetTrigger>

                    <SheetContent dir="rtl" side="bottom" className="rounded-t-3xl px-5 pt-10 pb-8">
                        <div className="mt-2">{selects}</div>

                        <SheetFooter dir="ltr" className="mt-6 flex-row gap-2 sm:justify-start">
                            <Button
                                type="button"
                                variant="ghost"
                                className="flex-1"
                                disabled={activeFilterCount === 0}
                                onClick={clearFilters}
                            >
                                پاک کردن
                            </Button>
                            <SheetClose
                                type="button"
                                className={buttonVariants({ className: "flex-1" })}
                            >
                                نمایش نتایج
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}
