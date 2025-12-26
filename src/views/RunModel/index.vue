<template>
    <v-container class="py-6">
        <v-sheet color="#1e1e1e" rounded elevation="4" class="pa-6">

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
            <DateRangeSelector />
            <AcceptableRiskInput />
            <StockSelector />
            <v-divider class="my-6" />

            <v-btn color="blue-accent-3" size="large" block :disabled="analysis.selectedSymbols.length === 0"
                @click="runModel">
                Rodar Modelo com {{ analysis.selectedSymbols.length }} ações
            </v-btn>

            <ModelResult v-if="modelResult" :optimization="modelResult.optimization" />
        </v-sheet>
    </v-container>

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

async function runModel() {
    if (!analysis.selectedSymbols || analysis.selectedSymbols.length < 5) {
        notify.error('Selecione pelo menos 5 ações.');
        return;
    }

    const payload = {
        stocks: analysis.selectedSymbols,
        start: analysis.start ?? null,
        end: analysis.end ?? null,
        acceptableRisk: analysis.acceptableRisk ?? null
    };

    notify.info('Aguarde enquanto o modelo é executado');

    try {
        const result = await analyzeStocks(payload as any);

        if (result.error || !result.optimization) {
            notify.error(result.error ?? 'Falha ao otimizar a carteira.');
            return;
        }
        console.log('Resultado otimizado:', result);
        modelResult.value = result;
        notify.success('Modelo executado com sucesso!');
    } catch (err) {
        console.error(err);
        notify.error('Erro ao executar modelo.');
    }
}
</script>
