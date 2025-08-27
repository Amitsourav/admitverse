import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'

const courseSearchSchema = z.object({
  query: z.string().optional(),
  collegeId: z.string().optional(),
  degree: z.enum(['CERTIFICATE', 'DIPLOMA', 'ASSOCIATE', 'BACHELOR', 'MASTER', 'DOCTORATE', 'POST_DOCTORATE']).optional(),
  level: z.enum(['UNDERGRADUATE', 'POSTGRADUATE', 'DOCTORATE', 'CERTIFICATE', 'DIPLOMA']).optional(),
  featured: z.boolean().optional(),
  limit: z.number().min(1).max(100).default(20),
  offset: z.number().min(0).default(0),
  sortBy: z.enum(['name', 'duration', 'tuitionFee']).default('name'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
})

const courseBySlugSchema = z.object({
  slug: z.string(),
})

const courseByIdSchema = z.object({
  id: z.string(),
})

export const coursesRouter = createTRPCRouter({
  // Get all courses with filtering and pagination
  search: publicProcedure
    .input(courseSearchSchema)
    .query(async ({ input, ctx }) => {
      const { query, collegeId, degree, level, featured, limit, offset, sortBy, sortOrder } = input

      const where = {
        ...(query && {
          OR: [
            { name: { contains: query, mode: 'insensitive' as const } },
            { description: { contains: query, mode: 'insensitive' as const } },
          ],
        }),
        ...(collegeId && { collegeId }),
        ...(degree && { degree }),
        ...(level && { level }),
        ...(featured !== undefined && { featured }),
        status: 'ACTIVE',
      }

      const orderBy = { [sortBy]: sortOrder }

      const [courses, total] = await Promise.all([
        ctx.prisma.course.findMany({
          where,
          orderBy,
          take: limit,
          skip: offset,
          include: {
            college: {
              select: {
                id: true,
                name: true,
                slug: true,
                logo: true,
                city: true,
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
            specializations: {
              select: {
                id: true,
                name: true,
                slug: true,
                shortDescription: true,
              },
              where: { status: 'ACTIVE' },
              take: 3, // Limit specializations for performance
            },
            _count: {
              select: {
                specializations: {
                  where: { status: 'ACTIVE' },
                },
              },
            },
          },
        }),
        ctx.prisma.course.count({ where }),
      ])

      return {
        courses,
        total,
        hasMore: offset + limit < total,
      }
    }),

  // Get course by slug
  getBySlug: publicProcedure
    .input(courseBySlugSchema)
    .query(async ({ input, ctx }) => {
      const course = await ctx.prisma.course.findUnique({
        where: { slug: input.slug, status: 'ACTIVE' },
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
          specializations: {
            where: { status: 'ACTIVE' },
            orderBy: { name: 'asc' },
          },
          _count: {
            select: {
              specializations: {
                where: { status: 'ACTIVE' },
              },
              bookmarks: true,
            },
          },
        },
      })

      if (!course) {
        throw new Error('Course not found')
      }

      return course
    }),

  // Get course by ID
  getById: publicProcedure
    .input(courseByIdSchema)
    .query(async ({ input, ctx }) => {
      const course = await ctx.prisma.course.findUnique({
        where: { id: input.id, status: 'ACTIVE' },
        include: {
          college: {
            include: {
              country: true,
            },
          },
          specializations: {
            where: { status: 'ACTIVE' },
            take: 5,
          },
          _count: {
            select: {
              specializations: {
                where: { status: 'ACTIVE' },
              },
            },
          },
        },
      })

      if (!course) {
        throw new Error('Course not found')
      }

      return course
    }),

  // Get featured courses
  getFeatured: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.course.findMany({
      where: { featured: true, status: 'ACTIVE' },
      take: 8,
      include: {
        college: {
          select: {
            id: true,
            name: true,
            slug: true,
            logo: true,
            city: true,
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
        _count: {
          select: {
            specializations: {
              where: { status: 'ACTIVE' },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  }),

  // Get courses by college
  getByCollege: publicProcedure
    .input(z.object({ collegeId: z.string(), limit: z.number().default(20) }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.course.findMany({
        where: { collegeId: input.collegeId, status: 'ACTIVE' },
        take: input.limit,
        include: {
          specializations: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
            where: { status: 'ACTIVE' },
            take: 3,
          },
          _count: {
            select: {
              specializations: {
                where: { status: 'ACTIVE' },
              },
            },
          },
        },
        orderBy: { name: 'asc' },
      })
    }),

  // Get courses by degree type
  getByDegree: publicProcedure
    .input(z.object({ 
      degree: z.enum(['CERTIFICATE', 'DIPLOMA', 'ASSOCIATE', 'BACHELOR', 'MASTER', 'DOCTORATE', 'POST_DOCTORATE']),
      limit: z.number().default(10) 
    }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.course.findMany({
        where: { degree: input.degree, status: 'ACTIVE' },
        take: input.limit,
        include: {
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
          _count: {
            select: {
              specializations: {
                where: { status: 'ACTIVE' },
              },
            },
          },
        },
        orderBy: { name: 'asc' },
      })
    }),

  // Get popular courses (based on bookmarks/leads)
  getPopular: publicProcedure
    .input(z.object({ limit: z.number().default(6) }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.course.findMany({
        where: { status: 'ACTIVE' },
        take: input.limit,
        include: {
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
          _count: {
            select: {
              bookmarks: true,
              leads: true,
            },
          },
        },
        orderBy: [
          {
            bookmarks: {
              _count: 'desc',
            },
          },
          {
            leads: {
              _count: 'desc',
            },
          },
        ],
      })
    }),
})