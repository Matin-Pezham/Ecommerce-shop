import { Outlet } from 'react-router-dom'
import { AccountSidebar } from '@/components/account/AccountSidebar'
import { useTranslation } from '@/i18n'

export function AccountLayout() {
  const { t, isRtl } = useTranslation()

  return (
    <div className={`mx-auto flex w-full flex-col gap-6 py-8 lg:flex-row lg:gap-8 lg:py-12 ${isRtl ? 'rtl' : ''}`}>
      <div className={isRtl ? 'lg:order-2' : 'lg:order-1'}>
        <AccountSidebar />
      </div>
      <div className={`flex-1 ${isRtl ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/70 p-4 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:p-6 lg:p-8">
          <div className={`mb-6 border-b border-[color:var(--color-border)] pb-5 ${isRtl ? 'text-right' : 'text-left'}`}>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-[color:var(--color-text-muted)]">{t('account.title')}</p>
            <h1 className="mt-2 text-3xl font-semibold text-[color:var(--color-text-primary)]">{t('account.subtitle')}</h1>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
