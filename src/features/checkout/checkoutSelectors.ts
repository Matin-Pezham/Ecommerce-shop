import { calculateCheckoutSummary } from '@/features/checkout/checkoutUtils'
import type { RootState } from '@/store'

export const selectCheckoutState = (state: RootState) => state.checkout

export const selectCheckoutCustomerInfo = (state: RootState) => state.checkout.customerInfo

export const selectCheckoutShippingAddress = (state: RootState) => state.checkout.shippingAddress

export const selectCheckoutDeliveryMethod = (state: RootState) => state.checkout.deliveryMethod

export const selectCheckoutPaymentMethod = (state: RootState) => state.checkout.paymentMethod

export const selectCheckoutNotes = (state: RootState) => state.checkout.notes

export const selectCheckoutCurrentStep = (state: RootState) => state.checkout.currentStep

export const selectSubmittedOrders = (state: RootState) => state.checkout.submittedOrders

export const selectLastOrderId = (state: RootState) => state.checkout.lastOrderId

export const selectCheckoutSummary = (state: RootState) => {
  const deliveryPrice = state.checkout.deliveryMethod?.price ?? 0
  return calculateCheckoutSummary(state.cart.items, deliveryPrice)
}

export const selectCheckoutShippingReady = (state: RootState) => {
  const customer = state.checkout.customerInfo
  const shipping = state.checkout.shippingAddress

  return Boolean(
    customer.fullName.trim() &&
      customer.phone.trim() &&
      shipping.city.trim() &&
      shipping.fullAddress.trim() &&
      state.checkout.deliveryMethod,
  )
}

export const selectCheckoutPaymentReady = (state: RootState) => Boolean(state.checkout.paymentMethod)
