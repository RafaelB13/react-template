import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginCredentials } from '@/core/domain/auth.types';
import { AxiosHttpClient } from '@/core/infrastructure/api/axios/http-client';
import { getBusinessErrorMessage } from '@/core/infrastructure/errors/business-errors';
import { AuthGateway } from '@/core/infrastructure/gateways/auth-gateway';
import { StorageService } from '@/core/infrastructure/services/storage';
import { routes } from '@/core/presentation/router/routes';

const storageService = new StorageService();
const httpClient = new AxiosHttpClient();
const authService = new AuthGateway(storageService, httpClient);

export function useLoginFormViewModel() {
  const [email, setEmail] = useState<string>('admin@sistema.com');
  const [password, setPassword] = useState<string>('Admin@2025!');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLogin = useCallback(async () => {
    setErrorMessage('');
    setShowErrorDialog(false);

    const credentials: LoginCredentials = { email, password };

    try {
      const response = await authService.login(credentials);

      if (response.isTwoFactorAuthenticationEnabled) {
        storageService.setItem('emailFor2FA', credentials.email);
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
  }, [email, password, navigate]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    setErrorMessage,
    showErrorDialog,
    setShowErrorDialog,
    handleLogin,
  };
}
