import { Sparkles } from 'lucide-react'
import { ClinicInterior } from '../components/illustrations/ClinicInterior'
import { Container } from '../components/ui/Container'
import { Eyebrow } from '../components/ui/Eyebrow'
import { MediaFrame } from '../components/ui/MediaFrame'
import { Reveal } from '../components/ui/Reveal'
import { RevealText } from '../components/ui/RevealText'
import { headingClasses } from '../components/ui/SectionHeader'
import { milestones } from '../data/about'
import { clinic } from '../data/clinic'
import { media } from '../data/media'
import { cn } from '../lib/cn'

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="relative overflow-x-clip py-24 sm:py-32">
      <Container className="grid items-center gap-20 lg:grid-cols-12 lg:gap-12">
        <Reveal className="relative mx-auto w-full max-w-lg lg:col-span-6 lg:max-w-none">
          <MediaFrame
            asset={media.aboutMain}
            className="aspect-[4/5] rounded-[2rem] shadow-elevated ring-1 ring-navy-950/5"
            fallback={<ClinicInterior className="parallax absolute inset-0 size-full scale-[1.12] [--parallax:4%]" />}
          />

          <div className="absolute top-6 -left-3 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-card ring-1 ring-navy-950/5 backdrop-blur sm:top-10 sm:-left-8">
            <span className="flex size-10 items-center justify-center rounded-xl bg-accent-50 text-accent-700">
              <Sparkles aria-hidden="true" className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-navy-950">620 m² de estrutura</p>
              <p className="text-xs text-muted">8 consultórios privativos</p>
            </div>
          </div>

          <div className="grain parallax absolute -right-3 -bottom-10 w-48 [--parallax:-28px] rounded-[1.5rem] bg-navy-950 p-5 text-white shadow-elevated sm:-right-8 sm:w-64 sm:p-7">
            <p className="font-serif text-5xl leading-none tracking-[-0.02em] sm:text-6xl">{clinic.foundedYear}</p>
            <p className="mt-3 text-[0.8125rem] leading-relaxed text-navy-200 sm:text-sm">
              Mais de uma década transformando sorrisos nos Jardins, em São Paulo.
            </p>
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:pl-10">
          <Reveal>
            <Eyebrow>Sobre nós</Eyebrow>
          </Reveal>
          <RevealText id="sobre-titulo" delay={80} className={cn(headingClasses, 'mt-5')}>
            Uma clínica criada para quem valoriza cada <em className="text-accent-600">detalhe</em>.
          </RevealText>

          <Reveal delay={100} className="mt-7 space-y-5 text-[1.0625rem] leading-relaxed text-body">
            <p>
              A {clinic.name} nasceu em {clinic.foundedYear} do desejo da Dra. Helena Vasconcellos de unir odontologia de
              alta precisão a uma experiência genuinamente acolhedora. O que começou como um consultório de duas cadeiras
              tornou-se uma clínica de referência em reabilitação oral e estética do sorriso.
            </p>
            <p>
              Hoje, reunimos especialistas de diferentes áreas sob o mesmo teto, com tecnologia digital em todas as etapas
              do diagnóstico ao acompanhamento. Cada plano é desenhado individualmente, com tempo, escuta e total
              transparência.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <figure className="mt-9 border-l-2 border-accent-300 pl-6">
              <blockquote className="font-editorial text-[1.75rem] leading-snug font-medium text-navy-950 italic">
                <p>“Tratar um sorriso é cuidar de uma pessoa por inteiro: da saúde à autoestima.”</p>
              </blockquote>
              <figcaption className="mt-3 text-sm text-muted">
                <span className="font-semibold text-navy-900">Dra. Helena Vasconcellos</span> · Fundadora e diretora clínica
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={220}>
            <ol className="mt-10 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-line pt-8 sm:grid-cols-4">
              {milestones.map((milestone) => (
                <li key={milestone.year}>
                  <p className="font-serif text-[1.75rem] leading-none text-navy-950">{milestone.year}</p>
                  <p className="mt-2 text-sm leading-snug text-muted">{milestone.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
