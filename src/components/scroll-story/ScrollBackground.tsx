import { motion } from 'framer-motion'
import type { MotionValue } from 'framer-motion'

type ScrollBackgroundProps = {
  blur: MotionValue<number>
  opacity: MotionValue<number>
}

export function ScrollBackground({ blur, opacity }: ScrollBackgroundProps) {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      style={{ opacity, filter: `blur(${blur.get()}px)` }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.72),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(255,255,255,0.56),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.7),rgba(245,242,237,0.95))]" />
      <div className="absolute inset-x-[10%] top-[18%] h-40 rounded-full bg-white/70 blur-3xl" />
      <div className="absolute bottom-[12%] right-[12%] h-56 w-56 rounded-full bg-stone-100/70 blur-3xl" />
      <div className="absolute inset-x-[16%] bottom-[6%] h-28 rounded-full bg-neutral-200/50 blur-2xl" />
    </motion.div>
  )
}
