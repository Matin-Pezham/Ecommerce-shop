import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  AUTH_STORAGE_KEY,
  clearPersistedAuthSession,
  loadPersistedAuthSession,
  savePersistedAuthSession,
} from '@/features/auth/authStorage'
import type { AuthState } from '@/features/auth/types'

const authenticatedStateFixture: AuthState = {
  isAuthenticated: true,
  user: {
    id: 'usr_101',
    firstName: 'Sara',
    lastName: 'Ahmadi',
    fullName: 'Sara Ahmadi',
    email: 'sara@example.com',
    phone: '+44 7700 900123',
    avatarUrl: 'https://example.com/avatar.jpg',
    role: 'customer',
    createdAt: '2026-01-20T10:00:00.000Z',
  },
  status: 'loading',
  error: 'auth.loginFailed',
  lastRedirectPath: '/account',
}

beforeEach(() => {
  window.localStorage.clear()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('authStorage', () => {
  it('stores only durable authentication session fields', () => {
    savePersistedAuthSession(authenticatedStateFixture)

    const stored = window.localStorage.getItem(AUTH_STORAGE_KEY)
    expect(stored).not.toBeNull()

    const parsed = JSON.parse(stored as string) as Record<string, unknown>
    expect(parsed).toHaveProperty('user')
    expect(parsed).not.toHaveProperty('status')
    expect(parsed).not.toHaveProperty('error')
    expect(parsed).not.toHaveProperty('lastRedirectPath')
    expect(parsed).not.toHaveProperty('isAuthenticated')
  })

  it('restores a valid persisted session', () => {
    window.localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        user: authenticatedStateFixture.user,
      }),
    )

    const loaded = loadPersistedAuthSession()
    expect(loaded).toEqual({ user: authenticatedStateFixture.user })
  })

  it('rejects malformed JSON and removes corrupted storage entry', () => {
    window.localStorage.setItem(AUTH_STORAGE_KEY, '{ malformed-json')

    const loaded = loadPersistedAuthSession()

    expect(loaded).toBeUndefined()
    expect(window.localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull()
  })

  it('rejects structurally invalid session and removes storage entry', () => {
    window.localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        user: {
          ...authenticatedStateFixture.user,
          id: '',
          role: 'super-admin',
        },
      }),
    )

    const loaded = loadPersistedAuthSession()

    expect(loaded).toBeUndefined()
    expect(window.localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull()
  })

  it('handles storage save failure safely', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota exceeded')
    })

    expect(() => savePersistedAuthSession(authenticatedStateFixture)).not.toThrow()
  })

  it('handles storage clear failure safely', () => {
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new Error('remove blocked')
    })

    expect(() => clearPersistedAuthSession()).not.toThrow()
  })
})
