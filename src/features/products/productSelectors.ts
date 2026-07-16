import { productCategories } from '@/data/categories'
import { productCollections } from '@/data/collections'
import { productsCatalog } from '@/data/products'
import {
  getFeaturedProducts,
  getNewArrivals,
  getProductById,
  getProductBySlug,
  getProductsByCategory,
  getProductsByCollection,
  getRelatedProducts,
} from '@/features/products/productUtils'

export const selectAllProducts = () => productsCatalog

export const selectAllCategories = () => productCategories

export const selectAllCollections = () => productCollections

export const selectProductById = (id: string) => getProductById(id)

export const selectProductBySlug = (slug: string) => getProductBySlug(slug)

export const selectProductsByCategory = (categoryId: string) => getProductsByCategory(categoryId)

export const selectProductsByCollection = (collectionId: string) => getProductsByCollection(collectionId)

export const selectFeaturedProducts = () => getFeaturedProducts()

export const selectNewArrivals = () => getNewArrivals()

export const selectRelatedProducts = (productId: string, limit = 4) => getRelatedProducts(productId, limit)
