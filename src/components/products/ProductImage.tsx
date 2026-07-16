import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'

type ProductImageProps = {
  label: string
  imageUrl: string
}

const fallbackImageUrl = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80'

export function ProductImage({ label, imageUrl }: ProductImageProps) {
  const [resolvedImage, setResolvedImage] = useState(imageUrl)

  const backgroundStyle = useMemo(
    () => ({
      background: `linear-gradient(145deg, rgba(255,255,255,0.95), rgba(240,236,228,0.85))`,
      boxShadow: '0 24px 70px rgba(17, 24, 39, 0.12)',
    }),
    [],
  )

  return (
    <motion.div
      className="relative flex h-56 items-center justify-center overflow-hidden rounded-[1.75rem] border border-white/70 p-4 sm:h-60"
      style={backgroundStyle}
      whileHover={{ y: -4, scale: 1.015, rotate: -0.75 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <img
        src={resolvedImage}
        alt={label}
        className="relative z-10 h-full w-full rounded-[1.4rem] object-cover"
        loading="lazy"
        onError={() => setResolvedImage(fallbackImageUrl)}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),transparent_45%)]" />
      <div className="absolute inset-x-10 bottom-6 h-14 rounded-full bg-[radial-gradient(circle,rgba(15,23,42,0.18),transparent_70%)] blur-2xl" />
    </motion.div>
  )
}
