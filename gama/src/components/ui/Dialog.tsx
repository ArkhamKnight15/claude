import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react'
import { useScrollLock } from '../../hooks/useScrollLock'
import { cn } from '../../lib/cn'

const CLOSE_ANIMATION_MS = 240

interface DialogProps {
  open: boolean
  onClose: () => void
  labelledBy: string
  describedBy?: string
  /** `sheet`: bottom sheet no mobile e centralizado no tablet/desktop. `fullscreen`: ocupa a tela toda. */
  variant?: 'sheet' | 'fullscreen'
  /** Largura máxima a partir do tablet (variante `sheet`). */
  width?: string
  /** Quando falso, Esc e clique fora não fecham (ex.: verificação de idade). */
  dismissible?: boolean
  /** Seletor do elemento que recebe o foco ao abrir. Sem ele, o foco vai para o primeiro elemento focável. */
  initialFocus?: string
  onKeyDown?: (event: KeyboardEvent<HTMLDialogElement>) => void
  className?: string
  children: (helpers: { close: () => void }) => ReactNode
}

/** Modal sobre o <dialog> nativo: foco preso, rolagem da página travada e fechamento animado. */
export function Dialog({
  open,
  onClose,
  labelledBy,
  describedBy,
  variant = 'sheet',
  width,
  dismissible = true,
  initialFocus,
  onKeyDown,
  className,
  children,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [closing, setClosing] = useState(false)

  useScrollLock(open)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !open || dialog.open) return

    dialog.showModal()
    const target = initialFocus ? dialog.querySelector<HTMLElement>(initialFocus) : null
    target?.focus()
  }, [open, initialFocus])

  useEffect(() => {
    if (!closing) return
    const timer = window.setTimeout(() => {
      dialogRef.current?.close()
      setClosing(false)
      onClose()
    }, CLOSE_ANIMATION_MS)
    return () => window.clearTimeout(timer)
  }, [closing, onClose])

  const requestClose = useCallback(() => setClosing(true), [])

  return (
    <dialog
      ref={dialogRef}
      className={cn('app-dialog', className)}
      data-variant={variant}
      data-closing={closing}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      style={width ? ({ '--dialog-width': width } as CSSProperties) : undefined}
      onCancel={(event) => {
        event.preventDefault()
        if (dismissible) requestClose()
      }}
      onClose={() => {
        if (open && !closing) onClose()
      }}
      onClick={(event) => {
        if (dismissible && event.target === event.currentTarget) requestClose()
      }}
      onKeyDown={onKeyDown}
    >
      {(open || closing) && children({ close: requestClose })}
    </dialog>
  )
}
