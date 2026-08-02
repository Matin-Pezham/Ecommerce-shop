import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { requestDemoPasswordReset, registerWithDemoAuth, signInWithDemoAuth } from '@/features/auth/authAdapter'
import type { AuthState, AuthUser, LoginPayload, RegisterPayload } from '@/features/auth/types'
import { isAppError } from '@/services/appError'

export const authInitialState: AuthState = {
  isAuthenticated: false,
  user: null,
  status: 'idle',
  error: null,
  lastRedirectPath: undefined,
}

export const loginWithMock = createAsyncThunk<AuthUser, LoginPayload, { rejectValue: string }>(
  'auth/loginWithMock',
  async (payload, thunkApi) => {
    try {
      return await signInWithDemoAuth(payload)
    } catch (error) {
      if (isAppError(error) && error.kind === 'unavailable') {
        return thunkApi.rejectWithValue('auth.demoModeOnly')
      }
      return thunkApi.rejectWithValue('auth.loginFailed')
    }
  },
)

export const registerWithMock = createAsyncThunk<AuthUser, RegisterPayload, { rejectValue: string }>(
  'auth/registerWithMock',
  async (payload, thunkApi) => {
    try {
      return await registerWithDemoAuth(payload)
    } catch (error) {
      if (isAppError(error) && error.kind === 'unavailable') {
        return thunkApi.rejectWithValue('auth.demoModeOnly')
      }
      return thunkApi.rejectWithValue('auth.registerFailed')
    }
  },
)

export const forgotPasswordWithMock = createAsyncThunk<boolean, string, { rejectValue: string }>(
  'auth/forgotPasswordWithMock',
  async (email, thunkApi) => {
    try {
      return await requestDemoPasswordReset(email)
    } catch (error) {
      if (isAppError(error) && error.kind === 'unavailable') {
        return thunkApi.rejectWithValue('auth.demoModeOnly')
      }
      return thunkApi.rejectWithValue('auth.forgotPasswordFailed')
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null
      if (state.status === 'error') {
        state.status = state.isAuthenticated ? 'authenticated' : 'idle'
      }
    },
    setLastRedirectPath: (state, action: PayloadAction<string | undefined>) => {
      state.lastRedirectPath = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.status = 'idle'
      state.error = null
      state.lastRedirectPath = undefined
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithMock.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginWithMock.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.user = action.payload
        state.status = 'authenticated'
        state.error = null
      })
      .addCase(loginWithMock.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload ?? 'auth.loginFailed'
      })
      .addCase(registerWithMock.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(registerWithMock.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.user = action.payload
        state.status = 'authenticated'
        state.error = null
      })
      .addCase(registerWithMock.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload ?? 'auth.registerFailed'
      })
      .addCase(forgotPasswordWithMock.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(forgotPasswordWithMock.fulfilled, (state) => {
        state.status = state.isAuthenticated ? 'authenticated' : 'idle'
        state.error = null
      })
      .addCase(forgotPasswordWithMock.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload ?? 'auth.forgotPasswordFailed'
      })
  },
})

export const { clearAuthError, setLastRedirectPath, logout } = authSlice.actions

export default authSlice.reducer
