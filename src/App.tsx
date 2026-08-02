import { ErrorBoundary } from '@/app/ErrorBoundary'
import { QueryProvider, ReduxProvider, RouterProvider } from '@/app/providers'
import { LanguageProvider } from '@/i18n'

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ReduxProvider>
          <QueryProvider>
            <RouterProvider />
          </QueryProvider>
        </ReduxProvider>
      </LanguageProvider>
    </ErrorBoundary>
  )
}

export default App
