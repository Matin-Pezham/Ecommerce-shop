import type { StoryPhase } from '@/components/scroll-story/StoryTimeline'

type StoryUIOverlayProps = {
  phase: StoryPhase
}

import { useTranslation } from '@/i18n'

export function StoryUIOverlay({ phase }: StoryUIOverlayProps) {
  const { t } = useTranslation()
  const isFinal = phase === 'phase-4'
  const titleOpacity = phase === 'phase-3' || isFinal ? 1 : 0.2
  const bodyOpacity = isFinal ? 1 : phase === 'phase-3' ? 0.75 : 0.2
  const ctaOpacity = isFinal ? 1 : 0

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="relative flex w-full max-w-6xl flex-col items-center justify-center px-6 text-center sm:px-8 lg:px-12">
        <div className="mb-4 inline-flex rounded-full border border-white/70 bg-white/70 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[color:var(--color-text-secondary)] backdrop-blur-xl" style={{ opacity: titleOpacity }}>
          {t('scroll.premiumNarrative')}
        </div>
        <h3 className="max-w-[760px] text-[clamp(2.3rem,4.2vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-[color:var(--color-text-primary)]" style={{ opacity: titleOpacity }}>
          {isFinal ? t('scroll.titleFinal') : t('scroll.title')}
        </h3>
        <p className="mt-5 max-w-[640px] text-base leading-8 text-[color:var(--color-text-secondary)] sm:text-lg" style={{ opacity: bodyOpacity }}>
          {isFinal ? t('scroll.bodyFinal') : t('scroll.body')}
        </p>
        <div className="mt-8 flex items-center gap-4 pointer-events-none" style={{ opacity: ctaOpacity }}>
          <span className="rounded-full border border-[color:var(--color-border)] bg-white/80 px-5 py-3 text-sm font-semibold text-[color:var(--color-primary)] backdrop-blur-xl">
            {t('product.priceFrom', { price: '$1,290' })}
          </span>
          <a href="#" className="pointer-events-auto rounded-full btn-cta px-6 py-3.5 text-sm font-semibold shadow-[0_20px_60px_rgba(17,24,39,0.16)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(17,24,39,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
            {t('product.exploreEdition')}
          </a>
        </div>
      </div>
    </div>
  )
}
