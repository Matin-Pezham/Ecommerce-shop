import { FeaturedProductsSection } from '@/components/products/FeaturedProductsSection'
import { selectNewArrivals } from '@/features/products/productSelectors'

export function NewArrivalsPage() {
  const newArrivals = selectNewArrivals()

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
