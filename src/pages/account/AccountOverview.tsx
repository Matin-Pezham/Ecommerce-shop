import { ArrowRight, Heart, MapPin, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AccountHeader } from '@/components/account/AccountHeader'
import { AccountStatCard } from '@/components/account/AccountStatCard'
import { useTranslation } from '@/i18n'
import { useAppSelector } from '@/store/hooks'
import { mockOrders } from '@/features/orders/mockOrders'

export function AccountOverview() {
  const { t, isRtl, formatPrice, formatDate, formatOrderStatus } = useTranslation()
  const { user, addresses } = useAppSelector((state) => state.user)
  const cartItems = useAppSelector((state) => state.cart.items)
  const wishlistItems = useAppSelector((state) => state.wishlist.items)
  const defaultAddress = addresses.find((address) => address.id === user.defaultAddressId) ?? addresses[0]

  return (
    <div>
      <AccountHeader
        title={`${t('account.overview.welcomeBack')}, ${user.firstName}`}
        description={t('account.overview.description')}
        action={
          <Link to="/cart" className={`inline-flex items-center gap-2 rounded-full btn-cta px-5 py-3 text-sm font-semibold shadow-[var(--shadow-soft)] transition ${isRtl ? 'flex-row-reverse' : ''}`}>
            {t('account.overview.continueShopping')} <ArrowRight size={16} />
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AccountStatCard label={t('account.overview.loyalty')} value={user.loyaltyLevel} description={t('account.overview.loyalty')} tone="accent" />
        <AccountStatCard label={t('account.overview.orders')} value={String(user.totalOrders)} description={t('account.overview.orders')} />
        <AccountStatCard label={t('account.overview.spend')} value={formatPrice(user.totalSpent)} description={t('account.overview.spend')} />
        <AccountStatCard label={t('account.overview.wishlist')} value={String(wishlistItems.length)} description={t('account.overview.wishlist')} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <div className={`flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
            <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)]">{t('account.overview.recentOrders')}</h3>
            <Link to="/account/orders" className="text-sm font-semibold text-[color:var(--color-text-secondary)] transition hover:text-[color:var(--color-primary)]">
              {t('account.overview.viewAll')}
            </Link>
          </div>
          <div className="mt-5 space-y-3">
            {mockOrders.slice(0, 2).map((order) => (
              <div key={order.id} className={`flex items-center justify-between rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/90 px-4 py-3 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                <div>
                  <p className="text-sm font-semibold text-[color:var(--color-text-primary)]">{order.orderNumber}</p>
                  <p className="text-sm text-[color:var(--color-text-secondary)]">{formatOrderStatus(order.status)} • {order.items} {t('account.orders.items')}</p>
                </div>
                <div className={isRtl ? 'text-left' : 'text-right'}>
                  <p className="text-sm font-semibold text-[color:var(--color-text-primary)]">{formatPrice(order.total)}</p>
                  <p className="text-sm text-[color:var(--color-text-secondary)]">{formatDate(order.placedAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
            <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
              <div className="rounded-full bg-[color:var(--color-surface)] p-2 text-[color:var(--color-primary)]">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[color:var(--color-text-primary)]">{t('account.overview.address')}</p>
                <p className="text-sm text-[color:var(--color-text-secondary)]">{defaultAddress?.title}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-[color:var(--color-text-secondary)]">{defaultAddress?.fullAddress}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <div className="rounded-[1.75rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-5 shadow-[var(--shadow-soft)]">
              <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                <ShoppingBag size={18} className="text-[color:var(--color-primary)]" />
                <p className="text-sm font-semibold text-[color:var(--color-text-primary)]">{t('account.overview.cart')}</p>
              </div>
              <p className="mt-3 text-2xl font-semibold text-[color:var(--color-text-primary)]">{cartItems.length}</p>
            </div>
            <div className="rounded-[1.75rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-5 shadow-[var(--shadow-soft)]">
              <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                <Heart size={18} className="text-[color:var(--color-primary)]" />
                <p className="text-sm font-semibold text-[color:var(--color-text-primary)]">{t('account.overview.wishlist')}</p>
              </div>
              <p className="mt-3 text-2xl font-semibold text-[color:var(--color-text-primary)]">{wishlistItems.length}</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-6 shadow-[var(--shadow-soft)]">
            <h3 className="text-lg font-semibold text-[color:var(--color-text-primary)]">{t('account.overview.quickActions')}</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Link to="/account/profile" className="rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/80 px-4 py-3 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:-translate-y-0.5 hover:bg-[color:var(--color-surface)]">{t('account.overview.editProfile')}</Link>
              <Link to="/account/addresses" className="rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/80 px-4 py-3 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:-translate-y-0.5 hover:bg-[color:var(--color-surface)]">{t('account.overview.addAddress')}</Link>
              <Link to="/account/orders" className="rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/80 px-4 py-3 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:-translate-y-0.5 hover:bg-[color:var(--color-surface)]">{t('account.overview.viewOrders')}</Link>
              <Link to="/cart" className="rounded-[1.25rem] border border-[color:var(--color-border)] btn-cta px-4 py-3 text-sm font-semibold transition hover:-translate-y-0.5">{t('account.overview.continueShopping')}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
