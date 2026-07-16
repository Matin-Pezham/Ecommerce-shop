import type { ReactNode } from 'react'

type ProductVariantOption = {
  id: string
  label: string
  disabled?: boolean
  meta?: ReactNode
}

type ProductVariantSelectorProps = {
  title: string
  selectedId?: string
  onSelect: (id: string) => void
  options: ProductVariantOption[]
  type?: 'default' | 'color'
}

export function ProductVariantSelector({
  title,
  selectedId,
  onSelect,
  options,
  type = 'default',
}: ProductVariantSelectorProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-[color:var(--color-text-primary)]">{title}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selectedId === option.id
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              disabled={option.disabled}
              aria-pressed={isSelected}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                isSelected
                  ? 'border-[color:var(--color-primary)] bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)]'
                  : 'border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text-primary)] hover:bg-[color:var(--color-card)]'
              } disabled:cursor-not-allowed disabled:opacity-45`}
            >
              {type === 'color' ? option.meta : null}
              <span>{option.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
