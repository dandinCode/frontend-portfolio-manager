<template>
    <div class="dashboard-bg">
        <v-container class="dashboard">
            <div class="header glass-panel">
                <div>
                    <div class="welcome-badge">
                        <v-icon size="18" color="#ffd700" class="mr-1">mdi-hand-wave</v-icon>
                        <span>Olá, João</span>
                    </div>
                    <h1 class="title gradient-text">Bem-vindo de volta</h1>
                    <p class="subtitle">Acompanhe seus investimentos e desempenho em tempo real</p>
                </div>
                <v-btn class="create-btn" @click="router.push('/PortfolioList')">
                    <template #prepend>
                        <v-icon size="18">mdi-briefcase-outline</v-icon>
                    </template>
                    Acessar Portfólios
                </v-btn>
            </div>

            <v-row class="mt-6">
                <v-col cols="12" md="3" v-for="(metric, index) in metrics" :key="index">
                    <v-card class="metric-card glow-card" @click="metric.action ? router.push(metric.action) : null">
                        <div class="metric-icon" :style="{ background: metric.bgColor }">
                            <v-icon :color="metric.iconColor">{{ metric.icon }}</v-icon>
                        </div>
                        <div class="metric-content">
                            <span class="metric-title">{{ metric.title }}</span>
                            <div class="metric-value-wrapper">
                                <span class="metric-value" :class="metric.valueClass">{{ metric.value }}</span>
                                <v-chip v-if="metric.trend" size="x-small" :color="metric.trend.color" variant="tonal"
                                    class="trend-chip">
                                    <v-icon size="12">{{ metric.trend.icon }}</v-icon>
                                    {{ metric.trend.text }}
                                </v-chip>
                            </div>
                            <span class="metric-subtitle">{{ metric.subtitle }}</span>
                        </div>
                    </v-card>
                </v-col>
            </v-row>

            <v-row class="mt-8">
                <v-col cols="12" md="8">
                    <v-card class="chart-card glow-card">
                        <v-card-item>
                            <template #title>
                                <span class="card-title">Performance Geral</span>
                            </template>
                            <template #subtitle>
                                Evolução dos seus portfólios nos últimos 30 dias
                            </template>
                            <template #append>
                                <v-chip size="small" color="#ffd700" variant="tonal">
                                    <v-icon start size="14">mdi-calendar</v-icon>
                                    Últimos 30 dias
                                </v-chip>
                            </template>
                        </v-card-item>
                        <v-card-text>
                            <div class="chart-placeholder">
                                <div class="placeholder-content">
                                    <v-icon size="48" color="#b0a580">mdi-chart-line</v-icon>
                                    <p>Gráfico de performance será carregado aqui</p>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="12" md="4">
                    <v-card class="sector-card glow-card">
                        <v-card-item>
                            <template #title>
                                <span class="card-title">Distribuição por Setor</span>
                            </template>
                            <template #subtitle>
                                Baseado nos seus portfólios ativos
                            </template>
                        </v-card-item>

                        <v-card-text>
                            <div class="sector-list">
                                <div v-for="sector in sectorDistribution" :key="sector.name" class="sector-item">
                                    <div class="sector-info">
                                        <div class="sector-dot" :style="{ background: sector.color }"></div>
                                        <span class="sector-name">{{ sector.name }}</span>
                                    </div>
                                    <div class="sector-value-wrapper">
                                        <span class="sector-value">{{ sector.percentage }}%</span>
                                        <span class="sector-count">({{ sector.count }})</span>
                                    </div>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <v-row class="mt-8">
                <v-col cols="12">
                    <h2 class="section-title">Ações Rápidas</h2>
                </v-col>

                <v-col cols="12" md="4" v-for="action in quickActions" :key="action.title">
                    <v-card class="action-card glow-card" @click="router.push(action.route)">
                        <div class="action-icon" :style="{ background: action.bgColor }">
                            <v-icon size="32" :color="action.iconColor">{{ action.icon }}</v-icon>
                        </div>
                        <h3 class="action-title">{{ action.title }}</h3>
                        <p class="action-description">{{ action.description }}</p>
                        <v-btn variant="text" :color="action.iconColor" class="action-link">
                            Acessar
                            <v-icon end size="16">mdi-arrow-right</v-icon>
                        </v-btn>
                    </v-card>
                </v-col>
            </v-row>

            <v-row class="mt-8">
                <v-col cols="12">
                    <div class="section-header">
                        <h2 class="section-title">Últimos Portfólios</h2>
                        <v-btn variant="text" color="#ffd700" @click="router.push('/PortfolioList')">
                            Ver todos
                            <v-icon end size="16">mdi-arrow-right</v-icon>
                        </v-btn>
                    </div>
                </v-col>

                <v-col cols="12" md="4" v-for="portfolio in recentPortfolios" :key="portfolio.id">
                    <v-card class="portfolio-card glow-card" @click="openPortfolio(portfolio.id)">
                        <div class="portfolio-header">
                            <div class="portfolio-icon">
                                <v-icon color="#ffd700">mdi-briefcase-variant</v-icon>
                            </div>
                            <v-menu location="bottom end">
                                <template #activator="{ props }">
                                    <v-btn icon variant="text" size="small" color="grey" v-bind="props">
                                        <v-icon>mdi-dots-vertical</v-icon>
                                    </v-btn>
                                </template>
                                <v-list class="action-menu">
                                    <v-list-item @click.stop="openPortfolio(portfolio.id)">
                                        <template #prepend>
                                            <v-icon size="18">mdi-eye</v-icon>
                                        </template>
                                        <v-list-item-title>Ver detalhes</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item @click.stop="router.push(`/portfolio/${portfolio.id}/edit`)">
                                        <template #prepend>
                                            <v-icon size="18">mdi-pencil</v-icon>
                                        </template>
                                        <v-list-item-title>Editar</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </div>

                        <h3 class="portfolio-name">{{ portfolio.name }}</h3>
                        <p class="portfolio-date">
                            <v-icon size="12" color="#b0a580" class="mr-1">mdi-calendar</v-icon>
                            Criado em {{ formatDate(portfolio.createdAt) }}
                        </p>

                        <div class="portfolio-metrics">
                            <div class="portfolio-metric">
                                <span class="metric-label">Retorno</span>
                                <span class="metric-value-small"
                                    :class="portfolio.totalReturn >= 0 ? 'positive' : 'negative'">
                                    {{ portfolio.totalReturn?.toFixed(2) }}%
                                </span>
                            </div>
                            <div class="portfolio-metric">
                                <span class="metric-label">Risco</span>
                                <span class="metric-value-small orange">
                                    {{ portfolio.totalRisk?.toFixed(2) }}%
                                </span>
                            </div>
                        </div>

                        <div class="portfolio-footer">
                            <span class="asset-count">
                                <v-icon size="12" color="#b0a580" class="mr-1">mdi-puzzle</v-icon>
                                {{ portfolio.portfolioStocks?.length || 0 }} ativos
                            </span>
                            <v-chip size="x-small" color="#ffd700" variant="tonal">
                                Ativo
                            </v-chip>
                        </div>
                    </v-card>
                </v-col>

                <v-col cols="12" md="4" v-if="!recentPortfolios.length">
                    <v-card class="empty-card glow-card" @click="router.push('/RunModel')">
                        <v-icon size="48" color="#b0a580">mdi-briefcase-plus</v-icon>
                        <h3>Criar Primeiro Portfólio</h3>
                        <p>Comece a otimizar seus investimentos agora</p>
                        <v-btn color="#ffd700" variant="tonal" class="mt-2">
                            Criar Portfólio
                        </v-btn>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRouter } from "vue-router"
import { usePortfoliosStore } from "@/stores/portfoliosStore"

const router = useRouter()
const store = usePortfoliosStore()

const portfolios = computed(() => store.portfolios)

const recentPortfolios = computed(() => {
    store.loadFromSession()
    if (!store.portfolios.length) {
        loadPortfolios()
    }
    return [...portfolios.value]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3)
})

async function loadPortfolios() {
    await store.fetchPortfolios()
}

const avgReturn = computed(() => {
    if (!portfolios.value.length) return 0
    const total = portfolios.value.reduce((sum, p) => sum + (p.totalReturn || 0), 0)
    return (total / portfolios.value.length).toFixed(2)
})

const avgRisk = computed(() => {
    if (!portfolios.value.length) return 0
    const total = portfolios.value.reduce((sum, p) => sum + (p.totalRisk || 0), 0)
    return (total / portfolios.value.length).toFixed(2)
})

const bestPortfolio = computed(() => {
    return portfolios.value.reduce((best, p) => {
        if (!best) return p
        return p.totalReturn > best.totalReturn ? p : best
    }, null)
})

const totalAssets = computed(() => {
    const unique = new Set(
        portfolios.value.flatMap(p =>
            p.portfolioStocks?.map((s: any) => s.stock?.symbol?.symbol)
        )
    )
    return unique.size
})

const metrics = computed(() => [
    {
        title: 'Portfólios',
        value: portfolios.value.length,
        subtitle: 'carteiras criadas',
        icon: 'mdi-briefcase',
        bgColor: 'rgba(255, 215, 0, 0.1)',
        iconColor: '#ffd700',
        valueClass: ''
    },
    {
        title: 'Retorno Médio',
        value: `${avgReturn.value}%`,
        subtitle: 'média ponderada',
        icon: 'mdi-trending-up',
        bgColor: 'rgba(34, 197, 94, 0.1)',
        iconColor: '#22c55e',
        valueClass: 'positive',
        trend: {
            icon: 'mdi-arrow-up',
            color: 'success',
            text: '+2.3%'
        }
    },
    {
        title: 'Risco Médio',
        value: `${avgRisk.value}%`,
        subtitle: 'volatilidade',
        icon: 'mdi-chart-line',
        bgColor: 'rgba(245, 158, 11, 0.1)',
        iconColor: '#f59e0b',
        valueClass: 'orange'
    },
    {
        title: 'Total de Ativos',
        value: totalAssets.value,
        subtitle: 'posições diferentes',
        icon: 'mdi-puzzle',
        bgColor: 'rgba(59, 130, 246, 0.1)',
        iconColor: '#3b82f6',
        valueClass: '',
        action: '/AddSymbol'
    }
])

const quickActions = [
    {
        title: 'Analisar Ações',
        description: 'Use o modelo de otimização para criar carteiras',
        icon: 'mdi-chart-line',
        bgColor: 'rgba(255, 215, 0, 0.1)',
        iconColor: '#ffd700',
        route: '/RunModel'
    },
    {
        title: 'Adicionar Ativo',
        description: 'Cadastre novos símbolos na base de dados',
        icon: 'mdi-plus-circle',
        bgColor: 'rgba(59, 130, 246, 0.1)',
        iconColor: '#3b82f6',
        route: '/AddSymbol'
    }
]

function generateColor(index: number, total: number) {
    const hue = Math.round((360 / total) * index)
    return `hsl(${hue}, 70%, 55%)`
}

const sectorDistribution = computed(() => {
    const sectorMap: Record<string, number> = {}

    portfolios.value.forEach(portfolio => {
        if (!portfolio.portfolioStocks) return
        portfolio.portfolioStocks.forEach((ps: any) => {
            const sector = ps.stock?.sector ?? "Outros"
            sectorMap[sector] = (sectorMap[sector] || 0) + 1
        })
    })

    const total = Object.values(sectorMap).reduce((a, b) => a + b, 0)

    const entries = Object.entries(sectorMap)

    return entries.map(([name, count], index) => ({
        name,
        count,
        percentage: Number(((count / total) * 100).toFixed(1)),
        color: generateColor(index, entries.length)
    }))
})

function openPortfolio(id: number) {
    router.push(`/PortfolioDetails/${id}`)
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("pt-BR", {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
}
</script>

<style scoped>
.dashboard-bg {
    min-height: 100vh;
    background: radial-gradient(circle at top, #291f01, #050400);
    position: relative;
    overflow: hidden;
}

.dashboard-bg::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(rgba(255, 215, 0, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    pointer-events: none;
}

.dashboard {
    padding: 40px 20px;
    position: relative;
    z-index: 1;
}

.glass-panel {
    background: rgba(10, 8, 3, 0.7) !important;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 215, 0, 0.08);
    border-radius: 24px !important;
    padding: 24px 32px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
}

.welcome-badge {
    display: inline-flex;
    align-items: center;
    background: rgba(255, 215, 0, 0.1);
    padding: 4px 12px;
    border-radius: 20px;
    margin-bottom: 12px;
    color: #ffd700;
    font-size: 13px;
}

.title {
    font-size: 38px;
    font-weight: 800;
    margin-bottom: 8px;
}

.gradient-text {
    background: linear-gradient(135deg, #ffd700, #b8860b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.subtitle {
    color: #b0a580;
    font-size: 16px;
}

.create-btn {
    background: linear-gradient(135deg, #ffd700, #b8860b) !important;
    color: #050400 !important;
    font-weight: 600;
    text-transform: none;
    border-radius: 14px !important;
    padding: 12px 24px !important;
    transition: all 0.3s ease;
}

.create-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
}

.metric-card {
    padding: 24px !important;
    background: rgba(10, 8, 3, 0.8) !important;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 215, 0, 0.1);
    border-radius: 20px !important;
    display: flex;
    align-items: center;
    gap: 16px;
    transition: all 0.3s ease;
    cursor: pointer;
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
    background: linear-gradient(45deg, #ffd700, #b8860b, #ffd700);
    border-radius: 22px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
}

.glow-card:hover::before {
    opacity: 0.15;
}

.metric-card:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 215, 0, 0.3);
}

.metric-icon {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.metric-content {
    flex: 1;
}

.metric-title {
    color: #b0a580;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.metric-value-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 4px 0;
}

.metric-value {
    font-size: 28px;
    font-weight: 700;
    color: white;
}

.metric-subtitle {
    color: #b0a580;
    font-size: 11px;
}

.trend-chip {
    background: rgba(34, 197, 94, 0.1) !important;
    color: #22c55e !important;
}

.positive {
    color: #22c55e !important;
}

.orange {
    color: #f59e0b !important;
}

.chart-card {
    background: rgba(10, 8, 3, 0.8) !important;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 215, 0, 0.1);
    border-radius: 24px !important;
    height: 100%;
}

.card-title {
    color: #ffd700;
    font-size: 18px;
    font-weight: 600;
}

.chart-placeholder {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 16px;
    padding: 60px;
    text-align: center;
}

.placeholder-content p {
    color: #b0a580;
    margin-top: 12px;
}

.sector-card {
    background: rgba(10, 8, 3, 0.8) !important;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 215, 0, 0.1);
    border-radius: 24px !important;
    height: 100%;
}

.sector-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.sector-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.sector-info {
    display: flex;
    align-items: center;
    gap: 8px;
}

.sector-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
}

.sector-name {
    color: white;
    font-size: 14px;
}

.sector-value-wrapper {
    display: flex;
    align-items: center;
    gap: 6px;
}

.sector-value {
    color: #ffd700;
    font-weight: 600;
    font-size: 14px;
}

.sector-count {
    color: #b0a580;
    font-size: 12px;
}

.action-card {
    padding: 32px !important;
    background: rgba(10, 8, 3, 0.8) !important;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 215, 0, 0.1);
    border-radius: 24px !important;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
}

.action-card:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 215, 0, 0.3);
}

.action-icon {
    width: 70px;
    height: 70px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
}

.action-title {
    color: white;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 8px;
}

.action-description {
    color: #b0a580;
    font-size: 14px;
    margin-bottom: 16px;
}

.action-link {
    text-transform: none;
    font-weight: 500;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.section-title {
    color: #ffd700;
    font-size: 24px;
    font-weight: 600;
}

.portfolio-card {
    padding: 24px !important;
    background: rgba(10, 8, 3, 0.8) !important;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 215, 0, 0.1);
    border-radius: 24px !important;
    cursor: pointer;
    transition: all 0.3s ease;
}

.portfolio-card:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 215, 0, 0.3);
}

.portfolio-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.portfolio-icon {
    width: 48px;
    height: 48px;
    background: rgba(255, 215, 0, 0.1);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.portfolio-name {
    color: white;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 6px;
}

.portfolio-date {
    color: #b0a580;
    font-size: 12px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
}

.portfolio-metrics {
    display: flex;
    gap: 24px;
    margin-bottom: 16px;
}

.portfolio-metric {
    display: flex;
    flex-direction: column;
}

.metric-label {
    color: #b0a580;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.metric-value-small {
    font-size: 18px;
    font-weight: 600;
}

.portfolio-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 12px;
    border-top: 1px solid rgba(255, 215, 0, 0.1);
}

.asset-count {
    color: #b0a580;
    font-size: 12px;
    display: flex;
    align-items: center;
}

.empty-card {
    padding: 40px !important;
    background: rgba(10, 8, 3, 0.8) !important;
    backdrop-filter: blur(10px);
    border: 2px dashed rgba(255, 215, 0, 0.2);
    border-radius: 24px !important;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
}

.empty-card:hover {
    border-color: rgba(255, 215, 0, 0.5);
    background: rgba(20, 16, 6, 0.9) !important;
}

.empty-card h3 {
    color: white;
    font-size: 20px;
}

.empty-card p {
    color: #b0a580;
}

.action-menu {
    background: #1a1508 !important;
    border: 1px solid rgba(255, 215, 0, 0.1);
}

.action-menu :deep(.v-list-item) {
    color: white;
}

.action-menu :deep(.v-list-item:hover) {
    background: rgba(255, 215, 0, 0.1) !important;
}

@media (max-width: 960px) {
    .header {
        flex-direction: column;
        gap: 20px;
        text-align: center;
        padding: 20px;
    }

    .title {
        font-size: 32px;
    }

    .create-btn {
        width: 100%;
    }

    .metric-card {
        margin-bottom: 12px;
    }

    .chart-placeholder {
        padding: 30px;
    }

    .action-card {
        margin-bottom: 16px;
    }
}

@media (max-width: 600px) {
    .dashboard {
        padding: 20px 10px;
    }

    .title {
        font-size: 28px;
    }

    .metric-value {
        font-size: 24px;
    }

    .section-title {
        font-size: 20px;
    }

    .portfolio-card {
        margin-bottom: 16px;
    }
}
</style>