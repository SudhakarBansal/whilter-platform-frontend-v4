
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
  id: string
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

export interface Organization {
  id: string;
  name: string;
  description: string;
}

export interface PaginatedUsersResponse {
  content: User[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}
