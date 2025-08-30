import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'

const collegeSearchSchema = z.object({
  query: z.string().optional(),
  countryId: z.string().optional(),
  type: z.enum(['UNIVERSITY', 'COLLEGE', 'INSTITUTE', 'SCHOOL']).optional(),
  featured: z.boolean().optional(),
  limit: z.number().min(1).max(100).default(20),
  offset: z.number().min(0).default(0),
  sortBy: z.enum(['name', 'establishedYear', 'studentCount']).default('name'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
})

const collegeBySlugSchema = z.object({
  slug: z.string(),
})

const collegeByIdSchema = z.object({
  id: z.string(),
})

export const collegesRouter = createTRPCRouter({
  // Get all colleges with filtering and pagination
  search: publicProcedure
    .input(collegeSearchSchema)
    .query(async ({ input, ctx }) => {
      const { query, countryId, type, featured, limit, offset, sortBy, sortOrder } = input

      const where = {
        ...(query && {
          OR: [
            { name: { contains: query, mode: 'insensitive' as const } },
            { description: { contains: query, mode: 'insensitive' as const } },
            { city: { contains: query, mode: 'insensitive' as const } },
          ],
        }),
        ...(countryId && { countryId }),
        ...(type && { type }),
        ...(featured !== undefined && { featured }),
        status: 'ACTIVE',
      }

      const orderBy = { [sortBy]: sortOrder }

      const [colleges, total] = await Promise.all([
        ctx.prisma.college.findMany({
          where,
          orderBy,
          take: limit,
          skip: offset,
          include: {
            country: {
              select: {
                id: true,
                name: true,
                code: true,
                flag: true,
              },
            },
            courses: {
              select: {
                id: true,
                name: true,
                degree: true,
                level: true,
              },
              where: { status: 'ACTIVE' },
              take: 5, // Limit courses for performance
            },
            _count: {
              select: {
                courses: {
                  where: { status: 'ACTIVE' },
                },
                reviews: true,
              },
            },
          },
        }),
        ctx.prisma.college.count({ where }),
      ])

      return {
        colleges,
        total,
        hasMore: offset + limit < total,
      }
    }),

  // Get college by slug
  getBySlug: publicProcedure
    .input(collegeBySlugSchema)
    .query(async ({ input, ctx }) => {
      const college = await ctx.prisma.college.findUnique({
        where: { slug: input.slug, status: 'ACTIVE' },
        include: {
          country: true,
          courses: {
            where: { status: 'ACTIVE' },
            include: {
              specializations: {
                where: { status: 'ACTIVE' },
                select: {
                  id: true,
                  name: true,
                  slug: true,
                  shortDescription: true,
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
          reviews: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  avatar: true,
                },
              },
            },
            orderBy: { createdAt: 'desc' },
            take: 10,
          },
          _count: {
            select: {
              courses: {
                where: { status: 'ACTIVE' },
              },
              reviews: true,
              bookmarks: true,
            },
          },
        },
      })

      if (!college) {
        throw new Error('College not found')
      }

      return college
    }),

  // Get college by ID
  getById: publicProcedure
    .input(collegeByIdSchema)
    .query(async ({ input, ctx }) => {
      const college = await ctx.prisma.college.findUnique({
        where: { id: input.id, status: 'ACTIVE' },
        include: {
          country: true,
          courses: {
            where: { status: 'ACTIVE' },
            take: 10,
          },
          _count: {
            select: {
              courses: {
                where: { status: 'ACTIVE' },
              },
              reviews: true,
            },
          },
        },
      })

      if (!college) {
        throw new Error('College not found')
      }

      return college
    }),

  // Get featured colleges
  getFeatured: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.college.findMany({
      where: { featured: true, status: 'ACTIVE' },
      take: 6,
      include: {
        country: {
          select: {
            id: true,
            name: true,
            code: true,
            flag: true,
          },
        },
        _count: {
          select: {
            courses: {
              where: { status: 'ACTIVE' },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  }),

  // Get colleges by country
  getByCountry: publicProcedure
    .input(z.object({ countryId: z.string(), limit: z.number().default(10) }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.college.findMany({
        where: { countryId: input.countryId, status: 'ACTIVE' },
        take: input.limit,
        include: {
          country: true,
          _count: {
            select: {
              courses: {
                where: { status: 'ACTIVE' },
              },
            },
          },
        },
        orderBy: { name: 'asc' },
      })
    }),

  // Get college statistics
  getStats: publicProcedure.query(async ({ ctx }) => {
    const [totalColleges, totalCountries, totalCourses] = await Promise.all([
      ctx.prisma.college.count({ where: { status: 'ACTIVE' } }),
      ctx.prisma.country.count(),
      ctx.prisma.course.count({ where: { status: 'ACTIVE' } }),
    ])

    return {
      totalColleges,
      totalCountries,
      totalCourses,
    }
  }),
})