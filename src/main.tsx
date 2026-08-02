import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { StartupErrorFallback } from '@/app/StartupErrorFallback'
import App from './App.tsx'

const renderErrorFallback = (rootElement: HTMLElement, error: Error): void => {
  // Rendered via React only; never interpolate error content into innerHTML.
  createRoot(rootElement).render(<StartupErrorFallback error={error} />)
}

const bootstrap = async (): Promise<void> => {
  const rootElement = document.getElementById('root')
  if (!rootElement) {
    if (import.meta.env.DEV) {
      console.warn('Root element with id "root" was not found. Application did not render.')
    }
    return
  }

  try {
    // Dynamic import of enableMocking ensures environment validation failures
    // (from env.ts, transitively imported by enableMocking and downstream modules)
    // are caught inside this try/catch instead of throwing during top-level
    // module evaluation before this bootstrap function runs.
    const { enableMocking } = await import('@/mocks/enableMocking')
    await enableMocking()

    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error))
    console.error('Bootstrap error:', err)
    renderErrorFallback(rootElement, err)
  }
}

void bootstrap()
