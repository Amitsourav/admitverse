import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Only create Prisma client if we have a valid database URL
// This prevents connection attempts during build
const createPrismaClient = () => {
  if (process.env.DATABASE_URL?.includes('fake')) {
    return null as any
  }
  return new PrismaClient()
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma