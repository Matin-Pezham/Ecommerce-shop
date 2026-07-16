import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { CheckoutEmptyState } from '@/components/checkout/CheckoutEmptyState'
import { selectCheckoutPaymentReady, selectCheckoutShippingReady } from '@/features/checkout/checkoutSelectors'
import { useAppSelector } from '@/store/hooks'

type CheckoutGuardProps = {
  step: 'shipping' | 'payment' | 'review'
  children: ReactNode
}

export function CheckoutGuard({ step, children }: CheckoutGuardProps) {
  const cartItems = useAppSelector((state) => state.cart.items)
  const shippingReady = useAppSelector(selectCheckoutShippingReady)
  const paymentReady = useAppSelector(selectCheckoutPaymentReady)

  if (cartItems.length === 0) {
    return <CheckoutEmptyState />
  }

  if (step === 'payment' && !shippingReady) {
    return <Navigate to="/checkout/shipping" replace />
  }

  if (step === 'review' && !shippingReady) {
    return <Navigate to="/checkout/shipping" replace />
  }

  if (step === 'review' && !paymentReady) {
    return <Navigate to="/checkout/payment" replace />
  }

  return <>{children}</>
}
