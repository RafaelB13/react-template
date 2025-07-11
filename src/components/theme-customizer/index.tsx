import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeCustomizer() {
  const { setTheme, theme } = useTheme();
  const [color, setColor] = useState(
    localStorage.getItem('vite-ui-color') || 'zinc'
  );

  useEffect(() => {
    document.body.classList.forEach((className) => {
      if (className.startsWith('theme-')) {
        document.body.classList.remove(className);
      }
    });
    document.body.classList.add(`theme-${color}`);
    localStorage.setItem('vite-ui-color', color);
  }, [color]);

  const themes = [
    { name: 'light', label: 'Light' },
    { name: 'dark', label: 'Dark' },
    { name: 'system', label: 'System' },
  ];

  const colors = [
    { name: 'zinc', color: '#71717a' },
    { name: 'blue', color: '#3b82f6' },
    { name: 'rose', color: '#f43f5e' },
    { name: 'orange', color: '#f97316' },
  ];

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-2">
        {themes.map((t) => (
          <Button
            key={t.name}
            variant="outline"
            className={cn(theme === t.name && 'border-1 border-primary ring-1 ring-offset-1 ring-primary cursor-pointer')}
            onClick={() => setTheme(t.name)}
          >
            {t.name === 'light' ? <SunIcon /> : <MoonIcon />}
            <span className="ml-2">{t.label}</span>
          </Button>
        ))}
      </div>

      <div className="flex gap-4 mt-4">
        {colors.map((c) => (
          <Button
            key={c.name}
            variant="outline"
            className={cn(
              'h-8 w-8 rounded-full p-0 cursor-pointer',
              color === c.name && 'border-1 border-primary ring-1 ring-offset-1 ring-primary cursor-pointer'
            )}
            style={{ backgroundColor: c.color }}
            onClick={() => setColor(c.name)}
          />
        ))}
      </div>
    </div>
  );
}
