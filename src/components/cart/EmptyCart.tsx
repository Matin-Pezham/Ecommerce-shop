import { ArrowRight, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

export function EmptyCart() {
  return (
    <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/90 p-10 text-center shadow-[var(--shadow-soft)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--color-surface)] text-[color:var(--color-primary)]">
        <ShoppingBag size={24} />
      </div>
      <h3 className="mt-6 text-2xl font-semibold text-[color:var(--color-text-primary)]">Your bag is beautifully empty.</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm text-[color:var(--color-text-secondary)]">
        Curate a few signature pieces and return here for a refined checkout experience.
      </p>
      <Link
        to="/home"
        className="mt-8 inline-flex items-center gap-2 rounded-full btn-cta px-5 py-3 text-sm font-semibold shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5"
      >
        Continue shopping <ArrowRight size={16} />
      </Link>
    </div>
  )
}
