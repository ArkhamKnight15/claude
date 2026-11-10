import { ShieldAlert } from 'lucide-react'
import { useCallback, useId, useRef, useState } from 'react'
import { store } from '../../data/store'
import { LogoStacked } from '../brand/Logo'
import { Button } from '../ui/Button'
import { Dialog } from '../ui/Dialog'

const STORAGE_KEY = 'gama:maioridade-confirmada'

function readConfirmation(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function saveConfirmation(): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // Sem armazenamento (navegação privada etc.): a pergunta volta na próxima visita.
  }
}

/** Verificação de maioridade, recomendada para sites de bebidas alcoólicas e tabacaria. */
export function AgeGate() {
  const [open, setOpen] = useState(() => !readConfirmation())
  const [denied, setDenied] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const descriptionId = useId()
  const handleClose = useCallback(() => setOpen(false), [])

  /** Troca de etapa mantendo o foco dentro do diálogo (o botão clicado deixa de existir). */
  const switchTo = (next: boolean) => {
    setDenied(next)
    requestAnimationFrame(() => contentRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus())
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      labelledBy={titleId}
      describedBy={descriptionId}
      dismissible={false}
      width="30rem"
      initialFocus="[data-autofocus]"
    >
      {({ close }) => (
        <div
          ref={contentRef}
          data-lenis-prevent
          className="grain relative max-h-[100dvh] overflow-x-hidden overflow-y-auto overscroll-contain rounded-t-[1.75rem] md:max-h-[calc(100dvh-3rem)] bg-ink-950 px-6 pt-10 pb-[max(2rem,env(safe-area-inset-bottom))] text-center [@media(max-height:30rem)]:pt-6 [@media(max-height:30rem)]:pb-5 text-white shadow-elevated sm:px-10 md:rounded-[1.75rem] md:pb-10"
        >
          <div aria-hidden="true" className="absolute -top-28 left-1/2 size-72 -translate-x-1/2 rounded-full bg-wine-600/30 blur-3xl" />
          <LogoStacked className="relative mx-auto w-28 text-white sm:w-32 [@media(max-height:30rem)]:w-16" />

          {denied ? (
            <div className="relative">
              <h2 id={titleId} className="mt-8 font-display [@media(max-height:30rem)]:mt-3 text-[1.75rem] leading-tight font-medium text-white">
                Volte quando fizer 18 anos
              </h2>
              <p id={descriptionId} className="mt-3 text-[0.9375rem] leading-relaxed text-ink-200">
                O conteúdo deste site é destinado apenas a maiores de idade. A venda de bebidas alcoólicas e de produtos de
                tabacaria é proibida para menores de 18 anos.
              </p>
              <Button variant="outline-light" data-autofocus className="mt-8 w-full" onClick={() => switchTo(false)}>
                Voltar
              </Button>
            </div>
          ) : (
            <div className="relative">
              <h2 id={titleId} className="mt-8 font-display [@media(max-height:30rem)]:mt-3 text-[1.875rem] leading-tight font-medium text-white">
                Você tem 18 anos ou mais?
              </h2>
              <p id={descriptionId} className="mt-3 text-[0.9375rem] leading-relaxed text-ink-200">
                O site da {store.name} apresenta bebidas alcoólicas e produtos de tabacaria, destinados exclusivamente a
                maiores de idade.
              </p>
              <div className="mt-8 grid gap-3 [@media(max-height:30rem)]:mt-5 [@media(max-height:30rem)]:grid-cols-2">
                <Button
                  variant="light"
                  size="lg"
                  data-autofocus
                  onClick={() => {
                    saveConfirmation()
                    close()
                  }}
                >
                  Sim, tenho 18 anos ou mais
                </Button>
                <Button variant="outline-light" size="lg" onClick={() => switchTo(true)}>
                  Não
                </Button>
              </div>
              <p className="mt-7 flex items-center justify-center gap-2 text-xs text-ink-300 [@media(max-height:30rem)]:mt-4">
                <ShieldAlert aria-hidden="true" className="size-3.5 shrink-0 text-gold-300" />
                Beba com moderação. Se beber, não dirija.
              </p>
            </div>
          )}
        </div>
      )}
    </Dialog>
  )
}
