import { describe, expect, it, vi } from 'vitest'
import { productsCatalog } from '@/data/products'
import api from '@/services/api'
import { getProductBySlug, getProducts } from './productApi'
import type { Product } from '@/features/products/types'
import type { ProductSort } from './productApiTypes'

const isSortedByPriceAsc = (items: Product[]): boolean => {
  for (let index = 1; index < items.length; index += 1) {
    if (items[index - 1].price > items[index].price) {
      return false
    }
  }

  return true
}

const matchesSearch = (product: Product, term: string): boolean => {
  const normalizedTerm = term.trim().toLocaleLowerCase()
  if (normalizedTerm.length === 0) {
    return true
  }

  const searchableFields = [
    product.title.en,
    product.title.fa,
    product.subtitle?.en,
    product.subtitle?.fa,
    product.shortDescription.en,
    product.shortDescription.fa,
    product.brand,
    product.sku,
    ...product.tags,
  ]

  return searchableFields
    .filter((field): field is string => typeof field === 'string' && field.length > 0)
    .some((field) => field.toLocaleLowerCase().includes(normalizedTerm))
}

const sortProductsForAssertion = (items: Product[], sort: ProductSort): Product[] => {
  const sorted = [...items]

  sorted.sort((a, b) => {
    switch (sort) {
      case 'featured': {
        const featuredDiff = Number(b.isFeatured) - Number(a.isFeatured)
        if (featuredDiff !== 0) return featuredDiff
        const ratingDiff = b.rating - a.rating
        if (ratingDiff !== 0) return ratingDiff
        return a.id.localeCompare(b.id)
      }
      case 'newest': {
        const timeDiff = Date.parse(b.createdAt) - Date.parse(a.createdAt)
        if (timeDiff !== 0) return timeDiff
        return a.id.localeCompare(b.id)
      }
      case 'price-asc': {
        const diff = a.price - b.price
        if (diff !== 0) return diff
        return a.id.localeCompare(b.id)
      }
      case 'price-desc': {
        const diff = b.price - a.price
        if (diff !== 0) return diff
        return a.id.localeCompare(b.id)
      }
      case 'rating-desc': {
        const ratingDiff = b.rating - a.rating
        if (ratingDiff !== 0) return ratingDiff
        const reviewsDiff = b.reviewsCount - a.reviewsCount
        if (reviewsDiff !== 0) return reviewsDiff
        return a.id.localeCompare(b.id)
      }
      default:
        return a.id.localeCompare(b.id)
    }
  })

  return sorted
}

describe('productApi', () => {
  it('returns default product list response without mutating static catalog order', async () => {
    const baselineIds = productsCatalog.map((product) => product.id)

    const response = await getProducts()

    expect(Array.isArray(response.items)).toBe(true)
    expect(response.pagination.page).toBe(1)
    expect(response.pagination.pageSize).toBe(12)
    expect(response.pagination.totalItems).toBe(productsCatalog.length)
    expect(response.items.length).toBeLessThanOrEqual(12)
    expect(productsCatalog.map((product) => product.id)).toEqual(baselineIds)
    expect(response.items.map((product) => product.id)).toEqual(baselineIds.slice(0, response.items.length))
  })

  it('applies filtering and price ascending sorting with correct pagination metadata', async () => {
    const categoryId = productsCatalog[0].categoryId
    const minPrice = 1000
    const sort: ProductSort = 'price-asc'

    const response = await getProducts({
      categoryId,
      minPrice,
      sort,
      pageSize: 48,
    })

    const expectedFiltered = sortProductsForAssertion(
      productsCatalog.filter((product) => product.categoryId === categoryId && product.price >= minPrice),
      sort,
    )

    expect(response.items.every((product) => product.categoryId === categoryId)).toBe(true)
    expect(response.items.every((product) => product.price >= minPrice)).toBe(true)
    expect(isSortedByPriceAsc(response.items)).toBe(true)
    expect(response.items.map((product) => product.id)).toEqual(expectedFiltered.map((product) => product.id))
    expect(response.pagination.totalItems).toBe(expectedFiltered.length)
    expect(response.pagination.totalPages).toBe(expectedFiltered.length === 0 ? 0 : 1)
  })

  it('supports both English and Persian text search', async () => {
    const englishSource = productsCatalog.find((product) => product.title.en.trim().length > 0)
    const persianSource = productsCatalog.find((product) => product.title.fa.trim().length > 0)

    if (!englishSource || !persianSource) {
      throw new Error('Expected catalog fixtures for English and Persian search tests.')
    }

    const englishTerm = englishSource.title.en.split(/\s+/)[0]
    const persianTerm = persianSource.title.fa.split(/\s+/)[0]

    const englishResponse = await getProducts({ search: englishTerm, pageSize: 48 })
    const persianResponse = await getProducts({ search: persianTerm, pageSize: 48 })

    expect(englishResponse.items.length).toBeGreaterThan(0)
    expect(persianResponse.items.length).toBeGreaterThan(0)
    expect(englishResponse.items.every((product) => matchesSearch(product, englishTerm))).toBe(true)
    expect(persianResponse.items.every((product) => matchesSearch(product, persianTerm))).toBe(true)
  })

  it('preserves explicit boolean false filters', async () => {
    const response = await getProducts({ featured: false, pageSize: 48 })

    expect(response.items.length).toBeGreaterThan(0)
    expect(response.items.every((product) => product.isFeatured === false)).toBe(true)
  })

  it('returns empty items for pages beyond final page while preserving pagination metadata', async () => {
    const requestedPage = 999
    const pageSize = 5

    const response = await getProducts({ page: requestedPage, pageSize })

    expect(response.items).toEqual([])
    expect(response.pagination.page).toBe(requestedPage)
    expect(response.pagination.totalItems).toBe(productsCatalog.length)
    expect(response.pagination.totalPages).toBe(Math.ceil(productsCatalog.length / pageSize))
  })

  it('returns typed app errors for invalid queries', async () => {
    await expect(getProducts({ pageSize: 100 })).rejects.toMatchObject({
      kind: 'bad-request',
      status: 400,
      code: 'INVALID_PAGINATION',
    })
  })

  it('rejects malformed payloads with a typed app error', async () => {
    const getSpy = vi.spyOn(api, 'get').mockResolvedValue({
      data: { items: [{ id: 'broken' }], pagination: { page: 1, pageSize: 1, totalItems: 1, totalPages: 1 } },
    } as never)

    await expect(getProducts()).rejects.toMatchObject({
      kind: 'invalid-response',
    })

    getSpy.mockRestore()
  })

  it('converts network failures into a typed app error', async () => {
    const getSpy = vi.spyOn(api, 'get').mockRejectedValue({
      isAxiosError: true,
      code: 'ERR_NETWORK',
      message: 'Network Error',
      config: {},
      toJSON: () => ({}),
    })

    await expect(getProducts()).rejects.toMatchObject({
      kind: 'network',
    })

    getSpy.mockRestore()
  })

  it('returns product detail for existing slugs', async () => {
    const expectedProduct = productsCatalog[0]

    const product = await getProductBySlug(expectedProduct.slug)

    expect(product.slug).toBe(expectedProduct.slug)
    expect(product.id).toBe(expectedProduct.id)
    expect(product.variants).toEqual(expectedProduct.variants)
  })

  it('returns typed 404 errors for unknown product slugs', async () => {
    await expect(getProductBySlug('missing-product-slug')).rejects.toMatchObject({
      kind: 'not-found',
      status: 404,
      code: 'PRODUCT_NOT_FOUND',
    })
  })

  it('rejects blank slugs before sending a network request', async () => {
    const getSpy = vi.spyOn(api, 'get')

    await expect(getProductBySlug('   ')).rejects.toMatchObject({ kind: 'bad-request' })
    expect(getSpy).not.toHaveBeenCalled()

    getSpy.mockRestore()
  })

  it('keeps default ordering after a sorted request', async () => {
    await getProducts({ sort: 'price-desc', pageSize: 48 })

    const defaultResponse = await getProducts({ pageSize: 48 })
    const catalogIds = productsCatalog.map((product) => product.id)

    expect(defaultResponse.items.map((product) => product.id)).toEqual(catalogIds)
  })
})
