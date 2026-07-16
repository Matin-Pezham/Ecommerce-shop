import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  clearAllFilters,
  clearFilter,
  createSearchParamsFromFilters,
  filterProducts,
  getActiveFilterChips,
  getAvailableFilterOptions,
  hasActiveFilters,
  parseFiltersFromSearchParams,
  sortProducts,
} from '@/features/products/filterUtils'
import type {
  ActiveFilterKey,
  AvailabilityFilter,
  BadgeFilter,
  ProductFilters,
  ProductSort,
} from '@/features/products/filterTypes'
import { productCategories } from '@/data/categories'
import { productCollections } from '@/data/collections'
import { getLocalizedText } from '@/features/products/productUtils'
import type { Product } from '@/features/products/types'
import { useTranslation } from '@/i18n'

export function useProductFilters(products: Product[]) {
  const [searchParams, setSearchParams] = useSearchParams()
  const { locale, t, formatPrice } = useTranslation()

  const filters = useMemo(() => parseFiltersFromSearchParams(searchParams), [searchParams])

  const availableOptions = useMemo(() => getAvailableFilterOptions(products), [products])

  const filteredProducts = useMemo(() => {
    const list = filterProducts(products, filters, locale)
    return sortProducts(list, filters.sort)
  }, [filters, locale, products])

  const setFilters = (next: ProductFilters) => {
    setSearchParams(createSearchParamsFromFilters(next))
  }

  const setFilter = <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => {
    const next: ProductFilters = { ...filters }

    if (
      value === undefined ||
      value === null ||
      value === '' ||
      (key === 'availability' && value === 'all') ||
      (key === 'sort' && value === 'featured')
    ) {
      if (key === 'availability') {
        next.availability = 'all'
      } else if (key === 'sort') {
        next.sort = 'featured'
      } else {
        delete next[key]
      }
    } else {
      next[key] = value
    }

    setFilters(next)
  }

  const removeFilter = (key: ActiveFilterKey) => {
    setFilters(clearFilter(filters, key))
  }

  const resetFilters = () => {
    setFilters(clearAllFilters())
  }

  const categoryLabels = Object.fromEntries(
    productCategories.map((category) => [category.id, getLocalizedText(category.name, locale)]),
  )
  const collectionLabels = Object.fromEntries(
    productCollections.map((collection) => [collection.id, getLocalizedText(collection.name, locale)]),
  )

  const colorLabels = Object.fromEntries(
    products.flatMap((product) => product.colors.map((color) => [color.id, getLocalizedText(color.name, locale)] as const)),
  )

  const sizeLabels = Object.fromEntries(
    products.flatMap((product) => product.sizes.map((size) => [size.id, size.label] as const)),
  )

  const availabilityLabels: Record<Exclude<AvailabilityFilter, 'all'>, string> = {
    'in-stock': t('shop.inStock'),
    'out-of-stock': t('shop.outOfStock'),
    'low-stock': t('shop.lowStock'),
  }

  const badgeLabels: Record<BadgeFilter, string> = {
    new: t('product.new'),
    sale: t('product.sale'),
    limited: t('product.limited'),
    featured: t('product.featured'),
    bestseller: t('product.bestSeller'),
  }

  const sortLabels: Record<ProductSort, string> = {
    featured: t('shop.featured'),
    newest: t('shop.newest'),
    'price-asc': t('shop.priceLowToHigh'),
    'price-desc': t('shop.priceHighToLow'),
    rating: t('shop.bestRated'),
    bestseller: t('shop.bestSelling'),
  }

  const activeChips = getActiveFilterChips(filters, locale, {
    categoryLabels,
    collectionLabels,
    colorLabels,
    sizeLabels,
    availabilityLabels,
    badgeLabels,
    sortLabels,
    minPriceLabel: `${t('shop.minPrice')}: ${formatPrice(filters.minPrice ?? 0)}`,
    maxPriceLabel: `${t('shop.maxPrice')}: ${formatPrice(filters.maxPrice ?? 0)}`,
  })

  return {
    filters,
    filteredProducts,
    availableOptions,
    activeChips,
    hasFilters: hasActiveFilters(filters),
    setFilter,
    removeFilter,
    resetFilters,
    setFilters,
  }
}
