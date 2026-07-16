import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Collection } from '@/features/products/types'
import { getLocalizedText } from '@/features/products/productUtils'
import { useTranslation } from '@/i18n'

type CollectionCardProps = {
  collection: Collection
  productCount: number
}

const fallbackImage =
  'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1400&q=80'

export function CollectionCard({ collection, productCount }: CollectionCardProps) {
  const { t, locale, isRtl } = useTranslation()
  const name = getLocalizedText(collection.name, locale)
  const description = getLocalizedText(collection.description, locale)

  return (
    <Link
      to={`/collections/${collection.slug}`}
      aria-label={`${t('collections.viewCollection')} ${name}`}
      className="group block overflow-hidden rounded-[1.75rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.13)]"
    >
      <div className="relative h-56 overflow-hidden sm:h-64">
        <img
          src={collection.heroImage || fallbackImage}
          alt={name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          onError={(event) => {
            ;(event.currentTarget as HTMLImageElement).src = fallbackImage
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(170deg,rgba(5,10,20,0.08),rgba(5,10,20,0.45))]" />
        <div className={`absolute bottom-4 ${isRtl ? 'left-4' : 'right-4'} flex items-center gap-2`}>
          {collection.featured ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              <Sparkles size={12} />
              {t('collections.featured')}
            </span>
          ) : null}
        </div>
      </div>

      <div className={`space-y-4 p-5 ${isRtl ? 'text-right' : ''}`}>
        <h3 className="font-display text-2xl text-[color:var(--color-text-primary)]">{name}</h3>
        <p className="text-sm leading-relaxed text-[color:var(--color-text-secondary)]">{description}</p>

        <div className={`flex items-center justify-between gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <p className="text-sm font-medium text-[color:var(--color-text-secondary)]">
            {productCount} {t('collections.products')}
          </p>
          <span className={`inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] px-4 py-2 text-xs font-semibold text-[color:var(--color-text-primary)] transition group-hover:border-[color:var(--color-primary)] group-hover:text-[color:var(--color-primary)] ${isRtl ? 'flex-row-reverse' : ''}`}>
            {t('collections.viewCollection')}
            <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
          </span>
        </div>
      </div>
    </Link>
  )
}
