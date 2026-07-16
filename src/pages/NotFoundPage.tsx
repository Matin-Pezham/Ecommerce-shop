import { Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from '@/i18n'

export function NotFoundPage() {
  const { t, isRtl } = useTranslation()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[color:var(--color-background)] px-6 text-center">
      <div className="w-full max-w-2xl rounded-[2rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-8 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:p-10">
        <p className="text-sm font-medium uppercase tracking-[0.35em] text-[color:var(--color-primary)]">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-[color:var(--color-text-primary)] sm:text-5xl">{t('notFound.title')}</h1>
        <p className={isRtl ? 'mt-3 text-sm text-[color:var(--color-text-secondary)] text-right' : 'mt-3 text-sm text-[color:var(--color-text-secondary)]'}>{t('notFound.description')}</p>
      <Link
        to="/home"
        className={`mt-8 inline-flex items-center gap-2 rounded-full btn-cta px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 ${isRtl ? 'flex-row-reverse' : ''}`}
      >
        <Home className="h-4 w-4" />
        {t('notFound.goHome')}
      </Link>
      </div>
    </div>
  )
}
