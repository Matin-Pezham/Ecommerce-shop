import { AccountHeader } from '@/components/account/AccountHeader'
import { useTranslation } from '@/i18n'
import { useAppSelector } from '@/store/hooks'

export function WishlistPage() {
  const wishlistItems = useAppSelector((state) => state.wishlist.items)
  const { t, isRtl, formatPrice } = useTranslation()

  return (
    <div>
      <AccountHeader
        title={t('account.wishlist.title')}
        description={t('account.wishlist.subtitle')}
        action={<button type="button" className="rounded-full border border-[color:var(--color-border)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:bg-[color:var(--color-surface)]">{t('account.wishlist.moveToCart')}</button>}
      />

      <div className="grid gap-5 md:grid-cols-2">
        {wishlistItems.map((item) => (
          <article key={item.id} className="overflow-hidden rounded-[1.75rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 shadow-[var(--shadow-soft)]">
            <img src={item.image} alt={item.name} className="h-48 w-full object-cover" />
            <div className="p-5">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--color-text-muted)]">{item.brand}</p>
              <h3 className="mt-2 text-lg font-semibold text-[color:var(--color-text-primary)]">{item.name}</h3>
              <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">{item.selectedColor} • {item.selectedSize}</p>
              <div className={`mt-4 flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
                <div>
                  <p className="text-sm font-semibold text-[color:var(--color-text-primary)]">{formatPrice(item.price)}</p>
                  <p className="text-sm text-[color:var(--color-text-muted)]">{t('account.wishlist.moveToCart')} • {formatPrice(item.compareAtPrice)}</p>
                </div>
                <button type="button" className="rounded-full btn-cta px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5">{t('account.wishlist.moveToCart')}</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
