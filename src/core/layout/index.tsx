import React from 'react';

import { NavMenu } from '@/components/nav-menu';
import { SettingsMenu } from '@/components/settings-menu';
import StarryBackground from '@/components/ui/starry-background';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="relative flex h-screen flex-col p-6">
      <StarryBackground />
      <header className="relative z-10 mb-6 flex items-center justify-between">
        <NavMenu />
        <SettingsMenu />
      </header>
      <main className="relative z-10 flex flex-1 flex-col items-center overflow-auto py-6">{children}</main>
    </div>
  );
};
