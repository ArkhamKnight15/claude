import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { whatsappMessages } from '../config/messages'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Picture } from '../components/ui/Picture'
import { media } from '../data/media'
import { services } from '../data/services'
import { enterDelay } from '../lib/motion'
import { whatsappUrl } from '../lib/whatsapp'

/** Serviços citados no rodapé do hero, como atalho para a seção de serviços. */
const highlights = services.filter((service) => ['polimento', 'vitrificacao', 'higienizacao'].includes(service.id))

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink-950"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Picture photo={media.hero} priority frameClassName="hero-photo size-full" className="object-[center_60%]" />
        {/* Overlays: legibilidade do texto, do header e transição para a próxima seção */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/65 to-ink-950/20" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink-950/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink-900 via-ink-900/60 to-transparent" />
      </div>

      <Container className="flex flex-1 flex-col justify-end pt-36 pb-10 sm:pb-14 lg:pt-44">
        <div className="max-w-6xl">
          <p className="eyebrow enter" style={enterDelay(100)}>
            Estética automotiva
          </p>

          <h1
            id="hero-title"
            className="display enter mt-6 text-[clamp(2.5rem,0.8rem+6vw,6.5rem)] leading-[0.94]"
            style={enterDelay(200)}
          >
            Seu carro em <span className="text-metal block">outro nível.</span>
          </h1>

          <p
            className="enter mt-8 max-w-xl text-base leading-relaxed text-silver-300 sm:text-lg"
            style={enterDelay(340)}
          >
            Mais brilho, proteção e cuidado em cada detalhe. Conheça uma nova experiência em estética automotiva.
          </p>

          <div className="enter mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" style={enterDelay(460)}>
            <Button href="#servicos" variant="outline" size="lg">
              Conheça nossos serviços
            </Button>
            <Button
              href={whatsappUrl(whatsappMessages.quote)}
              external
              size="lg"
              icon={<ArrowUpRight className="size-4" />}
            >
              Solicite um orçamento
            </Button>
          </div>
        </div>

        <div
          className="enter mt-16 flex items-center justify-between gap-8 border-t border-white/10 pt-6 sm:mt-20 md:pr-20"
          style={enterDelay(620)}
        >
          <a
            href="#servicos"
            className="group flex items-center gap-4 text-xs font-medium tracking-[0.24em] text-silver-300 uppercase transition-colors hover:text-snow"
          >
            <span className="relative h-12 w-px overflow-hidden bg-white/15" aria-hidden="true">
              <span className="absolute inset-0 animate-scroll-cue bg-gold-300" />
            </span>
            Role para explorar
            <ArrowDown className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
          </a>

          <ul aria-label="Alguns dos nossos serviços" className="hidden items-center gap-10 md:flex">
            {highlights.map((service, index) => (
              <li key={service.id} className="flex items-baseline gap-3">
                <span className="font-display text-[0.6875rem] text-gold-300 tabular-nums">0{index + 1}</span>
                <span className="text-sm text-silver-300">{service.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
