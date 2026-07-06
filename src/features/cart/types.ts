export type ProductCartItem = {
  id: string
  productId: string
  name: string
  slug: string
  brand: string
  image: string
  price: number
  compareAtPrice: number
  quantity: number
  selectedColor: string
  selectedSize: string
  stock: number
  sku: string
}

export type CartState = {
  items: ProductCartItem[]
  couponCode: string | null
  currency: string
}
