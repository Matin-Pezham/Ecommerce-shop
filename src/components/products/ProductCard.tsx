import { motion } from 'framer-motion'
import { memo } from 'react'
import { cardRevealVariants } from '@/components/products/productAnimations'
import { AddToCartButton } from '@/components/products/AddToCartButton'
import { ProductImage } from '@/components/products/ProductImage'
import { ProductInfo } from '@/components/products/ProductInfo'
import { QuickViewButton } from '@/components/products/QuickViewButton'
import { Rating } from '@/components/products/Rating'
import { WishlistButton } from '@/components/products/WishlistButton'
import type { Product, ProductCardVariant } from '@/components/products/productTypes'

type ProductCardProps = {
  product: Product
  variant?: ProductCardVariant
}

function ProductCardInner({ product }: ProductCardProps) {
  return (
    <motion.article
      variants={cardRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -4, scale: 1.005, boxShadow: '0 28px 70px rgba(15, 23, 42, 0.12)' }}
      className="group relative min-h-full overflow-hidden rounded-[1.75rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-all duration-300"
    >
      <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.85),transparent_45%,rgba(255,255,255,0.22))]" />
      <div className="relative z-10 flex h-full flex-col gap-5">
        <div className="flex items-start justify-between gap-3">
          <div className="ds-pill">
            {product.badge ?? product.category}
          </div>
          <WishlistButton />
        </div>

        <ProductImage label={product.imageLabel} accent={product.accent} />

        <ProductInfo title={product.title} description={product.description} price={product.price}>
          <Rating value={product.rating} reviews={product.reviews} />
        </ProductInfo>

        <div className="flex flex-wrap items-center gap-2 opacity-100 transition-opacity duration-300 md:opacity-80 md:group-hover:opacity-100">
          <AddToCartButton />
          <QuickViewButton />
        </div>
      </div>
    </motion.article>
  )
}

export const ProductCard = memo(ProductCardInner)
