import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { useTranslation } from '@/i18n'

type MobileFiltersDrawerProps = {
  open: boolean
  onClose: () => void
  onApply: () => void
  onClear: () => void
  children: ReactNode
}

export function MobileFiltersDrawer({ open, onClose, onApply, onClear, children }: MobileFiltersDrawerProps) {
  const { t, isRtl } = useTranslation()

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[90] lg:hidden" role="dialog" aria-modal="true" aria-label={t('shop.mobileFilters')}>
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"
        aria-label={t('shop.closeFilters')}
      />
      <div
        className={`absolute top-0 h-full w-[min(90vw,360px)] bg-[color:var(--color-card)] p-5 shadow-2xl ${
          isRtl ? 'left-0' : 'right-0'
        }`}
      >
        <div className={`mb-4 flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
          <h2 className="text-base font-semibold text-[color:var(--color-text-primary)]">{t('shop.mobileFilters')}</h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-border)]"
            aria-label={t('shop.closeFilters')}
          >
            <X size={16} />
          </button>
        </div>

        <div className="h-[calc(100%-6.5rem)] overflow-y-auto pr-1">{children}</div>

        <div className={`mt-4 flex gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <button
            type="button"
            onClick={onClear}
            className="flex-1 rounded-full border border-[color:var(--color-border)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text-primary)]"
          >
            {t('shop.clearFilters')}
          </button>
          <button
            type="button"
            onClick={onApply}
            className="flex-1 rounded-full btn-cta px-4 py-2 text-sm font-semibold"
          >
            {t('shop.applyFilters')}
          </button>
        </div>
      </div>
    </div>
  )
}
