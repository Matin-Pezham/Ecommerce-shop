import { productCategories } from '@/data/categories'
import { productCollections } from '@/data/collections'
import { getLocalizedText } from '@/features/products/productUtils'
import type { Product } from '@/features/products/types'
import type {
  ActiveFilterChip,
  ActiveFilterKey,
  AvailabilityFilter,
  AvailableFilterOptions,
  BadgeFilter,
  FilterLanguage,
  ProductFilters,
  ProductSort,
} from './filterTypes'

const validSortValues: ProductSort[] = ['featured', 'newest', 'price-asc', 'price-desc', 'rating', 'bestseller']
const validAvailabilityValues: AvailabilityFilter[] = ['all', 'in-stock', 'out-of-stock', 'low-stock']
const validBadgeValues: BadgeFilter[] = ['new', 'sale', 'limited', 'featured', 'bestseller']

export const defaultFilters: ProductFilters = {
  sort: 'featured',
  availability: 'all',
}

function isValidSort(value: string | null): value is ProductSort {
  if (!value) return false
  return validSortValues.includes(value as ProductSort)
}

function isValidAvailability(value: string | null): value is AvailabilityFilter {
  if (!value) return false
  return validAvailabilityValues.includes(value as AvailabilityFilter)
}

function isValidBadge(value: string | null): value is BadgeFilter {
  if (!value) return false
  return validBadgeValues.includes(value as BadgeFilter)
}

function normalizeCategory(value: string | null): string | undefined {
  if (!value) return undefined
  const byId = productCategories.find((category) => category.id === value)
  if (byId) return byId.id
  const bySlug = productCategories.find((category) => category.slug === value)
  return bySlug?.id
}

function normalizeCollection(value: string | null): string | undefined {
  if (!value) return undefined
  const byId = productCollections.find((collection) => collection.id === value)
  if (byId) return byId.id
  const bySlug = productCollections.find((collection) => collection.slug === value)
  return bySlug?.id
}

function parseNumeric(value: string | null): number | undefined {
  if (!value) return undefined
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed < 0) return undefined
  return parsed
}

export function parseFiltersFromSearchParams(searchParams: URLSearchParams): ProductFilters {
  const search = searchParams.get('search')?.trim() || undefined
  const category = normalizeCategory(searchParams.get('category'))
  const collection = normalizeCollection(searchParams.get('collection'))
  const color = searchParams.get('color') || undefined
  const size = searchParams.get('size') || undefined
  const minPrice = parseNumeric(searchParams.get('minPrice'))
  const maxPrice = parseNumeric(searchParams.get('maxPrice'))
  const availabilityParam = searchParams.get('availability')
  const badgeParam = searchParams.get('badge')
  const sortParam = searchParams.get('sort')
  const availability = isValidAvailability(availabilityParam) ? availabilityParam : undefined
  const badge = isValidBadge(badgeParam) ? badgeParam : undefined
  const sort = isValidSort(sortParam) ? sortParam : undefined

  return {
    search,
    category,
    collection,
    color,
    size,
    minPrice,
    maxPrice,
    availability: availability ?? defaultFilters.availability,
    badge,
    sort: sort ?? defaultFilters.sort,
  }
}

export function createSearchParamsFromFilters(filters: ProductFilters): URLSearchParams {
  const params = new URLSearchParams()

  if (filters.search) params.set('search', filters.search)
  if (filters.category) {
    const category = productCategories.find((item) => item.id === filters.category)
    params.set('category', category?.slug ?? filters.category)
  }
  if (filters.collection) {
    const collection = productCollections.find((item) => item.id === filters.collection)
    params.set('collection', collection?.slug ?? filters.collection)
  }
  if (filters.color) params.set('color', filters.color)
  if (filters.size) params.set('size', filters.size)
  if (typeof filters.minPrice === 'number') params.set('minPrice', String(filters.minPrice))
  if (typeof filters.maxPrice === 'number') params.set('maxPrice', String(filters.maxPrice))
  if (filters.availability && filters.availability !== 'all') params.set('availability', filters.availability)
  if (filters.badge) params.set('badge', filters.badge)
  if (filters.sort && filters.sort !== 'featured') params.set('sort', filters.sort)

  return params
}

export function filterProducts(products: Product[], filters: ProductFilters, language: FilterLanguage): Product[] {
  const searchValue = filters.search?.trim().toLowerCase() || ''

  return products.filter((product) => {
    if (searchValue) {
      const haystack = [
        getLocalizedText(product.title, language),
        product.subtitle ? getLocalizedText(product.subtitle, language) : '',
        getLocalizedText(product.shortDescription, language),
        getLocalizedText(product.description, language),
        product.brand,
        product.sku,
        ...product.tags,
      ]
        .join(' ')
        .toLowerCase()

      if (!haystack.includes(searchValue)) return false
    }

    if (filters.category && product.categoryId !== filters.category) return false
    if (filters.collection && !product.collectionIds.includes(filters.collection)) return false

    if (filters.color) {
      const hasColor = product.colors.some((color) => color.id === filters.color || color.value === filters.color)
      if (!hasColor) return false
    }

    if (filters.size) {
      const hasSize = product.sizes.some((size) => size.id === filters.size && size.available)
      if (!hasSize) return false
    }

    if (typeof filters.minPrice === 'number' && product.price < filters.minPrice) return false
    if (typeof filters.maxPrice === 'number' && product.price > filters.maxPrice) return false

    if (filters.availability === 'in-stock' && product.stock <= 0) return false
    if (filters.availability === 'out-of-stock' && product.stock > 0) return false
    if (filters.availability === 'low-stock' && !(product.stock > 0 && product.stock <= 5)) return false

    if (filters.badge) {
      if (filters.badge === 'bestseller') {
        if (!product.isBestSeller && !product.badges.some((badge) => badge.type === 'bestseller')) return false
      } else if (!product.badges.some((badge) => badge.type === filters.badge)) {
        return false
      }
    }

    return true
  })
}

export function sortProducts(products: Product[], sort: ProductSort = 'featured'): Product[] {
  const list = [...products]

  switch (sort) {
    case 'newest':
      return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price)
    case 'rating':
      return list.sort((a, b) => b.rating - a.rating)
    case 'bestseller':
      return list.sort((a, b) => {
        const scoreA = (a.isBestSeller ? 1 : 0) * 1000 + a.reviewsCount
        const scoreB = (b.isBestSeller ? 1 : 0) * 1000 + b.reviewsCount
        return scoreB - scoreA
      })
    case 'featured':
    default:
      return list.sort((a, b) => {
        const scoreA = (a.isFeatured ? 1 : 0) * 1000 + a.rating * 100 + a.reviewsCount
        const scoreB = (b.isFeatured ? 1 : 0) * 1000 + b.rating * 100 + b.reviewsCount
        return scoreB - scoreA
      })
  }
}

export function getAvailableFilterOptions(products: Product[]): AvailableFilterOptions {
  const categoryIds = new Set<string>()
  const collectionIds = new Set<string>()
  const colorMap = new Map<string, { id: string; hex: string; name: { en: string; fa: string } }>()
  const sizeMap = new Map<string, { id: string; label: string }>()
  const badges = new Set<BadgeFilter>()
  let min = Number.POSITIVE_INFINITY
  let max = Number.NEGATIVE_INFINITY

  products.forEach((product) => {
    categoryIds.add(product.categoryId)
    product.collectionIds.forEach((collectionId) => collectionIds.add(collectionId))

    product.colors.forEach((color) => {
      if (!colorMap.has(color.id)) {
        colorMap.set(color.id, {
          id: color.id,
          hex: color.hex || color.value,
          name: color.name,
        })
      }
    })

    product.sizes.forEach((size) => {
      if (size.available && !sizeMap.has(size.id)) {
        sizeMap.set(size.id, { id: size.id, label: size.label })
      }
    })

    product.badges.forEach((badge) => {
      if (validBadgeValues.includes(badge.type as BadgeFilter)) {
        badges.add(badge.type as BadgeFilter)
      }
    })

    if (product.isBestSeller) {
      badges.add('bestseller')
    }

    min = Math.min(min, product.price)
    max = Math.max(max, product.price)
  })

  return {
    categoryIds: [...categoryIds],
    collectionIds: [...collectionIds],
    colors: [...colorMap.values()],
    sizes: [...sizeMap.values()],
    badges: [...badges],
    priceRange: {
      min: Number.isFinite(min) ? min : 0,
      max: Number.isFinite(max) ? max : 0,
    },
  }
}

export function hasActiveFilters(filters: ProductFilters): boolean {
  return Boolean(
    filters.search ||
      filters.category ||
      filters.collection ||
      filters.color ||
      filters.size ||
      typeof filters.minPrice === 'number' ||
      typeof filters.maxPrice === 'number' ||
      (filters.availability && filters.availability !== 'all') ||
      filters.badge ||
      (filters.sort && filters.sort !== 'featured'),
  )
}

type ChipLabelMaps = {
  categoryLabels?: Record<string, string>
  collectionLabels?: Record<string, string>
  colorLabels?: Record<string, string>
  sizeLabels?: Record<string, string>
  availabilityLabels?: Record<Exclude<AvailabilityFilter, 'all'>, string>
  badgeLabels?: Record<BadgeFilter, string>
  sortLabels?: Record<ProductSort, string>
  minPriceLabel?: string
  maxPriceLabel?: string
}

export function getActiveFilterChips(
  filters: ProductFilters,
  _language: FilterLanguage,
  labels: ChipLabelMaps = {},
): ActiveFilterChip[] {
  const chips: ActiveFilterChip[] = []

  if (filters.search) chips.push({ key: 'search', value: filters.search, label: filters.search })
  if (filters.category) {
    chips.push({ key: 'category', value: filters.category, label: labels.categoryLabels?.[filters.category] ?? filters.category })
  }
  if (filters.collection) {
    chips.push({
      key: 'collection',
      value: filters.collection,
      label: labels.collectionLabels?.[filters.collection] ?? filters.collection,
    })
  }
  if (filters.color) {
    chips.push({ key: 'color', value: filters.color, label: labels.colorLabels?.[filters.color] ?? filters.color })
  }
  if (filters.size) {
    chips.push({ key: 'size', value: filters.size, label: labels.sizeLabels?.[filters.size] ?? filters.size })
  }
  if (typeof filters.minPrice === 'number') {
    chips.push({ key: 'minPrice', value: String(filters.minPrice), label: labels.minPriceLabel ?? String(filters.minPrice) })
  }
  if (typeof filters.maxPrice === 'number') {
    chips.push({ key: 'maxPrice', value: String(filters.maxPrice), label: labels.maxPriceLabel ?? String(filters.maxPrice) })
  }
  if (filters.availability && filters.availability !== 'all') {
    chips.push({
      key: 'availability',
      value: filters.availability,
      label: labels.availabilityLabels?.[filters.availability] ?? filters.availability,
    })
  }
  if (filters.badge) {
    chips.push({ key: 'badge', value: filters.badge, label: labels.badgeLabels?.[filters.badge] ?? filters.badge })
  }
  if (filters.sort && filters.sort !== 'featured') {
    chips.push({ key: 'sort', value: filters.sort, label: labels.sortLabels?.[filters.sort] ?? filters.sort })
  }

  return chips
}

export function clearFilter(filters: ProductFilters, key: ActiveFilterKey): ProductFilters {
  const next: ProductFilters = { ...filters }

  if (key === 'sort') {
    next.sort = 'featured'
    return next
  }

  if (key === 'availability') {
    next.availability = 'all'
    return next
  }

  delete next[key]
  return next
}

export function clearAllFilters(): ProductFilters {
  return { ...defaultFilters }
}
