import apiInstance from '@/core/api/axios';
import { routes } from '@/core/router/routes';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export class LoginService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiInstance.post<LoginResponse>('/auth/login', credentials);

    if (response.status !== 200) {
      throw new Error('Login failed');
    }

    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);

    window.location.href = routes.home;

    return response.data;
  }
}
