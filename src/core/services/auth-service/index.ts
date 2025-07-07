import apiInstance from '@/core/api/axios';
import { BusinessError } from '@/core/errors/business-errors';
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
      if (error instanceof BusinessError) throw error;
      // Try to extract the error message from the API response, if it exists
      let apiMessage = 'Unknown error';
      if (typeof error === 'object' && error !== null && 'message' in error) {
        apiMessage = String((error as { message: string }).message);
      } else if (typeof error === 'string') {
        apiMessage = error;
      }
      throw new BusinessError(apiMessage);
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
      if (error instanceof BusinessError) throw error;
      let message = 'Unknown error';
      if (error instanceof Error) message = error.message;
      else if (typeof error === 'object' && error !== null && 'message' in error) {
        message = String((error as { message: string }).message);
      } else if (typeof error === 'string') {
        message = error;
      }
      throw new BusinessError(message);
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
      if (error instanceof BusinessError) throw error;
      let message = 'Two-factor authentication failed due to network or server error.';
      if (error instanceof Error) message += ' ' + error.message;
      else if (typeof error === 'object' && error !== null && 'message' in error) {
        message += ' ' + String((error as { message: string }).message);
      } else if (typeof error === 'string') {
        message += ' ' + error;
      }
      throw new BusinessError(message);
    }
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('data');
    window.location.href = routes.login;
  }

  async requestTwoFactorAuthentication(): Promise<{ message: string }> {
    try {
      const response = await apiInstance.post('/auth/2fa/enable/request');

      return response.data;
    } catch (error: unknown) {
      if (error instanceof BusinessError) throw error;
      let message = 'Failed to request two-factor authentication.';
      if (error instanceof Error) message += ' ' + error.message;
      else if (typeof error === 'object' && error !== null && 'message' in error) {
        message += ' ' + String((error as { message: string }).message);
      } else if (typeof error === 'string') {
        message += ' ' + error;
      }
      throw new BusinessError(message);
    }
  }

  async enableTwoFactorAuthentication(token: string): Promise<void> {
    try {
      await apiInstance.get(`/auth/2fa/enable?token=${token}`);
    } catch (error: unknown) {
      if (error instanceof BusinessError) throw error;
      let message = 'Failed to enable two-factor authentication.';
      if (error instanceof Error) message += ' ' + error.message;
      else if (typeof error === 'object' && error !== null && 'message' in error) {
        message += ' ' + String((error as { message: string }).message);
      } else if (typeof error === 'string') {
        message += ' ' + error;
      }
      throw new BusinessError(message);
    }
  }

  async disableTwoFactorAuthentication(): Promise<{message: string}> {
    try {
      const response = await apiInstance.post('/auth/2fa/turn-off');
      
      if (response.status === 201) {
        return response.data;
      }
    } catch (error: unknown) {
      if (error instanceof BusinessError) throw error;
      let message = 'Failed to disable two-factor authentication.';
      if (error instanceof Error) message += ' ' + error.message;
      else if (typeof error === 'object' && error !== null && 'message' in error) {
        message += ' ' + String((error as { message: string }).message);
      } else if (typeof error === 'string') {
        message += ' ' + error;
      }
      throw new BusinessError(message);
    }
  }
}
