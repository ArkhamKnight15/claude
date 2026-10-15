import { ArrowUpRight } from 'lucide-react'
import { whatsappMessages } from '../config/messages'
import { Container } from '../components/ui/Container'
import { Picture } from '../components/ui/Picture'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { services } from '../data/services'
import type { Service } from '../types'
import { whatsappUrl } from '../lib/whatsapp'

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="relative bg-ink-900 py-24 sm:py-32 lg:py-40">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="servicos-title"
            eyebrow="Serviços"
            title={
              <>
                Excelência em <span className="text-metal">cada detalhe.</span>
              </>
            }
            subtitle="Cuidados especializados para valorizar, preservar e transformar a aparência do seu veículo."
          />
          <Reveal delay={120} className="max-w-xs border-l border-gold-400/40 pl-5 text-sm leading-relaxed text-silver-400">
            Cada serviço é indicado após a avaliação do veículo, conforme o estado da pintura, dos revestimentos e
            das peças.
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-6">
          {services.map((service, index) => (
            <Reveal as="li" key={service.id} delay={(index % 3) * 90} className="flex">
              <ServiceCard service={service} index={index} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon

  return (
    <article className="group flex w-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-850 shadow-card transition-[border-color,transform] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-gold-400/30">
      <div className="relative">
        <Picture
          photo={service.image}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          frameClassName="aspect-[4/3]"
          className="transition-[opacity,transform] duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-850 via-ink-850/10 to-transparent" />
        <span className="absolute top-4 left-5 font-display text-xs font-semibold tracking-[0.2em] text-snow/80 tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="absolute bottom-0 left-5 grid size-12 translate-y-1/2 place-items-center rounded-full border border-gold-400/35 bg-ink-900 text-gold-300 transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-ink-950">
          <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
        </span>
      </div>

      <div className="flex flex-1 flex-col px-5 pt-10 pb-6 sm:px-6">
        <h3 className="font-display text-lg font-semibold tracking-wide uppercase [font-stretch:112%]">
          {service.title}
        </h3>
        <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-silver-400">{service.description}</p>
        <a
          href={whatsappUrl(whatsappMessages.service(service.title))}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 self-start text-[0.8125rem] font-semibold tracking-wide text-gold-300 transition-colors hover:text-gold-100"
        >
          Solicitar avaliação
          <span className="sr-only"> de {service.title.toLowerCase()} pelo WhatsApp</span>
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>
      </div>
    </article>
  )
}
