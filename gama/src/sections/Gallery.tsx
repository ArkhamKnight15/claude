import { Expand, ImageOff, RotateCcw } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import { Lightbox } from '../components/gallery/Lightbox'
import { InstagramIcon } from '../components/icons'
import { Button, ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Picture } from '../components/ui/Picture'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/ui/SectionHeader'
import { galleryCategories } from '../data/gallery'
import { store } from '../data/store'
import { cn } from '../lib/cn'
import { fetchGalleryPhotos } from '../services/gallery'
import type { GalleryCategory, GalleryPhoto, IconComponent } from '../types'

type Filter = GalleryCategory | 'todos'
type Status = 'loading' | 'ready' | 'error'

const INITIAL_VISIBLE = 8

function GallerySkeleton() {
  return (
    <ul aria-hidden="true" className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
      {Array.from({ length: INITIAL_VISIBLE }, (_, index) => (
        <li key={index} className="aspect-[4/5] animate-pulse rounded-[1.25rem] bg-sand" />
      ))}
    </ul>
  )
}

function GalleryMessage({ icon: Icon, title, children }: { icon: IconComponent; title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-[1.5rem] bg-white px-6 py-14 text-center ring-1 ring-line ring-inset">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-sand text-ink-700">
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <p className="mt-5 text-lg font-semibold text-ink-950">{title}</p>
      <div className="mt-5">{children}</div>
    </div>
  )
}

export function Gallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([])
  const [status, setStatus] = useState<Status>('loading')
  const [filter, setFilter] = useState<Filter>('todos')
  const [expanded, setExpanded] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const loadPhotos = useCallback(
    () =>
      fetchGalleryPhotos()
        .then((items) => {
          setPhotos(items)
          setStatus('ready')
        })
        .catch(() => setStatus('error')),
    [],
  )

  useEffect(() => {
    void loadPhotos()
  }, [loadPhotos])

  const retry = () => {
    setStatus('loading')
    void loadPhotos()
  }

  const filtered = useMemo(
    () => (filter === 'todos' ? photos : photos.filter((photo) => photo.category === filter)),
    [photos, filter],
  )
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_VISIBLE)
  const hiddenCount = filtered.length - visible.length
  const countByCategory = (id: Filter) => (id === 'todos' ? photos.length : photos.filter((photo) => photo.category === id).length)

  const changeFilter = (next: Filter) => {
    setFilter(next)
    setExpanded(false)
  }

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  return (
    <section id="fotos" aria-labelledby="fotos-titulo" className="py-24 sm:py-32">
      <Container>
        <SectionHeader
          id="fotos-titulo"
          layout="split"
          eyebrow="Fotos"
          title={
            <>
              Um pouco da nossa <em className="text-wine-700">adega</em>.
            </>
          }
          description="Rótulos, brindes e momentos que passam por aqui. Toque em uma foto para ampliar e acompanhe as novidades no Instagram."
        />

        <Reveal className="mt-12 sm:mt-14">
          <div
            role="group"
            aria-label="Filtrar fotos por categoria"
            data-lenis-prevent
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {galleryCategories.map((category) => {
              const selected = filter === category.id
              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => changeFilter(category.id)}
                  disabled={status !== 'ready'}
                  className={cn(
                    'inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold ring-1 ring-inset transition-[background-color,color,box-shadow] duration-300',
                    selected
                      ? 'bg-ink-950 text-white ring-ink-950 shadow-[0_8px_20px_-10px_rgb(16_14_13/0.6)]'
                      : 'bg-white text-ink-700 ring-line hover:text-ink-950 hover:ring-ink-300',
                  )}
                >
                  {category.label}
                  {status === 'ready' && (
                    <span className={cn('font-mono text-[0.6875rem] font-medium', selected ? 'text-gold-200' : 'text-muted')}>
                      {countByCategory(category.id)}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </Reveal>

        <div className="mt-8" aria-busy={status === 'loading'}>
          <p className="sr-only" aria-live="polite">
            {status === 'ready' ? `Mostrando ${visible.length} de ${filtered.length} fotos.` : ''}
          </p>

          {status === 'loading' && <GallerySkeleton />}

          {status === 'error' && (
            <GalleryMessage icon={ImageOff} title="Não foi possível carregar as fotos.">
              <Button variant="secondary" onClick={retry} leadingIcon={<RotateCcw aria-hidden="true" className="size-4" />}>
                Tentar novamente
              </Button>
            </GalleryMessage>
          )}

          {status === 'ready' && filtered.length === 0 && (
            <GalleryMessage icon={ImageOff} title="Ainda não há fotos nesta categoria.">
              <Button variant="secondary" onClick={() => changeFilter('todos')}>
                Ver todas as fotos
              </Button>
            </GalleryMessage>
          )}

          {status === 'ready' && filtered.length > 0 && (
            <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              {visible.map((photo, index) => (
                <li
                  key={`${filter}-${photo.id}`}
                  className="enter"
                  style={{ '--enter-delay': `${(index % INITIAL_VISIBLE) * 45}ms` } as CSSProperties}
                >
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    aria-label={`Ampliar foto: ${photo.caption}`}
                    className="group relative block w-full overflow-hidden rounded-[1.25rem] ring-1 ring-ink-950/5 focus-visible:outline-offset-4"
                  >
                    <Picture
                      photo={photo}
                      className="aspect-[4/5]"
                      imageClassName="transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent p-4 pt-12 text-left opacity-100 transition-opacity duration-500 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100"
                    >
                      <span className="text-sm leading-snug font-semibold text-white">{photo.caption}</span>
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur">
                        <Expand className="size-4" />
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Reveal className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          {status === 'ready' && hiddenCount > 0 && (
            <Button variant="secondary" onClick={() => setExpanded(true)}>
              Mostrar mais {hiddenCount} {hiddenCount === 1 ? 'foto' : 'fotos'}
            </Button>
          )}
          <ButtonLink
            href={store.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            arrow
            leadingIcon={<InstagramIcon className="size-[1.125rem]" />}
          >
            Seguir {store.instagram.handle}
          </ButtonLink>
        </Reveal>
      </Container>

      <Lightbox photos={filtered} index={lightboxIndex} onIndexChange={setLightboxIndex} onClose={closeLightbox} />
    </section>
  )
}
