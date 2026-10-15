import { site } from '../config/site'

/** Mantém apenas dígitos, para tolerar números digitados com espaços, parênteses ou traços. */
const digits = (value: string) => value.replace(/\D/g, '')

/** `true` quando o número do WhatsApp já foi configurado em `src/config/site.ts`. */
export const isWhatsAppConfigured = digits(site.whatsapp.number).length >= 10

/**
 * Link de conversa no WhatsApp com mensagem pronta.
 * Sem número configurado, o WhatsApp abre a mensagem pronta para o visitante escolher o contato.
 */
export function whatsappUrl(message: string): string {
  const number = isWhatsAppConfigured ? digits(site.whatsapp.number) : ''
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
