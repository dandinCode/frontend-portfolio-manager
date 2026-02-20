import type { PortfolioAnalysis } from '../types/types'
import { analysisApi } from './http/analysisApi'

export async function analyzeStocks(portfolioAnalysis: PortfolioAnalysis) {
  try {
    const res = await analysisApi.post('/analysis/analyze', portfolioAnalysis)
    return res.data
  } catch (error) {
    console.error('Erro ao analisar ações:', error)
    throw error
  }
}
