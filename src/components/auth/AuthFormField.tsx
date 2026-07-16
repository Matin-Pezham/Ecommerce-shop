import type { InputHTMLAttributes } from 'react'

type AuthFormFieldProps = {
  id: string
  label: string
  error?: string
} & InputHTMLAttributes<HTMLInputElement>

export function AuthFormField({ id, label, error, className, ...inputProps }: AuthFormFieldProps) {
  return (
    <label htmlFor={id} className="block space-y-1.5">
      <span className="text-sm font-medium text-[color:var(--color-text-primary)]">{label}</span>
      <input
        id={id}
        className={`w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] outline-none transition focus:border-[color:var(--color-primary)] ${className ?? ''}`}
        {...inputProps}
      />
      {error ? <span className="text-xs text-[color:var(--color-danger)]">{error}</span> : null}
    </label>
  )
}
