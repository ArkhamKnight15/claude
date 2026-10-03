import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Eyebrow } from './Eyebrow'
import { Reveal } from './Reveal'
import { RevealText } from './RevealText'

interface SectionHeaderProps {
  id?: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  /** `split` coloca título e descrição lado a lado em telas grandes. */
  layout?: 'stacked' | 'split' | 'center'
  tone?: 'dark' | 'light'
  className?: string
  children?: ReactNode
}

export const headingClasses = 'font-serif text-[2.5rem] leading-[1.04] tracking-[-0.015em] sm:text-5xl lg:text-[3.5rem]'

export function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  layout = 'stacked',
  tone = 'dark',
  className,
  children,
}: SectionHeaderProps) {
  const isLight = tone === 'light'

  return (
    <div
      className={cn(
        layout === 'split' && 'grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10',
        layout === 'center' && 'mx-auto max-w-2xl text-center',
        layout === 'stacked' && 'max-w-2xl',
        className,
      )}
    >
      <div className={cn(layout === 'split' && 'lg:col-span-7')}>
        <Reveal>
          <Eyebrow tone={tone} className={cn(layout === 'center' && 'justify-center')}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
        <RevealText id={id} delay={80} className={cn(headingClasses, 'mt-5', isLight && 'text-white')}>
          {title}
        </RevealText>
      </div>
      {(description || children) && (
        <Reveal delay={120} className={cn(layout === 'split' ? 'lg:col-span-5 lg:pb-2' : 'mt-6')}>
          {description && (
            <p className={cn('text-[1.0625rem] leading-relaxed sm:text-lg', isLight ? 'text-navy-200' : 'text-body')}>
              {description}
            </p>
          )}
          {children}
        </Reveal>
      )}
    </div>
  )
}
