import { motion } from 'framer-motion'
import { productCategories } from '@/data/categories'
import { getLocalizedText } from '@/features/products/productUtils'
import { useTranslation } from '@/i18n'

type FilterChipsProps = {
  activeCategory: string | 'all'
  onChange: (category: string | 'all') => void
}

export function FilterChips({ activeCategory, onChange }: FilterChipsProps) {
  const { t, locale } = useTranslation()
  const selected = activeCategory

  return (
    <div className="flex flex-wrap gap-2" role="list" aria-label={t('filter.ariaLabel')}>
      <motion.button
        type="button"
        className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${selected === 'all' ? 'border-[color:var(--color-primary)] btn-cta text-white' : 'border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-primary-soft)] hover:text-[color:var(--color-primary)]'}`}
        onClick={() => onChange('all')}
      >
        {t('filter.all')}
      </motion.button>
      {productCategories.map((category) => (
          <motion.button
          key={category.id}
          type="button"
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${selected === category.id ? 'border-[color:var(--color-primary)] btn-cta text-white' : 'border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-primary-soft)] hover:text-[color:var(--color-primary)]'}`}
          onClick={() => onChange(category.id)}
        >
          {getLocalizedText(category.name, locale)}
        </motion.button>
      ))}
    </div>
  )
}
