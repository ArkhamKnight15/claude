import { MapPin } from 'lucide-react'
import { useRef } from 'react'
import { LogoEmblem } from '../components/brand/Logo'
import { WhatsAppIcon } from '../components/icons'
import { OpenBadge } from '../components/ui/OpenBadge'
import { Picture } from '../components/ui/Picture'
import { photos } from '../data/media'
import { store } from '../data/store'
import { useTilt } from '../hooks/usePointerEffects'
import { whatsappLinkProps } from '../lib/whatsapp'

/** Composição do hero: fotos reais da loja em moldura escura + cartões flutuantes de contato e endereço. */
export function HeroVisual() {
  const tiltRef = useRef<HTMLDivElement>(null)
  useTilt(tiltRef, 5)

  return (
    <div ref={tiltRef} className="tilt relative mx-auto w-full max-w-[36rem] lg:max-w-none">
      <div
        aria-hidden="true"
        className="absolute -inset-x-4 -top-8 -bottom-6 rounded-[2.75rem] bg-gradient-to-br from-wine-100/80 via-sand to-transparent sm:-inset-x-8"
      />

      <figure className="grain relative overflow-hidden rounded-[2rem] bg-ink-950 p-3 shadow-elevated sm:p-4">
        <div aria-hidden="true" className="absolute -top-28 -right-16 size-72 rounded-full bg-wine-600/30 blur-3xl" />

        <div className="relative grid aspect-[5/4] grid-cols-5 grid-rows-2 gap-2.5 sm:gap-3">
          <div className="relative col-span-3 row-span-2 overflow-hidden rounded-[1.25rem]">
            <Picture photo={photos.casillero} priority className="absolute inset-0" />
            <div
              aria-hidden="true"
              className="animate-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent"
            />
            <span className="absolute bottom-3 left-3 rounded-full bg-ink-950/65 px-2.5 py-1 font-mono text-[0.6875rem] font-medium tracking-[0.08em] text-gold-200 uppercase ring-1 ring-white/10 ring-inset backdrop-blur">
              Adega
            </span>
          </div>
          <Picture photo={photos.sparklingPour} priority className="col-span-2 rounded-[1.25rem]" />
          <Picture photo={photos.heineken} priority className="col-span-2 rounded-[1.25rem]" />
        </div>

        <figcaption className="relative mt-3 flex items-center justify-between gap-4 border-t border-white/10 px-1.5 pt-3 sm:mt-4 sm:pt-4">
          <span className="flex items-center gap-3">
            <LogoEmblem className="h-7 text-white" />
            <span className="text-xs leading-snug text-ink-200 sm:text-[0.8125rem]">
              <span className="block font-semibold text-white">{store.legalName}</span>
              {store.bio}
            </span>
          </span>
        </figcaption>
      </figure>

      <a
        {...whatsappLinkProps()}
        aria-label={`Atendimento pelo WhatsApp ${store.whatsapp.display} (abre em nova aba)`}
        className="animate-float tilt-depth absolute -top-7 -left-3 flex items-center gap-3 rounded-2xl bg-white/95 py-3 pr-5 pl-3 shadow-card ring-1 ring-ink-950/5 backdrop-blur transition-shadow hover:shadow-elevated sm:-left-10"
      >
        <span className="flex size-10 items-center justify-center rounded-xl bg-whatsapp text-white">
          <WhatsAppIcon className="size-5" />
        </span>
        <span>
          <span className="block font-mono text-[0.6875rem] font-medium tracking-[0.06em] text-muted uppercase">
            Atendimento
          </span>
          <span className="block text-sm font-semibold text-ink-950">{store.whatsapp.display}</span>
        </span>
      </a>

      <a
        href={store.address.mapsHref}
        target="_blank"
        rel="noopener noreferrer"
        className="animate-float-delayed tilt-depth absolute -right-2 -bottom-16 flex items-center gap-3 rounded-2xl bg-white/95 py-3 pr-5 pl-3 shadow-card ring-1 ring-ink-950/5 backdrop-blur transition-shadow hover:shadow-elevated sm:-right-8 sm:-bottom-10"
      >
        <span className="flex size-10 items-center justify-center rounded-xl bg-wine-50 text-wine-700">
          <MapPin aria-hidden="true" className="size-5" />
        </span>
        <span>
          <span className="block text-sm font-semibold text-ink-950">CLS 404 · Asa Sul</span>
          <OpenBadge compact className="text-xs text-muted" />
        </span>
      </a>
    </div>
  )
}
