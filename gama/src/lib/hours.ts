import type { DaySchedule } from '../types'

const MINUTES_PER_DAY = 24 * 60
const MINUTES_PER_WEEK = 7 * MINUTES_PER_DAY
const WEEKDAYS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'] as const
const WEEKDAY_NAMES = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'] as const

export interface OpenStatus {
  open: boolean
  /** Ex.: "Aberto agora · até 22h" ou "Fechado · abre amanhã às 10h". */
  label: string
  /** Versão curta para espaços pequenos. Ex.: "Aberto até 22h". */
  short: string
}

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

/** "22:00" → "22h"; "08:30" → "8h30"; "00:00" → "meia-noite". */
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number)
  if (hours === 0 && minutes === 0) return 'meia-noite'
  return `${hours}h${minutes ? String(minutes).padStart(2, '0') : ''}`
}

/** Dia da semana e minutos desde a meia-noite no fuso da loja. */
function zonedNow(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? ''
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) }
}

/** Intervalos de abertura em minutos desde domingo 0h (fechamentos após a meia-noite avançam para o dia seguinte). */
function weeklyIntervals(schedule: readonly DaySchedule[]) {
  return schedule.map((slot) => {
    const start = slot.day * MINUTES_PER_DAY + toMinutes(slot.open)
    let end = slot.day * MINUTES_PER_DAY + toMinutes(slot.close)
    if (end <= start) end += MINUTES_PER_DAY
    return { slot, start, end }
  })
}

/** Calcula se a loja está aberta agora e monta o texto do selo de horário. */
export function getOpenStatus(schedule: readonly DaySchedule[], timeZone: string, date = new Date()): OpenStatus {
  const { day, minutes } = zonedNow(date, timeZone)
  const now = day * MINUTES_PER_DAY + minutes
  const intervals = weeklyIntervals(schedule)

  const current = intervals.find(
    ({ start, end }) => (now >= start && now < end) || (now + MINUTES_PER_WEEK >= start && now + MINUTES_PER_WEEK < end),
  )
  if (current) {
    const closesAt = formatTime(current.slot.close)
    return { open: true, label: `Aberto agora · até ${closesAt}`, short: `Aberto até ${closesAt}` }
  }

  // Próxima abertura, olhando até uma semana à frente.
  const next = intervals
    .map((interval) => ({ ...interval, wait: (interval.start - now + MINUTES_PER_WEEK) % MINUTES_PER_WEEK }))
    .sort((a, b) => a.wait - b.wait)[0]
  if (!next) return { open: false, label: 'Fechado no momento', short: 'Fechado' }

  const opensAt = formatTime(next.slot.open)
  const daysAhead = (next.slot.day - day + 7) % 7
  const isToday = daysAhead === 0 && next.wait < MINUTES_PER_DAY
  const when = isToday ? 'hoje' : daysAhead <= 1 ? 'amanhã' : WEEKDAY_NAMES[next.slot.day]
  const shortWhen = isToday ? '' : daysAhead <= 1 ? 'amanhã ' : `${WEEKDAYS[next.slot.day]} `
  return { open: false, label: `Fechado · abre ${when} às ${opensAt}`, short: `Abre ${shortWhen}às ${opensAt}` }
}
