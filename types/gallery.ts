// Customer gallery shapes from API.yaml (`CustomerGallery`,
// `PaginatedCustomerGalleryList`) — visual showcase of delivered work.

export interface CustomerGalleryItem {
    id: number
    image: string
    customer_name?: string
    caption?: string
    score?: number
    created_at: string
}

export interface CustomerGalleryList {
    count: number
    next: string | null
    previous: string | null
    results: CustomerGalleryItem[]
}
