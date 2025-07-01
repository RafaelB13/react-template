import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import LoginPage from '@/modules/Auth/page/Login';
import SignUpPage from '@/modules/Auth/page/SignIn';
import { UploadCreatePage } from '@/modules/Upload/pages/Create';
import { routes } from './routes';

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
        <Route path={routes.home} element={<UploadCreatePage />} />
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.sign_up} element={<SignUpPage />} />
        <Route path={'*'} element={<LoginPage />} />
      </Routes>
    </React.Suspense>
  </Router>
);

export default AppRouter;
