import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

function ErrorBoundaryFallback({ error }: { error?: Error }) {
  const isDev = import.meta.env.DEV
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-slate-100">
      <h1 className="text-3xl font-semibold">Something went wrong</h1>
      <p className="mt-3 max-w-md text-sm text-slate-400">
        A critical error disrupted the experience. Please refresh and try again.
      </p>
      {isDev && error && (
        <details className="mt-6 max-w-2xl text-left">
          <summary className="cursor-pointer text-sm text-slate-300 hover:text-slate-200">
            Error Details
          </summary>
          <pre className="mt-2 overflow-auto rounded bg-slate-900 p-4 text-xs text-slate-300">
            {error.message}
            {error.stack && `\n\n${error.stack}`}
          </pre>
        </details>
      )}
    </div>
  )
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled application error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorBoundaryFallback error={this.state.error} />
    }

    return this.props.children
  }
}
