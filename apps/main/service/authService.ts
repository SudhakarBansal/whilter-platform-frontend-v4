import { signIn, signOut } from 'next-auth/react';

export const login = async (provider: string) => {
  try {
    await signIn(provider, { callbackUrl: '/' });
  } catch (error) {
    console.error('Login error:', error);
  }
};

export const logout = async () => {
  try {
    await signOut({ callbackUrl: '/login' });
  } catch (error) {
    console.error('Logout error:', error);
  }
};
