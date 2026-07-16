import { Link } from 'react-router-dom'
import type { PriceSummary } from '@/features/cart/priceUtils'
import { useTranslation } from '@/i18n'

type CartDrawerSummaryProps = {
  summary: PriceSummary
  onContinueShopping: () => void
  onCheckout: () => void
}

export function CartDrawerSummary({ summary, onContinueShopping, onCheckout }: CartDrawerSummaryProps) {
  const { t, formatPrice, isRtl } = useTranslation()

  const rows = [
    { key: 'cart.subtotal', value: formatPrice(summary.subtotal) },
    { key: 'cart.discount', value: `-${formatPrice(summary.discount)}` },
    { key: 'cart.shipping', value: summary.shipping === 0 ? t('cart.freeShipping') : formatPrice(summary.shipping) },
    { key: 'cart.tax', value: formatPrice(summary.tax) },
  ]

  return (
    <footer className="border-t border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-4">
      <div className="space-y-2 text-sm text-[color:var(--color-text-secondary)]">
        {rows.map((row) => (
          <div key={row.key} className={`flex items-center justify-between gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <span>{t(row.key)}</span>
            <span className="font-medium text-[color:var(--color-text-primary)]">{row.value}</span>
          </div>
        ))}
      </div>

      <p className={`mt-2 text-xs text-[color:var(--color-text-muted)] ${isRtl ? 'text-right' : ''}`}>
        {t('cart.shippingCalculatedAtCheckout')}
      </p>

      <div className={`mt-3 flex items-center justify-between gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <span className="text-sm font-semibold text-[color:var(--color-text-primary)]">{t('cart.total')}</span>
        <span className="text-lg font-semibold text-[color:var(--color-text-primary)]">{formatPrice(summary.total)}</span>
      </div>

      <p className={`mt-1 text-xs text-[color:var(--color-text-secondary)] ${isRtl ? 'text-right' : ''}`}>
        {t('cart.totalSaved', { amount: formatPrice(summary.totalSaved) })}
      </p>

      <div className={`mt-4 grid grid-cols-2 gap-2 ${isRtl ? '[direction:rtl]' : ''}`}>
        <button
          type="button"
          onClick={onContinueShopping}
          className="rounded-full border border-[color:var(--color-border)] px-3 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-surface)]"
        >
          {t('cart.continueShopping')}
        </button>
        <Link
          to="/cart"
          onClick={onContinueShopping}
          className="rounded-full btn-cta px-3 py-2 text-center text-sm font-semibold"
        >
          {t('cart.viewCart')}
        </Link>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        className="mt-2 w-full rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-2 text-sm font-semibold text-[color:var(--color-text-secondary)]"
        aria-label={t('cart.goToCheckout')}
      >
        {t('cart.checkout')}
      </button>
    </footer>
  )
}
