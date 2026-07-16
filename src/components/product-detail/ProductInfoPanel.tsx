import { Truck, ShieldCheck, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { productCollections } from '@/data/collections'
import type { Product, ProductVariant } from '@/features/products/types'
import { getLocalizedText, getProductDiscountPercentage } from '@/features/products/productUtils'
import { useTranslation } from '@/i18n'
import { PriceTag } from '@/components/products/PriceTag'
import { Rating } from '@/components/products/Rating'

type ProductInfoPanelProps = {
  product: Product
  selectedVariant?: ProductVariant
}

export function ProductInfoPanel({ product, selectedVariant }: ProductInfoPanelProps) {
  const { t, locale, isRtl, formatPrice } = useTranslation()

  const title = getLocalizedText(product.title, locale)
  const subtitle = product.subtitle ? getLocalizedText(product.subtitle, locale) : ''
  const description = getLocalizedText(product.description, locale)
  const discount = getProductDiscountPercentage(product)
  const primaryCollection = product.collectionIds.length > 0 ? productCollections.find((item) => item.id === product.collectionIds[0]) : undefined

  return (
    <section className="space-y-5">
      <div className={`space-y-3 ${isRtl ? 'text-right' : ''}`}>
        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-text-muted)]">{t('productDetail.premiumSelection')}</p>
        <h1 className="font-display text-3xl text-[color:var(--color-text-primary)] sm:text-4xl">{title}</h1>
        <p className="text-sm text-[color:var(--color-text-secondary)] sm:text-base">{subtitle}</p>
      </div>

      <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <Rating value={product.rating} reviews={product.reviewsCount} />
        {discount ? (
          <span className="rounded-full bg-[color:var(--color-accent)]/15 px-3 py-1 text-xs font-semibold text-[color:var(--color-accent)]">
            {t('productDetail.discountLabel', { percentage: discount.toString() })}
          </span>
        ) : null}
      </div>

      <div>
        <PriceTag
          price={formatPrice(product.price, product.currency)}
        />
      </div>

      <p className={`text-sm leading-relaxed text-[color:var(--color-text-secondary)] ${isRtl ? 'text-right' : ''}`}>{description}</p>

      {primaryCollection ? (
        <div className={`${isRtl ? 'text-right' : ''}`}>
          <p className="mb-1 text-xs uppercase tracking-[0.12em] text-[color:var(--color-text-muted)]">{t('product.collection')}</p>
          <Link to={`/collections/${primaryCollection.slug}`} className="text-sm font-semibold text-[color:var(--color-primary)] transition hover:opacity-80">
            {getLocalizedText(primaryCollection.name, locale)}
          </Link>
        </div>
      ) : null}

      {selectedVariant ? (
        <div className={`rounded-[1rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/80 px-4 py-3 text-sm ${isRtl ? 'text-right' : ''}`}>
          {t('productDetail.selectedVariant', { variant: selectedVariant.sku })}
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-3">
        <div className={`rounded-[1rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-3 ${isRtl ? 'text-right' : ''}`}>
          <div className={`mb-2 flex items-center gap-2 text-[color:var(--color-primary)] ${isRtl ? 'flex-row-reverse' : ''}`}>
            <Truck size={16} />
            <p className="text-xs font-semibold uppercase tracking-[0.12em]">{t('productDetail.shipping')}</p>
          </div>
          <p className="text-sm text-[color:var(--color-text-secondary)]">{t('productDetail.shippingDescription')}</p>
        </div>

        <div className={`rounded-[1rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-3 ${isRtl ? 'text-right' : ''}`}>
          <div className={`mb-2 flex items-center gap-2 text-[color:var(--color-primary)] ${isRtl ? 'flex-row-reverse' : ''}`}>
            <ShieldCheck size={16} />
            <p className="text-xs font-semibold uppercase tracking-[0.12em]">{t('productDetail.guarantee')}</p>
          </div>
          <p className="text-sm text-[color:var(--color-text-secondary)]">{t('productDetail.guaranteeDescription')}</p>
        </div>

        <div className={`rounded-[1rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-3 ${isRtl ? 'text-right' : ''}`}>
          <div className={`mb-2 flex items-center gap-2 text-[color:var(--color-primary)] ${isRtl ? 'flex-row-reverse' : ''}`}>
            <RotateCcw size={16} />
            <p className="text-xs font-semibold uppercase tracking-[0.12em]">{t('productDetail.returns')}</p>
          </div>
          <p className="text-sm text-[color:var(--color-text-secondary)]">{t('productDetail.returnsDescription')}</p>
        </div>
      </div>
    </section>
  )
}
