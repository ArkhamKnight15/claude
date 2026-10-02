import { Quote } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { Monogram } from '../components/ui/Monogram'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/ui/SectionHeader'
import { StarRating } from '../components/ui/StarRating'
import { clinic } from '../data/clinic'
import { testimonials } from '../data/testimonials'
import { cn } from '../lib/cn'
import type { Testimonial } from '../types'

interface TestimonialCardProps {
  testimonial: Testimonial
  index: number
  featured?: boolean
}

function TestimonialCard({ testimonial, index, featured = false }: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        'flex h-full flex-col rounded-[1.75rem] p-7 transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 sm:p-9',
        featured
          ? 'grain relative overflow-hidden bg-navy-950 text-white shadow-elevated'
          : 'bg-white shadow-soft ring-1 ring-line ring-inset hover:shadow-card',
      )}
    >
      {featured && (
        <div aria-hidden="true" className="absolute -top-24 -right-24 size-72 rounded-full bg-accent-500/20 blur-3xl" />
      )}
      <div className="relative flex items-center justify-between">
        <StarRating rating={testimonial.rating} className={featured ? 'text-accent-300' : 'text-accent-500'} />
        {featured && <Quote aria-hidden="true" className="size-10 text-accent-300/40" strokeWidth={1.25} />}
      </div>
      <blockquote
        className={cn(
          'relative mt-6',
          featured && 'mb-8',
          featured ? 'font-serif text-[1.625rem] leading-snug text-white sm:text-[1.875rem]' : 'text-[1.0625rem] leading-relaxed text-navy-900',
        )}
      >
        <p>“{testimonial.quote}”</p>
      </blockquote>
      <figcaption
        className={cn('relative mt-auto flex items-center gap-3.5 pt-8', featured && 'border-t border-white/10')}
      >
        <Monogram name={testimonial.name} index={index} className="size-12" />
        <div>
          <p className={cn('font-semibold', featured ? 'text-white' : 'text-navy-950')}>{testimonial.name}</p>
          <p className={cn('text-sm', featured ? 'text-navy-200' : 'text-muted')}>
            {testimonial.treatment} · {testimonial.since}
          </p>
        </div>
      </figcaption>
    </figure>
  )
}

export function Testimonials() {
  const [featured, ...others] = testimonials

  return (
    <section id="depoimentos" aria-labelledby="depoimentos-titulo" className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            id="depoimentos-titulo"
            eyebrow="Depoimentos"
            title={
              <>
                Histórias de quem voltou a <em className="text-accent-600">sorrir</em>.
              </>
            }
          />
          <Reveal delay={120} className="shrink-0">
            <div className="inline-flex items-center gap-5 rounded-[1.25rem] bg-white py-4 pr-6 pl-5 shadow-soft ring-1 ring-line ring-inset">
              <p className="font-serif text-5xl leading-none text-navy-950">{clinic.rating.score.toLocaleString('pt-BR')}</p>
              <div>
                <StarRating rating={clinic.rating.score} className="text-accent-500" />
                <p className="mt-1.5 text-sm text-muted">
                  Média de +{clinic.rating.reviews} avaliações
                  <br />
                  de pacientes no Google
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          <Reveal className="md:col-span-2 lg:col-span-1 lg:row-span-2">
            <TestimonialCard testimonial={featured} index={0} featured />
          </Reveal>
          {others.map((testimonial, index) => (
            <Reveal
              key={testimonial.id}
              delay={(index + 1) * 90}
              className={cn(index === others.length - 1 && 'md:col-span-2')}
            >
              <TestimonialCard testimonial={testimonial} index={index + 1} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
