import request from "@/lib/api/client"
import type { CategoryList, CategoryMinimal } from "@/types/category"

export function getCategories(pageSize?: number): Promise<CategoryList> {
    const query = pageSize ? `?page_size=${pageSize}` : ""
    return request<CategoryList>(`/api/categories/${query}`, {
        method: "GET",
    })
}

export function getCategory(slug: string): Promise<CategoryMinimal | null> {
    return request<CategoryMinimal>(`/api/categories/${slug}/`, {
        method: "GET",
    })
}
