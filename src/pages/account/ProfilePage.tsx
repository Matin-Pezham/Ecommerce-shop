import { AccountHeader } from '@/components/account/AccountHeader'
import { selectAuthUser } from '@/features/auth/authSelectors'
import { selectCustomerAccountStats } from '@/features/user/userSelectors'
import { useTranslation } from '@/i18n'
import { useAppSelector } from '@/store/hooks'

export function ProfilePage() {
  const authUser = useAppSelector(selectAuthUser)
  const stats = useAppSelector(selectCustomerAccountStats)
  const { t, isRtl, formatDate } = useTranslation()

  const fullName = authUser?.fullName ?? '-'
  const email = authUser?.email ?? '-'
  const phone = authUser?.phone ?? '-'
  const role = authUser?.role ?? '-'
  const joinedDate = authUser?.createdAt ? formatDate(authUser.createdAt) : '-'

  const firstInitial = authUser?.firstName?.trim().charAt(0) ?? ''
  const lastInitial = authUser?.lastName?.trim().charAt(0) ?? ''
  const initials = `${firstInitial}${lastInitial}`.toUpperCase() || fullName.trim().charAt(0).toUpperCase() || '?'
  const avatarLabel = `${fullName} avatar`

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
            {authUser?.avatarUrl ? (
              <img src={authUser.avatarUrl} alt={fullName} className="h-20 w-20 rounded-full object-cover" />
            ) : (
              <div
                role="img"
                aria-label={avatarLabel}
                className="flex h-20 w-20 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-lg font-semibold text-[color:var(--color-text-primary)]"
              >
                {initials}
              </div>
            )}
            <div>
              <p className="text-lg font-semibold text-[color:var(--color-text-primary)]">{fullName}</p>
              <p className="text-sm text-[color:var(--color-text-secondary)]">{stats.loyaltyLevel} • {t('account.overview.loyalty')}</p>
            </div>
          </div>
          <div className="mt-6 rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/90 p-4 text-sm text-[color:var(--color-text-secondary)]">
            <p>{t('account.profile.joined')} {joinedDate}</p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-6 shadow-[var(--shadow-soft)]">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/90 p-4">
              <p className="text-sm font-semibold text-[color:var(--color-text-muted)]">{t('account.profile.email')}</p>
              <p className="mt-2 text-[color:var(--color-text-primary)]">{email}</p>
            </div>
            <div className="rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/90 p-4">
              <p className="text-sm font-semibold text-[color:var(--color-text-muted)]">{t('account.profile.phone')}</p>
              <p className="mt-2 text-[color:var(--color-text-primary)]">{phone}</p>
            </div>
            <div className="rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/90 p-4">
              <p className="text-sm font-semibold text-[color:var(--color-text-muted)]">Role</p>
              <p className="mt-2 text-[color:var(--color-text-primary)]">{role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
