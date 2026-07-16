export type WishlistItem = {
  id: string
  productId: string
  selectedColorId?: string
  selectedSizeId?: string
}

export type WishlistState = {
  items: WishlistItem[]
}
