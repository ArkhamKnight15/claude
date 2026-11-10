import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useId, useRef, type KeyboardEvent, type PointerEvent } from 'react'
import { cn } from '../../lib/cn'
import type { GalleryPhoto } from '../../types'
import { Dialog } from '../ui/Dialog'

const SWIPE_THRESHOLD_PX = 50

interface LightboxProps {
  photos: GalleryPhoto[]
  index: number | null
  onIndexChange: (index: number) => void
  onClose: () => void
}

const navButton =
  'absolute top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 ring-inset backdrop-blur transition-[background-color,transform] duration-300 hover:bg-white/20 active:scale-95 focus-visible:outline-white disabled:opacity-30'

/** Visualização ampliada da galeria: setas do teclado, gesto de deslizar e miniaturas. */
export function Lightbox({ photos, index, onIndexChange, onClose }: LightboxProps) {
  const titleId = useId()
  const captionId = useId()
  const pointerStart = useRef<number | null>(null)
  const thumbsRef = useRef<HTMLUListElement>(null)
  const open = index !== null
  const current = index ?? 0
  const photo = photos[current]
  const total = photos.length

  const go = (step: number) => onIndexChange((current + step + total) % total)

  // Pré-carrega as vizinhas para a navegação parecer instantânea.
  useEffect(() => {
    if (!open || total < 2) return
    for (const step of [1, -1]) {
      const neighbor = photos[(current + step + total) % total]
      const image = new Image()
      image.src = neighbor.src
    }
  }, [open, current, photos, total])

  // Mantém a miniatura ativa visível.
  useEffect(() => {
    if (!open) return
    thumbsRef.current
      ?.querySelector<HTMLElement>('[aria-current="true"]')
      ?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [open, current])

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'ArrowRight') go(1)
    else if (event.key === 'ArrowLeft') go(-1)
    else return
    event.preventDefault()
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStart.current = event.clientX
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return
    const delta = event.clientX - pointerStart.current
    pointerStart.current = null
    if (Math.abs(delta) > SWIPE_THRESHOLD_PX) go(delta < 0 ? 1 : -1)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      labelledBy={titleId}
      describedBy={captionId}
      variant="fullscreen"
      initialFocus="[data-autofocus]"
      onKeyDown={handleKeyDown}
    >
      {({ close }) =>
        photo && (
          <div className="flex h-dvh flex-col text-white">
            <header className="flex shrink-0 items-center justify-between gap-4 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 sm:px-6">
              <h2 id={titleId} className="font-mono text-xs font-medium tracking-[0.12em] text-ink-200 uppercase">
                Foto {current + 1} de {total}
              </h2>
              <button
                type="button"
                data-autofocus
                onClick={close}
                aria-label="Fechar galeria"
                className="flex size-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 ring-inset transition-colors hover:bg-white/20 focus-visible:outline-white"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </header>

            <div
              className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center px-4 select-none sm:px-24"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onClick={(event) => {
                if (event.target === event.currentTarget) close()
              }}
            >
              <img
                key={photo.id}
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                draggable={false}
                className="enter h-auto max-h-[calc(100dvh-13.5rem)] w-auto max-w-[min(100%,36rem)] rounded-2xl object-contain shadow-elevated"
              />
              {total > 1 && (
                <>
                  <button type="button" onClick={() => go(-1)} aria-label="Foto anterior" className={cn(navButton, 'left-3 sm:left-6')}>
                    <ChevronLeft aria-hidden="true" className="size-5" />
                  </button>
                  <button type="button" onClick={() => go(1)} aria-label="Próxima foto" className={cn(navButton, 'right-3 sm:right-6')}>
                    <ChevronRight aria-hidden="true" className="size-5" />
                  </button>
                </>
              )}
            </div>

            <footer className="shrink-0 px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
              <p id={captionId} className="text-center text-[0.9375rem] font-medium text-white" aria-live="polite">
                {photo.caption}
              </p>
              <ul
                ref={thumbsRef}
                data-lenis-prevent
                aria-label="Miniaturas"
                className="mx-auto mt-4 flex max-w-3xl gap-2 overflow-x-auto px-1 py-1 [scrollbar-width:none]"
              >
                {photos.map((item, thumbIndex) => (
                  <li key={item.id} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => onIndexChange(thumbIndex)}
                      aria-label={`Ver foto ${thumbIndex + 1}: ${item.caption}`}
                      aria-current={thumbIndex === current}
                      className={cn(
                        'block size-14 overflow-hidden rounded-lg ring-2 transition-[opacity,box-shadow] duration-300 focus-visible:outline-white',
                        thumbIndex === current ? 'opacity-100 ring-gold-300' : 'opacity-50 ring-transparent hover:opacity-90',
                      )}
                    >
                      <img src={item.src} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
                    </button>
                  </li>
                ))}
              </ul>
            </footer>
          </div>
        )
      }
    </Dialog>
  )
}
