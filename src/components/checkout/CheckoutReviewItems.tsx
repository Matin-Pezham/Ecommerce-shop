import type { ProductCartItem } from '@/features/cart/types'
import { useTranslation } from '@/i18n'

type CheckoutReviewItemsProps = {
  items: ProductCartItem[]
}

const fallbackImage =
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80'

export function CheckoutReviewItems({ items }: CheckoutReviewItemsProps) {
  const { t, formatPrice, isRtl } = useTranslation()

  return (
    <section className="rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-5">
      <h2 className={`text-lg font-semibold text-[color:var(--color-text-primary)] ${isRtl ? 'text-right' : ''}`}>{t('checkout.items')}</h2>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <article key={item.id} className={`flex gap-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-3 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
            <img
              src={item.image || fallbackImage}
              alt={item.name}
              className="h-16 w-16 rounded-lg object-cover"
              onError={(event) => {
                event.currentTarget.src = fallbackImage
              }}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[color:var(--color-text-primary)]">{item.name}</p>
              <p className="mt-1 text-xs text-[color:var(--color-text-secondary)]">{item.selectedColor} • {item.selectedSize}</p>
              <div className={`mt-2 flex items-center justify-between text-xs text-[color:var(--color-text-secondary)] ${isRtl ? 'flex-row-reverse' : ''}`}>
                <span>{t('cart.quantity')}: {item.quantity}</span>
                <span className="font-semibold text-[color:var(--color-text-primary)]">{formatPrice(item.price * item.quantity)}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
