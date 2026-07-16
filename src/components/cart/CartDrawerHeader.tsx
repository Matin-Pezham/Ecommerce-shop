import { CheckCircle2, X } from 'lucide-react'
import { useTranslation } from '@/i18n'

type CartDrawerHeaderProps = {
  showAddedFeedback: boolean
  onClose: () => void
}

export function CartDrawerHeader({ showAddedFeedback, onClose }: CartDrawerHeaderProps) {
  const { t, isRtl } = useTranslation()

  return (
    <header className="border-b border-[color:var(--color-border)] p-5">
      <div className={`flex items-start justify-between gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <div className={isRtl ? 'text-right' : ''}>
          <h2 id="cart-drawer-title" className="text-xl font-semibold text-[color:var(--color-text-primary)]">
            {t('cart.drawerTitle')}
          </h2>
          <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">{t('cart.drawerSubtitle')}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t('cart.closeCart')}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-text-secondary)] transition hover:bg-[color:var(--color-surface)]"
        >
          <X size={16} />
        </button>
      </div>

      {showAddedFeedback ? (
        <p className={`mt-3 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-success)]/10 px-3 py-1 text-xs font-semibold text-[color:var(--color-success)] ${isRtl ? 'flex-row-reverse' : ''}`}>
          <CheckCircle2 size={14} />
          {t('cart.itemAdded')}
        </p>
      ) : null}
    </header>
  )
}
