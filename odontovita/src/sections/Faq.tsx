import { Phone } from 'lucide-react'
import { useState } from 'react'
import { useBooking } from '../components/booking/context'
import { Button, ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/ui/SectionHeader'
import { clinic } from '../data/clinic'
import { faqItems } from '../data/faq'
import { cn } from '../lib/cn'
import type { FaqItem } from '../types'

function Accordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <div className="border-t border-line">
      {items.map((item) => {
        const isOpen = openId === item.id
        const buttonId = `faq-${item.id}-pergunta`
        const panelId = `faq-${item.id}-resposta`

        return (
          <div key={item.id} className="border-b border-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-semibold tracking-[-0.01em] text-ink sm:text-xl"
              >
                <span className="transition-colors duration-300 group-hover:text-accent-200">{item.question}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'relative flex size-9 shrink-0 items-center justify-center rounded-full ring-1 transition-[background-color,box-shadow,color] duration-500 ease-out-expo ring-inset',
                    isOpen ? 'bg-accent-300 text-navy-950 ring-accent-300' : 'text-ink ring-line-strong group-hover:ring-white/30',
                  )}
                >
                  <span className="absolute h-[1.5px] w-3.5 rounded-full bg-current" />
                  <span
                    className={cn(
                      'absolute h-3.5 w-[1.5px] rounded-full bg-current transition-transform duration-500 ease-out-expo',
                      isOpen && 'rotate-90',
                    )}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={cn(
                'grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <p className="pr-4 pb-7 text-[1.0625rem] leading-relaxed text-body sm:pr-14">{item.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function Faq() {
  const { openBooking } = useBooking()

  return (
    <section id="faq" aria-labelledby="faq-titulo" className="border-y border-line bg-canvas-alt py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              id="faq-titulo"
              eyebrow="Perguntas frequentes"
              title={
                <>
                  Tudo o que você precisa saber <em className="text-accent-300">antes de vir</em>.
                </>
              }
              description="Reunimos as dúvidas mais comuns de quem está chegando à clínica. Se a sua não estiver aqui, fale com a nossa equipe."
            />
            <Reveal delay={160} className="mt-10 rounded-[1.5rem] bg-surface p-7 ring-1 ring-line ring-inset">
              <p className="text-lg font-semibold text-ink">Ainda tem dúvidas?</p>
              <p className="mt-1 text-[0.9375rem] text-body">Respondemos em até {clinic.responseTime}.</p>
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row lg:flex-col xl:flex-row">
                <Button arrow onClick={() => openBooking()}>
                  Agendar consulta
                </Button>
                <ButtonLink
                  variant="secondary"
                  href={clinic.phone.href}
                  leadingIcon={<Phone aria-hidden="true" className="size-4 text-accent-300" />}
                >
                  {clinic.phone.display}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={100} className="lg:col-span-7">
          <Accordion items={faqItems} />
        </Reveal>
      </Container>
    </section>
  )
}
