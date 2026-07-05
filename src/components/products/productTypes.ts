export type ProductCategory = 'New' | 'Popular' | 'Gaming' | 'Audio' | 'Accessories' | 'Smart Home'

export type Product = {
  id: string
  title: string
  description: string
  price: string
  rating: number
  reviews: number
  badge?: string
  category: ProductCategory
  accent: string
  imageLabel: string
}

export type ProductCardVariant = 'featured' | 'secondary' | 'compact'
