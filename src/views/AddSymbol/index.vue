<template>
  <div class="add-symbol-bg">
    <v-container class="d-flex justify-center align-center" style="min-height: 90vh">
      <v-card class="symbol-card" elevation="24">
        <div class="card-decoration">
          <div class="decoration-bar"></div>
          <div class="decoration-glow"></div>
        </div>

        <div class="card-header">
          <v-avatar size="70" class="header-avatar">
            <v-icon size="36" color="#ffd700">mdi-plus-circle</v-icon>
          </v-avatar>
          <h2 class="text-h4 font-weight-bold gradient-text">Novo Símbolo</h2>
          <p class="text-subtitle-1 text-grey">Adicione um novo ativo à base de dados</p>
        </div>

        <v-card-text class="card-content">
          <div class="input-wrapper">
            <v-text-field
              v-model="symbol"
              label="Símbolo da Ação"
              placeholder="ex: PETR4, VALE3, ITUB4"
              :error="symbolError"
              :error-messages="symbolError ? 'Formato inválido. Use apenas letras e números.' : ''"
              variant="outlined"
              class="symbol-input"
              bg-color="rgba(255,255,255,0.02)"
              hide-details="auto"
              @keyup.enter="handleSubmit"
            >
              <template #prepend>
                <v-icon color="#ffd700" size="22">mdi-cash</v-icon>
              </template>

              <template #append>
                <v-chip
                  v-if="symbol && !symbolError"
                  size="small"
                  color="success"
                  variant="tonal"
                  class="valid-chip"
                >
                  <v-icon start size="14">mdi-check-circle</v-icon>
                  válido
                </v-chip>
              </template>
            </v-text-field>

            <div class="examples mt-2">
              <span class="examples-label">Exemplos:</span>
              <v-chip
                v-for="ex in examples"
                :key="ex"
                size="x-small"
                variant="tonal"
                color="grey-darken-2"
                class="example-chip"
                @click="symbol = ex"
              >
                {{ ex }}
              </v-chip>
            </div>
          </div>

          <v-expand-transition>
            <v-alert
              v-if="symbol && !symbolError"
              type="info"
              variant="tonal"
              class="info-alert mt-4"
              density="compact"
            >
              <div class="d-flex align-center">
                <span>O símbolo <strong>{{ symbol.toUpperCase() }}</strong> será verificado no Yahoo Finance.</span>
              </div>
            </v-alert>
          </v-expand-transition>
          <div class="stats-section mt-6">
            <div class="stat-item">
              <span class="stat-value">{{ totalSymbols }}</span>
              <span class="stat-label">ativos cadastrados</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-value">{{ lastUpdate }}</span>
              <span class="stat-label">última atualização</span>
            </div>
          </div>
        </v-card-text>

        <v-divider class="mx-6" :style="{ borderColor: 'rgba(255,215,0,0.1)' }" />

        <v-card-actions class="pa-6">
          <v-btn
            class="submit-btn"
            block
            :loading="loading"
            @click="handleSubmit"
          >
            <template #prepend>
              <v-icon>mdi-plus</v-icon>
            </template>
            Registrar Símbolo
          </v-btn>
        </v-card-actions>

        <div class="card-footer">
          <p class="text-caption text-grey">
            <v-icon size="14" color="#ffd700" class="mr-1">mdi-lightbulb-outline</v-icon>
            Dica: Para ações brasileiras, use o código sem .SA (ex: PETR4)
          </p>
        </div>
      </v-card>
    </v-container>

    <v-snackbar
      v-model="showToast"
      :color="toastColor"
      :timeout="3000"
      location="top"
    >
      <div class="d-flex align-center">
        <v-icon :color="toastIconColor" class="mr-3">{{ toastIcon }}</v-icon>
        <span>{{ toastMessage }}</span>
      </div>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { createStock } from "../../services/stocks";
import { isValidStockSymbol } from '@/utils/validators';

const symbol = ref("");
const loading = ref(false);

const showToast = ref(false);
const toastMessage = ref('');
const toastColor = ref('');
const toastIcon = ref('');
const toastIconColor = ref('');

const examples = ['PETR4', 'VALE3', 'ITUB4', 'ELET3', 'BPAC11'];

const totalSymbols = ref(124);
const lastUpdate = ref(new Date().toLocaleDateString('pt-BR'));

const symbolError = computed(() =>
  symbol.value.length > 0 && !isValidStockSymbol(symbol.value)
);

function showNotification(type: 'success' | 'error' | 'warning', message: string) {
  toastMessage.value = message;
  
  switch (type) {
    case 'success':
      toastColor.value = '#1e2a1e';
      toastIcon.value = 'mdi-check-circle';
      toastIconColor.value = '#22c55e';
      break;
    case 'error':
      toastColor.value = '#2a1e1e';
      toastIcon.value = 'mdi-alert-circle';
      toastIconColor.value = '#ef4444';
      break;
    case 'warning':
      toastColor.value = '#2a241e';
      toastIcon.value = 'mdi-alert';
      toastIconColor.value = '#f59e0b';
      break;
  }
  
  showToast.value = true;
}

async function handleSubmit() {
  loading.value = true;

  try {
    if (!symbol.value) {
      showNotification('warning', 'Preencha todos os campos.');
      return;
    }

    const normalizedSymbol = symbol.value.trim().toUpperCase();

    if (!isValidStockSymbol(normalizedSymbol)) {
      showNotification('warning', 'Símbolo inválido. Use apenas letras e números.');
      return;
    }

    await createStock(normalizedSymbol);

    showNotification('success', 'Símbolo registrado com sucesso!');
    symbol.value = '';
    
    totalSymbols.value++;
  } catch (error: any) {
    if (error?.response?.status === 409) {
      showNotification('error', 'Símbolo já existe na base de dados!');
    } else {
      showNotification('error', 'Erro ao registrar símbolo.');
    }
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.add-symbol-bg {
  min-height: 100vh;
  background: radial-gradient(circle at top, #291f01, #050400);
  position: relative;
  overflow: hidden;
}

.add-symbol-bg::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(255, 215, 0, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
}

.symbol-card {
  width: 500px;
  background: rgba(10, 8, 3, 0.9) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 215, 0, 0.15);
  border-radius: 32px !important;
  position: relative;
  overflow: hidden;
  animation: slideUp 0.5s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 8px;
  background: linear-gradient(90deg, transparent, #ffd700, transparent);
  opacity: 0.5;
}

.decoration-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #ffd700, transparent);
}

.decoration-glow {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 60px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%);
  filter: blur(20px);
}

.card-header {
  text-align: center;
  padding: 40px 40px 20px;
}

.header-avatar {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05));
  border: 2px solid rgba(255, 215, 0, 0.3);
  margin-bottom: 16px;
  transition: all 0.3s ease;
}

.symbol-card:hover .header-avatar {
  transform: scale(1.05);
  border-color: #ffd700;
}

.gradient-text {
  background: linear-gradient(135deg, #ffd700, #b8860b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
}

.text-grey {
  color: #b0a580 !important;
}

.card-content {
  padding: 20px 40px !important;
}

.input-wrapper {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 24px;
  border: 1px solid rgba(255, 215, 0, 0.1);
}

.symbol-input :deep(.v-field) {
  background: rgba(0, 0, 0, 0.3) !important;
  border-radius: 16px !important;
}

.symbol-input :deep(.v-field__outline) {
  --v-field-border-opacity: 0.2;
  color: #ffd700;
}

.symbol-input :deep(.v-field--focused .v-field__outline) {
  --v-field-border-opacity: 0.5;
}

.symbol-input :deep(label) {
  color: #b0a580 !important;
}

.symbol-input :deep(input) {
  color: white !important;
  font-weight: 500;
}

.valid-chip {
  background: rgba(34, 197, 94, 0.1) !important;
  color: #22c55e !important;
  pointer-events: none;
}

.examples {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.examples-label {
  color: #b0a580;
  font-size: 12px;
  margin-right: 4px;
}

.example-chip {
  background: rgba(255, 215, 0, 0.05) !important;
  color: #b0a580 !important;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.example-chip:hover {
  background: rgba(255, 215, 0, 0.15) !important;
  color: #ffd700 !important;
  border-color: rgba(255, 215, 0, 0.3);
}

.info-alert {
  background: rgba(255, 215, 0, 0.05) !important;
  border: 1px solid rgba(255, 215, 0, 0.15) !important;
  color: #b0a580 !important;
  border-radius: 12px !important;
}

.stats-section {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  padding: 16px;
  border: 1px solid rgba(255, 215, 0, 0.1);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #ffd700;
  line-height: 1.2;
}

.stat-label {
  font-size: 11px;
  color: #b0a580;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-divider {
  width: 1px;
  height: 30px;
  background: rgba(255, 215, 0, 0.2);
}

.submit-btn {
  background: linear-gradient(135deg, #ffd700, #b8860b) !important;
  color: #050400 !important;
  font-weight: 700;
  font-size: 16px;
  padding: 24px !important;
  border-radius: 16px !important;
  text-transform: none;
  letter-spacing: 0.5px;
  transition: all 0.3s ease !important;
  position: relative;
  overflow: hidden;
}

.submit-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.submit-btn:hover::before {
  left: 100%;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  filter: grayscale(0.5);
}

.card-footer {
  padding: 20px 40px;
  text-align: center;
  background: rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(255, 215, 0, 0.05);
}

:deep(.v-snackbar__content) {
  padding: 16px 20px !important;
  font-weight: 500;
}

:deep(.v-snackbar--variant-tonal) {
  border: 1px solid rgba(255, 215, 0, 0.15) !important;
}

@media (max-width: 600px) {
  .symbol-card {
    width: 90%;
    margin: 20px;
  }

  .card-header {
    padding: 30px 20px 15px;
  }

  .card-content {
    padding: 15px 20px !important;
  }

  .input-wrapper {
    padding: 16px;
  }

  .stat-value {
    font-size: 20px;
  }

  .stat-label {
    font-size: 10px;
  }

  .submit-btn {
    padding: 20px !important;
  }

  .card-footer {
    padding: 15px 20px;
  }
}
</style>