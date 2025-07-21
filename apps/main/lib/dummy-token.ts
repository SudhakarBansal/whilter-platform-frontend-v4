import type { AuthResponseDto, AuthClaims } from './token-types'

export function generateDummyToken(user: AuthClaims): AuthResponseDto {
  const accessToken = btoa(JSON.stringify(user))
  return {
    accessToken,
    refreshToken: 'dummy-refresh-token',
    tokenType: 'Bearer',
  }
}