import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAnalysisStore = defineStore('analysisStore', () => {
  const selectedSymbols = ref<string[]>([])
  const start = ref<string>('')
  const end = ref<string>('')

  function toggleSymbol(symbol: string) {
    const i = selectedSymbols.value.indexOf(symbol)
    if (i >= 0) selectedSymbols.value.splice(i, 1)
    else selectedSymbols.value.push(symbol)
  }

  return {
    selectedSymbols,
    start,
    end,
    toggleSymbol,
  }
})
