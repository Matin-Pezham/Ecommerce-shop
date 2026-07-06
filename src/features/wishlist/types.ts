export type WishlistItem = {
  id: string
  productId: string
  name: string
  slug: string
  brand: string
  image: string
  price: number
  compareAtPrice: number
  selectedColor: string
  selectedSize: string
}

export type WishlistState = {
  items: WishlistItem[]
}
