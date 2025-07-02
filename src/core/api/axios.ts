import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import { ApiError, ApiResponse } from './types';
import { handleAxiosError } from './utils';

const API_BASE_URL = import.meta.env.API_BASE_URL || 'http://localhost:3000';

const apiInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000, // Set a timeout for requests
});

apiInstance.interceptors.request.use(
  (config) => {
    // You can add any request interceptors here, like adding auth tokens
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor de Resposta:
 * Processa respostas bem-sucedidas e trata erros da API.
 */
apiInstance.interceptors.response.use(
  <T>(response: AxiosResponse<T>): AxiosResponse<ApiResponse<T>> => {
    // Retorna a resposta, opcionalmente encapsulando em ApiResponse
    // Se sua API já retorna um objeto com 'data', 'message', etc., adapte aqui.
    return {
      ...response,
      data: response.data,
      statusCode: response.status,
      message: 'Request successful',
    } as AxiosResponse<ApiResponse<T>>;
  },
  (error: AxiosError) => {
    // Tratar erros de resposta
    const apiError: ApiError = handleAxiosError(error);

    // Exemplo: Redirecionar para login em caso de 401 Unauthorized
    if (apiError.statusCode === 401) {
      window.location.href = '/login'; // Descomente para implementar redirecionamento
    }

    return Promise.reject(apiError); // Rejeita a Promise com o erro padronizado
  }
);

export default apiInstance;
