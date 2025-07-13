/* eslint-disable @typescript-eslint/no-explicit-any */
import { Token } from '@/core/di/tokens';
import { DisableTwoFactorAuthenticationUseCase } from '../application/use-cases/disable-two-factor-authentication.use-case';
import { EnableTwoFactorAuthenticationUseCase } from '../application/use-cases/enable-two-factor-authentication.use-case';
// Use Cases
import { GetUserUseCase } from '../application/use-cases/get-user.use-case';
import { RequestTwoFactorAuthenticationUseCase } from '../application/use-cases/request-two-factor-authentication.use-case';
import { UpdateUserUseCase } from '../application/use-cases/update-user.use-case';
import { UploadFileUseCase } from '../application/use-cases/upload-file.use-case';
// Services
import { AxiosHttpClient } from '../infrastructure/api/axios';
// Gateways
import { AuthGateway } from '../infrastructure/gateways/auth-gateway';
import { UploadGateway } from '../infrastructure/gateways/upload-gateway';
import { UserGateway } from '../infrastructure/gateways/user-gateway';
import { StorageService } from '../infrastructure/services/storage';

export type Factory<T> = (container: DIContainer) => T;

export class DIContainer {
  private dependencies = new Map<keyof any, Factory<any>>();
  private instances = new Map<keyof any, any>();

  register<T>(token: keyof any, factory: Factory<T>): void {
    if (this.dependencies.has(token)) {
      // console.warn(`Dependency with token ${String(token)} is already registered and will be overwritten.`);
    }
    this.dependencies.set(token, factory);
  }

  resolve<T>(token: keyof any): T {
    if (this.instances.has(token)) {
      return this.instances.get(token) as T;
    }

    const factory = this.dependencies.get(token);
    if (!factory) {
      throw new Error(`No dependency registered for token ${String(token)}`);
    }

    const instance = factory(this);
    this.instances.set(token, instance);
    return instance;
  }

  reset(): void {
    this.instances.clear();
  }
}

export const container = new DIContainer();

// --- Services ---
container.register(Token.StorageService, () => new StorageService());
container.register(Token.HttpClient, () => new AxiosHttpClient());

// --- Gateways / Repositories ---
container.register(
  Token.AuthGateway,
  (c) => new AuthGateway(c.resolve(Token.StorageService), c.resolve(Token.HttpClient))
);
container.register(
  Token.UserGateway,
  (c) => new UserGateway(c.resolve(Token.StorageService), c.resolve(Token.HttpClient))
);
container.register(Token.UploadGateway, (c) => new UploadGateway(c.resolve(Token.HttpClient)));

// --- Repositories ---
container.register(
  Token.AuthRepository,
  (c) => new AuthGateway(c.resolve(Token.StorageService), c.resolve(Token.HttpClient))
);
container.register(
  Token.UserRepository,
  (c) => new UserGateway(c.resolve(Token.StorageService), c.resolve(Token.HttpClient))
);
container.register(Token.UploadRepository, (c) => new UploadGateway(c.resolve(Token.HttpClient)));

// --- Use Cases ---
container.register(Token.GetUserUseCase, (c) => new GetUserUseCase(c.resolve(Token.UserRepository)));
container.register(Token.UpdateUserUseCase, (c) => new UpdateUserUseCase(c.resolve(Token.UserRepository)));
container.register(Token.UploadFileUseCase, (c) => new UploadFileUseCase(c.resolve(Token.UploadRepository)));
container.register(
  Token.EnableTwoFactorAuthenticationUseCase,
  (c) => new EnableTwoFactorAuthenticationUseCase(c.resolve(Token.AuthRepository))
);
container.register(
  Token.RequestTwoFactorAuthenticationUseCase,
  (c) => new RequestTwoFactorAuthenticationUseCase(c.resolve(Token.AuthRepository))
);
container.register(
  Token.DisableTwoFactorAuthenticationUseCase,
  (c) => new DisableTwoFactorAuthenticationUseCase(c.resolve(Token.AuthRepository))
);
