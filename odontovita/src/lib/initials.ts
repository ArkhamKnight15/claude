/** Iniciais do primeiro e último nome, ignorando títulos como Dr./Dra. */
export function getInitials(name: string): string {
  const parts = name
    .replace(/^(Dra?\.)\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
  return `${first}${last}`.toUpperCase()
}
