export type PriceSummary = {
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
  totalSaved: number
  totalQuantity: number
}

type PriceConfig = {
  freeShippingThreshold: number
  shippingCost: number
  taxRate: number
  discountRate?: number
}

export const defaultPriceConfig: PriceConfig = {
  freeShippingThreshold: 1800,
  shippingCost: 120,
  taxRate: 0.08,
  discountRate: 0.1,
}

export function calculatePriceSummary(
  subtotal: number,
  config: PriceConfig = defaultPriceConfig,
): PriceSummary {
  const discount = subtotal > 0 ? Math.min(subtotal * (config.discountRate ?? 0), 220) : 0
  const shipping = subtotal > config.freeShippingThreshold ? 0 : config.shippingCost
  const tax = subtotal > 0 ? subtotal * config.taxRate : 0
  const total = Math.max(subtotal - discount + shipping + tax, 0)
  const totalSaved = discount + (shipping === 0 ? 0 : 0)

  return {
    subtotal,
    discount,
    shipping,
    tax,
    total,
    totalSaved,
    totalQuantity: 0,
  }
}

export function calculateCartPriceSummary(
  items: Array<{ quantity: number; price: number; compareAtPrice?: number }>,
  config: PriceConfig = defaultPriceConfig,
): PriceSummary {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
  const baseDiscount = items.reduce((sum, item) => {
    const savings = Math.max((item.compareAtPrice ?? item.price) - item.price, 0) * item.quantity
    return sum + savings
  }, 0)
  const discount = subtotal > 0 ? Math.min(baseDiscount, 320) : 0
  const shipping = subtotal > config.freeShippingThreshold ? 0 : config.shippingCost
  const tax = subtotal > 0 ? subtotal * config.taxRate : 0
  const total = Math.max(subtotal - discount + shipping + tax, 0)

  return {
    subtotal,
    discount,
    shipping,
    tax,
    total,
    totalSaved: discount,
    totalQuantity,
  }
}
