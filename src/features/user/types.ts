export type LoyaltyLevel = 'Silver' | 'Gold' | 'Platinum' | 'Emerald'

export type Address = {
  id: string
  title: string
  fullName: string
  phone: string
  city: string
  province: string
  postalCode: string
  fullAddress: string
  isDefault: boolean
}

export type CustomerAccountStats = {
  loyaltyLevel: LoyaltyLevel
  totalOrders: number
  totalSpent: number
  defaultAddressId: string | null
}

export type UserState = {
  stats: CustomerAccountStats
  addresses: Address[]
}
