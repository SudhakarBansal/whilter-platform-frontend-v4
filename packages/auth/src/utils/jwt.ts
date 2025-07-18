export function decodeJwt(token: string): any {
  if (!token) return null
  try {
    const payload = token.split('.')[1]
    //return JSON.parse(atob(payload))
  } catch (error) {
    console.error('Failed to decode JWT', error)
    return null
  }
}