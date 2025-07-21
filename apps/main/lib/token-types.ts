export interface AuthResponseDto {
  accessToken: string
  refreshToken: string
  tokenType: string
}

export interface AuthClaims {
  name: string
  email: string
  organization: string
  role: string
  section: string
}