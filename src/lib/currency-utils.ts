// Currency configuration for different countries
export const CURRENCY_CONFIG = {
  // Americas
  USA: { symbol: '$', code: 'USD', name: 'US Dollar', locale: 'en-US' },
  Canada: { symbol: 'C$', code: 'CAD', name: 'Canadian Dollar', locale: 'en-CA' },
  
  // Europe
  UK: { symbol: '£', code: 'GBP', name: 'British Pound', locale: 'en-GB' },
  Germany: { symbol: '€', code: 'EUR', name: 'Euro', locale: 'de-DE' },
  France: { symbol: '€', code: 'EUR', name: 'Euro', locale: 'fr-FR' },
  Netherlands: { symbol: '€', code: 'EUR', name: 'Euro', locale: 'nl-NL' },
  Switzerland: { symbol: 'CHF', code: 'CHF', name: 'Swiss Franc', locale: 'de-CH' },
  Sweden: { symbol: 'kr', code: 'SEK', name: 'Swedish Krona', locale: 'sv-SE' },
  Denmark: { symbol: 'kr', code: 'DKK', name: 'Danish Krone', locale: 'da-DK' },
  Norway: { symbol: 'kr', code: 'NOK', name: 'Norwegian Krone', locale: 'no-NO' },
  Finland: { symbol: '€', code: 'EUR', name: 'Euro', locale: 'fi-FI' },
  Ireland: { symbol: '€', code: 'EUR', name: 'Euro', locale: 'en-IE' },
  Spain: { symbol: '€', code: 'EUR', name: 'Euro', locale: 'es-ES' },
  Italy: { symbol: '€', code: 'EUR', name: 'Euro', locale: 'it-IT' },
  Austria: { symbol: '€', code: 'EUR', name: 'Euro', locale: 'de-AT' },
  Belgium: { symbol: '€', code: 'EUR', name: 'Euro', locale: 'fr-BE' },
  
  // Asia Pacific
  Australia: { symbol: 'A$', code: 'AUD', name: 'Australian Dollar', locale: 'en-AU' },
  'New Zealand': { symbol: 'NZ$', code: 'NZD', name: 'New Zealand Dollar', locale: 'en-NZ' },
  Singapore: { symbol: 'S$', code: 'SGD', name: 'Singapore Dollar', locale: 'en-SG' },
  Japan: { symbol: '¥', code: 'JPY', name: 'Japanese Yen', locale: 'ja-JP' },
  China: { symbol: '¥', code: 'CNY', name: 'Chinese Yuan', locale: 'zh-CN' },
  'Hong Kong': { symbol: 'HK$', code: 'HKD', name: 'Hong Kong Dollar', locale: 'zh-HK' },
  India: { symbol: '₹', code: 'INR', name: 'Indian Rupee', locale: 'en-IN' },
  'South Korea': { symbol: '₩', code: 'KRW', name: 'Korean Won', locale: 'ko-KR' },
  
  // Default fallback
  DEFAULT: { symbol: '$', code: 'USD', name: 'US Dollar', locale: 'en-US' }
} as const

export type CountryKey = keyof typeof CURRENCY_CONFIG

/**
 * Get currency configuration for a country
 */
export function getCurrencyByCountry(country: string) {
  const normalizedCountry = country.trim()
  return CURRENCY_CONFIG[normalizedCountry as CountryKey] || CURRENCY_CONFIG.DEFAULT
}

/**
 * Format tuition/cost string with proper currency based on country
 * Handles existing formatted strings and converts them
 */
export function formatTuitionByCountry(tuition: string | undefined, country: string): string {
  if (!tuition) return 'Contact for details'
  
  // Get currency config for the country
  const currency = getCurrencyByCountry(country)
  
  // If tuition already contains the correct currency symbol, return as is
  if (tuition.includes(currency.symbol) || tuition.includes(currency.code)) {
    return tuition
  }
  
  // Extract number from string (handles formats like "$50,000/year" or "50000")
  const numberMatch = tuition.match(/[\d,]+/)
  if (!numberMatch) return tuition
  
  const amount = parseInt(numberMatch[0].replace(/,/g, ''))
  
  // Check if tuition contains year/month/semester indicators
  const periodMatch = tuition.match(/\/(year|month|semester|term|quarter)/i)
  const period = periodMatch ? periodMatch[0] : '/year'
  
  // Format with proper currency
  return formatCurrency(amount, country) + period
}

/**
 * Format a number as currency based on country
 */
export function formatCurrency(amount: number, country: string): string {
  const currency = getCurrencyByCountry(country)
  
  try {
    // Use Intl.NumberFormat for proper localization
    return new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  } catch (error) {
    // Fallback to simple formatting
    return `${currency.symbol}${amount.toLocaleString()}`
  }
}

/**
 * Parse a tuition string to extract the numeric value
 */
export function parseTuitionAmount(tuition: string): number {
  const numberMatch = tuition.match(/[\d,]+/)
  if (!numberMatch) return 0
  return parseInt(numberMatch[0].replace(/,/g, ''))
}

/**
 * Get currency symbol for a country
 */
export function getCurrencySymbol(country: string): string {
  return getCurrencyByCountry(country).symbol
}

/**
 * Convert between currencies (simplified - would need real exchange rates in production)
 * This is a simplified version with approximate rates
 */
export function convertCurrency(amount: number, fromCountry: string, toCountry: string): number {
  // Simplified exchange rates (relative to USD)
  const exchangeRates: Record<string, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    CAD: 1.36,
    AUD: 1.53,
    NZD: 1.63,
    SGD: 1.35,
    JPY: 149,
    CNY: 7.24,
    HKD: 7.83,
    INR: 83.12,
    KRW: 1318,
    CHF: 0.88,
    SEK: 10.51,
    DKK: 6.85,
    NOK: 10.73
  }
  
  const fromCurrency = getCurrencyByCountry(fromCountry)
  const toCurrency = getCurrencyByCountry(toCountry)
  
  const fromRate = exchangeRates[fromCurrency.code] || 1
  const toRate = exchangeRates[toCurrency.code] || 1
  
  // Convert to USD first, then to target currency
  const usdAmount = amount / fromRate
  return usdAmount * toRate
}