import { ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from '@/i18n'

type ProductBreadcrumbsProps = {
  categoryLabel: string
  categoryHref?: string
  productTitle: string
}

export function ProductBreadcrumbs({ categoryLabel, categoryHref = '/shop', productTitle }: ProductBreadcrumbsProps) {
  const { t, isRtl } = useTranslation()

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className={`flex flex-wrap items-center gap-2 text-sm text-[color:var(--color-text-secondary)] ${isRtl ? 'flex-row-reverse' : ''}`}>
        <li>
          <Link to="/home" className="transition hover:text-[color:var(--color-primary)]">
            {t('productDetail.breadcrumbHome')}
          </Link>
        </li>
        <li aria-hidden="true" className="text-[color:var(--color-text-muted)]">
          <ChevronLeft size={14} className={isRtl ? '' : 'rotate-180'} />
        </li>
        <li>
          <Link to="/shop" className="transition hover:text-[color:var(--color-primary)]">
            {t('productDetail.breadcrumbShop')}
          </Link>
        </li>
        <li aria-hidden="true" className="text-[color:var(--color-text-muted)]">
          <ChevronLeft size={14} className={isRtl ? '' : 'rotate-180'} />
        </li>
        <li>
          <Link to={categoryHref} className="text-[color:var(--color-text-primary)] transition hover:text-[color:var(--color-primary)]">
            {categoryLabel}
          </Link>
        </li>
        <li aria-hidden="true" className="text-[color:var(--color-text-muted)]">
          <ChevronLeft size={14} className={isRtl ? '' : 'rotate-180'} />
        </li>
        <li className="font-medium text-[color:var(--color-text-primary)]">{productTitle}</li>
      </ol>
    </nav>
  )
}
