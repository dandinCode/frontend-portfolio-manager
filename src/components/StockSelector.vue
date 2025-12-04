<template>
    <div>
        <v-row>
            <v-col class="d-flex justify-end">
                <v-btn variant="outlined" color="grey-lighten-2" @click="hidden = !hidden">
                    {{ hidden ? 'Mostrar ações' : 'Ocultar ações' }}
                </v-btn>
            </v-col>
        </v-row>
        <v-expand-transition>
            <div v-show="!hidden">
                <div class="d-flex justify-center my-10" v-if="stocks.loading">
                    <v-progress-circular indeterminate size="60" color="blue-lighten-2" />
                </div>
                <v-row v-else dense>
                    <v-col v-for="stock in stocks.symbols" :key="stock.id" cols="6" sm="4" md="3" lg="2">
                        <v-hover v-slot="{ isHovering, props }">
                            <v-card v-bind="props"
                                class="pa-4 d-flex align-center justify-center text-center selectable-card" :class="{
                                    'hover-card': isHovering,
                                    'selected-card': analysis.selectedSymbols.includes(stock.symbol)
                                }" height="80" @click="analysis.toggleSymbol(stock.symbol)">
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
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStocksStore } from "@/stores/stocksStore";
import { useAnalysisStore } from "@/stores/analysisStore";

const stocks = useStocksStore();
const analysis = useAnalysisStore();
const hidden = ref(false);

onMounted(() => {
    if (stocks.symbols.length === 0) {
        stocks.loadStocks();
    }
});
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
