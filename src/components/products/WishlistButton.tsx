import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from '@/i18n'

type WishlistButtonProps = {
  active?: boolean
  onClick?: () => void
}

export function WishlistButton({ active = false, onClick }: WishlistButtonProps) {
  const { t } = useTranslation()

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.06, y: -1 }}
      whileTap={{ scale: 0.96 }}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${active ? 'border-[color:var(--color-error)] bg-[color:var(--color-error)]/10 text-[color:var(--color-error)]' : 'border-[color:var(--color-border)] bg-white/80 text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-primary)]'}`}
      aria-label={active ? t('product.removeFromWishlist') : t('product.addToWishlist')}
    >
      <Heart size={16} fill={active ? 'currentColor' : 'none'} />
    </motion.button>
  )
}
