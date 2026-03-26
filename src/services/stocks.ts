import type { AxiosResponse } from 'axios';
import { api } from './http/api';
import type { Stock, StocksSummary, StockSymbol } from '../types/types';

export async function createStock(symbol: string) {
  try {
    const res: AxiosResponse<Stock> = await api.post('/stocks/symbol', {
      symbol,
    });
    return res.data;
  } catch (error) {
    console.error('Falha ao registrar nova ação: ', error);
    throw error;
  }
}

export async function getStockSymbols(): Promise<StockSymbol[]> {
  try {
    const res = await api.get<StockSymbol[]>('/stocks/symbols');
    return res.data;
  } catch (error) {
    console.error('Erro ao buscar stock symbols:', error);
    return [];
  }
}

export async function getStocksSummary(): Promise<StocksSummary | null> {
  try {
    const res = await api.get<StocksSummary>('/stocks/summary')
    return res.data
  } catch (error) {
    console.error('Erro ao buscar summary:', error)
    return null
  }
}
