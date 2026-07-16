import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from '@/i18n'

type CollectionHeroProps = {
  title: string
  description: string
  image?: string
  productCount: number
  featured?: boolean
}

const fallbackImage =
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80'

export function CollectionHero({ title, description, image, productCount, featured }: CollectionHeroProps) {
  const { t, isRtl } = useTranslation()

  return (
    <section className="overflow-hidden rounded-[2rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 shadow-[var(--shadow-soft)]">
      <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        <div className={`space-y-5 p-6 sm:p-8 lg:p-10 ${isRtl ? 'text-right' : ''}`}>
          {featured ? (
            <span className={`inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-1 text-xs font-semibold text-[color:var(--color-text-primary)] ${isRtl ? 'flex-row-reverse' : ''}`}>
              <Sparkles size={14} />
              {t('collections.featured')}
            </span>
          ) : null}

          <h1 className="font-display text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.06] text-[color:var(--color-text-primary)]">{title}</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-[color:var(--color-text-secondary)] sm:text-base">{description}</p>

          <div className={`flex flex-wrap items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <span className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-2 text-sm font-medium text-[color:var(--color-text-secondary)]">
              {productCount} {t('collections.products')}
            </span>

            <Link to="/shop" className={`inline-flex items-center gap-2 rounded-full btn-cta px-4 py-2 text-sm font-semibold ${isRtl ? 'flex-row-reverse' : ''}`}>
              {t('collections.browseCollection')}
              <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
            </Link>
          </div>
        </div>

        <div className="relative min-h-[260px] lg:min-h-[100%]">
          <img
            src={image || fallbackImage}
            alt={title}
            className="h-full w-full object-cover"
            onError={(event) => {
              ;(event.currentTarget as HTMLImageElement).src = fallbackImage
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(170deg,rgba(5,10,20,0.15),rgba(5,10,20,0.35))]" />
        </div>
      </div>
    </section>
  )
}
