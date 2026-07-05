import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { ProductCard } from '@/components/products/ProductCard'
import type { Product } from '@/components/products/productTypes'

type ProductsCarouselProps = {
  products: Product[]
}

export function ProductsCarousel({ products }: ProductsCarouselProps) {
  const visibleProducts = useMemo(() => products.slice(0, 3), [products])

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex min-w-max gap-4">
        {visibleProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
            className="w-[290px]"
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
