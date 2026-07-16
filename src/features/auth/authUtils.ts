import type { AuthUser } from '@/features/auth/types'

const AUTH_STORAGE_KEY = 'northstar.auth.session'

type StoredAuthSession = {
  user: AuthUser
}

function getLocalStorage() {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage
  } catch {
    return null
  }
}

export function persistAuthSession(user: AuthUser | null) {
  const storage = getLocalStorage()
  if (!storage) return

  try {
    if (!user) {
      storage.removeItem(AUTH_STORAGE_KEY)
      return
    }

    const session: StoredAuthSession = { user }
    storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
  } catch {
    // Ignore persistence failures in mock mode.
  }
}

export function loadAuthSession(): AuthUser | null {
  const storage = getLocalStorage()
  if (!storage) return null

  try {
    const raw = storage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw) as Partial<StoredAuthSession>
    if (!parsed || typeof parsed !== 'object' || !parsed.user) return null

    const { user } = parsed
    if (
      typeof user.id !== 'string' ||
      typeof user.firstName !== 'string' ||
      typeof user.lastName !== 'string' ||
      typeof user.fullName !== 'string' ||
      typeof user.email !== 'string' ||
      (user.role !== 'customer' && user.role !== 'admin') ||
      typeof user.createdAt !== 'string'
    ) {
      return null
    }

    return user
  } catch {
    return null
  }
}

export function sanitizeRedirectPath(path: string | null | undefined, fallback = '/account') {
  if (!path) return fallback

  try {
    const normalized = decodeURIComponent(path).trim()
    if (!normalized.startsWith('/')) return fallback
    if (normalized.startsWith('//')) return fallback
    if (normalized.includes('://')) return fallback
    return normalized
  } catch {
    return fallback
  }
}
