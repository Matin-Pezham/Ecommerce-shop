import { motion, type MotionValue } from 'framer-motion'
import { useEffect, useState } from 'react'

type ScrollProductVisualProps = {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  y: MotionValue<number>
  glow: MotionValue<number>
  shadow: MotionValue<number>
}

export function ScrollProductVisual({ rotate, scale, y, glow, shadow }: ScrollProductVisualProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)
    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)
    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  return (
    <motion.div
      className="relative flex h-[420px] w-full max-w-[480px] items-center justify-center sm:h-[520px]"
      style={{ scale, y, rotate }}
      animate={prefersReducedMotion ? { y: 0, rotate: 0, scale: 1 } : { y: [0, -8, 0], rotate: [0, -1.2, 0], scale: [1, 1.01, 1] }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.div
        className="absolute bottom-8 h-20 w-[72%] rounded-full bg-[radial-gradient(circle,rgba(15,23,42,0.18),transparent_70%)] blur-3xl"
        style={{ opacity: shadow }}
      />
      <motion.div
        className="absolute inset-x-10 top-10 h-28 rounded-full bg-white/70 blur-3xl"
        style={{ opacity: glow }}
      />
      <motion.div
        className="relative h-[360px] w-[240px] rounded-[2.25rem] border border-white/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(240,236,228,0.92))] p-6 shadow-[0_30px_90px_rgba(15,23,42,0.09)] sm:h-[430px] sm:w-[280px]"
        style={{ boxShadow: `0 30px 90px rgba(15, 23, 42, ${shadow.get()})` }}
      >
        <div className="absolute inset-0 rounded-[2.25rem] border border-white/70" />
        <div className="absolute inset-x-[16%] top-[8%] h-20 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.85),transparent_70%)]" />
        <div className="absolute inset-x-[18%] bottom-[8%] h-24 rounded-full bg-[radial-gradient(circle,rgba(15,23,42,0.18),transparent_70%)] blur-3xl" />
        <div className="relative z-10 flex h-full flex-col items-center justify-between">
          <div className="h-24 w-24 rounded-full border border-white/80 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.95),rgba(233,229,220,0.9))] shadow-[0_10px_30px_rgba(15,23,42,0.12)]" />
          <div className="h-[55%] w-[40%] rounded-[1.5rem] border border-[color:var(--color-border)] bg-[linear-gradient(160deg,#f4efe8,#d8d2c8)]" />
          <div className="h-8 w-20 rounded-full border border-[color:var(--color-border)] bg-white/80" />
        </div>
      </motion.div>
    </motion.div>
  )
}
