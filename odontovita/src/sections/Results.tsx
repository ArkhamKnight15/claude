import { ChevronsLeftRight, Info } from 'lucide-react'
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { useBooking } from '../components/booking/context'
import { SmileIllustration } from '../components/illustrations/SmileIllustration'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/ui/SectionHeader'
import { resultCases } from '../data/results'
import { useInView } from '../hooks/useInView'
import { cn } from '../lib/cn'
import type { ResultCase } from '../types'

/** A demonstração automática do slider roda uma única vez por visita. */
let hintPlayed = false
const HINT_STOPS = [50, 28, 70, 50]
const HINT_DURATION_MS = 2600
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

function CompareSlider({ item }: { item: ResultCase }) {
  const [position, setPosition] = useState(50)
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: '0px 0px -30% 0px' })
  const interacted = useRef(false)

  // Ao aparecer pela primeira vez, a alça desliza sozinha para sinalizar que é interativa.
  useEffect(() => {
    if (!inView || hintPlayed || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    hintPlayed = true

    const segments = HINT_STOPS.length - 1
    const startedAt = performance.now()
    let frame = 0
    const tick = (now: number) => {
      if (interacted.current) return
      const progress = Math.min(Math.max((now - startedAt) / HINT_DURATION_MS, 0), 1)
      const segment = Math.min(Math.floor(progress * segments), segments - 1)
      const local = easeInOutCubic(progress * segments - segment)
      setPosition(HINT_STOPS[segment] + (HINT_STOPS[segment + 1] - HINT_STOPS[segment]) * local)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView])

  return (
    <div ref={ref} className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-navy-950 shadow-elevated select-none sm:aspect-[16/11]">
      <SmileIllustration
        preset={item.after}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
        title={`Depois: simulação do resultado — ${item.title.toLowerCase()}`}
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <SmileIllustration
          preset={item.before}
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 size-full"
          title={`Antes: simulação da condição inicial — ${item.title.toLowerCase()}`}
        />
      </div>

      <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-navy-950/70 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-white uppercase ring-1 ring-white/15 backdrop-blur sm:top-5 sm:left-5">
        Antes
      </span>
      <span className="pointer-events-none absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-navy-950 uppercase backdrop-blur sm:top-5 sm:right-5">
        Depois
      </span>

      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(position)}
        onChange={(event) => {
          interacted.current = true
          setPosition(Number(event.target.value))
        }}
        onPointerDown={() => {
          interacted.current = true
        }}
        aria-label="Comparar antes e depois"
        aria-valuetext={`${Math.round(position)}% da imagem mostrando o antes`}
        className="compare-range peer absolute inset-0 z-20 size-full cursor-ew-resize opacity-0"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-white/90 shadow-[0_0_12px_rgb(0_0_0/0.35)]"
        style={{ left: `${position}%` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 z-10 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy-950 shadow-elevated ring-accent-300/60 transition-[box-shadow,transform] duration-300 peer-hover:scale-105 peer-focus-visible:ring-4 peer-active:scale-95"
        style={{ left: `${position}%` }}
      >
        <ChevronsLeftRight className="size-5" />
      </div>
    </div>
  )
}

export function Results() {
  const { openBooking } = useBooking()
  const [activeId, setActiveId] = useState(resultCases[0].id)
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([])
  const baseId = useId()
  const active = resultCases.find((item) => item.id === activeId) ?? resultCases[0]

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keys: Record<string, number> = {
      ArrowRight: (index + 1) % resultCases.length,
      ArrowLeft: (index - 1 + resultCases.length) % resultCases.length,
      Home: 0,
      End: resultCases.length - 1,
    }
    const nextIndex = keys[event.key]
    if (nextIndex === undefined) return
    event.preventDefault()
    setActiveId(resultCases[nextIndex].id)
    tabsRef.current[nextIndex]?.focus()
  }

  return (
    <section id="resultados" aria-labelledby="resultados-titulo" className="bg-white py-24 sm:py-32">
      <Container>
        <SectionHeader
          id="resultados-titulo"
          layout="split"
          eyebrow="Antes e depois"
          title={
            <>
              Resultados que <em className="text-accent-600">falam por si</em>.
            </>
          }
          description="Conheça simulações de casos típicos tratados na clínica. Arraste o controle sobre a imagem para comparar o antes e o depois."
        />

        <Reveal className="mt-12 sm:mt-14">
          <div
            role="tablist"
            aria-label="Casos de antes e depois"
            className="grid grid-cols-3 gap-1 rounded-full bg-ivory p-1 ring-1 ring-line ring-inset sm:inline-grid sm:grid-flow-col sm:auto-cols-max"
          >
            {resultCases.map((item, index) => {
              const selected = item.id === active.id
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabsRef.current[index] = node
                  }}
                  id={`${baseId}-tab-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(item.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={cn(
                    'rounded-full px-3 py-2.5 text-sm font-semibold transition-[background-color,color,box-shadow] duration-300 sm:px-6',
                    selected
                      ? 'bg-navy-950 text-white shadow-[0_8px_20px_-10px_rgb(10_22_40/0.6)]'
                      : 'text-navy-700 hover:bg-white hover:text-navy-950',
                  )}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </Reveal>

        <div
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${active.id}`}
          className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14"
        >
          <Reveal className="lg:col-span-7">
            <CompareSlider key={active.id} item={active} />
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <div key={active.id} className="enter">
              <p className="text-sm font-semibold text-accent-700">{active.patient}</p>
              <h3 className="mt-2 font-serif text-[2rem] leading-tight sm:text-[2.25rem]">{active.title}</h3>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-body">{active.summary}</p>
              <dl className="mt-8 grid grid-cols-3 divide-x divide-line rounded-2xl bg-ivory ring-1 ring-line ring-inset">
                {active.facts.map((fact) => (
                  <div key={fact.label} className="px-4 py-4 sm:px-5">
                    <dt className="text-xs font-medium tracking-[0.08em] text-muted uppercase">{fact.label}</dt>
                    <dd className="mt-1.5 text-[0.9375rem] font-semibold text-navy-950">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <Button arrow className="mt-8" onClick={() => openBooking(active.treatmentId)}>
                Quero um resultado assim
              </Button>
            </div>
          </Reveal>
        </div>

        <p className="mt-12 flex max-w-3xl items-start gap-2.5 text-[0.8125rem] leading-relaxed text-muted">
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          Imagens meramente ilustrativas, criadas digitalmente para fins demonstrativos. Os resultados variam de acordo com
          cada caso e só podem ser definidos após avaliação clínica.
        </p>
      </Container>
    </section>
  )
}
