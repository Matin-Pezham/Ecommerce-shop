import { Navigate, Route, Routes } from 'react-router-dom'
import { GuestOnlyRoute } from '@/components/auth/GuestOnlyRoute'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
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
import CollectionDetailPage from '@/pages/collections/CollectionDetailPage'
import { CollectionsPage } from '@/pages/collections/CollectionsPage'
import { NewArrivalsPage } from '@/pages/new-arrivals/NewArrivalsPage'
import { PlaceholderPage } from '@/pages/commerce/PlaceholderPage'
import { CheckoutLayout } from '@/pages/checkout/CheckoutLayout'
import { CheckoutPaymentPage } from '@/pages/checkout/CheckoutPaymentPage'
import { CheckoutReviewPage } from '@/pages/checkout/CheckoutReviewPage'
import { CheckoutShippingPage } from '@/pages/checkout/CheckoutShippingPage'
import { OrderSuccessPage } from '@/pages/checkout/OrderSuccessPage'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import ProductDetailPage from '@/pages/product-detail/ProductDetailPage'
import { ShopPage } from '@/pages/shop/ShopPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HeroSectionPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/collections/:slug" element={<CollectionDetailPage />} />
        <Route path="/new-arrivals" element={<NewArrivalsPage />} />
        <Route path="/journal" element={<PlaceholderPage titleKey="nav.journalPlaceholderTitle" descriptionKey="nav.journalPlaceholderDescription" ctaHref="/about" ctaLabelKey="nav.about" />} />
        <Route path="/about" element={<PlaceholderPage titleKey="nav.aboutPlaceholderTitle" descriptionKey="nav.aboutPlaceholderDescription" ctaHref="/shop" ctaLabelKey="nav.shopNow" />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<GuestOnlyRoute><LoginPage /></GuestOnlyRoute>} />
        <Route path="/register" element={<GuestOnlyRoute><RegisterPage /></GuestOnlyRoute>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/checkout" element={<ProtectedRoute><CheckoutLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/checkout/shipping" replace />} />
          <Route path="shipping" element={<CheckoutShippingPage />} />
          <Route path="payment" element={<CheckoutPaymentPage />} />
          <Route path="review" element={<CheckoutReviewPage />} />
        </Route>
        <Route path="/order-success/:orderId" element={<ProtectedRoute><OrderSuccessPage /></ProtectedRoute>} />

        <Route path="/account" element={<ProtectedRoute><AccountLayout /></ProtectedRoute>}>
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
