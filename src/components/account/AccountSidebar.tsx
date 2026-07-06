import { Heart, MapPin, Package, Settings, Sparkles, UserRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from '@/i18n'
import { cn } from '@/utils/cn'

export function AccountSidebar() {
  const { t, isRtl } = useTranslation()

  const items = [
    { to: '/account', label: t('account.sidebar.overview'), icon: Sparkles },
    { to: '/account/profile', label: t('account.sidebar.profile'), icon: UserRound },
    { to: '/account/addresses', label: t('account.sidebar.addresses'), icon: MapPin },
    { to: '/account/orders', label: t('account.sidebar.orders'), icon: Package },
    { to: '/account/wishlist', label: t('account.sidebar.wishlist'), icon: Heart },
    { to: '/account/settings', label: t('account.sidebar.settings'), icon: Settings },
  ]

  return (
    <aside className="w-full lg:w-72">
      <div className="rounded-[1.75rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-3 shadow-[var(--shadow-soft)] backdrop-blur-xl">
        <div className="mb-3 rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/90 p-4">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--color-text-muted)]">
            {t('account.header.customerArea')}
          </p>
          <p className="mt-2 text-sm font-semibold text-[color:var(--color-text-primary)]">
            {t('account.header.customerAreaSubtitle')}
          </p>
        </div>

        <nav className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible" aria-label="Account navigation">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/account'}
              className={({ isActive }) =>
                cn(
                  'flex min-w-max items-center gap-3 rounded-full px-4 py-3 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-[linear-gradient(135deg,rgba(15,23,42,0.95),rgba(92,122,158,0.9))] text-white shadow-[var(--shadow-soft)]'
                    : 'text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-primary-soft)] hover:text-[color:var(--color-primary)]',
                  isRtl ? 'flex-row-reverse justify-end text-right' : 'flex-row',
                )
              }
            >
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  )
}
