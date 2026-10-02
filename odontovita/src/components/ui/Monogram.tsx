import { cn } from '../../lib/cn'
import { getInitials } from '../../lib/initials'

const tones = [
  'bg-accent-300/15 text-accent-200',
  'bg-[#1c2a40] text-ink',
  'bg-[#2a2620] text-[#eadfca]',
  'bg-accent-500/25 text-accent-100',
] as const

interface MonogramProps {
  name: string
  index?: number
  className?: string
}

/** Avatar com iniciais — substitui fotos de pacientes, preservando a privacidade. */
export function Monogram({ name, index = 0, className }: MonogramProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-serif text-lg leading-none',
        tones[index % tones.length],
        className,
      )}
    >
      {getInitials(name)}
    </span>
  )
}
