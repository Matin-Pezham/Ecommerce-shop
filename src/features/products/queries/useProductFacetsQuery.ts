import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { getProductFacets } from '@/features/products/api/productApi'
import { isAppError } from '@/services/appError'
import { productQueryKeys } from './productQueryKeys'

export const useProductFacetsQuery = () => {
  return useQuery({
    queryKey: productQueryKeys.facets(),
    queryFn: ({ signal }) => getProductFacets({ signal }),
    staleTime: 5 * 60 * 1000, // 5 minutes - facets change infrequently
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
