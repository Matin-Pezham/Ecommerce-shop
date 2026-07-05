import { motion } from 'framer-motion'
import { useTranslation } from '@/i18n'

type QuickViewButtonProps = {
  label?: string
}

export function QuickViewButton({ label }: QuickViewButtonProps) {
  const { t } = useTranslation()

  return (
    <motion.button
      type="button"
      whileHover={{ y: -2, scale: 1.01, boxShadow: '0 16px 40px rgba(15, 23, 42, 0.08)' }}
      whileTap={{ scale: 0.97 }}
      className="ds-button rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-2 text-sm text-[color:var(--color-primary)] hover:bg-[color:var(--color-card)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-primary)]"
    >
      {label ?? t('product.quickView')}
    </motion.button>
  )
}
