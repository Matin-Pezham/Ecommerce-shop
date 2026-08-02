import { screen } from '@testing-library/react'
import { useSelector, useStore } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/renderWithProviders'
import type { RootState } from '@/store'

function SmokeProbe() {
  const location = useLocation()
  const store = useStore<RootState>()
  const hasAuthSlice = useSelector((state: RootState) => typeof state.auth !== 'undefined')

  return (
    <div>
      <p>smoke-ready</p>
      <p data-testid="pathname">{location.pathname}</p>
      <p data-testid="has-redux-store">{String(Boolean(store))}</p>
      <p data-testid="has-auth-slice">{String(hasAuthSlice)}</p>
    </div>
  )
}

describe('testing infrastructure smoke test', () => {
  it('renders with routing and redux providers', () => {
    renderWithProviders(<SmokeProbe />, {
      initialRoutes: ['/smoke-check'],
    })

    expect(screen.getByText('smoke-ready')).toBeInTheDocument()
    expect(screen.getByTestId('pathname')).toHaveTextContent('/smoke-check')
    expect(screen.getByTestId('has-redux-store')).toHaveTextContent('true')
    expect(screen.getByTestId('has-auth-slice')).toHaveTextContent('true')
  })
})
