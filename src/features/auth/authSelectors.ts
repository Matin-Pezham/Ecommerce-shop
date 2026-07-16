import type { RootState } from '@/store'

export const selectAuthState = (state: RootState) => state.auth

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated

export const selectAuthUser = (state: RootState) => state.auth.user

export const selectAuthStatus = (state: RootState) => state.auth.status

export const selectAuthError = (state: RootState) => state.auth.error

export const selectAuthLastRedirectPath = (state: RootState) => state.auth.lastRedirectPath
