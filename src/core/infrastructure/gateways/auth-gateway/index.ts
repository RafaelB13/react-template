import { IAuthRepository } from '@/core/application/repositories/auth.repository';
import { IHttpClient } from '@/core/application/services/http-client.service';
import { IStorageService } from '@/core/application/services/storage.service';
import { LoginCredentials, LoginResponse, RegisterCredentials, RegisterResponse } from '@/core/domain/auth.types';
import { API_ROUTES } from '@/core/infrastructure/api/routes';
import { handleApiError } from '@/core/infrastructure/errors/handle-error';
import { UserGateway } from '@/core/infrastructure/gateways/user-gateway';

export class AuthGateway implements IAuthRepository {
  constructor(
    private storageService: IStorageService,
    private httpClient: IHttpClient,
    private userGateway: UserGateway,
  ) {}

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await this.httpClient.post<LoginResponse>(API_ROUTES.auth.login, credentials);

      if (response.isTwoFactorAuthenticationEnabled) {
        return response;
      }

      this.storageService.setItem('accessToken', response.access_token);
      await this.userGateway.getMe();

      return response;
    } catch (error: unknown) {
      handleApiError(error, 'Login failed');
    }
  }

  async register(credentials: RegisterCredentials): Promise<RegisterResponse> {
    try {
      const response = await this.httpClient.post<RegisterResponse>(API_ROUTES.auth.register, credentials);

      this.storageService.setItem('accessToken', response.access_token);
      return response;
    } catch (error: unknown) {
      handleApiError(error, 'Registration failed');
    }
  }

  async twoFactorAuthentication(code: string, email: string): Promise<LoginResponse> {
    try {
      const response = await this.httpClient.post<LoginResponse>(API_ROUTES.auth.twoFactorAuth, { code, email });

      this.storageService.setItem('accessToken', response.access_token);
      await this.userGateway.getMe();

      return response;
    } catch (error: unknown) {
      handleApiError(error, 'Two-factor authentication failed');
    }
  }

  logout(): void {
    this.storageService.removeItem('accessToken');
    this.storageService.removeItem('user');
  }

  async requestTwoFactorAuthentication(): Promise<{ message: string }> {
    try {
      return await this.httpClient.post<{ message: string }>(API_ROUTES.auth.requestTwoFactorAuth);
    } catch (error: unknown) {
      handleApiError(error, 'Failed to request two-factor authentication.');
    }
  }

  async enableTwoFactorAuthentication(token: string): Promise<void> {
    try {
      await this.httpClient.get<void>(API_ROUTES.auth.enableTwoFactorAuth(token));
    } catch (error: unknown) {
      handleApiError(error, 'Failed to enable two-factor authentication.');
    }
  }

  async disableTwoFactorAuthentication(): Promise<{ message: string }> {
    try {
      const response = await this.httpClient.post<{ message: string }>(API_ROUTES.auth.disableTwoFactorAuth);

      return response;
    } catch (error: unknown) {
      handleApiError(error, 'Failed to disable two-factor authentication.');
    }
  }
}
