import { motion, type TargetAndTransition, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Container } from '@/components/layout/Container'
import { heroBackgroundVariants, heroButtonVariants, heroContainerVariants, heroProductVariants, heroTextVariants } from '@/components/sections/heroMotion'
import { useTranslation } from '@/i18n'
import { cn } from '@/utils/cn'

const floatingOrbs = [
  { className: 'left-[8%] top-[18%] h-40 w-40 bg-white/70', delay: 0 },
  { className: 'right-[12%] top-[24%] h-56 w-56 bg-stone-100/70', delay: 0.35 },
  { className: 'bottom-[12%] left-[22%] h-24 w-24 bg-neutral-200/60', delay: 0.75 },
]

function useReducedMotionPreference() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)
    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)
    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  return prefersReducedMotion
}

export function HeroSection() {
  const prefersReducedMotion = useReducedMotionPreference()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-80, 80], [6, -6]), { stiffness: 140, damping: 18 })
  const rotateY = useSpring(useTransform(x, [-80, 80], [-8, 8]), { stiffness: 140, damping: 18 })
  const translateX = useSpring(useTransform(x, [-80, 80], [-8, 8]), { stiffness: 120, damping: 18 })
  const translateY = useSpring(useTransform(y, [-80, 80], [-8, 8]), { stiffness: 120, damping: 18 })

  const productMotion: TargetAndTransition = {
    y: prefersReducedMotion ? 0 : [0, -8, 0],
    rotate: prefersReducedMotion ? 0 : [0, -1.2, 0],
    scale: prefersReducedMotion ? 1 : [1, 1.01, 1],
    transition: {
      duration: prefersReducedMotion ? 0 : 8.5,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const offsetX = event.clientX - bounds.left
    const offsetY = event.clientY - bounds.top
    const relativeX = (offsetX / bounds.width - 0.5) * 160
    const relativeY = (offsetY / bounds.height - 0.5) * 160
    x.set(relativeX)
    y.set(relativeY)
  }

  const handlePointerLeave = () => {
    x.set(0)
    y.set(0)
  }

  const { t } = useTranslation()

  return (
    <section className="relative isolate overflow-hidden bg-[color:var(--color-background)]">
      <div className="sticky top-0 z-20 w-full border-b border-white/10 bg-[linear-gradient(90deg,rgba(236,72,153,0.18),rgba(59,130,246,0.16),rgba(16,185,129,0.14))] bg-opacity-90 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-white/90">
          <span>{t('hero.launchEdition')}</span>
          <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1">{t('hero.livePreview')}</span>
        </div>
      </div>
      <motion.div
        className="absolute inset-0"
        variants={heroBackgroundVariants}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.9),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.65),transparent_24%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_40%,rgba(255,255,255,0.12))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.7),transparent_46%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.1)_100%)]" />
        {floatingOrbs.map((orb) => (
          <motion.div
            key={orb.className}
            className={cn('pointer-events-none absolute rounded-full blur-3xl', orb.className)}
            animate={prefersReducedMotion ? undefined : { y: [0, -12, 0], x: [0, 8, 0], scale: [1, 1.03, 1] }}
            transition={{ duration: 10, repeat: Infinity, delay: orb.delay, ease: 'easeInOut' }}
          />
        ))}
      </motion.div>

      <motion.div
        className="relative z-10 flex min-h-screen items-center"
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <Container className="pt-14 pb-16 sm:pt-16 sm:pb-20 lg:pt-18 lg:pb-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 xl:gap-12">
            <motion.div className="max-w-[640px]" variants={heroTextVariants}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-1.5 text-sm font-semibold text-[color:var(--color-secondary)] shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur-xl">
                <Sparkles size={14} />
                {t('hero.badge')}
              </div>
              <motion.h1
                className="max-w-[11ch] text-[clamp(3.25rem,7vw,5.75rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-[color:var(--color-text-primary)]"
                variants={heroTextVariants}
              >
                {t('hero.title')}
              </motion.h1>
              <motion.p
                className="mt-5 max-w-[560px] text-lg leading-[1.75] text-[color:var(--color-text-secondary)] sm:text-xl"
                variants={heroTextVariants}
              >
                {t('hero.description')}
              </motion.p>
              <motion.div className="mt-10 flex flex-col gap-3 sm:flex-row" variants={heroButtonVariants}>
                <a
                  href="#experience"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--color-primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_55px_rgba(17,24,39,0.14)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(17,24,39,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-primary)]"
                >
                  {t('hero.discover')}
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#story"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-6 py-3.5 text-sm font-semibold text-[color:var(--color-primary)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-[color:var(--color-card)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-primary)]"
                >
                  <Play size={16} />
                  {t('hero.watch')}
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative mx-auto flex min-h-[560px] w-full max-w-[540px] items-center justify-center"
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              variants={heroProductVariants}
              animate={productMotion}
              style={{ perspective: 1200, x: translateX, y: translateY }}
              whileHover={{ scale: 1.015, y: -4, rotate: 0.5, transition: { duration: 0.35, ease: 'easeOut' } }}
            >
              <div className="absolute inset-x-8 bottom-8 h-24 rounded-full bg-[radial-gradient(circle,rgba(15,23,42,0.12),transparent_70%)] blur-2xl" />
              <motion.div
                className="relative h-[480px] w-full rounded-[2.5rem] border border-white/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(245,242,237,0.85))] p-8 shadow-[0_30px_90px_rgba(15,23,42,0.09)] backdrop-blur-2xl sm:h-[520px]"
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 rounded-[2.5rem] border border-white/70" />
                <div className="absolute inset-x-8 top-8 h-40 rounded-full bg-white/45 blur-3xl" />
                <div className="absolute inset-x-12 top-12 h-20 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.9),transparent_70%)]" />
                <div className="absolute inset-0 rounded-[2.5rem] bg-[linear-gradient(140deg,rgba(255,255,255,0.8),transparent_24%,rgba(255,255,255,0.22))]" />
                <div className="absolute inset-x-[18%] bottom-[12%] h-24 rounded-[999px] bg-[radial-gradient(circle,rgba(15,23,42,0.25),transparent_70%)] blur-3xl" />

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--color-text-secondary)]">{t('hero.edition')}</p>
                      <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">{t('hero.productDesc')}</p>
                    </div>
                    <div className="rounded-full border border-[color:var(--color-border)] bg-white/70 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-[color:var(--color-primary)]">
                      2026
                    </div>
                  </div>

                  <div className="relative mx-auto flex h-[280px] w-[220px] items-center justify-center sm:h-[320px] sm:w-[260px]">
                    <div className="absolute h-[260px] w-[180px] rounded-[2rem] border border-[color:var(--color-border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(235,232,224,0.95))] shadow-[0_24px_70px_rgba(15,23,42,0.12)] sm:h-[300px] sm:w-[220px]" />
                    <div className="absolute h-[188px] w-[112px] rounded-[1.6rem] border border-[color:var(--color-border)] bg-[linear-gradient(160deg,#f4efe8,#d8d2c8)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:h-[220px] sm:w-[142px]" />
                    <div className="absolute h-[88px] w-[88px] rounded-full border border-white/80 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.95),rgba(240,237,231,0.6))] shadow-[0_10px_35px_rgba(15,23,42,0.12)]" />
                  </div>

                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--color-text-secondary)]">{t('hero.productTag')}</p>
                      <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">{t('hero.productDesc')}</p>
                    </div>
                    <div className="rounded-full border border-[color:var(--color-border)] bg-white/75 px-3 py-1.5 text-sm font-medium text-[color:var(--color-primary)]">
                      01 / 03
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </motion.div>

      <div className="absolute inset-x-0 bottom-6 z-20 flex justify-center">
        <a
          href="#experience"
          aria-label={t('hero.scrollLabel')}
          className="flex flex-col items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[color:var(--color-text-secondary)] transition-colors hover:text-[color:var(--color-primary)]"
        >
          <span className="h-8 w-[1px] rounded-full bg-[color:var(--color-border)]" />
          {t('hero.scroll')}
        </a>
      </div>
    </section>
  )
}
