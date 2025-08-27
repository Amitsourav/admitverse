import { createTRPCRouter } from '@/server/api/trpc'
import { collegesRouter } from '@/server/api/routers/colleges'
import { coursesRouter } from '@/server/api/routers/courses'
import { specializationsRouter } from '@/server/api/routers/specializations'
import { leadsRouter } from '@/server/api/routers/leads'

export const appRouter = createTRPCRouter({
  colleges: collegesRouter,
  courses: coursesRouter,
  specializations: specializationsRouter,
  leads: leadsRouter,
})

export type AppRouter = typeof appRouter