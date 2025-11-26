export interface Stock {
  symbol: string;
  id: number;
  status: string;
  createdAt: Date;
  createdById: number;
}

export interface StockSymbol {
  id: number
  symbol: string
  status: string
}