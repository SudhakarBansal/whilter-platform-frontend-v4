export interface User {
  user:{
  email?: string | null;
  role?: string | null;
  organization?: string | null;
  section?: string[] | null;
  userId?: string | null;
},
refreshToken?: string | null;
accessToken?:string|null;
deviceId?: string | null;
}

