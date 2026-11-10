import { WhatsAppIcon } from '../components/icons'
import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/ui/SectionHeader'
import { differentials, serviceSteps } from '../data/differentials'
import { store } from '../data/store'
import { whatsappLinkProps } from '../lib/whatsapp'
import type { Differential } from '../types'

const cardClasses =
  'spotlight h-full rounded-[1.75rem] [--spot-color:rgb(220_192_138/0.08)] bg-white/[0.035] ring-1 ring-white/10 ring-inset transition-[background-color,box-shadow,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:bg-white/[0.06] hover:ring-white/20'

function IconTile({ icon: Icon }: { icon: Differential['icon'] }) {
  return (
    <span className="flex size-12 items-center justify-center rounded-2xl bg-gold-300/10 text-gold-300 ring-1 ring-gold-300/20 ring-inset">
      <Icon aria-hidden="true" className="size-[1.375rem]" strokeWidth={1.6} />
    </span>
  )
}

/** Card principal: como funciona o atendimento pelo WhatsApp, passo a passo. */
function WhatsAppCard({ item }: { item: Differential }) {
  return (
    <article data-spotlight className={`${cardClasses} grid gap-10 p-7 sm:p-9 md:grid-cols-2 md:gap-8`}>
      <div className="flex flex-col">
        <IconTile icon={item.icon} />
        <h3 className="mt-7 font-display text-[1.75rem] leading-tight font-medium text-white">{item.title}</h3>
        <p className="mt-3 leading-relaxed text-ink-200">{item.description}</p>
        <div className="mt-auto pt-8">
          <ButtonLink
            {...whatsappLinkProps()}
            variant="whatsapp"
            leadingIcon={<WhatsAppIcon className="size-[1.125rem]" />}
          >
            {store.whatsapp.display}
          </ButtonLink>
        </div>
      </div>
      <ol className="divide-y divide-white/10 rounded-2xl bg-ink-900/70 px-5 ring-1 ring-white/10 ring-inset">
        {serviceSteps.map(({ title, description, icon: Icon }, index) => (
          <li key={title} className="flex items-center gap-4 py-4">
            <span className="relative flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-gold-200">
              <Icon aria-hidden="true" className="size-[1.125rem]" strokeWidth={1.6} />
              <span
                aria-hidden="true"
                className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-gold-300 font-mono text-[0.625rem] font-medium text-ink-950"
              >
                {index + 1}
              </span>
            </span>
            <div className="min-w-0">
              <p className="text-[0.9375rem] font-semibold text-white">
                <span className="sr-only">Passo {index + 1}: </span>
                {title}
              </p>
              <p className="text-[0.8125rem] leading-snug text-ink-300">{description}</p>
            </div>
          </li>
        ))}
      </ol>
    </article>
  )
}

function DifferentialCard({ item }: { item: Differential }) {
  return (
    <article data-spotlight className={`${cardClasses} flex flex-col p-7 sm:p-8`}>
      <IconTile icon={item.icon} />
      <h3 className="mt-6 font-display text-[1.5rem] leading-tight font-medium text-white sm:mt-7">{item.title}</h3>
      <p className="mt-3 leading-relaxed text-ink-200">{item.description}</p>
      {item.detail && (
        <p className="mt-auto pt-7">
          <span className="inline-flex rounded-full bg-white/[0.06] px-3 py-1 font-mono text-[0.6875rem] text-gold-200 ring-1 ring-white/10 ring-inset">
            {item.detail}
          </span>
        </p>
      )}
    </article>
  )
}

export function Support() {
  const [whatsapp, ...others] = differentials

  return (
    <section id="atendimento" aria-labelledby="atendimento-titulo" className="grain relative overflow-hidden bg-ink-950 py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-56 left-[10%] h-[30rem] w-[30rem] rounded-full bg-wine-700/25 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-[26rem] w-[26rem] rounded-full bg-gold-400/10 blur-3xl" />
        <div className="bg-grid-light absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_45%)]" />
      </div>

      <Container className="relative">
        <SectionHeader
          id="atendimento-titulo"
          tone="light"
          layout="split"
          eyebrow="Atendimento"
          title={
            <>
              Do primeiro “oi” ao <em className="text-gold-300">brinde</em>.
            </>
          }
          description="Atendimento próximo, pelo WhatsApp ou no balcão da loja. Você conta o que precisa e a gente ajuda a escolher."
        />

        <div className="mt-14 grid gap-4 sm:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          <Reveal className="md:col-span-2">
            <WhatsAppCard item={whatsapp} />
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
