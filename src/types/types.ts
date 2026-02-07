export interface Stock {
  symbol: string
  id: number
  status: string
  createdAt: Date
  createdById: number
}

export interface StockSymbol {
  id: number
  symbol: string
  status: string
}

export interface PortfolioAnalysis {
  stocks: string[]
  start: string
  end: string
  acceptableRisk?: number
}

export interface AuthResponse {
  access_token: string
}
