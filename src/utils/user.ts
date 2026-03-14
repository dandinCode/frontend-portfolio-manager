export function getUserFirstName(): string {
  const token = localStorage.getItem('token')

  if (!token) return ''

  try {
    const base64Payload = token.split('.')[1]

    if (!base64Payload) return ''

    const payload = JSON.parse(atob(base64Payload))
    console.log(payload)

    const name: string = payload.name || ''

    if (!name) return ''

    const firstName = name.split(' ')[0] || ''

    return capitalize(firstName)
  } catch {
    return ''
  }
}

function capitalize(text: string) {
  if (!text) return ''

  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}
