import { motion } from 'framer-motion'
import { useMemo } from 'react'

type ProductImageProps = {
  label: string
  accent: string
}

export function ProductImage({ label, accent }: ProductImageProps) {
  const backgroundStyle = useMemo(
    () => ({
      background: `linear-gradient(145deg, rgba(255,255,255,0.95), rgba(240,236,228,0.85))`,
      boxShadow: `0 24px 70px ${accent}20`,
    }),
    [accent],
  )

  return (
    <motion.div
      className="relative flex h-64 items-center justify-center overflow-hidden rounded-[1.75rem] border border-white/70 p-6 sm:h-72"
      style={backgroundStyle}
      whileHover={{ y: -4, scale: 1.015, rotate: -0.75 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.7),transparent_45%)]" />
      <div className="absolute inset-x-10 bottom-6 h-14 rounded-full bg-[radial-gradient(circle,rgba(15,23,42,0.18),transparent_70%)] blur-2xl" />
      <div className="relative z-10 flex h-[70%] w-[70%] items-center justify-center rounded-[1.4rem] border border-white/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.9),rgba(233,229,220,0.9))] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
        <div className="h-[58%] w-[35%] rounded-[1.1rem] border border-[color:var(--color-border)] bg-[linear-gradient(160deg,#f4efe8,#d8d2c8)]" />
        <div className="absolute h-16 w-16 rounded-full border border-white/70 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.95),rgba(231,227,219,0.7))]" />
      </div>
      <div className="sr-only">{label}</div>
    </motion.div>
  )
}
