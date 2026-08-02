import { useMemo } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { CollectionBreadcrumbs } from '@/components/collections/CollectionBreadcrumbs'
import { CollectionCard } from '@/components/collections/CollectionCard'
import { CollectionHero } from '@/components/collections/CollectionHero'
import { CollectionNotFound } from '@/components/collections/CollectionNotFound'
import { CollectionProductGrid } from '@/components/collections/CollectionProductGrid'
import { CollectionStats } from '@/components/collections/CollectionStats'
import { Container } from '@/components/layout/Container'
import { LoadingState } from '@/components/common/LoadingState'
import { productCollections } from '@/data/collections'
import type { ProductSort } from '@/features/products/filterTypes'
import { getLocalizedText } from '@/features/products/productUtils'
import { useProductsQuery } from '@/features/products/queries/useProductsQuery'
import { useCollectionCountsQuery } from '@/features/products/queries/useCollectionCountsQuery'
import { useCollectionRelatedQuery } from '@/features/products/queries/useCollectionRelatedQuery'
import { useTranslation } from '@/i18n'

const allowedSorts: ProductSort[] = ['featured', 'newest', 'price-asc', 'price-desc', 'rating-desc', 'bestseller']

export default function CollectionDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const { t, locale, isRtl } = useTranslation()

  const collection = useMemo(() => {
    if (!slug) return undefined
    return productCollections.find((item) => item.slug === slug)
  }, [slug])

  const requestedSort = searchParams.get('sort')
  const sort = requestedSort && allowedSorts.includes(requestedSort as ProductSort) ? (requestedSort as ProductSort) : 'featured'
  
  const { data, isPending } = useProductsQuery(
    collection ? { collectionId: collection.id, sort, pageSize: 24 } : {}
  )
  
  // Fetch all collection counts (includes stats for current collection)
  const { data: countsData } = useCollectionCountsQuery()
  
  // Fetch related collections
  const { data: relatedData } = useCollectionRelatedQuery(collection?.id)

  // Compute related collections (must be before early returns per rules of hooks)
  const relatedCollections = useMemo(() => {
    if (!relatedData || !countsData) {
      return []
    }

    return relatedData.related.map((related) => {
      const collectionData = productCollections.find((c) => c.id === related.id)
      const count = countsData.counts.find((c) => c.collectionId === related.id)
      
      return {
        collection: collectionData || {
          id: related.id,
          slug: related.slug,
          name: related.name,
          description: related.description,
          featured: related.featured,
          heroImage: related.heroImage,
          productIds: [],
        },
        count: count?.totalProducts ?? related.productCount,
      }
    })
  }, [relatedData, countsData])

  if (!collection) {
    return (
      <Container className="py-16 sm:py-20">
        <CollectionNotFound />
      </Container>
    )
  }

  if (isPending && !data) {
    return (
      <Container className="py-16 sm:py-20">
        <LoadingState label={t('shop.loadingProducts')} />
      </Container>
    )
  }

  const products = data?.items ?? []
  const totalProducts = data?.pagination.totalItems ?? 0
  
  const currentCollectionCounts = countsData?.counts.find((c) => c.collectionId === collection?.id)
  const inStockCount = currentCollectionCounts?.inStockCount ?? 0
  const newArrivalsCount = currentCollectionCounts?.newArrivalsCount ?? 0
  const saleProductsCount = currentCollectionCounts?.saleCount ?? 0

  return (
    <div className="py-8 sm:py-10">
      <Container>
        <CollectionBreadcrumbs currentLabel={getLocalizedText(collection.name, locale)} />

        <CollectionHero
          title={getLocalizedText(collection.name, locale)}
          description={getLocalizedText(collection.description, locale)}
          image={collection.heroImage}
          productCount={totalProducts}
          featured={collection.featured}
        />

        <div className="mt-6">
          <CollectionStats
            productsCount={totalProducts}
            inStockCount={inStockCount}
            newArrivalsCount={newArrivalsCount}
            saleProductsCount={saleProductsCount}
          />
        </div>

        <section className="mt-8 space-y-4">
          <div className={`flex flex-wrap items-center justify-between gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <h2 className="text-xl font-semibold text-[color:var(--color-text-primary)]">{t('collections.browseCollection')}</h2>
            <label className={`inline-flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)] ${isRtl ? 'flex-row-reverse' : ''}`}>
              <span>{t('collections.sortBy')}</span>
              <select
                value={sort}
                onChange={(event) => {
                  const value = event.target.value as ProductSort
                  if (!allowedSorts.includes(value)) return
                  const next = new URLSearchParams(searchParams)
                  if (value === 'featured') {
                    next.delete('sort')
                  } else {
                    next.set('sort', value)
                  }
                  setSearchParams(next)
                }}
                className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-card)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] outline-none"
                aria-label={t('collections.sortBy')}
              >
                <option value="featured">{t('collections.featuredSort')}</option>
                <option value="newest">{t('collections.newest')}</option>
                <option value="price-asc">{t('collections.priceLowToHigh')}</option>
                <option value="price-desc">{t('collections.priceHighToLow')}</option>
                <option value="rating-desc">{t('collections.bestRated')}</option>
                <option value="bestseller">{t('collections.bestSelling')}</option>
              </select>
            </label>
          </div>

          <CollectionProductGrid products={products} />

          {products.length === 0 ? (
            <div className={`flex flex-wrap gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <Link to="/collections" className="rounded-full border border-[color:var(--color-border)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text-primary)]">
                {t('collections.backToCollections')}
              </Link>
              <Link to="/shop" className="rounded-full btn-cta px-4 py-2 text-sm font-semibold">
                {t('collections.backToShop')}
              </Link>
            </div>
          ) : null}
        </section>

        {relatedCollections.length > 0 ? (
          <section className="mt-12 space-y-4">
            <h2 className={`text-xl font-semibold text-[color:var(--color-text-primary)] ${isRtl ? 'text-right' : ''}`}>{t('collections.relatedCollections')}</h2>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {relatedCollections.map((entry) => (
                <CollectionCard key={entry.collection.id} collection={entry.collection} productCount={entry.count} />
              ))}
            </div>
          </section>
        ) : null}
      </Container>
    </div>
  )
}
