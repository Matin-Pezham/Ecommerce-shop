import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CartItemCard } from '@/components/cart/CartItemCard'
import { CartSummary } from '@/components/cart/CartSummary'
import { EmptyCart } from '@/components/cart/EmptyCart'
import { calculateCartPriceSummary } from '@/features/cart/priceUtils'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { decreaseQuantity, increaseQuantity, removeItem } from '@/features/cart/cartSlice'

export function CartPage() {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.items)
  const summary = calculateCartPriceSummary(items)

  if (items.length === 0) {
    return (
      <div className="py-8 lg:py-12">
        <EmptyCart />
      </div>
    )
  }

  return (
    <div className="py-8 lg:py-12">
      <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-text-muted)]">Shopping bag</p>
          <h2 className="mt-2 text-3xl font-semibold text-[color:var(--color-text-primary)]">Your curated selection</h2>
          <p className="mt-2 max-w-2xl text-sm text-[color:var(--color-text-secondary)]">Every detail is prepared for a calm and polished shopping experience.</p>
        </div>
        <Link to="/home" className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-surface)]">
          <ShoppingBag size={16} /> Continue shopping
        </Link>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-4">
          {items.map((item) => (
            <CartItemCard
              key={item.id}
              item={item}
              onIncrease={(id) => dispatch(increaseQuantity(id))}
              onDecrease={(id) => dispatch(decreaseQuantity(id))}
              onRemove={(id) => dispatch(removeItem(id))}
            />
          ))}
        </div>

        <div className="xl:sticky xl:top-28 xl:self-start">
          <CartSummary summary={summary} onCheckout={() => undefined} />
        </div>
      </div>
    </div>
  )
}
