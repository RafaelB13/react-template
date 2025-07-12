import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { MainLayout } from '@/core/presentation/layout';
import { routes } from '@/core/presentation/router/routes';
import { AuthCallbackPage } from '@/modules/Auth/page/Callback';
import LoginPage from '@/modules/Auth/page/Login';
import SignUpPage from '@/modules/Auth/page/SignIn';
import TwoFactorAuthPage from '@/modules/Auth/page/TwoFactorAuthenctication';
import { Home } from '@/modules/Home';
import NotFoundPage from '@/modules/Show/pages/NotFound';
import { UploadCreatePage } from '@/modules/Upload/pages/Create';
import { UserProfilePage } from '@/modules/User/pages/Profile';

const AppRouter: React.FC = () => (
  <Router>
    <React.Suspense
      fallback={
        <div className="bg-background flex min-h-screen items-center justify-center">
          <div className="text-foreground">Loading...</div>
        </div>
      }
    >
      <Routes>
        <Route path={routes.auth_callback} element={<AuthCallbackPage />} />
        <Route
          path={routes.upload}
          element={
            <MainLayout>
              <UploadCreatePage />
            </MainLayout>
          }
        />
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.sign_up} element={<SignUpPage />} />
        <Route path={routes.two_factor_authentication} element={<TwoFactorAuthPage />} />
        <Route
          path={routes.profile}
          element={
            <MainLayout>
              <UserProfilePage />
            </MainLayout>
          }
        />
        <Route
          path={routes.home}
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route path={'*'} element={<NotFoundPage />} />
      </Routes>
    </React.Suspense>
  </Router>
);

export default AppRouter;
