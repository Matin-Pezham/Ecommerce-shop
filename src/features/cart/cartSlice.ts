import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { mockCartItems } from './mockCart'
import type { CartState, ProductCartItem } from './types'

const initialState: CartState = {
  items: mockCartItems,
  couponCode: null,
  currency: 'USD',
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ProductCartItem>) => {
      const existing = state.items.find((item) => item.productId === action.payload.productId)
      if (existing) {
        existing.quantity += action.payload.quantity
        existing.quantity = Math.min(existing.quantity, existing.stock)
        return
      }
      state.items.push(action.payload)
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const existing = state.items.find((item) => item.id === action.payload)
      if (existing && existing.quantity < existing.stock) {
        existing.quantity += 1
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const existing = state.items.find((item) => item.id === action.payload)
      if (existing) {
        existing.quantity = Math.max(existing.quantity - 1, 0)
        if (existing.quantity === 0) {
          state.items = state.items.filter((item) => item.id !== action.payload)
        }
      }
    },
    setQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const existing = state.items.find((item) => item.id === action.payload.id)
      if (!existing) return

      existing.quantity = Math.min(Math.max(action.payload.quantity, 0), existing.stock)
      if (existing.quantity === 0) {
        state.items = state.items.filter((item) => item.id !== action.payload.id)
      }
    },
    clearCart: (state) => {
      state.items = []
    },
    setCouponCode: (state, action: PayloadAction<string | null>) => {
      state.couponCode = action.payload
    },
  },
})

export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  setQuantity,
  clearCart,
  setCouponCode,
} = cartSlice.actions

export default cartSlice.reducer
