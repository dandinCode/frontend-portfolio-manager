<template>
    <v-navigation-drawer v-model="drawer" :rail="collapsed" permanent color="#0f172a">
        <div class="logo">
            <v-icon size="28">mdi-finance</v-icon>
            <span v-if="!collapsed">Portfolio</span>
        </div>
        <v-divider />
        <v-list nav density="compact">
            <v-list-item v-for="item in menu" :key="item.title" :to="item.to" link>
                <template #prepend>
                    <v-icon>{{ item.icon }}</v-icon>
                </template>

                <v-list-item-title v-if="!collapsed">
                    {{ item.title }}
                </v-list-item-title>
            </v-list-item>
        </v-list>

        <template #append>
            <v-divider />
            <v-list-item class="profile">
                <template #prepend>
                    <v-avatar size="32">
                        <v-img src="https://i.pravatar.cc/40" />
                    </v-avatar>
                </template>

                <v-list-item-title v-if="!collapsed">
                    João Silva
                </v-list-item-title>

                <template #append>
                    <v-menu>
                        <template #activator="{ props }">
                            <v-btn icon variant="text" v-bind="props">
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item @click="goProfile">
                                <v-list-item-title>Perfil</v-list-item-title>
                            </v-list-item>

                            <v-list-item @click="logout">
                                <v-list-item-title>Sair</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </template>
            </v-list-item>
            <div class="toggle">
                <v-btn icon variant="text" @click="collapsed = !collapsed">
                    <v-icon>
                        {{ collapsed ? 'mdi-chevron-right' : 'mdi-chevron-left' }}
                    </v-icon>
                </v-btn>
            </div>
        </template>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const drawer = ref(true)
const collapsed = ref(false)

const menu = [
    {
        title: 'Dashboard',
        icon: 'mdi-view-dashboard-outline',
        to: '/'
    },
    {
        title: 'Adicionar Ativo',
        icon: 'mdi-plus-circle-outline',
        to: '/AddSymbol'
    },
    {
        title: "Meus Portfólios",
        icon: "mdi-briefcase-outline",
        to: "/PortfolioList",
    },
    {
        title: 'Analisar Ações',
        icon: 'mdi-chart-line',
        to: '/RunModel'
    }
]

function goProfile() {
    router.push('/profile')
}

function logout() {
    localStorage.removeItem('token')
    router.push('/login')
}
</script>

<style scoped>
.logo {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 18px;
    font-weight: 600;
    color: white;
    font-size: 18px;
}

.profile {
    padding: 12px 16px;
}

.toggle {
    display: flex;
    justify-content: center;
    padding: 10px;
}
</style>