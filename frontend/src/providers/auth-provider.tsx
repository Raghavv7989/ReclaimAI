'use client';

import { useEffect, type ReactNode } from 'react';
import { useAuthStore } from '@/stores/auth-store';

export function AuthProvider({ children }: { children: ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    // TODO: Check for existing session on mount
    // For now, mark as not loading with no user
    setLoading(false);
    setUser(null);
  }, [setUser, setLoading]);

  return <>{children}</>;
}
