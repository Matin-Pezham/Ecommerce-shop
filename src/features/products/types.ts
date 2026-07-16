export type SupportedLocale = 'en' | 'fa'

export type LocalizedText = {
  en: string
  fa: string
}

export type ProductImageType = 'main' | 'gallery' | 'detail' | 'lifestyle'

export type ProductCurrency = 'IRR' | 'IRT' | 'USD'

export type ProductImage = {
  id: string
  url: string
  alt: LocalizedText
  type: ProductImageType
}

export type ProductColor = {
  id: string
  name: LocalizedText
  value: string
  hex: string
}

export type ProductSize = {
  id: string
  label: string
  value: string
  available: boolean
}

export type ProductVariant = {
  id: string
  sku: string
  productId: string
  colorId?: string
  sizeId?: string
  price?: number
  stock: number
  imageId?: string
}

export type ProductBadgeType = 'new' | 'sale' | 'limited' | 'featured' | 'bestseller'

export type ProductBadge = {
  id: string
  label: LocalizedText
  type: ProductBadgeType
}

export type ProductSpecification = {
  id: string
  label: LocalizedText
  value: LocalizedText
}

export type Product = {
  id: string
  slug: string
  title: LocalizedText
  subtitle?: LocalizedText
  shortDescription: LocalizedText
  description: LocalizedText
  brand: string
  sku: string
  categoryId: string
  collectionIds: string[]
  price: number
  compareAtPrice?: number
  currency: ProductCurrency
  images: ProductImage[]
  colors: ProductColor[]
  sizes: ProductSize[]
  variants: ProductVariant[]
  stock: number
  rating: number
  reviewsCount: number
  isFeatured: boolean
  isNewArrival: boolean
  isBestSeller?: boolean
  isLimited?: boolean
  tags: string[]
  badges: ProductBadge[]
  specifications: ProductSpecification[]
  careInstructions?: LocalizedText[]
  material?: LocalizedText
  createdAt: string
  updatedAt: string
}

export type Category = {
  id: string
  slug: string
  name: LocalizedText
  description: LocalizedText
  image?: string
  productCount?: number
}

export type Collection = {
  id: string
  slug: string
  name: LocalizedText
  description: LocalizedText
  heroImage?: string
  productIds: string[]
  featured?: boolean
}
