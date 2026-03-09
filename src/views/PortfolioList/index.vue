<template>
    <div class="portfolio-page">
        <v-container class="py-8">
            <div class="header glass-panel">
                <div>
                    <h1 class="title">
                        <span class="gradient-text">Meus Portfólios</span>
                    </h1>
                    <p class="subtitle">Gerencie suas carteiras de investimento com inteligência</p>
                </div>

                <v-btn size="x-large" class="create-btn" @click="goCreate">
                    <template #prepend>
                        <v-icon size="20">mdi-plus</v-icon>
                    </template>
                    Novo Portfólio
                </v-btn>
            </div>

            <div v-if="loading" class="loading-state">
                <v-progress-circular indeterminate size="64" width="4" color="primary" />
                <p class="loading-text">Carregando seus portfólios...</p>
            </div>

            <v-row v-else>
                <v-col v-for="portfolio in portfolios" :key="portfolio.id" cols="12" sm="6" lg="4">
                    <v-hover v-slot="{ isHovering, props }">
                        <v-card v-bind="props" class="portfolio-card" :class="{ 'card-hover': isHovering }"
                            @click="viewPortfolio(portfolio.id)">
                            <div class="card-badge" :class="getPerformanceClass(portfolio)">
                                <v-icon size="14">mdi-trending-up</v-icon>
                                <span>{{ getPerformanceLabel(portfolio) }}</span>
                            </div>
                            <div class="card-icon">
                                <v-avatar size="56" color="primary-dark" variant="tonal">
                                    <v-icon size="28" color="primary">mdi-briefcase-variant</v-icon>
                                </v-avatar>
                            </div>
                            <v-card-item>
                                <v-card-title class="card-title">
                                    {{ portfolio.name }}
                                </v-card-title>
                                <v-card-subtitle class="card-subtitle">
                                    <v-icon size="14">mdi-calendar</v-icon>
                                    Criado em {{ formatDate(portfolio.createdAt) }}
                                </v-card-subtitle>
                            </v-card-item>
                            <v-card-text class="card-content">
                                <div class="metrics-grid">
                                    <div class="metric-item">
                                        <span class="metric-label">Retorno Total</span>
                                        <div class="metric-value-wrapper">
                                            <v-icon size="18" color="success">mdi-trending-up</v-icon>
                                            <span class="metric-value success--text">
                                                {{ portfolio.totalReturn?.toFixed(2) }}%
                                            </span>
                                        </div>
                                    </div>
                                    <div class="metric-item">
                                        <span class="metric-label">Risco</span>
                                        <div class="metric-value-wrapper">
                                            <v-icon size="18" color="warning">mdi-chart-line</v-icon>
                                            <span class="metric-value warning--text">
                                                {{ (portfolio.totalRisk)?.toFixed(2) }}%
                                            </span>
                                        </div>
                                    </div>
                                    <div class="metric-item">
                                        <span class="metric-label">Ativos</span>
                                        <div class="metric-value-wrapper">
                                            <v-icon size="18" color="info">mdi-puzzle</v-icon>
                                            <span class="metric-value">
                                                {{ portfolio.portfolioStocks?.length || 0 }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="performance-chart">
                                    <div class="chart-bar" :style="{ width: getPerformanceWidth(portfolio) + '%' }" />
                                </div>
                            </v-card-text>
                            <v-divider class="card-divider" />
                            <v-card-actions class="card-actions">
                                <v-btn variant="text" color="primary" size="small"
                                    @click.stop="viewPortfolio(portfolio.id)">
                                    <v-icon start size="16">mdi-eye</v-icon>
                                    Ver detalhes
                                </v-btn>
                                <v-spacer />
                                <v-btn icon variant="text" size="small" color="grey"
                                    @click.stop="toggleMenu(portfolio.id)">
                                    <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                                <v-menu v-model="portfolio.menuOpen" :close-on-content-click="false" activator="parent"
                                    location="bottom end">
                                    <v-list density="compact" class="action-menu">
                                        <v-list-item @click="editPortfolio(portfolio.id)">
                                            <template #prepend>
                                                <v-icon size="18">mdi-pencil</v-icon>
                                            </template>
                                            <v-list-item-title>Editar</v-list-item-title>
                                        </v-list-item>

                                        <v-list-item @click="duplicatePortfolio(portfolio.id)">
                                            <template #prepend>
                                                <v-icon size="18">mdi-content-copy</v-icon>
                                            </template>
                                            <v-list-item-title>Duplicar</v-list-item-title>
                                        </v-list-item>

                                        <v-divider />

                                        <v-list-item @click="confirmDelete(portfolio.id)" class="delete-item">
                                            <template #prepend>
                                                <v-icon size="18" color="error">mdi-delete</v-icon>
                                            </template>
                                            <v-list-item-title class="text-error">
                                                Excluir
                                            </v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </v-card-actions>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>
        </v-container>

        <v-dialog v-model="deleteDialog.show" max-width="400">
            <v-card class="delete-dialog">
                <v-card-title class="text-h5">Excluir Portfólio</v-card-title>

                <v-card-text>
                    Tem certeza que deseja excluir o portfólio
                    <strong>"{{ deleteDialog.portfolioName }}"</strong>?
                    Esta ação não pode ser desfeita.
                </v-card-text>

                <v-card-actions>
                    <v-spacer />
                    <v-btn variant="text" @click="deleteDialog.show = false">
                        Cancelar
                    </v-btn>
                    <v-btn color="error" variant="tonal" @click="executeDelete">
                        Excluir
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue"
import { useRouter } from "vue-router"
import { getMyPortfolios, removePortfolio } from "@/services/portfolio"
import { usePortfolioStore } from "@/stores/portfoliosStore"

const portfolioStore = usePortfolioStore()
const router = useRouter()
const portfolios = ref<any[]>([])
const loading = ref(true)

const deleteDialog = reactive({
    show: false,
    portfolioId: null as number | null,
    portfolioName: ''
})

async function loadPortfolios() {
    portfolioStore.loadFromSession()
    if (!portfolioStore.portfolios.length) {
        await portfolioStore.fetchPortfolios()
    }
    portfolios.value = portfolioStore.portfolios.map((p: any) => ({
        ...p,
        menuOpen: false
    }))
    loading.value = false
}

function viewPortfolio(id: number) {
    router.push(`/portfolio/${id}`)
}

function editPortfolio(id: number) {
    router.push(`/portfolio/${id}/edit`)
}

function duplicatePortfolio(id: number) {
    console.log('Duplicar:', id)
}

function confirmDelete(id: number) {
    const portfolio = portfolios.value.find(p => p.id === id)
    deleteDialog.portfolioId = id
    deleteDialog.portfolioName = portfolio?.name || ''
    deleteDialog.show = true
}

async function executeDelete() {
    if (deleteDialog.portfolioId) {
        await removePortfolio(deleteDialog.portfolioId)

        portfolioStore.removePortfolio(deleteDialog.portfolioId)
        portfolios.value = portfolios.value.filter(
            p => p.id !== deleteDialog.portfolioId
        )
        deleteDialog.show = false
    }
}

function toggleMenu(id: number) {
    portfolios.value = portfolios.value.map(p => ({
        ...p,
        menuOpen: p.id === id ? !p.menuOpen : false
    }))
}

function goCreate() {
    router.push("/RunModel")
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("pt-BR", {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
}

function getPerformanceClass(portfolio: any) {
    const return_ = portfolio.totalReturn || 0
    if (return_ > 15) return 'performance-excellent'
    if (return_ > 5) return 'performance-good'
    return 'performance-regular'
}

function getPerformanceLabel(portfolio: any) {
    const return_ = portfolio.totalReturn || 0
    if (return_ > 15) return 'Excelente'
    if (return_ > 5) return 'Bom'
    return 'Regular'
}

function getPerformanceWidth(portfolio: any) {
    const return_ = portfolio.totalReturn || 0
    return Math.min((return_ / 30) * 100, 100)
}

onMounted(loadPortfolios)
</script>

<style scoped>
.portfolio-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #0a0f1e 0%, #0f172a 100%);
    padding: 20px;
}

.glass-panel {
    background: rgba(15, 23, 42, 0.7) !important;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 24px !important;
    padding: 24px 32px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
}

.title {
    font-size: 36px;
    font-weight: 800;
    margin-bottom: 8px;
}

.gradient-text {
    background: linear-gradient(135deg, #6c63ff, #4c8df6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.subtitle {
    color: #9aa4bf;
    font-size: 16px;
    margin: 0;
}

.create-btn {
    background: linear-gradient(135deg, #6c63ff, #4c8df6);
    color: white;
    border-radius: 16px !important;
    padding: 0 24px !important;
    height: 52px !important;
    font-weight: 600;
    text-transform: none;
    letter-spacing: 0.5px;
    box-shadow: 0 8px 16px rgba(108, 99, 255, 0.2);
    transition: all 0.3s ease;
}

.create-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(108, 99, 255, 0.3);
}

.loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
}

.loading-text {
    color: #9aa4bf;
    margin-top: 20px;
    font-size: 16px;
}

.portfolio-card {
    background: rgba(15, 23, 42, 0.6) !important;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 24px !important;
    padding: 20px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover {
    transform: translateY(-4px) scale(1.02);
    border: 1px solid rgba(108, 99, 255, 0.3);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.card-badge {
    position: absolute;
    top: 16px;
    right: 16px;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 4px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(5px);
}

.performance-excellent {
    background: rgba(0, 230, 118, 0.1);
    color: #00e676;
}

.performance-good {
    background: rgba(33, 150, 243, 0.1);
    color: #2196f3;
}

.performance-regular {
    background: rgba(255, 193, 7, 0.1);
    color: #ffc107;
}

.card-icon {
    margin-bottom: 16px;
}

.card-title {
    font-size: 20px;
    font-weight: 700;
    color: white;
    margin-bottom: 4px;
    padding: 0 !important;
}

.card-subtitle {
    color: #9aa4bf;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 4px;
}

.card-content {
    padding: 16px 0 0 !important;
}

.metrics-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 20px;
}

.metric-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.metric-label {
    font-size: 11px;
    color: #9aa4bf;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.metric-value-wrapper {
    display: flex;
    align-items: center;
    gap: 4px;
}

.metric-value {
    font-size: 16px;
    font-weight: 700;
    color: white;
}

.success--text {
    color: #00e676 !important;
}

.warning--text {
    color: #ff7043 !important;
}

.performance-chart {
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    overflow: hidden;
    margin-top: 8px;
}

.chart-bar {
    height: 100%;
    background: linear-gradient(90deg, #6c63ff, #4c8df6);
    border-radius: 2px;
    transition: width 0.3s ease;
}

.card-divider {
    background: rgba(255, 255, 255, 0.05);
    margin: 16px 0 8px;
}

.card-actions {
    padding: 8px 4px !important;
}

.action-menu {
    background: #1e293b !important;
    border: 1px solid rgba(255, 255, 255, 0.05);
}

.delete-item:hover {
    background: rgba(244, 67, 54, 0.1) !important;
}

.create-card {
    background: rgba(15, 23, 42, 0.4) !important;
    border: 2px dashed rgba(108, 99, 255, 0.3);
    border-radius: 24px !important;
    height: 100%;
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
}

.create-card:hover {
    border-color: #6c63ff;
    background: rgba(15, 23, 42, 0.6) !important;
    transform: scale(1.02);
}

.create-card-content {
    text-align: center;
    padding: 32px;
}

.create-card-content h3 {
    color: white;
    font-size: 20px;
    margin: 16px 0 8px;
}

.create-card-content p {
    color: #9aa4bf;
    font-size: 14px;
    margin: 0;
}

.empty-state {
    background: rgba(15, 23, 42, 0.6) !important;
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 24px !important;
    padding: 48px;
    text-align: center;
}

.empty-state h3 {
    color: white;
    font-size: 24px;
    margin: 16px 0 8px;
}

.empty-state p {
    color: #9aa4bf;
    font-size: 16px;
    margin-bottom: 24px;
}

.delete-dialog {
    background: #1e293b !important;
    border: 1px solid rgba(255, 255, 255, 0.05);
}

.delete-dialog :deep(.v-card-title) {
    color: white;
}

.delete-dialog :deep(.v-card-text) {
    color: #9aa4bf;
}

@media (max-width: 600px) {
    .header {
        flex-direction: column;
        gap: 16px;
        text-align: center;
    }

    .title {
        font-size: 28px;
    }

    .metrics-grid {
        grid-template-columns: 1fr;
        gap: 12px;
    }

    .create-btn {
        width: 100%;
    }
}
</style>