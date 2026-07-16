import { memo, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { Container } from '@/components/layout/Container'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

function MainLayoutInner() {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const isHomeRoute = location.pathname === '/' || location.pathname === '/home'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AppShell>
      <Navbar isScrolled={isScrolled} />
      <CartDrawer />
      <main className={isHomeRoute ? 'pt-0' : 'pt-4 sm:pt-6 lg:pt-8'}>
        <Container>
          <AnimatePresence mode="wait" initial={false}>
            <PageWrapper key={location.pathname} className="w-full">
              <Outlet />
            </PageWrapper>
          </AnimatePresence>
        </Container>
      </main>
      <Footer />
    </AppShell>
  )
}

export const MainLayout = memo(MainLayoutInner)
