import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { WishlistItem, WishlistState } from './types'
import { mockWishlistItems } from './mockWishlist'

const initialState: WishlistState = {
  items: mockWishlistItems,
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const exists = state.items.some((item) => item.productId === action.payload.productId)
      if (!exists) {
        state.items.push(action.payload)
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.productId !== action.payload)
    },
  },
})

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
