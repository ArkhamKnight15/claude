import { MapPin } from 'lucide-react'
import { AnimatedGradient, type GradientPalette } from '../components/effects/AnimatedGradient'
import { WhatsAppIcon } from '../components/icons'
import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { OpenBadge } from '../components/ui/OpenBadge'
import { RevealText } from '../components/ui/RevealText'
import { store } from '../data/store'
import { enterDelay } from '../lib/motion'
import { whatsappLinkProps } from '../lib/whatsapp'
import { HeroVisual } from './HeroVisual'

/** Creme + tons de rosé e champanhe: claros o bastante para manter o contraste do texto por cima. */
const HERO_PALETTE: GradientPalette = ['#f7f3ec', '#f4e6df', '#efd9cf', '#ecd9b8']

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="inicio-titulo" className="relative isolate overflow-x-clip pt-28 pb-8 sm:pt-36 lg:pt-40 lg:pb-0">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_0%,var(--color-wine-100),transparent_60%)]"
      >
        <AnimatedGradient
          palette={HERO_PALETTE}
          className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
        />
        <div className="absolute inset-0 bg-cream/50 lg:bg-transparent lg:bg-gradient-to-r lg:from-cream/85 lg:via-cream/30 lg:to-transparent" />
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_0%,black_10%,transparent_65%)]" />
      </div>

      <Container className="grid items-center gap-20 lg:grid-cols-12 lg:gap-12">
        <div className="scroll-exit lg:col-span-6">
          <p className="enter inline-flex items-center gap-2.5 rounded-full bg-white/80 py-1.5 pr-4 pl-1.5 text-[0.8125rem] font-medium text-ink-800 shadow-soft ring-1 ring-ink-950/5">
            <span className="rounded-full bg-ink-950 px-2.5 py-0.5 font-mono text-[0.6875rem] font-medium tracking-[0.06em] whitespace-nowrap text-white uppercase">
              Asa Sul · DF
            </span>
            <OpenBadge />
          </p>

          <RevealText
            as="h1"
            id="inicio-titulo"
            trigger="load"
            delay={120}
            className="mt-7 font-display text-[2.75rem] leading-[1.02] font-medium tracking-[-0.025em] sm:text-[4rem] lg:text-[3.625rem] xl:text-[4.25rem]"
          >
            Bebidas geladas, bons rótulos e <em className="text-wine-700">tabacaria premium.</em>
          </RevealText>

          <p style={enterDelay(160)} className="enter mt-7 max-w-xl text-lg leading-relaxed text-body sm:text-xl sm:leading-relaxed">
            Vinhos, espumantes, destilados e cervejas na CLS 404 da Asa Sul. Fale com a gente pelo WhatsApp: tiramos suas
            dúvidas, indicamos o rótulo certo e deixamos tudo separado para você.
          </p>

          <div style={enterDelay(240)} className="enter mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              {...whatsappLinkProps()}
              size="lg"
              variant="whatsapp"
              arrow
              leadingIcon={<WhatsAppIcon className="size-5" />}
            >
              Chamar no WhatsApp
            </ButtonLink>
            <ButtonLink size="lg" variant="secondary" href="#fotos">
              Ver fotos da loja
            </ButtonLink>
          </div>

          <ul style={enterDelay(320)} className="enter mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-body">
            <li>
              <a
                href={store.address.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 transition-colors hover:text-ink-950"
              >
                <MapPin aria-hidden="true" className="size-5 text-wine-700" />
                {store.address.street}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-wine-600" />
              {store.bio}
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
