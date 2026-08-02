import { z } from 'zod'

const localizedTextSchema = z.object({
  en: z.string(),
  fa: z.string(),
})

const productImageSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  alt: localizedTextSchema,
  type: z.enum(['main', 'gallery', 'detail', 'lifestyle']),
})

const productColorSchema = z.object({
  id: z.string(),
  name: localizedTextSchema,
  value: z.string(),
  hex: z.string(),
})

const productSizeSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(),
  available: z.boolean(),
})

const productVariantSchema = z.object({
  id: z.string(),
  sku: z.string(),
  productId: z.string(),
  colorId: z.string().optional(),
  sizeId: z.string().optional(),
  price: z.number().optional(),
  stock: z.number(),
  imageId: z.string().optional(),
})

const productBadgeSchema = z.object({
  id: z.string(),
  label: localizedTextSchema,
  type: z.enum(['new', 'sale', 'limited', 'featured', 'bestseller']),
})

const productSpecificationSchema = z.object({
  id: z.string(),
  label: localizedTextSchema,
  value: localizedTextSchema,
})

export const productSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: localizedTextSchema,
  subtitle: localizedTextSchema.optional(),
  shortDescription: localizedTextSchema,
  description: localizedTextSchema,
  brand: z.string(),
  sku: z.string(),
  categoryId: z.string(),
  collectionIds: z.array(z.string()),
  price: z.number(),
  compareAtPrice: z.number().optional(),
  currency: z.enum(['IRR', 'IRT', 'USD']),
  images: z.array(productImageSchema),
  colors: z.array(productColorSchema),
  sizes: z.array(productSizeSchema),
  variants: z.array(productVariantSchema),
  stock: z.number(),
  rating: z.number(),
  reviewsCount: z.number(),
  isFeatured: z.boolean(),
  isNewArrival: z.boolean(),
  isBestSeller: z.boolean().optional(),
  isLimited: z.boolean().optional(),
  tags: z.array(z.string()),
  badges: z.array(productBadgeSchema),
  specifications: z.array(productSpecificationSchema),
  careInstructions: z.array(localizedTextSchema).optional(),
  material: localizedTextSchema.optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const productPaginationSchema = z.object({
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
  totalItems: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
})

export const productListResponseSchema = z.object({
  items: z.array(productSchema),
  pagination: productPaginationSchema,
})

export const productDetailResponseSchema = z.object({
  product: productSchema,
})

export const productApiErrorSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
  }),
})

export const colorFacetSchema = z.object({
  id: z.string(),
  name: localizedTextSchema,
  hex: z.string(),
})

export const sizeFacetSchema = z.object({
  id: z.string(),
  label: z.string(),
})

export const productFacetsResponseSchema = z.object({
  categoryIds: z.array(z.string()),
  collectionIds: z.array(z.string()),
  colors: z.array(colorFacetSchema),
  sizes: z.array(sizeFacetSchema),
  badges: z.array(z.string()),
  priceRange: z.object({
    min: z.number(),
    max: z.number(),
  }),
})

export const collectionCountSchema = z.object({
  collectionId: z.string(),
  totalProducts: z.number(),
  inStockCount: z.number(),
  newArrivalsCount: z.number(),
  saleCount: z.number(),
})

export const collectionCountsResponseSchema = z.object({
  counts: z.array(collectionCountSchema),
})

export const relatedCollectionSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: localizedTextSchema,
  description: localizedTextSchema,
  featured: z.boolean(),
  heroImage: z.string(),
  productCount: z.number(),
})

export const collectionRelatedResponseSchema = z.object({
  related: z.array(relatedCollectionSchema),
})