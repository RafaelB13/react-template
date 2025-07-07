import { Cog, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { SuccessAnimation } from '@/components/success-animation';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { routes } from '@/core/router/routes';
import { AuthService } from '@/core/services/auth-service';
import { useSettingsMenuStore } from '@/stores/use-settings-menu.store';

export const SettingsMenu = () => {
  const { isOpen, toggle } = useSettingsMenuStore();
  const [showAnimation, setShowAnimation] = useState(false);
  const authService = new AuthService();

  const data = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : {};

  const handleLogout = () => {
    setShowAnimation(true);
    setTimeout(() => {
      authService.logout();
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
      <PopoverContent className="w-56">
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
      </PopoverContent>
    </Popover>
  );
};
