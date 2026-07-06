import { AccountHeader } from '@/components/account/AccountHeader'
import { useTranslation } from '@/i18n'
import { useAppSelector } from '@/store/hooks'

export function ProfilePage() {
  const { user } = useAppSelector((state) => state.user)
  const { t, isRtl, formatDate } = useTranslation()

  return (
    <div>
      <AccountHeader
        title={t('account.profile.title')}
        description={t('account.profile.subtitle')}
        action={<button type="button" className="rounded-full border border-[color:var(--color-border)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-surface)]">{t('account.profile.editProfile')}</button>}
      />

      <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-6 shadow-[var(--shadow-soft)]">
          <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
            <img src={user.avatarUrl} alt={user.fullName} className="h-20 w-20 rounded-full object-cover" />
            <div>
              <p className="text-lg font-semibold text-[color:var(--color-text-primary)]">{user.fullName}</p>
              <p className="text-sm text-[color:var(--color-text-secondary)]">{user.loyaltyLevel} • {t('account.overview.loyalty')}</p>
            </div>
          </div>
          <div className="mt-6 rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/90 p-4 text-sm text-[color:var(--color-text-secondary)]">
            <p>{t('account.profile.joined')} {formatDate(user.createdAt)}</p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-6 shadow-[var(--shadow-soft)]">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/90 p-4">
              <p className="text-sm font-semibold text-[color:var(--color-text-muted)]">{t('account.profile.email')}</p>
              <p className="mt-2 text-[color:var(--color-text-primary)]">{user.email}</p>
            </div>
            <div className="rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/90 p-4">
              <p className="text-sm font-semibold text-[color:var(--color-text-muted)]">{t('account.profile.phone')}</p>
              <p className="mt-2 text-[color:var(--color-text-primary)]">{user.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
