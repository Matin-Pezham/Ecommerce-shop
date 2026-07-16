import { Trash2 } from 'lucide-react'
import type { ProductCartItem } from '@/features/cart/types'
import { useTranslation } from '@/i18n'

type CartDrawerItemProps = {
  item: ProductCartItem
  onIncrease: (id: string) => void
  onDecrease: (id: string) => void
  onRemove: (id: string) => void
}

const fallbackImage =
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80'

export function CartDrawerItem({ item, onIncrease, onDecrease, onRemove }: CartDrawerItemProps) {
  const { t, formatPrice, isRtl } = useTranslation()
  const reachedStockLimit = item.quantity >= item.stock

  return (
    <article className="rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-3">
      <div className={`flex gap-3 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
        <img
          src={item.image || fallbackImage}
          alt={item.name}
          className="h-20 w-20 rounded-[1rem] object-cover"
          onError={(event) => {
            ;(event.currentTarget as HTMLImageElement).src = fallbackImage
          }}
        />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-[color:var(--color-text-primary)]">{item.name}</h3>
          <p className="mt-1 text-xs text-[color:var(--color-text-secondary)]">{item.brand}</p>

          <div className={`mt-2 space-y-1 text-xs text-[color:var(--color-text-secondary)] ${isRtl ? 'text-right' : ''}`}>
            <p>{t('cart.selectedColor')}: {item.selectedColor || '-'}</p>
            <p>{t('cart.selectedSize')}: {item.selectedSize || '-'}</p>
            <p>{t('cart.sku')}: {item.sku || '-'}</p>
          </div>
        </div>
      </div>

      <div className={`mt-3 flex flex-wrap items-center justify-between gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-1">
          <button
            type="button"
            onClick={() => onDecrease(item.id)}
            aria-label={t('cart.decreaseQuantity')}
            className="flex h-8 w-8 items-center justify-center rounded-full text-sm text-[color:var(--color-text-primary)] transition hover:bg-white"
          >
            −
          </button>
          <span className="min-w-7 text-center text-sm font-semibold text-[color:var(--color-text-primary)]">{item.quantity}</span>
          <button
            type="button"
            onClick={() => onIncrease(item.id)}
            aria-label={t('cart.increaseQuantity')}
            className="flex h-8 w-8 items-center justify-center rounded-full text-sm text-[color:var(--color-text-primary)] transition hover:bg-white"
            disabled={reachedStockLimit}
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={() => onRemove(item.id)}
          aria-label={t('cart.removeItem')}
          className={`inline-flex items-center gap-1 rounded-full border border-[color:var(--color-border)] px-3 py-1.5 text-xs text-[color:var(--color-text-secondary)] transition hover:bg-[color:var(--color-surface)] ${isRtl ? 'flex-row-reverse' : ''}`}
        >
          <Trash2 size={13} />
          {t('cart.removeItem')}
        </button>
      </div>

      <div className={`mt-3 flex items-center justify-between gap-2 text-sm ${isRtl ? 'flex-row-reverse' : ''}`}>
        <p className="text-[color:var(--color-text-secondary)]">{t('cart.lineTotal')}</p>
        <p className="font-semibold text-[color:var(--color-text-primary)]">{formatPrice(item.price * item.quantity)}</p>
      </div>

      {reachedStockLimit ? (
        <p className={`mt-2 text-xs font-medium text-[color:var(--color-warning)] ${isRtl ? 'text-right' : ''}`}>
          {t('cart.stockLimitReached')}
        </p>
      ) : null}
    </article>
  )
}
