import { ScanLine } from 'lucide-react'
import { useBooking } from '../components/booking/context'
import { AnimatedGradient, type GradientPalette } from '../components/effects/AnimatedGradient'
import { Button, ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { RevealText } from '../components/ui/RevealText'
import { clinic } from '../data/clinic'
import { enterDelay } from '../lib/motion'
import { HeroVisual } from './HeroVisual'

/** Marfim + azuis claros: claros o bastante para manter o contraste do texto por cima. */
const HERO_PALETTE: GradientPalette = ['#f8f6f2', '#e6eff8', '#cde2f4', '#b1d2ef']

export function Hero() {
  const { openBooking } = useBooking()

  return (
    <section id="inicio" aria-labelledby="inicio-titulo" className="relative isolate overflow-x-clip pt-28 pb-8 sm:pt-36 lg:pt-40 lg:pb-0">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_0%,var(--color-accent-100),transparent_60%)]"
      >
        <AnimatedGradient
          palette={HERO_PALETTE}
          className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
        />
        <div className="absolute inset-0 bg-ivory/50 lg:bg-transparent lg:bg-gradient-to-r lg:from-ivory/85 lg:via-ivory/30 lg:to-transparent" />
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_0%,black_10%,transparent_65%)]" />
      </div>

      <Container className="grid items-center gap-20 lg:grid-cols-12 lg:gap-12">
        <div className="scroll-exit lg:col-span-6">
          <p className="enter inline-flex items-center gap-2.5 rounded-full bg-white/80 py-1.5 pr-4 pl-1.5 text-[0.8125rem] font-medium text-navy-800 shadow-soft ring-1 ring-navy-950/5">
            <span className="rounded-full bg-navy-950 px-2.5 py-0.5 text-[0.6875rem] font-semibold tracking-[0.1em] whitespace-nowrap text-white uppercase">
              Jardins · SP
            </span>
            <span className="whitespace-nowrap">
              <span className="hidden sm:inline">Odontologia de </span>alto padrão desde {clinic.foundedYear}
            </span>
          </p>

          <RevealText
            as="h1"
            id="inicio-titulo"
            trigger="load"
            delay={120}
            className="mt-7 font-serif text-[3.1rem] leading-[0.98] tracking-[-0.02em] sm:text-[4.5rem] lg:text-[4.25rem] xl:text-[5.5rem]"
          >
            Seu sorriso merece um cuidado <em className="text-accent-600">extraordinário.</em>
          </RevealText>

          <p style={enterDelay(160)} className="enter mt-7 max-w-xl text-lg leading-relaxed text-body sm:text-xl sm:leading-relaxed">
            Na {clinic.name}, especialistas e tecnologia digital se unem para criar tratamentos precisos, confortáveis e
            desenhados exclusivamente para você, da prevenção à reabilitação estética.
          </p>

          <div style={enterDelay(240)} className="enter mt-10 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" arrow onClick={() => openBooking()}>
              Agendar consulta
            </Button>
            <ButtonLink size="lg" variant="secondary" href="#tratamentos">
              Conhecer tratamentos
            </ButtonLink>
          </div>

          <ul style={enterDelay(320)} className="enter mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-body">
            <li className="flex items-center gap-2.5">
              <ScanLine aria-hidden="true" className="size-5 text-accent-600" />
              Diagnóstico com escaneamento 3D
            </li>
            <li className="flex items-center gap-2.5">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-500" />
              Retorno em até {clinic.responseTime}
            </li>
          </ul>
        </div>

        <div style={enterDelay(200)} className="enter lg:col-span-6 lg:pl-6">
          <div className="parallax [--parallax:28px]">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  )
}
