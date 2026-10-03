import { properties } from '../data/properties'
import { applyQuery, buildLocationOptions, toSearchParams } from '../lib/filters'
import type { LocationOption, Property, PropertyListResult, PropertyQuery } from '../types/property'
import { API_URL, ApiError, request, simulateLatency } from './http'

/**
 * Acesso ao catálogo. Com `VITE_API_URL` definida, as funções chamam a API real
 * (contratos abaixo); sem ela, respondem com os dados mockados e uma latência simulada.
 *
 *   GET /properties?local=&tipo=&preco-min=…&finalidade=  -> PropertyListResult
 *   GET /properties/:slug                                  -> Property
 *   GET /properties/featured                               -> Property[]
 *   GET /locations                                         -> LocationOption[]
 */

export function searchProperties(query: PropertyQuery, signal?: AbortSignal): Promise<PropertyListResult> {
  if (API_URL) {
    const params = toSearchParams(query)
    if (query.purpose) params.set('finalidade', query.purpose)
    return request<PropertyListResult>(`/properties?${params}`, { signal })
  }
  return simulateLatency(() => {
    const items = applyQuery(properties, query)
    return { items, total: items.length }
  }, signal)
}

export async function getPropertyBySlug(slug: string, signal?: AbortSignal): Promise<Property | null> {
  if (API_URL) {
    try {
      return await request<Property>(`/properties/${encodeURIComponent(slug)}`, { signal })
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) return null
      throw error
    }
  }
  return simulateLatency(() => properties.find((property) => property.slug === slug) ?? null, signal, 300)
}

export function getFeaturedProperties(signal?: AbortSignal): Promise<Property[]> {
  if (API_URL) return request<Property[]>('/properties/featured', { signal })
  return simulateLatency(() => properties.filter((property) => property.featured), signal, 250)
}

export function getPropertiesByIds(ids: string[], signal?: AbortSignal): Promise<Property[]> {
  if (API_URL) return request<Property[]>(`/properties?ids=${ids.map(encodeURIComponent).join(',')}`, { signal })
  return simulateLatency(
    () => ids.flatMap((id) => properties.find((property) => property.id === id) ?? []),
    signal,
    250,
  )
}

/** Imóveis parecidos: mesma finalidade, priorizando mesmo tipo e cidade. */
export function getSimilarProperties(property: Property, limit = 3, signal?: AbortSignal): Promise<Property[]> {
  if (API_URL)
    return request<Property[]>(`/properties/${encodeURIComponent(property.slug)}/similar?limit=${limit}`, { signal })
  return simulateLatency(
    () => {
      const score = (candidate: Property) =>
        (candidate.type === property.type ? 2 : 0) + (candidate.location.city === property.location.city ? 1 : 0)
      return properties
        .filter((candidate) => candidate.id !== property.id && candidate.purpose === property.purpose)
        .sort((a, b) => score(b) - score(a))
        .slice(0, limit)
    },
    signal,
    250,
  )
}

/** Opções de localização para os filtros (síncronas no mock para não atrasar a busca do hero). */
export const locationOptions: LocationOption[] = buildLocationOptions(properties)
