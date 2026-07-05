import { motion } from 'framer-motion'
import { Clock3, Sparkles, Shield, Eye } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { useTranslation } from '@/i18n'

const bridgeItems = [
  {
    titleKey: 'bridge.cards.narrative',
    descriptionKey: 'bridge.cards.narrativeDescription',
    icon: Sparkles,
  },
  {
    titleKey: 'bridge.cards.pacing',
    descriptionKey: 'bridge.cards.pacingDescription',
    icon: Clock3,
  },
  {
    titleKey: 'bridge.cards.craftsmanship',
    descriptionKey: 'bridge.cards.craftsmanshipDescription',
    icon: Shield,
  },
  {
    titleKey: 'bridge.cards.clarity',
    descriptionKey: 'bridge.cards.clarityDescription',
    icon: Eye,
  },
]

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: index * 0.08 },
  }),
}

export function StoryBridgeSection() {
  const { t } = useTranslation()

  return (
    <motion.section
      className="relative overflow-hidden bg-[color:var(--color-surface)]"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[color:var(--color-secondary)]">
            {t('bridge.whyItMatters')}
          </p>
          <h2 className="text-[clamp(2.4rem,4.5vw,3.5rem)] font-semibold leading-[1.03] tracking-[-0.04em] text-[color:var(--color-primary)]">
            {t('bridge.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-[1.85] text-[color:var(--color-text-secondary)] sm:text-lg">
            {t('bridge.description')}
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {bridgeItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.article
                key={item.titleKey}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="group overflow-hidden rounded-[1.75rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.12)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary)] shadow-sm transition duration-300 group-hover:scale-105">
                  <Icon size={24} />
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.03em] text-[color:var(--color-text-primary)]">
                  {t(item.titleKey)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--color-text-secondary)]">
                  {t(item.descriptionKey)}
                </p>
              </motion.article>
            )
          })}
        </div>
      </Container>
    </motion.section>
  )
}
