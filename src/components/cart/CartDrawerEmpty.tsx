import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from '@/i18n'

type CartDrawerEmptyProps = {
  onContinueShopping: () => void
}

export function CartDrawerEmpty({ onContinueShopping }: CartDrawerEmptyProps) {
  const { t, isRtl } = useTranslation()

  return (
    <div className="flex h-full flex-col items-center justify-center px-6 py-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--color-surface)] text-[color:var(--color-primary)]">
        <ShoppingBag size={22} />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-[color:var(--color-text-primary)]">{t('cart.emptyDrawerTitle')}</h3>
      <p className="mt-2 max-w-sm text-sm text-[color:var(--color-text-secondary)]">{t('cart.emptyDrawerDescription')}</p>
      <div className={`mt-6 flex flex-wrap justify-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <button type="button" onClick={onContinueShopping} className="rounded-full border border-[color:var(--color-border)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-surface)]">
          {t('cart.continueShopping')}
        </button>
        <Link to="/shop" onClick={onContinueShopping} className="rounded-full btn-cta px-4 py-2 text-sm font-semibold">
          {t('common.shopNow')}
        </Link>
      </div>
    </div>
  )
}
