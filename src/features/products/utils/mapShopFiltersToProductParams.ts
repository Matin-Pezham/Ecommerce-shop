import type { ProductListParams, ProductSort } from '@/features/products/api/productApiTypes'
import type { ProductFilters } from '@/features/products/filterTypes'

const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 12

const mapSortToApiSort = (sort?: ProductFilters['sort']): ProductSort | undefined => {
  if (!sort) {
    return undefined
  }

  switch (sort) {
    case 'featured':
    case 'newest':
    case 'price-asc':
    case 'price-desc':
    case 'bestseller':
      return sort
    case 'rating-desc':
      return 'rating-desc'
    default:
      return undefined
  }
}

const toValidNumber = (value?: number): number | undefined => {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return undefined
  }

  return value
}

export type ShopProductListSource = {
  filters: ProductFilters
  page?: number
  pageSize?: number
  debouncedSearch?: string
}

export const mapShopFiltersToProductParams = ({
  filters,
  page,
  pageSize,
  debouncedSearch,
}: ShopProductListSource): ProductListParams => {
  const normalizedSearch = (debouncedSearch ?? filters.search ?? '').trim()
  const normalizedPage = toValidNumber(page)
  const normalizedPageSize = toValidNumber(pageSize)

  return {
    ...(normalizedSearch.length > 0 ? { search: normalizedSearch } : {}),
    ...(filters.category && filters.category.trim().length > 0 ? { categoryId: filters.category } : {}),
    ...(filters.collection && filters.collection.trim().length > 0 ? { collectionId: filters.collection } : {}),
    ...(filters.color && filters.color.trim().length > 0 ? { colorId: filters.color } : {}),
    ...(filters.size && filters.size.trim().length > 0 ? { sizeId: filters.size } : {}),
    ...(filters.availability && filters.availability !== 'all' ? { availability: filters.availability } : {}),
    ...(filters.badge === 'sale' ? { sale: true } : {}),
    ...(filters.badge === 'limited' ? { limited: true } : {}),
    ...(filters.badge === 'featured' ? { featured: true } : {}),
    ...(filters.badge === 'new' ? { newArrival: true } : {}),
    ...(filters.badge === 'bestseller' ? { bestseller: true } : {}),
    ...(toValidNumber(filters.minPrice) !== undefined ? { minPrice: toValidNumber(filters.minPrice) } : {}),
    ...(toValidNumber(filters.maxPrice) !== undefined ? { maxPrice: toValidNumber(filters.maxPrice) } : {}),
    ...(mapSortToApiSort(filters.sort) !== undefined ? { sort: mapSortToApiSort(filters.sort) } : {}),
    page: normalizedPage && normalizedPage > 0 ? Math.trunc(normalizedPage) : DEFAULT_PAGE,
    pageSize: normalizedPageSize && normalizedPageSize > 0 ? Math.trunc(normalizedPageSize) : DEFAULT_PAGE_SIZE,
  }
}
