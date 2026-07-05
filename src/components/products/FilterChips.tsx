import { motion } from 'framer-motion'
import { useTranslation } from '@/i18n'
import type { ProductCategory } from '@/components/products/productTypes'

const categories: ProductCategory[] = ['New', 'Popular', 'Gaming', 'Audio', 'Accessories', 'Smart Home']

type FilterChipsProps = {
  activeCategory: ProductCategory | 'All'
  onChange: (category: ProductCategory | 'All') => void
}

export function FilterChips({ activeCategory, onChange }: FilterChipsProps) {
  const { t } = useTranslation()
  const selected = activeCategory

  return (
    <div className="flex flex-wrap gap-2" role="list" aria-label={t('filter.ariaLabel')}>
      <motion.button
        type="button"
        className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${selected === 'All' ? 'border-[color:var(--color-primary)] bg-[color:var(--color-primary)] text-white' : 'border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-primary-soft)] hover:text-[color:var(--color-primary)]'}`}
        onClick={() => onChange('All')}
      >
        {t('filter.all')}
      </motion.button>
      {categories.map((category) => (
        <motion.button
          key={category}
          type="button"
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${selected === category ? 'border-[color:var(--color-primary)] bg-[color:var(--color-primary)] text-white' : 'border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-primary-soft)] hover:text-[color:var(--color-primary)]'}`}
          onClick={() => onChange(category)}
        >
          {t(`categories.${category}`)}
        </motion.button>
      ))}
    </div>
  )
}
