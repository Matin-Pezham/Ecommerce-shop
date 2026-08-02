import { describe, expect, it } from 'vitest'
import { selectCheckoutSummary } from './checkoutSelectors'
import { setupStore } from '@/store'

const checkoutItems = [
  {
    id: 'item-1',
    productId: 'product-1',
    name: 'Product One',
    slug: 'product-one',
    brand: 'Brand A',
    image: '/one.jpg',
    price: 120,
    compareAtPrice: 150,
    quantity: 2,
    selectedColor: 'Blue',
    selectedSize: 'M',
    stock: 8,
    sku: 'SKU-1',
  },
]

describe('selectCheckoutSummary', () => {
  it('returns stable references when checkout inputs are unchanged', () => {
    const state = setupStore({
      cart: {
        items: checkoutItems,
        couponCode: null,
        currency: 'USD',
        isDrawerOpen: false,
        showAddedFeedback: false,
      },
      checkout: {
        customerInfo: {
          fullName: '',
          phone: '',
          email: '',
        },
        shippingAddress: {
          province: '',
          city: '',
          postalCode: '',
          fullAddress: '',
        },
        deliveryMethod: {
          id: 'standard',
          title: 'Standard',
          description: '3-5 days',
          price: 30,
          estimatedDays: '3-5 days',
        },
        paymentMethod: null,
        notes: '',
        currentStep: 'shipping',
        lastOrderId: null,
        submittedOrders: [],
      },
    }).getState()

    const firstSummary = selectCheckoutSummary(state)
    const nextState = {
      ...state,
      auth: {
        ...state.auth,
        status: 'loading' as const,
      },
    }
    const secondSummary = selectCheckoutSummary(nextState)

    expect(secondSummary).toBe(firstSummary)
    expect(firstSummary.subtotal).toBe(240)
    expect(firstSummary.discount).toBe(60)
    expect(firstSummary.shipping).toBe(30)
    expect(firstSummary.totalQuantity).toBe(2)
  })
})