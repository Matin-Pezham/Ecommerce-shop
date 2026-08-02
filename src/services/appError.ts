export type AppErrorKind = 'bad-request' | 'network' | 'not-found' | 'server' | 'invalid-response' | 'unavailable'

export type AppError = {
  kind: AppErrorKind
  message: string
  status?: number
  code?: string
  cause?: unknown
}

export function createAppError(kind: AppErrorKind, message: string, details: Omit<AppError, 'kind' | 'message'> = {}): AppError {
  return {
    kind,
    message,
    ...details,
  }
}

export function isAppError(error: unknown): error is AppError {
  return typeof error === 'object' && error !== null && 'kind' in error && 'message' in error
}