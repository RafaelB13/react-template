
import apiInstance from '@/core/api/axios';
import { BusinessError } from '@/core/errors/business-errors';
import { handleServiceError } from '@/core/errors/handle-error';
import { routes } from '@/core/router/routes';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  message?: string;
  isTwoFactorAuthenticationEnabled?: boolean;
  email?: string;
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
  };
}

export class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await apiInstance.post<LoginResponse>('/auth/login', credentials);

      if (response.status !== 200) {
        throw new BusinessError(response.data.message || 'Login failed');
      }

      if (response.data.isTwoFactorAuthenticationEnabled) {
        window.location.href = `${routes.two_factor_authentication}?email=${encodeURIComponent(credentials.email)}`;
        return response.data;
      }

      localStorage.setItem('accessToken', response.data.access_token);

      const user = await apiInstance.get('/users/me');

      localStorage.setItem('user', JSON.stringify(user.data));

      return response.data;
    } catch (error: unknown) {
      handleServiceError(error, 'Login failed');
    }
  }

  async register(credentials: RegisterCredentials): Promise<RegisterResponse> {
    try {
      const response = await apiInstance.post<RegisterResponse>('/auth/register', credentials);

      if (response.status !== 201) {
        throw new BusinessError('Registration failed');
      }

      localStorage.setItem('accessToken', response.data.access_token);
      return response.data;
    } catch (error: unknown) {
      handleServiceError(error, 'Registration failed');
    }
  }

  async twoFactorAuthentication(code: string, email: string): Promise<LoginResponse> {
    try {
      const response = await apiInstance.post<LoginResponse>('/auth/login/2fa', { code, email });

      if (response.status !== 200) {
        throw new BusinessError(response.data.message || 'Two-factor authentication failed');
      }

      localStorage.setItem('accessToken', response.data.access_token);

      const user = await apiInstance.get('/users/me');
      localStorage.setItem('user', JSON.stringify(user.data));

      return response.data;
    } catch (error: unknown) {
      handleServiceError(error, 'Two-factor authentication failed');
    }
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    window.location.href = routes.login;
  }

  async requestTwoFactorAuthentication(): Promise<{ message: string }> {
    try {
      const response = await apiInstance.post('/auth/2fa/enable/request');

      return response.data;
    } catch (error: unknown) {
      handleServiceError(error, 'Failed to request two-factor authentication.');
    }
  }

  async enableTwoFactorAuthentication(token: string): Promise<void> {
    try {
      await apiInstance.get(`/auth/2fa/enable?token=${token}`);
    } catch (error: unknown) {
      handleServiceError(error, 'Failed to enable two-factor authentication.');
    }
  }

  async disableTwoFactorAuthentication(): Promise<{ message: string }> {
    try {
      const response = await apiInstance.post('/auth/2fa/turn-off');

      if (response.status === 201) {
        return response.data;
      }

      return { message: 'Two-factor authentication was not disabled.' };
    } catch (error: unknown) {
      handleServiceError(error, 'Failed to disable two-factor authentication.');
    }
  }
}
