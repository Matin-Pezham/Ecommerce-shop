import { describe, expect, it } from 'vitest'
import reducer, { setDefaultAddress } from '@/features/user/userSlice'

describe('userSlice', () => {
  it('initial state contains account-domain data without duplicate identity fields', () => {
    const initialState = reducer(undefined, { type: 'unknown' })

    expect(initialState).toHaveProperty('stats')
    expect(initialState).toHaveProperty('addresses')
    expect(Object.prototype.hasOwnProperty.call(initialState, 'user')).toBe(false)
    expect(Object.prototype.hasOwnProperty.call(initialState, 'isAuthenticated')).toBe(false)
  })

  it('setDefaultAddress updates defaultAddressId and keeps exactly one default address', () => {
    const initialState = reducer(undefined, { type: 'unknown' })
    const targetAddressId = initialState.addresses[1]?.id ?? 'addr_002'

    const nextState = reducer(initialState, setDefaultAddress(targetAddressId))

    expect(nextState.stats.defaultAddressId).toBe(targetAddressId)

    const defaultAddresses = nextState.addresses.filter((address) => address.isDefault)
    expect(defaultAddresses).toHaveLength(1)
    expect(defaultAddresses[0]?.id).toBe(targetAddressId)

    const nonDefaultAddresses = nextState.addresses.filter((address) => address.id !== targetAddressId)
    expect(nonDefaultAddresses.every((address) => !address.isDefault)).toBe(true)
  })
})
