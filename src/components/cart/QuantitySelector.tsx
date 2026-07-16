import { useTranslation } from '@/i18n'

type QuantitySelectorProps = {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
}

export function QuantitySelector({ quantity, onIncrease, onDecrease }: QuantitySelectorProps) {
  const { t } = useTranslation()

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-1">
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-[color:var(--color-text-primary)] transition hover:bg-white"
        onClick={onDecrease}
        aria-label={t('cart.decreaseQuantity')}
      >
        −
      </button>
      <span className="min-w-8 text-center text-sm font-semibold text-[color:var(--color-text-primary)]">{quantity}</span>
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-[color:var(--color-text-primary)] transition hover:bg-white"
        onClick={onIncrease}
        aria-label={t('cart.increaseQuantity')}
      >
        +
      </button>
    </div>
  )
}
