import { ProductsGrid } from '@/components/products/ProductsGrid'
import type { Product } from '@/features/products/types'
import { useTranslation } from '@/i18n'

type CollectionProductGridProps = {
  products: Product[]
}

export function CollectionProductGrid({ products }: CollectionProductGridProps) {
  const { t, isRtl } = useTranslation()

  if (products.length === 0) {
    return (
      <div className={`rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-8 ${isRtl ? 'text-right' : 'text-center'}`}>
        <h2 className="text-xl font-semibold text-[color:var(--color-text-primary)]">{t('collections.emptyTitle')}</h2>
        <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">{t('collections.emptyDescription')}</p>
      </div>
    )
  }

  return <ProductsGrid products={products} />
}
