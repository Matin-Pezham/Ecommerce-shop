import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm'
import { clearAuthError, forgotPasswordWithMock } from '@/features/auth/authSlice'
import { selectAuthError, selectAuthStatus } from '@/features/auth/authSelectors'
import { useTranslation } from '@/i18n'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

export function ForgotPasswordPage() {
  const dispatch = useAppDispatch()
  const { t, isRtl } = useTranslation()

  const status = useAppSelector(selectAuthStatus)
  const error = useAppSelector(selectAuthError)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  return (
    <AuthLayout
      title={t('auth.forgotPasswordTitle')}
      subtitle={t('auth.forgotPasswordSubtitle')}
      footer={
        <div className={isRtl ? 'text-right' : ''}>
          <Link to="/login" className="text-sm font-semibold text-[color:var(--color-primary)] transition hover:opacity-80">
            {t('auth.backToLogin')}
          </Link>
        </div>
      }
    >
      <ForgotPasswordForm
        loading={status === 'loading'}
        successMessage={successMessage}
        error={error ? t(error) : null}
        onSubmit={async (email) => {
          setSuccessMessage(null)
          dispatch(clearAuthError())
          const result = await dispatch(forgotPasswordWithMock(email))
          if (forgotPasswordWithMock.fulfilled.match(result)) {
            setSuccessMessage(t('auth.forgotPasswordSuccess'))
          }
        }}
      />
    </AuthLayout>
  )
}
