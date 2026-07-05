type PriceTagProps = {
  price: string
}

export function PriceTag({ price }: PriceTagProps) {
  return <p className="text-[1.05rem] font-semibold text-[color:var(--color-text-primary)]">{price}</p>
}
