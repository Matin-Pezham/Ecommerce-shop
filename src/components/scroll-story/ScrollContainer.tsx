import { useTranslation } from '@/i18n'
import type { ReactNode, RefObject } from 'react'

type ScrollContainerProps = {
  children: ReactNode
  containerRef: RefObject<HTMLElement | null>
}

export function ScrollContainer({ children, containerRef }: ScrollContainerProps) {
  const { t } = useTranslation()

  return (
    <section
      ref={containerRef}
      aria-label={t('scroll.ariaLabel')}
      className="relative w-full overflow-hidden bg-[color:var(--color-background)]"
      style={{ height: '240vh' }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),transparent_48%),linear-gradient(180deg,rgba(255,255,255,0.9),rgba(245,242,237,0.96))]" />
      <div className="absolute left-[8%] top-[12%] h-36 w-36 rounded-full bg-white/70 blur-3xl" />
      <div className="absolute bottom-[15%] right-[8%] h-48 w-48 rounded-full bg-stone-200/70 blur-3xl" />
      {children}
    </section>
  )
}
