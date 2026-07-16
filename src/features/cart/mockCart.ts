import type { ProductCartItem } from './types'
import { productsCatalog } from '@/data/products'
import { createCartItemFromProduct } from '@/features/products/productUtils'

const clutch = productsCatalog.find((product) => product.id === 'prd-signature-clutch')
const gown = productsCatalog.find((product) => product.id === 'prd-aurora-evening-gown')

export const mockCartItems: ProductCartItem[] = [
  ...(clutch
    ? [
        createCartItemFromProduct(clutch, {
          selectedColorId: 'mocha',
          selectedSizeId: 'one-size',
          quantity: 1,
          language: 'en',
        }),
      ]
    : []),
  ...(gown
    ? [
        createCartItemFromProduct(gown, {
          selectedColorId: 'ivory',
          selectedSizeId: 'm',
          quantity: 1,
          language: 'en',
        }),
      ]
    : []),
]
