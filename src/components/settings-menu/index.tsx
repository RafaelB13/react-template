import { Cog, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { SuccessAnimation } from '@/components/success-animation';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { routes } from '@/core/presentation/router/routes';
import { AuthGateway } from '@/core/infrastructure/gateways/auth-gateway';
import { StorageService } from '@/core/infrastructure/services/storage';
import { AxiosHttpClient } from '@/core/infrastructure/api/axios-http-client';
import { useSettingsMenuStore } from '@/stores/use-settings-menu.store';
import { ThemeCustomizer } from '../theme-customizer';

const storageService = new StorageService();
const httpClient = new AxiosHttpClient();

export const SettingsMenu = () => {
  const { isOpen, toggle } = useSettingsMenuStore();
  const [showAnimation, setShowAnimation] = useState(false);
  const authService = new AuthGateway(storageService, httpClient);
  const navigate = useNavigate();

  const data = typeof window !== 'undefined' ? JSON.parse(storageService.getItem('user') || '{}') : {};

  const handleLogout = () => {
    setShowAnimation(true);
    setTimeout(() => {
      authService.logout();
      navigate(routes.login);
    }, 1500);
  };

  return (
    <Popover open={isOpen} onOpenChange={toggle}>
      {showAnimation && <SuccessAnimation />}
      <PopoverTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2">
          <div className="flex flex-col items-end justify-center">
            {data?.name && (
              <span className="text-foreground text-base font-medium">{data.name}</span>
            )}
            {data?.email && data?.name && (
              <span className="text-muted-foreground max-w-[140px] truncate text-xs">{data.email}</span>
            )}
          </div>
          <Button variant="ghost" className="flex items-center justify-center p-6">
            <Cog className="min-h-10 min-w-10" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-120">
        <Tabs defaultValue="account">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Settings</h4>
                <p className="text-muted-foreground text-sm">Manage your account settings.</p>
              </div>
              <div className="grid gap-2">
                <Link to={routes.profile}>
                  <Button variant="ghost" className="w-full cursor-pointer justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                </Link>

                <Button onClick={handleLogout} variant="ghost" className="w-full cursor-pointer justify-start">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="theme">
            <ThemeCustomizer />
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};
