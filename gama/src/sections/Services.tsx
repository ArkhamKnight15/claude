import { ArrowUpRight } from 'lucide-react'
import { WhatsAppIcon } from '../components/icons'
import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Picture } from '../components/ui/Picture'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/ui/SectionHeader'
import { services } from '../data/services'
import { whatsappLinkProps } from '../lib/whatsapp'
import type { Service } from '../types'

const zoomOnHover = 'transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]'

/** Composição gráfica para categorias sem foto (ex.: tabacaria). */
function ServiceArtwork({ service }: { service: Service }) {
  const { icon: Icon } = service
  return (
    <div className="grain absolute inset-0 overflow-hidden bg-gradient-to-br from-ink-900 via-ink-950 to-wine-900">
      <div aria-hidden="true" className="absolute -top-16 -right-10 size-56 rounded-full bg-wine-500/25 blur-3xl" />
      <div aria-hidden="true" className="bg-grid-light absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
      <Icon
        aria-hidden="true"
        strokeWidth={0.9}
        className={`absolute top-1/2 left-1/2 size-28 -translate-x-1/2 -translate-y-1/2 text-gold-200/90 ${zoomOnHover}`}
      />
      <span className="absolute bottom-4 left-4 font-mono text-[0.6875rem] font-medium tracking-[0.14em] text-gold-300 uppercase">
        Linha premium
      </span>
    </div>
  )
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { icon: Icon } = service

  return (
    <article
      data-spotlight
      className="group spotlight flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-cream/70 ring-1 ring-line transition-[transform,box-shadow,background-color] duration-500 ease-out-expo ring-inset hover:-translate-y-1 hover:bg-white hover:shadow-card hover:ring-wine-200"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {service.photo ? (
          <Picture photo={service.photo} className="absolute inset-0" imageClassName={zoomOnHover} />
        ) : (
          <ServiceArtwork service={service} />
        )}
        <span
          aria-hidden="true"
          className="absolute top-4 right-4 rounded-full bg-ink-950/60 px-2.5 py-1 font-mono text-xs text-white ring-1 ring-white/15 ring-inset backdrop-blur"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-white text-ink-800 ring-1 ring-line transition-colors duration-500 ring-inset group-hover:bg-ink-950 group-hover:text-gold-200 group-hover:ring-ink-950">
            <Icon aria-hidden="true" className="size-5" strokeWidth={1.6} />
          </span>
          <h3 className="font-display text-[1.5rem] leading-tight font-medium">{service.title}</h3>
        </div>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-body">{service.description}</p>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Destaques">
          {service.highlights.map((highlight) => (
            <li
              key={highlight}
              className="rounded-full bg-white px-3 py-1 font-mono text-[0.6875rem] text-ink-700 ring-1 ring-line ring-inset"
            >
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-7 sm:pt-8">
          <a
            {...whatsappLinkProps(service.message)}
            className="inline-flex items-center gap-3 text-sm font-semibold text-ink-950 after:absolute after:inset-0 after:rounded-[1.5rem] after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-wine-500"
          >
            Consultar no WhatsApp
            <span className="sr-only"> sobre {service.title.toLowerCase()} (abre em nova aba)</span>
            <span
              aria-hidden="true"
              className="flex size-8 items-center justify-center rounded-full bg-ink-950/5 transition-all duration-500 ease-out-expo group-hover:translate-x-1 group-hover:bg-whatsapp group-hover:text-white"
            >
              <ArrowUpRight className="size-4" />
            </span>
          </a>
        </div>
      </div>
    </article>
  )
}

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="bg-white py-24 sm:py-32">
      <Container>
        <SectionHeader
          id="servicos-titulo"
          layout="split"
          eyebrow="O que temos"
          title={
            <>
              Uma seleção para cada <em className="text-wine-700">ocasião</em>.
            </>
          }
          description="Do vinho para o jantar à cerveja gelada do fim de semana. Escolha uma categoria e fale direto com a nossa equipe pelo WhatsApp."
        />

        <ul className="mt-14 grid gap-4 sm:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {services.map((service, index) => (
            <Reveal as="li" key={service.id} delay={(index % 3) * 90}>
              <ServiceCard service={service} index={index} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-6 flex flex-col items-start justify-between gap-5 rounded-[1.5rem] bg-wine-50 p-6 ring-1 ring-wine-100 ring-inset sm:flex-row sm:items-center sm:p-7 lg:mt-8">
          <div>
            <p className="text-lg font-semibold text-ink-950">Procurando um rótulo específico?</p>
            <p className="mt-1 text-[0.9375rem] text-body">Pergunte pelo WhatsApp e confirmamos a disponibilidade para você.</p>
          </div>
          <ButtonLink
            {...whatsappLinkProps('Olá! Vim pelo site e gostaria de saber se vocês têm um rótulo específico.')}
            variant="whatsapp"
            className="shrink-0"
            leadingIcon={<WhatsAppIcon className="size-[1.125rem]" />}
          >
            Perguntar no WhatsApp
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  )
}
