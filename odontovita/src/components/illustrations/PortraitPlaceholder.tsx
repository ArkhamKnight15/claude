import { cn } from '../../lib/cn'
import { getInitials } from '../../lib/initials'

const backgrounds = [
  'from-[#15294a] via-surface to-canvas-alt',
  'from-[#262a31] via-surface to-[#10233f]',
  'from-[#10233f] via-surface-raised to-canvas-alt',
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
      <div className="absolute inset-x-[18%] top-[16%] bottom-0 rounded-t-full border border-white/[0.08] bg-white/[0.03]" />
      <div className="absolute inset-x-[26%] top-[24%] bottom-0 rounded-t-full border border-white/[0.05]" />
      <span className="absolute inset-0 flex items-center justify-center pt-[12%] font-serif text-[clamp(3.5rem,9vw,5.5rem)] leading-none text-accent-100/80">
        {getInitials(name)}
      </span>
    </div>
  )
}
