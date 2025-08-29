import { createTRPCRouter } from '@/server/api/trpc'
import { collegesRouter } from '@/server/api/routers/colleges'
import { coursesRouter } from '@/server/api/routers/courses'
import { specializationsRouter } from '@/server/api/routers/specializations'
import { leadsRouter } from '@/server/api/routers/leads'
import { adminRouter } from '@/server/api/routers/admin'

export const appRouter = createTRPCRouter({
  colleges: collegesRouter,
  courses: coursesRouter,
  specializations: specializationsRouter,
  leads: leadsRouter,
  admin: adminRouter,
})

export type AppRouter = typeof appRouter