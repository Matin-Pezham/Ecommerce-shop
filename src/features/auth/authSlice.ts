import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { mockForgotPassword, mockLogin, mockRegister } from '@/features/auth/mockAuth'
import type { AuthState, AuthUser, LoginPayload, RegisterPayload } from '@/features/auth/types'
import { loadAuthSession, persistAuthSession } from '@/features/auth/authUtils'

const restoredUser = loadAuthSession()

const initialState: AuthState = {
  isAuthenticated: Boolean(restoredUser),
  user: restoredUser,
  status: restoredUser ? 'authenticated' : 'idle',
  error: null,
  lastRedirectPath: undefined,
}

export const loginWithMock = createAsyncThunk<AuthUser, LoginPayload, { rejectValue: string }>(
  'auth/loginWithMock',
  async (payload, thunkApi) => {
    try {
      return await mockLogin(payload)
    } catch {
      return thunkApi.rejectWithValue('auth.loginFailed')
    }
  },
)

export const registerWithMock = createAsyncThunk<AuthUser, RegisterPayload, { rejectValue: string }>(
  'auth/registerWithMock',
  async (payload, thunkApi) => {
    try {
      return await mockRegister(payload)
    } catch {
      return thunkApi.rejectWithValue('auth.registerFailed')
    }
  },
)

export const forgotPasswordWithMock = createAsyncThunk<boolean, string, { rejectValue: string }>(
  'auth/forgotPasswordWithMock',
  async (email, thunkApi) => {
    try {
      return await mockForgotPassword(email)
    } catch {
      return thunkApi.rejectWithValue('auth.forgotPasswordFailed')
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
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
      persistAuthSession(null)
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
        persistAuthSession(action.payload)
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
        persistAuthSession(action.payload)
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
