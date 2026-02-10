<template>
    <v-container fluid class="register-hero d-flex justify-center align-center">
        <v-card class="register-card pa-8" width="460" elevation="0">
            <div class="text-center mb-6">
                <h1 class="text-h4 text-white glow mb-2">Criar Conta</h1>
                <p class="text-grey-lighten-1">
                    Junte-se ao <strong>Talos</strong> e construa carteiras de investimento
                    com apoio quantitativo.
                </p>
            </div>

            <v-text-field v-model="name" label="Nome" variant="outlined" prepend-inner-icon="mdi-account-outline"
                class="text-white mb-4" />

            <v-text-field v-model="email" label="Email" type="email" variant="outlined"
                prepend-inner-icon="mdi-email-outline" class="text-white mb-4" />

            <PasswordField v-model="password" class="mb-6" />

            <v-btn color="blue-accent-3" size="large" block :loading="loading" :disabled="loading"
                @click="handleRegister">
                Criar Conta
            </v-btn>

            <div class="text-center mt-6">
                <span class="text-grey-lighten-1">Já tem conta?</span>
                <RouterLink to="/login" class="link">Entrar</RouterLink>
            </div>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { notify } from '@/utils/toast';
import { createUser } from '@/services/user';
import { isValidEmail, isValidName, isValidPassword } from '@/utils/validators';
import PasswordField from '@/components/PasswordField.vue';

const name = ref('');
const email = ref('');
const password = ref('');
const loading = ref(false);

async function handleRegister() {
    if (!name.value || !email.value || !password.value) {
        notify.error('Preencha todos os campos.');
        return;
    }

    if (!isValidName(name.value)) {
        notify.error('Nome inválido.');
        return;
    }

    if (!isValidEmail(email.value)) {
        notify.error('Email inválido.');
        return;
    }

    if (!isValidPassword(password.value)) {
        notify.error(
            'A senha deve ter no mínimo 8 caracteres, letras, números e um caractere especial.'
        );
        return;
    }

    loading.value = true;

    try {
        const { access_token } = await createUser(name.value, email.value, password.value);

        localStorage.setItem('token', access_token);

        notify.success('Conta criada com sucesso!');
    } catch (error: any) {
        const message =
            error?.response?.data?.message || 'Erro ao criar conta';

        notify.error(message);
    } finally {
        loading.value = false;
    }
}
</script>

<style scoped>
.register-hero {
    width: 100vw;
    min-height: 100vh;
    background: radial-gradient(circle at top, #1a237e, #0d1117);
}

.register-card {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.18);
    backdrop-filter: blur(14px);
    border-radius: 18px;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.register-card:hover {
    transform: scale(1.025);
    box-shadow:
        0 0 0 1px rgba(79, 140, 255, 0.25),
        0 0 45px rgba(79, 140, 255, 0.35);
}

.glow {
    text-shadow: 0 0 22px rgba(79, 140, 255, 0.7);
}

.link {
    margin-left: 6px;
    color: #4f8cff;
    text-decoration: none;
}

.link:hover {
    text-decoration: underline;
}
</style>
