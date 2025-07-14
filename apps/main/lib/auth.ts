// lib/auth.ts
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('fake-token');
}

export function loginWithDummyToken(email: string, password: string): boolean {
  // Hardcoded dummy credentials
  if (email === 'admin@example.com' && password === 'admin123') {
    localStorage.setItem('fake-token', 'fake-token');
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem('token');
}
