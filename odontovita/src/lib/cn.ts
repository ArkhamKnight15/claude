import { twMerge, type ClassNameValue } from 'tailwind-merge'

/** Junta classes condicionais; em conflitos (ex.: `inline-flex` x `hidden`), a última classe vence. */
export function cn(...classes: ClassNameValue[]): string {
  return twMerge(...classes)
}
