export interface ProductCategory {
    id: number | null
    name: string
    description: string
}

export interface ProductCategoryParams {
    id?: number  | null
    name?: string | null
    description?: string | null
}