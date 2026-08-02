import { screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { AccountOverview } from '@/pages/account/AccountOverview'
import { renderWithProviders } from '@/test/renderWithProviders'

beforeEach(() => {
  window.localStorage.setItem('locale', 'en')
})

describe('AccountOverview', () => {
  it('uses authenticated identity from auth slice while keeping account stats from user slice', () => {
    renderWithProviders(<AccountOverview />, {
      preloadedState: {
        auth: {
          isAuthenticated: true,
          user: {
            id: 'usr_sara',
            firstName: 'Sara',
            lastName: 'Ahmadi',
            fullName: 'Sara Ahmadi',
            email: 'sara@example.com',
            phone: '+44 7700 900123',
            role: 'customer',
            createdAt: '2026-01-20',
          },
          status: 'authenticated',
          error: null,
          lastRedirectPath: undefined,
        },
        user: {
          stats: {
            loyaltyLevel: 'Gold',
            totalOrders: 42,
            totalSpent: 12500,
            defaultAddressId: 'addr_custom_1',
          },
          addresses: [
            {
              id: 'addr_custom_1',
              title: 'Home',
              fullName: 'Another Recipient',
              phone: '+44 7700 000001',
              city: 'London',
              province: 'Greater London',
              postalCode: 'SW1A 1AA',
              fullAddress: '10 Downing Street, London',
              isDefault: true,
            },
          ],
        },
      },
    })

    expect(screen.getByText(/Welcome back,\s*Sara/i)).toBeInTheDocument()
    expect(screen.queryByText(/Elena/i)).not.toBeInTheDocument()

    expect(screen.getByText('Gold')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
    expect(screen.getByText(/12,500/)).toBeInTheDocument()
  })
})
