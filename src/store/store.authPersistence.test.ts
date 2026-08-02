import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { AUTH_STORAGE_KEY } from '@/features/auth/authStorage'
import { loginWithMock, logout } from '@/features/auth/authSlice'
import { setDefaultAddress } from '@/features/user/userSlice'
import type { AuthUser, LoginPayload } from '@/features/auth/types'
import { CART_STORAGE_KEY, type PersistedCartState } from '@/features/cart/cartStorage'
import { setupProductionStore, setupStore } from './store'

const authUserFixture: AuthUser = {
  id: 'usr_101',
  firstName: 'Sara',
  lastName: 'Ahmadi',
  fullName: 'Sara Ahmadi',
  email: 'sara@example.com',
  phone: '+44 7700 900123',
  role: 'customer',
  createdAt: '2026-01-20T10:00:00.000Z',
}

const loginPayloadFixture: LoginPayload = {
  email: 'sara@example.com',
  password: 'secure123',
}

const persistedCartFixture: PersistedCartState = {
  items: [
    {
      id: 'prd-9-var-green-s',
      productId: 'prd-9',
      name: 'Evening Dress',
      slug: 'evening-dress',
      brand: 'Atelier',
      image: '/assets/evening-dress-green.jpg',
      price: 320,
      compareAtPrice: 410,
      quantity: 2,
      selectedColor: 'Green',
      selectedSize: 'S',
      stock: 5,
      sku: 'ED-GRN-S',
    },
  ],
  couponCode: 'WELCOME15',
  currency: 'EUR',
}

beforeEach(() => {
  window.localStorage.clear()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('store auth persistence wiring', () => {
  it('hydrates valid persisted auth session with transient defaults intact', () => {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user: authUserFixture }))

    const baselineState = setupStore().getState()
    const store = setupProductionStore()
    const hydratedState = store.getState()

    expect(hydratedState.auth.isAuthenticated).toBe(true)
    expect(hydratedState.auth.user).toEqual(authUserFixture)
    expect(hydratedState.auth.status).toBe('authenticated')
    expect(hydratedState.auth.error).toBeNull()

    expect(hydratedState.cart).toEqual(baselineState.cart)
    expect(hydratedState.user).toEqual(baselineState.user)
    expect(hydratedState.checkout).toEqual(baselineState.checkout)
    expect(hydratedState.wishlist).toEqual(baselineState.wishlist)
  })

  it('persists a login state change in production wiring using auth key only', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')

    const store = setupProductionStore()
    store.dispatch(loginWithMock.fulfilled(authUserFixture, 'req-2', loginPayloadFixture))

    const storedAuth = window.localStorage.getItem(AUTH_STORAGE_KEY)
    expect(storedAuth).not.toBeNull()
    expect(JSON.parse(storedAuth as string)).toEqual({ user: authUserFixture })

    expect(setItemSpy).toHaveBeenCalledWith(AUTH_STORAGE_KEY, JSON.stringify({ user: authUserFixture }))
    expect(
      setItemSpy.mock.calls.some((call) => {
        const key = call[0]
        return key === CART_STORAGE_KEY
      }),
    ).toBe(false)
  })

  it('clears auth storage on logout without removing cart persistence entry', () => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(persistedCartFixture))

    const store = setupProductionStore()
    store.dispatch(loginWithMock.fulfilled(authUserFixture, 'req-3', loginPayloadFixture))

    expect(window.localStorage.getItem(AUTH_STORAGE_KEY)).not.toBeNull()

    store.dispatch(logout())

    expect(store.getState().auth.isAuthenticated).toBe(false)
    expect(window.localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull()
    expect(window.localStorage.getItem(CART_STORAGE_KEY)).toBe(JSON.stringify(persistedCartFixture))
  })

  it('does not rewrite auth storage for unrelated actions', () => {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user: authUserFixture }))

    const store = setupProductionStore()

    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')
    const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem')

    store.dispatch(setDefaultAddress('addr_002'))

    expect(setItemSpy).not.toHaveBeenCalledWith(AUTH_STORAGE_KEY, expect.any(String))
    expect(removeItemSpy).not.toHaveBeenCalledWith(AUTH_STORAGE_KEY)
  })
})
