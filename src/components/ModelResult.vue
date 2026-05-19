<template>
    <v-sheet class="result-sheet" rounded="xl" elevation="0">
        <div class="result-header">
            <div class="header-icon">
                <v-icon size="28" color="#B99D75">mdi-chart-arc</v-icon>
            </div>
            <div >
                <h2 class="result-title">Resultado da Otimização</h2>
                <p class="result-subtitle">Carteira sugerida com base no modelo de programação linear</p>
            </div>
        </div>

        <v-btn class="save-btn mb-6" size="large" @click="openSaveModal = true">
            <template #prepend>
                <v-icon>mdi-content-save</v-icon>
            </template>
            Salvar Portfólio
        </v-btn>

        <v-row class="metrics-row mb-6">
            <v-col cols="12" md="4">
                <v-card class="metric-card metric-card--yield">
                    <div class="metric-icon">
                        <v-icon color="#22c55e" size="24">mdi-cash-multiple</v-icon>
                    </div>
                    <div class="metric-body">
                        <p class="label">Dividend Yield</p>
                        <p class="value value--positive">{{ formatPercent(optimization.dividend_yield) }}</p>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card class="metric-card metric-card--risk">
                    <div class="metric-icon">
                        <v-icon color="#f59e0b" size="24">mdi-chart-line</v-icon>
                    </div>
                    <div class="metric-body">
                        <p class="label">Risco da Carteira</p>
                        <p class="value value--warning">{{ formatPercent(optimization.portfolio_risk) }}</p>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card class="metric-card metric-card--acceptable">
                    <div class="metric-icon">
                        <v-icon color="#B99D75" size="24">mdi-shield-check</v-icon>
                    </div>
                    <div class="metric-body">
                        <p class="label">Risco Aceitável</p>
                        <p class="value">{{ formatPercent(optimization.acceptable_risk) }}</p>
                    </div>
                </v-card>
            </v-col>
        </v-row>

        <v-divider class="section-divider mb-6" />

        <div class="section-block">
            <div class="section-heading">
                <v-icon color="#B99D75" size="22">mdi-format-list-bulleted</v-icon>
                <h3>Alocação por Ativo</h3>
            </div>
            <div class="table-wrap">
                <v-table density="comfortable" class="allocation-table">
                    <thead>
                        <tr>
                            <th>Ação</th>
                            <th>Setor</th>
                            <th class="text-end">Percentual</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in stockAllocation" :key="item.stock">
                            <td class="cell-symbol">{{ item.stock }}</td>
                            <td>{{ item.sector }}</td>
                            <td class="text-end cell-pct">{{ formatPercent(item.percentage) }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </div>
        </div>

        <v-divider class="section-divider my-6" />

        <div class="section-block">
            <div class="section-heading">
                <v-icon color="#B99D75" size="22">mdi-chart-pie</v-icon>
                <h3>Diversificação por Setor</h3>
            </div>
            <v-row>
                <v-col
                    v-for="(value, sector) in allocationBySector"
                    :key="sector"
                    cols="12"
                    sm="6"
                    md="4"
                >
                    <v-card class="sector-card pa-4">
                        <p class="label">{{ sector }}</p>
                        <p class="value">{{ formatPercent(value) }}</p>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </v-sheet>

    <SavePortfolioModal v-model="openSaveModal" @confirm="handleSave" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { notify } from '@/utils/toast';
import { savePortfolio } from '@/services/portfolio';
import SavePortfolioModal from '@/components/SavePortfolioModal.vue';
import { usePortfoliosStore } from '@/stores/portfoliosStore';

const store = usePortfoliosStore();

const props = defineProps<{
    optimization: {
        dividend_yield: number;
        portfolio_risk: number;
        acceptable_risk: number | null;
        stock_allocation: {
            stock: string;
            sector: string;
            percentage: number;
        }[];
        allocation_by_sector: Record<string, number>;
    };
}>();

const openSaveModal = ref(false);

const stockAllocation = computed(
    () => props.optimization?.stock_allocation ?? [],
);

const allocationBySector = computed(
    () => props.optimization?.allocation_by_sector ?? {},
);

function formatPercent(value: number | null | undefined): string {
    if (value == null || Number.isNaN(value)) return '—';
    return `${value.toFixed(2)}%`;
}

async function handleSave(name: string) {
    try {
        const newPortfolio = await savePortfolio({
            name,
            totalRisk: props.optimization.portfolio_risk,
            totalReturn: props.optimization.dividend_yield,
            stocks: props.optimization.stock_allocation.map((item) => ({
                stock: item.stock,
                percentage: item.percentage,
            })),
        });

        store.addPortfolio(newPortfolio);

        notify.success('Portfólio salvo com sucesso!');
        openSaveModal.value = false;
    } catch (error: any) {
        notify.error(
            error?.response?.data?.message || 'Erro ao salvar portfólio',
        );
    }
}
</script>

<style scoped>
.result-sheet {
    background: rgba(0, 0, 0, 0.2) !important;
    border: 1px solid rgba(185, 157, 117, 0.15) !important;
    border-radius: 20px !important;
    padding: 24px 28px 28px !important;
}

.result-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(185, 157, 117, 0.1);
}

.header-icon {
    width: 52px;
    height: 52px;
    background: rgba(185, 157, 117, 0.1);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.result-title {
    font-size: 1.35rem;
    font-weight: 700;
    margin: 0 0 4px;
    background: #b99d75;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.result-subtitle {
    color: rgba(255, 252, 239, 0.65);
    font-size: 0.875rem;
    margin: 0;
}

.save-btn {
    background: linear-gradient(135deg, #b99d75 0%, #9b835f 100%) !important;
    color: #1c2d41 !important;
    font-weight: 600;
    text-transform: none;
    border-radius: 40px !important;
    letter-spacing: normal;
}

.save-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(185, 157, 117, 0.25);
}

.metrics-row {
    margin-top: 0;
}

.metric-card {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 18px !important;
    background: rgba(0, 0, 0, 0.25) !important;
    border: 1px solid rgba(185, 157, 117, 0.12) !important;
    border-radius: 16px !important;
    transition: border-color 0.2s ease;
}

.metric-card:hover {
    border-color: rgba(185, 157, 117, 0.28) !important;
}

.metric-icon {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.metric-card--yield .metric-icon {
    background: rgba(34, 197, 94, 0.12);
}

.metric-card--risk .metric-icon {
    background: rgba(245, 158, 11, 0.12);
}

.metric-card--acceptable .metric-icon {
    background: rgba(185, 157, 117, 0.12);
}

.metric-body {
    min-width: 0;
}

.label {
    color: rgba(255, 252, 239, 0.55);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin: 0 0 4px;
}

.value {
    color: #fffcef;
    font-size: 1.35rem;
    font-weight: 700;
    margin: 0;
}

.value--positive {
    color: #22c55e;
}

.value--warning {
    color: #f59e0b;
}

.section-divider {
    border-color: rgba(185, 157, 117, 0.15) !important;
    opacity: 1;
}

.section-heading {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
}

.section-heading h3 {
    color: #fffcef;
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
}

.table-wrap {
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid rgba(185, 157, 117, 0.12);
    background: rgba(0, 0, 0, 0.2);
}

.allocation-table {
    background: transparent !important;
}

.allocation-table :deep(thead th) {
    background: rgba(185, 157, 117, 0.08) !important;
    color: #b99d75 !important;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    border-bottom: 1px solid rgba(185, 157, 117, 0.15) !important;
}

.allocation-table :deep(tbody td) {
    color: rgba(255, 252, 239, 0.85) !important;
    border-bottom: 1px solid rgba(185, 157, 117, 0.08) !important;
}

.allocation-table :deep(tbody tr:hover td) {
    background: rgba(185, 157, 117, 0.06) !important;
}

.allocation-table :deep(tbody tr:last-child td) {
    border-bottom: none !important;
}

.cell-symbol {
    font-weight: 600;
    color: #fffcef !important;
}

.cell-pct {
    color: #b99d75 !important;
    font-weight: 600;
}

.sector-card {
    background: rgba(0, 0, 0, 0.25) !important;
    border: 1px solid rgba(185, 157, 117, 0.12) !important;
    border-radius: 14px !important;
    transition: border-color 0.2s ease;
}

.sector-card:hover {
    border-color: rgba(185, 157, 117, 0.25) !important;
}

@media (max-width: 600px) {
    .result-sheet {
        padding: 20px 16px !important;
    }

    .result-header {
        flex-direction: column;
        text-align: center;
    }

    .result-title {
        font-size: 1.2rem;
    }

    .save-btn {
        width: 100%;
    }
}
</style>
