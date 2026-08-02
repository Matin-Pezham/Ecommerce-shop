import axios from 'axios'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getProducts } from '@/features/products/api/productApi'
import type { ProductListParams } from '@/features/products/api/productApiTypes'
import { isAppError } from '@/services/appError'
import { productQueryKeys } from './productQueryKeys'

export const useProductsQuery = (params: ProductListParams = {}) => {
  return useQuery({
    queryKey: productQueryKeys.list(params),
    queryFn: ({ signal }) => getProducts(params, { signal }),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
    retry: (failureCount, error) => {
      if (isAppError(error)) {
        return false
      }

      if (!axios.isAxiosError(error)) {
        return failureCount < 2
      }

      if (error.code === 'ERR_CANCELED') {
        return false
      }

      const status = error.response?.status
      if (status === 400 || status === 404) {
        return false
      }

      if (status === undefined) {
        return failureCount < 2
      }

      return false
    },
  })
}
