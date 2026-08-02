type StartupErrorFallbackProps = {
  error: Error
}

export const StartupErrorFallback = ({ error }: StartupErrorFallbackProps) => {
  if (!import.meta.env.DEV) {
    return (
      <div style={{ padding: 20, fontFamily: 'sans-serif', color: '#666', textAlign: 'center' }}>
        <h2>Application Error</h2>
        <p>The application encountered an error and could not start. Please try refreshing the page.</p>
      </div>
    )
  }

  return (
    <div style={{ padding: 20, fontFamily: 'monospace', color: '#d32f2f', background: '#fff3e0' }}>
      <h2 style={{ margin: '0 0 10px 0', color: '#c62828' }}>Application Startup Error</h2>
      <p style={{ margin: '0 0 10px 0', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        <strong>{error.message || 'An error occurred during application startup'}</strong>
      </p>
      <details>
        <summary style={{ cursor: 'pointer', color: '#1976d2' }}>Stack Trace</summary>
        <pre style={{ overflow: 'auto', padding: 10, background: '#f5f5f5', borderRadius: 4 }}>
          {error.stack || 'No stack trace available'}
        </pre>
      </details>
      <p style={{ margin: '20px 0 0 0', fontSize: 12, color: '#666' }}>
        Check the browser console for more details.
      </p>
    </div>
  )
}
