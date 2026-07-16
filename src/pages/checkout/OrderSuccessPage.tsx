import { Link, Navigate, useParams } from 'react-router-dom'
import { useTranslation } from '@/i18n'
import { useAppSelector } from '@/store/hooks'

export function OrderSuccessPage() {
  const { t, isRtl, formatPrice } = useTranslation()
  const { orderId } = useParams<{ orderId: string }>()

  const order = useAppSelector((state) => state.checkout.submittedOrders.find((item) => item.id === orderId))

  if (!order) {
    return <Navigate to="/checkout/shipping" replace />
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className={`rounded-[1.75rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-8 shadow-[var(--shadow-soft)] ${isRtl ? 'text-right' : ''}`}>
        <h1 className="text-3xl font-semibold text-[color:var(--color-text-primary)]">{t('checkout.successTitle')}</h1>
        <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">{t('checkout.successDescription')}</p>

        <div className="mt-6 grid gap-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4 text-sm text-[color:var(--color-text-secondary)] sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.12em]">{t('checkout.orderId')}</p>
            <p className="mt-1 font-semibold text-[color:var(--color-text-primary)]">{order.id}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.12em]">{t('checkout.orderNumber')}</p>
            <p className="mt-1 font-semibold text-[color:var(--color-text-primary)]">{order.orderNumber}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.12em]">{t('checkout.paymentMethod')}</p>
            <p className="mt-1 font-semibold text-[color:var(--color-text-primary)]">{order.paymentMethod.title}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.12em]">{t('checkout.total')}</p>
            <p className="mt-1 font-semibold text-[color:var(--color-text-primary)]">{formatPrice(order.priceSummary.total)}</p>
          </div>
        </div>

        <div className={`mt-6 flex gap-3 ${isRtl ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
          <Link to="/shop" className="rounded-full btn-cta px-5 py-2 text-sm font-semibold">
            {t('common.continueShopping')}
          </Link>
          <Link to="/account/orders" className="rounded-full border border-[color:var(--color-border)] px-5 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-surface)]">
            {t('account.sidebar.orders')}
          </Link>
        </div>
      </div>
    </section>
  )
}
