import type { FaqItem } from '../types'
import { clinic } from './clinic'

export const faqItems: FaqItem[] = [
  {
    id: 'primeira-consulta',
    question: 'Como funciona a primeira consulta?',
    answer:
      'A primeira consulta dura cerca de 60 minutos. Conversamos sobre seu histórico e seus objetivos, fazemos o exame clínico completo, o escaneamento intraoral 3D e as fotografias. Ao final, você recebe um diagnóstico claro e um plano de tratamento detalhado, com etapas, prazos e investimento.',
  },
  {
    id: 'convenio',
    question: 'Vocês trabalham com convênio?',
    answer:
      'Somos uma clínica particular, o que nos permite dedicar mais tempo e tecnologia a cada paciente. Fornecemos toda a documentação necessária para você solicitar reembolso ao seu plano odontológico, quando previsto no seu contrato.',
  },
  {
    id: 'valor-avaliacao',
    question: 'Quanto custa uma avaliação?',
    answer:
      'A avaliação inicial completa, com escaneamento 3D e plano de tratamento, custa R$ 250. Se você iniciar o tratamento conosco, o valor é integralmente abatido do orçamento.',
  },
  {
    id: 'implantes',
    question: 'Vocês fazem implantes?',
    answer:
      'Sim. A implantodontia é uma das nossas principais especialidades. Usamos tomografia computadorizada e cirurgia guiada por computador, o que torna o procedimento mais preciso, rápido e confortável. Em casos indicados, é possível sair com dentes provisórios no mesmo dia.',
  },
  {
    id: 'agendamento',
    question: 'Como agendar uma consulta?',
    answer: `Pelo formulário deste site, pelo telefone ${clinic.phone.display} ou pelo WhatsApp ${clinic.whatsapp.display}. Nossa equipe retorna em até ${clinic.responseTime} para confirmar o melhor dia e horário para você.`,
  },
  {
    id: 'dor',
    question: 'Os tratamentos causam dor?',
    answer:
      'O conforto é prioridade em todas as etapas. Trabalhamos com anestesia computadorizada, técnicas minimamente invasivas e, quando indicado, sedação consciente acompanhada por especialista.',
  },
  {
    id: 'pagamento',
    question: 'Quais formas de pagamento são aceitas?',
    answer:
      'Aceitamos Pix, cartões de débito e crédito em até 12 vezes, além de condições especiais para planos de tratamento completos.',
  },
]
