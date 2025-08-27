

/**
 * Check if a token is expired based on its exp claim.
 *
 * @param accessTokenExp - Expiry timestamp (in seconds since epoch)
 * @param skewSeconds - Buffer in seconds before actual expiry (default 30s)
 */

export function isTokenExpired(accessTokenExp?: number): boolean {
  if (!accessTokenExp) return true; 

  const nowInSeconds = Math.floor(Date.now() / 1000); 
  console.log("expire",nowInSeconds, accessTokenExp, nowInSeconds >= accessTokenExp)
  return nowInSeconds >= accessTokenExp;
}

