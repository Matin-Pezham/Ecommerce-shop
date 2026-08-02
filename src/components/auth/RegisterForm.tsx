import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AuthFormField } from '@/components/auth/AuthFormField'
import {
  createRegisterValidationSchema,
  type RegisterFormInput,
  type RegisterFormOutput,
} from '@/features/auth/registerValidation'
import type { RegisterPayload } from '@/features/auth/types'
import { useTranslation } from '@/i18n'

type RegisterFormProps = {
  loading: boolean
  error?: string | null
  onSubmit: (values: RegisterPayload) => void
}

export function RegisterForm({ loading, error, onSubmit }: RegisterFormProps) {
  const { t, isRtl } = useTranslation()
  const schema = createRegisterValidationSchema({
    requiredField: t('auth.requiredField'),
    invalidEmail: t('auth.invalidEmail'),
    nameTooLong: t('auth.nameTooLong'),
    invalidPhone: t('auth.invalidPhone'),
    passwordTooShort: t('auth.passwordTooShort'),
    passwordRequirements: t('auth.passwordRequirements'),
    passwordMismatch: t('auth.passwordMismatch'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInput, undefined, RegisterFormOutput>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  })

  const submitRegister = (values: RegisterFormOutput) => {
    if (loading) {
      return
    }

    onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit(submitRegister)} aria-busy={loading ? 'true' : undefined} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <AuthFormField
          id="auth-register-first-name"
          type="text"
          label={t('auth.firstName')}
          error={errors.firstName?.message}
          {...register('firstName')}
          autoComplete="given-name"
        />
        <AuthFormField
          id="auth-register-last-name"
          type="text"
          label={t('auth.lastName')}
          error={errors.lastName?.message}
          {...register('lastName')}
          autoComplete="family-name"
        />
      </div>

      <AuthFormField
        id="auth-register-email"
        type="email"
        label={t('auth.email')}
        error={errors.email?.message}
        {...register('email')}
        autoComplete="email"
      />

      <AuthFormField
        id="auth-register-phone"
        type="tel"
        label={t('auth.phone')}
        error={errors.phone?.message}
        {...register('phone')}
        autoComplete="tel"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <AuthFormField
          id="auth-register-password"
          type="password"
          label={t('auth.password')}
          error={errors.password?.message}
          {...register('password')}
          autoComplete="new-password"
        />
        <AuthFormField
          id="auth-register-confirm-password"
          type="password"
          label={t('auth.confirmPassword')}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
          autoComplete="new-password"
        />
      </div>

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
        {loading ? t('common.loading') : t('auth.signUp')}
      </button>

      <p className={`text-xs text-[color:var(--color-text-secondary)] ${isRtl ? 'text-right' : ''}`}>{t('auth.mockNotice')}</p>
    </form>
  )
}
