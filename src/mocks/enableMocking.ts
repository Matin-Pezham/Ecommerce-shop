import env from '@/config/env'

let hasLoggedMockInitWarning = false

export const enableMocking = async (): Promise<void> => {
  if (!env.enableMockApi) {
    return
  }

  try {
    const { worker } = await import('./browser')
    await worker.start({
      onUnhandledRequest: 'bypass',
    })
  } catch {
    if (import.meta.env.DEV && !hasLoggedMockInitWarning) {
      hasLoggedMockInitWarning = true
      console.warn('Mock API failed to initialize. Continuing without MSW interception.')
    }
  }
}
