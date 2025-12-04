<template>
    <v-row class="my-4" dense>
        <v-col cols="12" md="6">
            <v-text-field v-model="analysis.start" label="Data inicial" type="date" variant="outlined"
                color="blue-accent-3" class="dark-input" />
        </v-col>

        <v-col cols="12" md="6">
            <v-text-field v-model="analysis.end" label="Data final" type="date" variant="outlined" color="blue-accent-3"
                class="dark-input" />
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { useAnalysisStore } from "@/stores/analysisStore";

const analysis = useAnalysisStore();
</script>

<style scoped>
.dark-input {
    --v-theme-on-surface-variant: white;
    color: white !important;
}
</style>
