import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '@/layouts/Layout'
import { HeroSectionPage } from '@/components/sections/HeroSectionPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { AccountLayout } from '@/pages/account/AccountLayout'
import { AccountOverview } from '@/pages/account/AccountOverview'
import { AddressesPage } from '@/pages/account/AddressesPage'
import { AccountSettingsPage } from '@/pages/account/AccountSettingsPage'
import { OrdersPage } from '@/pages/account/OrdersPage'
import { ProfilePage } from '@/pages/account/ProfilePage'
import { WishlistPage } from '@/pages/account/WishlistPage'
import { CartPage } from '@/pages/cart/CartPage'
import { PlaceholderPage } from '@/pages/commerce/PlaceholderPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HeroSectionPage />} />
        <Route path="/shop" element={<PlaceholderPage titleKey="nav.shopPlaceholderTitle" descriptionKey="nav.shopPlaceholderDescription" ctaHref="/cart" ctaLabelKey="nav.viewCart" />} />
        <Route path="/collections" element={<PlaceholderPage titleKey="nav.collectionsPlaceholderTitle" descriptionKey="nav.collectionsPlaceholderDescription" ctaHref="/shop" ctaLabelKey="nav.shopNow" />} />
        <Route path="/new-arrivals" element={<PlaceholderPage titleKey="nav.arrivalsPlaceholderTitle" descriptionKey="nav.arrivalsPlaceholderDescription" ctaHref="/shop" ctaLabelKey="nav.shopNow" />} />
        <Route path="/journal" element={<PlaceholderPage titleKey="nav.journalPlaceholderTitle" descriptionKey="nav.journalPlaceholderDescription" ctaHref="/about" ctaLabelKey="nav.about" />} />
        <Route path="/about" element={<PlaceholderPage titleKey="nav.aboutPlaceholderTitle" descriptionKey="nav.aboutPlaceholderDescription" ctaHref="/shop" ctaLabelKey="nav.shopNow" />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/account" element={<AccountLayout />}>
          <Route index element={<AccountOverview />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="addresses" element={<AddressesPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="settings" element={<AccountSettingsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
