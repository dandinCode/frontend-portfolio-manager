<script setup lang="ts">
import { ref } from 'vue'
import { getUserFromToken, getUserInitials, decodeUTF8 } from '@/utils/user'
import { notify } from '@/utils/toast'
import { updateUser } from '@/services/user'

const user = getUserFromToken()

const name = ref(decodeUTF8(user?.name || ''))
const email = ref(user?.email || '')

const initials = getUserInitials()

const loading = ref(false)

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
  } catch (e: any) {
    notify.error(
      e?.response?.data?.message || 'Erro ao atualizar perfil'
    )
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-container class="profile-container">
    <v-card class="profile-card">
      <v-card-text class="text-center">

        <v-avatar size="80" class="avatar mb-4">
          <span class="text-h6 font-weight-bold">
            {{ initials }}
          </span>
        </v-avatar>

        <v-text-field
          v-model="name"
          label="Nome"
          variant="outlined"
          class="mb-3"
        />

        <v-text-field
          v-model="email"
          label="Email"
          variant="outlined"
          readonly
        />

        <v-btn
          class="mt-4"
          color="primary"
          block
          :loading="loading"
          @click="handleSave"
        >
          Salvar alterações
        </v-btn>

      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.profile-container {
  max-width: 400px;
  margin: 80px auto;
}

.profile-card {
  background: #0f172a;
  border-radius: 16px;
  padding: 20px;
}

.avatar {
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: white;
}
</style>