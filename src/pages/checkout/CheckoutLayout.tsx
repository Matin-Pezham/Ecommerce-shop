import { Outlet } from 'react-router-dom'
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper'
import { selectCheckoutCurrentStep } from '@/features/checkout/checkoutSelectors'
import { useTranslation } from '@/i18n'
import { useAppSelector } from '@/store/hooks'

export function CheckoutLayout() {
  const { t, isRtl } = useTranslation()
  const currentStep = useAppSelector(selectCheckoutCurrentStep)

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className={isRtl ? 'text-right' : ''}>
        <h1 className="text-3xl font-semibold text-[color:var(--color-text-primary)]">{t('checkout.title')}</h1>
        <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">{t('checkout.subtitle')}</p>
      </header>

      <div className="mt-6">
        <CheckoutStepper currentStep={currentStep} />
      </div>

      <div className="mt-6">
        <Outlet />
      </div>
    </section>
  )
}
