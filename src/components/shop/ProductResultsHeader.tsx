import { SlidersHorizontal } from 'lucide-react'
import { useTranslation } from '@/i18n'

type ProductResultsHeaderProps = {
  resultCount: number
  onOpenMobileFilters: () => void
}

export function ProductResultsHeader({ resultCount, onOpenMobileFilters }: ProductResultsHeaderProps) {
  const { t, formatNumber, isRtl } = useTranslation()

  return (
    <div className="rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/90 p-4">
      <div className={`flex flex-wrap items-center justify-between gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <p className="text-sm text-[color:var(--color-text-secondary)]">
          {t('shop.productsFound', { count: formatNumber(resultCount) })}
        </p>

        <button
          type="button"
          onClick={onOpenMobileFilters}
          className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] lg:hidden"
          aria-label={t('shop.mobileFilters')}
        >
          <SlidersHorizontal size={14} />
          {t('shop.mobileFilters')}
        </button>
      </div>
    </div>
  )
}
