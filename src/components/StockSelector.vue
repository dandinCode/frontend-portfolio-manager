<template>
    <div>
        <!-- Header com contagem, filtros e ações -->
        <div class="selector-header">
            <div class="header-left"></div>
            <div class="header-right">
                <!-- Botão Selecionar todas -->
                <v-btn size="small" variant="text" class="action-chip" @click="selectAll"
                    :disabled="stocks.filteredSymbols.length === 0">
                    <v-icon size="16">mdi-check-all</v-icon>
                    Selecionar todas
                </v-btn>

                <!-- Botão Limpar seleção -->
                <v-btn size="small" variant="text" class="action-chip" @click="analysis.clearSelection"
                    :disabled="analysis.selectedSymbols.length === 0">
                    <v-icon size="16">mdi-close-circle</v-icon>
                    Limpar seleção
                </v-btn>

                <!-- Botão Setor -->
                <v-btn size="small" variant="text" class="filter-chip" @click="showFilters = !showFilters">
                    <v-icon size="16">mdi-filter</v-icon>
                    Setor
                    <v-icon size="14">{{ showFilters ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>

                <!-- Botão Status -->
                <v-btn size="small" variant="text" class="filter-chip" @click="showStatusFilter = !showStatusFilter">
                    <v-icon size="16">mdi-filter</v-icon>
                    Status
                    <v-icon size="14">{{ showStatusFilter ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>

                <!-- Botão Ocultar/Mostrar -->
                <v-btn size="small" variant="text" class="action-chip" @click="hidden = !hidden">
                    <v-icon size="16">{{ hidden ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
                    {{ hidden ? 'Mostrar ações' : 'Ocultar ações' }}
                </v-btn>
            </div>
        </div>

        <!-- Filtros expandidos -->
        <div v-if="showFilters" class="filters-panel">
            <div class="filters-header">
                <span>Filtrar por setor</span>
                <v-btn size="x-small" variant="text" color="#B99D75" @click="clearSectorFilter">Limpar</v-btn>
            </div>
            <div class="filters-list">
                <v-chip v-for="sector in availableSectors" :key="sector" size="small" variant="tonal"
                    :color="selectedSectors.includes(sector) ? '#B99D75' : 'grey'" class="filter-chip-item"
                    @click="toggleSectorFilter(sector)">
                    {{ sector }}
                </v-chip>
            </div>
        </div>

        <div v-if="showStatusFilter" class="filters-panel">
            <div class="filters-header">
                <span>Filtrar por status</span>
                <v-btn size="x-small" variant="text" color="#B99D75" @click="clearStatusFilter">Limpar</v-btn>
            </div>
            <div class="filters-list">
                <v-chip v-for="status in ['validated', 'pending', 'invalid']" :key="status" size="small" variant="tonal"
                    :color="selectedStatuses.includes(status) ?
                        (status === 'validated' ? '#22c55e' : status === 'pending' ? '#f59e0b' : '#ef4444') : 'grey'"
                    class="filter-chip-item" @click="toggleStatusFilter(status)">
                    {{ status }}
                </v-chip>
            </div>
        </div>

        <!-- Campo de busca -->
        <stock-search />

        <!-- Lista de ações -->
        <v-expand-transition>
            <div v-show="!hidden">
                <div class="d-flex justify-center my-10" v-if="stocks.loading">
                    <v-progress-circular indeterminate size="60" color="#B99D75" />
                </div>

                <div v-else class="stocks-grid">
                    <div v-for="stock in filteredStocksByFilters" :key="stock.id" class="stock-card"
                        :class="{ 'stock-selected': analysis.selectedSymbols.includes(stock.symbol) }"
                        @click="analysis.toggleSymbol(stock.symbol)">
                        <div class="stock-info">
                            <div class="stock-symbol">{{ stock.symbol }}</div>
                            <div class="stock-company">{{ stock.company || '—' }}</div>
                        </div>
                        <div class="stock-meta">
                            <v-chip size="x-small" :color="getSectorColor(stock.sector)" variant="tonal"
                                class="sector-chip">
                                {{ stock.sector || 'Setor não definido' }}
                            </v-chip>
                            <v-chip size="x-small" :color="getStatusColor(stock.status)" variant="tonal"
                                class="status-chip">
                                {{ stock.status }}
                            </v-chip>
                        </div>
                        <div class="stock-check">
                            <v-icon
                                :color="analysis.selectedSymbols.includes(stock.symbol) ? '#B99D75' : 'rgba(255,252,239,0.2)'"
                                size="20">
                                {{ analysis.selectedSymbols.includes(stock.symbol) ? 'mdi-check-circle' :
                                'mdi-circle-outline' }}
                            </v-icon>
                        </div>
                    </div>

                    <div v-if="filteredStocksByFilters.length === 0 && !stocks.loading" class="empty-state">
                        <v-icon size="48" color="rgba(255,252,239,0.3)">mdi-database-search</v-icon>
                        <p>Nenhuma ação encontrada</p>
                    </div>
                </div>
            </div>
        </v-expand-transition>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useStocksStore } from "@/stores/stocksStore";
import { useAnalysisStore } from "@/stores/analysisStore";
import StockSearch from "./StockSearch.vue";

const stocks = useStocksStore();
const analysis = useAnalysisStore();
const hidden = ref(false);
const showFilters = ref(false);
const showStatusFilter = ref(false);
const showAllStocks = ref(false);

// Filtros
const selectedSectors = ref<string[]>([]);
const selectedStatuses = ref<string[]>([]);

onMounted(() => {
    if (stocks.symbols.length === 0) {
        stocks.loadStocks();
    }
});

// Setores disponíveis
const availableSectors = computed(() => {
    const sectors = new Set<string>();
    stocks.filteredSymbols.forEach(stock => {
        if (stock.sector) sectors.add(stock.sector);
    });
    return Array.from(sectors).sort();
});

// Ações filtradas por setor e status
const filteredStocksByFilters = computed(() => {
    let filtered = stocks.filteredSymbols;

    if (selectedSectors.value.length > 0) {
        filtered = filtered.filter(stock =>
            stock.sector && selectedSectors.value.includes(stock.sector)
        );
    }

    if (selectedStatuses.value.length > 0) {
        filtered = filtered.filter(stock =>
            selectedStatuses.value.includes(stock.status)
        );
    }

    return filtered;
});

// Funções de filtro
function toggleSectorFilter(sector: string) {
    const index = selectedSectors.value.indexOf(sector);
    if (index >= 0) {
        selectedSectors.value.splice(index, 1);
    } else {
        selectedSectors.value.push(sector);
    }
    showAllStocks.value = false;
}

function clearSectorFilter() {
    selectedSectors.value = [];
}

function toggleStatusFilter(status: string) {
    const index = selectedStatuses.value.indexOf(status);
    if (index >= 0) {
        selectedStatuses.value.splice(index, 1);
    } else {
        selectedStatuses.value.push(status);
    }
    showAllStocks.value = false;
}

function clearStatusFilter() {
    selectedStatuses.value = [];
}

function selectAll() {
    const symbols = filteredStocksByFilters.value.map(s => s.symbol);
    analysis.selectAll(symbols);
}

// Funções de cor
function getSectorColor(sector: string | undefined): string {
    if (!sector) return 'grey';
    const colors: Record<string, string> = {
        'Financeiro': '#B99D75',
        'Energia': '#f59e0b',
        'Tecnologia': '#3b82f6',
        'Saúde': '#22c55e',
        'Consumo': '#ef4444',
        'Industrial': '#8b5cf6',
        'Utilitades': '#06b6d4',
        'Materiais Básicos': '#ec4899'
    };
    return colors[sector] || '#6b7280';
}

function getStatusColor(status: string): string {
    switch (status) {
        case 'validated': return '#22c55e';
        case 'pending': return '#f59e0b';
        case 'invalid': return '#ef4444';
        default: return '#6b7280';
    }
}
</script>

<style scoped>
.selector-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 16px 0;
    flex-wrap: wrap;
    gap: 12px;
}

.header-right {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
}

/* Estilo padrão para todos os botões */
.filter-chip,
.action-chip {
    color: rgba(255, 252, 239, 0.7) !important;
    font-size: 13px;
    text-transform: none;
    border-radius: 20px !important;
    background: rgba(185, 157, 117, 0.1) !important;
    padding: 4px 12px !important;
    min-width: auto !important;
}

.filter-chip:hover,
.action-chip:hover {
    background: rgba(185, 157, 117, 0.2) !important;
    color: #FFFCEF !important;
}

.filter-chip:disabled,
.action-chip:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.filters-panel {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 20px;
    border: 1px solid rgba(185, 157, 117, 0.1);
}

.filters-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    color: rgba(255, 252, 239, 0.6);
    font-size: 12px;
}

.filters-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.filter-chip-item {
    cursor: pointer;
}

.stocks-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 12px;
    margin-top: 16px;
}

.stock-card {
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(185, 157, 117, 0.15);
    border-radius: 16px;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: all 0.2s ease;
}

.stock-card:hover {
    background: rgba(185, 157, 117, 0.08);
    border-color: rgba(185, 157, 117, 0.3);
    transform: translateY(-2px);
}

.stock-selected {
    background: rgba(185, 157, 117, 0.12);
    border-color: #B99D75;
}

.stock-info {
    flex: 1;
}

.stock-symbol {
    font-weight: 700;
    color: #FFFCEF;
    font-size: 16px;
}

.stock-company {
    font-size: 11px;
    color: rgba(255, 252, 239, 0.5);
    margin-top: 2px;
}

.stock-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;
    margin-right: 12px;
}

.sector-chip {
    background: rgba(185, 157, 117, 0.15) !important;
    color: #B99D75 !important;
    font-size: 10px;
}

.status-chip {
    font-size: 10px;
}

.stock-check {
    flex-shrink: 0;
}

.empty-state {
    text-align: center;
    padding: 48px;
    color: rgba(255, 252, 239, 0.3);
}

.show-more {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

@media (max-width: 600px) {
    .selector-header {
        flex-direction: column;
        align-items: flex-start;
    }

    .header-right {
        width: 100%;
        justify-content: flex-start;
    }

    .stocks-grid {
        grid-template-columns: 1fr;
    }
}
</style>