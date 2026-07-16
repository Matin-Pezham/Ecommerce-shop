import type { ShippingAddress } from '@/features/checkout/types'
import { useTranslation } from '@/i18n'

type CheckoutAddressFormProps = {
  value: ShippingAddress
  errors: Partial<Record<keyof ShippingAddress, string>>
  notes: string
  onChange: (payload: Partial<ShippingAddress>) => void
  onNotesChange: (value: string) => void
}

export function CheckoutAddressForm({ value, errors, notes, onChange, onNotesChange }: CheckoutAddressFormProps) {
  const { t, isRtl } = useTranslation()

  return (
    <section className="rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-5">
      <h2 className={`text-lg font-semibold text-[color:var(--color-text-primary)] ${isRtl ? 'text-right' : ''}`}>{t('checkout.shippingAddress')}</h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="space-y-1">
          <span className="text-sm text-[color:var(--color-text-secondary)]">{t('checkout.province')}</span>
          <input
            type="text"
            value={value.province}
            onChange={(event) => onChange({ province: event.target.value })}
            className="w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] outline-none"
          />
        </label>

        <label className="space-y-1">
          <span className="text-sm text-[color:var(--color-text-secondary)]">{t('checkout.city')}</span>
          <input
            type="text"
            value={value.city}
            onChange={(event) => onChange({ city: event.target.value })}
            className="w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] outline-none"
          />
          {errors.city ? <span className="text-xs text-[color:var(--color-danger)]">{errors.city}</span> : null}
        </label>

        <label className="space-y-1 sm:col-span-2">
          <span className="text-sm text-[color:var(--color-text-secondary)]">{t('checkout.postalCode')}</span>
          <input
            type="text"
            value={value.postalCode}
            onChange={(event) => onChange({ postalCode: event.target.value })}
            className="w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] outline-none"
          />
        </label>

        <label className="space-y-1 sm:col-span-2">
          <span className="text-sm text-[color:var(--color-text-secondary)]">{t('checkout.fullAddress')}</span>
          <textarea
            value={value.fullAddress}
            onChange={(event) => onChange({ fullAddress: event.target.value })}
            rows={3}
            className="w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] outline-none"
          />
          {errors.fullAddress ? <span className="text-xs text-[color:var(--color-danger)]">{errors.fullAddress}</span> : null}
        </label>

        <label className="space-y-1 sm:col-span-2">
          <span className="text-sm text-[color:var(--color-text-secondary)]">{t('checkout.notes')}</span>
          <textarea
            value={notes}
            onChange={(event) => onNotesChange(event.target.value)}
            rows={2}
            className="w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] outline-none"
          />
        </label>
      </div>
    </section>
  )
}
