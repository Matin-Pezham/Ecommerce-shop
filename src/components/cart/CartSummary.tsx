import { ArrowRight } from 'lucide-react'
import type { PriceSummary } from '@/features/cart/priceUtils'

type CartSummaryProps = {
  summary: PriceSummary
  onCheckout: () => void
}

const rows = [
  { label: 'Subtotal', value: (summary: PriceSummary) => `$${summary.subtotal.toLocaleString()}` },
  { label: 'Discount', value: (summary: PriceSummary) => `-$${summary.discount.toLocaleString()}` },
  { label: 'Shipping', value: (summary: PriceSummary) => (summary.shipping === 0 ? 'Free' : `$${summary.shipping.toLocaleString()}`) },
  { label: 'Tax', value: (summary: PriceSummary) => `$${summary.tax.toLocaleString()}` },
]

export function CartSummary({ summary, onCheckout }: CartSummaryProps) {
  return (
    <aside className="rounded-[2rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)]">Price summary</h3>
        <span className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.26em] text-[color:var(--color-text-muted)]">
          {summary.totalQuantity} items
        </span>
      </div>

      <div className="mt-6 space-y-3 text-sm text-[color:var(--color-text-secondary)]">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <span>{row.label}</span>
            <span className="font-medium text-[color:var(--color-text-primary)]">{row.value(summary)}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/70 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[color:var(--color-text-secondary)]">Estimated total</span>
          <span className="text-2xl font-semibold text-[color:var(--color-text-primary)]">${summary.total.toLocaleString()}</span>
        </div>
        <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
          You saved ${summary.totalSaved.toLocaleString()} with this selection.
        </p>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full btn-cta px-5 py-3 text-sm font-semibold shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5"
      >
        Continue to checkout <ArrowRight size={16} />
      </button>
    </aside>
  )
}
