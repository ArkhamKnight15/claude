import { cn } from '../../lib/cn'
import { getInitials } from '../../lib/initials'

const backgrounds = [
  'from-accent-100 via-mist to-[#f3efe8]',
  'from-[#efe9df] via-ivory to-accent-100',
  'from-navy-100 via-mist to-[#f3efe8]',
] as const

interface PortraitPlaceholderProps {
  name: string
  index?: number
  className?: string
}

/** Retrato provisório com monograma — substituído automaticamente quando houver foto. */
export function PortraitPlaceholder({ name, index = 0, className }: PortraitPlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('absolute inset-0 bg-gradient-to-br', backgrounds[index % backgrounds.length], className)}
    >
      <div className="absolute inset-x-[18%] top-[16%] bottom-0 rounded-t-full border border-navy-950/[0.07] bg-white/45" />
      <div className="absolute inset-x-[26%] top-[24%] bottom-0 rounded-t-full border border-navy-950/[0.05]" />
      <span className="absolute inset-0 flex items-center justify-center pt-[12%] font-display text-[clamp(3rem,7vw,4.5rem)] leading-none font-medium tracking-[-0.05em] text-navy-800/80">
        {getInitials(name)}
      </span>
    </div>
  )
}
