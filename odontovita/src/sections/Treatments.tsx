import { ArrowRight } from 'lucide-react'
import { useBooking } from '../components/booking/context'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/ui/SectionHeader'
import { treatments } from '../data/treatments'
import type { Treatment } from '../types'

function TreatmentCard({ treatment, index }: { treatment: Treatment; index: number }) {
  const { openBooking } = useBooking()
  const { icon: Icon } = treatment

  return (
    <article className="group relative flex h-full flex-col rounded-[1.5rem] bg-ivory/70 p-7 ring-1 ring-line transition-[transform,box-shadow,background-color] duration-500 ease-out-expo ring-inset hover:-translate-y-1 hover:bg-white hover:shadow-card hover:ring-accent-200 sm:p-8">
      <div className="flex items-start justify-between">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-white text-navy-800 ring-1 ring-line transition-colors duration-500 ring-inset group-hover:bg-navy-950 group-hover:text-accent-200 group-hover:ring-navy-950">
          <Icon aria-hidden="true" className="size-6" strokeWidth={1.6} />
        </span>
        <span aria-hidden="true" className="font-serif text-lg text-navy-500 transition-colors duration-500 group-hover:text-accent-700">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h3 className="mt-6 text-xl font-semibold tracking-[-0.01em] sm:mt-8">{treatment.title}</h3>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">{treatment.description}</p>

      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Destaques">
        {treatment.highlights.map((highlight) => (
          <li
            key={highlight}
            className="rounded-full bg-white px-3 py-1 text-xs font-medium text-navy-700 ring-1 ring-line ring-inset"
          >
            {highlight}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-7 sm:pt-8">
        <button
          type="button"
          onClick={() => openBooking(treatment.id)}
          className="inline-flex items-center gap-3 text-sm font-semibold text-navy-950 after:absolute after:inset-0 after:rounded-[1.5rem] after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent-500"
        >
          Agendar avaliação
          <span className="sr-only"> de {treatment.title.toLowerCase()}</span>
          <span
            aria-hidden="true"
            className="flex size-8 items-center justify-center rounded-full bg-navy-950/5 transition-all duration-500 ease-out-expo group-hover:translate-x-1 group-hover:bg-navy-950 group-hover:text-white"
          >
            <ArrowRight className="size-4" />
          </span>
        </button>
      </div>
    </article>
  )
}

export function Treatments() {
  const { openBooking } = useBooking()

  return (
    <section id="tratamentos" aria-labelledby="tratamentos-titulo" className="bg-white py-24 sm:py-32">
      <Container>
        <SectionHeader
          id="tratamentos-titulo"
          layout="split"
          eyebrow="Tratamentos"
          title={
            <>
              Cuidado completo, do preventivo ao <em className="text-accent-600">estético</em>.
            </>
          }
          description="Cada tratamento começa com um diagnóstico digital detalhado e um plano feito sob medida. Você entende cada etapa, prazo e investimento antes de decidir."
        />

        <ul className="mt-14 grid gap-4 sm:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {treatments.map((treatment, index) => (
            <Reveal as="li" key={treatment.id} delay={(index % 3) * 90}>
              <TreatmentCard treatment={treatment} index={index} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-6 flex flex-col items-start justify-between gap-5 rounded-[1.5rem] bg-navy-50 p-6 ring-1 ring-navy-100 ring-inset sm:flex-row sm:items-center sm:p-7 lg:mt-8">
          <div>
            <p className="text-lg font-semibold text-navy-950">Não sabe qual tratamento é ideal para você?</p>
            <p className="mt-1 text-[0.9375rem] text-body">Na avaliação inicial, indicamos o melhor caminho para o seu caso.</p>
          </div>
          <Button arrow className="shrink-0" onClick={() => openBooking('avaliacao')}>
            Agendar avaliação
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}
