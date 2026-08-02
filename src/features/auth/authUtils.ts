export function sanitizeRedirectPath(path: string | null | undefined, fallback = '/account') {
  if (!path) return fallback

  try {
    const normalized = decodeURIComponent(path).trim()
    if (!normalized.startsWith('/')) return fallback
    if (normalized.startsWith('//')) return fallback
    if (normalized.includes('://')) return fallback
    return normalized
  } catch {
    return fallback
  }
}
