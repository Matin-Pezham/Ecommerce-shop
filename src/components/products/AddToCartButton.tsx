import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { useTranslation } from '@/i18n'

type AddToCartButtonProps = {
  label?: string
  onClick?: () => void
  disabled?: boolean
}

export function AddToCartButton({ label, onClick, disabled = false }: AddToCartButtonProps) {
  const { t } = useTranslation()

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={{ y: -2, scale: 1.01, boxShadow: '0 20px 45px rgba(17, 24, 39, 0.16)' }}
      whileTap={{ scale: 0.97 }}
      className="ds-button rounded-full btn-cta px-4 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-60"
      aria-label={label ?? t('product.addToCart')}
    >
      <ShoppingBag size={16} />
      {label ?? t('product.addToCart')}
    </motion.button>
  )
}
