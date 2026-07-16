import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { sectionRevealVariants } from '@/components/products/productAnimations'
import { ProductCard } from '@/components/products/ProductCard'
import type { ProductCardVariant } from '@/components/products/productTypes'
import type { Product } from '@/features/products/types'

type ProductsGridProps = {
  products: Product[]
}

export function ProductsGrid({ products }: ProductsGridProps) {
  const layoutProducts = useMemo(() => {
    return products.map((product) => ({
      product,
      variant: product.id === 'aurora-one' ? 'featured' : 'secondary',
    }))
  }, [products])

  const gridClassName = 'grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-5'

  return (
    <motion.div
      className={gridClassName}
      variants={sectionRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
    >
      {layoutProducts.map(({ product, variant }) => {
        return (
          <div key={product.id} className="h-full">
            <ProductCard product={product} variant={variant as ProductCardVariant} />
          </div>
        )
      })}
    </motion.div>
  )
}
