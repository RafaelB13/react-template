import { useEffect } from 'react';

export function useThemeConfig(themeColor?: string) {
  useEffect(() => {
    const color = themeColor || localStorage.getItem('vite-ui-color') || 'zinc';

    document.body.classList.forEach((className) => {
      if (className.startsWith('theme-')) {
        document.body.classList.remove(className);
      }
    });

    document.body.classList.add(`theme-${color}`);
  }, [themeColor]);
}
