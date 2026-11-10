import { ArrowUpRight, MapPin, Smartphone } from 'lucide-react'
import { AnimatedGradient, type GradientPalette } from '../components/effects/AnimatedGradient'
import { InstagramIcon, WhatsAppIcon } from '../components/icons'
import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Eyebrow } from '../components/ui/Eyebrow'
import { OpenBadge } from '../components/ui/OpenBadge'
import { Reveal } from '../components/ui/Reveal'
import { RevealText } from '../components/ui/RevealText'
import { headingClasses } from '../components/ui/SectionHeader'
import { quickMessages } from '../data/quickMessages'
import { store } from '../data/store'
import { cn } from '../lib/cn'
import { whatsappLinkProps } from '../lib/whatsapp'

/** Preto com reflexos de vinho e âmbar: escuro o bastante para o texto branco manter contraste AA. */
const CTA_PALETTE: GradientPalette = ['#100e0d', '#1e1112', '#3a161b', '#5a2e1d']

export function FinalCta() {
  const { address } = store

  return (
    <section id="fale-conosco" aria-labelledby="fale-conosco-titulo" className="py-20 sm:py-28">
      <Container>
        <div className="grain relative overflow-hidden rounded-[2rem] bg-ink-950 px-5 py-12 sm:rounded-[2.5rem] sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <AnimatedGradient palette={CTA_PALETTE} speed={0.8} className="absolute inset-0" />
            <div className="bg-grid-light absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_60%)]" />
          </div>

          <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal className="min-w-0 lg:col-span-7 lg:py-2">
              <Eyebrow tone="light">Fale com a gente</Eyebrow>
              <RevealText id="fale-conosco-titulo" delay={80} className={cn(headingClasses, 'mt-5 text-white')}>
                Seu próximo brinde começa com uma <em className="text-gold-300">conversa</em>.
              </RevealText>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-200">
                Escolha um assunto e o WhatsApp abre com a mensagem pronta. É só enviar.
              </p>

              <ul className="mt-9 flex flex-wrap gap-2.5" aria-label="Mensagens prontas">
                {quickMessages.map(({ label, message, icon: Icon }) => (
                  <li key={label}>
                    <a
                      {...whatsappLinkProps(message)}
                      className="group inline-flex items-center gap-2.5 rounded-full bg-white/[0.06] py-2.5 pr-4 pl-3 text-[0.9375rem] font-medium text-white ring-1 ring-white/15 ring-inset transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:bg-white/[0.12] hover:ring-white/30"
                    >
                      <Icon aria-hidden="true" className="size-4 text-gold-300" strokeWidth={1.8} />
                      {label}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-3.5 text-ink-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                      />
                      <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-10 grid gap-x-6 gap-y-7 border-t border-white/10 pt-8 sm:grid-cols-2">
                <a href={store.instagram.href} target="_blank" rel="noopener noreferrer" className="group">
                  <p className="flex items-center gap-2 font-mono text-xs font-medium tracking-[0.1em] text-gold-300 uppercase">
                    <InstagramIcon className="size-3.5" />
                    Instagram
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white transition-colors group-hover:text-gold-200">
                    {store.instagram.handle}
                  </p>
                </a>
                <a href={address.mapsHref} target="_blank" rel="noopener noreferrer" className="group">
                  <p className="flex items-center gap-2 font-mono text-xs font-medium tracking-[0.1em] text-gold-300 uppercase">
                    <MapPin aria-hidden="true" className="size-3.5" />
                    Endereço
                  </p>
                  <p className="mt-2 text-[0.9375rem] leading-snug text-ink-100 transition-colors group-hover:text-white">
                    {address.street}
                    <br />
                    {address.district}, {address.city} – {address.state}
                  </p>
                </a>
              </div>
            </Reveal>

            <Reveal delay={120} className="min-w-0 lg:col-span-5">
              <div className="flex h-full flex-col rounded-[1.5rem] bg-white p-6 shadow-elevated sm:p-8 lg:p-10">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-whatsapp text-white">
                  <WhatsAppIcon className="size-6" />
                </span>
                <h3 className="mt-6 font-display text-[1.75rem] leading-tight font-medium">Atendimento pelo WhatsApp</h3>
                <p className="mt-2 text-[0.9375rem] text-body">Tire dúvidas, peça indicações e combine a retirada com a equipe.</p>

                <p className="mt-6 font-display text-[1.75rem] leading-none font-medium tracking-[-0.01em] whitespace-nowrap text-ink-950 tabular-nums sm:text-[2rem]">
                  {store.whatsapp.display}
                </p>
                <OpenBadge className="mt-3 text-sm font-medium text-body" />

                <div className="mt-7 hidden items-center gap-5 rounded-2xl bg-cream p-4 ring-1 ring-line ring-inset md:flex">
                  <img
                    src="/images/whatsapp-qr.svg"
                    alt={`QR code que abre a conversa com a ${store.name} no WhatsApp`}
                    width={96}
                    height={96}
                    loading="lazy"
                    className="size-24 shrink-0 rounded-lg bg-white p-1.5"
                  />
                  <p className="flex items-start gap-2 text-sm leading-relaxed text-body">
                    <Smartphone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-wine-700" />
                    Está no computador? Aponte a câmera do celular para o código e continue a conversa por lá.
                  </p>
                </div>

                <div className="mt-auto pt-8">
                  <ButtonLink
                    {...whatsappLinkProps()}
                    variant="whatsapp"
                    size="lg"
                    className="w-full"
                    leadingIcon={<WhatsAppIcon className="size-5" />}
                  >
                    Chamar no WhatsApp
                  </ButtonLink>
                  <p className="mt-3 text-center text-xs text-muted">
                    Abre o app no celular ou o WhatsApp Web no computador.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
