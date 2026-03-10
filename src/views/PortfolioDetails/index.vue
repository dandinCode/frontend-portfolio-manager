<template>
    <v-container class="portfolio-page">
        <div v-if="portfolio">
            <div class="header">
                <div>
                    <h1 class="title">{{ portfolio.name }}</h1>
                    <p class="subtitle">
                        Criado em {{ formatDate(portfolio.createdAt) }}
                    </p>
                </div>
                <v-btn variant="outlined" color="white" @click="router.back()">
                    Voltar
                </v-btn>
            </div>
            <v-row class="metrics">
                <v-col cols="12" md="4">
                    <v-card class="metric-card">
                        <span class="metric-label">
                            Retorno Esperado
                        </span>
                        <span class="metric-value" :class="portfolio.totalReturn >= 0 ? 'positive' : 'negative'">
                            {{ portfolio.totalReturn.toFixed(2) }}%
                        </span>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card class="metric-card">
                        <span class="metric-label">
                            Risco
                        </span>
                        <span class="metric-value risk">
                            {{ (portfolio.totalRisk).toFixed(2) }}%
                        </span>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card class="metric-card">
                        <span class="metric-label">
                            Ativos
                        </span>
                        <span class="metric-value">
                            {{ portfolio.portfolioStocks.length }}
                        </span>
                    </v-card>
                </v-col>
            </v-row>

            <v-card class="stocks-card">
                <v-card-title>
                    Ativos do Portfólio
                </v-card-title>
                <v-table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Empresa</th>
                            <th>Setor</th>
                            <th>Dividend Yield</th>
                            <th>Volatilidade</th>
                            <th>Última atualização</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in portfolio.portfolioStocks" :key="item.id">
                            <td>
                                {{ item.stock.id }}
                            </td>
                            <td>
                                {{ item.stock.companyName }}
                            </td>
                            <td>
                                {{ item.stock.sector }}
                            </td>
                            <td>
                                {{ item.stock.dividendYield }}%
                            </td>
                            <td>
                                {{ (item.stock.volatility).toFixed(2) }}%
                            </td>
                            <td>
                                {{ formatDate(item.stock.lastFetchedAt) }}
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>

        </div>
        <v-alert v-else type="error">
            Portfólio não encontrado
        </v-alert>
    </v-container>
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
    return new Date(date).toLocaleDateString("pt-BR")
}

</script>

<style scoped>
.portfolio-page {
    min-height: 100vh;

    background: radial-gradient(circle at top,
            #1e293b,
            #020617);

    padding-top: 40px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 40px;
}

.title {
    font-size: 34px;
    font-weight: 700;
    color: white;
}

.subtitle {
    color: #94a3b8;
}

.metrics {
    margin-bottom: 30px;
}

.metric-card {

    padding: 30px;

    border-radius: 16px;

    background: linear-gradient(145deg,
            #1e293b,
            #020617);

    border: 1px solid rgba(255, 255, 255, 0.06);

    display: flex;
    flex-direction: column;
}

.metric-label {
    color: #94a3b8;
    font-size: 13px;
}

.metric-value {

    font-size: 32px;
    font-weight: 700;
    margin-top: 5px;

    color: white;
}

.positive {
    color: #22c55e;
}

.negative {
    color: #ef4444;
}

.risk {
    color: #f97316;
}

.stock-card {

    padding: 20px;

    background: linear-gradient(145deg,
            #1e293b,
            #020617);

    border-radius: 14px;

    border: 1px solid rgba(255, 255, 255, 0.05);

    color: white;

    transition: .25s;
}

.stock-card:hover {

    transform: translateY(-4px);

    border: 1px solid rgba(99, 102, 241, .5);
}

.stock-header h3 {

    font-size: 18px;
    font-weight: 600;
}
</style>