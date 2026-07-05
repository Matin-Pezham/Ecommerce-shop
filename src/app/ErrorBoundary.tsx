import { Component, type ErrorInfo, type ReactNode } from 'react'
import { useTranslation } from '@/i18n'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

function ErrorBoundaryContent() {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-slate-100">
      <h1 className="text-3xl font-semibold">{t('errorBoundary.title')}</h1>
      <p className="mt-3 max-w-md text-sm text-slate-400">
        {t('errorBoundary.description')}
      </p>
    </div>
  )
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled application error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorBoundaryContent />
    }

    return this.props.children
  }
}
