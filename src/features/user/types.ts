export type UserRole = 'customer' | 'admin'

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

export type User = {
  id: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  phone: string
  avatarUrl: string
  createdAt: string
  role: UserRole
  loyaltyLevel: LoyaltyLevel
  totalOrders: number
  totalSpent: number
  defaultAddressId: string
}

export type UserState = {
  user: User
  addresses: Address[]
  isAuthenticated: boolean
}
