<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { getUserInitials, decodeUTF8 } from '@/utils/user'
import { notify } from '@/utils/toast'
import { updateUser } from '@/services/user'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const name = ref('')
const loading = ref(false)

watch(
  user,
  (u) => {
    if (u && typeof u === 'object') {
      name.value = decodeUTF8(u.name || '')
    }
  },
  { immediate: true, deep: true },
)

const email = computed(() => (user.value && typeof user.value === 'object' ? user.value.email || '' : ''))
const initials = computed(() => getUserInitials(user.value && typeof user.value === 'object' ? user.value : {}))

const memberSince = computed(() => {
  const u = user.value
  if (!u || typeof u !== 'object' || !u.createdAt) return '-'

  return new Date(u.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
})

async function handleSave() {
  if (!name.value.trim()) {
    notify.warning('Nome é obrigatório')
    return
  }

  loading.value = true

  try {
    await updateUser({
      name: name.value
    })
    notify.success('Perfil atualizado com sucesso')
    await  userStore.loadUser()
  } catch (e: any) {
    notify.error(
      e?.response?.data?.message || 'Erro ao atualizar perfil'
    )
  } finally {
    loading.value = false
  }
}

function goBack() {
  router.back()
}
</script>

<template>
  <div class="profile-bg">
    <v-container class="profile-container">
      <div class="back-button">
        <v-btn variant="text" class="back-btn" @click="goBack">
          <v-icon start size="18">mdi-arrow-left</v-icon>
          Voltar
        </v-btn>
      </div>
      <v-card class="profile-card">
        <div class="card-header">
          <div class="header-icon">
            <v-icon size="28" color="#B99D75">mdi-account-circle</v-icon>
          </div>
          <h2 class="card-title">Meu Perfil</h2>
          <p class="card-subtitle">Gerencie suas informações pessoais</p>
        </div>

        <v-divider class="divider" />

        <v-card-text class="card-content">
          <div class="avatar-wrapper">
            <v-avatar size="100" class="avatar">
              <span class="avatar-text text-h5 font-weight-bold">
                {{ initials }}
              </span>
            </v-avatar>
            <div class="avatar-badge">
              <v-icon size="16" color="#1C2D41">mdi-check</v-icon>
            </div>
          </div>
          <div class="form-fields">
            <div class="field-wrapper">
              <label class="field-label">
                <v-icon size="16" color="#B99D75" class="mr-1">mdi-account-outline</v-icon>
                Nome completo
              </label>
              <v-text-field v-model="name" placeholder="Seu nome completo" variant="outlined" class="custom-input"
                bg-color="rgba(0,0,0,0.2)" :loading="loading">
                <template #append-inner>
                  <v-icon v-if="name" size="18" color="#22c55e" class="valid-icon">mdi-check-circle</v-icon>
                </template>
              </v-text-field>
              <p class="field-hint">Seu nome será usado para identificação na plataforma</p>
            </div>
            <div class="field-wrapper">
              <label class="field-label">
                <v-icon size="16" color="#B99D75" class="mr-1">mdi-email-outline</v-icon>
                Email
              </label>
              <v-text-field :model-value="email" variant="outlined" readonly disabled class="custom-input readonly-field"
                bg-color="rgba(0,0,0,0.15)">
                <template #append-inner>
                  <v-chip size="x-small" color="#B99D75" variant="tonal" class="readonly-chip">
                    não editável
                  </v-chip>
                </template>
              </v-text-field>
              <p class="field-hint">O email não pode ser alterado. Entre em contato com o suporte para mais informações.
              </p>
            </div>
          </div>
          <div class="info-box">
            <div class="info-item">
              <v-icon size="18" color="#B99D75">mdi-shield-check</v-icon>
              <span>Dados protegidos com criptografia</span>
            </div>
            <div class="info-item">
              <v-icon size="18" color="#B99D75">mdi-clock-outline</v-icon>
              <span>Membro desde: {{ memberSince }}</span>
            </div>
          </div>
        </v-card-text>

        <v-divider class="divider" />

        <v-card-actions class="card-actions">
          <v-btn class="cancel-btn" variant="outlined" @click="goBack">
            Cancelar
          </v-btn>
          <v-btn class="save-btn" :loading="loading" @click="handleSave">
            <v-icon start size="18">mdi-content-save</v-icon>
            Salvar alterações
          </v-btn>
        </v-card-actions>
      </v-card>
      <div class="footer-note">
        <p>
          <v-icon size="14" color="#B99D75">mdi-lock-outline</v-icon>
          Suas informações estão seguras e são utilizadas apenas para personalização da sua experiência.
        </p>
      </div>
    </v-container>
  </div>
</template>

<style scoped>
.profile-bg {
  min-height: 100vh;
  background: radial-gradient(circle at top, #1C2D41 0%, #0f1a24 100%);
  padding: 40px 20px;
}

.profile-container {
  max-width: 520px;
  margin: 0 auto;
}

.back-button {
  margin-bottom: 16px;
}

.back-btn {
  color: #FFFCEF !important;
  text-transform: none;
  letter-spacing: normal;
  border-radius: 40px !important;
  background: rgba(185, 157, 117, 0.1) !important;
}

.back-btn:hover {
  background: rgba(185, 157, 117, 0.2) !important;
  color: #B99D75 !important;
}

.profile-card {
  background: rgba(28, 45, 65, 0.85) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(185, 157, 117, 0.2);
  border-radius: 28px !important;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
}

.card-header {
  text-align: center;
  padding: 32px 32px 20px;
  background: linear-gradient(135deg, rgba(185, 157, 117, 0.08), rgba(185, 157, 117, 0.02));
}

.header-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, rgba(185, 157, 117, 0.15), rgba(185, 157, 117, 0.05));
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  border: 1px solid rgba(185, 157, 117, 0.3);
}

.card-title {
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #FFFCEF 0%, #B99D75 70%, #8B7355 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 8px 0;
}

.card-subtitle {
  color: rgba(255, 252, 239, 0.6);
  font-size: 14px;
  margin: 0;
}

.divider {
  background: rgba(185, 157, 117, 0.15) !important;
  margin: 0 24px;
}

.card-content {
  padding: 32px !important;
}

.avatar-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
}

.avatar {
  background: linear-gradient(135deg, #B99D75 0%, #9b835f 50%, #7a6349 100%) !important;
  box-shadow: 0 8px 20px rgba(185, 157, 117, 0.3);
}

.avatar-text {
  color: #1C2D41;
  font-weight: 700;
}

.avatar-badge {
  position: absolute;
  bottom: 0;
  right: 38%;
  background: #22c55e;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #0f1a24;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.field-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  color: #FFFCEF;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.custom-input :deep(.v-field) {
  background: rgba(0, 0, 0, 0.2) !important;
  border-radius: 14px !important;
}

.custom-input :deep(.v-field__outline) {
  color: #B99D75;
  --v-field-border-opacity: 0.3;
}

.custom-input :deep(.v-field--focused .v-field__outline) {
  --v-field-border-opacity: 0.6;
}

.custom-input :deep(label) {
  color: rgba(255, 252, 239, 0.6) !important;
}

.custom-input :deep(input) {
  color: #FFFCEF !important;
}

.readonly-field :deep(.v-field) {
  background: rgba(0, 0, 0, 0.15) !important;
}

.readonly-field :deep(input) {
  color: rgba(255, 252, 239, 0.5) !important;
}

.readonly-chip {
  background: rgba(185, 157, 117, 0.15) !important;
  color: #B99D75 !important;
  font-size: 10px;
}

.valid-icon {
  opacity: 0.7;
}

.field-hint {
  color: rgba(255, 252, 239, 0.4);
  font-size: 11px;
  margin: 4px 0 0 0;
}

.info-box {
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(185, 157, 117, 0.15);
  border-radius: 16px;
  padding: 16px;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(255, 252, 239, 0.6);
  font-size: 13px;
}

.card-actions {
  padding: 24px 32px 32px !important;
  gap: 16px;
}

.cancel-btn {
  background: transparent !important;
  border: 1px solid rgba(185, 157, 117, 0.3) !important;
  color: #FFFCEF !important;
  text-transform: none;
  border-radius: 40px !important;
  padding: 8px 24px !important;
  flex: 1;
}

.cancel-btn:hover {
  background: rgba(185, 157, 117, 0.1) !important;
  border-color: #B99D75 !important;
}

.save-btn {
  background: linear-gradient(135deg, #B99D75 0%, #9b835f 100%) !important;
  color: #1C2D41 !important;
  font-weight: 600;
  text-transform: none;
  border-radius: 40px !important;
  padding: 8px 24px !important;
  flex: 1;
  transition: all 0.3s ease;
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(185, 157, 117, 0.3);
}

.save-btn:disabled {
  opacity: 0.5;
  transform: none;
}

.footer-note {
  text-align: center;
  margin-top: 24px;
  padding: 16px;
}

.footer-note p {
  color: rgba(255, 252, 239, 0.4);
  font-size: 12px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

@media (max-width: 600px) {
  .profile-bg {
    padding: 20px 16px;
  }

  .card-header {
    padding: 24px 20px 16px;
  }

  .card-title {
    font-size: 24px;
  }

  .card-content {
    padding: 24px !important;
  }

  .card-actions {
    flex-direction: column;
    padding: 20px 24px 24px !important;
  }

  .avatar-badge {
    right: 34%;
  }

  .info-box {
    padding: 12px;
  }
}
</style>