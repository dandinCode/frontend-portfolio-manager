import type { AxiosResponse } from 'axios';
import { api } from './http/api';
import type { AuthResponse } from '../types/types';

export async function createUser(
  name: string,
  email: string,
  password: string
) {
  const res: AxiosResponse<AuthResponse> = await api.post('/auth/register', {
    name,
    email,
    password,
  });

  return res.data;
}
