import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authInitialState } from '@/features/auth/authSlice'
import {
  clearPersistedAuthSession,
  extractAuthUserFromSession,
  loadPersistedAuthSession,
  savePersistedAuthSession,
  type PersistedAuthSession,
} from '@/features/auth/authStorage'
import authReducer from '@/features/auth/authSlice'
import { cartInitialState } from '@/features/cart/cartSlice'
import { loadPersistedCart, savePersistedCart, type PersistedCartState } from '@/features/cart/cartStorage'
import cartReducer from '@/features/cart/cartSlice'
import type { AuthState } from '@/features/auth/types'
import type { CartState } from '@/features/cart/types'
import checkoutReducer from '@/features/checkout/checkoutSlice'
import userReducer from '@/features/user/userSlice'
import wishlistReducer from '@/features/wishlist/wishlistSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  wishlist: wishlistReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as RootState | undefined,
  })

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

type DurableAuthSnapshot = Pick<AuthState, 'isAuthenticated' | 'user'>
type DurableCartSnapshot = Pick<CartState, 'items' | 'couponCode' | 'currency'>

function buildHydratedAuthState(persistedAuthSession: PersistedAuthSession): AuthState {
  return {
    ...authInitialState,
    isAuthenticated: true,
    user: extractAuthUserFromSession(persistedAuthSession),
    status: 'authenticated',
    error: null,
  }
}

function buildHydratedCartState(persistedCart: PersistedCartState): CartState {
  return {
    ...cartInitialState,
    items: persistedCart.items,
    couponCode: persistedCart.couponCode,
    currency: persistedCart.currency,
  }
}

function buildProductionPreloadedState(preloadedState?: Partial<RootState>): Partial<RootState> | undefined {
  const persistedAuthSession = loadPersistedAuthSession()
  const persistedCart = loadPersistedCart()

  if (!persistedAuthSession && !persistedCart) {
    return preloadedState
  }

  const hydratedState: Partial<RootState> = {}

  if (persistedAuthSession) {
    hydratedState.auth = buildHydratedAuthState(persistedAuthSession)
  }

  if (persistedCart) {
    hydratedState.cart = buildHydratedCartState(persistedCart)
  }

  if (!preloadedState) {
    return hydratedState
  }

  return {
    ...hydratedState,
    ...preloadedState,
    auth: preloadedState.auth ?? hydratedState.auth,
    cart: preloadedState.cart ?? hydratedState.cart,
  }
}

function toDurableAuthSnapshot(auth: AuthState): DurableAuthSnapshot {
  return {
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
  }
}

function hasDurableAuthChanged(previous: DurableAuthSnapshot, current: DurableAuthSnapshot): boolean {
  return previous.isAuthenticated !== current.isAuthenticated || previous.user !== current.user
}

function toDurableCartSnapshot(cart: CartState): DurableCartSnapshot {
  return {
    items: cart.items,
    couponCode: cart.couponCode,
    currency: cart.currency,
  }
}

function hasDurableCartChanged(previous: DurableCartSnapshot, current: DurableCartSnapshot): boolean {
  return (
    previous.items !== current.items ||
    previous.couponCode !== current.couponCode ||
    previous.currency !== current.currency
  )
}

export function attachAuthPersistence(appStore: AppStore): () => void {
  let previousSnapshot = toDurableAuthSnapshot(appStore.getState().auth)

  return appStore.subscribe(() => {
    const currentAuthState = appStore.getState().auth
    const currentSnapshot = toDurableAuthSnapshot(currentAuthState)

    if (!hasDurableAuthChanged(previousSnapshot, currentSnapshot)) {
      return
    }

    previousSnapshot = currentSnapshot

    if (!currentAuthState.isAuthenticated || !currentAuthState.user) {
      clearPersistedAuthSession()
      return
    }

    savePersistedAuthSession(currentAuthState)
  })
}

export function attachCartPersistence(appStore: AppStore): () => void {
  let previousSnapshot = toDurableCartSnapshot(appStore.getState().cart)

  return appStore.subscribe(() => {
    const currentSnapshot = toDurableCartSnapshot(appStore.getState().cart)
    if (!hasDurableCartChanged(previousSnapshot, currentSnapshot)) {
      return
    }

    previousSnapshot = currentSnapshot
    savePersistedCart(appStore.getState().cart)
  })
}

export function setupProductionStore(preloadedState?: Partial<RootState>): AppStore {
  const hydratedPreloadedState = buildProductionPreloadedState(preloadedState)
  const appStore = setupStore(hydratedPreloadedState)
  attachAuthPersistence(appStore)
  attachCartPersistence(appStore)
  return appStore
}

export const store = setupProductionStore()
