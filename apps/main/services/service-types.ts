import type { Organization } from "@/types/organization.types";

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

export interface PaginatedUsersResponse {
  content: User[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

export interface PaginatedFilterUsersResponse {
  content: User[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface PaginatedFilterOrganizationResponse {
  content: Organization[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}
