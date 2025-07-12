

import { handleServiceError } from '@/core/infrastructure/errors/handle-error';

import { LoginCredentials, LoginResponse, RegisterCredentials, RegisterResponse } from '@/core/domain/auth.types';
import { IAuthRepository } from '@/core/application/repositories/auth.repository';
import { IStorageService } from '@/core/application/services/storage.service';
import { IHttpClient } from '@/core/application/services/http-client.service';

export class AuthGateway implements IAuthRepository {
  constructor(private storageService: IStorageService, private httpClient: IHttpClient) {}

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await this.httpClient.post<LoginResponse>('/auth/login', credentials);

      if (response.isTwoFactorAuthenticationEnabled) {
        return response;
      }

      this.storageService.setItem('accessToken', response.access_token);

      return response;
    } catch (error: unknown) {
      handleServiceError(error, 'Login failed');
    }
  }

  async register(credentials: RegisterCredentials): Promise<RegisterResponse> {
    try {
      const response = await this.httpClient.post<RegisterResponse>('/auth/register', credentials);

      this.storageService.setItem('accessToken', response.access_token);
      return response;
    } catch (error: unknown) {
      handleServiceError(error, 'Registration failed');
    }
  }

  async twoFactorAuthentication(code: string, email: string): Promise<LoginResponse> {
    try {
      const response = await this.httpClient.post<LoginResponse>('/auth/login/2fa', { code, email });

      this.storageService.setItem('accessToken', response.access_token);

      return response;
    } catch (error: unknown) {
      handleServiceError(error, 'Two-factor authentication failed');
    }
  }

  logout(): void {
    this.storageService.removeItem('accessToken');
    this.storageService.removeItem('user');
  }

  async requestTwoFactorAuthentication(): Promise<{ message: string }> {
    try {
      const response = await this.httpClient.post<{ message: string }>('/auth/2fa/enable/request');

      return response;
    } catch (error: unknown) {
      handleServiceError(error, 'Failed to request two-factor authentication.');
    }
  }

  async enableTwoFactorAuthentication(token: string): Promise<void> {
    try {
      await this.httpClient.get<void>(`/auth/2fa/enable?token=${token}`);
    } catch (error: unknown) {
      handleServiceError(error, 'Failed to enable two-factor authentication.');
    }
  }

  async disableTwoFactorAuthentication(): Promise<{ message: string }> {
    try {
      const response = await this.httpClient.post<{ message: string }>('/auth/2fa/turn-off');

      return response;
    } catch (error: unknown) {
      handleServiceError(error, 'Failed to disable two-factor authentication.');
    }
  }
}
