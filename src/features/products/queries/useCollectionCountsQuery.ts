import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { getCollectionCounts } from '@/features/products/api/productApi'
import { isAppError } from '@/services/appError'
import { collectionQueryKeys } from './productQueryKeys'

export const useCollectionCountsQuery = () => {
  return useQuery({
    queryKey: collectionQueryKeys.counts(),
    queryFn: ({ signal }) => getCollectionCounts({ signal }),
    staleTime: 60_000, // 1 minute
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
