import type { SavePortfolioPayload } from '../types/types'
import { api } from './http/api'

export async function savePortfolio(payload: SavePortfolioPayload) {
  const { data } = await api.post('/portfolio', payload)
  return data
}
