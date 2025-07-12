import { useEffect } from 'react';
import { Toaster } from 'sonner';

import AppRouter from './core/presentation/router';
import { useThemeConfig } from './hooks/use-theme';
import { useUserStore } from './core/presentation/stores/use-user.store';
import { ThemeProvider } from './components/theme-provider';

function App() {
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useThemeConfig(user?.themeColor);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" storageKey="vite-ui-theme" forcedTheme={user?.themeMode} enableSystem>
      <div className="bg-background text-foreground min-h-screen">
        <AppRouter />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
