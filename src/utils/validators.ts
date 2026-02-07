export function isValidStockSymbol(symbol: string): boolean {
  if (!symbol) return false

  const normalized = symbol.trim().toUpperCase()

  const regex = /^[A-Z]{4}[0-9]{1,2}?$/

  return regex.test(normalized)
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return emailRegex.test(email)
}

export function isValidPassword(password: string): boolean {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

  return passwordRegex.test(password)
}

export function isValidName(name: string): boolean {
  const nameRegex = /^[A-Za-zÀ-ÿ\s]{5,}$/
  return nameRegex.test(name.trim())
}
