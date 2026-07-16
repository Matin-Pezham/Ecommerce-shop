import type { DeliveryMethod } from '@/features/checkout/types'
import { useTranslation } from '@/i18n'

type DeliveryMethodSelectorProps = {
  options: DeliveryMethod[]
  selectedId?: string
  onSelect: (method: DeliveryMethod) => void
}

export function DeliveryMethodSelector({ options, selectedId, onSelect }: DeliveryMethodSelectorProps) {
  const { t, isRtl, formatPrice } = useTranslation()

  return (
    <section className="rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-5">
      <h2 className={`text-lg font-semibold text-[color:var(--color-text-primary)] ${isRtl ? 'text-right' : ''}`}>{t('checkout.deliveryMethod')}</h2>
      <div className="mt-4 space-y-3">
        {options.map((method) => {
          const active = method.id === selectedId
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onSelect(method)}
              className={`w-full rounded-xl border px-4 py-3 text-start transition ${
                active
                  ? 'border-[color:var(--color-primary)] bg-[color:var(--color-primary)]/8'
                  : 'border-[color:var(--color-border)] bg-[color:var(--color-surface)] hover:border-[color:var(--color-primary)]/40'
              }`}
            >
              <div className={`flex items-center justify-between gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <div className={isRtl ? 'text-right' : ''}>
                  <p className="text-sm font-semibold text-[color:var(--color-text-primary)]">{method.title}</p>
                  <p className="mt-1 text-xs text-[color:var(--color-text-secondary)]">{method.description}</p>
                </div>
                <div className={isRtl ? 'text-left' : 'text-right'}>
                  <p className="text-sm font-semibold text-[color:var(--color-text-primary)]">{method.price === 0 ? t('cart.freeShipping') : formatPrice(method.price)}</p>
                  <p className="text-xs text-[color:var(--color-text-secondary)]">{method.estimatedDays}</p>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
