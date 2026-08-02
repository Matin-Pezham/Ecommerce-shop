import { http, HttpResponse } from 'msw'
import { productsCatalog } from '@/data/products'
import { productCategories } from '@/data/categories'
import { productCollections } from '@/data/collections'
import { PRODUCT_API_MSW_PATTERNS } from '@/features/products/api/productApiRoutes'
import type { Product } from '@/features/products/types'
import type {
  ProductApiError,
  ProductListResponse,
  ProductSort,
  ProductFacetsResponse,
  CollectionCountsResponse,
  CollectionRelatedResponse,
} from '@/features/products/api/productApiTypes'

type QueryValidationError = {
  code: string
  message: string
}

const MAX_PAGE_SIZE = 48
const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 12

const supportedSorts: ReadonlySet<ProductSort> = new Set([
  'featured',
  'newest',
  'price-asc',
  'price-desc',
  'bestseller',
  'rating-desc',
])

const isSupportedSort = (value: string): value is ProductSort => (
  value === 'featured'
  || value === 'newest'
  || value === 'price-asc'
  || value === 'price-desc'
  || value === 'bestseller'
  || value === 'rating-desc'
)

const toErrorResponse = (status: number, code: string, message: string) => {
  const body: ProductApiError = {
    error: {
      code,
      message,
    },
  }

  return HttpResponse.json(body, { status })
}

const toLower = (value: string): string => value.toLocaleLowerCase()

const cloneProduct = (product: Product): Product => structuredClone(product)

const parseBooleanParam = (
  value: string | null,
  field: 'featured' | 'newArrival' | 'sale' | 'limited' | 'bestseller',
): boolean | undefined | QueryValidationError => {
  if (value === null) {
    return undefined
  }

  if (value === 'true') {
    return true
  }

  if (value === 'false') {
    return false
  }

  return {
    code: 'INVALID_QUERY',
    message: `Query parameter "${field}" must be "true" or "false".`,
  }
}

const parseAvailabilityParam = (value: string | null): 'all' | 'in-stock' | 'out-of-stock' | 'low-stock' | QueryValidationError => {
  if (value === null) {
    return 'all'
  }

  const normalized = value.trim()
  if (normalized === 'all' || normalized === 'in-stock' || normalized === 'out-of-stock' || normalized === 'low-stock') {
    return normalized
  }

  return {
    code: 'INVALID_QUERY',
    message: 'Query parameter "availability" must be one of all, in-stock, out-of-stock, or low-stock.',
  }
}

const parseNonNegativeNumber = (
  value: string | null,
  field: 'minPrice' | 'maxPrice',
): number | undefined | QueryValidationError => {
  if (value === null) {
    return undefined
  }

  const normalized = value.trim()
  if (normalized.length === 0) {
    return {
      code: 'INVALID_PRICE_RANGE',
      message: `Query parameter "${field}" must be a non-negative number.`,
    }
  }

  const parsed = Number(normalized)
  if (!Number.isFinite(parsed) || parsed < 0) {
    return {
      code: 'INVALID_PRICE_RANGE',
      message: `Query parameter "${field}" must be a non-negative number.`,
    }
  }

  return parsed
}

const parsePositiveInteger = (
  value: string | null,
  field: 'page' | 'pageSize',
): number | undefined | QueryValidationError => {
  if (value === null) {
    return undefined
  }

  const normalized = value.trim()
  if (normalized.length === 0) {
    return {
      code: 'INVALID_PAGINATION',
      message: `Query parameter "${field}" must be a positive integer.`,
    }
  }

  const parsed = Number(normalized)
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return {
      code: 'INVALID_PAGINATION',
      message: `Query parameter "${field}" must be a positive integer.`,
    }
  }

  return parsed
}

const parseSort = (value: string | null): ProductSort | undefined | QueryValidationError => {
  if (value === null) {
    return undefined
  }

  const normalized = value.trim()
  if (!isSupportedSort(normalized) || !supportedSorts.has(normalized)) {
    return {
      code: 'INVALID_SORT',
      message: `Unsupported sort value "${value}".`,
    }
  }

  return normalized
}

const queryIncludesSearchTerm = (product: Product, term: string): boolean => {
  const normalizedTerm = toLower(term)
  const searchFields = [
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

  return searchFields
    .filter((field): field is string => typeof field === 'string' && field.length > 0)
    .some((field) => toLower(field).includes(normalizedTerm))
}

const sortProducts = (products: Product[], sort?: ProductSort): Product[] => {
  if (!sort) {
    return products
  }

  const sorted = [...products]

  sorted.sort((a, b) => {
    switch (sort) {
      case 'featured': {
        const featuredDiff = Number(b.isFeatured) - Number(a.isFeatured)
        if (featuredDiff !== 0) {
          return featuredDiff
        }

        const ratingDiff = b.rating - a.rating
        if (ratingDiff !== 0) {
          return ratingDiff
        }

        return a.id.localeCompare(b.id)
      }
      case 'bestseller': {
        const bestsellerDiff = Number(b.isBestSeller) - Number(a.isBestSeller)
        if (bestsellerDiff !== 0) {
          return bestsellerDiff
        }

        const reviewsDiff = b.reviewsCount - a.reviewsCount
        if (reviewsDiff !== 0) {
          return reviewsDiff
        }

        const ratingDiff = b.rating - a.rating
        if (ratingDiff !== 0) {
          return ratingDiff
        }

        const timeDiff = Date.parse(b.createdAt) - Date.parse(a.createdAt)
        if (timeDiff !== 0) {
          return timeDiff
        }

        return a.id.localeCompare(b.id)
      }
      case 'newest': {
        const timeDiff = Date.parse(b.createdAt) - Date.parse(a.createdAt)
        if (timeDiff !== 0) {
          return timeDiff
        }

        return a.id.localeCompare(b.id)
      }
      case 'price-asc': {
        const priceDiff = a.price - b.price
        if (priceDiff !== 0) {
          return priceDiff
        }

        return a.id.localeCompare(b.id)
      }
      case 'price-desc': {
        const priceDiff = b.price - a.price
        if (priceDiff !== 0) {
          return priceDiff
        }

        return a.id.localeCompare(b.id)
      }
      case 'rating-desc': {
        const ratingDiff = b.rating - a.rating
        if (ratingDiff !== 0) {
          return ratingDiff
        }

        const reviewsDiff = b.reviewsCount - a.reviewsCount
        if (reviewsDiff !== 0) {
          return reviewsDiff
        }

        return a.id.localeCompare(b.id)
      }
      default:
        return a.id.localeCompare(b.id)
    }
  })

  return sorted
}

export const productsHandlers = [
  http.get(PRODUCT_API_MSW_PATTERNS.products, ({ request }) => {
    try {
      const url = new URL(request.url)
      const searchParams = url.searchParams

      const pageResult = parsePositiveInteger(searchParams.get('page'), 'page')
      if (typeof pageResult === 'object') {
        return toErrorResponse(400, pageResult.code, pageResult.message)
      }

      const pageSizeResult = parsePositiveInteger(searchParams.get('pageSize'), 'pageSize')
      if (typeof pageSizeResult === 'object') {
        return toErrorResponse(400, pageSizeResult.code, pageSizeResult.message)
      }

      const minPriceResult = parseNonNegativeNumber(searchParams.get('minPrice'), 'minPrice')
      if (typeof minPriceResult === 'object') {
        return toErrorResponse(400, minPriceResult.code, minPriceResult.message)
      }

      const maxPriceResult = parseNonNegativeNumber(searchParams.get('maxPrice'), 'maxPrice')
      if (typeof maxPriceResult === 'object') {
        return toErrorResponse(400, maxPriceResult.code, maxPriceResult.message)
      }

      const featuredResult = parseBooleanParam(searchParams.get('featured'), 'featured')
      if (typeof featuredResult === 'object') {
        return toErrorResponse(400, featuredResult.code, featuredResult.message)
      }

      const newArrivalResult = parseBooleanParam(searchParams.get('newArrival'), 'newArrival')
      if (typeof newArrivalResult === 'object') {
        return toErrorResponse(400, newArrivalResult.code, newArrivalResult.message)
      }

      const saleResult = parseBooleanParam(searchParams.get('sale'), 'sale')
      if (typeof saleResult === 'object') {
        return toErrorResponse(400, saleResult.code, saleResult.message)
      }

      const limitedResult = parseBooleanParam(searchParams.get('limited'), 'limited')
      if (typeof limitedResult === 'object') {
        return toErrorResponse(400, limitedResult.code, limitedResult.message)
      }

      const bestsellerResult = parseBooleanParam(searchParams.get('bestseller'), 'bestseller')
      if (typeof bestsellerResult === 'object') {
        return toErrorResponse(400, bestsellerResult.code, bestsellerResult.message)
      }

      const sortResult = parseSort(searchParams.get('sort'))
      if (typeof sortResult === 'object') {
        return toErrorResponse(400, sortResult.code, sortResult.message)
      }

      const availabilityResult = parseAvailabilityParam(searchParams.get('availability'))
      if (typeof availabilityResult === 'object') {
        return toErrorResponse(400, availabilityResult.code, availabilityResult.message)
      }

      const page = pageResult ?? DEFAULT_PAGE
      const pageSize = pageSizeResult ?? DEFAULT_PAGE_SIZE

      if (pageSize > MAX_PAGE_SIZE) {
        return toErrorResponse(400, 'INVALID_PAGINATION', `Query parameter "pageSize" must be less than or equal to ${MAX_PAGE_SIZE}.`)
      }

      const minPrice = minPriceResult
      const maxPrice = maxPriceResult

      if (
        minPrice !== undefined
        && maxPrice !== undefined
        && minPrice > maxPrice
      ) {
        return toErrorResponse(400, 'INVALID_PRICE_RANGE', 'Query parameter "minPrice" cannot be greater than "maxPrice".')
      }

      const categoryId = searchParams.get('categoryId')?.trim()
      const collectionId = searchParams.get('collectionId')?.trim()
      const colorId = searchParams.get('colorId')?.trim()
      const sizeId = searchParams.get('sizeId')?.trim()
      const search = searchParams.get('search')?.trim() ?? ''
      const productIdsParam = searchParams.getAll('productIds')
      const productIds = productIdsParam.length > 0 ? productIdsParam : undefined

      let filteredProducts = [...productsCatalog]

      if (productIds && productIds.length > 0) {
        // If productIds is specified, filter by IDs first
        filteredProducts = filteredProducts.filter((product) => productIds.includes(product.id))
      }

      if (search.length > 0) {
        filteredProducts = filteredProducts.filter((product) => queryIncludesSearchTerm(product, search))
      }

      if (categoryId) {
        filteredProducts = filteredProducts.filter((product) => product.categoryId === categoryId)
      }

      if (collectionId) {
        filteredProducts = filteredProducts.filter((product) => product.collectionIds.includes(collectionId))
      }

      if (colorId) {
        filteredProducts = filteredProducts.filter((product) => product.colors.some((color) => color.id === colorId || color.value === colorId || color.hex === colorId))
      }

      if (sizeId) {
        filteredProducts = filteredProducts.filter((product) => product.sizes.some((size) => size.available && (size.id === sizeId || size.value === sizeId || size.label === sizeId)))
      }

      if (availabilityResult === 'in-stock') {
        filteredProducts = filteredProducts.filter((product) => product.stock > 0)
      } else if (availabilityResult === 'out-of-stock') {
        filteredProducts = filteredProducts.filter((product) => product.stock <= 0)
      } else if (availabilityResult === 'low-stock') {
        filteredProducts = filteredProducts.filter((product) => product.stock > 0 && product.stock <= 5)
      }

      if (saleResult !== undefined) {
        filteredProducts = filteredProducts.filter((product) => saleResult === Boolean(product.compareAtPrice && product.compareAtPrice > product.price || product.badges.some((badge) => badge.type === 'sale')))
      }

      if (limitedResult !== undefined) {
        filteredProducts = filteredProducts.filter((product) => limitedResult === Boolean(product.isLimited || product.badges.some((badge) => badge.type === 'limited')))
      }

      if (featuredResult !== undefined) {
        filteredProducts = filteredProducts.filter((product) => featuredResult === Boolean(product.isFeatured || product.badges.some((badge) => badge.type === 'featured')))
      }

      if (newArrivalResult !== undefined) {
        filteredProducts = filteredProducts.filter((product) => newArrivalResult === Boolean(product.isNewArrival || product.badges.some((badge) => badge.type === 'new')))
      }

      if (bestsellerResult !== undefined) {
        filteredProducts = filteredProducts.filter((product) => bestsellerResult === Boolean(product.isBestSeller || product.badges.some((badge) => badge.type === 'bestseller')))
      }

      if (minPrice !== undefined) {
        filteredProducts = filteredProducts.filter((product) => product.price >= minPrice)
      }

      if (maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter((product) => product.price <= maxPrice)
      }

      const sortedProducts = sortProducts(filteredProducts, sortResult)
      const totalItems = sortedProducts.length
      const totalPages = totalItems === 0 ? 0 : Math.ceil(totalItems / pageSize)

      const startIndex = (page - 1) * pageSize
      const endIndex = startIndex + pageSize
      const pageItems = startIndex >= totalItems
        ? []
        : sortedProducts.slice(startIndex, endIndex)

      const response: ProductListResponse = {
        items: pageItems.map(cloneProduct),
        pagination: {
          page,
          pageSize,
          totalItems,
          totalPages,
        },
      }

      return HttpResponse.json(response)
    } catch {
      return toErrorResponse(500, 'INTERNAL_ERROR', 'Unexpected mock handler error.')
    }
  }),

  http.get(PRODUCT_API_MSW_PATTERNS.productDetail, ({ params }) => {
    try {
      const rawSlug = typeof params.slug === 'string' ? params.slug : ''
      const decodedSlug = decodeURIComponent(rawSlug).trim()

      const product = productsCatalog.find((item) => item.slug === decodedSlug)
      if (!product) {
        return toErrorResponse(404, 'PRODUCT_NOT_FOUND', 'Product was not found.')
      }

      return HttpResponse.json({
        product: cloneProduct(product),
      })
    } catch {
      return toErrorResponse(500, 'INTERNAL_ERROR', 'Unexpected mock handler error.')
    }
  }),

  http.get(PRODUCT_API_MSW_PATTERNS.productFacets, () => {
    try {
      // Extract unique colors
      const colorMap = new Map<string, { id: string; name: { en: string; fa: string }; hex: string }>()
      productsCatalog.forEach((product) => {
        product.colors.forEach((color) => {
          if (!colorMap.has(color.id)) {
            colorMap.set(color.id, {
              id: color.id,
              name: color.name,
              hex: color.hex || color.value,
            })
          }
        })
      })

      // Extract unique sizes
      const sizeMap = new Map<string, { id: string; label: string }>()
      productsCatalog.forEach((product) => {
        product.sizes.forEach((size) => {
          if (size.available && !sizeMap.has(size.id)) {
            sizeMap.set(size.id, { id: size.id, label: size.label })
          }
        })
      })

      // Calculate price range
      const prices = productsCatalog.map((p) => p.price)
      const minPrice = Math.min(...prices)
      const maxPrice = Math.max(...prices)

      const response: ProductFacetsResponse = {
        categoryIds: productCategories.map((c) => c.id),
        collectionIds: productCollections.map((c) => c.id),
        colors: [...colorMap.values()],
        sizes: [...sizeMap.values()],
        badges: ['new', 'sale', 'limited', 'featured', 'bestseller'],
        priceRange: { min: minPrice, max: maxPrice },
      }

      return HttpResponse.json(response)
    } catch {
      return toErrorResponse(500, 'INTERNAL_ERROR', 'Unexpected mock handler error.')
    }
  }),

  http.get(PRODUCT_API_MSW_PATTERNS.collectionCounts, () => {
    try {
      const counts = productCollections.map((collection) => {
        const collectionProducts = productsCatalog.filter((p) =>
          p.collectionIds.includes(collection.id)
        )

        const totalProducts = collectionProducts.length
        const inStockCount = collectionProducts.filter((p) => p.stock > 0).length
        const newArrivalsCount = collectionProducts.filter((p) => p.isNewArrival).length
        const saleCount = collectionProducts.filter((p) => p.compareAtPrice && p.compareAtPrice > p.price).length

        return {
          collectionId: collection.id,
          totalProducts,
          inStockCount,
          newArrivalsCount,
          saleCount,
        }
      })

      const response: CollectionCountsResponse = { counts }
      return HttpResponse.json(response)
    } catch {
      return toErrorResponse(500, 'INTERNAL_ERROR', 'Unexpected mock handler error.')
    }
  }),

  http.get(PRODUCT_API_MSW_PATTERNS.collectionRelated, ({ params }) => {
    try {
      const collectionId = typeof params.id === 'string' ? params.id : ''
      if (!collectionId) {
        return toErrorResponse(400, 'INVALID_COLLECTION_ID', 'Collection ID is required.')
      }

      const currentCollection = productCollections.find((c) => c.id === collectionId)
      if (!currentCollection) {
        return toErrorResponse(404, 'COLLECTION_NOT_FOUND', 'Collection was not found.')
      }

      // Find related collections: other featured collections or collections with overlapping categories
      const currentProducts = productsCatalog.filter((p) =>
        p.collectionIds.includes(collectionId)
      )
      const currentCategoryIds = new Set(currentProducts.map((p) => p.categoryId))

      const relatedCollections = productCollections
        .filter((c) => c.id !== collectionId)
        .map((collection) => {
          const collectionProducts = productsCatalog.filter((p) =>
            p.collectionIds.includes(collection.id)
          )
          const collectionCategoryIds = new Set(collectionProducts.map((p) => p.categoryId))
          
          // Calculate overlap score
          let overlapScore = 0
          collectionCategoryIds.forEach((catId) => {
            if (currentCategoryIds.has(catId)) {
              overlapScore++
            }
          })

          return {
            collection,
            productCount: collectionProducts.length,
            overlapScore,
            featured: collection.featured ? 1 : 0,
          }
        })
        .filter((item) => item.overlapScore > 0 || item.featured > 0)
        .sort((a, b) => {
          // Sort by featured first, then overlap
          if (b.featured !== a.featured) return b.featured - a.featured
          return b.overlapScore - a.overlapScore
        })
        .slice(0, 3)

      const response: CollectionRelatedResponse = {
        related: relatedCollections.map((item) => ({
          id: item.collection.id,
          slug: item.collection.slug,
          name: item.collection.name,
          description: item.collection.description,
          featured: item.collection.featured ?? false,
          heroImage: item.collection.heroImage ?? '',
          productCount: item.productCount,
        })),
      }

      return HttpResponse.json(response)
    } catch {
      return toErrorResponse(500, 'INTERNAL_ERROR', 'Unexpected mock handler error.')
    }
  }),
]
