import type { Address, CustomerAccountStats } from './types'

export const mockCustomerAccountStats: CustomerAccountStats = {
  loyaltyLevel: 'Platinum',
  totalOrders: 8,
  totalSpent: 18450,
  defaultAddressId: 'addr_001',
}

export const mockAddresses: Address[] = [
  {
    id: 'addr_001',
    title: 'Primary Residence',
    fullName: 'Elena Moreno',
    phone: '+1 (415) 555-0184',
    city: 'San Francisco',
    province: 'California',
    postalCode: '94105',
    fullAddress: '2801 Jackson Street, Apt 12, San Francisco, CA 94105',
    isDefault: true,
  },
  {
    id: 'addr_002',
    title: 'Office',
    fullName: 'Elena Moreno',
    phone: '+1 (415) 555-0184',
    city: 'Palo Alto',
    province: 'California',
    postalCode: '94301',
    fullAddress: '88 Hamilton Avenue, Suite 600, Palo Alto, CA 94301',
    isDefault: false,
  },
]
