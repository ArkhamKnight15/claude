import { CalendarCheck2 } from 'lucide-react'
import { useRef } from 'react'
import { useTilt } from '../hooks/usePointerEffects'
import { clinic } from '../data/clinic'
import { SmileIllustration } from '../components/illustrations/SmileIllustration'
import { Monogram } from '../components/ui/Monogram'
import { StarRating } from '../components/ui/StarRating'

const metrics = [
  { label: 'Simetria', value: '98%' },
  { label: 'Cor-alvo', value: 'BL2' },
  { label: 'Proporção', value: '1,618' },
]

/** Composição do hero: planejamento digital do sorriso + cartões flutuantes. */
export function HeroVisual() {
  const tiltRef = useRef<HTMLDivElement>(null)
  useTilt(tiltRef, 6)

  return (
    <div ref={tiltRef} className="tilt relative mx-auto w-full max-w-[36rem] lg:max-w-none">
      <div
        aria-hidden="true"
        className="absolute -inset-x-4 -top-8 -bottom-6 rounded-[2.75rem] bg-gradient-to-br from-accent-100 via-mist to-transparent sm:-inset-x-8"
      />

      <figure className="grain relative overflow-hidden rounded-[2rem] bg-navy-950 p-4 shadow-elevated sm:p-6">
        <div
          aria-hidden="true"
          className="bg-grid-light absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
        />
        <div aria-hidden="true" className="absolute -top-28 -right-16 size-72 rounded-full bg-accent-500/25 blur-3xl" />

        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem]">
          <SmileIllustration
            preset="ideal-bright"
            showGuides
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 size-full"
            title="Simulação digital de um sorriso harmonioso, com linhas-guia de planejamento"
          />
          <div
            aria-hidden="true"
            className="animate-scan pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-accent-300/20 to-transparent"
          />
          <span className="absolute top-3 right-3 rounded-full bg-navy-950/60 px-2.5 py-1 font-mono text-[0.6875rem] font-medium tracking-[0.06em] text-accent-200 uppercase ring-1 ring-white/10 ring-inset backdrop-blur sm:top-4 sm:right-4">
            DSD · 3D
          </span>
        </div>

        <div className="relative mt-4 border-t border-white/10 px-1 pt-4 sm:mt-5">
          <p className="flex items-center gap-2 text-xs font-medium text-navy-200 sm:text-[0.8125rem]">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent-300" />
              <span className="relative size-2 rounded-full bg-accent-300" />
            </span>
            Planejamento digital do sorriso
          </p>
          <dl className="mt-4 grid grid-cols-3 gap-2">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <dt className="font-mono text-[0.6875rem] font-medium tracking-[0.06em] uppercase text-navy-300">{metric.label}</dt>
                <dd className="mt-1.5 font-display text-xl leading-none font-medium tracking-[-0.03em] text-white sm:text-2xl">{metric.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <figcaption className="sr-only">
          Exemplo ilustrativo do planejamento digital realizado antes de cada tratamento estético.
        </figcaption>
      </figure>

      <div className="animate-float tilt-depth absolute -top-7 -left-3 flex items-center gap-3 rounded-2xl bg-white/95 py-3 pr-5 pl-3 shadow-card ring-1 ring-navy-950/5 backdrop-blur sm:-left-10">
        <span className="flex size-10 items-center justify-center rounded-xl bg-accent-50 text-accent-700">
          <CalendarCheck2 aria-hidden="true" className="size-5" />
        </span>
        <div>
          <p className="font-mono text-[0.6875rem] font-medium tracking-[0.06em] uppercase text-muted">Próximo horário</p>
          <p className="text-sm font-semibold text-navy-950">Amanhã, às 9h30</p>
        </div>
      </div>

      <div className="animate-float-delayed tilt-depth absolute -right-2 -bottom-16 flex sm:-bottom-10 items-center gap-3.5 rounded-2xl bg-white/95 py-3 pr-5 pl-3 shadow-card ring-1 ring-navy-950/5 backdrop-blur sm:-right-8">
        <div className="flex -space-x-2.5">
          {['Camila Andrade', 'Ricardo Menezes', 'Juliana Prado'].map((name, index) => (
            <Monogram key={name} name={name} index={index} className="size-9 text-[0.6875rem] ring-2 ring-white" />
          ))}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-navy-950">{clinic.rating.score.toLocaleString('pt-BR')}</span>
            <StarRating rating={clinic.rating.score} className="text-accent-500" starClassName="size-3.5" />
          </div>
          <p className="text-xs text-muted">+{clinic.rating.reviews} avaliações</p>
        </div>
      </div>
    </div>
  )
}
