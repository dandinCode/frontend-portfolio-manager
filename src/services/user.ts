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
