import type { Product } from '@/features/products/types'
import { getLocalizedText } from '@/features/products/productUtils'
import { useTranslation } from '@/i18n'

type ProductSpecificationsProps = {
  product: Product
}

export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  const { t, locale, isRtl } = useTranslation()

  if (product.specifications.length === 0) return null

  return (
    <section className="rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/90 p-5">
      <h3 className={`text-lg font-semibold text-[color:var(--color-text-primary)] ${isRtl ? 'text-right' : ''}`}>
        {t('productDetail.specifications')}
      </h3>
      <div className="mt-4 space-y-3">
        {product.specifications.map((spec) => (
          <div key={spec.id} className={`flex items-start justify-between gap-4 rounded-[1rem] bg-[color:var(--color-surface)]/80 px-4 py-3 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
            <span className="text-sm text-[color:var(--color-text-secondary)]">{getLocalizedText(spec.label, locale)}</span>
            <span className="text-sm font-medium text-[color:var(--color-text-primary)]">{getLocalizedText(spec.value, locale)}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
