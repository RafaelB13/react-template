import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthCallbackViewModel } from './view-model';

export const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const viewModel = useMemo(() => new AuthCallbackViewModel(), []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    viewModel.handleAuthenticationCallback(token, navigate);
  }, [navigate, viewModel]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold">Authentication Callback</h1>
        <p className="text-lg">Processing your authentication...</p>
      </div>
    </div>
  );
};
