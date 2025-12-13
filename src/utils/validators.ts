export function isValidStockSymbol(symbol: string): boolean {
  if (!symbol) return false;

  const normalized = symbol.trim().toUpperCase();

  const regex = /^[A-Z]{4}[0-9]{1,2}?$/;

  return regex.test(normalized);
}
