import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckoutAddressForm } from '@/components/checkout/CheckoutAddressForm'
import { CheckoutCustomerForm } from '@/components/checkout/CheckoutCustomerForm'
import { CheckoutGuard } from '@/components/checkout/CheckoutGuard'
import { CheckoutSummary } from '@/components/checkout/CheckoutSummary'
import { DeliveryMethodSelector } from '@/components/checkout/DeliveryMethodSelector'
import {
  selectCheckoutCustomerInfo,
  selectCheckoutDeliveryMethod,
  selectCheckoutNotes,
  selectCheckoutShippingAddress,
  selectCheckoutSummary,
} from '@/features/checkout/checkoutSelectors'
import {
  setCheckoutNotes,
  setCheckoutStep,
  setCustomerInfo,
  setDeliveryMethod,
  setShippingAddress,
} from '@/features/checkout/checkoutSlice'
import type { CustomerInfo, DeliveryMethod, ShippingAddress } from '@/features/checkout/types'
import { useTranslation } from '@/i18n'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

const DELIVERY_OPTIONS: DeliveryMethod[] = [
  {
    id: 'express',
    title: 'Express Delivery',
    description: 'Fast insured shipping for major cities',
    price: 12,
    estimatedDays: '1-2 days',
  },
  {
    id: 'standard',
    title: 'Standard Delivery',
    description: 'Reliable nationwide delivery',
    price: 6,
    estimatedDays: '3-5 days',
  },
  {
    id: 'boutique-pickup',
    title: 'Boutique Pickup',
    description: 'Pick up from our flagship boutique',
    price: 0,
    estimatedDays: 'Same day',
  },
]

export function CheckoutShippingPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t, isRtl } = useTranslation()

  const customerInfo = useAppSelector(selectCheckoutCustomerInfo)
  const shippingAddress = useAppSelector(selectCheckoutShippingAddress)
  const selectedDelivery = useAppSelector(selectCheckoutDeliveryMethod)
  const notes = useAppSelector(selectCheckoutNotes)
  const summary = useAppSelector(selectCheckoutSummary)
  const items = useAppSelector((state) => state.cart.items)

  const [customerErrors, setCustomerErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({})
  const [addressErrors, setAddressErrors] = useState<Partial<Record<keyof ShippingAddress, string>>>({})

  useEffect(() => {
    dispatch(setCheckoutStep('shipping'))
  }, [dispatch])

  const localizedDeliveryOptions = useMemo(
    () =>
      DELIVERY_OPTIONS.map((option) => ({
        ...option,
        title: t(`checkout.delivery.${option.id}.title`),
        description: t(`checkout.delivery.${option.id}.description`),
        estimatedDays: t(`checkout.delivery.${option.id}.eta`),
      })),
    [t],
  )

  const handleContinue = () => {
    const nextCustomerErrors: Partial<Record<keyof CustomerInfo, string>> = {}
    const nextAddressErrors: Partial<Record<keyof ShippingAddress, string>> = {}

    if (!customerInfo.fullName.trim()) nextCustomerErrors.fullName = t('checkout.validation.fullName')
    if (!customerInfo.phone.trim()) nextCustomerErrors.phone = t('checkout.validation.phone')
    if (!shippingAddress.city.trim()) nextAddressErrors.city = t('checkout.validation.city')
    if (!shippingAddress.fullAddress.trim()) nextAddressErrors.fullAddress = t('checkout.validation.fullAddress')

    setCustomerErrors(nextCustomerErrors)
    setAddressErrors(nextAddressErrors)

    if (Object.keys(nextCustomerErrors).length > 0 || Object.keys(nextAddressErrors).length > 0 || !selectedDelivery) {
      return
    }

    dispatch(setCheckoutStep('payment'))
    navigate('/checkout/payment')
  }

  return (
    <CheckoutGuard step="shipping">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <CheckoutCustomerForm
            value={customerInfo}
            errors={customerErrors}
            onChange={(payload) => dispatch(setCustomerInfo(payload))}
          />

          <CheckoutAddressForm
            value={shippingAddress}
            errors={addressErrors}
            notes={notes}
            onChange={(payload) => dispatch(setShippingAddress(payload))}
            onNotesChange={(value) => dispatch(setCheckoutNotes(value))}
          />

          <DeliveryMethodSelector
            options={localizedDeliveryOptions}
            selectedId={selectedDelivery?.id}
            onSelect={(method) => dispatch(setDeliveryMethod(method))}
          />

          <div className={`flex gap-3 ${isRtl ? 'justify-start flex-row-reverse' : 'justify-end'}`}>
            <button
              type="button"
              onClick={() => navigate('/cart')}
              className="rounded-full border border-[color:var(--color-border)] px-5 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-surface)]"
            >
              {t('checkout.backToCart')}
            </button>
            <button type="button" onClick={handleContinue} className="rounded-full btn-cta px-5 py-2 text-sm font-semibold">
              {t('checkout.continueToPayment')}
            </button>
          </div>
        </div>

        <CheckoutSummary items={items} summary={summary} />
      </div>
    </CheckoutGuard>
  )
}
