<template>
    <div class="run-model-bg py-4">
        <v-container class="portfolio-page">
            <div v-if="portfolio">
                <div class="header glass-panel">
                    <div>
                        <div class="back-nav">
                            <v-btn variant="text" color="#B99D75" size="small" class="back-btn"
                                @click="router.back()">
                                <v-icon start size="16">mdi-arrow-left</v-icon>
                                Voltar
                            </v-btn>
                        </div>
                        <h1 class="title">{{ portfolio.name }}</h1>
                        <p class="subtitle">
                            <v-icon size="14" class="mr-1" color="#B99D75">mdi-calendar</v-icon>
                            Criado em {{ formatDate(portfolio.createdAt) }}
                        </p>
                    </div>
                </div>
                <v-row class="metrics">
                    <v-col cols="12" md="4">
                        <v-card class="metric-card glow-card">
                            <div class="metric-icon positive">
                                <v-icon size="28">mdi-trending-up</v-icon>
                            </div>
                            <div class="metric-content">
                                <span class="metric-label">Retorno Esperado</span>
                                <span class="metric-value"
                                    :class="portfolio.totalReturn >= 0 ? 'positive' : 'negative'">
                                    {{ portfolio.totalReturn.toFixed(2) }}%
                                </span>
                            </div>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-card class="metric-card glow-card">
                            <div class="metric-icon warning">
                                <v-icon size="28">mdi-chart-line</v-icon>
                            </div>
                            <div class="metric-content">
                                <span class="metric-label">Risco</span>
                                <span class="metric-value warning--text">
                                    {{ (portfolio.totalRisk).toFixed(2) }}%
                                </span>
                            </div>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-card class="metric-card glow-card">
                            <div class="metric-icon info">
                                <v-icon size="28">mdi-puzzle</v-icon>
                            </div>
                            <div class="metric-content">
                                <span class="metric-label">Ativos</span>
                                <span class="metric-value">
                                    {{ portfolio.portfolioStocks.length }}
                                </span>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
                <v-card class="stocks-card glow-card">
                    <v-card-title class="d-flex align-center">
                        <v-icon start color="#B99D75" class="mr-2">mdi-format-list-bulleted</v-icon>
                        Ativos do Portfólio
                    </v-card-title>
                    <v-divider class="mx-4 section-divider" />
                    <v-table class="stocks-table">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Empresa</th>
                                <th>Setor</th>
                                <th>Alocação</th>
                                <th>Dividend Yield</th>
                                <th>Volatilidade</th>
                                <th>Última atualização</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in portfolio.portfolioStocks" :key="item.id" class="stock-row">
                                <td>
                                    <div class="stock-symbol">
                                        <v-avatar size="32" class="symbol-avatar mr-2" variant="tonal">
                                            <span class="symbol-text">{{ item.stock.symbol.symbol.substring(0, 2)
                                                }}</span>
                                        </v-avatar>
                                        <span class="font-weight-bold">{{ item.stock.symbol.symbol }}</span>
                                    </div>
                                </td>
                                <td>{{ item.stock.companyName || '—' }}</td>
                                <td>
                                    <v-chip size="small" :color="getSectorColor(item.stock.sector)" variant="tonal">
                                        {{ item.stock.sector || 'Não definido' }}
                                    </v-chip>
                                </td>
                                <td>
                                    <div class="yield-cell">
                                        <span class="yield-value">{{ item.percentage?.toFixed(2) || '0.00'
                                            }}%</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="yield-cell">
                                        <span class="yield-value">{{ item.stock.dividendYield?.toFixed(2) || '0.00'
                                            }}%</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="volatility-cell">
                                        <span :class="getVolatilityClass(item.stock.volatility)">
                                            {{ (item.stock.volatility)?.toFixed(2) || '0.00' }}%
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <span class="text-grey">
                                        {{ formatDate(item.stock.lastFetchedAt) }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                    <v-card-text v-if="!portfolio.portfolioStocks?.length" class="text-center">
                        <v-icon size="48" color="grey-darken-1" class="mb-3">mdi-package-variant</v-icon>
                        <p class="text-grey">Nenhum ativo encontrado neste portfólio</p>
                    </v-card-text>
                </v-card>
            </div>
            <div v-else-if="!portfolio" class="loading-state">
                <v-progress-circular indeterminate size="60" color="#B99D75" />
                <p class="text-grey mt-4">Carregando portfólio...</p>
            </div>
            <v-alert v-else type="error" variant="tonal" class="error-alert">
                <v-icon start>mdi-alert-circle</v-icon>
                Portfólio não encontrado
            </v-alert>
        </v-container>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"
import { usePortfoliosStore } from "@/stores/portfoliosStore"
import { computed, onMounted } from "vue"

const route = useRoute()
const router = useRouter()
const store = usePortfoliosStore()

const portfolio = computed(() =>
    store.getPortfolio(Number(route.params.id))
)

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("pt-BR", {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
}

function getSectorColor(sector: string) {
    const colors: Record<string, string> = {
        'Financeiro': 'amber',
        'Energia': 'orange',
        'Tecnologia': 'blue',
        'Saúde': 'green',
        'Consumo': 'red',
        'Industrial': 'purple',
        'Materiais Básicos': 'brown',
        'Comunicações': 'cyan'
    }
    return colors[sector] || 'grey'
}

function getVolatilityClass(volatility: number) {
    if (!volatility) return 'text-grey'
    if (volatility < 20) return 'text-success'
    if (volatility < 35) return 'text-warning'
    return 'text-error'
}
</script>

<style scoped>
.run-model-bg {
    min-height: 100vh;
    background: radial-gradient(circle at top, #1C2D41 0%, #0f1a24 100%);
}

.portfolio-page {
    padding: 40px 20px;
    max-width: 1400px;
    margin: 0 auto;
}

.glass-panel {
    background: rgba(28, 45, 65, 0.85) !important;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(185, 157, 117, 0.2);
    border-radius: 24px !important;
    padding: 24px 32px;
    margin-bottom: 40px;
}

.back-nav {
    margin-bottom: 16px;
}

.back-btn {
    text-transform: none;
    letter-spacing: normal;
    padding: 4px 12px !important;
    border-radius: 40px !important;
    color: #fffcef !important;
}

.back-btn:hover {
    background: rgba(185, 157, 117, 0.12) !important;
    color: #b99d75 !important;
}

.title {
    font-size: 34px;
    font-weight: 700;
    margin-bottom: 8px;
    background: #fffcef;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.subtitle {
    color: rgba(255, 252, 239, 0.65);
    display: flex;
    align-items: center;
    font-size: 14px;
}

.metrics {
    margin-bottom: 30px;
}

.metric-card {
    padding: 24px !important;
    background: rgba(0, 0, 0, 0.25) !important;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(185, 157, 117, 0.12);
    border-radius: 20px !important;
    display: flex;
    align-items: center;
    gap: 16px;
    transition: all 0.3s ease;
}

.glow-card {
    position: relative;
    overflow: hidden;
}

.glow-card::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #b99d75, #9b835f, #b99d75);
    border-radius: 22px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
}

.glow-card:hover::before {
    opacity: 0.2;
}

.metric-card:hover {
    transform: translateY(-4px);
    border-color: rgba(185, 157, 117, 0.35);
    box-shadow: 0 10px 30px rgba(185, 157, 117, 0.12);
}

.metric-icon {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.metric-icon.positive {
    background: rgba(34, 197, 94, 0.15);
    color: #22c55e;
}

.metric-icon.warning {
    background: rgba(245, 158, 11, 0.15);
    color: #f59e0b;
}

.metric-icon.info {
    background: rgba(59, 130, 246, 0.15);
    color: #3b82f6;
}

.metric-content {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.metric-label {
    color: rgba(255, 252, 239, 0.55);
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.metric-value {
    font-size: 32px;
    font-weight: 700;
    color: #fffcef;
}

.positive {
    color: #22c55e !important;
}

.negative {
    color: #ef4444 !important;
}

.warning--text {
    color: #f59e0b !important;
}

.stocks-card {
    background: rgba(0, 0, 0, 0.25) !important;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(185, 157, 117, 0.12);
    border-radius: 20px !important;
    overflow: hidden;
}

.section-divider {
    border-color: rgba(185, 157, 117, 0.12) !important;
}

.symbol-avatar {
    background: rgba(185, 157, 117, 0.15) !important;
}

.stocks-card :deep(.v-card-title) {
    color: #b99d75;
    font-weight: 600;
    padding: 20px 24px;
}

.stocks-table {
    background: transparent !important;
    color: #fffcef;
}

.stocks-table :deep(.v-table__wrapper) {
    background: transparent !important;
}

.stocks-table :deep(th) {
    color: #b99d75 !important;
    background: rgba(185, 157, 117, 0.06) !important;
    font-size: 12px !important;
    font-weight: 600 !important;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1px solid rgba(185, 157, 117, 0.12) !important;
    padding: 16px !important;
}

.stocks-table :deep(td) {
    color: rgba(255, 252, 239, 0.9) !important;
    border-bottom: 1px solid rgba(185, 157, 117, 0.08) !important;
    padding: 16px !important;
}

.stock-row {
    transition: background 0.2s ease;
}

.stock-row:hover {
    background: rgba(185, 157, 117, 0.06) !important;
}

.stock-symbol {
    display: flex;
    align-items: center;
}

.symbol-text {
    font-weight: 600;
    font-size: 12px;
    color: #1c2d41;
}

.yield-cell .yield-value {
    color: #22c55e;
    font-weight: 600;
}

.text-success {
    color: #22c55e !important;
}

.text-warning {
    color: #f59e0b !important;
}

.text-error {
    color: #ef4444 !important;
}

.text-grey {
    color: rgba(255, 252, 239, 0.5) !important;
}

.loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
}

.error-alert {
    background: rgba(239, 68, 68, 0.1) !important;
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: 16px !important;
    color: white;
}

@media (max-width: 600px) {
    .portfolio-page {
        padding: 20px 10px;
    }

    .glass-panel {
        padding: 20px;
    }

    .title {
        font-size: 28px;
    }

    .metric-card {
        padding: 20px !important;
    }

    .metric-icon {
        width: 48px;
        height: 48px;
    }

    .metric-value {
        font-size: 24px;
    }

    .stocks-table :deep(th),
    .stocks-table :deep(td) {
        padding: 12px !important;
        font-size: 13px;
    }
}
</style>