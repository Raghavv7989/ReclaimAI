/**
 * Auth utility functions for token management.
 *
 * Access tokens are stored in sessionStorage (memory-like, cleared on tab close).
 * Refresh tokens are managed via httpOnly cookies (set by the backend).
 */

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('access_token');
}

export function setAccessToken(token: string): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem('access_token', token);
}

export function clearAccessToken(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem('access_token');
}

export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}
