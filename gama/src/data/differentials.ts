import { HeartHandshake, MessageCircleMore, PackageCheck, Snowflake, Sparkles, Store, Wine } from 'lucide-react'
import { HookahIcon } from '../components/icons'
import type { Differential, ServiceStep } from '../types'

/** Passo a passo do atendimento pelo WhatsApp (card principal da seção). */
export const serviceSteps: ServiceStep[] = [
  {
    title: 'Chame no WhatsApp',
    description: 'Pelo botão do site ou pelo número da loja',
    icon: MessageCircleMore,
  },
  {
    title: 'Conte o que procura',
    description: 'Ocasião, rótulo preferido ou orçamento',
    icon: Wine,
  },
  {
    title: 'Receba indicações',
    description: 'Sugestões, disponibilidade e valores na conversa',
    icon: Sparkles,
  },
  {
    title: 'Retire ou receba',
    description: 'Busque na loja ou combine a entrega',
    icon: PackageCheck,
  },
]

export const differentials: Differential[] = [
  {
    id: 'whatsapp',
    title: 'Atendimento pelo WhatsApp',
    description:
      'Você conversa direto com a equipe da loja: tira dúvidas, recebe sugestões e fecha o pedido sem sair do celular.',
    icon: MessageCircleMore,
  },
  {
    id: 'curadoria',
    title: 'Ajuda para escolher',
    description:
      'Não sabe qual vinho combina com o jantar ou que garrafa dar de presente? Diga a ocasião e indicamos o rótulo certo.',
    icon: HeartHandshake,
    detail: 'Indicação por ocasião',
  },
  {
    id: 'geladas',
    title: 'Sempre geladas',
    description: 'Cervejas e espumantes prontos para servir, para você chegar em casa e abrir na hora.',
    icon: Snowflake,
    detail: 'Direto da geladeira',
  },
  {
    id: 'tabacaria',
    title: 'Tabacaria premium',
    description: 'Uma linha selecionada de itens para narguilé, sedas, isqueiros e acessórios.',
    icon: HookahIcon,
    detail: 'Itens selecionados',
  },
  {
    id: 'loja',
    title: 'Loja na Asa Sul',
    description: 'No comércio local da 404 Sul: passe para conhecer a adega ou só para buscar seu pedido.',
    icon: Store,
    detail: 'CLS 404 · Bloco D',
  },
]
