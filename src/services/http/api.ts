import axios from 'axios';
import { setupInterceptors } from './interceptors';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
});

setupInterceptors(api);
