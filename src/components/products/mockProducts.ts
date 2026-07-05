import type { Product } from '@/components/products/productTypes'

export const mockProducts: Product[] = [
  {
    id: 'aurora-one',
    title: 'Aurora One',
    description: 'Precision sound, sculpted silence, and immaculate clarity.',
    price: '$1,290',
    rating: 4.9,
    reviews: 132,
    badge: 'Featured',
    category: 'Audio',
    accent: '#111827',
    imageLabel: 'Premium audio device',
  },
  {
    id: 'lumen-frame',
    title: 'Lumen Frame',
    description: 'A luminous display crafted for calm, cinematic focus.',
    price: '$2,140',
    rating: 4.8,
    reviews: 87,
    category: 'New',
    accent: '#5b6472',
    imageLabel: 'Minimal display frame',
  },
  {
    id: 'nocturne-pad',
    title: 'Nocturne Pad',
    description: 'Fluid control for immersive work and play.',
    price: '$760',
    rating: 4.7,
    reviews: 64,
    category: 'Gaming',
    accent: '#7c8aa5',
    imageLabel: 'Compact gaming controller',
  },
  {
    id: 'halo-remote',
    title: 'Halo Remote',
    description: 'Quiet automation designed for refined everyday rituals.',
    price: '$340',
    rating: 4.6,
    reviews: 51,
    category: 'Smart Home',
    accent: '#4b5563',
    imageLabel: 'Minimal smart remote',
  },
]

export const productCategories = ['New', 'Popular', 'Gaming', 'Audio', 'Accessories', 'Smart Home'] as const
