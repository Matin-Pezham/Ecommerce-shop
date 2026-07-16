import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { selectIsAuthenticated } from '@/features/auth/authSelectors'
import { useAppSelector } from '@/store/hooks'

type GuestOnlyRouteProps = {
  children: ReactNode
}

export function GuestOnlyRoute({ children }: GuestOnlyRouteProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/account" replace />
  }

  return <>{children}</>
}
