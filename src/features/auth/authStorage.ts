import { z } from 'zod'
import type { AuthState, AuthUser } from '@/features/auth/types'

export const AUTH_STORAGE_KEY = 'northstar.auth.session'

const persistedAuthUserSchema = z.object({
  id: z.string().trim().min(1),
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  email: z.string().trim().min(1).email(),
  phone: z.string().optional(),
  avatarUrl: z.string().optional(),
  role: z.enum(['customer', 'admin']),
  createdAt: z
    .string()
    .min(1)
    .refine((value) => !Number.isNaN(Date.parse(value))),
})

const persistedAuthSessionSchema = z.object({
  user: persistedAuthUserSchema,
})

export type PersistedAuthSession = z.infer<typeof persistedAuthSessionSchema>

function getStorage(): Storage | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    return window.localStorage
  } catch {
    return null
  }
}

function removeCorruptedSession(storage: Storage): void {
  try {
    storage.removeItem(AUTH_STORAGE_KEY)
  } catch {
    // Ignore cleanup failures to avoid crashing application flow.
  }
}

function toPersistedAuthSession(state: AuthState): PersistedAuthSession | null {
  if (!state.isAuthenticated || !state.user) {
    return null
  }

  return {
    user: state.user,
  }
}

export function loadPersistedAuthSession(): PersistedAuthSession | undefined {
  const storage = getStorage()
  if (!storage) {
    return undefined
  }

  const rawValue = storage.getItem(AUTH_STORAGE_KEY)
  if (!rawValue) {
    return undefined
  }

  let parsedValue: unknown
  try {
    parsedValue = JSON.parse(rawValue)
  } catch {
    removeCorruptedSession(storage)
    return undefined
  }

  const parseResult = persistedAuthSessionSchema.safeParse(parsedValue)
  if (!parseResult.success) {
    removeCorruptedSession(storage)
    return undefined
  }

  return parseResult.data
}

export function savePersistedAuthSession(state: AuthState): void {
  const storage = getStorage()
  if (!storage) {
    return
  }

  const persistedSession = toPersistedAuthSession(state)
  if (!persistedSession) {
    clearPersistedAuthSession()
    return
  }

  try {
    storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(persistedSession))
  } catch {
    // Ignore write failures to keep Redux dispatch flow safe.
  }
}

export function clearPersistedAuthSession(): void {
  const storage = getStorage()
  if (!storage) {
    return
  }

  try {
    storage.removeItem(AUTH_STORAGE_KEY)
  } catch {
    // Ignore removal failures to keep Redux dispatch flow safe.
  }
}

export function extractAuthUserFromSession(session: PersistedAuthSession): AuthUser {
  return session.user
}
