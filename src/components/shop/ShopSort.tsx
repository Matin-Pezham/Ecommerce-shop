import type { ProductSort } from '@/features/products/filterTypes'
import { useTranslation } from '@/i18n'

type ShopSortProps = {
  value: ProductSort
  onChange: (sort: ProductSort) => void
}

const isProductSort = (value: string): value is ProductSort => (
  value === 'featured'
  || value === 'newest'
  || value === 'price-asc'
  || value === 'price-desc'
  || value === 'rating-desc'
  || value === 'bestseller'
)

export function ShopSort({ value, onChange }: ShopSortProps) {
  const { t } = useTranslation()

  return (
    <label className="flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)]">
      <span className="whitespace-nowrap font-medium">{t('shop.sortBy')}</span>
      <select
        value={value}
        onChange={(event) => {
          if (isProductSort(event.target.value)) {
            onChange(event.target.value)
          }
        }}
        aria-label={t('shop.sortBy')}
        className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-card)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] outline-none transition focus:border-[color:var(--color-primary)]"
      >
        <option value="featured">{t('shop.featured')}</option>
        <option value="newest">{t('shop.newest')}</option>
        <option value="price-asc">{t('shop.priceLowToHigh')}</option>
        <option value="price-desc">{t('shop.priceHighToLow')}</option>
        <option value="rating-desc">{t('shop.bestRated')}</option>
        <option value="bestseller">{t('shop.bestSelling')}</option>
      </select>
    </label>
  )
}
