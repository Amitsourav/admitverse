import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Only create Prisma client if we're not in build mode
const createPrismaClient = () => {
  // Don't create client during build or if no proper database URL
  if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
    return null as any
  }
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return null as any
  }
  if (typeof window !== 'undefined') {
    return null as any // Don't create client on browser side
  }
  
  try {
    return new PrismaClient()
  } catch (error) {
    console.warn('Failed to create Prisma client:', error)
    return null as any
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production' && prisma) {
  globalForPrisma.prisma = prisma
}