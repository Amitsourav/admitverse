import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function timeAgo(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`
  if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`
  if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''} ago`
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  return 'just now'
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export function getDegreeDisplayName(degree: string): string {
  const degreeMap: Record<string, string> = {
    CERTIFICATE: 'Certificate',
    DIPLOMA: 'Diploma',
    ASSOCIATE: 'Associate Degree',
    BACHELOR: 'Bachelor\'s Degree',
    MASTER: 'Master\'s Degree',
    DOCTORATE: 'Doctorate',
    POST_DOCTORATE: 'Post-Doctorate',
  }
  return degreeMap[degree] || degree
}

export function getLevelDisplayName(level: string): string {
  const levelMap: Record<string, string> = {
    UNDERGRADUATE: 'Undergraduate',
    POSTGRADUATE: 'Postgraduate',
    DOCTORATE: 'Doctorate',
    CERTIFICATE: 'Certificate',
    DIPLOMA: 'Diploma',
  }
  return levelMap[level] || level
}

export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    ACTIVE: 'text-blue-600 bg-blue-100',
    INACTIVE: 'text-gray-600 bg-gray-100',
    PENDING: 'text-yellow-600 bg-yellow-100',
    ARCHIVED: 'text-red-600 bg-red-100',
    NEW: 'text-blue-600 bg-blue-100',
    CONTACTED: 'text-indigo-600 bg-indigo-100',
    QUALIFIED: 'text-blue-600 bg-blue-100',
    CONVERTED: 'text-sky-600 bg-sky-100',
    LOST: 'text-red-600 bg-red-100',
  }
  return statusColors[status] || 'text-gray-600 bg-gray-100'
}

export function getPriorityColor(priority: string): string {
  const priorityColors: Record<string, string> = {
    LOW: 'text-gray-600 bg-gray-100',
    MEDIUM: 'text-yellow-600 bg-yellow-100',
    HIGH: 'text-orange-600 bg-orange-100',
    URGENT: 'text-red-600 bg-red-100',
  }
  return priorityColors[priority] || 'text-gray-600 bg-gray-100'
}