import { HeartHandshake, ScanSearch, Sparkle } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Picture } from '../components/ui/Picture'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { media } from '../data/media'

/** Pilares extraídos do próprio texto institucional. */
const pillars = [
  { label: 'Cuidado', icon: HeartHandshake },
  { label: 'Dedicação', icon: Sparkle },
  { label: 'Atenção a cada detalhe', icon: ScanSearch },
]

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="relative overflow-hidden bg-ink-950 py-24 sm:py-32 lg:py-40">
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="relative lg:col-span-6">
          {/* Moldura deslocada na cor da marca, como um detalhe de acabamento */}
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-brand-400/25 sm:translate-x-5 sm:translate-y-5"
          />
          <Picture
            photo={media.about}
            sizes="(min-width: 1024px) 45vw, 100vw"
            frameClassName="aspect-[4/5] rounded-2xl border border-white/[0.07] sm:aspect-[5/4] lg:aspect-[4/5]"
          />
          <div className="absolute bottom-5 left-5 rounded-full border border-white/15 bg-ink-950/70 px-4 py-2 text-[0.6875rem] font-semibold tracking-[0.2em] text-snow uppercase backdrop-blur">
            Premium Car
          </div>
        </Reveal>

        <div className="lg:col-span-6">
          <SectionHeading
            id="sobre-title"
            size="md"
            eyebrow="Sobre a Premium Car"
            title={
              <>
                Paixão por carros. <span className="text-metal">Compromisso com os detalhes.</span>
              </>
            }
          />

          <Reveal delay={120}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-silver-300 sm:text-lg">
              Na Premium Car, acreditamos que cada veículo merece atenção especial. Nosso objetivo é oferecer uma
              experiência de estética automotiva que valorize a aparência do seu carro, com cuidado, dedicação e
              atenção a cada detalhe.
            </p>
          </Reveal>

          <Reveal delay={200} as="div">
            <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-3">
              {pillars.map(({ label, icon: Icon }) => (
                <li key={label} className="flex items-center gap-3 bg-ink-950 px-5 py-5 sm:flex-col sm:items-start sm:gap-4">
                  <Icon className="size-5 shrink-0 text-brand-300" strokeWidth={1.5} aria-hidden="true" />
                  <span className="text-sm font-medium text-snow">{label}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={280} className="mt-10">
            <Button href="#servicos" variant="outline">
              Ver serviços
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
