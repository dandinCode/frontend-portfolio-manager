<template>
    <div class="run-model-bg">
        <v-container class="py-6">
            <v-sheet class="main-sheet" rounded="xl" elevation="0">
                <div class="sheet-header">
                    <div class="header-icon">
                        <v-icon size="32" color="#B99D75">mdi-robot-outline</v-icon>
                    </div>
                    <div class="header-text">
                        <h2 class="text-h4 font-weight-bold">Executar Modelo de Seleção</h2>
                        <p class="text-subtitle-1 mt-1">Otimize sua carteira com base em dados históricos e programação
                            linear</p>
                    </div>
                </div>

                <v-alert class="info-alert" variant="tonal" density="comfortable" rounded="lg">
                    <div class="alert-content">
                        <div class="alert-header">
                            <v-icon size="20" color="#B99D75" class="mr-2">mdi-information-outline</v-icon>
                            <strong>Status das Ações</strong>
                        </div>
                        <p class="mt-2 mb-2">
                            Ao passar o mouse por cima das ações você poderá ver o status dela.
                        </p>
                        <div class="status-badges">
                            <v-chip size="small" color="#22c55e" variant="tonal" class="status-chip">
                                validated
                            </v-chip>
                            <span class="status-desc">= ação verificada</span>

                            <v-chip size="small" color="#f59e0b" variant="tonal" class="status-chip">
                                pending
                            </v-chip>
                            <span class="status-desc">= ação ainda não verificada</span>

                            <v-chip size="small" color="#ef4444" variant="tonal" class="status-chip">
                                invalid
                            </v-chip>
                            <span class="status-desc">= ação possivelmente inexistente / não encontrada</span>
                        </div>
                        <div class="info-note mt-3">
                            <v-icon size="16" color="#B99D75">mdi-shield-check</v-icon>
                            <span>
                                Qualquer pessoa pode cadastrar ativos. Cabe a você decidir se quer rodar o modelo com
                                eles.
                                Caso algum ativo não exista, o modelo apenas <strong>ignora</strong> e segue com os
                                outros.
                            </span>
                        </div>
                    </div>
                </v-alert>

                <div class="form-section">
                    <div class="form-grid">
                        <div class="form-column">
                            <div class="form-card">
                                <div class="card-header">
                                    <v-icon color="#B99D75" size="20">mdi-calendar-range</v-icon>
                                    <h3>Período de Análise</h3>
                                </div>
                                <DateRangeSelector />
                            </div>
                        </div>
                        <div class="form-column">
                            <div class="form-card">
                                <div class="card-header">
                                    <v-icon color="#B99D75" size="20">mdi-chart-line</v-icon>
                                    <h3>Nível de Risco</h3>
                                </div>
                                <AcceptableRiskInput />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="stocks-section">
                    <div class="section-header">
                        <div class="header-left">
                            <v-icon color="#B99D75" size="24">mdi-stock</v-icon>
                            <h3>Seleção de Ações</h3>
                        </div>
                        <div class="selected-badge">
                            <v-chip :color="analysis.selectedSymbols.length > 0 ? '#B99D75' : '#4a5568'"
                                variant="tonal">
                                <v-icon start size="14"
                                    :color="analysis.selectedSymbols.length > 0 ? '#B99D75' : '#9aa4bf'">mdi-check-circle</v-icon>
                                {{ analysis.selectedSymbols.length }} ações selecionadas
                            </v-chip>
                        </div>
                    </div>
                    <StockSelector />
                </div>
                <v-divider class="divider" />
                <div class="action-section">
                    <v-btn class="run-btn" size="x-large" block :loading="loading"
                        :disabled="analysis.selectedSymbols.length === 0 || loading" @click="runModel">
                        <template #prepend>
                            <v-icon>mdi-play-circle</v-icon>
                        </template>

                        <span v-if="!loading">
                            Rodar Modelo com {{ analysis.selectedSymbols.length }} ações
                        </span>
                        <span v-else>
                            Executando modelo...
                        </span>
                    </v-btn>
                    <p v-if="analysis.selectedSymbols.length > 0 && analysis.selectedSymbols.length < 5"
                        class="warning-text">
                        <v-icon size="14" color="#f59e0b">mdi-alert</v-icon>
                        Recomendamos selecionar pelo menos 5 ações para uma melhor diversificação
                    </p>
                </div>

                <ModelResult v-if="modelResult" :optimization="modelResult.optimization" />
            </v-sheet>
        </v-container>
    </div>
</template>

<script setup lang="ts">
import StockSelector from "@/components/StockSelector.vue";
import DateRangeSelector from "@/components/DateRangeSelector.vue";
import AcceptableRiskInput from "@/components/AcceptableRiskInput.vue";
import { useAnalysisStore } from "@/stores/analysisStore";
import { analyzeStocks } from "@/services/analisys";
import ModelResult from "@/components/ModelResult.vue";
import { notify } from "@/utils/toast";
import { ref } from 'vue';

const modelResult = ref<any | null>(null);
const analysis = useAnalysisStore();
const loading = ref(false)

async function runModel() {
    if (!analysis.selectedSymbols || analysis.selectedSymbols.length < 5) {
        notify.error('Selecione pelo menos 5 ações para uma otimização eficiente.');
        return;
    }

    const payload: any = {
        stocks: analysis.selectedSymbols
    }

    if (analysis.start && analysis.start.trim() !== '') {
        payload.start = analysis.start
    }

    if (analysis.end && analysis.end.trim() !== '') {
        payload.end = analysis.end
    }

    if (analysis.acceptableRisk !== null && analysis.acceptableRisk !== undefined) {
        payload.acceptableRisk = analysis.acceptableRisk
    }

    notify.info('Aguarde enquanto o modelo é executado...');
    loading.value = true;

    try {
        const result = await analyzeStocks(payload as any);

        if (result.error || !result.optimization) {
            notify.error(result.error ?? 'Falha ao otimizar a carteira.');
            return;
        }
        modelResult.value = result;
        notify.success('Modelo executado com sucesso!');
    } catch (err) {
        console.error(err);
        notify.error('Erro ao executar modelo.');
    } finally {
        loading.value = false;
    }
}
</script>

<style scoped>
.run-model-bg {
    min-height: 100vh;
    background: radial-gradient(circle at top, #1C2D41 0%, #0f1a24 100%);
}

.main-sheet {
    background: rgba(28, 45, 65, 0.85) !important;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(185, 157, 117, 0.2);
    border-radius: 28px !important;
    overflow: hidden;
}

.sheet-header {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 32px 32px 24px;
    background: linear-gradient(135deg, rgba(185, 157, 117, 0.05), transparent);
    border-bottom: 1px solid rgba(185, 157, 117, 0.1);
}

.header-icon {
    width: 56px;
    height: 56px;
    background: rgba(185, 157, 117, 0.1);
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.header-text h2 {
    background: linear-gradient(135deg, #FFFCEF 0%, #B99D75 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
}

.header-text p {
    color: rgba(255, 252, 239, 0.7);
    margin: 0;
}

.info-alert {
    margin: 24px 32px;
    background: rgba(185, 157, 117, 0.05) !important;
    border: 1px solid rgba(185, 157, 117, 0.15) !important;
    border-radius: 20px !important;
}

.alert-content {
    color: #FFFCEF;
}

.alert-header {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #B99D75;
}

.status-badges {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 8px;
}

.status-chip {
    font-weight: 500;
}

.status-desc {
    color: rgba(255, 252, 239, 0.6);
    font-size: 12px;
    margin-right: 16px;
}

.info-note {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    background: rgba(0, 0, 0, 0.2);
    padding: 12px;
    border-radius: 12px;
    font-size: 13px;
    color: rgba(255, 252, 239, 0.7);
}

.info-note strong {
    color: #B99D75;
}

.form-section {
    padding: 0 32px;
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
}

.form-card {
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(185, 157, 117, 0.1);
    border-radius: 20px;
    padding: 20px;
}

.card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
}

.card-header h3 {
    color: #FFFCEF;
    font-size: 16px;
    font-weight: 600;
    margin: 0;
}

.stocks-section {
    padding: 24px 32px;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 12px;
}

.header-left h3 {
    color: #FFFCEF;
    font-size: 18px;
    font-weight: 600;
    margin: 0;
}

.selected-badge :deep(.v-chip) {
    background: rgba(185, 157, 117, 0.1) !important;
    color: #FFFCEF !important;
}

.divider {
    background: rgba(185, 157, 117, 0.15) !important;
    margin: 16px 32px;
}

.action-section {
    padding: 0 32px 32px;
}

.run-btn {
    background: linear-gradient(135deg, #B99D75 0%, #9b835f 100%) !important;
    color: #1C2D41 !important;
    font-weight: 700;
    text-transform: none;
    font-size: 16px;
    padding: 20px !important;
    border-radius: 48px !important;
    transition: all 0.3s ease;
}

.run-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(185, 157, 117, 0.3);
}

.run-btn:disabled {
    opacity: 0.5;
    transform: none;
}

.warning-text {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 12px;
    color: #f59e0b;
    font-size: 12px;
}

@media (max-width: 960px) {
    .form-grid {
        grid-template-columns: 1fr;
        gap: 16px;
    }

    .sheet-header {
        flex-direction: column;
        text-align: center;
        padding: 24px;
    }

    .status-badges {
        flex-direction: column;
        align-items: flex-start;
    }

    .status-desc {
        margin-bottom: 8px;
    }

    .info-alert {
        margin: 16px;
    }

    .form-section,
    .stocks-section {
        padding-left: 16px;
        padding-right: 16px;
    }

    .action-section {
        padding: 0 16px 24px;
    }

    .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
    }
}

@media (max-width: 600px) {
    .header-text h2 {
        font-size: 24px;
    }

    .card-header h3 {
        font-size: 14px;
    }
}
</style>