import { createContext, useContext } from 'react'
import type { BookingTreatment } from '../../lib/booking'

export interface BookingContextValue {
  /** Abre o modal de agendamento, opcionalmente com um tratamento pré-selecionado. */
  openBooking: (treatment?: BookingTreatment) => void
}

export const BookingContext = createContext<BookingContextValue | null>(null)

export function useBooking(): BookingContextValue {
  const context = useContext(BookingContext)
  if (!context) throw new Error('useBooking deve ser usado dentro de <BookingProvider>.')
  return context
}
