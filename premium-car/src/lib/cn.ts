import { twMerge, type ClassNameValue } from 'tailwind-merge'

/** Junta classes condicionais; em conflitos, a última classe vence. */
export function cn(...classes: ClassNameValue[]): string {
  return twMerge(...classes)
}
