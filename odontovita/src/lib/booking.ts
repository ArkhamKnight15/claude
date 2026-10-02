import type { TreatmentId } from '../types'
import { isValidPhone } from './phone'

export type BookingTreatment = TreatmentId | 'avaliacao'
export type BookingPeriod = 'manha' | 'tarde' | 'noite'

export interface BookingValues {
  name: string
  phone: string
  email: string
  treatment: BookingTreatment | ''
  period: BookingPeriod | ''
  message: string
  consent: boolean
}

export type BookingField = keyof BookingValues
export type BookingErrors = Partial<Record<BookingField, string>>

export const MESSAGE_MAX_LENGTH = 400

export const periodOptions: { value: BookingPeriod; label: string; hint: string }[] = [
  { value: 'manha', label: 'Manhã', hint: '8h–12h' },
  { value: 'tarde', label: 'Tarde', hint: '12h–17h' },
  { value: 'noite', label: 'Noite', hint: '17h–20h' },
]

export function getPeriodLabel(value: string): string {
  return periodOptions.find((option) => option.value === value)?.label ?? value
}

/** Ordem em que os campos aparecem — usada para focar o primeiro erro. */
export const bookingFieldOrder: BookingField[] = ['name', 'phone', 'email', 'treatment', 'period', 'message', 'consent']

export function createInitialValues(treatment: BookingTreatment | '' = ''): BookingValues {
  return { name: '', phone: '', email: '', treatment, period: '', message: '', consent: false }
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateField(field: BookingField, values: BookingValues): string | undefined {
  switch (field) {
    case 'name': {
      const name = values.name.trim()
      if (!name) return 'Informe seu nome.'
      if (name.length < 3) return 'O nome precisa ter pelo menos 3 letras.'
      return undefined
    }
    case 'phone':
      if (!values.phone.trim()) return 'Informe um telefone para contato.'
      if (!isValidPhone(values.phone)) return 'Informe um telefone válido com DDD.'
      return undefined
    case 'email':
      if (values.email.trim() && !EMAIL_PATTERN.test(values.email.trim())) return 'Informe um e-mail válido.'
      return undefined
    case 'treatment':
      return values.treatment ? undefined : 'Selecione o tratamento de interesse.'
    case 'period':
      return values.period ? undefined : 'Escolha o melhor período.'
    case 'message':
      return values.message.length > MESSAGE_MAX_LENGTH
        ? `Use no máximo ${MESSAGE_MAX_LENGTH} caracteres.`
        : undefined
    case 'consent':
      return values.consent ? undefined : 'É preciso autorizar o contato para continuar.'
  }
}

export function validateBooking(values: BookingValues): BookingErrors {
  const errors: BookingErrors = {}
  for (const field of bookingFieldOrder) {
    const error = validateField(field, values)
    if (error) errors[field] = error
  }
  return errors
}
