import type { Locale } from '@/i18n'

export type ProductSort = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'bestseller'

export type AvailabilityFilter = 'all' | 'in-stock' | 'out-of-stock' | 'low-stock'

export type BadgeFilter = 'new' | 'sale' | 'limited' | 'featured' | 'bestseller'

export type ProductFilters = {
  search?: string
  category?: string
  collection?: string
  color?: string
  size?: string
  minPrice?: number
  maxPrice?: number
  availability?: AvailabilityFilter
  badge?: BadgeFilter
  sort?: ProductSort
}

export type ActiveFilterKey = keyof ProductFilters

export type ActiveFilterChip = {
  key: ActiveFilterKey
  value: string
  label: string
}

export type AvailableFilterOptions = {
  categoryIds: string[]
  collectionIds: string[]
  colors: Array<{ id: string; hex: string; name: { en: string; fa: string } }>
  sizes: Array<{ id: string; label: string }>
  badges: BadgeFilter[]
  priceRange: {
    min: number
    max: number
  }
}

export type FilterLanguage = Locale
