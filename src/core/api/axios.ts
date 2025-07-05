import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import { useLoadingStore } from '../stores/use-loading.store';
import { ApiError, ApiResponse } from './types';
import { handleAxiosError } from './utils';

const API_BASE_URL = import.meta.env.API_BASE_URL || 'http://localhost:3000';

const apiInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
  },
  timeout: 10000,
});

apiInstance.interceptors.request.use(
  (config) => {
    useLoadingStore.getState().incrementRequestCount();
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    useLoadingStore.getState().decrementRequestCount();
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor:
 * Processes successful responses and handles API errors.
 */
apiInstance.interceptors.response.use(
  <T>(response: AxiosResponse<T>): AxiosResponse<ApiResponse<T>> => {
    useLoadingStore.getState().decrementRequestCount();
    return {
      ...response,
      data: response.data,
      statusCode: response.status,
      message: 'Request successful',
    } as AxiosResponse<ApiResponse<T>>;
  },
  (error: AxiosError) => {
    useLoadingStore.getState().decrementRequestCount();
    const apiError: ApiError = handleAxiosError(error);

    const authRoutes = ['/login', '/signup', '/two-factor-authentication'];
    const isAuthRoute = authRoutes.includes(window.location.pathname);

    if (apiError.statusCode === 401 && !isAuthRoute) {
      window.location.href = '/login';
    }

    return Promise.reject(apiError); // Rejects the Promise with the standardized error
  }
);

export default apiInstance;
