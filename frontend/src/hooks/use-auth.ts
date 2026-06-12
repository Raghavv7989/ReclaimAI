'use client';

import { useAuthStore } from '@/stores/auth-store';

/**
 * Hook for accessing authentication state and actions.
 * Wraps the Zustand store with convenience methods.
 */
export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);

  return {
    user,
    isAuthenticated,
    isLoading,
  };
}
