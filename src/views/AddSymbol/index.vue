<template>
  <v-container class="d-flex justify-center align-center" style="height: 90vh">
    <v-card width="450" class="pa-6" elevation="8">
      <h2 class="text-h5 mb-4 text-center">Cadastrar Novo Símbolo</h2>

      <v-text-field v-model="symbol" label="Símbolo da Ação (ex: PETR4)" variant="outlined" density="comfortable"
        prepend-inner-icon="mdi-format-letter-case" />

      <v-text-field v-model="createdById" label="ID do Usuário" type="number" variant="outlined" density="comfortable"
        prepend-inner-icon="mdi-account" />

      <v-btn class="mt-4" color="primary" block :loading="loading" @click="handleSubmit">
        Registrar Símbolo
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { createStock } from "../../services/stocks";
import { notify } from '@/utils/toast'

const symbol = ref("");
const createdById = ref<number | null>(null);
const loading = ref(false);

async function handleSubmit() {
  loading.value = true;

  try {
    if (!symbol.value || !createdById.value) {
      notify.error('Preencha todos os campos.')
      loading.value = false;
      return;
    }

    await createStock(symbol.value.trim(), createdById.value);

    notify.success('Símbolo registrado com sucesso!')
    symbol.value = "";
    createdById.value = null;
  } catch (error: any) {
    if (error?.response?.status === 409) {
      notify.error('Símbolo já existe!')
    } else {
      notify.error('Erro ao registrar símbolo.')
    }
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
h2 {
  font-weight: 600;
}
</style>
