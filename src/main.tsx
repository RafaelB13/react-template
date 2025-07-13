import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/App.tsx';
import '@/index.css';
import { DependencyProvider } from '@/core/presentation/hooks/use-dependency.hook';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DependencyProvider>
      <App />
    </DependencyProvider>
  </StrictMode>,
);
