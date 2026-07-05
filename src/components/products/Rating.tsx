import { Star } from 'lucide-react'

type RatingProps = {
  value: number
  reviews: number
}

export function Rating({ value, reviews }: RatingProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)]">
      <div className="flex items-center gap-1 text-[color:var(--color-warning)]">
        <Star size={14} fill="currentColor" />
        <span className="font-medium text-[color:var(--color-text-primary)]">{value.toFixed(1)}</span>
      </div>
      <span>({reviews})</span>
    </div>
  )
}
