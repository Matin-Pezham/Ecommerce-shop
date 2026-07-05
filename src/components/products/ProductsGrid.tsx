import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { sectionRevealVariants } from '@/components/products/productAnimations'
import { ProductCard } from '@/components/products/ProductCard'
import type { Product, ProductCardVariant } from '@/components/products/productTypes'

type ProductsGridProps = {
  products: Product[]
}

export function ProductsGrid({ products }: ProductsGridProps) {
  const layoutProducts = useMemo(() => {
    return products.map((product, index) => ({
      product,
      variant: index === 0 ? 'featured' : 'secondary',
    }))
  }, [products])

  return (
    <motion.div
      className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
      variants={sectionRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
    >
      {layoutProducts.map(({ product, variant }, index) => {
        const className = index === 0 ? 'md:col-span-2 md:row-span-2 xl:col-span-2 xl:row-span-2' : ''
        return (
          <div key={product.id} className={className}>
            <ProductCard product={product} variant={variant as ProductCardVariant} />
          </div>
        )
      })}
    </motion.div>
  )
}
