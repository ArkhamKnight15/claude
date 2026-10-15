import type { CSSProperties, ElementType, HTMLAttributes } from 'react'
import { useInView } from '../../hooks/useInView'
import { cn } from '../../lib/cn'

interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'li' | 'article' | 'figure' | 'header'
  /** Atraso em milissegundos, útil para escalonar itens de uma lista. */
  delay?: number
}

/** Revela o conteúdo com fade + slide quando ele entra na viewport. */
export function Reveal({ as = 'div', delay = 0, className, style, ...props }: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>()
  const Tag = as as ElementType

  return (
    <Tag
      ref={ref}
      data-visible={inView}
      className={cn('reveal', className)}
      style={{ '--reveal-delay': `${delay}ms`, ...style } as CSSProperties}
      {...props}
    />
  )
}
