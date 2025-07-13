import { Link, useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button-variants';
import { routes } from '@/core/presentation/router/routes';

const menuItems = [
  {
    href: routes.home,
    label: 'Home',
  },
  {
    href: routes.upload,
    label: 'Upload',
  },
];

export const NavMenu = () => {
  const { pathname } = useLocation();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {menuItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname === item.href ? 'bg-muted hover:bg-muted' : 'hover:bg-transparent hover:underline',
            'justify-start'
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
