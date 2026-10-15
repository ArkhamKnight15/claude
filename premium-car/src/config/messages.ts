/** Mensagens iniciais enviadas ao WhatsApp em cada ponto de contato do site. */
export const whatsappMessages = {
  schedule: 'Olá, Premium Car! Gostaria de agendar um serviço de estética automotiva.',
  quote: 'Olá, Premium Car! Gostaria de solicitar um orçamento para o meu veículo.',
  specialist:
    'Olá, Premium Car! Gostaria de falar com um especialista para saber qual serviço é mais indicado para o meu veículo.',
  service: (service: string) =>
    `Olá, Premium Car! Gostaria de mais informações sobre o serviço de ${service.toLowerCase()} para o meu veículo.`,
} as const
