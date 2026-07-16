import { CheckCircle2, Heart, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from '@/i18n'

type ProductActionsProps = {
  inStock: boolean
  isWishlisted: boolean
  addedToCart: boolean
  onAddToCart: () => void
  onToggleWishlist: () => void
}

export function ProductActions({
  inStock,
  isWishlisted,
  addedToCart,
  onAddToCart,
  onToggleWishlist,
}: ProductActionsProps) {
  const { t, isRtl } = useTranslation()

  return (
    <div className="space-y-4">
      <div className={`grid gap-3 sm:grid-cols-2 ${isRtl ? 'sm:[direction:rtl]' : ''}`}>
        <button
          type="button"
          disabled={!inStock}
          onClick={onAddToCart}
          aria-label={t('productDetail.addToCart')}
          className="inline-flex items-center justify-center gap-2 rounded-full btn-cta px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
        >
          <ShoppingBag size={16} />
          {t('productDetail.addToCart')}
        </button>

        <button
          type="button"
          onClick={onToggleWishlist}
          aria-label={isWishlisted ? t('productDetail.removeFromWishlist') : t('productDetail.addToWishlist')}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-5 py-3 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-card)]"
        >
          <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
          {isWishlisted ? t('productDetail.removeFromWishlist') : t('productDetail.addToWishlist')}
        </button>
      </div>

      <div className={`flex flex-wrap gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <Link
          to="/cart"
          className="rounded-full border border-[color:var(--color-border)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-surface)]"
        >
          {t('productDetail.viewCart')}
        </Link>
        <Link
          to="/shop"
          className="rounded-full border border-[color:var(--color-border)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-surface)]"
        >
          {t('productDetail.continueShopping')}
        </Link>
      </div>

      {addedToCart ? (
        <p className={`inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-success)] ${isRtl ? 'flex-row-reverse' : ''}`}>
          <CheckCircle2 size={16} />
          {t('productDetail.addedToCart')}
        </p>
      ) : null}
    </div>
  )
}
