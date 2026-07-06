import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from '@/i18n'

type PlaceholderPageProps = {
  titleKey: string
  descriptionKey: string
  ctaHref: string
  ctaLabelKey: string
}

export function PlaceholderPage({ titleKey, descriptionKey, ctaHref, ctaLabelKey }: PlaceholderPageProps) {
  const { t, isRtl } = useTranslation()

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-2 py-16 sm:px-4">
      <div className="w-full max-w-3xl rounded-[2.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-8 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:p-10 lg:p-12">
        <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <div className="rounded-full bg-[color:var(--color-surface)] p-3 text-[color:var(--color-primary)]">
            <Sparkles size={18} />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--color-text-muted)]">
            {t('nav.placeholderBadge')}
          </p>
        </div>

        <h1 className={`mt-6 text-3xl font-semibold text-[color:var(--color-text-primary)] sm:text-4xl ${isRtl ? 'text-right' : ''}`}>
          {t(titleKey)}
        </h1>
        <p className={`mt-4 max-w-2xl text-base leading-8 text-[color:var(--color-text-secondary)] sm:text-lg ${isRtl ? 'text-right' : ''}`}>
          {t(descriptionKey)}
        </p>

        <div className={`mt-8 flex flex-wrap gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <Link
            to={ctaHref}
            className="inline-flex items-center gap-2 rounded-full btn-cta px-5 py-3 text-sm font-semibold shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5"
          >
            {t(ctaLabelKey)} <ArrowRight size={16} />
          </Link>
          <Link
            to="/home"
            className="rounded-full border border-[color:var(--color-border)] px-5 py-3 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-surface)]"
          >
            {t('notFound.goHome')}
          </Link>
        </div>
      </div>
    </section>
  )
}
