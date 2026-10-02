import { CalendarCheck, Clock, Phone, ScanLine, X } from 'lucide-react'
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { clinic } from '../../data/clinic'
import { useScrollLock } from '../../hooks/useScrollLock'
import { Logo } from '../brand/Logo'

const CLOSE_ANIMATION_MS = 240

const steps = [
  { icon: CalendarCheck, title: 'Envie sua solicitação', text: 'Leva menos de um minuto.' },
  { icon: Phone, title: 'Confirmamos o horário', text: `Retorno em até ${clinic.responseTime}.` },
  { icon: ScanLine, title: 'Avaliação completa', text: 'Com escaneamento 3D e plano de tratamento.' },
]

interface BookingDialogProps {
  open: boolean
  onClose: () => void
  children: (helpers: { close: () => void }) => ReactNode
}

/** Modal de agendamento sobre o <dialog> nativo: foco preso, Esc e clique fora fecham com animação. */
export function BookingDialog({ open, onClose, children }: BookingDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [closing, setClosing] = useState(false)
  const titleId = useId()
  const descriptionId = useId()

  useScrollLock(open)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !open || dialog.open) return

    dialog.showModal()
    const prefersPointer = window.matchMedia('(pointer: fine)').matches
    const firstField = dialog.querySelector<HTMLElement>('input, select, textarea')
    if (prefersPointer && firstField) firstField.focus()
    else panelRef.current?.focus()
  }, [open])

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
      className="booking-dialog"
      data-closing={closing}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => {
        event.preventDefault()
        requestClose()
      }}
      onClose={() => {
        if (open && !closing) onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) requestClose()
      }}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className="flex max-h-[92dvh] flex-col overflow-hidden rounded-t-[1.75rem] bg-surface shadow-elevated ring-1 ring-white/10 focus:outline-none md:h-[min(48rem,calc(100dvh-3rem))] md:max-h-none md:flex-row md:rounded-[1.75rem]"
      >
        <aside className="grain relative hidden w-[18.5rem] shrink-0 flex-col overflow-y-auto border-r border-line bg-canvas-alt p-8 md:flex">
          <div aria-hidden="true" className="absolute -top-24 -right-24 size-64 rounded-full bg-accent-500/20 blur-3xl" />
          <Logo />
          <p className="mt-10 font-serif text-[1.75rem] leading-[1.1] text-ink">
            Seu novo sorriso começa com uma conversa.
          </p>
          <ol className="mt-8 space-y-5">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <li key={title} className="flex gap-3.5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-accent-300 ring-1 ring-inset ring-white/10">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">
                    <span className="sr-only">Passo {index + 1}: </span>
                    {title}
                  </p>
                  <p className="mt-0.5 text-[0.8125rem] leading-relaxed text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-auto space-y-2 border-t border-line pt-6 text-[0.8125rem] text-body">
            <a href={clinic.phone.href} className="flex items-center gap-2 transition-colors hover:text-ink">
              <Phone aria-hidden="true" className="size-3.5 text-accent-300" />
              {clinic.phone.display}
            </a>
            <p className="flex items-center gap-2">
              <Clock aria-hidden="true" className="size-3.5 text-accent-300" />
              Seg. a sex. 8h–20h · Sáb. 8h–14h
            </p>
          </div>
        </aside>

        <div className="flex min-h-0 min-w-0 flex-col md:flex-1">
          <div aria-hidden="true" className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-white/20 md:hidden" />
          <header className="flex shrink-0 items-start justify-between gap-4 border-b border-line px-6 pt-4 pb-5 sm:px-8 md:pt-7">
            <div>
              <h2 id={titleId} className="font-serif text-[2rem] leading-tight">
                Agendar consulta
              </h2>
              <p id={descriptionId} className="mt-1 text-sm text-muted">
                Preencha seus dados e confirmamos o melhor horário com você.
              </p>
            </div>
            <button
              type="button"
              onClick={requestClose}
              aria-label="Fechar agendamento"
              className="-mr-2 flex size-10 shrink-0 items-center justify-center rounded-full text-body transition-colors hover:bg-white/[0.06] hover:text-ink active:scale-95"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </header>
          <div className="flex min-h-0 flex-col overflow-y-auto overscroll-contain px-6 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8 md:flex-1">
            {(open || closing) && children({ close: requestClose })}
          </div>
        </div>
      </div>
    </dialog>
  )
}
