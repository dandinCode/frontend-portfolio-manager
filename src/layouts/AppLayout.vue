<template>
    <v-app>
        <Sidebar />

        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
</script>