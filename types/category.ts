// Category shapes from API.yaml (`CategoryList`, `CategoryMinimal`).
// Note: the backend currently has no dedicated category *detail* route in
// use on this website — categories are listed and used as product filters.

export interface CategoryListItem {
    id: number
    title: string
    slug: string
    short_description: string
    image: string | null
    image_dark: string | null
    is_active: boolean
    parent: number | null
}

/** Same shape as CategoryList per API.yaml — used inside ProductDetail. */
export type CategoryMinimal = CategoryListItem

export interface CategoryList {
    count: number
    next: string | null
    previous: string | null
    results: CategoryListItem[]
}
