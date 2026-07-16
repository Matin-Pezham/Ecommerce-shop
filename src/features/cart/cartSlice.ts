import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { mockCartItems } from './mockCart'
import type { CartState, ProductCartItem } from './types'

const initialState: CartState = {
  items: mockCartItems,
  couponCode: null,
  currency: 'USD',
  isDrawerOpen: false,
  showAddedFeedback: false,
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
        state.isDrawerOpen = true
        state.showAddedFeedback = true
        return
      }
      state.items.push(action.payload)
      state.isDrawerOpen = true
      state.showAddedFeedback = true
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
    openCartDrawer: (state) => {
      state.isDrawerOpen = true
      state.showAddedFeedback = false
    },
    closeCartDrawer: (state) => {
      state.isDrawerOpen = false
      state.showAddedFeedback = false
    },
    toggleCartDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen
      if (!state.isDrawerOpen) {
        state.showAddedFeedback = false
      }
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
  openCartDrawer,
  closeCartDrawer,
  toggleCartDrawer,
} = cartSlice.actions

export default cartSlice.reducer
