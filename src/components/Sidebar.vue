<template>
    <v-navigation-drawer v-model="drawer" :rail="collapsed" permanent class="talos-sidebar">
        <div class="logo" :class="{ 'logo-rail': collapsed }">
            <div class="logo-icon">
                <v-img :src="logo" width="32" height="32" />
            </div>
            <span v-if="!collapsed" class="logo-text">Talos</span>
        </div>
        <v-divider class="divider" />
        <v-list nav density="compact" class="nav-list">
            <v-list-item v-for="item in menu" :key="item.title" :to="item.to" link class="nav-item">
                <template #prepend>
                    <v-icon class="nav-icon">{{ item.icon }}</v-icon>
                </template>

                <v-list-item-title v-if="!collapsed" class="nav-title">
                    {{ item.title }}
                </v-list-item-title>
            </v-list-item>
        </v-list>

        <template #append>
            <v-divider class="divider" />
            <v-list-item class="profile" :class="{ 'profile-rail': collapsed }">
                <template #prepend>
                    <v-avatar size="32" class="avatar">
                        <span class="avatar-text">{{ initials }}</span>
                    </v-avatar>
                </template>
                <v-list-item-title v-if="!collapsed" class="profile-name">
                    {{ firstName }}
                </v-list-item-title>
                <template #append>
                    <v-menu offset="7">
                        <template #activator="{ props }">
                            <v-btn icon variant="text" v-bind="props" class="menu-btn">
                                <v-icon size="20">mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-list class="menu-list">
                            <v-list-item @click="goProfile" class="menu-item">
                                <template #prepend>
                                    <v-icon size="18" class="menu-icon">mdi-account-outline</v-icon>
                                </template>
                                <v-list-item-title>Perfil</v-list-item-title>
                            </v-list-item>
                            <v-divider class="menu-divider" />
                            <v-list-item @click="logout" class="menu-item logout-item">
                                <template #prepend>
                                    <v-icon size="18" class="menu-icon">mdi-logout</v-icon>
                                </template>
                                <v-list-item-title>Sair</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </template>
            </v-list-item>
            <div class="toggle" :class="{ 'toggle-rail': collapsed }">
                <v-btn icon variant="text" class="toggle-btn" @click="collapsed = !collapsed">
                    <v-icon size="20">
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
import { getUserFirstName, getUserInitials } from "@/utils/user"
import logo from '@/assets/talos_logo.png'

const router = useRouter()

const drawer = ref(true)
const collapsed = ref(false)
const firstName = getUserFirstName()
const initials = getUserInitials()

const menu = [
    {
        title: 'Dashboard',
        icon: 'mdi-view-dashboard-outline',
        to: '/Dashboard'
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
    router.push('/ProfileView')
}

function logout() {
    localStorage.removeItem('token')
    router.push('/login')
}
</script>

<style scoped>
.talos-sidebar {
    background: #1C2D41 !important;
    border-right: 1px solid rgba(185, 157, 117, 0.15) !important;
}

.logo {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 24px 18px;
    transition: all 0.2s ease;
}

.logo-rail {
    justify-content: center;
    padding: 24px 0;
}

.logo-icon {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(185, 157, 117, 0.15), rgba(185, 157, 117, 0.05));
    border-radius: 12px;
    flex-shrink: 0;
}

.logo-text {
    font-weight: 700;
    font-size: 20px;
    background: linear-gradient(135deg, #B99D75 0%, #e6d5b8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.5px;
}

.divider {
    background: rgba(185, 157, 117, 0.15) !important;
    margin: 4px 0;
}

.nav-list {
    padding: 8px 12px;
}

.nav-item {
    border-radius: 12px !important;
    margin: 4px 0 !important;
    transition: all 0.2s ease !important;
}

.nav-item :deep(.v-list-item__prepend) {
    margin-right: 16px;
}

.nav-icon {
    color: rgba(255, 252, 239, 0.6) !important;
    transition: color 0.2s ease;
    font-size: 22px;
}

.nav-title {
    color: rgba(255, 252, 239, 0.8) !important;
    font-weight: 500;
    font-size: 14px;
}

.nav-item:hover {
    background: rgba(185, 157, 117, 0.1) !important;
}

.nav-item:hover .nav-icon {
    color: #B99D75 !important;
}

.nav-item:hover .nav-title {
    color: #FFFCEF !important;
}

.nav-item :deep(.v-list-item--active) {
    background: rgba(185, 157, 117, 0.15) !important;
}

.nav-item :deep(.v-list-item--active) .nav-icon {
    color: #B99D75 !important;
}

.nav-item :deep(.v-list-item--active) .nav-title {
    color: #FFFCEF !important;
    font-weight: 600;
}

.profile {
    padding: 12px 16px !important;
    margin: 8px 12px !important;
    border-radius: 12px !important;
    transition: all 0.2s ease;
    display: flex !important;
    align-items: center !important;
}

.profile-rail {
    justify-content: center !important;
    padding: 12px 0 !important;
    margin: 8px 0 !important;
}

.profile:hover {
    background: rgba(185, 157, 117, 0.08) !important;
}

.avatar {
    background: linear-gradient(135deg, #B99D75 0%, #9b835f 100%) !important;
    color: #1C2D41 !important;
    font-weight: 700;
    font-size: 14px;
    flex-shrink: 0;
}

.avatar-text {
    font-weight: 700;
    font-size: 13px;
    color: #1C2D41;
}

.profile-name {
    color: #FFFCEF !important;
    font-weight: 500;
    font-size: 14px;
}

.menu-btn {
    color: rgba(255, 252, 239, 0.5) !important;
    transition: color 0.2s ease;
}

.menu-btn:hover {
    color: #B99D75 !important;
    background: rgba(185, 157, 117, 0.1) !important;
}

.menu-list {
    background: #1C2D41 !important;
    border: 1px solid rgba(185, 157, 117, 0.2) !important;
    border-radius: 12px !important;
    padding: 8px !important;
    min-width: 160px;
}

.menu-item {
    border-radius: 8px !important;
    margin: 2px 0 !important;
    color: #FFFCEF !important;
    transition: all 0.2s ease;
}

.menu-item :deep(.v-list-item__prepend) {
    margin-right: 12px;
}

.menu-icon {
    color: rgba(255, 252, 239, 0.6) !important;
}

.menu-item:hover {
    background: rgba(185, 157, 117, 0.1) !important;
    color: #B99D75 !important;
}

.menu-item:hover .menu-icon {
    color: #B99D75 !important;
}

.logout-item:hover {
    background: rgba(185, 157, 117, 0.1) !important;
}

.logout-item:hover .menu-icon {
    color: #B99D75 !important;
}

.menu-divider {
    background: rgba(185, 157, 117, 0.15) !important;
    margin: 4px 0;
}

.toggle {
    display: flex;
    justify-content: center;
    padding: 16px 0 20px;
    transition: all 0.2s ease;
}

.toggle-rail {
    padding: 16px 0 20px;
    justify-content: center;
}

.toggle-btn {
    color: rgba(255, 252, 239, 0.5) !important;
    transition: all 0.2s ease;
}

.toggle-btn:hover {
    color: #B99D75 !important;
    background: rgba(185, 157, 117, 0.1) !important;
}

.talos-sidebar :deep(.v-navigation-drawer--rail) {
    overflow-x: visible !important;
}

.talos-sidebar :deep(.v-navigation-drawer--rail) .logo {
    justify-content: center;
    padding: 24px 0;
}

.talos-sidebar :deep(.v-navigation-drawer--rail) .profile {
    justify-content: center !important;
    padding: 12px 0 !important;
    margin: 8px 0 !important;
    width: 100% !important;
}

.talos-sidebar :deep(.v-navigation-drawer--rail) .avatar {
    margin: 0 !important;
}

.talos-sidebar :deep(.v-navigation-drawer--rail) .profile .v-list-item__append {
    display: none !important;
}

.talos-sidebar :deep(.v-navigation-drawer--rail) .nav-item {
    justify-content: center;
    padding: 12px 0 !important;
}

.talos-sidebar :deep(.v-navigation-drawer--rail) .nav-item .v-list-item__prepend {
    margin-right: 0 !important;
}

.talos-sidebar :deep(.v-navigation-drawer--rail) .toggle {
    padding: 16px 0 20px;
    justify-content: center;
}
</style>