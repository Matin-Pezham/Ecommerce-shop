import { motion } from 'framer-motion'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import { cardRevealVariants } from '@/components/products/productAnimations'
import { AddToCartButton } from '@/components/products/AddToCartButton'
import { ProductImage } from '@/components/products/ProductImage'
import { ProductInfo } from '@/components/products/ProductInfo'
import { QuickViewButton } from '@/components/products/QuickViewButton'
import { Rating } from '@/components/products/Rating'
import { WishlistButton } from '@/components/products/WishlistButton'
import type { ProductCardVariant } from '@/components/products/productTypes'
import { createCartItemFromProduct, getCategoryById, getLocalizedText, getProductMainImage } from '@/features/products/productUtils'
import { addItem } from '@/features/cart/cartSlice'
import { addToWishlist, removeFromWishlist } from '@/features/wishlist/wishlistSlice'
import type { Product } from '@/features/products/types'
import { useTranslation } from '@/i18n'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

type ProductCardProps = {
  product: Product
  variant?: ProductCardVariant
}

function ProductCardInner({ product, variant }: ProductCardProps) {
  const { t, locale, formatPrice } = useTranslation()
  const dispatch = useAppDispatch()
  const isWishlisted = useAppSelector((state) => state.wishlist.items.some((item) => item.productId === product.id))
  const isAuroraOne = product.id === 'prd-aurora-evening-gown'
  const showFeaturedStyle = variant === 'featured' || isAuroraOne
  const mainImage = getProductMainImage(product)
  const localizedTitle = getLocalizedText(product.title, locale)
  const localizedDescription = getLocalizedText(product.shortDescription, locale)
  const localizedLongDescription = product.subtitle ? getLocalizedText(product.subtitle, locale) : undefined
  const category = getCategoryById(product.categoryId)
  const categoryLabel = category ? getLocalizedText(category.name, locale) : product.categoryId
  const badgeLabel = product.badges[0] ? getLocalizedText(product.badges[0].label, locale) : categoryLabel
  const priceLabel = formatPrice(product.price, product.currency)
  const detailHref = `/products/${product.slug}`

  return (
    <motion.article
      variants={cardRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -4, scale: 1.005, boxShadow: '0 28px 70px rgba(15, 23, 42, 0.12)' }}
      className={`group relative flex h-full min-h-full flex-col overflow-hidden rounded-[1.75rem] border p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-all duration-300 ${
        showFeaturedStyle
          ? 'border-[rgba(248,208,136,0.22)] bg-[linear-gradient(180deg,rgba(255,250,244,0.94),rgba(247,241,232,0.94))]'
          : 'border-[color:var(--color-border)] bg-[color:var(--color-card)]/95'
      }`}
    >
      {isAuroraOne ? (
        <>
          <div className="pointer-events-none absolute -left-10 top-8 h-24 w-24 rounded-full bg-[rgba(253,204,131,0.22)] blur-3xl" />
          <div className="pointer-events-none absolute -right-12 bottom-10 h-32 w-32 rounded-full bg-[rgba(245,158,11,0.16)] blur-3xl" />
        </>
      ) : null}
      <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.85),transparent_45%,rgba(255,255,255,0.22))]" />
      <div className="relative z-10 flex h-full flex-col gap-5">
        <div className="flex items-start justify-between gap-3">
          <div className="ds-pill">
            {badgeLabel}
          </div>
          <WishlistButton
            active={isWishlisted}
            onClick={() => {
              if (isWishlisted) {
                dispatch(removeFromWishlist(product.id))
                return
              }

              dispatch(
                addToWishlist({
                  id: `wish-${product.id}`,
                  productId: product.id,
                  selectedColorId: product.colors[0]?.id,
                  selectedSizeId: product.sizes[0]?.id,
                }),
              )
            }}
          />
        </div>

        <Link to={detailHref} className="block" aria-label={localizedTitle}>
          <ProductImage label={getLocalizedText(mainImage.alt, locale)} imageUrl={mainImage.url} />
        </Link>

        <ProductInfo
          title={localizedTitle}
          description={localizedDescription}
          longDescription={localizedLongDescription}
          price={priceLabel}
          titleHref={detailHref}
        >
          <Rating value={product.rating} reviews={product.reviewsCount} />
        </ProductInfo>

        <div className="flex flex-wrap items-center gap-2 opacity-100 transition-opacity duration-300 md:opacity-80 md:group-hover:opacity-100">
          <AddToCartButton
            onClick={() => dispatch(addItem(createCartItemFromProduct(product, { language: locale })))}
          />
          <QuickViewButton label={t('product.viewDetails')} to={detailHref} />
        </div>
      </div>
    </motion.article>
  )
}

export const ProductCard = memo(ProductCardInner)
