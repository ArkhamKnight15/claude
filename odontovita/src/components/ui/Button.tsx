import { ArrowRight } from 'lucide-react'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonStyleProps {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Exibe uma seta que desliza no hover. */
  arrow?: boolean
  leadingIcon?: ReactNode
}

const baseClasses =
  'group relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-[-0.005em] transition-[background-color,box-shadow,color,transform] duration-300 ease-out-expo active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-offset-4'

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-accent-300 text-navy-950 shadow-[inset_0_1px_0_rgb(255_255_255/0.45),0_10px_28px_-12px_rgb(155_201_238/0.5)] hover:bg-accent-200 hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),0_14px_34px_-12px_rgb(155_201_238/0.6)]',
  secondary: 'bg-white/[0.04] text-ink ring-1 ring-inset ring-white/15 hover:bg-white/[0.08] hover:ring-white/30',
  ghost: 'text-ink hover:bg-white/[0.06]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[0.9375rem]',
  lg: 'h-14 px-7 text-base',
}

function buttonClasses({ variant = 'primary', size = 'md' }: ButtonStyleProps, className?: string) {
  return cn(baseClasses, variantClasses[variant], sizeClasses[size], className)
}

function ButtonContent({ children, arrow, leadingIcon }: ButtonStyleProps & { children: ReactNode }) {
  return (
    <>
      {leadingIcon}
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
        />
      )}
    </>
  )
}

type ButtonProps = ButtonStyleProps & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ variant, size, arrow, leadingIcon, className, children, type = 'button', ...props }: ButtonProps) {
  return (
    <button type={type} className={buttonClasses({ variant, size }, className)} {...props}>
      <ButtonContent arrow={arrow} leadingIcon={leadingIcon}>
        {children}
      </ButtonContent>
    </button>
  )
}

type ButtonLinkProps = ButtonStyleProps & AnchorHTMLAttributes<HTMLAnchorElement>

export function ButtonLink({ variant, size, arrow, leadingIcon, className, children, ...props }: ButtonLinkProps) {
  return (
    <a className={buttonClasses({ variant, size }, className)} {...props}>
      <ButtonContent arrow={arrow} leadingIcon={leadingIcon}>
        {children}
      </ButtonContent>
    </a>
  )
}
