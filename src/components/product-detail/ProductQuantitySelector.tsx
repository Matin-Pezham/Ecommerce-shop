import { Minus, Plus } from 'lucide-react'
import { useTranslation } from '@/i18n'

type ProductQuantitySelectorProps = {
  quantity: number
  onChange: (quantity: number) => void
  min?: number
  max: number
}

export function ProductQuantitySelector({ quantity, onChange, min = 1, max }: ProductQuantitySelectorProps) {
  const { t } = useTranslation()

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-[color:var(--color-text-primary)]">{t('productDetail.quantity')}</p>
      <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-1">
        <button
          type="button"
          onClick={() => onChange(Math.max(quantity - 1, min))}
          aria-label={t('cart.decreaseQuantity')}
          className="flex h-9 w-9 items-center justify-center rounded-full text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-card)]"
        >
          <Minus size={14} />
        </button>
        <span className="min-w-10 text-center text-sm font-semibold text-[color:var(--color-text-primary)]">{quantity}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(quantity + 1, max))}
          aria-label={t('cart.increaseQuantity')}
          className="flex h-9 w-9 items-center justify-center rounded-full text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-card)]"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  )
}
