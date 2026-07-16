import type { Category } from '@/features/products/types'

export const productCategories: Category[] = [
  {
    id: 'dresses',
    slug: 'dresses',
    name: { en: 'Dresses', fa: 'پيراهن' },
    description: {
      en: 'Elegant silhouettes for day-to-evening moments.',
      fa: 'سيليوت هاي ظريف براي لحظه هاي روز تا شب.',
    },
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'tops',
    slug: 'tops',
    name: { en: 'Tops', fa: 'بالاپوش' },
    description: {
      en: 'Tailored and fluid tops crafted with premium fabrics.',
      fa: 'بالاپوش هاي خوش دوخت و روان با پارچه هاي ممتاز.',
    },
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'pants',
    slug: 'pants',
    name: { en: 'Pants', fa: 'شلوار' },
    description: {
      en: 'Structured and relaxed trousers for refined versatility.',
      fa: 'شلوارهاي ساختارمند و راحت براي استايلي منعطف و شيک.',
    },
    image: 'https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'outerwear',
    slug: 'outerwear',
    name: { en: 'Outerwear', fa: 'رويه و کت' },
    description: {
      en: 'Statement layers for polished seasonal dressing.',
      fa: 'لايه هاي شاخص براي استايل فصلي آراسته.',
    },
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'accessories',
    slug: 'accessories',
    name: { en: 'Accessories', fa: 'اکسسوري' },
    description: {
      en: 'Signature accents that complete the luxury look.',
      fa: 'اکسنت هاي ويژه که استايل لوکس را کامل مي کنند.',
    },
    image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=1200&q=80',
  },
]
