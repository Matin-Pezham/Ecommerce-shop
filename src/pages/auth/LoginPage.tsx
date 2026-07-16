import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { LoginForm } from '@/components/auth/LoginForm'
import { clearAuthError, loginWithMock } from '@/features/auth/authSlice'
import { selectAuthError, selectAuthStatus } from '@/features/auth/authSelectors'
import { sanitizeRedirectPath } from '@/features/auth/authUtils'
import { useTranslation } from '@/i18n'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

export function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { t, isRtl } = useTranslation()

  const status = useAppSelector(selectAuthStatus)
  const error = useAppSelector(selectAuthError)

  const redirect = sanitizeRedirectPath(searchParams.get('redirect'), '/account')

  return (
    <AuthLayout
      title={t('auth.loginTitle')}
      subtitle={t('auth.loginSubtitle')}
      footer={
        <p className={`text-sm text-[color:var(--color-text-secondary)] ${isRtl ? 'text-right' : ''}`}>
          {t('auth.noAccount')} {' '}
          <Link to="/register" className="font-semibold text-[color:var(--color-primary)] transition hover:opacity-80">
            {t('auth.createAccount')}
          </Link>
        </p>
      }
    >
      <LoginForm
        loading={status === 'loading'}
        error={error ? t(error) : null}
        onSubmit={async (values) => {
          dispatch(clearAuthError())
          const result = await dispatch(loginWithMock(values))
          if (loginWithMock.fulfilled.match(result)) {
            navigate(redirect)
          }
        }}
      />
    </AuthLayout>
  )
}
