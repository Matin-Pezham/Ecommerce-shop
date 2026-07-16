import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthFormField } from '@/components/auth/AuthFormField'
import { useTranslation } from '@/i18n'

type LoginFormValues = {
  email: string
  password: string
}

type LoginFormProps = {
  loading: boolean
  error?: string | null
  onSubmit: (values: LoginFormValues) => void
}

export function LoginForm({ loading, error, onSubmit }: LoginFormProps) {
  const { t, isRtl } = useTranslation()
  const [values, setValues] = useState<LoginFormValues>({ email: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof LoginFormValues, string>>>({})

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: Partial<Record<keyof LoginFormValues, string>> = {}
    if (!values.email.trim()) nextErrors.email = t('auth.requiredField')
    if (!values.password.trim()) nextErrors.password = t('auth.requiredField')

    setFieldErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AuthFormField
        id="auth-login-email"
        type="email"
        label={t('auth.email')}
        value={values.email}
        error={fieldErrors.email}
        onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
        autoComplete="email"
      />

      <AuthFormField
        id="auth-login-password"
        type="password"
        label={t('auth.password')}
        value={values.password}
        error={fieldErrors.password}
        onChange={(event) => setValues((prev) => ({ ...prev, password: event.target.value }))}
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
