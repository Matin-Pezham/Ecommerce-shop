import { CollectionCard } from '@/components/collections/CollectionCard'
import { Container } from '@/components/layout/Container'
import { productCollections } from '@/data/collections'
import { productsCatalog } from '@/data/products'
import { useTranslation } from '@/i18n'

export function CollectionsPage() {
  const { t, isRtl } = useTranslation()

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
        {productCollections.map((collection) => {
          const productCount = productsCatalog.filter((product) => product.collectionIds.includes(collection.id)).length
          return <CollectionCard key={collection.id} collection={collection} productCount={productCount} />
        })}
      </section>
    </Container>
  )
}
