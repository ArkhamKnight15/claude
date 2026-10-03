import { ArrowRight } from 'lucide-react'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline-light' | 'ghost'
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
    'overflow-hidden bg-navy-950 text-white before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-1/3 before:-translate-x-full before:skew-x-[-20deg] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-transform before:duration-700 before:ease-out-expo hover:before:translate-x-[400%] shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_10px_24px_-12px_rgb(10_22_40/0.55)] hover:bg-navy-800 hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.14),0_16px_32px_-14px_rgb(10_22_40/0.6)]',
  secondary:
    'bg-white text-navy-950 shadow-soft ring-1 ring-inset ring-navy-950/10 hover:ring-navy-950/25',
  accent:
    'bg-accent-300 text-navy-950 shadow-[inset_0_1px_0_rgb(255_255_255/0.4),0_12px_30px_-14px_rgb(155_201_238/0.7)] hover:bg-accent-200',
  'outline-light': 'text-white ring-1 ring-inset ring-white/20 hover:bg-white/[0.06] hover:ring-white/40',
  ghost: 'text-navy-950 hover:bg-navy-950/5',
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
