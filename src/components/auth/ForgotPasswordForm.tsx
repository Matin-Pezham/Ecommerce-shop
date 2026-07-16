import { useState } from 'react'
import { AuthFormField } from '@/components/auth/AuthFormField'
import { useTranslation } from '@/i18n'

type ForgotPasswordFormProps = {
  loading: boolean
  successMessage?: string | null
  error?: string | null
  onSubmit: (email: string) => void
}

export function ForgotPasswordForm({ loading, successMessage, error, onSubmit }: ForgotPasswordFormProps) {
  const { t, isRtl } = useTranslation()
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<string | undefined>()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email.trim()) {
      setEmailError(t('auth.requiredField'))
      return
    }

    setEmailError(undefined)
    onSubmit(email)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AuthFormField
        id="auth-forgot-email"
        type="email"
        label={t('auth.email')}
        value={email}
        error={emailError}
        onChange={(event) => setEmail(event.target.value)}
        autoComplete="email"
      />

      {successMessage ? <p className={`text-sm text-[color:var(--color-success)] ${isRtl ? 'text-right' : ''}`}>{successMessage}</p> : null}
      {error ? <p className={`text-sm text-[color:var(--color-danger)] ${isRtl ? 'text-right' : ''}`}>{error}</p> : null}

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
