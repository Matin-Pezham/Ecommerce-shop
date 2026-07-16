import { useTranslation } from '@/i18n'

type CollectionStatsProps = {
  productsCount: number
  inStockCount: number
  newArrivalsCount: number
  saleProductsCount: number
}

export function CollectionStats({
  productsCount,
  inStockCount,
  newArrivalsCount,
  saleProductsCount,
}: CollectionStatsProps) {
  const { t, isRtl, formatNumber } = useTranslation()

  const stats = [
    { key: 'products', label: t('collections.productCount'), value: formatNumber(productsCount) },
    { key: 'in-stock', label: t('collections.inStockProducts'), value: formatNumber(inStockCount) },
    { key: 'new-arrivals', label: t('collections.newArrivalsCount'), value: formatNumber(newArrivalsCount) },
    { key: 'sale-products', label: t('collections.saleProductsCount'), value: formatNumber(saleProductsCount) },
  ]

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.key} className={`rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/90 p-4 ${isRtl ? 'text-right' : ''}`}>
          <p className="text-xs uppercase tracking-[0.12em] text-[color:var(--color-text-secondary)]">{stat.label}</p>
          <p className="mt-2 text-2xl font-semibold text-[color:var(--color-text-primary)]">{stat.value}</p>
        </div>
      ))}
    </section>
  )
}
