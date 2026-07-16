import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from '@/i18n'

type AuthLayoutProps = {
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  const { t, isRtl } = useTranslation()

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-5 shadow-[var(--shadow-soft)] sm:p-8">
        <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-[color:var(--color-primary)]/8 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-44 w-44 rounded-full bg-[color:var(--color-accent)]/10 blur-3xl" />

        <div className={`relative z-10 mx-auto max-w-xl ${isRtl ? 'text-right' : ''}`}>
          <h1 className="text-3xl font-semibold text-[color:var(--color-text-primary)]">{title}</h1>
          <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">{subtitle}</p>

          <div className="mt-6">{children}</div>

          {footer ? <div className="mt-5">{footer}</div> : null}

          <div className={`mt-6 flex ${isRtl ? 'justify-end' : 'justify-start'}`}>
            <Link
              to="/shop"
              className="rounded-full border border-[color:var(--color-border)] px-4 py-2 text-sm font-medium text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-surface)]"
            >
              {t('auth.continueShopping')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
