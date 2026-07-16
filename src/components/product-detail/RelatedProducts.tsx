import { FeaturedProductsSection } from '@/components/products/FeaturedProductsSection'
import type { Product } from '@/features/products/types'

type RelatedProductsProps = {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null

  return (
    <FeaturedProductsSection
      products={products}
      showFilters={false}
      titleKey="productDetail.relatedTitle"
      descriptionKey="productDetail.relatedSubtitle"
    />
  )
}
