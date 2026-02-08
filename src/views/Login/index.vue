<template>
    <v-container fluid class="login-hero d-flex justify-center align-center">
        <v-card class="login-card pa-8" width="460" elevation="0">
            <div class="text-center mb-6">
                <h1 class="text-h4 text-white glow mb-2">Entrar</h1>
                <p class="text-grey-lighten-1">
                    Acesse sua conta e gerencie suas carteiras no <strong>Talos</strong>.
                </p>
            </div>

            <v-text-field v-model="email" label="Email" type="email" variant="outlined"
                prepend-inner-icon="mdi-email-outline" class="text-white mb-4" />

            <v-text-field v-model="password" label="Senha" type="password" variant="outlined"
                prepend-inner-icon="mdi-lock-outline" class="text-white mb-6" />

            <v-btn color="blue-accent-3" size="large" block :loading="loading" :disabled="loading" @click="handleLogin">
                Entrar
            </v-btn>

            <div class="text-center mt-6">
                <span class="text-grey-lighten-1">Não tem conta?</span>
                <RouterLink to="/register" class="link">Criar conta</RouterLink>
            </div>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { notify } from '@/utils/toast';
import { login } from '@/services/user';
import { isValidEmail } from '@/utils/validators';
const router = useRouter();

const email = ref('');
const password = ref('');
const loading = ref(false);

</script>

<style scoped>
.login-hero {
    width: 100vw;
    min-height: 100vh;
    background: radial-gradient(circle at top, #1a237e, #0d1117);
}

.login-card {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.18);
    backdrop-filter: blur(14px);
    border-radius: 18px;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.login-card:hover {
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
