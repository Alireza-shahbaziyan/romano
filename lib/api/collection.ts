import request from "@/lib/api/client"
import { CollectionList } from "@/types/collection"

export function getCollections(pageSize?: number): Promise<CollectionList> {
    const query = pageSize ? `?page_size=${pageSize}` : ""
    return request<CollectionList>(`/api/collections/${query}`, {
        method: "GET",
    })
}
