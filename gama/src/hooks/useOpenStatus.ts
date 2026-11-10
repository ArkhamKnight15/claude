import { useEffect, useState } from 'react'
import { store } from '../data/store'
import { getOpenStatus, type OpenStatus } from '../lib/hours'

const REFRESH_MS = 60_000

/** Status "aberto/fechado" da loja no horário de Brasília, atualizado a cada minuto. */
export function useOpenStatus(): OpenStatus {
  const [status, setStatus] = useState(() => getOpenStatus(store.schedule, store.timeZone))

  useEffect(() => {
    const timer = window.setInterval(() => setStatus(getOpenStatus(store.schedule, store.timeZone)), REFRESH_MS)
    return () => window.clearInterval(timer)
  }, [])

  return status
}
