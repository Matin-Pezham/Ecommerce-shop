import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { loginWithMock, logout } from '@/features/auth/authSlice'
import type { AuthUser, LoginPayload } from '@/features/auth/types'
import { setupStore } from '@/store'

const loginPayloadFixture: LoginPayload = {
  email: 'sara@example.com',
  password: 'secure123',
}

const authUserFixture: AuthUser = {
  id: 'usr_101',
  firstName: 'Sara',
  lastName: 'Ahmadi',
  fullName: 'Sara Ahmadi',
  email: 'sara@example.com',
  role: 'customer',
  createdAt: '2026-01-20T10:00:00.000Z',
}

beforeEach(() => {
  window.localStorage.clear()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('authSlice reducer purity', () => {
  it('login fulfilled state update is storage-independent in setupStore', () => {
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem')
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')
    const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem')

    const store = setupStore()

    store.dispatch(loginWithMock.fulfilled(authUserFixture, 'req-1', loginPayloadFixture))

    const authState = store.getState().auth
    expect(authState.isAuthenticated).toBe(true)
    expect(authState.user).toEqual(authUserFixture)
    expect(authState.status).toBe('authenticated')

    expect(getItemSpy).not.toHaveBeenCalled()
    expect(setItemSpy).not.toHaveBeenCalled()
    expect(removeItemSpy).not.toHaveBeenCalled()
  })

  it('logout state update is storage-independent in setupStore', () => {
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem')
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')
    const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem')

    const store = setupStore({
      auth: {
        isAuthenticated: true,
        user: authUserFixture,
        status: 'authenticated',
        error: null,
        lastRedirectPath: '/account',
      },
    })

    store.dispatch(logout())

    const authState = store.getState().auth
    expect(authState.isAuthenticated).toBe(false)
    expect(authState.user).toBeNull()
    expect(authState.status).toBe('idle')

    expect(getItemSpy).not.toHaveBeenCalled()
    expect(setItemSpy).not.toHaveBeenCalled()
    expect(removeItemSpy).not.toHaveBeenCalled()
  })
})
