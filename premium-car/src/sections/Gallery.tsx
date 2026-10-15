import { Maximize2 } from 'lucide-react'
import { useCallback, useRef, useState, type UIEvent } from 'react'
import { Lightbox } from '../components/gallery/Lightbox'
import { Container } from '../components/ui/Container'
import { Picture } from '../components/ui/Picture'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { gallery } from '../data/gallery'
import { cn } from '../lib/cn'
import type { GalleryItem } from '../types'

/**
 * Composição editorial (desktop/tablet) em um grid de 12 colunas; a sequência se repete a cada 6 fotos.
 * Cada posição define colunas, linhas e o `sizes` correspondente para carregar a resolução adequada.
 */
const editorialLayout = [
  { className: 'md:col-span-7 md:row-span-4', sizes: '58vw' },
  { className: 'md:col-span-5 md:row-span-5', sizes: '42vw' },
  { className: 'md:col-span-4 md:row-span-4', sizes: '33vw' },
  { className: 'md:col-span-3 md:row-span-4', sizes: '25vw' },
  { className: 'md:col-span-5 md:row-span-3', sizes: '42vw' },
  { className: 'md:col-span-12 md:row-span-4', sizes: '100vw' },
]

export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const closeLightbox = useCallback(() => setOpenIndex(null), [])

  return (
    <section id="resultados" aria-labelledby="resultados-title" className="bg-ink-900 py-24 sm:py-32 lg:py-40">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="resultados-title"
            eyebrow="Resultados"
            title={
              <>
                O brilho fala <span className="text-metal">por si.</span>
              </>
            }
            subtitle="Pintura profunda, reflexos nítidos e acabamento uniforme: o padrão que buscamos em cada veículo."
          />
          <Reveal delay={120} as="div" className="text-xs leading-relaxed text-silver-500 lg:max-w-[16rem] lg:text-right">
            Imagens meramente ilustrativas, de bancos de imagem.
          </Reveal>
        </div>
      </Container>

      <MobileCarousel onOpen={setOpenIndex} />

      <Container className="hidden md:block">
        <ul className="mt-16 grid grid-flow-row-dense grid-cols-12 auto-rows-[clamp(4.5rem,7.4vw,8.5rem)] gap-4 lg:mt-20 lg:gap-5">
          {gallery.map((item, index) => {
            const layout = editorialLayout[index % editorialLayout.length]
            return (
              <Reveal as="li" key={item.id} delay={(index % 3) * 90} className={cn('flex', layout.className)}>
                <GalleryCard item={item} sizes={`(min-width: 768px) ${layout.sizes}, 85vw`} onOpen={() => setOpenIndex(index)} />
              </Reveal>
            )
          })}
        </ul>
      </Container>

      <Lightbox items={gallery} index={openIndex} onChange={setOpenIndex} onClose={closeLightbox} />
    </section>
  )
}

/** No celular: carrossel com rolagem horizontal e indicador de posição. */
function MobileCarousel({ onOpen }: { onOpen: (index: number) => void }) {
  const [current, setCurrent] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)

  const handleScroll = (event: UIEvent<HTMLUListElement>) => {
    const list = event.currentTarget
    const card = list.firstElementChild as HTMLElement | null
    if (!card) return
    setCurrent(Math.round(list.scrollLeft / (card.offsetWidth + 12)))
  }

  const scrollTo = (index: number) => {
    const list = listRef.current
    const card = list?.children[index] as HTMLElement | undefined
    if (list && card) list.scrollTo({ left: card.offsetLeft - list.offsetLeft - 20, behavior: 'smooth' })
  }

  return (
    <div className="mt-12 md:hidden">
      <ul
        ref={listRef}
        onScroll={handleScroll}
        aria-label="Galeria de resultados"
        className="no-scrollbar flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2"
      >
        {gallery.map((item, index) => (
          <li key={item.id} className="flex aspect-[4/5] w-[82%] shrink-0 snap-start">
            <GalleryCard item={item} sizes="85vw" onOpen={() => onOpen(index)} />
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-center gap-1" aria-label="Selecionar foto" role="group">
        {gallery.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollTo(index)}
            aria-label={`Ir para a foto ${index + 1}`}
            aria-current={current === index ? 'true' : undefined}
            className="grid h-8 place-items-center px-1.5"
          >
            <span
              className={cn(
                'block h-0.5 rounded-full transition-[width,background-color] duration-500',
                current === index ? 'w-8 bg-gold-300' : 'w-4 bg-white/20',
              )}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

function GalleryCard({ item, sizes, onOpen }: { item: GalleryItem; sizes: string; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Ampliar foto: ${item.title}`}
      className="group relative flex w-full overflow-hidden rounded-2xl border border-white/[0.07] text-left"
    >
      <Picture
        photo={item.image}
        sizes={sizes}
        frameClassName="absolute inset-0"
        className="transition-[opacity,transform] duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />

      <span className="absolute top-4 right-4 grid size-10 place-items-center rounded-full border border-white/20 bg-ink-950/50 text-snow opacity-100 backdrop-blur transition-[opacity,transform] duration-300 md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100">
        <Maximize2 className="size-4" strokeWidth={1.6} aria-hidden="true" />
      </span>

      {item.before && (
        <span className="absolute top-4 left-4 rounded-full bg-gold-400 px-3 py-1 text-[0.625rem] font-semibold tracking-[0.16em] text-ink-950 uppercase">
          Antes e depois
        </span>
      )}

      <span className="relative mt-auto flex flex-col gap-1.5 p-5 sm:p-6">
        <span className="text-[0.6875rem] font-semibold tracking-[0.24em] text-gold-300 uppercase">{item.category}</span>
        <span className="font-display text-base font-semibold text-snow uppercase [font-stretch:112%] sm:text-lg">
          {item.title}
        </span>
      </span>
    </button>
  )
}
