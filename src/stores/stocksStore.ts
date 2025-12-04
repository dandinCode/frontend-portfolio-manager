import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getStockSymbols } from '@/services/stocks'
import type { StockSymbol } from '@/types/types'

export const useStocksStore = defineStore('stocksStore', () => {
  const symbols = ref<StockSymbol[]>([])
  const loading = ref(false)

  async function loadStocks() {
    loading.value = true
    try {
      symbols.value = await getStockSymbols()
    } finally {
      loading.value = false
    }
  }

  return {
    symbols,
    loading,
    loadStocks,
  }
})
