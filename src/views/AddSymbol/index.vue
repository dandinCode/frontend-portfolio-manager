<template>
  <v-container class="d-flex justify-center align-center" style="height: 90vh">
    <v-card width="450" class="pa-6" elevation="8">
      <h2 class="text-h5 mb-4 text-center">Cadastrar Novo Símbolo</h2>

      <v-text-field v-model="symbol" label="Símbolo da Ação (ex: PETR4)" :error="symbolError"
        error-message="Formato inválido" variant="outlined" />

      <v-btn class="mt-4" color="primary" block :loading="loading" @click="handleSubmit">
        Registrar Símbolo
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { createStock } from "../../services/stocks";
import { notify } from '@/utils/toast';
import { isValidStockSymbol } from '@/utils/validators';
import { computed } from 'vue';

const symbol = ref("");
const loading = ref(false);

const symbolError = computed(() =>
  symbol.value.length > 0 && !isValidStockSymbol(symbol.value)
);

async function handleSubmit() {
  loading.value = true;

  try {
    if (!symbol.value) {
      notify.error('Preencha todos os campos.');
      return;
    }

    const normalizedSymbol = symbol.value.trim().toUpperCase()

    if (!isValidStockSymbol(normalizedSymbol)) {
      notify.warning(
        'Símbolo inválido. Use apenas letras e números (ex: PETR4, AAPL).'
      );
      return;
    }

    await createStock(normalizedSymbol);

    notify.success('Símbolo registrado com sucesso!');
    symbol.value = '';
  } catch (error: any) {
    if (error?.response?.status === 409) {
      notify.error('Símbolo já existe!');
    } else {
      notify.error('Erro ao registrar símbolo.');
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
