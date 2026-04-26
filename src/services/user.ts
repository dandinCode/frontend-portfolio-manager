import type { AxiosResponse } from 'axios'
import { api } from './http/api'
import type { AuthResponse, LoginResponse } from '../types/types'

export async function createUser(name: string, email: string, password: string) {
  const res: AxiosResponse<AuthResponse> = await api.post('/auth/register', {
    name,
    email,
    password,
  })

  return res.data
}

export async function login(email: string, password: string) {
  const res: AxiosResponse<LoginResponse> = await api.post('/auth/login', {
    email,
    password,
  })

  return res.data
}

export async function updateUser(data: { name: string }) {
  const res = await api.put('/users/me', data)
  return res.data
}

export async function checkAuth() {
  try {
    await api.get('/auth/me')
    return true
  } catch {
    return false
  }
}

export async function logout() {
  await api.post('/auth/logout')
}
