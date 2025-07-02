import apiInstance from '@/core/api/axios';
import { routes } from '@/core/router/routes';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  username: string;
  password: string;
}

export interface RegisterResponse {
  access_token: string;
  data: {
    id: number;
    email: string;
    username: string;
  }
}

export class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiInstance.post<LoginResponse>('/auth/login', credentials);

    if (response.status !== 200) {
      throw new Error('Login failed');
    }

    localStorage.setItem('accessToken', response.data.access_token);

    window.location.href = routes.home;

    return response.data;
  }

  async register (credentials: RegisterCredentials): Promise<RegisterResponse> {
    const response = await apiInstance.post<RegisterResponse>('/auth/register', credentials);

    if (response.status !== 201) {
      throw new Error('Registration failed');
    }

    localStorage.setItem('accessToken', response.data.access_token);

    window.location.href = routes.home;

    return response.data;
  }
}
