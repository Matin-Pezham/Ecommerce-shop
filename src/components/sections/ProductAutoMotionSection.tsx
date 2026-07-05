import { Play } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { useTranslation } from '@/i18n'

export function ProductAutoMotionSection() {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden bg-[color:var(--color-surface)]">
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-[linear-gradient(135deg,rgba(59,130,246,0.18),rgba(236,72,153,0.16),rgba(16,185,129,0.18))] p-8 shadow-[0_30px_90px_rgba(15,23,42,0.08)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,249,215,0.22),transparent_28%)]" />
            <div className="relative flex h-[22rem] items-center justify-center">
              <div className="absolute inset-0 rounded-[2rem] border border-white/70 bg-black/10" />
              <div className="relative z-10 flex h-full w-full items-center justify-center rounded-[2rem] border border-white/20 bg-black/10 px-6">
                <div className="flex h-full w-full flex-col items-center justify-center gap-6 text-center text-white">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/15 shadow-[0_18px_40px_rgba(15,23,42,0.18)]">
                    <Play size={32} className="text-white" />
                  </div>
                  <div className="max-w-[22rem] text-sm leading-7 text-white/85">
                    {t('film.description')}
                  </div>
                  <div className="rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.32em] text-white/75">
                    {t('film.status')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4 text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[color:var(--color-secondary)]">
              {t('film.label')}
            </p>
            <h3 className="text-3xl font-semibold tracking-[-0.03em] text-[color:var(--color-primary)]">
              {t('film.heading')}
            </h3>
            <p className="max-w-xl text-base leading-7 text-[color:var(--color-text-secondary)] sm:text-lg">
              {t('film.description')}
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
