import { Globe2 } from 'lucide-react'
import { LogoEmblem } from '../components/brand/Logo'
import { Container } from '../components/ui/Container'
import { Eyebrow } from '../components/ui/Eyebrow'
import { Picture } from '../components/ui/Picture'
import { Reveal } from '../components/ui/Reveal'
import { RevealText } from '../components/ui/RevealText'
import { headingClasses } from '../components/ui/SectionHeader'
import { pillars } from '../data/about'
import { photos } from '../data/media'
import { store } from '../data/store'
import { cn } from '../lib/cn'

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="relative overflow-x-clip bg-white py-24 sm:py-32">
      <Container className="grid items-center gap-20 lg:grid-cols-12 lg:gap-12">
        <Reveal className="relative mx-auto w-full max-w-lg lg:col-span-6 lg:max-w-none">
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            <Picture photo={photos.mioloLote43} className="aspect-[3/4] rounded-[1.75rem] shadow-elevated ring-1 ring-ink-950/5 lg:aspect-[2/3]" />
            <div className="parallax pt-16 [--parallax:-24px] sm:pt-24">
              <Picture photo={photos.rossoPiceno} className="aspect-[3/4] rounded-[1.75rem] shadow-elevated ring-1 ring-ink-950/5 lg:aspect-[2/3]" />
            </div>
          </div>

          <div className="absolute -top-6 left-2 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-card ring-1 ring-ink-950/5 backdrop-blur sm:top-10 sm:-left-8">
            <span className="flex size-10 items-center justify-center rounded-xl bg-wine-50 text-wine-700">
              <Globe2 aria-hidden="true" className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink-950">Vinhos de 5 países</p>
              <p className="text-xs text-muted">Nacionais e importados</p>
            </div>
          </div>

          <div className="grain absolute -right-3 -bottom-10 w-44 rounded-[1.5rem] bg-ink-950 p-4 text-white shadow-elevated sm:-right-8 sm:w-64 sm:p-7">
            <LogoEmblem className="h-6 text-gold-200 sm:h-9" />
            <p className="mt-3 font-display text-[1.125rem] leading-[1.15] font-medium text-white italic sm:mt-4 sm:text-[1.625rem]">
              Brindes que viram memórias.
            </p>
            <p className="mt-2 text-xs text-ink-300 sm:text-[0.8125rem]">{store.instagram.handle}</p>
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:pl-10">
          <Reveal>
            <Eyebrow>Sobre a Gama</Eyebrow>
          </Reveal>
          <RevealText id="sobre-titulo" delay={80} className={cn(headingClasses, 'mt-5')}>
            Sua distribuidora na <em className="text-wine-700">Asa Sul</em>.
          </RevealText>

          <Reveal delay={100} className="mt-7 space-y-5 text-[1.0625rem] leading-relaxed text-body">
            <p>
              A {store.legalName} fica no comércio local da 404 Sul e reúne, em um só lugar, a praticidade de uma
              distribuidora e o cuidado de uma adega.
            </p>
            <p>
              Nas prateleiras, rótulos selecionados com qualidade, variedade e tradição: vinhos nacionais e importados,
              espumantes, destilados, licores e cervejas geladas, além de uma linha de tabacaria premium. E, para quem quer
              resolver tudo pelo celular, o atendimento acontece direto no WhatsApp.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <figure className="mt-9 border-l-2 border-wine-300 pl-6">
              <blockquote className="font-display text-[1.5rem] leading-[1.4] text-ink-950 italic">
                <p>“Aqui você encontra o vinho perfeito para cada momento, do brinde especial ao dia a dia.”</p>
              </blockquote>
              <figcaption className="mt-3 text-sm text-muted">
                <span className="font-semibold text-ink-900">{store.name}</span> · {store.address.district}, {store.address.city}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={220}>
            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-line pt-8 sm:grid-cols-4 lg:grid-cols-2 xl:gap-x-10">
              {pillars.map((pillar) => (
                <li key={pillar.title}>
                  <p className="font-display text-[1.375rem] leading-none font-medium text-ink-950">{pillar.title}</p>
                  <p className="mt-2 text-sm leading-snug text-muted">{pillar.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
