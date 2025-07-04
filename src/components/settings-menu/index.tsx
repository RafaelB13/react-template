import { Cog, User } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { routes } from '@/core/router/routes';
import { useSettingsMenuStore } from '@/stores/use-settings-menu.store';

export const SettingsMenu = () => {
  const { isOpen, toggle } = useSettingsMenuStore();
  // Pega o usuário do localStorage (ajuste conforme necessário para seu contexto)
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : {};

  return (
    <Popover open={isOpen} onOpenChange={toggle}>
      <PopoverTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2">
          <div className="flex flex-col items-end justify-center">
            {user?.username && (
              <span className="text-foreground max-w-[120px] truncate text-base font-medium">{user.username}</span>
            )}
            {user?.email && user?.username && (
              <span className="text-muted-foreground max-w-[140px] truncate text-xs">{user.email}</span>
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
            <h4 className="leading-none font-medium">Settings</h4>
            <p className="text-muted-foreground text-sm">Manage your account settings.</p>
          </div>
          <div className="grid gap-2">
            <Link to={routes.profile}>
              <Button variant="ghost" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
