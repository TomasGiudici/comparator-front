import { apiGet } from './api'
import type { SupermarketResponse } from '../types/supermarket.types'

export function getSupermarkets(signal?: AbortSignal) {
  return apiGet<SupermarketResponse[]>('/supermarkets', signal)
}
