import { afterEach, describe, expect, it, vi } from 'vitest'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.resetModules()
})

describe('env configuration', () => {
  it('rejects production mode without an API base URL', async () => {
    vi.stubEnv('VITE_APP_MODE', 'production')
    vi.stubEnv('VITE_API_BASE_URL', '')

    await expect(import('./env')).rejects.toThrow('VITE_API_BASE_URL is required in production mode.')
  })

  it('rejects production mode when mock API is enabled', async () => {
    vi.stubEnv('VITE_APP_MODE', 'production')
    vi.stubEnv('VITE_API_BASE_URL', 'https://api.example.com')
    vi.stubEnv('VITE_ENABLE_MOCK_API', 'true')

    await expect(import('./env')).rejects.toThrow('Mock API must be disabled in production mode.')
  })
})