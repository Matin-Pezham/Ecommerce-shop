import type { ReactNode } from 'react'

type SectionHeaderProps = {
  label?: string
  title: string
  description: string
  children?: ReactNode
}

export function SectionHeader({ label, title, description, children }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[color:var(--color-text-secondary)]">{label ?? 'Featured exhibition'}</p>
        <h2 className="max-w-[14ch] text-[clamp(2rem,3.8vw,2.9rem)] font-semibold leading-[1.03] tracking-[-0.03em] text-[color:var(--color-text-primary)]">
          {title}
        </h2>
        <p className="max-w-xl text-base leading-[1.85] text-[color:var(--color-text-secondary)] sm:text-lg">{description}</p>
      </div>
      {children}
    </div>
  )
}
