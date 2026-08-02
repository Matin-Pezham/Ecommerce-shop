import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CART_STORAGE_KEY, loadPersistedCart, savePersistedCart, type PersistedCartState } from './cartStorage'
import type { CartState, ProductCartItem } from './types'

const cartItemFixture: ProductCartItem = {
  id: 'prd-1-var-red-m',
  productId: 'prd-1',
  name: 'Tailored Jacket',
  slug: 'tailored-jacket',
  brand: 'Atelier',
  image: '/assets/jacket-red.jpg',
  price: 240,
  compareAtPrice: 300,
  quantity: 2,
  selectedColor: 'Red',
  selectedSize: 'M',
  stock: 8,
  sku: 'TJ-RED-M',
}

beforeEach(() => {
  window.localStorage.clear()
  vi.restoreAllMocks()
})

describe('cartStorage', () => {
  it('saves only durable cart fields', () => {
    const fullCartState: CartState = {
      items: [cartItemFixture],
      couponCode: 'SAVE10',
      currency: 'USD',
      isDrawerOpen: true,
      showAddedFeedback: true,
    }

    savePersistedCart(fullCartState)

    const stored = window.localStorage.getItem(CART_STORAGE_KEY)
    expect(stored).not.toBeNull()

    const parsed = JSON.parse(stored as string) as Record<string, unknown>
    expect(parsed.items).toEqual(fullCartState.items)
    expect(parsed.couponCode).toBe('SAVE10')
    expect(parsed.currency).toBe('USD')
    expect(parsed).not.toHaveProperty('isDrawerOpen')
    expect(parsed).not.toHaveProperty('showAddedFeedback')
  })

  it('restores valid persisted cart data', () => {
    const persisted: PersistedCartState = {
      items: [
        {
          ...cartItemFixture,
          id: 'prd-1-var-blue-l',
          selectedColor: 'Blue',
          selectedSize: 'L',
          sku: 'TJ-BLU-L',
          quantity: 3,
        },
      ],
      couponCode: 'VIP20',
      currency: 'EUR',
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(persisted))

    const loaded = loadPersistedCart()

    expect(loaded).toEqual(persisted)
    expect(loaded?.items[0].selectedColor).toBe('Blue')
    expect(loaded?.items[0].selectedSize).toBe('L')
    expect(loaded?.items[0].sku).toBe('TJ-BLU-L')
    expect(loaded?.items[0].quantity).toBe(3)
    expect(loaded?.couponCode).toBe('VIP20')
    expect(loaded?.currency).toBe('EUR')
  })

  it('rejects malformed JSON and removes corrupted entry', () => {
    window.localStorage.setItem(CART_STORAGE_KEY, '{ malformed-json')

    const loaded = loadPersistedCart()

    expect(loaded).toBeUndefined()
    expect(window.localStorage.getItem(CART_STORAGE_KEY)).toBeNull()
  })

  it('rejects invalid cart shape and removes corrupted entry', () => {
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify({
        items: [
          {
            ...cartItemFixture,
            id: '',
            quantity: 0,
          },
        ],
        couponCode: null,
        currency: 'USD',
      }),
    )

    const loaded = loadPersistedCart()

    expect(loaded).toBeUndefined()
    expect(window.localStorage.getItem(CART_STORAGE_KEY)).toBeNull()
  })

  it('handles storage write failure safely', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota exceeded')
    })

    const fullCartState: CartState = {
      items: [cartItemFixture],
      couponCode: null,
      currency: 'USD',
      isDrawerOpen: false,
      showAddedFeedback: false,
    }

    expect(() => savePersistedCart(fullCartState)).not.toThrow()
    expect(setItemSpy).toHaveBeenCalled()
  })
})
