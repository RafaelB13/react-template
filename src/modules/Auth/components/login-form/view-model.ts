import { NavigateFunction } from 'react-router-dom';

import { container, Token } from '@/core/di';
import { LoginCredentials } from '@/core/domain/auth.types';
import { getBusinessErrorMessage } from '@/core/infrastructure/errors/business-errors';
import { AuthGateway } from '@/core/infrastructure/gateways/auth-gateway';
import { StorageService } from '@/core/infrastructure/services/storage';
import { routes } from '@/core/presentation/router/routes';
import { useLoginFormStore } from '@/modules/Auth/components/login-form/store';

export class LoginFormViewModel {
  private authGateway: AuthGateway;
  private storageService: StorageService;

  constructor() {
    this.authGateway = container.resolve<AuthGateway>(Token.AuthGateway);
    this.storageService = container.resolve<StorageService>(Token.StorageService);
  }

  public handleLogin = async (navigate: NavigateFunction) => {
    const { email, password, setErrorMessage, setShowErrorDialog } = useLoginFormStore.getState();
    setErrorMessage('');
    setShowErrorDialog(false);

    const credentials: LoginCredentials = { email, password };

    try {
      const response = await this.authGateway.login(credentials);

      if (response.isTwoFactorAuthenticationEnabled) {
        this.storageService.setItem('emailFor2FA', credentials.email);
        navigate(routes.two_factor_authentication);
      } else {
        navigate(routes.home);
      }
    } catch (error: unknown) {
      let message = 'Unknown error';

      if (typeof error === 'object' && error !== null && 'message' in error) {
        message = String((error as { message: string }).message);
      } else if (typeof error === 'string') {
        message = error;
      }

      setErrorMessage(getBusinessErrorMessage(message));
      setShowErrorDialog(true);
    }
  };
}
