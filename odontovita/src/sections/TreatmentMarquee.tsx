import { Sparkle } from 'lucide-react'
import { treatments } from '../data/treatments'
import { cn } from '../lib/cn'

/** Faixa decorativa com os tratamentos em movimento contínuo (o conteúdo real está na seção seguinte). */
export function TreatmentMarquee() {
  return (
    <div aria-hidden="true" className="marquee overflow-hidden pb-20 sm:pb-24">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {treatments.map((treatment, index) => (
              <span key={treatment.id} className="flex items-center">
                <span
                  className={cn(
                    'px-5 text-[2rem] leading-none whitespace-nowrap sm:px-8 sm:text-[2.75rem] lg:text-[3.5rem]',
                    index % 2 === 0 ? 'font-display font-medium tracking-[-0.04em] text-navy-950' : 'font-serif font-light text-accent-600',
                  )}
                >
                  {treatment.title}
                </span>
                <Sparkle className="size-5 shrink-0 fill-accent-300 text-accent-300 sm:size-6" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
