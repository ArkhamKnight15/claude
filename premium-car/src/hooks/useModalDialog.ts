import { useEffect, useRef } from 'react'

/**
 * Sincroniza um <dialog> nativo com o estado do React: abre com `showModal()` (foco preso e Esc nativos),
 * fecha com clique no fundo e devolve o foco ao elemento que abriu o diálogo.
 */
export function useModalDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return

    if (open && !dialog.open) {
      const opener = document.activeElement as HTMLElement | null
      dialog.showModal()
      document.documentElement.style.overflow = 'hidden'
      return () => {
        document.documentElement.style.overflow = ''
        if (dialog.open) dialog.close()
        opener?.focus({ preventScroll: true })
      }
    }
  }, [open])

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return

    // Esc dispara `cancel`; o estado do React é quem decide fechar.
    const handleCancel = (event: Event) => {
      event.preventDefault()
      onCloseRef.current()
    }
    // Clique fora do conteúdo: o alvo é o próprio <dialog> (área do backdrop).
    const handleClick = (event: MouseEvent) => {
      if (event.target === dialog) onCloseRef.current()
    }

    dialog.addEventListener('cancel', handleCancel)
    dialog.addEventListener('click', handleClick)
    return () => {
      dialog.removeEventListener('cancel', handleCancel)
      dialog.removeEventListener('click', handleClick)
    }
  }, [])

  return ref
}
