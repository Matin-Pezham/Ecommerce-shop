import axios from 'axios'
import api from '@/services/api'
import { createAppError, isAppError } from '@/services/appError'
import { PRODUCT_API_ROUTES } from './productApiRoutes'
import {
  productApiErrorSchema,
  productDetailResponseSchema,
  productListResponseSchema,
  productFacetsResponseSchema,
  collectionCountsResponseSchema,
  collectionRelatedResponseSchema,
} from './productSchemas'
import type { Product } from '@/features/products/types'
import type {
  ProductListParams,
  ProductListResponse,
  ProductFacetsResponse,
  CollectionCountsResponse,
  CollectionRelatedResponse,
} from './productApiTypes'

const toRequestParams = (params?: ProductListParams): Record<string, string | number | boolean | string[]> | undefined => {
  if (!params) {
    return undefined
  }

  const query: Record<string, string | number | boolean | string[]> = {}

  if (params.search !== undefined) query.search = params.search
  if (params.categoryId !== undefined) query.categoryId = params.categoryId
  if (params.collectionId !== undefined) query.collectionId = params.collectionId
  if (params.colorId !== undefined) query.colorId = params.colorId
  if (params.sizeId !== undefined) query.sizeId = params.sizeId
  if (params.availability !== undefined) query.availability = params.availability
  if (params.sale !== undefined) query.sale = params.sale
  if (params.limited !== undefined) query.limited = params.limited
  if (params.featured !== undefined) query.featured = params.featured
  if (params.newArrival !== undefined) query.newArrival = params.newArrival
  if (params.bestseller !== undefined) query.bestseller = params.bestseller
  if (params.minPrice !== undefined) query.minPrice = params.minPrice
  if (params.maxPrice !== undefined) query.maxPrice = params.maxPrice
  if (params.sort !== undefined) query.sort = params.sort
  if (params.page !== undefined) query.page = params.page
  if (params.pageSize !== undefined) query.pageSize = params.pageSize
  if (params.productIds !== undefined && params.productIds.length > 0) {
    query.productIds = params.productIds
  }

  return query
}

type GetProductsOptions = {
  signal?: AbortSignal
}

const toAppError = (error: unknown) => {
  if (isAppError(error)) {
    return error
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    const parsedApiError = productApiErrorSchema.safeParse(error.response?.data)
    const code = parsedApiError.success ? parsedApiError.data.error.code : undefined

    if (status === 404) {
      return createAppError('not-found', 'The requested product could not be found.', { status, code })
    }

    if (status && status >= 500) {
      return createAppError('server', 'The product service is temporarily unavailable.', { status, code })
    }

    if (status) {
      return createAppError('bad-request', 'The product request could not be completed.', { status, code })
    }

    return createAppError('network', 'Unable to reach the product service.', { cause: error })
  }

  return createAppError('invalid-response', 'The product service returned an invalid response.', { cause: error })
}

export const getProducts = async (
  params?: ProductListParams,
  options?: GetProductsOptions,
): Promise<ProductListResponse> => {
  try {
    const response = await api.get<unknown>(PRODUCT_API_ROUTES.products, {
      params: toRequestParams(params),
      signal: options?.signal,
    })

    const parsedResponse = productListResponseSchema.safeParse(response.data)
    if (!parsedResponse.success) {
      throw createAppError('invalid-response', 'The product list response was malformed.', { cause: parsedResponse.error })
    }

    return parsedResponse.data
  } catch (error) {
    throw toAppError(error)
  }
}

export const getProductBySlug = async (slug: string, options?: GetProductsOptions): Promise<Product> => {
  const normalizedSlug = slug.trim()

  if (normalizedSlug.length === 0) {
    throw createAppError('bad-request', 'Product slug must not be empty.')
  }

  const encodedSlug = encodeURIComponent(normalizedSlug)
  const path = PRODUCT_API_ROUTES.productDetail.replace(':slug', encodedSlug)
  try {
    const response = await api.get<unknown>(path, { signal: options?.signal })
    const parsedResponse = productDetailResponseSchema.safeParse(response.data)
    if (!parsedResponse.success) {
      throw createAppError('invalid-response', 'The product detail response was malformed.', { cause: parsedResponse.error })
    }

    return parsedResponse.data.product
  } catch (error) {
    throw toAppError(error)
  }
}

export const getProductFacets = async (options?: GetProductsOptions): Promise<ProductFacetsResponse> => {
  try {
    const response = await api.get<unknown>(PRODUCT_API_ROUTES.productFacets, {
      signal: options?.signal,
    })

    const parsedResponse = productFacetsResponseSchema.safeParse(response.data)
    if (!parsedResponse.success) {
      throw createAppError('invalid-response', 'The product facets response was malformed.', {
        cause: parsedResponse.error,
      })
    }

    return parsedResponse.data
  } catch (error) {
    throw toAppError(error)
  }
}

export const getCollectionCounts = async (options?: GetProductsOptions): Promise<CollectionCountsResponse> => {
  try {
    const response = await api.get<unknown>(PRODUCT_API_ROUTES.collectionCounts, {
      signal: options?.signal,
    })

    const parsedResponse = collectionCountsResponseSchema.safeParse(response.data)
    if (!parsedResponse.success) {
      throw createAppError('invalid-response', 'The collection counts response was malformed.', {
        cause: parsedResponse.error,
      })
    }

    return parsedResponse.data
  } catch (error) {
    throw toAppError(error)
  }
}

export const getCollectionRelated = async (
  collectionId: string,
  options?: GetProductsOptions,
): Promise<CollectionRelatedResponse> => {
  const normalizedId = collectionId.trim()

  if (normalizedId.length === 0) {
    throw createAppError('bad-request', 'Collection ID must not be empty.')
  }

  const path = PRODUCT_API_ROUTES.collectionRelated.replace(':id', normalizedId)
  try {
    const response = await api.get<unknown>(path, { signal: options?.signal })

    const parsedResponse = collectionRelatedResponseSchema.safeParse(response.data)
    if (!parsedResponse.success) {
      throw createAppError('invalid-response', 'The collection related response was malformed.', {
        cause: parsedResponse.error,
      })
    }

    return parsedResponse.data
  } catch (error) {
    throw toAppError(error)
  }
}
