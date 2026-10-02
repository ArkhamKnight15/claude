import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { stats } from '../data/stats'
import { useCountUp } from '../hooks/useCountUp'
import { useInView } from '../hooks/useInView'
import type { Stat } from '../types'

function StatItem({ stat }: { stat: Stat }) {
  const [ref, inView] = useInView<HTMLDivElement>()
  const current = useCountUp(stat.value, inView)
  const formatter = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: stat.decimals ?? 0,
    maximumFractionDigits: stat.decimals ?? 0,
  })
  const format = (value: number) => `${stat.prefix ?? ''}${formatter.format(value)}${stat.suffix ?? ''}`

  return (
    <div ref={ref} className="bg-surface px-5 py-7 sm:px-8 sm:py-9">
      <p className="font-serif text-[2.75rem] leading-none tracking-[-0.02em] text-ink tabular-nums sm:text-[3.5rem]">
        <span aria-hidden="true">{format(current)}</span>
        <span className="sr-only">{format(stat.value)}</span>
      </p>
      <p className="mt-3 text-[0.9375rem] font-semibold text-ink">{stat.label}</p>
      <p className="mt-1 text-sm leading-snug text-muted">{stat.description}</p>
    </div>
  )
}

export function Stats() {
  return (
    <section aria-label="A OdontoVita em números" className="pt-24 pb-24 sm:pt-32 sm:pb-28">
      <Container>
        <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] bg-line shadow-soft ring-1 ring-line lg:grid-cols-4">
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} />
          ))}
        </Reveal>
      </Container>
    </section>
  )
}
