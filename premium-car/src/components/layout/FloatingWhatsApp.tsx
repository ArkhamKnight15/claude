import { MessageCircle } from 'lucide-react'
import { whatsappMessages } from '../../config/messages'
import { whatsappUrl } from '../../lib/whatsapp'

/** Atalho fixo para o WhatsApp, presente em todas as seções. */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl(whatsappMessages.quote)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar com a Premium Car pelo WhatsApp"
      className="group fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex items-center sm:right-6 sm:bottom-6"
    >
      <span className="pointer-events-none mr-3 hidden translate-x-2 rounded-full border border-white/10 bg-ink-900/90 px-4 py-2 text-xs font-medium text-snow opacity-0 shadow-card backdrop-blur transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 md:block">
        Fale conosco no WhatsApp
      </span>
      <span className="relative grid size-14 place-items-center rounded-full bg-brand-400 text-ink-950 shadow-accent transition-[transform,background-color] duration-300 group-hover:scale-105 group-hover:bg-brand-300 group-active:scale-95">
        <span aria-hidden="true" className="absolute inset-0 animate-ping-soft rounded-full bg-brand-400" />
        <MessageCircle className="relative size-6" strokeWidth={1.8} />
      </span>
    </a>
  )
}
