import type { ElementType } from 'react'
import { cn } from '@/utils/cn'

type SectionBackground = 'default' | 'surface' | 'card' | 'soft'

type SectionSize = 'sm' | 'md' | 'lg' | 'xl'

type LegacySectionSpacing = 'compact' | 'default' | 'spacious'

type SectionProps<T extends ElementType = 'section'> = {
  as?: T
  children: React.ReactNode
  className?: string
  background?: SectionBackground
  size?: SectionSize
  spacing?: LegacySectionSpacing
  id?: string
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

const backgroundClassMap: Record<SectionBackground, string> = {
  default: 'bg-transparent',
  surface: 'bg-[color:var(--color-surface)]/80',
  card: 'bg-[color:var(--color-card)]/90',
  soft: 'bg-[color:var(--color-primary-soft)]/70',
}

const spacingClassMap: Record<SectionSize, string> = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-24 md:py-32',
  xl: 'py-32 md:py-40',
}

const legacySpacingMap: Record<LegacySectionSpacing, SectionSize> = {
  compact: 'sm',
  default: 'md',
  spacious: 'lg',
}

export function SectionWrapper<T extends ElementType = 'section'>({
  as,
  children,
  className,
  background = 'default',
  size,
  spacing,
  id,
  ...props
}: SectionProps<T>) {
  const Component = as ?? 'section'
  const normalizedSize = size ?? (spacing ? legacySpacingMap[spacing] : 'md')

  return (
    <Component
      id={id}
      className={cn('w-full', backgroundClassMap[background], spacingClassMap[normalizedSize], className)}
      {...props}
    >
      {children}
    </Component>
  )
}

export const Section = SectionWrapper
