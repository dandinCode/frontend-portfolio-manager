import type { AxiosInstance } from 'axios';

export function setupInterceptors(api: AxiosInstance) {
  api.interceptors.response.use(
    (response) => response,

    (error) => {
      if (error.response) {
        const { status, data } = error.response;

        switch (status) {
          case 400:
            console.error('Requisição inválida', data?.message || data);
            break;
          case 401:
            console.error('Não autorizado.');
            break;
          case 403:
            console.error('Acesso proibido.');
            break;
          case 404:
            console.error('Recurso não encontrado.');
            break;
          case 500:
            console.error('Erro interno no servidor.');
            break;
          default:
            console.error(`Erro ${status}:`, data?.message || data);
        }
      } else if (error.request) {
        console.error('Erro de rede: Nenhuma resposta do servidor.');
      } else {
        console.error('Erro:', error.message);
      }

      return Promise.reject(error);
    }
  );
}
