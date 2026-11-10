import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { highlights } from '../data/highlights'

export function Highlights() {
  return (
    <section aria-label="Destaques da Gama Distribuidora" className="pt-24 pb-16 sm:pt-32 sm:pb-20">
      <Container>
        <Reveal as="div" className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] bg-line shadow-soft ring-1 ring-line lg:grid-cols-4">
          {highlights.map(({ title, label, description, icon: Icon }) => (
            <div key={title} className="group bg-white px-5 py-7 sm:px-8 sm:py-9">
              <Icon
                aria-hidden="true"
                strokeWidth={1.6}
                className="size-6 text-wine-700 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5"
              />
              <p className="mt-5 font-display text-[1.625rem] leading-none font-medium tracking-[-0.02em] text-ink-950 sm:text-[2.375rem] lg:text-[2.625rem]">
                {title}
              </p>
              <p className="mt-3 text-[0.9375rem] font-semibold text-ink-900">{label}</p>
              <p className="mt-1 text-sm leading-snug text-muted">{description}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  )
}
