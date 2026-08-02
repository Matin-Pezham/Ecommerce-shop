import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AuthFormField } from '@/components/auth/AuthFormField'
import {
  createForgotPasswordValidationSchema,
  type ForgotPasswordFormInput,
  type ForgotPasswordFormOutput,
} from '@/features/auth/forgotPasswordValidation'
import { useTranslation } from '@/i18n'

type ForgotPasswordFormProps = {
  loading: boolean
  successMessage?: string | null
  error?: string | null
  onSubmit: (email: string) => void | Promise<void>
}

export function ForgotPasswordForm({ loading, successMessage, error, onSubmit }: ForgotPasswordFormProps) {
  const { t, isRtl } = useTranslation()
  const schema = createForgotPasswordValidationSchema({
    requiredField: t('auth.requiredField'),
    invalidEmail: t('auth.invalidEmail'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInput, undefined, ForgotPasswordFormOutput>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
    },
  })

  const submitForgotPassword = async (values: ForgotPasswordFormOutput) => {
    if (loading) {
      return
    }

    await onSubmit(values.email)
  }

  return (
    <form onSubmit={handleSubmit(submitForgotPassword)} aria-busy={loading ? 'true' : undefined} className="space-y-4">
      <AuthFormField
        id="auth-forgot-email"
        type="email"
        label={t('auth.email')}
        error={errors.email?.message}
        {...register('email')}
        autoComplete="email"
      />

      {successMessage ? (
        <p role="status" aria-live="polite" className={`text-sm text-[color:var(--color-success)] ${isRtl ? 'text-right' : ''}`}>
          {successMessage}
        </p>
      ) : null}
      {error ? (
        <p role="alert" className={`text-sm text-[color:var(--color-danger)] ${isRtl ? 'text-right' : ''}`}>
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full btn-cta px-5 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? t('common.loading') : t('auth.forgotPassword')}
      </button>
    </form>
  )
}
