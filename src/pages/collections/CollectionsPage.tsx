import { useMemo } from 'react'
import { CollectionCard } from '@/components/collections/CollectionCard'
import { Container } from '@/components/layout/Container'
import { LoadingState } from '@/components/common/LoadingState'
import { productCollections } from '@/data/collections'
import { useCollectionCountsQuery } from '@/features/products/queries/useCollectionCountsQuery'
import { useTranslation } from '@/i18n'

export function CollectionsPage() {
  const { t, isRtl } = useTranslation()
  
  // Fetch all collection counts in a single request
  const { data: countsData, isPending } = useCollectionCountsQuery()

  const collectionsWithCounts = useMemo(() => {
    if (!countsData) {
      return productCollections.map((collection) => ({
        collection,
        productCount: 0,
      }))
    }

    return productCollections.map((collection) => {
      const count = countsData.counts.find((c) => c.collectionId === collection.id)
      return {
        collection,
        productCount: count?.totalProducts ?? 0,
      }
    })
  }, [countsData])

  if (isPending) {
    return (
      <Container className="py-8 sm:py-10">
        <LoadingState label={t('shop.loadingProducts')} />
      </Container>
    )
  }

  return (
    <Container className="py-8 sm:py-10">
      <section className="mb-7 rounded-[1.75rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-text-secondary)]">{t('collections.catalogLabel')}</p>
        <h1 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.9rem)] leading-[1.07] text-[color:var(--color-text-primary)]">{t('collections.title')}</h1>
        <p className={`mt-3 max-w-3xl text-sm leading-relaxed text-[color:var(--color-text-secondary)] sm:text-base ${isRtl ? 'text-right' : ''}`}>
          {t('collections.subtitle')}
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {collectionsWithCounts.map(({ collection, productCount }) => (
          <CollectionCard key={collection.id} collection={collection} productCount={productCount} />
        ))}
      </section>
    </Container>
  )
}
