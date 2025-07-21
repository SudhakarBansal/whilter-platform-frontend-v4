export const loginWithDummyToken = (email: string, password: string) => {
  const users = [
    {
      email: 'super@whilter.ai',
      password: 'super123',
      role: 'SUPER_ADMIN',
      section: 'Platform', // Optional if SUPER_ADMINs go to /platform by default
      token: 'dummy-super-token',
    },
    {
      email: 'admin@whilter.ai',
      password: 'admin123',
      role: 'CLIENT_ADMIN',
      section: 'CharpAI',
      token: 'dummy-client-token',
    },
    {
      email: 'guest@whilter.ai',
      password: 'guest123',
      role: 'GUEST',
      section: 'Marketplace',
      token: 'dummy-guest-token',
    },
  ];

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    throw new Error('Invalid credentials');
  }

  return {
    token: user.token,
    role: user.role,
    section: user.section,
  };
};
