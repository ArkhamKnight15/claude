import { ArrowUpRight } from 'lucide-react'
import { whatsappMessages } from '../config/messages'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Picture } from '../components/ui/Picture'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { differentials } from '../data/differentials'
import { media } from '../data/media'
import { whatsappUrl } from '../lib/whatsapp'

export function Differentials() {
  return (
    <section
      aria-labelledby="diferenciais-title"
      className="grain relative overflow-hidden border-y border-white/[0.06] bg-ink-950 py-24 sm:py-32 lg:py-40"
    >
      {/* Brilho difuso, como um refletor de estúdio */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] size-[42rem] rounded-full bg-gold-400/[0.06] blur-3xl"
      />

      <Container className="relative grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="diferenciais-title"
            eyebrow="Diferenciais"
            title={
              <>
                Seu veículo merece um <span className="text-metal">cuidado superior.</span>
              </>
            }
            subtitle="Um processo pensado para quem enxerga o carro como algo que merece ser preservado."
          />

          <Reveal delay={120} className="mt-10 hidden lg:block">
            <Picture
              photo={media.differentials}
              sizes="(min-width: 1024px) 38vw, 100vw"
              frameClassName="aspect-[4/5] rounded-2xl border border-white/[0.07]"
            />
          </Reveal>
        </div>

        <div className="flex flex-col lg:col-span-7 lg:pt-28">
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2">
            {differentials.map((item, index) => {
              const Icon = item.icon
              return (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={index * 90}
                  className="group relative flex flex-col bg-ink-950 p-7 transition-colors duration-500 hover:bg-ink-850 sm:p-9"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-xl border border-white/10 text-gold-300 transition-[border-color,transform] duration-500 group-hover:-translate-y-0.5 group-hover:border-gold-400/40">
                      <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className="font-display text-xs font-semibold tracking-[0.2em] text-silver-500 tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-8 font-display text-lg font-semibold tracking-wide uppercase [font-stretch:112%] sm:mt-14">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-silver-400">{item.description}</p>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold-400/60 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                  />
                </Reveal>
              )
            })}
          </ol>

          <Reveal
            delay={200}
            className="mt-8 flex flex-col gap-5 rounded-2xl border border-white/[0.07] bg-ink-850/60 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            <p className="max-w-sm text-[0.9375rem] leading-relaxed text-silver-300">
              Não sabe qual serviço escolher? Conte sobre o seu carro e indicamos o cuidado ideal.
            </p>
            <Button
              href={whatsappUrl(whatsappMessages.specialist)}
              external
              variant="outline"
              icon={<ArrowUpRight className="size-4" />}
            >
              Pedir indicação
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
