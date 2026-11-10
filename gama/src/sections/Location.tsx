import { ArrowUpRight, Clock, MapPin, Navigation } from 'lucide-react'
import { useState } from 'react'
import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { OpenBadge } from '../components/ui/OpenBadge'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/ui/SectionHeader'
import { store } from '../data/store'
import { cn } from '../lib/cn'

/** Mapa incorporado (carregamento preguiçoso) com fundo ilustrado enquanto carrega. */
function MapFrame() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative h-full min-h-[22rem] overflow-hidden rounded-[1.75rem] bg-sand shadow-card ring-1 ring-ink-950/5 sm:min-h-[26rem]">
      <div aria-hidden="true" className="bg-grid absolute inset-0" />
      <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
        <span className="relative flex size-14 items-center justify-center rounded-full bg-wine-700 text-white shadow-elevated">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-wine-600" />
          <MapPin className="relative size-6" />
        </span>
      </div>
      <a
        href={store.address.mapsHref}
        target="_blank"
        rel="noopener noreferrer"
        className="group absolute bottom-4 left-4 z-10 flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-2xl bg-white/95 py-3 pr-4 pl-3 shadow-card ring-1 ring-ink-950/5 backdrop-blur transition-shadow hover:shadow-elevated"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-wine-50 text-wine-700">
          <MapPin aria-hidden="true" className="size-5" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-ink-950">{store.address.street}</span>
          <span className="flex items-center gap-1 text-xs text-muted transition-colors group-hover:text-wine-700">
            Abrir no Google Maps
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </span>
        </span>
      </a>
      <iframe
        title={`Mapa: ${store.legalName}, ${store.address.street}, ${store.address.district}`}
        src={store.address.embedSrc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setLoaded(true)}
        className={cn(
          'absolute inset-0 size-full border-0 grayscale-[35%] transition-opacity duration-700',
          loaded ? 'opacity-100' : 'opacity-0',
        )}
      />
    </div>
  )
}

export function Location() {
  const { address } = store

  return (
    <section id="contato" aria-labelledby="contato-titulo" className="py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeader
            id="contato-titulo"
            eyebrow="Como chegar"
            title={
              <>
                Passe na loja, na <em className="text-wine-700">404 Sul</em>.
              </>
            }
            description="Venha conhecer a adega, pedir uma indicação no balcão ou buscar o que você combinou pelo WhatsApp."
          />

          <Reveal delay={160} className="mt-10 rounded-[1.5rem] bg-white p-7 shadow-soft ring-1 ring-line ring-inset">
            <address className="not-italic">
              <p className="flex items-center gap-2 font-mono text-xs font-medium tracking-[0.1em] text-wine-700 uppercase">
                <MapPin aria-hidden="true" className="size-3.5" />
                Endereço
              </p>
              <p className="mt-2 text-lg font-semibold text-ink-950">{address.street}</p>
              <p className="text-[0.9375rem] text-body">
                {address.district}, {address.city} – {address.state}
                <br />
                CEP {address.zip}
              </p>
            </address>

            <div className="mt-6 border-t border-line pt-6">
              <p className="flex items-center gap-2 font-mono text-xs font-medium tracking-[0.1em] text-wine-700 uppercase">
                <Clock aria-hidden="true" className="size-3.5" />
                Horário de funcionamento
              </p>
              <OpenBadge className="mt-3 text-sm font-semibold text-ink-900" />
              <dl className="mt-4 grid gap-2 text-[0.9375rem]">
                {store.hours.map((slot) => (
                  <div key={slot.days} className="flex justify-between gap-4 border-b border-line pb-2 last:border-0">
                    <dt className="text-body">{slot.days}</dt>
                    <dd className="shrink-0 text-right font-medium whitespace-nowrap text-ink-950">{slot.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row lg:flex-col xl:flex-row">
              <ButtonLink
                href={address.directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                leadingIcon={<Navigation aria-hidden="true" className="size-4" />}
              >
                Traçar rota
              </ButtonLink>
              <ButtonLink href={address.wazeHref} target="_blank" rel="noopener noreferrer" variant="secondary">
                Abrir no Waze
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100} className="lg:col-span-7">
          <MapFrame />
        </Reveal>
      </Container>
    </section>
  )
}
