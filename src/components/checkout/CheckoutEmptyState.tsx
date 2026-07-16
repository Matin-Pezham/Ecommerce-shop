import { Link } from 'react-router-dom'
import { useTranslation } from '@/i18n'

export function CheckoutEmptyState() {
  const { t, isRtl } = useTranslation()

  return (
    <div className="mx-auto max-w-xl rounded-[1.75rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-8 text-center shadow-[var(--shadow-soft)]">
      <h1 className="text-2xl font-semibold text-[color:var(--color-text-primary)]">{t('checkout.emptyTitle')}</h1>
      <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">{t('checkout.emptyDescription')}</p>
      <div className={`mt-6 flex justify-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <Link to="/cart" className="rounded-full btn-cta px-4 py-2 text-sm font-semibold">
          {t('checkout.returnToCart')}
        </Link>
        <Link to="/shop" className="rounded-full border border-[color:var(--color-border)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-surface)]">
          {t('common.continueShopping')}
        </Link>
      </div>
    </div>
  )
}
