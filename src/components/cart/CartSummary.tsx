import { ArrowRight } from 'lucide-react'
import type { PriceSummary } from '@/features/cart/priceUtils'
import { useTranslation } from '@/i18n'

type CartSummaryProps = {
  summary: PriceSummary
  onCheckout: () => void
}

export function CartSummary({ summary, onCheckout }: CartSummaryProps) {
  const { t, formatPrice, isRtl } = useTranslation()

  const rows = [
    { key: 'cart.subtotal', value: formatPrice(summary.subtotal) },
    { key: 'cart.discount', value: `-${formatPrice(summary.discount)}` },
    { key: 'cart.shipping', value: summary.shipping === 0 ? t('cart.freeShipping') : formatPrice(summary.shipping) },
    { key: 'cart.tax', value: formatPrice(summary.tax) },
  ]

  return (
    <aside className="rounded-[2rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
      <div className={isRtl ? 'flex items-center justify-between flex-row-reverse' : 'flex items-center justify-between'}>
        <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)]">{t('cart.priceSummary')}</h3>
        <span className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.26em] text-[color:var(--color-text-muted)]">
          {t('cart.itemsCount', { count: summary.totalQuantity })}
        </span>
      </div>

      <div className="mt-6 space-y-3 text-sm text-[color:var(--color-text-secondary)]">
        {rows.map((row) => (
          <div key={row.key} className={isRtl ? 'flex items-center justify-between flex-row-reverse' : 'flex items-center justify-between'}>
            <span>{t(row.key)}</span>
            <span className="font-medium text-[color:var(--color-text-primary)]">{row.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/70 p-4">
        <div className={isRtl ? 'flex items-center justify-between flex-row-reverse' : 'flex items-center justify-between'}>
          <span className="text-sm text-[color:var(--color-text-secondary)]">{t('cart.estimatedTotal')}</span>
          <span className="text-2xl font-semibold text-[color:var(--color-text-primary)]">{formatPrice(summary.total)}</span>
        </div>
        <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
          {t('cart.totalSaved', { amount: formatPrice(summary.totalSaved) })}
        </p>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full btn-cta px-5 py-3 text-sm font-semibold shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5"
      >
        {t('cart.checkout')} <ArrowRight size={16} />
      </button>
    </aside>
  )
}
