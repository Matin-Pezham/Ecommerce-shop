import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { mockAddresses, mockUser } from './mockUser'
import type { Address, User, UserState } from './types'

const initialState: UserState = {
  user: mockUser,
  addresses: mockAddresses,
  isAuthenticated: true,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    setAddresses: (state, action: PayloadAction<Address[]>) => {
      state.addresses = action.payload
    },
    setDefaultAddress: (state, action: PayloadAction<string>) => {
      state.user.defaultAddressId = action.payload
      state.addresses = state.addresses.map((address) => ({
        ...address,
        isDefault: address.id === action.payload,
      }))
    },
  },
})

export const { setUserProfile, setAddresses, setDefaultAddress } = userSlice.actions
export default userSlice.reducer
