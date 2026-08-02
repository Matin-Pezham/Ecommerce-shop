import { screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { ProfilePage } from '@/pages/account/ProfilePage'
import { renderWithProviders } from '@/test/renderWithProviders'

beforeEach(() => {
  window.localStorage.setItem('locale', 'en')
})

describe('ProfilePage', () => {
  it('reads identity from auth slice and loyalty from user stats', () => {
    renderWithProviders(<ProfilePage />, {
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
            avatarUrl: 'https://example.com/avatar.jpg',
            role: 'customer',
            createdAt: '2026-01-20',
          },
          status: 'authenticated',
          error: null,
          lastRedirectPath: undefined,
        },
        user: {
          stats: {
            loyaltyLevel: 'Platinum',
            totalOrders: 8,
            totalSpent: 18450,
            defaultAddressId: 'addr_001',
          },
          addresses: [],
        },
      },
    })

    expect(screen.getByText('Sara Ahmadi')).toBeInTheDocument()
    expect(screen.getByText('sara@example.com')).toBeInTheDocument()
    expect(screen.getByText('+44 7700 900123')).toBeInTheDocument()
    expect(screen.getByText(/Platinum/)).toBeInTheDocument()

    expect(screen.queryByText('Elena Moreno')).not.toBeInTheDocument()
    expect(screen.queryByText('elena@ateliernorth.com')).not.toBeInTheDocument()
  })

  it('renders accessible initials fallback when avatar is missing', () => {
    renderWithProviders(<ProfilePage />, {
      preloadedState: {
        auth: {
          isAuthenticated: true,
          user: {
            id: 'usr_sara',
            firstName: 'Sara',
            lastName: 'Ahmadi',
            fullName: 'Sara Ahmadi',
            email: 'sara@example.com',
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
            totalOrders: 2,
            totalSpent: 500,
            defaultAddressId: null,
          },
          addresses: [],
        },
      },
    })

    expect(screen.queryByRole('img', { name: 'Sara Ahmadi' })).not.toBeInTheDocument()

    const initialsFallback = screen.getByRole('img', { name: 'Sara Ahmadi avatar' })
    expect(initialsFallback).toBeInTheDocument()
    expect(initialsFallback).toHaveTextContent('SA')
  })
})
