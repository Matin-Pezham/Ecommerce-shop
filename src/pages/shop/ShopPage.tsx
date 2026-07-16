import { useEffect, useState } from 'react'
import { ActiveFilters } from '@/components/shop/ActiveFilters'
import { MobileFiltersDrawer } from '@/components/shop/MobileFiltersDrawer'
import { ProductResultsHeader } from '@/components/shop/ProductResultsHeader'
import { ShopFilters } from '@/components/shop/ShopFilters'
import { ShopSearch } from '@/components/shop/ShopSearch'
import { ShopSort } from '@/components/shop/ShopSort'
import { Container } from '@/components/layout/Container'
import { ProductsGrid } from '@/components/products/ProductsGrid'
import { productsCatalog } from '@/data/products'
import { useProductFilters } from '@/features/products/useProductFilters'
import { useTranslation } from '@/i18n'

export function ShopPage() {
  const { t, isRtl, formatNumber } = useTranslation()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const {
    filters,
    filteredProducts,
    availableOptions,
    activeChips,
    hasFilters,
    setFilter,
    removeFilter,
    resetFilters,
  } = useProductFilters(productsCatalog)

  useEffect(() => {
    if (!mobileFiltersOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileFiltersOpen])

  return (
    <Container className="py-8 sm:py-10">
      <section className="mb-6 rounded-[1.75rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-5 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-text-secondary)]">{t('shop.catalogLabel')}</p>
        <h1 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.05] text-[color:var(--color-text-primary)]">{t('shop.title')}</h1>
        <p className={`mt-3 max-w-3xl text-sm leading-relaxed text-[color:var(--color-text-secondary)] sm:text-base ${isRtl ? 'text-right' : ''}`}>
          {t('shop.subtitle')}
        </p>
        <p className="mt-4 text-sm text-[color:var(--color-text-secondary)]">{t('shop.productsFound', { count: formatNumber(filteredProducts.length) })}</p>
      </section>

      <section className="grid gap-6 overflow-x-clip lg:grid-cols-[clamp(16rem,22vw,19rem)_minmax(0,1fr)]">
        <div className={isRtl ? 'lg:order-2' : 'lg:order-1'}>
          <div className={`hidden lg:sticky lg:top-[calc(var(--header-height)+1.1rem)] lg:block rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 ${isRtl ? 'p-3.5' : 'p-4'}`}>
            <ShopFilters filters={filters} options={availableOptions} onChange={setFilter} onClearAll={resetFilters} compact={isRtl} />
          </div>
        </div>

        <div className={`space-y-4 ${isRtl ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <ShopSearch value={filters.search ?? ''} onChange={(value) => setFilter('search', value || undefined)} />
            <div className={isRtl ? 'justify-self-start' : 'justify-self-end'}>
              <ShopSort value={filters.sort ?? 'featured'} onChange={(sort) => setFilter('sort', sort)} />
            </div>
          </div>

          <ProductResultsHeader resultCount={filteredProducts.length} onOpenMobileFilters={() => setMobileFiltersOpen(true)} />

          <ActiveFilters chips={activeChips} onRemove={removeFilter} onClearAll={resetFilters} />

          {filteredProducts.length > 0 ? (
            <ProductsGrid products={filteredProducts} />
          ) : (
            <div className={`rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-8 ${isRtl ? 'text-right' : 'text-center'}`}>
              <h2 className="text-xl font-semibold text-[color:var(--color-text-primary)]">{t('shop.noResultsTitle')}</h2>
              <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">{t('shop.noResultsDescription')}</p>
              {hasFilters ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 rounded-full btn-cta px-5 py-2 text-sm font-semibold"
                >
                  {t('shop.resetFilters')}
                </button>
              ) : null}
            </div>
          )}
        </div>
      </section>

      <MobileFiltersDrawer
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        onApply={() => setMobileFiltersOpen(false)}
        onClear={() => {
          resetFilters()
          setMobileFiltersOpen(false)
        }}
      >
        <ShopFilters
          filters={filters}
          options={availableOptions}
          onChange={setFilter}
          onClearAll={resetFilters}
          compact
        />
      </MobileFiltersDrawer>
    </Container>
  )
}
