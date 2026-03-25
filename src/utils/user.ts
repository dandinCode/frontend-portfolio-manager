import type { UserFromToken } from "@/types/types"

export function getUserFirstName(): string {
  const user = getUserFromToken()

  if (!user?.name) return ''

  const firstName = user.name.split(' ')[0] || ''

  return capitalize(firstName)
}

function capitalize(text: string) {
  if (!text) return ''

  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export function getUserFromToken(): UserFromToken | null {
  const token = localStorage.getItem('token')

  if (!token) return null

  try {
    const base64Payload = token.split('.')[1]
    if (!base64Payload) return null

    const payload = JSON.parse(atob(base64Payload))

    return payload
  } catch {
    return null
  }
}

export function getUserInitials(): string {
  const user = getUserFromToken()

  if (!user?.name) return ''

  const parts = user.name.trim().split(' ').filter(Boolean)

  if (parts.length === 0) return ''

  if (parts.length === 1) {
    return (parts[0]?.[0] || '').toUpperCase()
  }

  return ((parts[0]?.[0] || '') + (parts[parts.length - 1]?.[0] || '')).toUpperCase()
}
