import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProductBreadcrumbs } from '@/components/product-detail/ProductBreadcrumbs'
import { ProductGallery } from '@/components/product-detail/ProductGallery'
import { ProductVariantSelector } from '@/components/product-detail/ProductVariantSelector'
import { ProductQuantitySelector } from '@/components/product-detail/ProductQuantitySelector'
import { ProductActions } from '@/components/product-detail/ProductActions'
import { ProductSpecifications } from '@/components/product-detail/ProductSpecifications'
import { ProductCare } from '@/components/product-detail/ProductCare'
import { ProductInfoPanel } from '@/components/product-detail/ProductInfoPanel'
import { RelatedProducts } from '@/components/product-detail/RelatedProducts'
import { Container } from '@/components/layout/Container'
import { productCategories } from '@/data/categories'
import { createCartItemFromProduct, getLocalizedText } from '@/features/products/productUtils'
import { addItem } from '@/features/cart/cartSlice'
import { addToWishlist, removeFromWishlist } from '@/features/wishlist/wishlistSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useTranslation } from '@/i18n'
import { LoadingState } from '@/components/common/LoadingState'
import { useProductQuery } from '@/features/products/queries/useProductQuery'
import { useProductsQuery } from '@/features/products/queries/useProductsQuery'
import { isAppError } from '@/services/appError'

function ProductNotFoundState() {
  const { t, isRtl } = useTranslation()

  return (
    <Container className="py-20">
      <div className={`mx-auto max-w-xl rounded-[2rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-8 text-center shadow-[var(--shadow-soft)] ${isRtl ? 'text-right' : ''}`}>
        <h1 className="font-display text-3xl text-[color:var(--color-text-primary)]">{t('productDetail.notFoundTitle')}</h1>
        <p className="mt-3 text-sm text-[color:var(--color-text-secondary)]">{t('productDetail.notFoundDescription')}</p>
        <div className={`mt-6 flex justify-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <Link to="/shop" className="btn-cta rounded-full px-5 py-3 text-sm font-semibold">
            {t('productDetail.backToShop')}
          </Link>
          <Link
            to="/home"
            className="rounded-full border border-[color:var(--color-border)] px-5 py-3 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-surface)]"
          >
            {t('productDetail.backToHome')}
          </Link>
        </div>
      </div>
    </Container>
  )
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const dispatch = useAppDispatch()
  const { t, locale, isRtl } = useTranslation()

  const wishlistItems = useAppSelector((state) => state.wishlist.items)
  const { data: product, isPending, error } = useProductQuery(slug)
  
  // Fetch related products by category, excluding current product
  const { data: relatedData } = useProductsQuery(
    product ? { categoryId: product.categoryId, pageSize: 5 } : {}
  )

  const [selection, setSelection] = useState<{
    productId?: string
    imageId?: string
    variantId?: string
    colorId?: string
    sizeId?: string
  }>({})
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  if (isPending && !product) {
    return (
      <Container className="py-20">
        <LoadingState label={t('shop.loadingProducts')} />
      </Container>
    )
  }

  if (!product) {
    if (isAppError(error) && error.kind === 'not-found') {
      return <ProductNotFoundState />
    }

    return (
      <Container className="py-20">
        <div className={`mx-auto max-w-xl rounded-[2rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-8 text-center shadow-[var(--shadow-soft)] ${isRtl ? 'text-right' : ''}`}>
          <h1 className="font-display text-3xl text-[color:var(--color-text-primary)]">{t('shop.loadFailed')}</h1>
          <p className="mt-3 text-sm text-[color:var(--color-text-secondary)]">{t('shop.noResultsDescription')}</p>
          <div className={`mt-6 flex justify-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <Link to="/shop" className="btn-cta rounded-full px-5 py-3 text-sm font-semibold">
              {t('productDetail.backToShop')}
            </Link>
          </div>
        </div>
      </Container>
    )
  }

  const isWishlisted = wishlistItems.some((item) => item.productId === product.id)
  const selectionMatchesProduct = selection.productId === product.id
  const selectedImageId = selectionMatchesProduct ? selection.imageId ?? product.images[0]?.id : product.images[0]?.id
  const selectedVariantId = selectionMatchesProduct ? selection.variantId ?? product.variants[0]?.id : product.variants[0]?.id
  const selectedColorId = selectionMatchesProduct ? selection.colorId ?? product.colors[0]?.id : product.colors[0]?.id
  const selectedSizeId = selectionMatchesProduct ? selection.sizeId ?? product.sizes[0]?.id : product.sizes[0]?.id
  const selectedVariant = product.variants.find((variant) => variant.id === selectedVariantId)
  const category = productCategories.find((item) => item.id === product.categoryId)
  const categoryLabel = category ? getLocalizedText(category.name, locale) : t('productDetail.defaultCategory')
  const categoryHref = category ? `/shop?category=${category.slug || category.id}` : '/shop'

  const maxQuantity = Math.max(selectedVariant?.stock ?? product.stock, 1)
  const relatedProducts = (relatedData?.items ?? [])
    .filter((item) => item.id !== product.id)
    .slice(0, 4)

  const colorOptions = product.colors.map((color) => ({
    id: color.id,
    label: getLocalizedText(color.name, locale),
    meta: <span className="h-3 w-3 rounded-full border border-black/10" style={{ backgroundColor: color.hex || color.value }} />,
  }))

  const sizeOptions = product.sizes.filter((size) => size.available).map((size) => ({ id: size.id, label: size.label }))
  const variantOptions = product.variants.map((variant) => ({
    id: variant.id,
    label: variant.sku,
    disabled: variant.stock <= 0,
  }))

  const handleAddToCart = () => {
    dispatch(
      addItem(
        createCartItemFromProduct(product, {
          quantity,
          selectedColorId,
          selectedSizeId,
          selectedVariantId,
          language: locale,
        }),
      ),
    )
    setAddedToCart(true)
    window.setTimeout(() => setAddedToCart(false), 2200)
  }

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id))
      return
    }
    dispatch(
      addToWishlist({
        id: `wish-${product.id}`,
        productId: product.id,
        selectedColorId,
        selectedSizeId,
      }),
    )
  }

  return (
    <div className="bg-[radial-gradient(circle_at_15%_12%,rgba(255,180,92,.16),transparent_40%),radial-gradient(circle_at_88%_5%,rgba(96,154,246,.14),transparent_35%),var(--color-background)] py-8 sm:py-12">
      <Container>
        <ProductBreadcrumbs
          categoryLabel={categoryLabel}
          categoryHref={categoryHref}
          productTitle={getLocalizedText(product.title, locale)}
        />

        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <ProductGallery
            images={product.images}
            selectedImageId={selectedImageId}
            onSelectImage={(imageId) => setSelection({ productId: product.id, imageId, variantId: selectedVariantId, colorId: selectedColorId, sizeId: selectedSizeId })}
            locale={locale}
          />

          <div className="space-y-5">
            <ProductInfoPanel product={product} selectedVariant={selectedVariant} />

            {variantOptions.length > 1 ? (
              <ProductVariantSelector
                title={t('productDetail.variant')}
                selectedId={selectedVariantId}
                onSelect={(variantId) => {
                  const variant = product.variants.find((item) => item.id === variantId)
                  setSelection({
                    productId: product.id,
                    variantId,
                    colorId: variant?.colorId ?? selectedColorId,
                    sizeId: variant?.sizeId ?? selectedSizeId,
                    imageId: variant?.imageId ?? selectedImageId,
                  })
                }}
                options={variantOptions}
              />
            ) : null}

            {colorOptions.length > 0 ? (
              <ProductVariantSelector
                title={t('productDetail.color')}
                selectedId={selectedColorId}
                onSelect={(colorId) => setSelection({ productId: product.id, colorId, variantId: selectedVariantId, sizeId: selectedSizeId, imageId: selectedImageId })}
                options={colorOptions}
                type="color"
              />
            ) : null}

            {sizeOptions.length > 0 ? (
              <ProductVariantSelector
                title={t('productDetail.size')}
                selectedId={selectedSizeId}
                onSelect={(sizeId) => setSelection({ productId: product.id, sizeId, variantId: selectedVariantId, colorId: selectedColorId, imageId: selectedImageId })}
                options={sizeOptions}
              />
            ) : null}

            <div className={`rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/90 p-4 ${isRtl ? 'text-right' : ''}`}>
              <p className="text-sm text-[color:var(--color-text-secondary)]">
                {product.stock > 0
                  ? t('productDetail.inStockCount', { count: product.stock.toString() })
                  : t('productDetail.outOfStock')}
              </p>
            </div>

            <ProductQuantitySelector quantity={quantity} onChange={setQuantity} max={maxQuantity} />

            <ProductActions
              inStock={product.stock > 0}
              isWishlisted={isWishlisted}
              addedToCart={addedToCart}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
            />
          </div>
        </section>

        <section className="mt-10 grid gap-4 lg:grid-cols-2">
          <ProductSpecifications product={product} />
          <ProductCare product={product} />
        </section>
      </Container>

      <section className="mt-12">
        <RelatedProducts products={relatedProducts} />
      </section>
    </div>
  )
}
