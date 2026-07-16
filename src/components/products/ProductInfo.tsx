import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type ProductInfoProps = {
  title: string
  description: string
  longDescription?: string
  price: string
  titleHref?: string
  children?: ReactNode
}

export function ProductInfo({ title, description, longDescription, price, titleHref, children }: ProductInfoProps) {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          {titleHref ? (
            <Link to={titleHref} className="block max-h-[3.2rem] overflow-hidden text-[1.05rem] font-semibold text-(--color-text-primary) tracking-[-0.02em] transition hover:text-[color:var(--color-primary)]">
              {title}
            </Link>
          ) : (
            <h3 className="max-h-[3.2rem] overflow-hidden text-[1.05rem] font-semibold text-(--color-text-primary) tracking-[-0.02em]">{title}</h3>
          )}
          <p className="mt-1 max-h-[3.5rem] overflow-hidden text-sm leading-7 text-(--color-text-secondary)">{description}</p>
        </div>
      </div>
      {longDescription ? (
        <p className="max-h-[4rem] overflow-hidden text-sm leading-8 text-(--color-text-secondary)">{longDescription}</p>
      ) : null}
      <div className="mt-auto flex items-center justify-between gap-3">
        <p className="text-[1.05rem] font-semibold text-(--color-text-primary)">{price}</p>
        {children}
      </div>
    </div>
  )
}
