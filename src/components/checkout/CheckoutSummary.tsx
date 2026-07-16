import type { ProductCartItem } from '@/features/cart/types'
import type { PriceSummary } from '@/features/cart/priceUtils'
import { useTranslation } from '@/i18n'

type CheckoutSummaryProps = {
  items: ProductCartItem[]
  summary: PriceSummary
}

export function CheckoutSummary({ items, summary }: CheckoutSummaryProps) {
  const { t, isRtl, formatPrice, formatNumber } = useTranslation()

  const rows = [
    { label: t('checkout.subtotal'), value: formatPrice(summary.subtotal) },
    { label: t('checkout.discount'), value: `-${formatPrice(summary.discount)}` },
    { label: t('checkout.shipping'), value: summary.shipping === 0 ? t('cart.freeShipping') : formatPrice(summary.shipping) },
    { label: t('checkout.tax'), value: formatPrice(summary.tax) },
  ]

  return (
    <aside className="rounded-[1.75rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-5 shadow-[var(--shadow-soft)]">
      <div className={`flex items-center justify-between gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <h3 className="text-lg font-semibold text-[color:var(--color-text-primary)]">{t('checkout.orderSummary')}</h3>
        <span className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-1 text-xs font-semibold text-[color:var(--color-text-secondary)]">
          {t('checkout.items')} {formatNumber(items.length)}
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm text-[color:var(--color-text-secondary)]">
        {rows.map((row) => (
          <div key={row.label} className={`flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
            <span>{row.label}</span>
            <span className="font-medium text-[color:var(--color-text-primary)]">{row.value}</span>
          </div>
        ))}
      </div>

      <div className={`mt-4 flex items-center justify-between rounded-[1rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/80 px-4 py-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <span className="text-sm font-semibold text-[color:var(--color-text-primary)]">{t('checkout.total')}</span>
        <span className="text-lg font-semibold text-[color:var(--color-text-primary)]">{formatPrice(summary.total)}</span>
      </div>
    </aside>
  )
}
