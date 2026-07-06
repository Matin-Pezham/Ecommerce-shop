import { useTranslation } from '@/i18n'

type AccountHeaderProps = {
  title: string
  description: string
  action?: React.ReactNode
}

export function AccountHeader({ title, description, action }: AccountHeaderProps) {
  const { t, isRtl } = useTranslation()

  return (
    <div className={`mb-6 flex flex-col gap-4 rounded-[1.75rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:flex-row sm:items-end sm:justify-between ${isRtl ? 'text-right' : 'text-left'}`}>
      <div className="flex-1">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[color:var(--color-text-muted)]">{t('account.header.privateAccount')}</p>
        <h2 className="mt-2 text-2xl font-semibold text-[color:var(--color-text-primary)]">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm text-[color:var(--color-text-secondary)]">{description}</p>
      </div>
      {action ? <div className={isRtl ? 'sm:text-left' : 'sm:text-right'}>{action}</div> : null}
    </div>
  )
}
