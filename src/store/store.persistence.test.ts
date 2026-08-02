import { beforeEach, describe, expect, it } from 'vitest'
import { CART_STORAGE_KEY, type PersistedCartState } from '@/features/cart/cartStorage'
import { setupStore, setupProductionStore } from './store'

const persistedCartFixture: PersistedCartState = {
  items: [
    {
      id: 'prd-9-var-green-s',
      productId: 'prd-9',
      name: 'Evening Dress',
      slug: 'evening-dress',
      brand: 'Atelier',
      image: '/assets/evening-dress-green.jpg',
      price: 320,
      compareAtPrice: 410,
      quantity: 2,
      selectedColor: 'Green',
      selectedSize: 'S',
      stock: 5,
      sku: 'ED-GRN-S',
    },
  ],
  couponCode: 'WELCOME15',
  currency: 'EUR',
}

beforeEach(() => {
  window.localStorage.clear()
})

describe('store cart persistence wiring', () => {
  it('hydrates durable cart state and preserves transient defaults without replacing unrelated slices', () => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(persistedCartFixture))

    const baselineState = setupStore().getState()
    const store = setupProductionStore()
    const hydratedState = store.getState()

    expect(hydratedState.cart.items).toEqual(persistedCartFixture.items)
    expect(hydratedState.cart.couponCode).toBe('WELCOME15')
    expect(hydratedState.cart.currency).toBe('EUR')
    expect(hydratedState.cart.isDrawerOpen).toBe(false)
    expect(hydratedState.cart.showAddedFeedback).toBe(false)

    expect(hydratedState.auth).toEqual(baselineState.auth)
    expect(hydratedState.user).toEqual(baselineState.user)
    expect(hydratedState.checkout).toEqual(baselineState.checkout)
    expect(hydratedState.wishlist).toEqual(baselineState.wishlist)

    const storedAfterHydration = window.localStorage.getItem(CART_STORAGE_KEY)
    expect(storedAfterHydration).not.toBeNull()

    const parsed = JSON.parse(storedAfterHydration as string) as Record<string, unknown>
    expect(parsed).toHaveProperty('items')
    expect(parsed).toHaveProperty('couponCode')
    expect(parsed).toHaveProperty('currency')
    expect(parsed).not.toHaveProperty('auth')
    expect(parsed).not.toHaveProperty('user')
    expect(parsed).not.toHaveProperty('checkout')
    expect(parsed).not.toHaveProperty('wishlist')
    expect(parsed).not.toHaveProperty('isDrawerOpen')
    expect(parsed).not.toHaveProperty('showAddedFeedback')
  })
})
