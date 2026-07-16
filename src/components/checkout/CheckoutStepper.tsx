import { useTranslation } from '@/i18n'

type CheckoutStep = 'shipping' | 'payment' | 'review'

type CheckoutStepperProps = {
  currentStep: CheckoutStep
}

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  const { t, isRtl } = useTranslation()

  const steps: Array<{ id: CheckoutStep; label: string }> = [
    { id: 'shipping', label: t('checkout.shippingStep') },
    { id: 'payment', label: t('checkout.paymentStep') },
    { id: 'review', label: t('checkout.reviewStep') },
  ]

  const currentIndex = steps.findIndex((step) => step.id === currentStep)

  return (
    <ol className={`grid gap-2 sm:grid-cols-3 ${isRtl ? '[direction:rtl]' : ''}`}>
      {steps.map((step, index) => {
        const isActive = step.id === currentStep
        const isDone = index < currentIndex

        return (
          <li
            key={step.id}
            className={`rounded-[1rem] border px-4 py-3 text-sm ${
              isActive
                ? 'border-[color:var(--color-primary)] bg-[color:var(--color-primary)]/8 text-[color:var(--color-primary)]'
                : isDone
                  ? 'border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text-primary)]'
                  : 'border-[color:var(--color-border)] bg-[color:var(--color-card)] text-[color:var(--color-text-secondary)]'
            }`}
          >
            {step.label}
          </li>
        )
      })}
    </ol>
  )
}
