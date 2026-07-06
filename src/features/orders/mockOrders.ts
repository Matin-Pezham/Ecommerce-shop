import type { Order } from './types'

export const mockOrders: Order[] = [
  {
    id: 'ord_001',
    orderNumber: '#AN-1048',
    placedAt: '2026-06-28',
    status: 'Delivered',
    total: 1760,
    items: 2,
    shippingTo: 'San Francisco, CA',
  },
  {
    id: 'ord_002',
    orderNumber: '#AN-1034',
    placedAt: '2026-05-18',
    status: 'Shipped',
    total: 980,
    items: 1,
    shippingTo: 'Palo Alto, CA',
  },
  {
    id: 'ord_003',
    orderNumber: '#AN-1019',
    placedAt: '2026-03-07',
    status: 'Processing',
    total: 2420,
    items: 3,
    shippingTo: 'San Francisco, CA',
  },
]
