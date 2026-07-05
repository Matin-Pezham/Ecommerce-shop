import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { memo, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { useTranslation } from '@/i18n'
import { cn } from '@/utils/cn'

type NavbarProps = {
  isScrolled?: boolean
}

const navItems = [
  { label: 'nav.studio', href: '/studio' },
  { label: 'nav.craft', href: '/craft' },
  { label: 'nav.journal', href: '/journal' },
  { label: 'nav.about', href: '/about' },
]

function NavbarInner({ isScrolled = false }: NavbarProps) {
  const { t, isRtl } = useTranslation()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const navClassName = useMemo(
    () =>
      cn(
        'relative sticky top-4 z-50 mx-auto mt-4 w-full max-w-[1320px] overflow-hidden rounded-[1.75rem] border border-[color:var(--color-border-strong)] bg-white/85 px-4 py-3 shadow-[0_22px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 ease-out',
        isScrolled && 'scale-[0.992] py-2 shadow-[0_22px_80px_rgba(15,23,42,0.12)] bg-white/95',
      ),
    [isScrolled],
  )

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent px-4 pb-2 pt-2 sm:px-6 lg:px-8">
      <Container>
        <nav className={navClassName} aria-label={t('nav.primaryNavigation')}>
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px rounded-full bg-gradient-to-r from-fuchsia-400 via-sky-400 to-emerald-400 opacity-80" />
          <div className="relative flex items-center justify-between gap-3">
            <Link
              to="/home"
              className="flex items-center gap-3 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 px-3 py-2 shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(15,23,42,0.12)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 via-sky-500 to-emerald-400 text-sm font-semibold uppercase tracking-[0.35em] text-white shadow-lg shadow-fuchsia-500/20">
                N
              </div>
              <div className="flex flex-col">
                <span className="text-[0.95rem] font-semibold tracking-[0.18em] text-[color:var(--color-text-primary)]">
                  {t('brand.name')}
                </span>
                <span className="text-[0.65rem] uppercase tracking-[0.35em] text-[color:var(--color-secondary)]">
                  {t('brand.subtitle')}
                </span>
              </div>
            </Link>

            <div className="hidden items-center justify-center gap-2 rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/90 px-3 py-2 md:flex">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200',
                    index === 0
                      ? 'bg-[linear-gradient(135deg,rgba(236,72,153,0.14),rgba(59,130,246,0.12))] text-[color:var(--color-primary)] shadow-[0_16px_40px_rgba(236,72,153,0.12)]'
                      : 'text-[color:var(--color-secondary)] hover:bg-[color:var(--color-primary-soft)] hover:text-[color:var(--color-primary)]',
                  )}
                >
                  {t(item.label)}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/contact"
                className="hidden rounded-full border border-transparent bg-gradient-to-r from-fuchsia-500 via-sky-500 to-emerald-400 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_20px_55px_rgba(59,130,246,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(59,130,246,0.22)] md:inline-flex"
              >
                {t('nav.bookCall')}
              </Link>
              <LanguageSwitcher />
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-card)] text-[color:var(--color-primary)] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-primary)] md:hidden"
                aria-expanded={isMobileOpen}
                aria-label={t('nav.toggleMenu')}
                onClick={() => setIsMobileOpen((value) => !value)}
              >
                {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isMobileOpen ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.24, ease: 'easeOut' }}
                className="overflow-hidden md:hidden"
              >
                <div className="mt-3 flex flex-col gap-2 rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="rounded-full px-4 py-3 text-sm font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-primary-soft)] hover:text-[color:var(--color-primary)]"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      {t(item.label)}
                    </Link>
                  ))}
                  <Link
                    to="/contact"
                    className="mt-1 rounded-full bg-[color:var(--color-primary)] px-4 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:translate-y-[-1px]"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {t('nav.bookCall')}
                  </Link>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </nav>
      </Container>
    </header>
  )
}

export const Navbar = memo(NavbarInner)
