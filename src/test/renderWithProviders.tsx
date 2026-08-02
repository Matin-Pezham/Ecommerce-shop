import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { LanguageProvider } from '@/i18n'
import type { AppStore, RootState } from '@/store'
import { setupStore } from '@/store'

export type RenderWithProvidersOptions = Omit<RenderOptions, 'wrapper'> & {
  initialRoutes?: string[]
  preloadedState?: Partial<RootState>
  store?: AppStore
}

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  })
}

export function renderWithProviders(ui: ReactElement, options: RenderWithProvidersOptions = {}) {
  const {
    initialRoutes = ['/'],
    preloadedState,
    store = setupStore(preloadedState),
    ...renderOptions
  } = options

  const queryClient = createTestQueryClient()

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={initialRoutes}>
            <LanguageProvider>{children}</LanguageProvider>
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    )
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}
