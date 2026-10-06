import { Check, Clock, MapPin, Phone } from 'lucide-react'
import { BookingForm } from '../components/booking/BookingForm'
import { AnimatedGradient, type GradientPalette } from '../components/effects/AnimatedGradient'
import { Container } from '../components/ui/Container'
import { Eyebrow } from '../components/ui/Eyebrow'
import { Reveal } from '../components/ui/Reveal'
import { RevealText } from '../components/ui/RevealText'
import { headingClasses } from '../components/ui/SectionHeader'
import { clinic } from '../data/clinic'
import { cn } from '../lib/cn'

const benefits = [
  'Avaliação completa com escaneamento 3D',
  'Plano de tratamento claro, com prazos e investimento',
  'Valor da avaliação abatido se você iniciar o tratamento',
]

/** Marinho com reflexos azuis: escuro o bastante para o texto branco manter contraste AA. */
const CTA_PALETTE: GradientPalette = ['#0a1628', '#0f2645', '#163d6b', '#2a68a3']

export function FinalCta() {
  const { address } = clinic

  return (
    <section id="agendar" aria-labelledby="agendar-titulo" className="bg-white py-20 sm:py-28">
      <Container>
        <div className="grain relative overflow-hidden rounded-[2rem] bg-navy-950 px-5 py-12 sm:rounded-[2.5rem] sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <AnimatedGradient palette={CTA_PALETTE} speed={0.8} className="absolute inset-0" />
            <div className="bg-grid-light absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_60%)]" />
          </div>

          <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5 lg:py-2">
              <Eyebrow tone="light">Agende sua avaliação</Eyebrow>
              <RevealText id="agendar-titulo" delay={80} className={cn(headingClasses, 'mt-5 text-white')}>
                Seu novo sorriso começa com uma <em className="text-accent-300">conversa</em>.
              </RevealText>
              <p className="mt-6 text-lg leading-relaxed text-navy-200">
                Conte o que você deseja e nossa equipe entra em contato para encontrar o melhor horário. Sem compromisso.
              </p>

              <ul className="mt-9 space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-[0.9375rem] text-navy-100">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-300 text-navy-950">
                      <Check aria-hidden="true" className="size-3" strokeWidth={3} />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="mt-10 grid gap-x-6 gap-y-7 border-t border-white/10 pt-8 sm:grid-cols-2">
                <a href={clinic.phone.href} className="group">
                  <p className="flex items-center gap-2 font-mono text-xs font-medium tracking-[0.08em] text-accent-300 uppercase">
                    <Phone aria-hidden="true" className="size-3.5" />
                    Telefone
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white transition-colors group-hover:text-accent-200">
                    {clinic.phone.display}
                  </p>
                </a>
                <a href={address.mapsHref} target="_blank" rel="noopener noreferrer" className="group">
                  <p className="flex items-center gap-2 font-mono text-xs font-medium tracking-[0.08em] text-accent-300 uppercase">
                    <MapPin aria-hidden="true" className="size-3.5" />
                    Endereço
                  </p>
                  <p className="mt-2 text-[0.9375rem] leading-snug text-navy-100 transition-colors group-hover:text-white">
                    {address.street}
                    <br />
                    {address.district}, {address.city}
                  </p>
                </a>
                <div className="sm:col-span-2">
                  <p className="flex items-center gap-2 font-mono text-xs font-medium tracking-[0.08em] text-accent-300 uppercase">
                    <Clock aria-hidden="true" className="size-3.5" />
                    Horário de atendimento
                  </p>
                  <dl className="mt-3 grid gap-2 text-[0.9375rem]">
                    {clinic.hours.map((slot) => (
                      <div key={slot.days} className="flex justify-between gap-4 border-b border-white/[0.06] pb-2 last:border-0">
                        <dt className="text-navy-200">{slot.days}</dt>
                        <dd className="font-medium text-white">{slot.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-7">
              <div className="rounded-[1.5rem] bg-white p-6 shadow-elevated sm:p-8 lg:p-10">
                <h3 className="font-serif text-[1.875rem] leading-tight">Solicite seu horário</h3>
                <p className="mt-1 text-sm text-muted">Leva menos de um minuto. Retornamos em até {clinic.responseTime}.</p>
                <BookingForm className="mt-7" />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
