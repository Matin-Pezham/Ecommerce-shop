import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/authSlice'
import cartReducer from '@/features/cart/cartSlice'
import checkoutReducer from '@/features/checkout/checkoutSlice'
import userReducer from '@/features/user/userSlice'
import wishlistReducer from '@/features/wishlist/wishlistSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    wishlist: wishlistReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
