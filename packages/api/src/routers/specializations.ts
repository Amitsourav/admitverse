import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'

const specializationSearchSchema = z.object({
  query: z.string().optional(),
  courseId: z.string().optional(),
  featured: z.boolean().optional(),
  limit: z.number().min(1).max(100).default(20),
  offset: z.number().min(0).default(0),
  sortBy: z.enum(['name', 'credits']).default('name'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
})

const specializationBySlugSchema = z.object({
  slug: z.string(),
})

export const specializationsRouter = createTRPCRouter({
  // Get all specializations with filtering and pagination
  search: publicProcedure
    .input(specializationSearchSchema)
    .query(async ({ input, ctx }) => {
      const { query, courseId, featured, limit, offset, sortBy, sortOrder } = input

      const where = {
        ...(query && {
          OR: [
            { name: { contains: query, mode: 'insensitive' as const } },
            { description: { contains: query, mode: 'insensitive' as const } },
          ],
        }),
        ...(courseId && { courseId }),
        ...(featured !== undefined && { featured }),
        status: 'ACTIVE',
      }

      const orderBy = { [sortBy]: sortOrder }

      const [specializations, total] = await Promise.all([
        ctx.prisma.specialization.findMany({
          where,
          orderBy,
          take: limit,
          skip: offset,
          include: {
            course: {
              select: {
                id: true,
                name: true,
                slug: true,
                degree: true,
                level: true,
                college: {
                  select: {
                    id: true,
                    name: true,
                    slug: true,
                    logo: true,
                    country: {
                      select: {
                        id: true,
                        name: true,
                        code: true,
                        flag: true,
                      },
                    },
                  },
                },
              },
            },
            _count: {
              select: {
                leads: true,
              },
            },
          },
        }),
        ctx.prisma.specialization.count({ where }),
      ])

      return {
        specializations,
        total,
        hasMore: offset + limit < total,
      }
    }),

  // Get specialization by slug
  getBySlug: publicProcedure
    .input(specializationBySlugSchema)
    .query(async ({ input, ctx }) => {
      const specialization = await ctx.prisma.specialization.findUnique({
        where: { slug: input.slug, status: 'ACTIVE' },
        include: {
          course: {
            include: {
              college: {
                include: {
                  country: true,
                  _count: {
                    select: {
                      courses: {
                        where: { status: 'ACTIVE' },
                      },
                      reviews: true,
                    },
                  },
                },
              },
              _count: {
                select: {
                  specializations: {
                    where: { status: 'ACTIVE' },
                  },
                },
              },
            },
          },
          _count: {
            select: {
              leads: true,
            },
          },
        },
      })

      if (!specialization) {
        throw new Error('Specialization not found')
      }

      return specialization
    }),

  // Get specializations by course
  getByCourse: publicProcedure
    .input(z.object({ courseId: z.string(), limit: z.number().default(20) }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.specialization.findMany({
        where: { courseId: input.courseId, status: 'ACTIVE' },
        take: input.limit,
        include: {
          _count: {
            select: {
              leads: true,
            },
          },
        },
        orderBy: { name: 'asc' },
      })
    }),

  // Get featured specializations
  getFeatured: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.specialization.findMany({
      where: { featured: true, status: 'ACTIVE' },
      take: 8,
      include: {
        course: {
          select: {
            id: true,
            name: true,
            slug: true,
            degree: true,
            level: true,
            college: {
              select: {
                id: true,
                name: true,
                slug: true,
                logo: true,
                country: {
                  select: {
                    name: true,
                    flag: true,
                  },
                },
              },
            },
          },
        },
        _count: {
          select: {
            leads: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  }),

  // Get popular specializations (based on leads)
  getPopular: publicProcedure
    .input(z.object({ limit: z.number().default(6) }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.specialization.findMany({
        where: { status: 'ACTIVE' },
        take: input.limit,
        include: {
          course: {
            select: {
              id: true,
              name: true,
              slug: true,
              degree: true,
              college: {
                select: {
                  name: true,
                  logo: true,
                  country: {
                    name: true,
                    flag: true,
                  },
                },
              },
            },
          },
          _count: {
            select: {
              leads: true,
            },
          },
        },
        orderBy: [
          {
            leads: {
              _count: 'desc',
            },
          },
        ],
      })
    }),

  // Get specializations with career information
  getWithCareers: publicProcedure
    .input(z.object({ 
      field: z.string().optional(),
      limit: z.number().default(10) 
    }))
    .query(async ({ ctx, input }) => {
      const where = {
        status: 'ACTIVE' as const,
        ...(input.field && {
          OR: [
            {
              careerPaths: {
                has: input.field,
              },
            },
            {
              name: {
                contains: input.field,
                mode: 'insensitive' as const,
              },
            },
          ],
        }),
      }

      return ctx.prisma.specialization.findMany({
        where,
        take: input.limit,
        select: {
          id: true,
          name: true,
          slug: true,
          shortDescription: true,
          careerPaths: true,
          averageSalary: true,
          jobDemand: true,
          course: {
            select: {
              name: true,
              degree: true,
              college: {
                select: {
                  name: true,
                  country: {
                    select: {
                      name: true,
                      flag: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: [
          {
            jobDemand: 'desc',
          },
          {
            name: 'asc',
          },
        ],
      })
    }),
})