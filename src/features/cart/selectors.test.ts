import { describe, expect, it } from 'vitest'
import { selectCartSummary } from './selectors'
import { setupStore } from '@/store'

const cartItems = [
  {
    id: 'item-1',
    productId: 'product-1',
    name: 'Product One',
    slug: 'product-one',
    brand: 'Brand A',
    image: '/one.jpg',
    price: 100,
    compareAtPrice: 140,
    quantity: 2,
    selectedColor: 'Blue',
    selectedSize: 'M',
    stock: 8,
    sku: 'SKU-1',
  },
  {
    id: 'item-2',
    productId: 'product-2',
    name: 'Product Two',
    slug: 'product-two',
    brand: 'Brand B',
    image: '/two.jpg',
    price: 50,
    compareAtPrice: 60,
    quantity: 1,
    selectedColor: 'Black',
    selectedSize: 'S',
    stock: 4,
    sku: 'SKU-2',
  },
]

describe('selectCartSummary', () => {
  it('returns stable references when the cart items are unchanged', () => {
    const state = setupStore({
      cart: {
        items: cartItems,
        couponCode: null,
        currency: 'USD',
        isDrawerOpen: false,
        showAddedFeedback: false,
      },
    }).getState()

    const firstSummary = selectCartSummary(state)
    const nextState = {
      ...state,
      auth: {
        ...state.auth,
        status: 'loading' as const,
      },
    }
    const secondSummary = selectCartSummary(nextState)

    expect(secondSummary).toBe(firstSummary)
    expect(firstSummary.subtotal).toBe(250)
    expect(firstSummary.discount).toBe(90)
    expect(firstSummary.shipping).toBe(120)
    expect(firstSummary.totalQuantity).toBe(3)
  })
})