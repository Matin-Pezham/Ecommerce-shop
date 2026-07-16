import { useState } from 'react'
import { AuthFormField } from '@/components/auth/AuthFormField'
import { useTranslation } from '@/i18n'

type RegisterFormValues = {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

type RegisterFormProps = {
  loading: boolean
  error?: string | null
  onSubmit: (values: RegisterFormValues) => void
}

export function RegisterForm({ loading, error, onSubmit }: RegisterFormProps) {
  const { t, isRtl } = useTranslation()
  const [values, setValues] = useState<RegisterFormValues>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof RegisterFormValues, string>>>({})

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: Partial<Record<keyof RegisterFormValues, string>> = {}

    if (!values.firstName.trim()) nextErrors.firstName = t('auth.requiredField')
    if (!values.lastName.trim()) nextErrors.lastName = t('auth.requiredField')
    if (!values.email.trim()) nextErrors.email = t('auth.requiredField')
    if (!values.password.trim()) nextErrors.password = t('auth.requiredField')
    if (!values.confirmPassword.trim()) nextErrors.confirmPassword = t('auth.requiredField')
    if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
      nextErrors.confirmPassword = t('auth.passwordMismatch')
    }

    setFieldErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <AuthFormField
          id="auth-register-first-name"
          type="text"
          label={t('auth.firstName')}
          value={values.firstName}
          error={fieldErrors.firstName}
          onChange={(event) => setValues((prev) => ({ ...prev, firstName: event.target.value }))}
          autoComplete="given-name"
        />
        <AuthFormField
          id="auth-register-last-name"
          type="text"
          label={t('auth.lastName')}
          value={values.lastName}
          error={fieldErrors.lastName}
          onChange={(event) => setValues((prev) => ({ ...prev, lastName: event.target.value }))}
          autoComplete="family-name"
        />
      </div>

      <AuthFormField
        id="auth-register-email"
        type="email"
        label={t('auth.email')}
        value={values.email}
        error={fieldErrors.email}
        onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
        autoComplete="email"
      />

      <AuthFormField
        id="auth-register-phone"
        type="tel"
        label={t('auth.phone')}
        value={values.phone}
        error={fieldErrors.phone}
        onChange={(event) => setValues((prev) => ({ ...prev, phone: event.target.value }))}
        autoComplete="tel"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <AuthFormField
          id="auth-register-password"
          type="password"
          label={t('auth.password')}
          value={values.password}
          error={fieldErrors.password}
          onChange={(event) => setValues((prev) => ({ ...prev, password: event.target.value }))}
          autoComplete="new-password"
        />
        <AuthFormField
          id="auth-register-confirm-password"
          type="password"
          label={t('auth.confirmPassword')}
          value={values.confirmPassword}
          error={fieldErrors.confirmPassword}
          onChange={(event) => setValues((prev) => ({ ...prev, confirmPassword: event.target.value }))}
          autoComplete="new-password"
        />
      </div>

      {error ? <p className={`text-sm text-[color:var(--color-danger)] ${isRtl ? 'text-right' : ''}`}>{error}</p> : null}

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
