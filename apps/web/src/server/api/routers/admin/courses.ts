import { z } from 'zod'
import { createTRPCRouter, adminProcedure } from '@/server/api/trpc'

const courseCreateSchema = z.object({
  name: z.string().min(1, 'Course name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  degree: z.string().min(1, 'Degree is required'),
  level: z.enum(['UNDERGRADUATE', 'GRADUATE', 'POSTGRADUATE', 'DIPLOMA', 'CERTIFICATE']),
  duration: z.number().int().min(1, 'Duration must be at least 1 month'),
  durationUnit: z.enum(['MONTHS', 'YEARS']).default('MONTHS'),
  credits: z.number().int().min(0).optional(),
  language: z.string().default('English'),
  format: z.enum(['ON_CAMPUS', 'ONLINE', 'HYBRID']).default('ON_CAMPUS'),
  tuitionFee: z.number().min(0).optional(),
  applicationFee: z.number().min(0).optional(),
  currency: z.string().default('USD'),
  intakeMonths: z.array(z.string()).default([]),
  applicationDeadline: z.string().optional(),
  eligibilityCriteria: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).default([]),
  careerOutcomes: z.array(z.string()).default([]),
  syllabus: z.record(z.any()).default({}),
  featured: z.boolean().default(false),
  status: z.enum(['ACTIVE', 'INACTIVE', 'DRAFT']).default('DRAFT'),
  collegeId: z.string().min(1, 'College is required'),
})

const courseUpdateSchema = courseCreateSchema.extend({
  id: z.string().min(1, 'Course ID is required'),
}).partial().extend({
  id: z.string().min(1, 'Course ID is required'),
})

const adminCourseListSchema = z.object({
  query: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'DRAFT']).optional(),
  level: z.enum(['UNDERGRADUATE', 'GRADUATE', 'POSTGRADUATE', 'DIPLOMA', 'CERTIFICATE']).optional(),
  collegeId: z.string().optional(),
  featured: z.boolean().optional(),
  limit: z.number().min(1).max(100).default(20),
  offset: z.number().min(0).default(0),
  sortBy: z.enum(['name', 'createdAt', 'updatedAt', 'tuitionFee']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

export const adminCoursesRouter = createTRPCRouter({
  // Get all courses for admin
  getAll: adminProcedure
    .input(adminCourseListSchema)
    .query(async ({ input, ctx }) => {
      const { query, status, level, collegeId, featured, limit, offset, sortBy, sortOrder } = input

      const where = {
        ...(query && {
          OR: [
            { name: { contains: query, mode: 'insensitive' as const } },
            { description: { contains: query, mode: 'insensitive' as const } },
            { degree: { contains: query, mode: 'insensitive' as const } },
            { slug: { contains: query, mode: 'insensitive' as const } },
          ],
        }),
        ...(status && { status }),
        ...(level && { level }),
        ...(collegeId && { collegeId }),
        ...(featured !== undefined && { featured }),
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
                type: true,
                city: true,
                country: {
                  select: {
                    name: true,
                    code: true,
                    flag: true,
                  },
                },
              },
            },
            _count: {
              select: {
                specializations: true,
                applications: true,
                bookmarks: true,
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
        pagination: {
          offset,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      }
    }),

  // Get single course by ID for admin
  getById: adminProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const course = await ctx.prisma.course.findUnique({
        where: { id: input.id },
        include: {
          college: {
            select: {
              id: true,
              name: true,
              slug: true,
              type: true,
              city: true,
              country: {
                select: {
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
              status: true,
              tuitionFee: true,
              currency: true,
            },
            orderBy: { name: 'asc' },
          },
          _count: {
            select: {
              specializations: true,
              applications: true,
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

  // Create new course
  create: adminProcedure
    .input(courseCreateSchema)
    .mutation(async ({ input, ctx }) => {
      // Check if slug already exists within the same college
      const existingCourse = await ctx.prisma.course.findFirst({
        where: { 
          slug: input.slug,
          collegeId: input.collegeId,
        },
      })

      if (existingCourse) {
        throw new Error('A course with this slug already exists in this college')
      }

      // Verify college exists
      const college = await ctx.prisma.college.findUnique({
        where: { id: input.collegeId },
        select: { id: true, name: true },
      })

      if (!college) {
        throw new Error('College not found')
      }

      const course = await ctx.prisma.course.create({
        data: {
          ...input,
          createdBy: ctx.user.id,
          updatedBy: ctx.user.id,
        },
        include: {
          college: {
            select: {
              id: true,
              name: true,
              slug: true,
              city: true,
              country: {
                select: {
                  name: true,
                  code: true,
                },
              },
            },
          },
          _count: {
            select: { specializations: true },
          },
        },
      })

      return course
    }),

  // Update course
  update: adminProcedure
    .input(courseUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, ...updateData } = input

      // Check if course exists
      const existingCourse = await ctx.prisma.course.findUnique({
        where: { id },
        select: { slug: true, collegeId: true },
      })

      if (!existingCourse) {
        throw new Error('Course not found')
      }

      // Check if slug is being changed and if it conflicts
      if (updateData.slug && updateData.slug !== existingCourse.slug) {
        const collegeId = updateData.collegeId || existingCourse.collegeId
        const slugExists = await ctx.prisma.course.findFirst({
          where: { 
            slug: updateData.slug,
            collegeId: collegeId,
            id: { not: id },
          },
        })
        if (slugExists) {
          throw new Error('A course with this slug already exists in this college')
        }
      }

      // If collegeId is being changed, verify new college exists
      if (updateData.collegeId && updateData.collegeId !== existingCourse.collegeId) {
        const college = await ctx.prisma.college.findUnique({
          where: { id: updateData.collegeId },
          select: { id: true },
        })
        if (!college) {
          throw new Error('College not found')
        }
      }

      const course = await ctx.prisma.course.update({
        where: { id },
        data: {
          ...updateData,
          updatedBy: ctx.user.id,
          updatedAt: new Date(),
        },
        include: {
          college: {
            select: {
              id: true,
              name: true,
              slug: true,
              city: true,
              country: {
                select: {
                  name: true,
                  code: true,
                },
              },
            },
          },
          _count: {
            select: { specializations: true },
          },
        },
      })

      return course
    }),

  // Delete course (soft delete)
  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const course = await ctx.prisma.course.findUnique({
        where: { id: input.id },
        include: { _count: { select: { specializations: true } } },
      })

      if (!course) {
        throw new Error('Course not found')
      }

      // Check if course has active specializations
      if (course._count.specializations > 0) {
        throw new Error('Cannot delete course with active specializations. Please delete or transfer specializations first.')
      }

      const deletedCourse = await ctx.prisma.course.update({
        where: { id: input.id },
        data: {
          status: 'INACTIVE',
          updatedBy: ctx.user.id,
          updatedAt: new Date(),
        },
      })

      return { success: true, course: deletedCourse }
    }),

  // Bulk operations
  bulkUpdateStatus: adminProcedure
    .input(z.object({
      ids: z.array(z.string()).min(1),
      status: z.enum(['ACTIVE', 'INACTIVE', 'DRAFT']),
    }))
    .mutation(async ({ input, ctx }) => {
      const { ids, status } = input

      const result = await ctx.prisma.course.updateMany({
        where: { id: { in: ids } },
        data: {
          status,
          updatedBy: ctx.user.id,
          updatedAt: new Date(),
        },
      })

      return { success: true, updated: result.count }
    }),

  // Toggle featured status
  toggleFeatured: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const course = await ctx.prisma.course.findUnique({
        where: { id: input.id },
        select: { featured: true },
      })

      if (!course) {
        throw new Error('Course not found')
      }

      const updatedCourse = await ctx.prisma.course.update({
        where: { id: input.id },
        data: {
          featured: !course.featured,
          updatedBy: ctx.user.id,
          updatedAt: new Date(),
        },
      })

      return { success: true, featured: updatedCourse.featured }
    }),

  // Get courses for dropdown (by college)
  getByCollege: adminProcedure
    .input(z.object({ collegeId: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.course.findMany({
        where: { collegeId: input.collegeId },
        select: {
          id: true,
          name: true,
          slug: true,
          degree: true,
          level: true,
          status: true,
        },
        orderBy: { name: 'asc' },
      })
    }),

  // Get colleges for dropdown
  getColleges: adminProcedure.query(async ({ ctx }) => {
    return ctx.prisma.college.findMany({
      where: { status: 'ACTIVE' },
      select: {
        id: true,
        name: true,
        slug: true,
        city: true,
        country: {
          select: {
            name: true,
            code: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    })
  }),

  // Get dashboard stats
  getStats: adminProcedure.query(async ({ ctx }) => {
    const [total, active, inactive, draft, featured] = await Promise.all([
      ctx.prisma.course.count(),
      ctx.prisma.course.count({ where: { status: 'ACTIVE' } }),
      ctx.prisma.course.count({ where: { status: 'INACTIVE' } }),
      ctx.prisma.course.count({ where: { status: 'DRAFT' } }),
      ctx.prisma.course.count({ where: { featured: true } }),
    ])

    return {
      total,
      active,
      inactive,
      draft,
      featured,
    }
  }),
})