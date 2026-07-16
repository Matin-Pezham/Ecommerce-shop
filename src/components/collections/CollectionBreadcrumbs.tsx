import { ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from '@/i18n'

type CollectionBreadcrumbsProps = {
  currentLabel: string
}

export function CollectionBreadcrumbs({ currentLabel }: CollectionBreadcrumbsProps) {
  const { t, isRtl } = useTranslation()

  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className={`flex flex-wrap items-center gap-2 text-sm text-[color:var(--color-text-secondary)] ${isRtl ? 'flex-row-reverse' : ''}`}>
        <li>
          <Link to="/home" className="transition hover:text-[color:var(--color-primary)]">
            {t('collections.breadcrumbHome')}
          </Link>
        </li>
        <li aria-hidden="true" className="text-[color:var(--color-text-muted)]">
          <ChevronLeft size={14} className={isRtl ? '' : 'rotate-180'} />
        </li>
        <li>
          <Link to="/collections" className="transition hover:text-[color:var(--color-primary)]">
            {t('collections.breadcrumbCollections')}
          </Link>
        </li>
        <li aria-hidden="true" className="text-[color:var(--color-text-muted)]">
          <ChevronLeft size={14} className={isRtl ? '' : 'rotate-180'} />
        </li>
        <li className="font-medium text-[color:var(--color-text-primary)]">{currentLabel}</li>
      </ol>
    </nav>
  )
}
