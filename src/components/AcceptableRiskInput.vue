<template>
    <v-row class="mt-4">
        <v-col cols="12" md="6">
            <v-tooltip text="Opcional: se deixar vazio, o modelo irá usar a média dos riscos (desvio padrão)">
                <template #activator="{ props }">
                    <v-text-field v-bind="props" v-model="formatted" label="Risco aceitável (%)" variant="outlined"
                        color="blue-accent-2" type="text" @input="validate" :error="hasError"
                        :error-messages="errorMessage" clearable />
                </template>
            </v-tooltip>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useAnalysisStore } from "@/stores/analysisStore";

const analysis = useAnalysisStore();

const formatted = ref<string>(analysis.acceptableRisk?.toString() ?? "");
const hasError = ref(false);
const errorMessage = ref("");

function validate() {
    const value = formatted.value.trim();

    if (!value) {
        hasError.value = false;
        errorMessage.value = "";
        analysis.acceptableRisk = null;
        return;
    }

    const numeric = Number(value);

    if (isNaN(numeric)) {
        hasError.value = true;
        errorMessage.value = "Digite apenas números (ex: 2 ou 2.5)";
        return;
    }

    if (numeric < 0) {
        hasError.value = true;
        errorMessage.value = "O risco deve ser um número positivo";
        return;
    }

    if (numeric === 0) {
        hasError.value = true;
        errorMessage.value = "O risco deve ser maior que zero";
        return;
    }

    hasError.value = false;
    errorMessage.value = "";
    analysis.acceptableRisk = numeric;
}

watch(
    () => analysis.acceptableRisk,
    val => {
        formatted.value = val?.toString() ?? "";
    }
);
</script>