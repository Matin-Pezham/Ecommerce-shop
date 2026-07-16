import { Search } from 'lucide-react'
import { useTranslation } from '@/i18n'

type ShopSearchProps = {
  value: string
  onChange: (value: string) => void
}

export function ShopSearch({ value, onChange }: ShopSearchProps) {
  const { t, isRtl } = useTranslation()

  return (
    <label className="relative block w-full">
      <span className="sr-only">{t('shop.searchPlaceholder')}</span>
      <Search
        size={16}
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-[color:var(--color-text-muted)] ${
          isRtl ? 'right-4' : 'left-4'
        }`}
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t('shop.searchPlaceholder')}
        aria-label={t('shop.searchPlaceholder')}
        className={`w-full rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-card)] py-3 text-sm text-[color:var(--color-text-primary)] outline-none transition focus:border-[color:var(--color-primary)] ${
          isRtl ? 'pr-11 pl-4' : 'pl-11 pr-4'
        }`}
      />
    </label>
  )
}
