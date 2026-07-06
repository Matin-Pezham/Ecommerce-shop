import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import { memo, useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { useTranslation } from '@/i18n'
import { useAppSelector } from '@/store/hooks'
import { cn } from '@/utils/cn'

type NavbarProps = {
  isScrolled?: boolean
}

const navItems = [
  { label: 'nav.home', href: '/home' },
  { label: 'nav.shop', href: '/shop' },
  { label: 'nav.collections', href: '/collections' },
  { label: 'nav.newArrivals', href: '/new-arrivals' },
  { label: 'nav.journal', href: '/journal' },
  { label: 'nav.about', href: '/about' },
]

function NavbarInner({ isScrolled = false }: NavbarProps) {
  const { t, isRtl } = useTranslation()
  const location = useLocation()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const cartItems = useAppSelector((state) => state.cart.items)
  const wishlistItems = useAppSelector((state) => state.wishlist.items)
  const { user } = useAppSelector((state) => state.user)

  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems])
  const wishlistCount = wishlistItems.length
  const pathname = location.pathname

  const isActiveRoute = (href: string) => {
    if (href === '/home') return pathname === '/home' || pathname === '/'
    if (href === '/account') return pathname.startsWith('/account')
    if (href === '/wishlist') return pathname === '/wishlist' || pathname.startsWith('/account/wishlist')
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const ctaLabel = pathname === '/cart' ? t('nav.viewCart') : t('nav.shopNow')
  const ctaHref = pathname === '/cart' ? '/cart' : '/shop'

  useEffect(() => {
    const shouldLockScroll = isMobileOpen || isSearchOpen
    document.body.style.overflow = shouldLockScroll ? 'hidden' : ''
    document.body.style.touchAction = shouldLockScroll ? 'none' : ''

    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [isMobileOpen, isSearchOpen])

  return (
    <>
      <header className={cn('sticky top-0 z-[70] w-full px-4 pb-3 pt-3 sm:px-6 lg:px-8', isScrolled && 'pb-2 pt-2')} style={{ minHeight: 'var(--header-height)' }}>
        <Container className="px-0 sm:px-0 lg:px-0">
          <nav className={cn('relative mx-auto w-full overflow-hidden rounded-[2rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/85 px-3 py-3 shadow-[var(--shadow-soft)] backdrop-blur-2xl transition-all duration-300', isScrolled && 'border-[color:var(--color-border-strong)] shadow-[var(--shadow-medium)]')} aria-label={t('nav.primaryNavigation')}>
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-[color:var(--color-primary)]/20 to-transparent" />

            <div className={cn('relative flex items-center justify-between gap-2', isRtl && 'flex-row-reverse')}>
              <Link
                to="/home"
                className="flex items-center gap-3 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-card)]/90 px-3 py-2 shadow-[0_16px_36px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(15,23,42,0.1)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full btn-cta text-sm font-semibold uppercase tracking-[0.3em] text-white">
                  N
                </div>
                <div className={cn('flex flex-col', isRtl && 'items-end')}>
                  <span className="text-[0.9rem] font-semibold tracking-[0.18em] text-[color:var(--color-text-primary)]">
                    {t('brand.name')}
                  </span>
                  <span className="text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--color-text-secondary)]">
                    {t('brand.subtitle')}
                  </span>
                </div>
              </Link>

              <div className="hidden items-center justify-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/80 px-2 py-2 lg:flex">
                {navItems.map((item) => {
                  const active = isActiveRoute(item.href)
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={cn(
                        'rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200',
                        active
                          ? 'bg-[color:var(--color-card)] text-[color:var(--color-primary)] shadow-[0_10px_28px_rgba(15,23,42,0.08)] ring-1 ring-[color:var(--color-border)]'
                          : 'text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-card)] hover:text-[color:var(--color-primary)]',
                      )}
                    >
                      {t(item.label)}
                    </Link>
                  )
                })}
              </div>

              <div className={cn('flex items-center gap-2', isRtl && 'flex-row-reverse')}>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  className="hidden h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-card)]/90 text-[color:var(--color-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] sm:inline-flex"
                  aria-label={t('nav.search')}
                >
                  <Search size={18} />
                </button>

                <Link
                  to="/account/wishlist"
                  className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-card)]/90 text-[color:var(--color-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] sm:inline-flex"
                  aria-label={t('nav.wishlist')}
                >
                  <Heart size={18} />
                  {wishlistCount > 0 ? (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full btn-cta px-1 text-[0.65rem] font-semibold text-white">
                      {wishlistCount}
                    </span>
                  ) : null}
                </Link>

                <Link
                  to="/account"
                  className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-card)]/90 text-[color:var(--color-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] sm:inline-flex"
                  aria-label={t('nav.account')}
                >
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.fullName} className="h-8 w-8 rounded-full object-cover" />
                  ) : (
                    <UserRound size={18} />
                  )}
                </Link>

                <Link
                  to="/cart"
                  className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-card)]/90 text-[color:var(--color-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] sm:inline-flex"
                  aria-label={t('nav.cart')}
                >
                  <ShoppingBag size={18} />
                  {cartCount > 0 ? (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full btn-cta px-1 text-[0.65rem] font-semibold text-white">
                      {cartCount}
                    </span>
                  ) : null}
                </Link>

                <LanguageSwitcher />

                <Link
                  to={ctaHref}
                  className="hidden rounded-full btn-cta px-4 py-2.5 text-sm font-semibold shadow-[0_12px_30px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.14)] sm:inline-flex"
                >
                  {ctaLabel}
                </Link>

                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-card)]/90 text-[color:var(--color-primary)] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-primary)] sm:hidden"
                  aria-expanded={isMobileOpen}
                  aria-label={t('nav.toggleMenu')}
                  onClick={() => setIsMobileOpen((value) => !value)}
                >
                  {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </div>
            </div>
          </nav>
        </Container>
      </header>

      <AnimatePresence>
        {isSearchOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-start justify-center bg-[color:var(--color-background)]/80 px-4 py-8 backdrop-blur-xl sm:px-6 lg:px-8"
          >
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              className={cn('w-full max-w-2xl rounded-[2rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-6 shadow-[var(--shadow-large)]', isRtl && 'text-right')}
            >
              <div className={cn('flex items-center justify-between', isRtl && 'flex-row-reverse')}>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--color-text-muted)]">{t('nav.search')}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-[color:var(--color-text-primary)]">{t('nav.searchTitle')}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="rounded-full border border-[color:var(--color-border)] p-2.5 text-[color:var(--color-text-secondary)] transition hover:bg-[color:var(--color-surface)]"
                  aria-label={t('nav.closeMenu')}
                >
                  <X size={18} />
                </button>
              </div>

              <label className={cn('mt-6 flex items-center gap-3 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/80 px-4 py-3', isRtl && 'flex-row-reverse')}>
                <Search size={18} className="text-[color:var(--color-text-secondary)]" />
                <input
                  type="search"
                  className="w-full bg-transparent text-sm text-[color:var(--color-text-primary)] outline-none placeholder:text-[color:var(--color-text-muted)]"
                  placeholder={t('nav.searchPlaceholder')}
                />
              </label>

              <div className={cn('mt-5 flex flex-wrap items-center justify-between gap-3', isRtl && 'flex-row-reverse')}>
                <p className="text-sm text-[color:var(--color-text-secondary)]">{t('nav.searchHint')}</p>
                <button type="button" className="rounded-full btn-cta px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5">
                  {t('nav.searchCta')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-[color:var(--color-background)]/85 backdrop-blur-xl"
          >
            <motion.div
              initial={{ x: isRtl ? -24 : 24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: isRtl ? -24 : 24, opacity: 0 }}
              className={cn('ml-auto h-full w-full max-w-sm border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-5 shadow-[var(--shadow-large)]', isRtl ? 'mr-auto border-r' : 'ml-auto border-l')}
            >
              <div className={cn('flex items-center justify-between', isRtl && 'flex-row-reverse')}>
                <Link to="/home" className="flex items-center gap-3" onClick={() => setIsMobileOpen(false)}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full btn-cta text-sm font-semibold uppercase tracking-[0.3em] text-white">
                    N
                  </div>
                  <div className={cn('flex flex-col', isRtl && 'items-end')}>
                    <span className="text-sm font-semibold text-[color:var(--color-text-primary)]">{t('brand.name')}</span>
                    <span className="text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--color-text-secondary)]">{t('brand.subtitle')}</span>
                  </div>
                </Link>
                <button type="button" onClick={() => setIsMobileOpen(false)} className="rounded-full border border-[color:var(--color-border)] p-2.5 text-[color:var(--color-text-secondary)]">
                  <X size={18} />
                </button>
              </div>

              <div className="mt-8 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn('flex items-center justify-between rounded-full px-4 py-3 text-sm font-medium transition', isActiveRoute(item.href) ? 'bg-[color:var(--color-surface)] text-[color:var(--color-primary)]' : 'text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-surface)] hover:text-[color:var(--color-primary)]')}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <span>{t(item.label)}</span>
                    <span className="text-[color:var(--color-text-muted)]">↗</span>
                  </Link>
                ))}
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/80 p-4">
                <div className={cn('flex items-center justify-between', isRtl && 'flex-row-reverse')}>
                  <p className="text-sm font-semibold text-[color:var(--color-text-primary)]">{t('nav.quickLinks')}</p>
                  <span className="text-xs uppercase tracking-[0.24em] text-[color:var(--color-text-muted)]">{t('nav.account')}</span>
                </div>
                <div className={cn('mt-4 flex flex-wrap gap-2', isRtl && 'flex-row-reverse')}>
                  <Link to="/account" onClick={() => setIsMobileOpen(false)} className="rounded-full border border-[color:var(--color-border)] px-3 py-2 text-sm font-medium text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-card)]">
                    {t('nav.account')}
                  </Link>
                  <Link to="/account/wishlist" onClick={() => setIsMobileOpen(false)} className="rounded-full border border-[color:var(--color-border)] px-3 py-2 text-sm font-medium text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-card)]">
                    {t('nav.wishlist')}
                  </Link>
                  <Link to="/cart" onClick={() => setIsMobileOpen(false)} className="rounded-full border border-[color:var(--color-border)] px-3 py-2 text-sm font-medium text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-card)]">
                    {t('nav.cart')}
                  </Link>
                </div>
              </div>

              <div className={cn('mt-6 flex flex-wrap items-center gap-3', isRtl && 'flex-row-reverse')}>
                <LanguageSwitcher />
                <button type="button" onClick={() => setIsMobileOpen(false)} className="rounded-full border border-[color:var(--color-border)] px-3 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-surface)]">
                  {t('nav.closeMenu')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export const Navbar = memo(NavbarInner)
