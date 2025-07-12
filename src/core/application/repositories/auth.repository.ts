import { LoginCredentials, LoginResponse, RegisterCredentials, RegisterResponse } from '@/core/domain/auth.types';

export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<LoginResponse>;
  register(credentials: RegisterCredentials): Promise<RegisterResponse>;
  twoFactorAuthentication(code: string, email: string): Promise<LoginResponse>;
  logout(): void;
  requestTwoFactorAuthentication(): Promise<{ message: string }>;
  enableTwoFactorAuthentication(token: string): Promise<void>;
  disableTwoFactorAuthentication(): Promise<{ message: string }>;
}
