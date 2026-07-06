export type OrderStatus = 'Delivered' | 'Processing' | 'Shipped' | 'Cancelled'

export type Order = {
  id: string
  orderNumber: string
  placedAt: string
  status: OrderStatus
  total: number
  items: number
  shippingTo: string
}
