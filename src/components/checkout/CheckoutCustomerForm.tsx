import type { CustomerInfo } from '@/features/checkout/types'
import { useTranslation } from '@/i18n'

type CheckoutCustomerFormProps = {
  value: CustomerInfo
  errors: Partial<Record<keyof CustomerInfo, string>>
  onChange: (payload: Partial<CustomerInfo>) => void
}

export function CheckoutCustomerForm({ value, errors, onChange }: CheckoutCustomerFormProps) {
  const { t, isRtl } = useTranslation()

  return (
    <section className="rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-5">
      <h2 className={`text-lg font-semibold text-[color:var(--color-text-primary)] ${isRtl ? 'text-right' : ''}`}>{t('checkout.customerInfo')}</h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="space-y-1">
          <span className="text-sm text-[color:var(--color-text-secondary)]">{t('checkout.fullName')}</span>
          <input
            type="text"
            value={value.fullName}
            onChange={(event) => onChange({ fullName: event.target.value })}
            className="w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] outline-none"
          />
          {errors.fullName ? <span className="text-xs text-[color:var(--color-danger)]">{errors.fullName}</span> : null}
        </label>

        <label className="space-y-1">
          <span className="text-sm text-[color:var(--color-text-secondary)]">{t('checkout.phone')}</span>
          <input
            type="tel"
            value={value.phone}
            onChange={(event) => onChange({ phone: event.target.value })}
            className="w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] outline-none"
          />
          {errors.phone ? <span className="text-xs text-[color:var(--color-danger)]">{errors.phone}</span> : null}
        </label>

        <label className="space-y-1 sm:col-span-2">
          <span className="text-sm text-[color:var(--color-text-secondary)]">{t('checkout.email')}</span>
          <input
            type="email"
            value={value.email}
            onChange={(event) => onChange({ email: event.target.value })}
            className="w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] outline-none"
          />
        </label>
      </div>
    </section>
  )
}
