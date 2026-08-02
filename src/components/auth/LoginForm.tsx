import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { AuthFormField } from '@/components/auth/AuthFormField'
import { createLoginValidationSchema, type LoginFormValues } from '@/features/auth/loginValidation'
import { useTranslation } from '@/i18n'

type LoginFormProps = {
  loading: boolean
  error?: string | null
  onSubmit: (values: LoginFormValues) => void
}

export function LoginForm({ loading, error, onSubmit }: LoginFormProps) {
  const { t, isRtl } = useTranslation()
  const schema = createLoginValidationSchema({
    requiredField: t('auth.requiredField'),
    invalidEmail: t('auth.invalidEmail'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const submitLogin = (values: LoginFormValues) => {
    if (loading) {
      return
    }
    onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit(submitLogin)} aria-busy={loading ? 'true' : undefined} className="space-y-4">
      <AuthFormField
        id="auth-login-email"
        type="email"
        label={t('auth.email')}
        error={errors.email?.message}
        {...register('email')}
        autoComplete="email"
      />

      <AuthFormField
        id="auth-login-password"
        type="password"
        label={t('auth.password')}
        error={errors.password?.message}
        {...register('password')}
        autoComplete="current-password"
      />

      {error ? <p className={`text-sm text-[color:var(--color-danger)] ${isRtl ? 'text-right' : ''}`}>{error}</p> : null}

      <div className={`flex items-center justify-between gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <Link to="/forgot-password" className="text-sm font-medium text-[color:var(--color-primary)] transition hover:opacity-80">
          {t('auth.forgotPassword')}
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full btn-cta px-5 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? t('common.loading') : t('auth.signIn')}
      </button>

      <p className={`text-xs text-[color:var(--color-text-secondary)] ${isRtl ? 'text-right' : ''}`}>{t('auth.mockNotice')}</p>
    </form>
  )
}
