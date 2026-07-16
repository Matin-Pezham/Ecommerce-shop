import { AccountHeader } from '@/components/account/AccountHeader'
import { addItem } from '@/features/cart/cartSlice'
import { createCartItemFromProduct, getLocalizedText, getProductMainImage } from '@/features/products/productUtils'
import { removeFromWishlist } from '@/features/wishlist/wishlistSlice'
import { selectProductById } from '@/features/products/productSelectors'
import { useTranslation } from '@/i18n'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

export function WishlistPage() {
  const dispatch = useAppDispatch()
  const wishlistItems = useAppSelector((state) => state.wishlist.items)
  const { t, isRtl, formatPrice, locale } = useTranslation()

  return (
    <div>
      <AccountHeader
        title={t('account.wishlist.title')}
        description={t('account.wishlist.subtitle')}
        action={<button type="button" className="rounded-full border border-[color:var(--color-border)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-surface)]">{t('account.wishlist.moveToCart')}</button>}
      />

      <div className="grid gap-5 md:grid-cols-2">
        {wishlistItems.map((item) => {
          const product = selectProductById(item.productId)
          if (!product) return null

          const image = getProductMainImage(product)
          const color = product.colors.find((entry) => entry.id === item.selectedColorId) ?? product.colors[0]
          const size = product.sizes.find((entry) => entry.id === item.selectedSizeId) ?? product.sizes[0]

          return (
            <article key={item.id} className="overflow-hidden rounded-[1.75rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 shadow-[var(--shadow-soft)]">
              <img src={image.url} alt={getLocalizedText(image.alt, locale)} className="h-48 w-full object-cover" />
              <div className="p-5">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--color-text-muted)]">{product.brand}</p>
                <h3 className="mt-2 text-lg font-semibold text-[color:var(--color-text-primary)]">{getLocalizedText(product.title, locale)}</h3>
                <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
                  {color ? getLocalizedText(color.name, locale) : '-'} • {size?.label ?? '-'}
                </p>
                <div className={`mt-4 flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div>
                    <p className="text-sm font-semibold text-[color:var(--color-text-primary)]">{formatPrice(product.price, product.currency)}</p>
                    {product.compareAtPrice ? (
                      <p className="text-sm text-[color:var(--color-text-muted)]">{t('account.wishlist.compareAt')}: {formatPrice(product.compareAtPrice, product.currency)}</p>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(
                        addItem(
                          createCartItemFromProduct(product, {
                            selectedColorId: color?.id,
                            selectedSizeId: size?.id,
                            quantity: 1,
                            language: locale,
                          }),
                        ),
                      )
                      dispatch(removeFromWishlist(product.id))
                    }}
                    className="rounded-full btn-cta px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5"
                  >
                    {t('account.wishlist.moveToCart')}
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
