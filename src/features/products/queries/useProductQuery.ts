import { useQuery } from '@tanstack/react-query'
import { getProductBySlug } from '@/features/products/api/productApi'
import { isAppError } from '@/services/appError'
import { productQueryKeys } from './productQueryKeys'

import axios from 'axios'

export const useProductQuery = (slug?: string) => {
  const normalizedSlug = slug?.trim() ?? ''

  return useQuery({
    queryKey: productQueryKeys.detail(normalizedSlug),
    queryFn: ({ signal }) => getProductBySlug(normalizedSlug, { signal }),
    enabled: normalizedSlug.length > 0,
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