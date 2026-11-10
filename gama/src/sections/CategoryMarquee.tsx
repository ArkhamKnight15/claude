import { Sparkle } from 'lucide-react'
import { cn } from '../lib/cn'

const words = ['Vinhos', 'Espumantes', 'Whisky', 'Cervejas geladas', 'Gin', 'Licores', 'Tabacaria premium', 'Narguilé']

/** Faixa decorativa em movimento contínuo (o conteúdo real está na seção seguinte). */
export function CategoryMarquee() {
  return (
    <div aria-hidden="true" className="marquee overflow-hidden pb-20 sm:pb-24">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {words.map((word, index) => (
              <span key={word} className="flex items-center">
                <span
                  className={cn(
                    'px-5 font-display text-[2.125rem] leading-none whitespace-nowrap sm:px-8 sm:text-[2.875rem] lg:text-[3.5rem]',
                    index % 2 === 0 ? 'font-medium text-ink-950' : 'font-normal text-wine-700 italic',
                  )}
                >
                  {word}
                </span>
                <Sparkle className="size-5 shrink-0 fill-gold-400 text-gold-400 sm:size-6" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
