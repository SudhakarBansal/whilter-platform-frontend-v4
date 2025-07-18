import type { UserRole } from '@whilter/config';

export function loginWithDummyToken(email: string, password: string): { token: string; role: UserRole } {
   
const dummyUsers = [
  { email: 'admin@whilter.ai', password: 'admin123', role: 'admin' as const },
  { email: 'user@whilter.ai', password: 'user123', role: 'guest' as const },
  { email: 'super@whilter.ai', password: 'super123', role: 'superAdmin' as UserRole }, 
];

  const user = dummyUsers.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid credentials');

  const payload = {
    userId: 'dummy-user-id',
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + 60 * 60, 
  };

  const token = `dummy.${btoa(JSON.stringify(payload))}.token`;
  console.log("token",token)
  return { token, role: user.role };
}
