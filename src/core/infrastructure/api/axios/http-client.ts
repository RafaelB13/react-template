import { IHttpClient } from '@/core/application/services/http-client.service';
import apiInstance from './instance';

export class AxiosHttpClient implements IHttpClient {
  async get<T>(url: string, config?: any): Promise<T> {
    const response = await apiInstance.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await apiInstance.post<T>(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await apiInstance.patch<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await apiInstance.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: any): Promise<T> {
    const response = await apiInstance.delete<T>(url, config);
    return response.data;
  }
}
