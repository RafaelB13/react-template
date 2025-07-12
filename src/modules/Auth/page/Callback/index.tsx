import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { routes } from '@/core/presentation/router/routes';
import { authService } from '@/core/di';

export const AuthCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    const enable2FA = async (token: string) => {
      try {
        await authService.enableTwoFactorAuthentication(token);
        // O backend deve redirecionar, mas caso não o faça,
        // redirecionamos para a home como fallback.
        navigate(routes.home);
      } catch {
        // Em caso de erro, redireciona para a página de login.
        navigate(routes.login);
      }
    };

    if (token) {
      enable2FA(token);
    } else {
      navigate(routes.login);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Authentication Callback</h1>
        <p className="text-lg">Processing your authentication...</p>
      </div>
    </div>
  );
};
