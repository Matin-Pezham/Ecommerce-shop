import { FeaturedProductsSection } from '@/components/products/FeaturedProductsSection'
import { useProductsQuery } from '@/features/products/queries/useProductsQuery'

export function NewArrivalsPage() {
  const { data } = useProductsQuery({ newArrival: true, sort: 'newest', pageSize: 12 })
  const newArrivals = data?.items ?? []

  return (
    <FeaturedProductsSection
      products={newArrivals}
      labelKey="newArrivals.catalogLabel"
      titleKey="newArrivals.catalogTitle"
      descriptionKey="newArrivals.catalogDescription"
      showFilters={false}
    />
  )
}
