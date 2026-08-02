import { describe, expect, it } from 'vitest'
import reducer, { addItem } from './cartSlice'
import type { CartState, ProductCartItem } from './types'

function createCartState(items: ProductCartItem[]): CartState {
  return {
    items,
    couponCode: null,
    currency: 'USD',
    isDrawerOpen: false,
    showAddedFeedback: false,
  }
}

const hoodieBlueM: ProductCartItem = {
  id: 'p-hoodie-v-blue-m',
  productId: 'p-hoodie',
  name: 'Studio Hoodie',
  slug: 'studio-hoodie',
  brand: 'Atelier',
  image: '/img/hoodie-blue.jpg',
  price: 120,
  compareAtPrice: 150,
  quantity: 1,
  selectedColor: 'Blue',
  selectedSize: 'M',
  stock: 3,
  sku: 'HOOD-BLU-M',
}

const hoodieBlackL: ProductCartItem = {
  id: 'p-hoodie-v-black-l',
  productId: 'p-hoodie',
  name: 'Studio Hoodie',
  slug: 'studio-hoodie',
  brand: 'Atelier',
  image: '/img/hoodie-black.jpg',
  price: 120,
  compareAtPrice: 150,
  quantity: 2,
  selectedColor: 'Black',
  selectedSize: 'L',
  stock: 10,
  sku: 'HOOD-BLK-L',
}

describe('cartSlice addItem identity handling', () => {
  it('merges an identical cart line by id and caps quantity by stock', () => {
    const initialState = createCartState([
      {
        ...hoodieBlueM,
        quantity: 2,
        stock: 3,
      },
    ])

    const nextState = reducer(
      initialState,
      addItem({
        ...hoodieBlueM,
        quantity: 2,
      }),
    )

    expect(nextState.items).toHaveLength(1)
    expect(nextState.items[0].quantity).toBe(3)
    expect(nextState.isDrawerOpen).toBe(true)
    expect(nextState.showAddedFeedback).toBe(true)
  })

  it('keeps different variants of the same product as separate lines', () => {
    const initialState = createCartState([
      {
        ...hoodieBlueM,
        quantity: 1,
      },
    ])

    const nextState = reducer(initialState, addItem(hoodieBlackL))

    expect(nextState.items).toHaveLength(2)

    const blueLine = nextState.items.find((item) => item.id === hoodieBlueM.id)
    const blackLine = nextState.items.find((item) => item.id === hoodieBlackL.id)

    expect(blueLine).toBeDefined()
    expect(blackLine).toBeDefined()
    expect(blueLine?.quantity).toBe(1)
    expect(blackLine?.quantity).toBe(2)
    expect(blueLine?.sku).toBe('HOOD-BLU-M')
    expect(blueLine?.selectedColor).toBe('Blue')
    expect(blueLine?.selectedSize).toBe('M')
    expect(blackLine?.sku).toBe('HOOD-BLK-L')
    expect(blackLine?.selectedColor).toBe('Black')
    expect(blackLine?.selectedSize).toBe('L')
  })

  it('applies stock cap only to the matching variant id', () => {
    const initialState = createCartState([
      {
        ...hoodieBlueM,
        quantity: 2,
        stock: 3,
      },
      {
        ...hoodieBlackL,
        quantity: 2,
        stock: 10,
      },
    ])

    const nextState = reducer(
      initialState,
      addItem({
        ...hoodieBlueM,
        quantity: 5,
      }),
    )

    const blueLine = nextState.items.find((item) => item.id === hoodieBlueM.id)
    const blackLine = nextState.items.find((item) => item.id === hoodieBlackL.id)

    expect(blueLine?.quantity).toBe(3)
    expect(blackLine?.quantity).toBe(2)
    expect(blackLine?.sku).toBe('HOOD-BLK-L')
  })
})
