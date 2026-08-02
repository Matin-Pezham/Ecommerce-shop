import { useState } from 'react'
import axios from 'axios'
import { ActiveFilters } from '@/components/shop/ActiveFilters'
import { MobileFiltersDrawer } from '@/components/shop/MobileFiltersDrawer'
import { ProductResultsHeader } from '@/components/shop/ProductResultsHeader'
import { ShopFilters } from '@/components/shop/ShopFilters'
import { ShopSearch } from '@/components/shop/ShopSearch'
import { ShopSort } from '@/components/shop/ShopSort'
import { Container } from '@/components/layout/Container'
import { ProductsGrid } from '@/components/products/ProductsGrid'
import { useDebouncedValue } from '@/features/products/hooks/useDebouncedValue'
import { useProductsQuery } from '@/features/products/queries/useProductsQuery'
import { useProductFacetsQuery } from '@/features/products/queries/useProductFacetsQuery'
import { useProductFilters } from '@/features/products/useProductFilters'
import { mapShopFiltersToProductParams } from '@/features/products/utils/mapShopFiltersToProductParams'
import type { AvailableFilterOptions, BadgeFilter } from '@/features/products/filterTypes'
import { useTranslation } from '@/i18n'
import { useBodyScrollLock } from '@/components/layout/useBodyScrollLock'
import { isAppError } from '@/services/appError'

const DEFAULT_PAGE_SIZE = 12
const SEARCH_DEBOUNCE_MS = 300

const getVisiblePages = (currentPage: number, totalPages: number): number[] => {
  if (totalPages <= 0) {
    return []
  }

  const start = Math.max(1, currentPage - 2)
  const end = Math.min(totalPages, start + 4)
  const adjustedStart = Math.max(1, end - 4)

  const pages: number[] = []
  for (let page = adjustedStart; page <= end; page += 1) {
    pages.push(page)
  }

  return pages
}

const isCancellationError = (error: unknown): boolean => {
  return axios.isAxiosError(error) && error.code === 'ERR_CANCELED'
}

const getErrorMessage = (fallbackMessage: string, error: unknown): string => {
  if (isAppError(error)) {
    return error.kind === 'not-found' ? fallbackMessage : error.message
  }

  return fallbackMessage
}

export function ShopPage() {
  const { t, isRtl, formatNumber } = useTranslation()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const {
    filters,
    activeChips,
    hasFilters,
    setFilter,
    setPage,
    removeFilter,
    resetFilters,
  } = useProductFilters([])
  
  // Fetch available filter options from API
  const { data: facetsData } = useProductFacetsQuery()
  const availableOptions: AvailableFilterOptions = facetsData ? {
    categoryIds: facetsData.categoryIds,
    collectionIds: facetsData.collectionIds,
    colors: facetsData.colors,
    sizes: facetsData.sizes,
    badges: facetsData.badges as BadgeFilter[],
    priceRange: facetsData.priceRange,
  } : {
    categoryIds: [],
    collectionIds: [],
    colors: [],
    sizes: [],
    badges: [],
    priceRange: { min: 0, max: 10000 },
  }

  const currentPage = filters.page ?? 1
  const pageSize = filters.pageSize ?? DEFAULT_PAGE_SIZE
  const debouncedSearch = useDebouncedValue(filters.search ?? '', SEARCH_DEBOUNCE_MS)
  const queryParams = mapShopFiltersToProductParams({
    filters,
    page: currentPage,
    pageSize,
    debouncedSearch,
  })

  const {
    data,
    error,
    isError,
    isFetching,
    isPending,
    refetch,
  } = useProductsQuery(queryParams)

  const products = data?.items ?? []
  const pagination = data?.pagination
  const totalItems = pagination?.totalItems ?? 0
  const totalPages = pagination?.totalPages ?? 0
  const resolvedPage = pagination?.page ?? currentPage
  const isInitialLoading = isPending && !data
  const showErrorState = isError && !data && !isCancellationError(error)
  const showEmptyState = !isInitialLoading && !showErrorState && Boolean(data) && products.length === 0
  const backgroundFetching = isFetching && !isInitialLoading
  const visiblePages = getVisiblePages(resolvedPage, totalPages)

  useBodyScrollLock(mobileFiltersOpen)

  return (
    <Container className="py-8 sm:py-10">
      <section className="mb-6 rounded-[1.75rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-5 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-text-secondary)]">{t('shop.catalogLabel')}</p>
        <h1 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.05] text-[color:var(--color-text-primary)]">{t('shop.title')}</h1>
        <p className={`mt-3 max-w-3xl text-sm leading-relaxed text-[color:var(--color-text-secondary)] sm:text-base ${isRtl ? 'text-right' : ''}`}>
          {t('shop.subtitle')}
        </p>
        <p className="mt-4 text-sm text-[color:var(--color-text-secondary)]">{t('shop.productsFound', { count: formatNumber(totalItems) })}</p>
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

          <ProductResultsHeader resultCount={totalItems} onOpenMobileFilters={() => setMobileFiltersOpen(true)} />

          {backgroundFetching ? (
            <p role="status" aria-live="polite" className={`text-xs text-[color:var(--color-text-muted)] ${isRtl ? 'text-right' : ''}`}>
              {t('shop.updatingProducts')}
            </p>
          ) : null}

          <ActiveFilters chips={activeChips} onRemove={removeFilter} onClearAll={resetFilters} />

          {isInitialLoading ? (
            <section aria-busy="true" aria-live="polite" className="space-y-3" aria-label={t('shop.loadingProducts')}>
              <p className={`text-sm text-[color:var(--color-text-secondary)] ${isRtl ? 'text-right' : ''}`}>{t('shop.loadingProducts')}</p>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-5">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={`shop-loading-${index}`}
                    className="h-[370px] animate-pulse rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/70"
                  />
                ))}
              </div>
            </section>
          ) : null}

          {showErrorState ? (
            <div className={`rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-8 ${isRtl ? 'text-right' : 'text-center'}`}>
              <p role="alert" className="text-sm text-[color:var(--color-danger)]">
                {getErrorMessage(t('shop.loadFailed'), error)}
              </p>
              <button
                type="button"
                onClick={() => {
                  void refetch()
                }}
                className="mt-5 rounded-full btn-cta px-5 py-2 text-sm font-semibold"
              >
                {t('shop.retry')}
              </button>
            </div>
          ) : null}

          {!isInitialLoading && !showErrorState && products.length > 0 ? (
            <>
              <ProductsGrid products={products} />

              {totalPages > 1 ? (
                <nav
                  className={`mt-5 flex flex-wrap items-center gap-2 ${isRtl ? 'justify-start' : 'justify-end'}`}
                  aria-label={t('shop.pagination')}
                >
                  <button
                    type="button"
                    onClick={() => setPage(Math.max(1, resolvedPage - 1))}
                    disabled={resolvedPage <= 1 || isFetching}
                    aria-label={t('shop.paginationPrevious')}
                    className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-card)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    {t('shop.paginationPreviousShort')}
                  </button>

                  {visiblePages.map((page) => (
                    <button
                      key={`shop-page-${page}`}
                      type="button"
                      onClick={() => setPage(page)}
                      aria-label={t('shop.paginationPage', { page })}
                      aria-current={page === resolvedPage ? 'page' : undefined}
                      disabled={isFetching && page === resolvedPage}
                      className={`rounded-full border px-3 py-2 text-sm transition ${
                        page === resolvedPage
                          ? 'border-[color:var(--color-primary)] text-[color:var(--color-primary)]'
                          : 'border-[color:var(--color-border)] text-[color:var(--color-text-primary)]'
                      }`}
                    >
                      {formatNumber(page)}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setPage(resolvedPage + 1)}
                    disabled={totalPages === 0 || resolvedPage >= totalPages || isFetching}
                    aria-label={t('shop.paginationNext')}
                    className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-card)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    {t('shop.paginationNextShort')}
                  </button>
                </nav>
              ) : null}
            </>
          ) : null}

          {showEmptyState ? (
            <div className={`rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-8 ${isRtl ? 'text-right' : 'text-center'}`}>
              <h2 className="text-xl font-semibold text-[color:var(--color-text-primary)]">{t('shop.noProductsFound')}</h2>
              <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">{t('shop.noResultsDescription')}</p>
              {hasFilters ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 rounded-full btn-cta px-5 py-2 text-sm font-semibold"
                >
                  {t('shop.clearFiltersCta')}
                </button>
              ) : null}
            </div>
          ) : null}
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
