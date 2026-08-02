import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { mockAddresses, mockCustomerAccountStats } from './mockUser'
import type { Address, UserState } from './types'

const initialState: UserState = {
  stats: mockCustomerAccountStats,
  addresses: mockAddresses,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAddresses: (state, action: PayloadAction<Address[]>) => {
      state.addresses = action.payload
    },
    setDefaultAddress: (state, action: PayloadAction<string>) => {
      state.stats.defaultAddressId = action.payload
      state.addresses = state.addresses.map((address) => ({
        ...address,
        isDefault: address.id === action.payload,
      }))
    },
  },
})

export const { setAddresses, setDefaultAddress } = userSlice.actions
export default userSlice.reducer
