import { ChevronDown, Loader2, LockKeyhole, RotateCcw } from 'lucide-react'
import { useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { clinic } from '../../data/clinic'
import { bookingTreatmentOptions, getTreatmentLabel } from '../../data/treatments'
import {
  bookingFieldOrder,
  createInitialValues,
  getPeriodLabel,
  MESSAGE_MAX_LENGTH,
  periodOptions,
  validateBooking,
  validateField,
  type BookingErrors,
  type BookingField,
  type BookingPeriod,
  type BookingTreatment,
  type BookingValues,
} from '../../lib/booking'
import { cn } from '../../lib/cn'
import { formatPhone } from '../../lib/phone'
import { requestAppointment, type AppointmentConfirmation } from '../../services/appointments'
import { Button } from '../ui/Button'
import { controlClasses, FieldError, FormField } from './FormField'

type Status = 'idle' | 'submitting' | 'success' | 'error'

interface BookingFormProps {
  initialValues?: Partial<BookingValues>
  onValuesChange?: (values: BookingValues) => void
  onSuccess?: () => void
  /** Ação do botão exibido após o envio (ex.: fechar o modal). Sem ela, o botão reinicia o formulário. */
  onDone?: () => void
  doneLabel?: string
  className?: string
}

export function BookingForm({
  initialValues,
  onValuesChange,
  onSuccess,
  onDone,
  doneLabel = 'Concluir',
  className,
}: BookingFormProps) {
  const baseId = useId()
  const fieldId = (field: BookingField) => `${baseId}-${field}`
  const formRef = useRef<HTMLFormElement>(null)
  const successHeadingRef = useRef<HTMLHeadingElement>(null)

  const [values, setValues] = useState<BookingValues>(() => ({ ...createInitialValues(), ...initialValues }))
  const [errors, setErrors] = useState<BookingErrors>({})
  const [touched, setTouched] = useState<Partial<Record<BookingField, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [confirmation, setConfirmation] = useState<AppointmentConfirmation | null>(null)

  const isSubmitting = status === 'submitting'

  const updateField = <K extends BookingField>(field: K, value: BookingValues[K]) => {
    const next = { ...values, [field]: value }
    setValues(next)
    onValuesChange?.(next)
    if (touched[field]) setErrors((current) => ({ ...current, [field]: validateField(field, next) }))
    if (status === 'error') setStatus('idle')
  }

  const markTouched = (field: BookingField) => {
    setTouched((current) => ({ ...current, [field]: true }))
    setErrors((current) => ({ ...current, [field]: validateField(field, values) }))
  }

  const fieldProps = (field: BookingField) => ({
    id: fieldId(field),
    name: field,
    'aria-invalid': Boolean(errors[field]),
    'aria-describedby': errors[field] ? `${fieldId(field)}-error` : undefined,
    onBlur: () => markTouched(field),
  })

  const focusField = (field: BookingField) => {
    const target =
      field === 'period'
        ? formRef.current?.querySelector<HTMLInputElement>(`input[name="period"]`)
        : document.getElementById(fieldId(field))
    target?.focus()
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return

    const nextErrors = validateBooking(values)
    setErrors(nextErrors)
    setTouched(Object.fromEntries(bookingFieldOrder.map((field) => [field, true])))

    const firstInvalid = bookingFieldOrder.find((field) => nextErrors[field])
    if (firstInvalid) {
      focusField(firstInvalid)
      return
    }

    setStatus('submitting')
    try {
      const result = await requestAppointment({
        name: values.name.trim(),
        phone: values.phone,
        email: values.email.trim() || undefined,
        treatment: values.treatment as BookingTreatment,
        period: values.period as BookingPeriod,
        message: values.message.trim() || undefined,
      })
      setConfirmation(result)
      setStatus('success')
      onSuccess?.()
      requestAnimationFrame(() => successHeadingRef.current?.focus())
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    const fresh = createInitialValues()
    setValues(fresh)
    onValuesChange?.(fresh)
    setErrors({})
    setTouched({})
    setConfirmation(null)
    setStatus('idle')
  }

  if (status === 'success' && confirmation) {
    const firstName = values.name.trim().split(/\s+/)[0]
    return (
      <div className={cn('my-auto flex flex-col items-center py-4 text-center', className)} aria-live="polite">
        <svg viewBox="0 0 52 52" className="check-draw size-16 text-success-500" aria-hidden="true">
          <circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="m16 27 7 7 13-15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3 ref={successHeadingRef} tabIndex={-1} className="mt-6 font-serif text-[2rem] leading-tight focus:outline-none">
          Solicitação enviada!
        </h3>
        <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-body">
          Obrigado, {firstName}. Nossa equipe vai entrar em contato pelo número{' '}
          <strong className="font-semibold text-navy-950">{values.phone}</strong> em até {clinic.responseTime} para
          confirmar o dia e o horário da sua consulta.
        </p>
        <dl className="mt-7 w-full max-w-sm divide-y divide-line rounded-2xl bg-ivory px-5 text-left text-sm ring-1 ring-inset ring-line">
          {[
            ['Protocolo', confirmation.protocol],
            ['Tratamento', getTreatmentLabel(values.treatment)],
            ['Período', getPeriodLabel(values.period)],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4 py-3">
              <dt className="text-muted">{label}</dt>
              <dd className={cn('text-right font-semibold text-navy-950', label === 'Protocolo' && 'font-mono font-medium')}>{value}</dd>
            </div>
          ))}
        </dl>
        <Button variant={onDone ? 'primary' : 'secondary'} className="mt-7 w-full max-w-sm" onClick={onDone ?? reset}>
          {onDone ? doneLabel : 'Enviar nova solicitação'}
        </Button>
      </div>
    )
  }

  const messageLength = values.message.length

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} className={cn('grid gap-5', className)} aria-busy={isSubmitting}>
      <FormField id={fieldId('name')} label="Nome completo" error={errors.name}>
        <input
          {...fieldProps('name')}
          type="text"
          autoComplete="name"
          placeholder="Como podemos te chamar?"
          value={values.name}
          onChange={(event) => updateField('name', event.target.value)}
          className={cn(controlClasses, 'h-12')}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id={fieldId('phone')} label="Telefone / WhatsApp" error={errors.phone}>
          <input
            {...fieldProps('phone')}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="(11) 90000-0000"
            value={values.phone}
            onChange={(event) => updateField('phone', formatPhone(event.target.value))}
            className={cn(controlClasses, 'h-12')}
          />
        </FormField>
        <FormField id={fieldId('email')} label="E-mail" optional error={errors.email}>
          <input
            {...fieldProps('email')}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="voce@email.com"
            value={values.email}
            onChange={(event) => updateField('email', event.target.value)}
            className={cn(controlClasses, 'h-12')}
          />
        </FormField>
      </div>

      <FormField id={fieldId('treatment')} label="Tratamento de interesse" error={errors.treatment}>
        <div className="relative">
          <select
            {...fieldProps('treatment')}
            value={values.treatment}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              updateField('treatment', event.target.value as BookingTreatment)
            }
            className={cn(controlClasses, 'h-12 appearance-none pr-11', !values.treatment && 'text-muted')}
          >
            <option value="" disabled>
              Selecione uma opção
            </option>
            {bookingTreatmentOptions.map((option) => (
              <option key={option.value} value={option.value} className="text-navy-950">
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted" />
        </div>
      </FormField>

      <fieldset aria-describedby={errors.period ? `${fieldId('period')}-error` : undefined}>
        <legend className="mb-2 text-sm font-semibold text-navy-900">Período de preferência</legend>
        <div className="grid grid-cols-3 gap-2">
          {periodOptions.map((option) => (
            <label
              key={option.value}
              className={cn(
                'relative flex cursor-pointer flex-col items-center justify-center rounded-xl bg-white px-2 py-2.5 text-center ring-1 ring-inset transition-[box-shadow,background-color,color] duration-200',
                'hover:ring-navy-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent-500',
                'has-[:checked]:bg-navy-950 has-[:checked]:text-white has-[:checked]:ring-navy-950',
                errors.period ? 'ring-danger-600/70' : 'ring-line',
              )}
            >
              <input
                type="radio"
                name="period"
                value={option.value}
                checked={values.period === option.value}
                onChange={() => updateField('period', option.value)}
                className="sr-only"
              />
              <span className="text-sm font-semibold">{option.label}</span>
              <span className="mt-0.5 text-xs opacity-70">{option.hint}</span>
            </label>
          ))}
        </div>
        <FieldError id={`${fieldId('period')}-error`} message={errors.period} />
      </fieldset>

      <FormField
        id={fieldId('message')}
        label="Conte um pouco sobre o que você busca"
        optional
        error={errors.message}
        hint={
          <span className={cn('text-xs tabular-nums', messageLength > MESSAGE_MAX_LENGTH ? 'text-danger-600' : 'text-muted')}>
            {messageLength}/{MESSAGE_MAX_LENGTH}
          </span>
        }
      >
        <textarea
          {...fieldProps('message')}
          rows={3}
          placeholder="Ex.: gostaria de clarear os dentes antes do meu casamento."
          value={values.message}
          onChange={(event) => updateField('message', event.target.value)}
          className={cn(controlClasses, 'resize-none py-3 leading-relaxed')}
        />
      </FormField>

      <div>
        <label htmlFor={fieldId('consent')} className="flex cursor-pointer items-start gap-3 text-[0.8125rem] leading-relaxed text-body">
          <input
            {...fieldProps('consent')}
            type="checkbox"
            checked={values.consent}
            onChange={(event) => updateField('consent', event.target.checked)}
            className="mt-0.5 size-[1.125rem] shrink-0 cursor-pointer rounded accent-navy-950"
          />
          <span>
            Autorizo a {clinic.name} a entrar em contato por telefone, WhatsApp ou e-mail para agendar minha consulta,
            conforme a Lei Geral de Proteção de Dados (LGPD).
          </span>
        </label>
        <FieldError id={`${fieldId('consent')}-error`} message={errors.consent} />
      </div>

      {status === 'error' && (
        <div role="alert" className="flex gap-3 rounded-xl bg-[#fff4ed] p-4 text-sm text-[#9a3412] ring-1 ring-inset ring-[#fed7aa]">
          <RotateCcw aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <p>
            <strong className="font-semibold">Não foi possível enviar sua solicitação.</strong> Verifique sua conexão e
            tente novamente, ou ligue para{' '}
            <a href={clinic.phone.href} className="font-semibold underline underline-offset-2">
              {clinic.phone.display}
            </a>
            .
          </p>
        </div>
      )}

      <div className="pt-1">
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
          arrow={!isSubmitting}
          leadingIcon={isSubmitting ? <Loader2 aria-hidden="true" className="size-4 animate-spin" /> : undefined}
        >
          {isSubmitting ? 'Enviando solicitação…' : status === 'error' ? 'Tentar novamente' : 'Solicitar agendamento'}
        </Button>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted">
          <LockKeyhole aria-hidden="true" className="size-3.5" />
          Seus dados são confidenciais e usados apenas para o agendamento.
        </p>
      </div>
      <p className="sr-only" aria-live="polite">
        {isSubmitting ? 'Enviando sua solicitação.' : ''}
      </p>
    </form>
  )
}
