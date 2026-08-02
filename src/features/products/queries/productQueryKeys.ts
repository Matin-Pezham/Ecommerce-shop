import type { ProductListParams } from '@/features/products/api/productApiTypes'

type ProductListKeyParams = Readonly<{
  search?: string
  categoryId?: string
  collectionId?: string
  colorId?: string
  sizeId?: string
  availability?: string
  sale?: boolean
  limited?: boolean
  featured?: boolean
  newArrival?: boolean
  bestseller?: boolean
  minPrice?: number
  maxPrice?: number
  sort?: ProductListParams['sort']
  page?: number
  pageSize?: number
  productIds?: string[]
}>

export const normalizeProductListKeyParams = (params: ProductListParams = {}): ProductListKeyParams => {
  const normalized: ProductListKeyParams = {
    ...(params.search !== undefined ? { search: params.search } : {}),
    ...(params.categoryId !== undefined ? { categoryId: params.categoryId } : {}),
    ...(params.collectionId !== undefined ? { collectionId: params.collectionId } : {}),
    ...(params.colorId !== undefined ? { colorId: params.colorId } : {}),
    ...(params.sizeId !== undefined ? { sizeId: params.sizeId } : {}),
    ...(params.availability !== undefined ? { availability: params.availability } : {}),
    ...(params.sale !== undefined ? { sale: params.sale } : {}),
    ...(params.limited !== undefined ? { limited: params.limited } : {}),
    ...(params.featured !== undefined ? { featured: params.featured } : {}),
    ...(params.newArrival !== undefined ? { newArrival: params.newArrival } : {}),
    ...(params.bestseller !== undefined ? { bestseller: params.bestseller } : {}),
    ...(params.minPrice !== undefined ? { minPrice: params.minPrice } : {}),
    ...(params.maxPrice !== undefined ? { maxPrice: params.maxPrice } : {}),
    ...(params.sort !== undefined ? { sort: params.sort } : {}),
    ...(params.page !== undefined ? { page: params.page } : {}),
    ...(params.pageSize !== undefined ? { pageSize: params.pageSize } : {}),
    ...(params.productIds !== undefined && params.productIds.length > 0 ? { productIds: [...params.productIds].sort() } : {}),
  }

  return normalized
}

export const productQueryKeys = {
  all: ['products'] as const,
  lists: () => [...productQueryKeys.all, 'list'] as const,
  list: (params: ProductListParams = {}) => [...productQueryKeys.lists(), normalizeProductListKeyParams(params)] as const,
  details: () => [...productQueryKeys.all, 'detail'] as const,
  detail: (slug: string) => [...productQueryKeys.details(), slug] as const,
  facets: () => [...productQueryKeys.all, 'facets'] as const,
}

export const collectionQueryKeys = {
  all: ['collections'] as const,
  counts: () => [...collectionQueryKeys.all, 'counts'] as const,
  related: (collectionId: string) => [...collectionQueryKeys.all, 'related', collectionId] as const,
}
