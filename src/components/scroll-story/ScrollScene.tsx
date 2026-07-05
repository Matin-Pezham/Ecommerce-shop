import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { ScrollBackground } from '@/components/scroll-story/ScrollBackground'
import { ScrollProductVisual } from '@/components/scroll-story/ScrollProductVisual'
import { ScrollTextLayer } from '@/components/scroll-story/ScrollTextLayer'
import { scrollSectionVariants } from '@/components/scroll-story/scrollStoryVariants'
import type { ScrollStoryState } from '@/components/scroll-story/scrollStoryTypes'
import type { MotionValue } from 'framer-motion'

type ScrollSceneProps = {
  state: ScrollStoryState
  progress: MotionValue<number>
  opacity: MotionValue<number>
  scale: MotionValue<number>
  blur: MotionValue<number>
  rotate: MotionValue<number>
  y: MotionValue<number>
  glow: MotionValue<number>
  shadow: MotionValue<number>
}

export function ScrollScene({ state, opacity, scale, blur, rotate, y, glow, shadow }: ScrollSceneProps) {
  return (
    <motion.section
      className="relative isolate flex min-h-[180vh] items-start justify-center overflow-hidden bg-[color:var(--color-background)]"
      variants={scrollSectionVariants}
      initial="hidden"
      animate="visible"
    >
      <Container className="relative z-10 flex min-h-screen items-center py-20">
        <div className="relative flex min-h-[82vh] w-full items-center justify-center rounded-[2.5rem] border border-white/70 bg-white/30 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.06)] backdrop-blur-[32px] sm:p-8 lg:p-12">
          <ScrollBackground blur={blur} opacity={opacity} />
          <div className="relative z-10 flex w-full items-center justify-center">
            <ScrollProductVisual rotate={rotate} scale={scale} y={y} glow={glow} shadow={shadow} />
          </div>
          <ScrollTextLayer phase={state.phase} />
          <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-center text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[color:var(--color-text-secondary)]">
            {state.phase}
          </div>
        </div>
      </Container>
    </motion.section>
  )
}
