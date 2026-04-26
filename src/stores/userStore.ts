import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login as loginService, createUser, logout as logoutService } from '@/services/user'

export const useUserStore = defineStore('user', () => {
  const loading = ref(false)
  const isAuthenticated = ref(false)

  async function login(email: string, password: string) {
    loading.value = true
    try {
      await loginService(email, password)
      isAuthenticated.value = true
    } finally {
      loading.value = false
    }
  }

  async function register(name: string, email: string, password: string) {
    loading.value = true

    try {
      await createUser(name, email, password)
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    await logoutService()
    isAuthenticated.value = false
  }

  return {
    loading,
    isAuthenticated,
    login,
    register,
    logout,
  }
})
