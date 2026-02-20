import type { SavePortfolioPayload } from '../types/types'
import { analysisApi } from './http/analysisApi'

export async function savePortfolio(payload: SavePortfolioPayload) {
  const { data } = await analysisApi.post('/portfolios', payload)
  return data
}
