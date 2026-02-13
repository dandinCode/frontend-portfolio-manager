import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getStockSymbols } from '@/services/stocks'
import type { StockSymbol } from '@/types/types'

export const useStocksStore = defineStore('stocksStore', () => {
  const symbols = ref<StockSymbol[]>([])
  const loading = ref(false)
  const searchTerm = ref('')

  async function loadStocks() {
    loading.value = true
    try {
      symbols.value = await getStockSymbols()
    } finally {
      loading.value = false
    }
  }

  function setSearch(term: string) {
    searchTerm.value = term
  }

  const filteredSymbols = computed(() => {
    if (!searchTerm.value) return symbols.value

    const term = searchTerm.value.toLowerCase()

    return symbols.value.filter((stock) => stock.symbol.toLowerCase().includes(term))
  })

  return {
    symbols,
    filteredSymbols,
    loading,
    searchTerm,
    setSearch,
    loadStocks,
  }
})
