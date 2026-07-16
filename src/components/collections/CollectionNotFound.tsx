import { Link } from 'react-router-dom'
import { useTranslation } from '@/i18n'

type CollectionNotFoundProps = {
  title?: string
  description?: string
}

export function CollectionNotFound({ title, description }: CollectionNotFoundProps) {
  const { t, isRtl } = useTranslation()

  return (
    <div className="mx-auto max-w-xl rounded-[2rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-8 text-center shadow-[var(--shadow-soft)]">
      <h1 className={`font-display text-3xl text-[color:var(--color-text-primary)] ${isRtl ? 'text-right' : ''}`}>
        {title ?? t('collections.collectionNotFoundTitle')}
      </h1>
      <p className={`mt-3 text-sm text-[color:var(--color-text-secondary)] ${isRtl ? 'text-right' : ''}`}>
        {description ?? t('collections.collectionNotFoundDescription')}
      </p>
      <div className={`mt-6 flex justify-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <Link to="/collections" className="btn-cta rounded-full px-5 py-3 text-sm font-semibold">
          {t('collections.backToCollections')}
        </Link>
        <Link
          to="/shop"
          className="rounded-full border border-[color:var(--color-border)] px-5 py-3 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-surface)]"
        >
          {t('collections.backToShop')}
        </Link>
      </div>
    </div>
  )
}
