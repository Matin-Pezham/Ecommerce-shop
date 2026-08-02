export const PRODUCT_API_ROUTES = {
  products: '/products',
  productDetail: '/products/:slug',
  productFacets: '/products/facets',
  collectionCounts: '/collections/counts',
  collectionRelated: '/collections/:id/related',
} as const

export const PRODUCT_API_MSW_PATTERNS = {
  products: `*${PRODUCT_API_ROUTES.products}`,
  productDetail: `*${PRODUCT_API_ROUTES.productDetail}`,
  productFacets: `*${PRODUCT_API_ROUTES.productFacets}`,
  collectionCounts: `*${PRODUCT_API_ROUTES.collectionCounts}`,
  collectionRelated: `*${PRODUCT_API_ROUTES.collectionRelated}`,
} as const
