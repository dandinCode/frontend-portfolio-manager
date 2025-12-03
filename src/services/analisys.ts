import api from './api'
import type { PortfolioAnalysis } from '../types/types'

export async function analyzeStocks(portfolioAnalysis: PortfolioAnalysis) {
  try {
    const res = await api.post('/analysis/analyze', portfolioAnalysis)
    return res.data
  } catch (error) {
    console.error('Erro ao analisar ações:', error)
    throw error
  }
}
