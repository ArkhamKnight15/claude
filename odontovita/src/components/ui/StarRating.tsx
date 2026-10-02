import { Star } from 'lucide-react'
import { cn } from '../../lib/cn'

interface StarRatingProps {
  rating: number
  max?: number
  className?: string
  starClassName?: string
}

export function StarRating({ rating, max = 5, className, starClassName }: StarRatingProps) {
  return (
    <div
      role="img"
      aria-label={`Avaliação: ${rating.toLocaleString('pt-BR')} de ${max} estrelas`}
      className={cn('flex items-center gap-0.5', className)}
    >
      {Array.from({ length: max }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          strokeWidth={0}
          className={cn('size-4', index < Math.round(rating) ? 'fill-current' : 'fill-current opacity-25', starClassName)}
        />
      ))}
    </div>
  )
}
