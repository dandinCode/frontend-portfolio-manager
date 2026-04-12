export function isTokenExpired(token?: string | null): boolean {
  if (!token) return true

  try {
    const parts = token.split('.')

    if (parts.length < 2) return true

    const payloadBase64 = parts[1]

    if (!payloadBase64) return true

    const payload = JSON.parse(atob(payloadBase64))

    if (!payload.exp) return true

    const now = Math.floor(Date.now() / 1000)

    return payload.exp < now
  } catch {
    return true
  }
}
