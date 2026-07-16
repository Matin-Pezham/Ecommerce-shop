import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckoutGuard } from '@/components/checkout/CheckoutGuard'
import { CheckoutReviewItems } from '@/components/checkout/CheckoutReviewItems'
import { CheckoutSummary } from '@/components/checkout/CheckoutSummary'
import {
  selectCheckoutCustomerInfo,
  selectCheckoutDeliveryMethod,
  selectCheckoutNotes,
  selectCheckoutPaymentMethod,
  selectCheckoutShippingAddress,
  selectCheckoutSummary,
} from '@/features/checkout/checkoutSelectors'
import { buildMockOrder } from '@/features/checkout/checkoutUtils'
import { setCheckoutStep, submitCheckoutOrder } from '@/features/checkout/checkoutSlice'
import { clearCart } from '@/features/cart/cartSlice'
import { useTranslation } from '@/i18n'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

export function CheckoutReviewPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t, isRtl } = useTranslation()

  const customerInfo = useAppSelector(selectCheckoutCustomerInfo)
  const shippingAddress = useAppSelector(selectCheckoutShippingAddress)
  const deliveryMethod = useAppSelector(selectCheckoutDeliveryMethod)
  const paymentMethod = useAppSelector(selectCheckoutPaymentMethod)
  const notes = useAppSelector(selectCheckoutNotes)
  const summary = useAppSelector(selectCheckoutSummary)
  const items = useAppSelector((state) => state.cart.items)

  useEffect(() => {
    dispatch(setCheckoutStep('review'))
  }, [dispatch])

  const handlePlaceOrder = () => {
    if (!deliveryMethod || !paymentMethod || items.length === 0) return

    const order = buildMockOrder({
      items,
      customerInfo,
      shippingAddress,
      deliveryMethod,
      paymentMethod,
      notes,
    })

    dispatch(submitCheckoutOrder(order))
    dispatch(clearCart())
    navigate(`/order-success/${order.id}`)
  }

  return (
    <CheckoutGuard step="review">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <section className="rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-5">
            <h2 className={`text-lg font-semibold text-[color:var(--color-text-primary)] ${isRtl ? 'text-right' : ''}`}>{t('checkout.reviewDetails')}</h2>
            <div className={`mt-4 grid gap-4 text-sm text-[color:var(--color-text-secondary)] sm:grid-cols-2 ${isRtl ? 'text-right' : ''}`}>
              <div>
                <p className="font-semibold text-[color:var(--color-text-primary)]">{t('checkout.customerInfo')}</p>
                <p className="mt-1">{customerInfo.fullName}</p>
                <p>{customerInfo.phone}</p>
                <p>{customerInfo.email}</p>
              </div>

              <div>
                <p className="font-semibold text-[color:var(--color-text-primary)]">{t('checkout.shippingAddress')}</p>
                <p className="mt-1">{shippingAddress.province}</p>
                <p>{shippingAddress.city}</p>
                <p>{shippingAddress.fullAddress}</p>
                <p>{shippingAddress.postalCode}</p>
              </div>

              <div>
                <p className="font-semibold text-[color:var(--color-text-primary)]">{t('checkout.deliveryMethod')}</p>
                <p className="mt-1">{deliveryMethod?.title}</p>
              </div>

              <div>
                <p className="font-semibold text-[color:var(--color-text-primary)]">{t('checkout.paymentMethod')}</p>
                <p className="mt-1">{paymentMethod?.title}</p>
              </div>
            </div>

            {notes ? (
              <div className={`mt-4 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-2 text-sm text-[color:var(--color-text-secondary)] ${isRtl ? 'text-right' : ''}`}>
                <p className="font-semibold text-[color:var(--color-text-primary)]">{t('checkout.notes')}</p>
                <p className="mt-1">{notes}</p>
              </div>
            ) : null}
          </section>

          <CheckoutReviewItems items={items} />

          <div className={`flex gap-3 ${isRtl ? 'justify-start flex-row-reverse' : 'justify-end'}`}>
            <button
              type="button"
              onClick={() => {
                dispatch(setCheckoutStep('payment'))
                navigate('/checkout/payment')
              }}
              className="rounded-full border border-[color:var(--color-border)] px-5 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-surface)]"
            >
              {t('checkout.backToPayment')}
            </button>
            <button type="button" onClick={handlePlaceOrder} className="rounded-full btn-cta px-5 py-2 text-sm font-semibold">
              {t('checkout.placeOrder')}
            </button>
          </div>
        </div>

        <CheckoutSummary items={items} summary={summary} />
      </div>
    </CheckoutGuard>
  )
}
