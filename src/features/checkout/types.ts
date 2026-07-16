import type { ProductCartItem } from '@/features/cart/types'
import type { PriceSummary } from '@/features/cart/priceUtils'

export type CheckoutStep = 'shipping' | 'payment' | 'review'

export type CustomerInfo = {
  fullName: string
  phone: string
  email: string
}

export type ShippingAddress = {
  province: string
  city: string
  postalCode: string
  fullAddress: string
}

export type DeliveryMethod = {
  id: string
  title: string
  description: string
  price: number
  estimatedDays: string
}

export type PaymentMethodType = 'mock-online' | 'cash-on-delivery' | 'card-placeholder'

export type PaymentMethod = {
  id: string
  title: string
  description: string
  type: PaymentMethodType
}

export type CheckoutOrder = {
  id: string
  orderNumber: string
  items: ProductCartItem[]
  customerInfo: CustomerInfo
  shippingAddress: ShippingAddress
  deliveryMethod: DeliveryMethod
  paymentMethod: PaymentMethod
  notes: string
  priceSummary: PriceSummary
  status: 'placed'
  createdAt: string
}

export type CheckoutState = {
  customerInfo: CustomerInfo
  shippingAddress: ShippingAddress
  deliveryMethod: DeliveryMethod | null
  paymentMethod: PaymentMethod | null
  notes: string
  currentStep: CheckoutStep
  lastOrderId: string | null
  submittedOrders: CheckoutOrder[]
}
