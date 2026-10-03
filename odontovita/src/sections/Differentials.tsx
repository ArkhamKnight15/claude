import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/ui/SectionHeader'
import { differentials, equipment } from '../data/differentials'
import type { Differential } from '../types'

const cardClasses =
  'spotlight h-full rounded-[1.75rem] [--spot-color:rgb(155_201_238/0.09)] bg-white/[0.035] ring-1 ring-white/10 ring-inset transition-[background-color,box-shadow,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:bg-white/[0.06] hover:ring-white/20'

function IconTile({ icon: Icon }: { icon: Differential['icon'] }) {
  return (
    <span className="flex size-12 items-center justify-center rounded-2xl bg-accent-300/10 text-accent-300 ring-1 ring-accent-300/20 ring-inset">
      <Icon aria-hidden="true" className="size-[1.375rem]" strokeWidth={1.6} />
    </span>
  )
}

function TechnologyCard({ item }: { item: Differential }) {
  return (
    <article data-spotlight className={`${cardClasses} grid gap-10 p-7 sm:p-9 md:grid-cols-2 md:gap-8`}>
      <div className="flex flex-col">
        <IconTile icon={item.icon} />
        <h3 className="mt-7 text-2xl font-semibold tracking-[-0.01em] text-white">{item.title}</h3>
        <p className="mt-3 leading-relaxed text-navy-200">{item.description}</p>
        <p className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium text-accent-200">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-300" />
          Fluxo 100% digital, do diagnóstico à entrega
        </p>
      </div>
      <ul className="divide-y divide-white/10 rounded-2xl bg-navy-900/60 px-5 ring-1 ring-white/10 ring-inset">
        {equipment.map(({ name, description, icon: Icon }) => (
          <li key={name} className="flex items-center gap-4 py-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-accent-200">
              <Icon aria-hidden="true" className="size-[1.125rem]" strokeWidth={1.6} />
            </span>
            <div className="min-w-0">
              <p className="text-[0.9375rem] font-semibold text-white">{name}</p>
              <p className="text-[0.8125rem] leading-snug text-navy-300">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  )
}

function DifferentialCard({ item }: { item: Differential }) {
  return (
    <article data-spotlight className={`${cardClasses} flex flex-col p-7 sm:p-8`}>
      <IconTile icon={item.icon} />
      <h3 className="mt-6 text-xl font-semibold tracking-[-0.01em] text-white sm:mt-7">{item.title}</h3>
      <p className="mt-3 leading-relaxed text-navy-200">{item.description}</p>
      {item.detail && (
        <p className="mt-auto pt-7">
          <span className="inline-flex rounded-full bg-white/[0.06] px-3 py-1 text-xs font-semibold text-accent-200 ring-1 ring-white/10 ring-inset">
            {item.detail}
          </span>
        </p>
      )}
    </article>
  )
}

export function Differentials() {
  const [technology, ...others] = differentials

  return (
    <section
      id="diferenciais"
      aria-labelledby="diferenciais-titulo"
      className="grain relative overflow-hidden bg-navy-950 py-24 sm:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-56 left-[10%] h-[30rem] w-[30rem] rounded-full bg-accent-500/15 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-[26rem] w-[26rem] rounded-full bg-accent-300/10 blur-3xl" />
        <div className="bg-grid-light absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_45%)]" />
      </div>

      <Container className="relative">
        <SectionHeader
          id="diferenciais-titulo"
          tone="light"
          layout="split"
          eyebrow="Diferenciais"
          title={
            <>
              Tecnologia de ponta. <em className="text-accent-300">Cuidado humano.</em>
            </>
          }
          description="Investimos continuamente em equipamentos e em pessoas para que cada consulta seja precisa, confortável e previsível, do primeiro contato ao resultado final."
        />

        <div className="mt-14 grid gap-4 sm:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          <Reveal className="md:col-span-2">
            <TechnologyCard item={technology} />
          </Reveal>
          {others.map((item, index) => (
            <Reveal key={item.id} delay={(index % 3) * 90}>
              <DifferentialCard item={item} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
