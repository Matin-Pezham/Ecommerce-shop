import { Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from '@/i18n'

export function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-slate-100">
      <p className="text-sm font-medium uppercase tracking-[0.35em] text-indigo-400">404</p>
      <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{t('notFound.title')}</h1>
      <p className="mt-3 max-w-md text-sm text-slate-400">{t('notFound.description')}</p>
      <Link
        to="/home"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-400"
      >
        <Home className="h-4 w-4" />
        {t('notFound.goHome')}
      </Link>
    </div>
  )
}
