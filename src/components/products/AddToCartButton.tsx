import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { useTranslation } from '@/i18n'

type AddToCartButtonProps = {
  label?: string
}

export function AddToCartButton({ label }: AddToCartButtonProps) {
  const { t } = useTranslation()

  return (
    <motion.button
      type="button"
      whileHover={{ y: -2, scale: 1.01, boxShadow: '0 20px 45px rgba(17, 24, 39, 0.16)' }}
      whileTap={{ scale: 0.97 }}
      className="ds-button rounded-full btn-cta px-4 py-2.5 text-sm"
    >
      <ShoppingBag size={16} />
      {label ?? t('product.addToCart')}
    </motion.button>
  )
}
