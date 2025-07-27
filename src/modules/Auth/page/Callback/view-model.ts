import { EnableTwoFactorAuthenticationUseCase } from '@/core/application/use-cases/enable-two-factor-authentication.use-case';
import { container } from '@/core/di/container';
import { Token } from '@/core/di/tokens';
import { routes } from '@/core/presentation/router/routes';

export class AuthCallbackViewModel {
  private enableTwoFactorAuthenticationUseCase: EnableTwoFactorAuthenticationUseCase;

  constructor() {
    this.enableTwoFactorAuthenticationUseCase = container.resolve<EnableTwoFactorAuthenticationUseCase>(
      Token.EnableTwoFactorAuthenticationUseCase
    );
  }

  public async handleAuthenticationCallback(token: string | null, navigate: (path: string) => void): Promise<void> {
    if (token) {
      try {
        await this.enableTwoFactorAuthenticationUseCase.execute(token);
        navigate(routes.home);
      } catch {
        navigate(routes.login);
      }
    } else {
      navigate(routes.login);
    }
  }
}
