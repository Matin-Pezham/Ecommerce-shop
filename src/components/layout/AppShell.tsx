import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'
import { useLanguage } from '@/i18n'

type AppShellProps = {
  children: ReactNode
  className?: string
}

export function AppShell({ children, className }: AppShellProps) {
  const { dir, isRtl } = useLanguage()

  return (
    <div
      dir={dir}
      className={cn(
        'min-h-screen bg-[color:var(--color-background)] text-[color:var(--color-text-primary)] antialiased',
        isRtl && 'rtl',
        className,
      )}
      style={{ scrollBehavior: 'smooth' }}
    >
      {children}
    </div>
  )
}
