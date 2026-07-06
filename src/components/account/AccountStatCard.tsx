type AccountStatCardProps = {
  label: string
  value: string
  description: string
  tone?: 'default' | 'accent'
}

export function AccountStatCard({ label, value, description, tone = 'default' }: AccountStatCardProps) {
  const toneClasses =
    tone === 'accent'
      ? 'border-fuchsia-200 bg-gradient-to-br from-fuchsia-50 to-sky-50 shadow-[0_20px_55px_rgba(236,72,153,0.12)]'
      : 'border-[color:var(--color-border)] bg-[color:var(--color-card)]'

  return (
    <div className={`rounded-[1.5rem] border p-5 shadow-[var(--shadow-soft)] ${toneClasses}`}>
      <p className="text-[0.75rem] font-semibold uppercase tracking-[0.26em] text-[color:var(--color-text-muted)]">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-[color:var(--color-text-primary)]">{value}</p>
      <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">{description}</p>
    </div>
  )
}
