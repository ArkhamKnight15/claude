import { isWhatsAppConfigured } from '../../lib/whatsapp'

/** Aviso exibido apenas em desenvolvimento enquanto o número do WhatsApp não foi configurado. */
export function SetupNotice() {
  if (!import.meta.env.DEV || isWhatsAppConfigured) return null

  return (
    <p
      role="status"
      className="fixed bottom-4 left-4 z-30 max-w-[calc(100%-6.5rem)] rounded-full border border-brand-400/40 bg-ink-950/90 px-4 py-2 text-[0.6875rem] text-brand-200 backdrop-blur"
    >
      WhatsApp não configurado — informe o número em <code className="font-mono">src/config/site.ts</code>
    </p>
  )
}
