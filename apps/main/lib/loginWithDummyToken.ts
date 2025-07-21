import { generateDummyToken } from './dummy-token'
import  type { AuthResponseDto } from './token-types'
const dummyUsers = [
  {
    email: 'superadmin@demo.com',
    password: 'superadmin',
    name: 'Super Admin',
    organization: 'org-001',
    role: 'super-admin',
    section: 'platform',
  },
  {
    email: 'admin@demo.com',
    password: 'admin',
    name: 'Client Admin',
    organization: 'org-002',
    role: 'admin',
    section: 'platform',
  },
  {
    email: 'editor@demo.com',
    password: 'editor',
    name: 'Creative Editor',
    organization: 'org-003',
    role: 'creative-editor',
    section: 'marketplace',
  },
  {
    email: 'guest@demo.com',
    password: 'guest',
    name: 'Guest User',
    organization: 'org-004',
    role: 'guest',
    section: 'media-tools',
  },
]

export function loginWithDummyToken(email: string, password: string): AuthResponseDto {
  const user = dummyUsers.find(
    (u) => u.email === email && u.password === password
  )
  if (!user) throw new Error('Invalid credentials')
  return generateDummyToken(user)
}