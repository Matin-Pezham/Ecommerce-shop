import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckoutGuard } from '@/components/checkout/CheckoutGuard'
import { CheckoutSummary } from '@/components/checkout/CheckoutSummary'
import { PaymentMethodSelector } from '@/components/checkout/PaymentMethodSelector'
import {
  selectCheckoutPaymentMethod,
  selectCheckoutSummary,
} from '@/features/checkout/checkoutSelectors'
import { setCheckoutStep, setPaymentMethod } from '@/features/checkout/checkoutSlice'
import type { PaymentMethod } from '@/features/checkout/types'
import { useTranslation } from '@/i18n'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

const PAYMENT_OPTIONS: PaymentMethod[] = [
  {
    id: 'mock-online',
    title: 'Online Payment (Mock)',
    description: 'Simulated secure online payment gateway',
    type: 'mock-online',
  },
  {
    id: 'cash-on-delivery',
    title: 'Cash on Delivery',
    description: 'Pay when your order arrives',
    type: 'cash-on-delivery',
  },
  {
    id: 'card-placeholder',
    title: 'Card on Delivery',
    description: 'Card terminal at your doorstep',
    type: 'card-placeholder',
  },
]

export function CheckoutPaymentPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t, isRtl } = useTranslation()

  const paymentMethod = useAppSelector(selectCheckoutPaymentMethod)
  const summary = useAppSelector(selectCheckoutSummary)
  const items = useAppSelector((state) => state.cart.items)

  const localizedPaymentOptions = useMemo(
    () =>
      PAYMENT_OPTIONS.map((option) => ({
        ...option,
        title: t(`checkout.payment.${option.id}.title`),
        description: t(`checkout.payment.${option.id}.description`),
      })),
    [t],
  )

  useEffect(() => {
    dispatch(setCheckoutStep('payment'))
  }, [dispatch])

  const handleContinue = () => {
    if (!paymentMethod) return
    dispatch(setCheckoutStep('review'))
    navigate('/checkout/review')
  }

  return (
    <CheckoutGuard step="payment">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <PaymentMethodSelector
            options={localizedPaymentOptions}
            selectedId={paymentMethod?.id}
            onSelect={(method) => dispatch(setPaymentMethod(method))}
          />

          {!paymentMethod ? (
            <p className={`text-sm text-[color:var(--color-danger)] ${isRtl ? 'text-right' : ''}`}>{t('checkout.validation.paymentMethod')}</p>
          ) : null}

          <div className={`flex gap-3 ${isRtl ? 'justify-start flex-row-reverse' : 'justify-end'}`}>
            <button
              type="button"
              onClick={() => {
                dispatch(setCheckoutStep('shipping'))
                navigate('/checkout/shipping')
              }}
              className="rounded-full border border-[color:var(--color-border)] px-5 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-surface)]"
            >
              {t('checkout.backToShipping')}
            </button>
            <button
              type="button"
              disabled={!paymentMethod}
              onClick={handleContinue}
              className="rounded-full btn-cta px-5 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
            >
              {t('checkout.continueToReview')}
            </button>
          </div>
        </div>

        <CheckoutSummary items={items} summary={summary} />
      </div>
    </CheckoutGuard>
  )
}
