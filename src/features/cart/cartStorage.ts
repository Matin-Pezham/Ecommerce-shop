import type { CartState, ProductCartItem } from './types'

export const CART_STORAGE_KEY = 'enterprise-ecommerce:cart:v1'

export type PersistedCartState = Pick<CartState, 'items' | 'couponCode' | 'currency'>

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function isProductCartItem(value: unknown): value is ProductCartItem {
  if (!isObjectRecord(value)) {
    return false
  }

  return (
    isNonEmptyString(value.id) &&
    isNonEmptyString(value.productId) &&
    isNonEmptyString(value.name) &&
    isNonEmptyString(value.slug) &&
    isNonEmptyString(value.brand) &&
    isNonEmptyString(value.image) &&
    isFiniteNumber(value.price) &&
    isFiniteNumber(value.compareAtPrice) &&
    isFiniteNumber(value.quantity) &&
    value.quantity > 0 &&
    isNonEmptyString(value.selectedColor) &&
    isNonEmptyString(value.selectedSize) &&
    isFiniteNumber(value.stock) &&
    value.stock >= 0 &&
    isNonEmptyString(value.sku)
  )
}

function isPersistedCartState(value: unknown): value is PersistedCartState {
  if (!isObjectRecord(value)) {
    return false
  }

  if (!Array.isArray(value.items)) {
    return false
  }

  if (!(typeof value.couponCode === 'string' || value.couponCode === null)) {
    return false
  }

  if (typeof value.currency !== 'string') {
    return false
  }

  return value.items.every((item) => isProductCartItem(item))
}

function getStorage(): Storage | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    return window.localStorage
  } catch {
    return null
  }
}

function toPersistedCartState(state: CartState): PersistedCartState {
  return {
    items: state.items,
    couponCode: state.couponCode,
    currency: state.currency,
  }
}

function removeCorruptedCart(storage: Storage) {
  try {
    storage.removeItem(CART_STORAGE_KEY)
  } catch {
    // Ignore cleanup failures to avoid crashing application flow.
  }
}

export function savePersistedCart(state: CartState): void {
  const storage = getStorage()
  if (!storage) {
    return
  }

  const durableCartState = toPersistedCartState(state)

  try {
    storage.setItem(CART_STORAGE_KEY, JSON.stringify(durableCartState))
  } catch {
    // Ignore write failures (quota/privacy/availability) safely.
  }
}

export function loadPersistedCart(): PersistedCartState | undefined {
  const storage = getStorage()
  if (!storage) {
    return undefined
  }

  const rawValue = storage.getItem(CART_STORAGE_KEY)
  if (!rawValue) {
    return undefined
  }

  let parsedValue: unknown
  try {
    parsedValue = JSON.parse(rawValue)
  } catch {
    removeCorruptedCart(storage)
    return undefined
  }

  if (!isPersistedCartState(parsedValue)) {
    removeCorruptedCart(storage)
    return undefined
  }

  return parsedValue
}
