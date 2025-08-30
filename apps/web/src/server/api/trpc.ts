import { initTRPC, TRPCError } from '@trpc/server'
import jwt from 'jsonwebtoken'
import superjson from 'superjson'
import { ZodError } from 'zod'

import { prisma } from '@/lib/prisma'

interface User {
  id: string
  username: string
  role: string
}

interface CreateContextOptions {
  user: User | null
}

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    user: opts.user,
    prisma,
  }
}

export const createTRPCContext = async (opts: { req: Request }) => {
  const { req } = opts

  // Get user from JWT token in cookies
  let user: User | null = null
  
  try {
    const cookieHeader = req.headers.get('cookie')
    if (cookieHeader) {
      const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=')
        acc[key] = value
        return acc
      }, {} as Record<string, string>)
      
      const sessionCookieName = process.env.SESSION_COOKIE_NAME || 'admitverse_session'
      const token = cookies[sessionCookieName]
      
      if (token && process.env.JWT_SECRET) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as any
        user = {
          id: decoded.id,
          username: decoded.username,
          role: decoded.role
        }
      }
    }
  } catch (error) {
    // Token invalid or expired
    console.warn('Invalid JWT token:', error)
  }

  return createInnerTRPCContext({
    user,
  })
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const createTRPCRouter = t.router

export const publicProcedure = t.procedure

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      user: ctx.user,
      prisma: ctx.prisma,
    },
  })
})

const enforceUserIsAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  
  // Check if user has admin role (for now, all authenticated users are admin)
  // Later we can add role-based checking here
  if (!ctx.user.role || ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN' })
  }

  return next({
    ctx: {
      user: ctx.user,
      prisma: ctx.prisma,
    },
  })
})

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed)
export const adminProcedure = t.procedure.use(enforceUserIsAdmin)