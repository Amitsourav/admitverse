import { createTRPCRouter } from '@/server/api/trpc'
import { adminCollegesRouter } from './colleges'
import { adminCoursesRouter } from './courses'
import { adminSpecializationsRouter } from './specializations'
import { adminLeadsRouter } from './leads'

export const adminRouter = createTRPCRouter({
  colleges: adminCollegesRouter,
  courses: adminCoursesRouter,
  specializations: adminSpecializationsRouter,
  leads: adminLeadsRouter,
})