import { isValidPhone } from './phone'

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export type Validator<T> = (value: T) => string | undefined

export const validators = {
  name: (value: string) => {
    const name = value.trim()
    if (!name) return 'Informe seu nome.'
    if (name.length < 3) return 'O nome precisa ter pelo menos 3 letras.'
    return undefined
  },
  email: (value: string) => {
    if (!value.trim()) return 'Informe seu e-mail.'
    return EMAIL_PATTERN.test(value.trim()) ? undefined : 'Informe um e-mail válido.'
  },
  phone: (value: string) => {
    if (!value.trim()) return 'Informe um telefone para contato.'
    return isValidPhone(value) ? undefined : 'Informe um telefone válido com DDD.'
  },
  required: (message: string) => (value: string) => (value.trim() ? undefined : message),
  maxLength: (max: number) => (value: string) => (value.length > max ? `Use no máximo ${max} caracteres.` : undefined),
} as const

export type FieldErrors<T> = Partial<Record<keyof T, string>>

/** Valida um objeto com um mapa de validadores e devolve apenas os erros encontrados. */
export function validate<T extends object>(
  values: T,
  rules: Partial<{ [K in keyof T]: Validator<T[K]> }>,
): FieldErrors<T> {
  const errors: FieldErrors<T> = {}
  for (const key of Object.keys(rules) as (keyof T)[]) {
    const error = rules[key]?.(values[key])
    if (error) errors[key] = error
  }
  return errors
}
