import { useMemo, useState } from 'react'
import { Container } from '@/components/layout/Container'
import { LoadingState } from '@/components/common/LoadingState'
import { FilterChips } from '@/components/products/FilterChips'
import { ProductsCarousel } from '@/components/products/ProductsCarousel'
import { ProductsGrid } from '@/components/products/ProductsGrid'
import { SectionHeader } from '@/components/products/SectionHeader'
import { useProductsQuery } from '@/features/products/queries/useProductsQuery'
import { useTranslation } from '@/i18n'
import type { Product } from '@/features/products/types'

type FeaturedProductsSectionProps = {
  products?: Product[]
  labelKey?: string
  titleKey?: string
  descriptionKey?: string
  showFilters?: boolean
}

export function FeaturedProductsSection({
  products,
  labelKey = 'featured.exhibition',
  titleKey = 'featured.title',
  descriptionKey = 'featured.description',
  showFilters = true,
}: FeaturedProductsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string | 'all'>('all')
  const productQuery = useProductsQuery({
    featured: true,
    ...(showFilters && activeCategory !== 'all' ? { categoryId: activeCategory } : {}),
    pageSize: 12,
  })
  
  // Use provided products or fetched products
  const sourceProducts = useMemo(() => {
    if (products) return products
    return productQuery.data?.items ?? []
  }, [products, productQuery.data?.items])

  const { t } = useTranslation()

  if (!products && productQuery.isPending && !productQuery.data) {
    return (
      <Container>
        <LoadingState label={t('shop.loadingProducts')} />
      </Container>
    )
  }

  return (
    <Container>
      <div className="scroll-mt-[calc(var(--header-height)+1.5rem)] space-y-8 md:space-y-10">
        <SectionHeader
          label={t(labelKey)}
          title={t(titleKey)}
          description={t(descriptionKey)}
        >
          <div className="flex flex-col gap-4">
            {showFilters ? <FilterChips activeCategory={activeCategory} onChange={setActiveCategory} /> : null}
            <p className="text-sm text-[color:var(--color-text-secondary)]">{t('featured.showing', { count: sourceProducts.length, total: sourceProducts.length })}</p>
          </div>
        </SectionHeader>

        <div className="hidden xl:block">
          {sourceProducts.length > 0 ? (
            <ProductsGrid products={sourceProducts} />
          ) : (
            <div className="rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/90 p-8 text-center">
              <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)]">{t('product.noProductsTitle')}</h3>
              <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">{t('product.noProductsDescription')}</p>
            </div>
          )}
        </div>

        <div className="block xl:hidden">
          {sourceProducts.length > 0 ? (
            <ProductsCarousel products={sourceProducts} />
          ) : (
            <div className="rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/90 p-8 text-center">
              <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)]">{t('product.noProductsTitle')}</h3>
              <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">{t('product.noProductsDescription')}</p>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}
