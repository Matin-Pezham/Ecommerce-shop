import { forwardRef, type InputHTMLAttributes } from 'react'

type AuthFormFieldProps = {
  id: string
  label: string
  error?: string
} & InputHTMLAttributes<HTMLInputElement>

export const AuthFormField = forwardRef<HTMLInputElement, AuthFormFieldProps>(function AuthFormField(
  { id, label, error, className, ...inputProps },
  ref,
) {
  const labelId = `${id}-label`
  const errorId = `${id}-error`
  const hasError = Boolean(error)
  const labelledBy = [inputProps['aria-labelledby'], labelId].filter(Boolean).join(' ')
  const describedBy = [inputProps['aria-describedby'], hasError ? errorId : null].filter(Boolean).join(' ')

  return (
    <label htmlFor={id} className="block space-y-1.5">
      <span id={labelId} className="text-sm font-medium text-[color:var(--color-text-primary)]">
        {label}
      </span>
      <input
        id={id}
        ref={ref}
        aria-invalid={hasError ? 'true' : undefined}
        aria-labelledby={labelledBy || undefined}
        aria-describedby={describedBy || undefined}
        className={`w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] outline-none transition focus:border-[color:var(--color-primary)] ${className ?? ''}`}
        {...inputProps}
      />
      {error ? (
        <span id={errorId} role="alert" className="text-xs text-[color:var(--color-danger)]">
          {error}
        </span>
      ) : null}
    </label>
  )
})
