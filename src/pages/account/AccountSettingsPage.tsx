import { AccountHeader } from '@/components/account/AccountHeader'
import { useTranslation } from '@/i18n'

export function AccountSettingsPage() {
  const { t } = useTranslation()

  return (
    <div>
      <AccountHeader
        title={t('account.settings.title')}
        description={t('account.settings.subtitle')}
      />

      <div className="space-y-4">
        <div className="rounded-[1.75rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-6 shadow-[var(--shadow-soft)]">
          <h3 className="text-lg font-semibold text-[color:var(--color-text-primary)]">{t('account.settings.password')}</h3>
          <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">{t('account.settings.passwordDescription')}</p>
          <button type="button" className="mt-4 rounded-full border border-[color:var(--color-border)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-surface)]">{t('account.settings.changePassword')}</button>
        </div>
        <div className="rounded-[1.75rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-6 shadow-[var(--shadow-soft)]">
          <h3 className="text-lg font-semibold text-[color:var(--color-text-primary)]">{t('account.settings.notifications')}</h3>
          <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">{t('account.settings.notificationsDescription')}</p>
          <button type="button" className="mt-4 rounded-full border border-[color:var(--color-border)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-surface)]">{t('account.settings.manageNotifications')}</button>
        </div>
        <div className="rounded-[1.75rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-6 shadow-[var(--shadow-soft)]">
          <h3 className="text-lg font-semibold text-[color:var(--color-text-primary)]">{t('account.settings.language')}</h3>
          <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">{t('account.settings.languageDescription')}</p>
          <button type="button" className="mt-4 rounded-full border border-[color:var(--color-border)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-surface)]">{t('account.settings.language')}</button>
        </div>
        <div className="rounded-[1.75rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-6 shadow-[var(--shadow-soft)]">
          <h3 className="text-lg font-semibold text-[color:var(--color-text-primary)]">{t('account.settings.privacy')}</h3>
          <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">{t('account.settings.privacyDescription')}</p>
          <button type="button" className="mt-4 rounded-full border border-[color:var(--color-border)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-surface)]">{t('account.settings.managePrivacy')}</button>
        </div>
        <div className="rounded-[1.75rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-6 shadow-[var(--shadow-soft)]">
          <h3 className="text-lg font-semibold text-[color:var(--color-text-primary)]">{t('account.settings.deleteAccount')}</h3>
          <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">{t('account.settings.deleteAccountDescription')}</p>
          <button type="button" className="mt-4 rounded-full border border-[color:var(--color-error)] px-4 py-2 text-sm font-semibold text-[color:var(--color-error)] transition hover:bg-[color:var(--color-surface)]">{t('account.settings.deleteAccountAction')}</button>
        </div>
      </div>
    </div>
  )
}
