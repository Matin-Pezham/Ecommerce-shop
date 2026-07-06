import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { WishlistItem, WishlistState } from './types'

const initialState: WishlistState = {
  items: [
    {
      id: 'wish_001',
      productId: 'prod_003',
      name: 'Silk Evening Wrap',
      slug: 'silk-evening-wrap',
      brand: 'Atelier North',
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
      price: 720,
      compareAtPrice: 900,
      selectedColor: 'Ivory',
      selectedSize: 'One Size',
    },
    {
      id: 'wish_002',
      productId: 'prod_004',
      name: 'Sculpted Leather Heels',
      slug: 'sculpted-leather-heels',
      brand: 'Atelier North',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      price: 860,
      compareAtPrice: 1040,
      selectedColor: 'Black',
      selectedSize: '38',
    },
  ],
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
