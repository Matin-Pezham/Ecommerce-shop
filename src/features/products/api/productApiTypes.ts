import type { Product } from '@/features/products/types'

export type ProductSort =
  | 'featured'
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'bestseller'
  | 'rating-desc'

export type ProductListParams = {
  search?: string
  categoryId?: string
  collectionId?: string
  colorId?: string
  sizeId?: string
  availability?: 'all' | 'in-stock' | 'out-of-stock' | 'low-stock'
  sale?: boolean
  limited?: boolean
  featured?: boolean
  newArrival?: boolean
  bestseller?: boolean
  minPrice?: number
  maxPrice?: number
  sort?: ProductSort
  page?: number
  pageSize?: number
  productIds?: string[]
}

export type ProductListResponse = {
  items: Product[]
  pagination: {
    page: number
    pageSize: number
    totalItems: number
    totalPages: number
  }
}

export type ProductDetailResponse = {
  product: Product
}

export type ProductApiError = {
  error: {
    code: string
    message: string
  }
}

export type ColorFacet = {
  id: string
  name: { en: string; fa: string }
  hex: string
}

export type SizeFacet = {
  id: string
  label: string
}

export type ProductFacetsResponse = {
  categoryIds: string[]
  collectionIds: string[]
  colors: ColorFacet[]
  sizes: SizeFacet[]
  badges: string[]
  priceRange: {
    min: number
    max: number
  }
}

export type CollectionCount = {
  collectionId: string
  totalProducts: number
  inStockCount: number
  newArrivalsCount: number
  saleCount: number
}

export type CollectionCountsResponse = {
  counts: CollectionCount[]
}

export type RelatedCollection = {
  id: string
  slug: string
  name: { en: string; fa: string }
  description: { en: string; fa: string }
  featured: boolean
  heroImage: string
  productCount: number
}

export type CollectionRelatedResponse = {
  related: RelatedCollection[]
}
