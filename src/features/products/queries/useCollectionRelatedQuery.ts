import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { getCollectionRelated } from '@/features/products/api/productApi'
import { isAppError } from '@/services/appError'
import { collectionQueryKeys } from './productQueryKeys'

export const useCollectionRelatedQuery = (collectionId: string | undefined) => {
  return useQuery({
    queryKey: collectionQueryKeys.related(collectionId || ''),
    queryFn: ({ signal }) => {
      if (!collectionId) {
        throw new Error('Collection ID is required')
      }
      return getCollectionRelated(collectionId, { signal })
    },
    enabled: !!collectionId,
    staleTime: 2 * 60 * 1000, // 2 minutes
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
