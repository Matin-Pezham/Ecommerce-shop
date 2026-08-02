import { z } from 'zod'

const publicBooleanSchema = z.union([z.literal('true'), z.literal('false')]).transform((value) => value === 'true')
const appModeSchema = z.union([z.literal('demo'), z.literal('production')])

/**
 * Vite exposes unset variables as `undefined` but an explicit empty assignment
 * (e.g. `VITE_API_BASE_URL=`) comes through as an empty string. Normalize both
 * cases to `undefined` before validation so empty strings can never silently
 * become an empty Axios base URL or a falsy-but-defined flag.
 */
const normalizeEmptyString = (value: unknown): string | undefined => {
  if (typeof value !== 'string') {
    return undefined
  }

  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

const rawEnv = import.meta.env as Record<string, unknown>

const normalizedEnv = {
  VITE_APP_MODE: normalizeEmptyString(rawEnv.VITE_APP_MODE),
  VITE_API_BASE_URL: normalizeEmptyString(rawEnv.VITE_API_BASE_URL),
  VITE_ENABLE_MOCK_API: normalizeEmptyString(rawEnv.VITE_ENABLE_MOCK_API),
  VITE_ENABLE_MOCK_AUTH: normalizeEmptyString(rawEnv.VITE_ENABLE_MOCK_AUTH),
  VITE_APP_NAME: normalizeEmptyString(rawEnv.VITE_APP_NAME),
}

const publicEnvSchema = z.object({
  VITE_APP_MODE: appModeSchema.optional(),
  VITE_API_BASE_URL: z.string().url('VITE_API_BASE_URL must be a valid absolute URL.').optional(),
  VITE_ENABLE_MOCK_API: publicBooleanSchema.optional(),
  VITE_ENABLE_MOCK_AUTH: publicBooleanSchema.optional(),
  VITE_APP_NAME: z.string().optional(),
})

const parsedEnv = publicEnvSchema.parse(normalizedEnv)

// A production build only runs in "demo" mode when VITE_APP_MODE=demo is set
// explicitly. Without that explicit opt-in, any production build (npm run
// build / preview) is treated as real production and must be fully configured.
const appMode = parsedEnv.VITE_APP_MODE ?? (import.meta.env.DEV ? 'demo' : 'production')
const isDemoMode = appMode === 'demo'
const isProductionMode = appMode === 'production'

const enableMockApi = parsedEnv.VITE_ENABLE_MOCK_API ?? isDemoMode
const enableMockAuth = parsedEnv.VITE_ENABLE_MOCK_AUTH ?? isDemoMode

if (isProductionMode) {
  if (!parsedEnv.VITE_API_BASE_URL) {
    throw new Error(
      'VITE_API_BASE_URL is required in production mode. Set VITE_APP_MODE=demo for a demo build, or provide a valid API URL for production.',
    )
  }

  if (enableMockApi) {
    throw new Error('Mock API must be disabled in production mode. Set VITE_ENABLE_MOCK_API=false.')
  }

  if (enableMockAuth) {
    throw new Error('Mock authentication must be disabled in production mode. Set VITE_ENABLE_MOCK_AUTH=false.')
  }
}

const env = {
  apiBaseUrl: parsedEnv.VITE_API_BASE_URL ?? 'http://localhost:3000',
  enableMockApi,
  enableMockAuth,
  appMode,
  appName: parsedEnv.VITE_APP_NAME ?? 'Northstar Commerce',
} as const

export default env
