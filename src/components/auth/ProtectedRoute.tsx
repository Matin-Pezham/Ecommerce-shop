import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { setLastRedirectPath } from '@/features/auth/authSlice'
import { selectIsAuthenticated } from '@/features/auth/authSelectors'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

type ProtectedRouteProps = {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const nextPath = `${location.pathname}${location.search}${location.hash}`

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(setLastRedirectPath(nextPath))
    }
  }, [dispatch, isAuthenticated, nextPath])

  if (!isAuthenticated) {
    const redirect = encodeURIComponent(nextPath)
    return <Navigate to={`/login?redirect=${redirect}`} replace />
  }

  return <>{children}</>
}
