import type { BookingPeriod, BookingTreatment } from '../lib/booking'

export interface AppointmentRequest {
  name: string
  phone: string
  email?: string
  treatment: BookingTreatment
  period: BookingPeriod
  message?: string
}

export interface AppointmentConfirmation {
  protocol: string
  createdAt: string
}

const API_URL = import.meta.env.VITE_APPOINTMENTS_API_URL
const MOCK_LATENCY_MS = 1400

/**
 * Envia a solicitação de agendamento.
 * Com `VITE_APPOINTMENTS_API_URL` definido, faz um POST real para a API;
 * caso contrário, usa uma resposta simulada com a mesma interface.
 */
export async function requestAppointment(request: AppointmentRequest): Promise<AppointmentConfirmation> {
  if (API_URL) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })
    if (!response.ok) {
      throw new Error(`Falha ao enviar solicitação (${response.status})`)
    }
    return (await response.json()) as AppointmentConfirmation
  }

  return mockRequestAppointment()
}

async function mockRequestAppointment(): Promise<AppointmentConfirmation> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS))
  const now = new Date()
  const datePart = `${String(now.getDate()).padStart(2, '0')}${String(now.getMonth() + 1).padStart(2, '0')}`
  const randomPart = Math.floor(1000 + Math.random() * 9000)
  return { protocol: `OV-${datePart}-${randomPart}`, createdAt: now.toISOString() }
}
