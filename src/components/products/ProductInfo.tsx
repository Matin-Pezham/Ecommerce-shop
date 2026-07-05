import type { ReactNode } from 'react'

type ProductInfoProps = {
  title: string
  description: string
  price: string
  children?: ReactNode
}

export function ProductInfo({ title, description, price, children }: ProductInfoProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h3 className="text-[1.05rem] font-semibold text-[color:var(--color-text-primary)] tracking-[-0.02em]">{title}</h3>
          <p className="mt-1 text-sm leading-7 text-[color:var(--color-text-secondary)]">{description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-[1.05rem] font-semibold text-[color:var(--color-text-primary)]">{price}</p>
        {children}
      </div>
    </div>
  )
}
