import { AccountHeader } from '@/components/account/AccountHeader'
import { useTranslation } from '@/i18n'
import { mockOrders } from '@/features/orders/mockOrders'

export function OrdersPage() {
  const { t, isRtl, formatPrice, formatDate, formatOrderStatus } = useTranslation()

  return (
    <div>
      <AccountHeader
        title={t('account.orders.title')}
        description={t('account.orders.subtitle')}
        action={<button type="button" className="rounded-full border border-[color:var(--color-border)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-surface)]">{t('account.orders.viewDetails')}</button>}
      />

      <div className="space-y-4">
        {mockOrders.map((order) => (
          <div key={order.id} className="rounded-[1.75rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-6 shadow-[var(--shadow-soft)]">
            <div className={`flex flex-wrap items-center justify-between gap-4 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
              <div>
                <p className="text-lg font-semibold text-[color:var(--color-text-primary)]">{order.orderNumber}</p>
                <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">{t('account.orders.orderedOn')} {formatDate(order.placedAt)}</p>
              </div>
              <span className="rounded-full border border-[color:var(--color-border)] px-3 py-1 text-sm font-semibold text-[color:var(--color-text-secondary)]">{formatOrderStatus(order.status)}</span>
            </div>
            <div className={`mt-5 flex flex-wrap items-center justify-between gap-4 rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/90 px-4 py-3 text-sm text-[color:var(--color-text-secondary)] ${isRtl ? 'flex-row-reverse' : ''}`}>
              <span>{order.items} {t('account.orders.items')}</span>
              <span>{order.shippingTo}</span>
              <span className="font-semibold text-[color:var(--color-text-primary)]">{formatPrice(order.total)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
