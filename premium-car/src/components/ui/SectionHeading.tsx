import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  id: string
  eyebrow: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'start' | 'center'
  /** `md` para títulos longos em colunas estreitas. */
  size?: 'lg' | 'md'
  className?: string
}

/** Título de seção padronizado: rótulo na cor da marca, título expandido e subtítulo opcional. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = 'start',
  size = 'lg',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      as="header"
      className={cn('flex flex-col gap-5', align === 'center' && 'mx-auto max-w-3xl items-center text-center', className)}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2
        id={id}
        className={cn(
          'display',
          size === 'lg' ? 'text-[clamp(1.875rem,1.1rem+3.4vw,3.75rem)]' : 'text-[clamp(1.75rem,1rem+2.6vw,3.125rem)]',
        )}
      >
        {title}
      </h2>
      {subtitle && <p className="max-w-xl text-base leading-relaxed text-silver-400 sm:text-lg">{subtitle}</p>}
    </Reveal>
  )
}
