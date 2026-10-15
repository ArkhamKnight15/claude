import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useModalDialog } from '../../hooks/useModalDialog'
import { cn } from '../../lib/cn'
import type { GalleryItem } from '../../types'

interface LightboxProps {
  items: GalleryItem[]
  /** Índice da foto aberta; `null` mantém o diálogo fechado. */
  index: number | null
  onChange: (index: number) => void
  onClose: () => void
}

/** Visualização ampliada da galeria: setas, teclado (← → Esc), clique fora e comparativo antes/depois. */
export function Lightbox({ items, index, onChange, onClose }: LightboxProps) {
  const open = index !== null
  const ref = useModalDialog(open, onClose)
  const item = open ? items[index] : null

  const go = (step: number) => {
    if (index === null) return
    onChange((index + step + items.length) % items.length)
  }

  useEffect(() => {
    if (!open) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') onChange(((index ?? 0) + 1) % items.length)
      if (event.key === 'ArrowLeft') onChange(((index ?? 0) - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, index, items.length, onChange])

  return (
    <dialog ref={ref} aria-label="Galeria de resultados" className="dialog">
      {item && index !== null && (
        <div className="flex h-full flex-col px-4 py-4 sm:px-8 sm:py-6" onClick={(event) => event.target === event.currentTarget && onClose()}>
          <div className="flex items-center justify-between gap-4">
            <p className="font-display text-xs font-semibold tracking-[0.24em] text-silver-300 tabular-nums" aria-live="polite">
              {String(index + 1).padStart(2, '0')} <span className="text-silver-500">/ {String(items.length).padStart(2, '0')}</span>
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar galeria"
              className="grid size-11 place-items-center rounded-full border border-white/15 text-snow transition-colors hover:border-white/35 hover:bg-white/[0.06]"
            >
              <X className="size-5" strokeWidth={1.6} />
            </button>
          </div>

          <div
            className="relative flex min-h-0 flex-1 items-center justify-center py-4"
            onClick={(event) => event.target === event.currentTarget && onClose()}
          >
            {/* `key` reinicia o estado de carregamento e a animação ao trocar de foto */}
            <LightboxPhoto key={item.id} item={item} />

            <NavButton direction="prev" onClick={() => go(-1)} />
            <NavButton direction="next" onClick={() => go(1)} />
          </div>

          <div className="mx-auto w-full max-w-3xl text-center">
            <p className="text-[0.6875rem] font-semibold tracking-[0.24em] text-gold-300 uppercase">{item.category}</p>
            <p className="mt-2 font-display text-lg font-semibold text-snow uppercase [font-stretch:112%]">{item.title}</p>
          </div>
        </div>
      )}
    </dialog>
  )
}

function LightboxPhoto({ item }: { item: GalleryItem }) {
  const [showBefore, setShowBefore] = useState(false)
  const [failed, setFailed] = useState(false)
  const photo = showBefore && item.before ? item.before : item.image

  return (
    <figure className="enter flex max-h-full flex-col items-center gap-4 px-14 sm:px-20">
      {failed ? (
        <span
          role="img"
          aria-label={photo.alt}
          className="photo-fallback block w-[min(72rem,80vw)] max-h-[calc(100svh-15rem)] rounded-xl"
          style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
        />
      ) : (
        <img
          src={photo.src}
          srcSet={photo.srcSet}
          sizes="90vw"
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          decoding="async"
          onError={() => setFailed(true)}
          className="h-auto max-h-[calc(100svh-15rem)] w-auto max-w-full rounded-xl object-contain"
        />
      )}
      {item.before && (
        <div role="group" aria-label="Comparar antes e depois" className="flex rounded-full border border-white/15 p-1">
          {(['Antes', 'Depois'] as const).map((label) => {
            const selected = (label === 'Antes') === showBefore
            return (
              <button
                key={label}
                type="button"
                aria-pressed={selected}
                onClick={() => setShowBefore(label === 'Antes')}
                className={cn(
                  'rounded-full px-5 py-2 text-xs font-semibold tracking-[0.16em] uppercase transition-colors',
                  selected ? 'bg-gold-400 text-ink-950' : 'text-silver-300 hover:text-snow',
                )}
              >
                {label}
              </button>
            )
          })}
        </div>
      )}
    </figure>
  )
}

function NavButton({ direction, onClick }: { direction: 'prev' | 'next'; onClick: () => void }) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Foto anterior' : 'Próxima foto'}
      className={cn(
        'absolute top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink-950/70 text-snow backdrop-blur transition-colors hover:border-gold-400/50 hover:text-gold-200',
        direction === 'prev' ? 'left-0 sm:left-2' : 'right-0 sm:right-2',
      )}
    >
      <Icon className="size-5" strokeWidth={1.6} />
    </button>
  )
}
