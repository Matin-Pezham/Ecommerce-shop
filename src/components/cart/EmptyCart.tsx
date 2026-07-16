import { ArrowRight, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from '@/i18n'

export function EmptyCart() {
  const { t, isRtl } = useTranslation()

  return (
    <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/90 p-10 text-center shadow-[var(--shadow-soft)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--color-surface)] text-[color:var(--color-primary)]">
        <ShoppingBag size={24} />
      </div>
      <h3 className="mt-6 text-2xl font-semibold text-[color:var(--color-text-primary)]">{t('cart.emptyTitle')}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm text-[color:var(--color-text-secondary)]">
        {t('cart.emptyDescription')}
      </p>
      <Link
        to="/home"
        className={`mt-8 inline-flex items-center gap-2 rounded-full btn-cta px-5 py-3 text-sm font-semibold shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 ${isRtl ? 'flex-row-reverse' : ''}`}
      >
        {t('common.continueShopping')} <ArrowRight size={16} />
      </Link>
    </div>
  )
}
