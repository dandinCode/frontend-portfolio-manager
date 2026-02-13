<template>
    <v-text-field v-model="search" label="Buscar ação (ex: PETR, ITUB)" prepend-inner-icon="mdi-magnify"
        variant="outlined" density="comfortable" clearable color="blue-lighten-2" class="mb-4" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStocksStore } from '@/stores/stocksStore'

const stocks = useStocksStore()

const search = computed({
    get: () => stocks.searchTerm,
    set: (value: string) => stocks.setSearch(value),
})
</script>
