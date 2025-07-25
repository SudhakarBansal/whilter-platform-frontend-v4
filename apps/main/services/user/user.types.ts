
export interface RegisterCredentials {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  organization?: string;
  phoneNumber?: string;
  status?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
 
}
