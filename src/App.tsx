import { ErrorBoundary } from '@/app/ErrorBoundary'
import { QueryProvider, ReduxProvider, RouterProvider } from '@/app/providers'
import { LanguageProvider } from '@/i18n'

function App() {
  return (
    <ErrorBoundary>
      <ReduxProvider>
        <QueryProvider>
          <LanguageProvider>
            <RouterProvider />
          </LanguageProvider>
        </QueryProvider>
      </ReduxProvider>
    </ErrorBoundary>
  )
}

export default App
