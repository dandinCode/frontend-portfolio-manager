<template>
    <v-container class="py-6">
        <v-card class="pa-6" elevation="2">
            <v-card-title class="text-h5">Executar Modelo de Seleção</v-card-title>
            <v-divider class="my-4" />

            <v-alert type="info" variant="tonal" class="mb-6">
                Selecione as ações que deseja incluir no modelo.
            </v-alert>

            <v-progress-circular v-if="loading" indeterminate size="50" class="mx-auto" />

            <v-list v-else>
                <v-list-item v-for="stock in stocks" :key="stock.id">
                    <template #prepend>
                        <v-checkbox v-model="selected" :value="stock.symbol" />
                    </template>

                    <v-list-item-title>{{ stock.symbol }}</v-list-item-title>

                    <template #append>
                        <v-tooltip text="Status da ação">
                            <template #activator="{ props }">
                                <v-chip v-bind="props" :color="statusColor(stock.status)" size="small"
                                    class="text-white">
                                    {{ stock.status }}
                                </v-chip>
                            </template>
                        </v-tooltip>
                    </template>
                </v-list-item>
            </v-list>

            <v-divider class="my-4" />

            <v-btn color="primary" class="mt-4" :disabled="selected.length === 0" @click="runModel">
                Rodar Modelo com {{ selected.length }} ações
            </v-btn>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { getStockSymbols } from "@/services/stocks"
import type { StockSymbol } from "@/types/types"

const stocks = ref<StockSymbol[]>([])
const selected = ref<string[]>([])
const loading = ref(true)

onMounted(async () => {
    stocks.value = await getStockSymbols()
    loading.value = false
})

function runModel() {
    console.log("Executar modelo com:", selected.value)
}

function statusColor(status: string) {
    switch (status) {
        case "ACTIVE": return "green"
        case "INACTIVE": return "grey"
        case "WARNING": return "orange"
        case "ERROR": return "red"
        default: return "blue"
    }
}
</script>
