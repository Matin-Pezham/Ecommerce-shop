import type { ProductCartItem } from './types'

export const mockCartItems: ProductCartItem[] = [
  {
    id: 'item_001',
    productId: 'prod_001',
    name: 'Velvet Signature Tote',
    slug: 'velvet-signature-tote',
    brand: 'Atelier North',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    price: 980,
    compareAtPrice: 1240,
    quantity: 1,
    selectedColor: 'Midnight',
    selectedSize: 'One Size',
    stock: 6,
    sku: 'AN-VEL-001',
  },
  {
    id: 'item_002',
    productId: 'prod_002',
    name: 'Linen Atelier Coat',
    slug: 'linen-atelier-coat',
    brand: 'Atelier North',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
    price: 1480,
    compareAtPrice: 1720,
    quantity: 1,
    selectedColor: 'Oat',
    selectedSize: 'M',
    stock: 4,
    sku: 'AN-LIN-002',
  },
]
