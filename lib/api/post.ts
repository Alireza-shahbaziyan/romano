import request from "@/lib/api/client"
import { PostList, Post } from "@/types/post"

// ---------------------------------------------------------------------------
// Query params matching the /api/blog/posts/ schema (see API.yaml).
// ---------------------------------------------------------------------------

export interface PostQueryParams {
    category?: string
    featured?: boolean
    ordering?: string
    page?: number
    page_size?: number
    search?: string
}

function buildPostsQuery(params: PostQueryParams = {}): string {
    const qs = new URLSearchParams()

    if (params.category) qs.set("category", params.category)
    if (typeof params.featured === "boolean") qs.set("featured", String(params.featured))
    if (params.ordering) qs.set("ordering", params.ordering)
    if (params.page) qs.set("page", String(params.page))
    if (params.page_size) qs.set("page_size", String(params.page_size))
    if (params.search && params.search.trim()) qs.set("search", params.search.trim())

    const query = qs.toString()
    return query ? `?${query}` : ""
}

export function getPosts(params: PostQueryParams = {}): Promise<PostList> {
    return request<PostList>(`/api/blog/posts/${buildPostsQuery(params)}`, {
        method: "GET",
    })
}

export function getLatestPosts(pageNumber = 1, pageSize?: number): Promise<PostList> {
    return getPosts({ page: pageNumber, page_size: pageSize })
}

export function getPost(slug: string): Promise<Post | null> {
    return request<Post>(`/api/blog/posts/${slug}/`, {
        method: "GET",
    })
}
