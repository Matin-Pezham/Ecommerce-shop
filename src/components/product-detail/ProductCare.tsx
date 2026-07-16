import type { Product } from '@/features/products/types'
import { getLocalizedText } from '@/features/products/productUtils'
import { useTranslation } from '@/i18n'

type ProductCareProps = {
  product: Product
}

export function ProductCare({ product }: ProductCareProps) {
  const { t, locale, isRtl } = useTranslation()

  const hasMaterial = Boolean(product.material)
  const hasCare = Boolean(product.careInstructions && product.careInstructions.length > 0)

  if (!hasMaterial && !hasCare) return null

  return (
    <section className="rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/90 p-5">
      <div className="space-y-4">
        {hasMaterial ? (
          <div>
            <h3 className={`text-sm font-semibold text-[color:var(--color-text-secondary)] ${isRtl ? 'text-right' : ''}`}>
              {t('productDetail.material')}
            </h3>
            <p className={`mt-1 text-sm text-[color:var(--color-text-primary)] ${isRtl ? 'text-right' : ''}`}>
              {getLocalizedText(product.material!, locale)}
            </p>
          </div>
        ) : null}

        {hasCare ? (
          <div>
            <h3 className={`text-sm font-semibold text-[color:var(--color-text-secondary)] ${isRtl ? 'text-right' : ''}`}>
              {t('productDetail.care')}
            </h3>
            <ul className={`mt-2 space-y-1 text-sm text-[color:var(--color-text-primary)] ${isRtl ? 'text-right' : ''}`}>
              {product.careInstructions!.map((instruction) => (
                <li key={instruction.en}>{getLocalizedText(instruction, locale)}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  )
}
