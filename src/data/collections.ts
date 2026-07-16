import type { Collection } from '@/features/products/types'

export const productCollections: Collection[] = [
  {
    id: 'essentials',
    slug: 'essentials',
    name: { en: 'Essentials', fa: 'ضروري ها' },
    description: {
      en: 'Core wardrobe pieces with timeless luxury language.',
      fa: 'قطعات کليدي کمد لباس با زبان طراحي لوکس و ماندگار.',
    },
    heroImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=80',
    productIds: ['prd-tailored-silk-shirt', 'prd-wide-leg-trouser', 'prd-structured-blazer', 'prd-leather-mini-bag'],
    featured: true,
  },
  {
    id: 'new-season',
    slug: 'new-season',
    name: { en: 'New Season', fa: 'فصل جديد' },
    description: {
      en: 'Fresh silhouettes and materials for the current season.',
      fa: 'فرم ها و متريال هاي تازه براي فصل جاري.',
    },
    heroImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=80',
    productIds: ['prd-luna-slip-dress', 'prd-cropped-trench', 'prd-satin-column-skirt', 'prd-crystal-drop-earrings'],
  },
  {
    id: 'signature-edit',
    slug: 'signature-edit',
    name: { en: 'Signature Edit', fa: 'انتخاب ويژه' },
    description: {
      en: 'Our defining pieces with artisan detail and modern edge.',
      fa: 'قطعات شاخص ما با جزئيات هنرمندانه و رويکرد مدرن.',
    },
    heroImage: 'https://images.unsplash.com/photo-1464863979621-258859e62245?auto=format&fit=crop&w=1400&q=80',
    productIds: ['prd-aurora-evening-gown', 'prd-cashmere-wrap-coat', 'prd-sculptural-heel', 'prd-signature-clutch'],
    featured: true,
  },
  {
    id: 'evening-pieces',
    slug: 'evening-pieces',
    name: { en: 'Evening Pieces', fa: 'آيتم هاي شب' },
    description: {
      en: 'Refined evening statements for private dinners and events.',
      fa: 'آيتم هاي ظريف شب براي مهماني ها و رويدادهاي خاص.',
    },
    heroImage: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80',
    productIds: ['prd-velvet-midi-dress', 'prd-satin-column-skirt', 'prd-signature-clutch', 'prd-crystal-drop-earrings'],
  },
]
