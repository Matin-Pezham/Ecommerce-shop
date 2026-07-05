import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from '@/i18n'
import type { ScrollPhase } from '@/components/scroll-story/scrollStoryTypes'
import type { StoryPhase } from '@/components/scroll-story/StoryTimeline'

const productNotes: Record<ScrollPhase | StoryPhase, { titleKey: string; descriptionKey: string }> = {
  abstract: {
    titleKey: 'scrollPhases.phase-1.title',
    descriptionKey: 'scrollPhases.phase-1.description',
  },
  emerging: {
    titleKey: 'scrollPhases.phase-2.title',
    descriptionKey: 'scrollPhases.phase-2.description',
  },
  revealed: {
    titleKey: 'scrollPhases.phase-3.title',
    descriptionKey: 'scrollPhases.phase-3.description',
  },
  final: {
    titleKey: 'scrollPhases.phase-4.title',
    descriptionKey: 'scrollPhases.phase-4.description',
  },
  'phase-1': {
    titleKey: 'scrollPhases.phase-1.title',
    descriptionKey: 'scrollPhases.phase-1.description',
  },
  'phase-2': {
    titleKey: 'scrollPhases.phase-2.title',
    descriptionKey: 'scrollPhases.phase-2.description',
  },
  'phase-3': {
    titleKey: 'scrollPhases.phase-3.title',
    descriptionKey: 'scrollPhases.phase-3.description',
  },
  'phase-4': {
    titleKey: 'scrollPhases.phase-4.title',
    descriptionKey: 'scrollPhases.phase-4.description',
  },
}

const sideMap: Record<ScrollPhase | StoryPhase, 'left' | 'right'> = {
  abstract: 'right',
  emerging: 'left',
  revealed: 'right',
  final: 'left',
  'phase-1': 'right',
  'phase-2': 'left',
  'phase-3': 'right',
  'phase-4': 'left',
}

type ScrollTextLayerProps = {
  phase: ScrollPhase | StoryPhase
}

export function ScrollTextLayer({ phase }: ScrollTextLayerProps) {
  const note = productNotes[phase]
  const side = sideMap[phase]
  const alignment = side === 'right' ? 'right-6 text-right md:right-10' : 'left-6 text-left md:left-10'

  const { t } = useTranslation()

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 18, x: side === 'right' ? 24 : -24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, x: 0, scale: 1, transition: { duration: 0.45 } }}
          exit={{ opacity: 0, y: -20, x: side === 'right' ? 20 : -20, transition: { duration: 0.3 } }}
          className={`absolute top-1/2 w-full max-w-[30rem] -translate-y-1/2 ${alignment}`}
        >
          <div className="rounded-[2rem] border border-white/70 bg-[linear-gradient(135deg,rgba(236,72,153,0.16),rgba(59,130,246,0.14),rgba(16,185,129,0.16))] p-6 shadow-[0_28px_70px_rgba(15,23,42,0.12)] backdrop-blur-xl text-[color:var(--color-text-primary)]">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[color:var(--color-text-secondary)]">
              {t('scroll.productInsight')}
            </p>
            <h3 className="mt-4 text-xl font-semibold leading-[1.12] text-[color:var(--color-text-primary)]">
              {t(note.titleKey)}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--color-text-secondary)]">
              {t(note.descriptionKey)}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
