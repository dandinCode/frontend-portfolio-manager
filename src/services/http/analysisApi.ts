import axios from 'axios';
import { setupInterceptors } from './interceptors';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const analysisApi = axios.create({
  baseURL: BASE_URL,
  timeout: 120_000,
});

setupInterceptors(analysisApi);
