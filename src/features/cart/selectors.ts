import { calculateCartPriceSummary } from '@/features/cart/priceUtils'
import type { RootState } from '@/store'

export const selectCartItems = (state: RootState) => state.cart.items

export const selectCartIsDrawerOpen = (state: RootState) => state.cart.isDrawerOpen

export const selectCartShowAddedFeedback = (state: RootState) => state.cart.showAddedFeedback

export const selectCartSummary = (state: RootState) => calculateCartPriceSummary(state.cart.items)

export const selectCartTotalQuantity = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
