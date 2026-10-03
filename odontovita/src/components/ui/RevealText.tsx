import { Children, cloneElement, isValidElement, type CSSProperties, type ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'
import { cn } from '../../lib/cn'

interface RevealTextProps {
  as?: 'h1' | 'h2' | 'h3'
  id?: string
  className?: string
  children: ReactNode
  /** `view`: anima ao entrar na tela. `load`: anima assim que a página carrega (primeira dobra). */
  trigger?: 'view' | 'load'
  delay?: number
}

/** Envolve cada palavra (inclusive dentro de <em>) para animá-las em sequência, sem alterar o texto lido. */
function splitWords(node: ReactNode, counter: { value: number }): ReactNode {
  return Children.map(node, (child) => {
    if (typeof child === 'string') {
      return child.split(/(\s+)/).map((part) => {
        if (!part || /^\s+$/.test(part)) return part
        const index = counter.value++
        return (
          <span key={index} className="split-word">
            <span className="split-word-inner" style={{ '--word': index } as CSSProperties}>
              {part}
            </span>
          </span>
        )
      })
    }
    if (isValidElement<{ children?: ReactNode }>(child)) {
      return cloneElement(child, undefined, splitWords(child.props.children, counter))
    }
    return child
  })
}

/** Título revelado palavra por palavra, com máscara e escalonamento. */
export function RevealText({ as: Tag = 'h2', id, className, children, trigger = 'view', delay = 0 }: RevealTextProps) {
  const [ref, inView] = useInView<HTMLHeadingElement>()

  return (
    <Tag
      ref={ref}
      id={id}
      data-trigger={trigger}
      data-visible={trigger === 'load' || inView}
      className={cn('split-text', className)}
      style={{ '--split-delay': `${delay}ms` } as CSSProperties}
    >
      {splitWords(children, { value: 0 })}
    </Tag>
  )
}
