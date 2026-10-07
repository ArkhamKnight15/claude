import { cn } from '../../lib/cn'
import { getInitials } from '../../lib/initials'

const tones = [
  'bg-accent-100 text-navy-800',
  'bg-navy-100 text-navy-800',
  'bg-[#efe9df] text-navy-800',
  'bg-accent-200 text-navy-900',
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
        'inline-flex shrink-0 items-center justify-center rounded-full font-display text-[0.9375rem] leading-none font-semibold tracking-[-0.02em]',
        tones[index % tones.length],
        className,
      )}
    >
      {getInitials(name)}
    </span>
  )
}
