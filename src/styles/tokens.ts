export const spacingScale = [4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 96, 120] as const

export const radiusScale = {
  small: '0.375rem',
  medium: '0.75rem',
  large: '1rem',
  xl: '1.25rem',
  '2xl': '1.75rem',
  full: '9999px',
} as const

export const shadowScale = {
  soft: '0 10px 30px rgba(15, 23, 42, 0.08)',
  medium: '0 18px 48px rgba(15, 23, 42, 0.12)',
  large: '0 30px 80px rgba(15, 23, 42, 0.16)',
  floating: '0 24px 70px rgba(15, 23, 42, 0.18)',
  glass: '0 12px 40px rgba(255, 255, 255, 0.35)',
  hover: '0 14px 36px rgba(15, 23, 42, 0.14)',
} as const

export const motionTokens = {
  fast: '160ms',
  normal: '240ms',
  slow: '360ms',
  extraSlow: '560ms',
  easeOut: 'cubic-bezier(0.22, 1, 0.36, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
  hover: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
  fade: 'opacity 240ms cubic-bezier(0.22, 1, 0.36, 1)',
  scale: 'transform 240ms cubic-bezier(0.22, 1, 0.36, 1)',
  slide: 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)',
} as const

export const breakpoints = {
  mobile: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  largeDesktop: 1440,
} as const

export const semanticColors = {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  accent: 'var(--color-accent)',
  background: 'var(--color-background)',
  surface: 'var(--color-surface)',
  card: 'var(--color-card)',
  border: 'var(--color-border)',
  textPrimary: 'var(--color-text-primary)',
  textSecondary: 'var(--color-text-secondary)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  error: 'var(--color-error)',
  info: 'var(--color-info)',
} as const
