'use client';

import { useEffect, type ReactNode } from 'react';
import { useUIStore } from '@/stores/ui-store';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useUIStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (resolved: 'light' | 'dark') => {
      root.classList.remove('light', 'dark');
      root.classList.add(resolved);
    };

    if (theme === 'system') {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      applyTheme(mql.matches ? 'dark' : 'light');

      const handler = (e: MediaQueryListEvent) => {
        applyTheme(e.matches ? 'dark' : 'light');
      };
      mql.addEventListener('change', handler);
      return () => mql.removeEventListener('change', handler);
    } else {
      applyTheme(theme);
    }
  }, [theme]);

  return <>{children}</>;
}
