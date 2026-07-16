export type AuthRole = 'customer' | 'admin'

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'error'

export type AuthUser = {
  id: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  phone?: string
  avatarUrl?: string
  role: AuthRole
  createdAt: string
}

export type AuthState = {
  isAuthenticated: boolean
  user: AuthUser | null
  status: AuthStatus
  error: string | null
  lastRedirectPath?: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type RegisterPayload = {
  firstName: string
  lastName: string
  email: string
  phone?: string
  password: string
  confirmPassword: string
}
