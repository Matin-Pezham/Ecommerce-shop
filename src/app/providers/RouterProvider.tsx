import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from '@/routes/AppRoutes'

export function RouterProvider() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
