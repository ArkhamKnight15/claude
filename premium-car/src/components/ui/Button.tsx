import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Variant = 'gold' | 'outline' | 'ghost'
type Size = 'md' | 'lg'

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  /** Abre em nova aba com `rel` seguro (links externos, como o WhatsApp). */
  external?: boolean
}

const variants: Record<Variant, string> = {
  gold: 'sheen bg-gold-400 text-ink-950 hover:bg-gold-300 hover:shadow-gold active:bg-gold-500',
  outline: 'border border-white/20 text-snow hover:border-white/45 hover:bg-white/[0.06] active:bg-white/10',
  ghost: 'text-snow hover:text-gold-200',
}

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-[0.8125rem]',
  lg: 'h-14 px-7 text-sm',
}

/** Botão como link (todas as ações do site levam a uma seção ou ao WhatsApp). */
export function Button({
  variant = 'gold',
  size = 'md',
  icon,
  external,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={cn(
        'group/button inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full font-display font-semibold tracking-[0.08em] uppercase [font-stretch:112%]',
        'transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-out active:scale-[0.98]',
        variants[variant],
        sizes[size],
        className,
      )}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      {...props}
    >
      {children}
      {icon && (
        <span aria-hidden="true" className="transition-transform duration-300 ease-out group-hover/button:translate-x-0.5">
          {icon}
        </span>
      )}
    </a>
  )
}
