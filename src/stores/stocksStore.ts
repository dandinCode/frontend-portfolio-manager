import { defineStore } from "pinia";
import { ref } from "vue";
import { getStockSymbols } from "@/services/stocks";
import type { StockSymbol } from "@/types/types";

export const useStocksStore = defineStore("stocksStore", () => {
  const stocks = ref<StockSymbol[]>([]);
  const loading = ref(false);

  const selected = ref<string[]>([]);

  async function loadStocks() {
    loading.value = true;
    try {
      stocks.value = await getStockSymbols();
    } finally {
      loading.value = false;
    }
  }

  function toggle(symbol: string) {
    const index = selected.value.indexOf(symbol);
    if (index >= 0) selected.value.splice(index, 1);
    else selected.value.push(symbol);
  }

  return {
    stocks,
    loading,
    selected,
    loadStocks,
    toggle
  };
});
