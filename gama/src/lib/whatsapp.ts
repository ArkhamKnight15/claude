import { DEFAULT_WHATSAPP_MESSAGE, store } from '../data/store'

/** Link do WhatsApp com a mensagem já preenchida (abre o app no celular e o WhatsApp Web no computador). */
export function whatsappUrl(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  return `https://wa.me/${store.whatsapp.number}?text=${encodeURIComponent(message)}`
}

/** Atributos padrão para links externos do WhatsApp. */
export function whatsappLinkProps(message?: string) {
  return {
    href: whatsappUrl(message),
    target: '_blank',
    rel: 'noopener noreferrer',
  } as const
}
