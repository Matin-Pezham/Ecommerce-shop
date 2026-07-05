import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '@/layouts/Layout'
import { HeroSectionPage } from '@/components/sections/HeroSectionPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HeroSectionPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
