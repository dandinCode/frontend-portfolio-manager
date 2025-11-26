<template>
    <v-container class="py-6">
        <v-sheet color="#1e1e1e" rounded elevation="4" class="pa-6">

            <v-row class="mb-4">
                <v-col cols="12">
                    <h2 class="text-h5 mb-2 text-white">Executar Modelo de Seleção</h2>

                    <v-alert type="info" variant="tonal" class="mb-6" color="blue-darken-2">
                        Ao passar o mouse por cima das ações você poderá ver o status dela.
                        <br />
                        <strong>validated</strong> = ação verificada ✔
                        <strong>pending</strong> = ação ainda não verificada
                        <strong>invalid</strong> = ação possivelmente inexistente / não encontrada
                        <br><br>
                        Qualquer pessoa pode cadastrar symbols. Cabe a você decidir se quer rodar o modelo com eles.
                        Caso algum símbolo não exista, o modelo apenas **ignora** e segue com os outros.
                    </v-alert>
                </v-col>
            </v-row>

            <v-row>
                <v-col class="d-flex justify-end">
                    <v-btn variant="outlined" color="grey-lighten-2" @click="hidden = !hidden">
                        {{ hidden ? 'Mostrar ações' : 'Ocultar ações' }}
                    </v-btn>
                </v-col>
            </v-row>

            <v-expand-transition>
                <div v-show="!hidden">
                    <div class="d-flex justify-center my-10" v-if="loading">
                        <v-progress-circular indeterminate size="60" color="blue-lighten-2" />
                    </div>

                    <v-row v-else dense>
                        <v-col v-for="stock in stocks" :key="stock.id" cols="6" sm="4" md="3" lg="2">
                            <v-hover v-slot="{ isHovering, props }">
                                <v-card v-bind="props"
                                    class="pa-4 d-flex align-center justify-center text-center selectable-card" :class="{
                                        'selected-card': selected.includes(stock.symbol),
                                        'hover-card': isHovering
                                    }" height="80" @click="toggle(stock.symbol)">
                                    <v-tooltip :text="'Status: ' + stock.status">
                                        <template #activator="{ props: tooltipProps }">
                                            <span v-bind="tooltipProps" class="text-white text-h6">
                                                {{ stock.symbol }}
                                            </span>
                                        </template>
                                    </v-tooltip>
                                </v-card>
                            </v-hover>
                        </v-col>
                    </v-row>
                </div>
            </v-expand-transition>

            <v-divider class="my-6" />

            <v-btn color="blue-accent-3" size="large" block :disabled="selected.length === 0" @click="runModel">
                Rodar Modelo com {{ selected.length }} ações
            </v-btn>
        </v-sheet>
    </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { getStockSymbols } from "@/services/stocks"
import type { StockSymbol } from "@/types/types"

const stocks = ref<StockSymbol[]>([])
const selected = ref<string[]>([])
const loading = ref(true)
const hidden = ref(false)

onMounted(async () => {
    stocks.value = await getStockSymbols()
    loading.value = false
})

function toggle(symbol: string) {
    const idx = selected.value.indexOf(symbol)
    if (idx >= 0) selected.value.splice(idx, 1)
    else selected.value.push(symbol)
}

function runModel() {
    console.log("Executar modelo com:", selected.value)
}
</script>

<style scoped>
.selectable-card {
    background: #2a2a2a;
    border: 1px solid #444;
    cursor: pointer;
    transition: 0.2s;
    user-select: none;
}

.hover-card {
    background: #3a3a3a !important;
}

.selected-card {
    background: #0059ff !important;
    border-color: #2f86ff !important;
    color: white !important;
    transform: scale(1.05);
}
</style>
