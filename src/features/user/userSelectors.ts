import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/store'

export const selectUserState = (state: RootState) => state.user

export const selectCustomerAccountStats = (state: RootState) => state.user.stats

export const selectSavedAddresses = (state: RootState) => state.user.addresses

export const selectDefaultAddress = createSelector(
  [selectCustomerAccountStats, selectSavedAddresses],
  (stats, addresses) => {
    if (addresses.length === 0) {
      return undefined
    }

    if (!stats.defaultAddressId) {
      return addresses[0]
    }

    return addresses.find((address) => address.id === stats.defaultAddressId) ?? addresses[0]
  },
)
