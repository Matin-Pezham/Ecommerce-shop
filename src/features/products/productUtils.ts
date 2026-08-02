import { productCategories } from '@/data/categories'
import { productCollections } from '@/data/collections'
import type { ProductCartItem } from '@/features/cart/types'
import type {
  LocalizedText,
  Product,
  ProductColor,
  ProductImage,
  ProductSize,
  SupportedLocale,
} from '@/features/products/types'

const DEFAULT_IMAGE_URL = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80'

export function getLocalizedText(value: LocalizedText, language: SupportedLocale): string {
  return value[language]
}

export function getProductMainImage(product: Product): ProductImage {
  return (
    product.images.find((image) => image.type === 'main') ??
    product.images[0] ?? {
      id: `${product.id}-fallback`,
      url: DEFAULT_IMAGE_URL,
      alt: { en: product.title.en, fa: product.title.fa },
      type: 'main',
    }
  )
}

export function getProductDiscountPercentage(product: Product): number {
  if (!product.compareAtPrice || product.compareAtPrice <= product.price) return 0
  return Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
}

export function isProductInStock(product: Product): boolean {
  if (product.stock > 0) return true
  return product.variants.some((variant) => variant.stock > 0)
}

export function getProductLowestVariantPrice(product: Product): number {
  const variantPrices = product.variants
    .map((variant) => variant.price ?? product.price)
    .filter((value): value is number => typeof value === 'number')

  if (variantPrices.length === 0) return product.price
  return Math.min(...variantPrices)
}

export function getProductAvailableColors(product: Product): ProductColor[] {
  const availableColorIds = new Set(
    product.variants.filter((variant) => variant.stock > 0 && variant.colorId).map((variant) => variant.colorId as string),
  )

  if (availableColorIds.size === 0) return product.colors
  return product.colors.filter((color) => availableColorIds.has(color.id))
}

export function getProductAvailableSizes(product: Product): ProductSize[] {
  const availableSizeIds = new Set(
    product.variants.filter((variant) => variant.stock > 0 && variant.sizeId).map((variant) => variant.sizeId as string),
  )

  if (availableSizeIds.size === 0) return product.sizes.filter((size) => size.available)
  return product.sizes.filter((size) => size.available && availableSizeIds.has(size.id))
}

type CreateCartItemOptions = {
  selectedColorId?: string
  selectedSizeId?: string
  selectedVariantId?: string
  quantity?: number
  language?: SupportedLocale
}

export function createCartItemFromProduct(product: Product, options: CreateCartItemOptions = {}): ProductCartItem {
  const language = options.language ?? 'en'
  const selectedVariant =
    (options.selectedVariantId
      ? product.variants.find((variant) => variant.id === options.selectedVariantId)
      : undefined) ??
    product.variants.find(
      (variant) =>
        (!options.selectedColorId || variant.colorId === options.selectedColorId) &&
        (!options.selectedSizeId || variant.sizeId === options.selectedSizeId),
    ) ??
    product.variants[0]

  const selectedColor =
    product.colors.find((color) => color.id === (selectedVariant?.colorId ?? options.selectedColorId)) ??
    product.colors[0]

  const selectedSize =
    product.sizes.find((size) => size.id === (selectedVariant?.sizeId ?? options.selectedSizeId)) ??
    product.sizes[0]

  const image = selectedVariant?.imageId
    ? product.images.find((img) => img.id === selectedVariant.imageId) ?? getProductMainImage(product)
    : getProductMainImage(product)

  const price = selectedVariant?.price ?? product.price
  const quantity = Math.max(options.quantity ?? 1, 1)
  const stock = selectedVariant?.stock ?? product.stock

  return {
    id: `${product.id}-${selectedVariant?.id ?? 'base'}`,
    productId: product.id,
    name: getLocalizedText(product.title, language),
    slug: product.slug,
    brand: product.brand,
    image: image.url,
    price,
    compareAtPrice: product.compareAtPrice ?? price,
    quantity: Math.min(quantity, Math.max(stock, 1)),
    selectedColor: selectedColor ? getLocalizedText(selectedColor.name, language) : '',
    selectedSize: selectedSize?.label ?? '',
    stock,
    sku: selectedVariant?.sku ?? product.sku,
  }
}

export function getCategoryById(categoryId: string) {
  return productCategories.find((category) => category.id === categoryId)
}

export function getCollectionById(collectionId: string) {
  return productCollections.find((collection) => collection.id === collectionId)
}
