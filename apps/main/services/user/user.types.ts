
export interface RegisterCredentials {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  organizationName?: string;
  preferredSections?: string[];
  status?: boolean;
  orgLevelAccess?: boolean;
}

export interface User {
  id: number
  name: string
  email: string
  role: string
  organizationName: string
  preferredSections: string[]
  status: boolean
  orgLevelAccess: boolean
  createdAt: string
  updatedAt: string
}
