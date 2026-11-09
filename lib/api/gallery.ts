import request from "@/lib/api/client"
import type { CustomerGalleryList } from "@/types/gallery"

export function getCustomerGallery(pageSize = 12): Promise<CustomerGalleryList> {
    return request<CustomerGalleryList>(`/api/gallery/customers/?page_size=${pageSize}`, {
        method: "GET",
    })
}
