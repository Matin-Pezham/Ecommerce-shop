import type { ElementType } from 'react'
import { cn } from '@/utils/cn'

type GridColumns = 1 | 2 | 3 | 4

type GridProps<T extends ElementType = 'div'> = {
  as?: T
  children: React.ReactNode
  className?: string
  columns?: GridColumns
  gap?: 'sm' | 'md' | 'lg'
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export function Grid<T extends ElementType = 'div'>({
  as,
  children,
  className,
  columns = 2,
  gap = 'md',
  ...props
}: GridProps<T>) {
  const Component = as ?? 'div'

  const columnClassMap: Record<GridColumns, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4',
  }

  const gapClassMap = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  } as const

  return (
    <Component className={cn('grid', columnClassMap[columns], gapClassMap[gap], className)} {...props}>
      {children}
    </Component>
  )
}
