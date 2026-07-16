import type { PaymentMethod } from '@/features/checkout/types'
import { useTranslation } from '@/i18n'

type PaymentMethodSelectorProps = {
  options: PaymentMethod[]
  selectedId?: string
  onSelect: (method: PaymentMethod) => void
}

export function PaymentMethodSelector({ options, selectedId, onSelect }: PaymentMethodSelectorProps) {
  const { t, isRtl } = useTranslation()

  return (
    <section className="rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-5">
      <h2 className={`text-lg font-semibold text-[color:var(--color-text-primary)] ${isRtl ? 'text-right' : ''}`}>{t('checkout.paymentMethod')}</h2>
      <p className={`mt-2 text-sm text-[color:var(--color-text-secondary)] ${isRtl ? 'text-right' : ''}`}>{t('checkout.paymentNotice')}</p>
      <div className="mt-4 space-y-3">
        {options.map((method) => {
          const active = selectedId === method.id
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
              <p className="text-sm font-semibold text-[color:var(--color-text-primary)]">{method.title}</p>
              <p className="mt-1 text-xs text-[color:var(--color-text-secondary)]">{method.description}</p>
            </button>
          )
        })}
      </div>
    </section>
  )
}
