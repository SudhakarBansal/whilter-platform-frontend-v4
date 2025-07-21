import  type{ AuthClaims } from './token-types'

export function decodeDummyAccessToken(token: string): AuthClaims | null {
  try {
    return JSON.parse(atob(token))
  } catch {
    return null
  }
}