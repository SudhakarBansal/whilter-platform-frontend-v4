import { Role } from '@whilter/auth'

type DummyUser = {
  email: string
  password: string
  role: Role
  section: string
}

const dummyUsers: DummyUser[] = [
  {
    email: 'superadmin@demo.com',
    password: 'superadmin',
    role: Role.SUPER_ADMIN,
    section: 'platform',
  },
  {
    email: 'admin@demo.com',
    password: 'admin',
    role: Role.CLIENT_ADMIN,
    section: 'platform',
  },
  {
    email: 'editor@demo.com',
    password: 'editor',
    role: Role.CREATIVE_EDITOR,
    section: 'marketplace',
  },
  {
    email: 'guest@demo.com',
    password: 'guest',
    role: Role.GUEST,
    section: 'media-tools',
  },
]

export function loginWithDummyToken(email: string, password: string) {
  const user = dummyUsers.find(
    (u) => u.email === email && u.password === password
  )

  if (!user) throw new Error('Invalid credentials')

  const payload = {
    email: user.email,
    role: user.role,
    section: user.section,
  }

  const token = btoa(JSON.stringify(payload)) 

  return {
    token,
    role: user.role,
    section: user.section,
  }
}
