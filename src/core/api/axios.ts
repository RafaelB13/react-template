import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

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
 * Response Interceptor:
 * Processes successful responses and handles API errors.
 */
apiInstance.interceptors.response.use(
  <T>(response: AxiosResponse<T>): AxiosResponse<ApiResponse<T>> => {
    // Returns the response, optionally wrapping it in ApiResponse
    // If your API already returns an object with 'data', 'message', etc., adapt here.
    return {
      ...response,
      data: response.data,
      statusCode: response.status,
      message: 'Request successful',
    } as AxiosResponse<ApiResponse<T>>;
  },
  (error: AxiosError) => {
    // Handle response errors
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
