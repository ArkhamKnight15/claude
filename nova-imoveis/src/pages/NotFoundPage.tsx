import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { usePageMeta } from '../hooks/usePageMeta'

interface NotFoundPageProps {
  title?: string
  description?: string
}

export function NotFoundPage({
  title = 'Este endereço não existe. Ainda.',
  description = 'A página que você procurou pode ter mudado de lugar. Que tal explorar os imóveis selecionados pela NOVA?',
}: NotFoundPageProps) {
  usePageMeta({ title: 'Página não encontrada', description })
  return (
    <Container className="flex min-h-[80svh] flex-col justify-center pb-24 pt-36">
      <p aria-hidden="true" className="font-display text-[clamp(7rem,22vw,16rem)] font-[300] leading-none text-sand">
        404
      </p>
      <h1 className="font-display -mt-4 max-w-2xl text-display-lg sm:-mt-8">{title}</h1>
      <p className="mt-6 max-w-lg text-lg leading-relaxed text-graphite-500">{description}</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink to="/imoveis" variant="solid" size="lg" arrow>
          Ver imóveis
        </ButtonLink>
        <ButtonLink to="/" variant="outline" size="lg">
          Voltar ao início
        </ButtonLink>
      </div>
    </Container>
  )
}
