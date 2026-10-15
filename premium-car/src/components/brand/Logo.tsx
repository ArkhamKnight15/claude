import { site } from '../../config/site'
import { cn } from '../../lib/cn'
import { Emblem } from './Emblem'

interface LogoProps {
  className?: string
  /** Exibe a linha "Estética automotiva" abaixo do nome. */
  withTagline?: boolean
}

/** Logotipo tipográfico: monograma dourado + nome em versão expandida. */
export function Logo({ className, withTagline = true }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <Emblem className="size-8 shrink-0 text-gold-300" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[0.95rem] font-bold tracking-[0.2em] text-snow uppercase [font-stretch:125%]">
          Premium <span className="text-gold-300">Car</span>
        </span>
        {withTagline && (
          <span className="mt-1.5 font-display text-[0.5625rem] font-medium tracking-[0.42em] text-silver-400 uppercase [font-stretch:110%]">
            {site.tagline}
          </span>
        )}
      </span>
    </span>
  )
}
