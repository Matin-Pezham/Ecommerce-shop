import { useMemo, useState } from 'react'
import { Container } from '@/components/layout/Container'
import { FilterChips } from '@/components/products/FilterChips'
import { mockProducts } from '@/components/products/mockProducts'
import { ProductsCarousel } from '@/components/products/ProductsCarousel'
import { ProductsGrid } from '@/components/products/ProductsGrid'
import { SectionHeader } from '@/components/products/SectionHeader'
import { useTranslation } from '@/i18n'
import type { ProductCategory } from '@/components/products/productTypes'

export function FeaturedProductsSection() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'All'>('All')

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') {
      return mockProducts
    }

    return mockProducts.filter((product) => product.category === activeCategory)
  }, [activeCategory])

  const { t } = useTranslation()

  return (
    <Container>
      <div className="scroll-mt-[calc(var(--header-height)+1.5rem)] space-y-8 md:space-y-10">
        <SectionHeader
          label={t('featured.exhibition')}
          title={t('featured.title')}
          description={t('featured.description')}
        >
          <div className="flex flex-col gap-4">
            <FilterChips activeCategory={activeCategory} onChange={setActiveCategory} />
            <p className="text-sm text-[color:var(--color-text-secondary)]">{t('featured.showing', { count: filteredProducts.length, total: mockProducts.length })}</p>
          </div>
        </SectionHeader>

        <div className="hidden xl:block">
          <ProductsGrid products={filteredProducts} />
        </div>

        <div className="block xl:hidden">
          <ProductsCarousel products={filteredProducts} />
        </div>
      </div>
    </Container>
  )
}
