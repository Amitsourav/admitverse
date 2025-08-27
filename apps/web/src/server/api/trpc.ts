import { initTRPC, TRPCError } from '@trpc/server'
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'
import { type Session } from 'next-auth'
import { getServerSession } from 'next-auth/next'
import superjson from 'superjson'
import { ZodError } from 'zod'

import { prisma } from '@/lib/prisma'
// import { authOptions } from '@/server/auth' // We'll create this later

interface CreateContextOptions {
  session: Session | null
}

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
  }
}

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts

  // Get the session from the server using the getServerSession wrapper function
  const session = await getServerSession(req, res)
  // TODO: Replace with actual authOptions when NextAuth is configured
  // const session = await getServerSession(req, res, authOptions)

  return createInnerTRPCContext({
    session,
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
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})

const enforceUserIsAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  
  // TODO: Check user role when user model is properly set up
  // const user = await ctx.prisma.user.findUnique({
  //   where: { id: ctx.session.user.id },
  //   select: { role: true }
  // })
  
  // if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
  //   throw new TRPCError({ code: 'FORBIDDEN' })
  // }

  return next({
    ctx: {
      session: ctx.session,
    },
  })
})

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed)
export const adminProcedure = t.procedure.use(enforceUserIsAdmin)