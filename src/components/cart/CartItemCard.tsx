import { Trash2 } from 'lucide-react'
import { QuantitySelector } from '@/components/cart/QuantitySelector'
import type { ProductCartItem } from '@/features/cart/types'

type CartItemCardProps = {
  item: ProductCartItem
  onIncrease: (id: string) => void
  onDecrease: (id: string) => void
  onRemove: (id: string) => void
}

export function CartItemCard({ item, onIncrease, onDecrease, onRemove }: CartItemCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-[1.75rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-5 shadow-[var(--shadow-soft)] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-4">
        <img src={item.image} alt={item.name} className="h-24 w-24 rounded-[1.25rem] object-cover" />
        <div>
          <div className="flex items-center gap-2">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--color-text-muted)]">{item.brand}</p>
          </div>
          <h3 className="mt-2 text-lg font-semibold text-[color:var(--color-text-primary)]">{item.name}</h3>
          <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
            {item.selectedColor} • {item.selectedSize}
          </p>
          <p className="mt-2 text-sm font-medium text-[color:var(--color-text-primary)]">SKU {item.sku}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:items-end">
        <div className="flex items-center gap-3">
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={() => onIncrease(item.id)}
            onDecrease={() => onDecrease(item.id)}
          />
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] px-3 py-2 text-sm text-[color:var(--color-text-secondary)] transition hover:bg-[color:var(--color-surface)]"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 size={16} />
            Remove
          </button>
        </div>

        <div className="text-right">
          <p className="text-sm text-[color:var(--color-text-muted)]">Unit price</p>
          <p className="text-xl font-semibold text-[color:var(--color-text-primary)]">${item.price.toLocaleString()}</p>
          <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">${(item.price * item.quantity).toLocaleString()} total</p>
        </div>
      </div>
    </article>
  )
}
