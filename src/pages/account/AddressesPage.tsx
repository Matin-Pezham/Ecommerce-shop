import { AccountHeader } from '@/components/account/AccountHeader'
import { useTranslation } from '@/i18n'
import { useAppSelector } from '@/store/hooks'

export function AddressesPage() {
  const { addresses } = useAppSelector((state) => state.user)
  const { t, isRtl } = useTranslation()

  return (
    <div>
      <AccountHeader
        title={t('account.addresses.title')}
        description={t('account.addresses.subtitle')}
        action={<button type="button" className="rounded-full btn-cta px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5">{t('account.addresses.addAddress')}</button>}
      />

      <div className="space-y-4">
        {addresses.map((address) => (
          <div key={address.id} className="rounded-[1.75rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-6 shadow-[var(--shadow-soft)]">
            <div className={`flex flex-wrap items-center justify-between gap-3 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
              <div>
                <p className="text-lg font-semibold text-[color:var(--color-text-primary)]">{address.title}</p>
                <p className="text-sm text-[color:var(--color-text-secondary)]">{address.fullName}</p>
              </div>
              {address.isDefault ? <span className="rounded-full bg-[color:var(--color-primary-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--color-primary)]">{t('account.addresses.default')}</span> : null}
            </div>
            <p className="mt-4 text-sm text-[color:var(--color-text-secondary)]">{address.fullAddress}</p>
            <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">{address.city}, {address.province} {address.postalCode}</p>
            <div className={`mt-5 flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <button type="button" className="rounded-full border border-[color:var(--color-border)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-surface)]">{t('account.addresses.edit')}</button>
              <button type="button" className="rounded-full border border-[color:var(--color-error)] px-4 py-2 text-sm font-semibold text-[color:var(--color-error)] transition hover:bg-[color:var(--color-surface)]">{t('account.addresses.delete')}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
