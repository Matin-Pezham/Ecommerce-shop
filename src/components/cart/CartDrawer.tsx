import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartDrawerEmpty } from '@/components/cart/CartDrawerEmpty'
import { CartDrawerHeader } from '@/components/cart/CartDrawerHeader'
import { CartDrawerItem } from '@/components/cart/CartDrawerItem'
import { CartDrawerSummary } from '@/components/cart/CartDrawerSummary'
import { closeCartDrawer, decreaseQuantity, increaseQuantity, removeItem } from '@/features/cart/cartSlice'
import {
  selectCartIsDrawerOpen,
  selectCartItems,
  selectCartShowAddedFeedback,
  selectCartSummary,
} from '@/features/cart/selectors'
import { useTranslation } from '@/i18n'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

export function CartDrawer() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isRtl, t } = useTranslation()
  const isOpen = useAppSelector(selectCartIsDrawerOpen)
  const showAddedFeedback = useAppSelector(selectCartShowAddedFeedback)
  const items = useAppSelector(selectCartItems)
  const summary = useAppSelector(selectCartSummary)
  const dialogRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch(closeCartDrawer())
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    window.setTimeout(() => dialogRef.current?.focus(), 0)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [dispatch, isOpen])

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[85]"
        >
          <button
            type="button"
            aria-label={t('cart.closeCart')}
            className="absolute inset-0 bg-black/35 backdrop-blur-[1px]"
            onClick={() => dispatch(closeCartDrawer())}
          />

          <motion.div
            ref={dialogRef}
            initial={{ x: isRtl ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? '-100%' : '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 34, mass: 0.9 }}
            className={`absolute top-0 h-full w-full max-w-[520px] bg-[color:var(--color-card)]/95 shadow-[var(--shadow-large)] backdrop-blur-xl ${
              isRtl ? 'left-0 border-r border-[color:var(--color-border)]' : 'right-0 border-l border-[color:var(--color-border)]'
            }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
            tabIndex={-1}
          >
            <div className="flex h-full flex-col">
              <CartDrawerHeader
                showAddedFeedback={showAddedFeedback}
                onClose={() => dispatch(closeCartDrawer())}
              />

              {items.length === 0 ? (
                <CartDrawerEmpty onContinueShopping={() => dispatch(closeCartDrawer())} />
              ) : (
                <>
                  <div className="flex-1 space-y-3 overflow-y-auto p-4">
                    {items.map((item) => (
                      <CartDrawerItem
                        key={item.id}
                        item={item}
                        onIncrease={(id) => dispatch(increaseQuantity(id))}
                        onDecrease={(id) => dispatch(decreaseQuantity(id))}
                        onRemove={(id) => dispatch(removeItem(id))}
                      />
                    ))}
                  </div>

                  <CartDrawerSummary
                    summary={summary}
                    onContinueShopping={() => dispatch(closeCartDrawer())}
                    onCheckout={() => {
                      dispatch(closeCartDrawer())
                      navigate('/checkout/shipping')
                    }}
                  />
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
