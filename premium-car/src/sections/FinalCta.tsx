import { ArrowUpRight } from 'lucide-react'
import { whatsappMessages } from '../config/messages'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Picture } from '../components/ui/Picture'
import { Reveal } from '../components/ui/Reveal'
import { media } from '../data/media'
import { whatsappUrl } from '../lib/whatsapp'

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-ink-950 py-28 sm:py-36 lg:py-44">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Picture photo={media.cta} frameClassName="size-full" />
        <div className="absolute inset-0 bg-ink-950/75" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_50%,transparent,var(--color-ink-950))]" />
      </div>

      <Container className="flex flex-col items-center text-center">
        <Reveal as="header" className="flex flex-col items-center">
          <p className="eyebrow">Fale conosco</p>
          <h2 id="cta-title" className="display mt-6 max-w-5xl text-[clamp(1.875rem,1rem+3.8vw,4.25rem)]">
            Pronto para transformar a <span className="text-metal">aparência do seu carro?</span>
          </h2>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-silver-300 sm:text-lg">
            Entre em contato com a Premium Car e descubra o cuidado ideal para o seu veículo.
          </p>
        </Reveal>

        <Reveal delay={160} className="mt-11 flex flex-col items-center gap-5">
          <Button
            href={whatsappUrl(whatsappMessages.specialist)}
            external
            size="lg"
            icon={<ArrowUpRight className="size-4" />}
          >
            Fale com um especialista
          </Button>
          <p className="text-xs tracking-wide text-silver-400">
            Abre uma conversa no WhatsApp com a mensagem pronta.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
