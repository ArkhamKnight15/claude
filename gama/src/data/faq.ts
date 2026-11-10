import type { FaqItem } from '../types'
import { store } from './store'

export const faqItems: FaqItem[] = [
  {
    id: 'como-pedir',
    question: 'Como faço um pedido?',
    answer: `Pelo WhatsApp ${store.whatsapp.display}. Conte o que você procura e a equipe confirma a disponibilidade, os valores e a forma de pagamento na própria conversa. Se preferir, passe na loja.`,
  },
  {
    id: 'entrega',
    question: 'Vocês fazem entrega?',
    answer:
      'Consulte pelo WhatsApp a disponibilidade de entrega para o seu endereço e o prazo do dia. Se preferir, separamos o pedido para você retirar na loja.',
  },
  {
    id: 'endereco',
    question: 'Onde fica a loja?',
    answer: `Na ${store.address.street}, ${store.address.district}, ${store.address.city} – ${store.address.state}, no comércio local da 404 Sul.`,
  },
  {
    id: 'indicacao',
    question: 'Vocês ajudam a escolher um vinho ou um presente?',
    answer:
      'Sim. Conte a ocasião (jantar, presente, comemoração), o estilo que você prefere e quanto quer investir. A equipe indica os rótulos que combinam melhor.',
  },
  {
    id: 'festas',
    question: 'Atendem pedidos para festas e eventos?',
    answer:
      'Sim. Mande pelo WhatsApp a data, o número de convidados e o que pretende servir. A equipe ajuda a definir as quantidades e envia o orçamento.',
  },
  {
    id: 'geladas',
    question: 'As bebidas são vendidas geladas?',
    answer:
      'Cervejas e espumantes ficam na geladeira, prontos para servir. Se precisar de uma quantidade maior gelada, avise com antecedência pelo WhatsApp.',
  },
  {
    id: 'maioridade',
    question: 'Preciso ter mais de 18 anos para comprar?',
    answer:
      'Sim. A venda de bebidas alcoólicas e de produtos de tabacaria é proibida para menores de 18 anos (Estatuto da Criança e do Adolescente, art. 243). Podemos pedir um documento com foto na retirada ou na entrega.',
  },
]
