import { productCategories } from '@/data/categories'
import { productCollections } from '@/data/collections'
import type { AvailableFilterOptions, BadgeFilter, ProductFilters } from '@/features/products/filterTypes'
import { getLocalizedText } from '@/features/products/productUtils'
import { useTranslation } from '@/i18n'

type ShopFiltersProps = {
  filters: ProductFilters
  options: AvailableFilterOptions
  onChange: <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => void
  onClearAll: () => void
  compact?: boolean
}

export function ShopFilters({ filters, options, onChange, onClearAll, compact = false }: ShopFiltersProps) {
  const { t, locale, isRtl, formatPrice } = useTranslation()

  const badgeLabels: Record<BadgeFilter, string> = {
    new: t('product.new'),
    sale: t('product.sale'),
    limited: t('product.limited'),
    featured: t('product.featured'),
    bestseller: t('product.bestSeller'),
  }

  return (
    <aside className={`max-w-full overflow-hidden ${compact ? 'space-y-4' : 'space-y-5'}`} aria-label={t('shop.filters')}>
      <div className={`flex items-center justify-between gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <h2 className="text-base font-semibold text-[color:var(--color-text-primary)]">{t('shop.filters')}</h2>
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs font-semibold text-[color:var(--color-primary)] transition hover:opacity-80"
        >
          {t('shop.clearAll')}
        </button>
      </div>

      <section className={compact ? 'space-y-1.5' : 'space-y-2'}>
        <h3 className="text-xs uppercase tracking-[0.12em] text-[color:var(--color-text-secondary)]">{t('shop.categories')}</h3>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onChange('category', undefined)}
            className={`rounded-full border px-3 py-1.5 text-xs transition ${
              !filters.category
                ? 'border-[color:var(--color-primary)] text-[color:var(--color-primary)]'
                : 'border-[color:var(--color-border)] text-[color:var(--color-text-secondary)]'
            }`}
          >
            {t('shop.allProducts')}
          </button>
          {productCategories
            .filter((category) => options.categoryIds.includes(category.id))
            .map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => onChange('category', category.id)}
                className={`rounded-full border px-3 py-1.5 text-xs transition ${
                  filters.category === category.id
                    ? 'border-[color:var(--color-primary)] text-[color:var(--color-primary)]'
                    : 'border-[color:var(--color-border)] text-[color:var(--color-text-secondary)]'
                }`}
              >
                {getLocalizedText(category.name, locale)}
              </button>
            ))}
        </div>
      </section>

      <section className={compact ? 'space-y-1.5' : 'space-y-2'}>
        <h3 className="text-xs uppercase tracking-[0.12em] text-[color:var(--color-text-secondary)]">{t('shop.collections')}</h3>
        <div className="flex flex-wrap gap-2">
          {productCollections
            .filter((collection) => options.collectionIds.includes(collection.id))
            .map((collection) => (
              <button
                key={collection.id}
                type="button"
                onClick={() => onChange('collection', filters.collection === collection.id ? undefined : collection.id)}
                className={`rounded-full border px-3 py-1.5 text-xs transition ${
                  filters.collection === collection.id
                    ? 'border-[color:var(--color-primary)] text-[color:var(--color-primary)]'
                    : 'border-[color:var(--color-border)] text-[color:var(--color-text-secondary)]'
                }`}
              >
                {getLocalizedText(collection.name, locale)}
              </button>
            ))}
        </div>
      </section>

      <section className={compact ? 'space-y-1.5' : 'space-y-2'}>
        <h3 className="text-xs uppercase tracking-[0.12em] text-[color:var(--color-text-secondary)]">{t('shop.colors')}</h3>
        <div className="flex flex-wrap gap-2">
          {options.colors.map((color) => (
            <button
              key={color.id}
              type="button"
              onClick={() => onChange('color', filters.color === color.id ? undefined : color.id)}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition ${
                filters.color === color.id
                  ? 'border-[color:var(--color-primary)] text-[color:var(--color-primary)]'
                  : 'border-[color:var(--color-border)] text-[color:var(--color-text-secondary)]'
              } ${isRtl ? 'flex-row-reverse' : ''}`}
              aria-label={getLocalizedText(color.name, locale)}
            >
              <span className="h-3 w-3 rounded-full border border-black/10" style={{ backgroundColor: color.hex }} />
              <span>{getLocalizedText(color.name, locale)}</span>
            </button>
          ))}
        </div>
      </section>

      <section className={compact ? 'space-y-1.5' : 'space-y-2'}>
        <h3 className="text-xs uppercase tracking-[0.12em] text-[color:var(--color-text-secondary)]">{t('shop.sizes')}</h3>
        <div className="flex flex-wrap gap-2">
          {options.sizes.map((size) => (
            <button
              key={size.id}
              type="button"
              onClick={() => onChange('size', filters.size === size.id ? undefined : size.id)}
              className={`rounded-full border px-3 py-1.5 text-xs transition ${
                filters.size === size.id
                  ? 'border-[color:var(--color-primary)] text-[color:var(--color-primary)]'
                  : 'border-[color:var(--color-border)] text-[color:var(--color-text-secondary)]'
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>
      </section>

      <section className={compact ? 'space-y-1.5' : 'space-y-2'}>
        <h3 className="text-xs uppercase tracking-[0.12em] text-[color:var(--color-text-secondary)]">{t('shop.priceRange')}</h3>
        <div className={`grid grid-cols-2 gap-2 ${compact ? '' : ''}`}>
          <label className="space-y-1">
            <span className="text-xs text-[color:var(--color-text-secondary)]">{t('shop.minPrice')}</span>
            <input
              type="number"
              inputMode="numeric"
              min={options.priceRange.min}
              max={options.priceRange.max}
              value={filters.minPrice ?? ''}
              onChange={(event) => {
                const raw = event.target.value
                onChange('minPrice', raw ? Number(raw) : undefined)
              }}
              placeholder={String(options.priceRange.min)}
              className="w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] px-3 py-2 text-sm outline-none transition focus:border-[color:var(--color-primary)]"
              aria-label={t('shop.minPrice')}
            />
            <span className="text-[11px] text-[color:var(--color-text-muted)]">{formatPrice(options.priceRange.min)}</span>
          </label>
          <label className="space-y-1">
            <span className="text-xs text-[color:var(--color-text-secondary)]">{t('shop.maxPrice')}</span>
            <input
              type="number"
              inputMode="numeric"
              min={options.priceRange.min}
              max={options.priceRange.max}
              value={filters.maxPrice ?? ''}
              onChange={(event) => {
                const raw = event.target.value
                onChange('maxPrice', raw ? Number(raw) : undefined)
              }}
              placeholder={String(options.priceRange.max)}
              className="w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] px-3 py-2 text-sm outline-none transition focus:border-[color:var(--color-primary)]"
              aria-label={t('shop.maxPrice')}
            />
            <span className="text-[11px] text-[color:var(--color-text-muted)]">{formatPrice(options.priceRange.max)}</span>
          </label>
        </div>
      </section>

      <section className={compact ? 'space-y-1.5' : 'space-y-2'}>
        <h3 className="text-xs uppercase tracking-[0.12em] text-[color:var(--color-text-secondary)]">{t('shop.availability')}</h3>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onChange('availability', 'all')}
            className={`rounded-full border px-3 py-1.5 text-xs transition ${
              (filters.availability ?? 'all') === 'all'
                ? 'border-[color:var(--color-primary)] text-[color:var(--color-primary)]'
                : 'border-[color:var(--color-border)] text-[color:var(--color-text-secondary)]'
            }`}
          >
            {t('shop.allProducts')}
          </button>
          <button
            type="button"
            onClick={() => onChange('availability', 'in-stock')}
            className={`rounded-full border px-3 py-1.5 text-xs transition ${
              filters.availability === 'in-stock'
                ? 'border-[color:var(--color-primary)] text-[color:var(--color-primary)]'
                : 'border-[color:var(--color-border)] text-[color:var(--color-text-secondary)]'
            }`}
          >
            {t('shop.inStock')}
          </button>
          <button
            type="button"
            onClick={() => onChange('availability', 'out-of-stock')}
            className={`rounded-full border px-3 py-1.5 text-xs transition ${
              filters.availability === 'out-of-stock'
                ? 'border-[color:var(--color-primary)] text-[color:var(--color-primary)]'
                : 'border-[color:var(--color-border)] text-[color:var(--color-text-secondary)]'
            }`}
          >
            {t('shop.outOfStock')}
          </button>
          <button
            type="button"
            onClick={() => onChange('availability', 'low-stock')}
            className={`rounded-full border px-3 py-1.5 text-xs transition ${
              filters.availability === 'low-stock'
                ? 'border-[color:var(--color-primary)] text-[color:var(--color-primary)]'
                : 'border-[color:var(--color-border)] text-[color:var(--color-text-secondary)]'
            }`}
          >
            {t('shop.lowStock')}
          </button>
        </div>
      </section>

      <section className={compact ? 'space-y-1.5' : 'space-y-2'}>
        <h3 className="text-xs uppercase tracking-[0.12em] text-[color:var(--color-text-secondary)]">{t('shop.badges')}</h3>
        <div className="flex flex-wrap gap-2">
          {options.badges.map((badge) => (
            <button
              key={badge}
              type="button"
              onClick={() => onChange('badge', filters.badge === badge ? undefined : badge)}
              className={`rounded-full border px-3 py-1.5 text-xs transition ${
                filters.badge === badge
                  ? 'border-[color:var(--color-primary)] text-[color:var(--color-primary)]'
                  : 'border-[color:var(--color-border)] text-[color:var(--color-text-secondary)]'
              }`}
            >
              {badgeLabels[badge]}
            </button>
          ))}
        </div>
      </section>
    </aside>
  )
}
