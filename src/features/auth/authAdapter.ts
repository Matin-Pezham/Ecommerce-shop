import env from '@/config/env'
import { createAppError } from '@/services/appError'
import { mockForgotPassword, mockLogin, mockRegister } from './mockAuth'
import type { LoginPayload, RegisterPayload } from './types'

function ensureDemoAuthEnabled() {
  if (!env.enableMockAuth) {
    throw createAppError('unavailable', 'Demo authentication is disabled in production mode.')
  }
}

export async function signInWithDemoAuth(payload: LoginPayload) {
  ensureDemoAuthEnabled()
  return mockLogin(payload)
}

export async function registerWithDemoAuth(payload: RegisterPayload) {
  ensureDemoAuthEnabled()
  return mockRegister(payload)
}

export async function requestDemoPasswordReset(email: string) {
  ensureDemoAuthEnabled()
  return mockForgotPassword(email)
}