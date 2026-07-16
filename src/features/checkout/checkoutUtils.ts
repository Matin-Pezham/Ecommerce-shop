import { calculateCartPriceSummary } from '@/features/cart/priceUtils'
import type { ProductCartItem } from '@/features/cart/types'
import type {
  CheckoutOrder,
  DeliveryMethod,
  PaymentMethod,
} from '@/features/checkout/types'

export function calculateCheckoutSummary(items: ProductCartItem[], deliveryPrice: number) {
  const base = calculateCartPriceSummary(items)
  return {
    ...base,
    shipping: deliveryPrice,
    total: Math.max(base.subtotal - base.discount + deliveryPrice + base.tax, 0),
  }
}

export function createMockOrderId() {
  const random = Math.floor(10000 + Math.random() * 90000)
  return `ord-${Date.now()}-${random}`
}

export function createOrderNumber() {
  const random = Math.floor(1000 + Math.random() * 9000)
  return `NX-${new Date().getFullYear()}-${random}`
}

export function buildMockOrder(params: {
  items: ProductCartItem[]
  customerInfo: CheckoutOrder['customerInfo']
  shippingAddress: CheckoutOrder['shippingAddress']
  deliveryMethod: DeliveryMethod
  paymentMethod: PaymentMethod
  notes: string
}): CheckoutOrder {
  const summary = calculateCheckoutSummary(params.items, params.deliveryMethod.price)
  return {
    id: createMockOrderId(),
    orderNumber: createOrderNumber(),
    items: params.items,
    customerInfo: params.customerInfo,
    shippingAddress: params.shippingAddress,
    deliveryMethod: params.deliveryMethod,
    paymentMethod: params.paymentMethod,
    notes: params.notes,
    priceSummary: summary,
    status: 'placed',
    createdAt: new Date().toISOString(),
  }
}
