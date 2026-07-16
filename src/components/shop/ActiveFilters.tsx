import { X } from 'lucide-react'
import type { ActiveFilterChip, ActiveFilterKey } from '@/features/products/filterTypes'
import { useTranslation } from '@/i18n'

type ActiveFiltersProps = {
  chips: ActiveFilterChip[]
  onRemove: (key: ActiveFilterKey) => void
  onClearAll: () => void
}

export function ActiveFilters({ chips, onRemove, onClearAll }: ActiveFiltersProps) {
  const { t, isRtl } = useTranslation()

  if (chips.length === 0) return null

  return (
    <section className="space-y-3" aria-label={t('shop.activeFilters')}>
      <div className={`flex items-center justify-between gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <p className="text-sm font-semibold text-[color:var(--color-text-primary)]">{t('shop.activeFilters')}</p>
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs font-semibold text-[color:var(--color-primary)] transition hover:opacity-80"
        >
          {t('shop.clearAll')}
        </button>
      </div>

      <div className={`flex flex-wrap gap-2 ${isRtl ? 'justify-end' : ''}`}>
        {chips.map((chip) => (
          <button
            key={`${chip.key}-${chip.value}`}
            type="button"
            onClick={() => onRemove(chip.key)}
            className={`inline-flex items-center gap-1 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-1.5 text-xs font-medium text-[color:var(--color-text-primary)] transition hover:border-[color:var(--color-primary)] ${isRtl ? 'flex-row-reverse' : ''}`}
            aria-label={`${chip.label} ${t('common.remove')}`}
          >
            <span>{chip.label}</span>
            <X size={12} aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  )
}
