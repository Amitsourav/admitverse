import { z } from 'zod'
import { createTRPCRouter, adminProcedure } from '@/server/api/trpc'

const specializationCreateSchema = z.object({
  name: z.string().min(1, 'Specialization name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  duration: z.number().int().min(1, 'Duration must be at least 1 month').optional(),
  durationUnit: z.enum(['MONTHS', 'YEARS']).default('MONTHS'),
  credits: z.number().int().min(0).optional(),
  tuitionFee: z.number().min(0).optional(),
  currency: z.string().default('USD'),
  eligibilityCriteria: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).default([]),
  careerOutcomes: z.array(z.string()).default([]),
  curriculum: z.record(z.any()).default({}),
  featured: z.boolean().default(false),
  status: z.enum(['ACTIVE', 'INACTIVE', 'DRAFT']).default('DRAFT'),
  courseId: z.string().min(1, 'Course is required'),
})

const specializationUpdateSchema = specializationCreateSchema.extend({
  id: z.string().min(1, 'Specialization ID is required'),
}).partial().extend({
  id: z.string().min(1, 'Specialization ID is required'),
})

const adminSpecializationListSchema = z.object({
  query: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'DRAFT']).optional(),
  courseId: z.string().optional(),
  collegeId: z.string().optional(),
  featured: z.boolean().optional(),
  limit: z.number().min(1).max(100).default(20),
  offset: z.number().min(0).default(0),
  sortBy: z.enum(['name', 'createdAt', 'updatedAt', 'tuitionFee']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

export const adminSpecializationsRouter = createTRPCRouter({
  // Get all specializations for admin
  getAll: adminProcedure
    .input(adminSpecializationListSchema)
    .query(async ({ input, ctx }) => {
      const { query, status, courseId, collegeId, featured, limit, offset, sortBy, sortOrder } = input

      const where = {
        ...(query && {
          OR: [
            { name: { contains: query, mode: 'insensitive' as const } },
            { description: { contains: query, mode: 'insensitive' as const } },
            { slug: { contains: query, mode: 'insensitive' as const } },
          ],
        }),
        ...(status && { status }),
        ...(courseId && { courseId }),
        ...(collegeId && { 
          course: { 
            collegeId: collegeId 
          } 
        }),
        ...(featured !== undefined && { featured }),
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
              },
            },
            _count: {
              select: {
                applications: true,
                bookmarks: true,
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
        pagination: {
          offset,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      }
    }),

  // Get single specialization by ID for admin
  getById: adminProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const specialization = await ctx.prisma.specialization.findUnique({
        where: { id: input.id },
        include: {
          course: {
            select: {
              id: true,
              name: true,
              slug: true,
              degree: true,
              level: true,
              duration: true,
              durationUnit: true,
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
                      flag: true,
                    },
                  },
                },
              },
            },
          },
          _count: {
            select: {
              applications: true,
              bookmarks: true,
            },
          },
        },
      })

      if (!specialization) {
        throw new Error('Specialization not found')
      }

      return specialization
    }),

  // Create new specialization
  create: adminProcedure
    .input(specializationCreateSchema)
    .mutation(async ({ input, ctx }) => {
      // Check if slug already exists within the same course
      const existingSpecialization = await ctx.prisma.specialization.findFirst({
        where: { 
          slug: input.slug,
          courseId: input.courseId,
        },
      })

      if (existingSpecialization) {
        throw new Error('A specialization with this slug already exists in this course')
      }

      // Verify course exists
      const course = await ctx.prisma.course.findUnique({
        where: { id: input.courseId },
        select: { 
          id: true, 
          name: true,
          college: {
            select: { id: true, name: true }
          }
        },
      })

      if (!course) {
        throw new Error('Course not found')
      }

      const specialization = await ctx.prisma.specialization.create({
        data: {
          ...input,
          createdBy: ctx.user.id,
          updatedBy: ctx.user.id,
        },
        include: {
          course: {
            select: {
              id: true,
              name: true,
              slug: true,
              degree: true,
              college: {
                select: {
                  id: true,
                  name: true,
                  city: true,
                  country: {
                    select: {
                      name: true,
                      code: true,
                    },
                  },
                },
              },
            },
          },
        },
      })

      return specialization
    }),

  // Update specialization
  update: adminProcedure
    .input(specializationUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, ...updateData } = input

      // Check if specialization exists
      const existingSpecialization = await ctx.prisma.specialization.findUnique({
        where: { id },
        select: { slug: true, courseId: true },
      })

      if (!existingSpecialization) {
        throw new Error('Specialization not found')
      }

      // Check if slug is being changed and if it conflicts
      if (updateData.slug && updateData.slug !== existingSpecialization.slug) {
        const courseId = updateData.courseId || existingSpecialization.courseId
        const slugExists = await ctx.prisma.specialization.findFirst({
          where: { 
            slug: updateData.slug,
            courseId: courseId,
            id: { not: id },
          },
        })
        if (slugExists) {
          throw new Error('A specialization with this slug already exists in this course')
        }
      }

      // If courseId is being changed, verify new course exists
      if (updateData.courseId && updateData.courseId !== existingSpecialization.courseId) {
        const course = await ctx.prisma.course.findUnique({
          where: { id: updateData.courseId },
          select: { id: true },
        })
        if (!course) {
          throw new Error('Course not found')
        }
      }

      const specialization = await ctx.prisma.specialization.update({
        where: { id },
        data: {
          ...updateData,
          updatedBy: ctx.user.id,
          updatedAt: new Date(),
        },
        include: {
          course: {
            select: {
              id: true,
              name: true,
              slug: true,
              degree: true,
              college: {
                select: {
                  id: true,
                  name: true,
                  city: true,
                  country: {
                    select: {
                      name: true,
                      code: true,
                    },
                  },
                },
              },
            },
          },
        },
      })

      return specialization
    }),

  // Delete specialization (soft delete)
  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const specialization = await ctx.prisma.specialization.findUnique({
        where: { id: input.id },
        include: { _count: { select: { applications: true } } },
      })

      if (!specialization) {
        throw new Error('Specialization not found')
      }

      // Check if specialization has active applications
      if (specialization._count.applications > 0) {
        throw new Error('Cannot delete specialization with active applications.')
      }

      const deletedSpecialization = await ctx.prisma.specialization.update({
        where: { id: input.id },
        data: {
          status: 'INACTIVE',
          updatedBy: ctx.user.id,
          updatedAt: new Date(),
        },
      })

      return { success: true, specialization: deletedSpecialization }
    }),

  // Bulk operations
  bulkUpdateStatus: adminProcedure
    .input(z.object({
      ids: z.array(z.string()).min(1),
      status: z.enum(['ACTIVE', 'INACTIVE', 'DRAFT']),
    }))
    .mutation(async ({ input, ctx }) => {
      const { ids, status } = input

      const result = await ctx.prisma.specialization.updateMany({
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
      const specialization = await ctx.prisma.specialization.findUnique({
        where: { id: input.id },
        select: { featured: true },
      })

      if (!specialization) {
        throw new Error('Specialization not found')
      }

      const updatedSpecialization = await ctx.prisma.specialization.update({
        where: { id: input.id },
        data: {
          featured: !specialization.featured,
          updatedBy: ctx.user.id,
          updatedAt: new Date(),
        },
      })

      return { success: true, featured: updatedSpecialization.featured }
    }),

  // Get specializations by course (for dropdown)
  getByCourse: adminProcedure
    .input(z.object({ courseId: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.specialization.findMany({
        where: { courseId: input.courseId },
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
      })
    }),

  // Get courses for dropdown (grouped by college)
  getCourses: adminProcedure
    .input(z.object({ collegeId: z.string().optional() }))
    .query(async ({ input, ctx }) => {
      const where = input.collegeId ? { collegeId: input.collegeId } : { status: 'ACTIVE' }
      
      return ctx.prisma.course.findMany({
        where,
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
            },
          },
        },
        orderBy: [
          { college: { name: 'asc' } },
          { name: 'asc' },
        ],
      })
    }),

  // Get dashboard stats
  getStats: adminProcedure.query(async ({ ctx }) => {
    const [total, active, inactive, draft, featured] = await Promise.all([
      ctx.prisma.specialization.count(),
      ctx.prisma.specialization.count({ where: { status: 'ACTIVE' } }),
      ctx.prisma.specialization.count({ where: { status: 'INACTIVE' } }),
      ctx.prisma.specialization.count({ where: { status: 'DRAFT' } }),
      ctx.prisma.specialization.count({ where: { featured: true } }),
    ])

    return {
      total,
      active,
      inactive,
      draft,
      featured,
    }
  }),

  // Get specializations grouped by course for visualization
  getGroupedByCourse: adminProcedure
    .input(z.object({ 
      collegeId: z.string().optional(),
      limit: z.number().min(1).max(50).default(10),
    }))
    .query(async ({ input, ctx }) => {
      const courses = await ctx.prisma.course.findMany({
        where: input.collegeId ? { collegeId: input.collegeId } : { status: 'ACTIVE' },
        take: input.limit,
        include: {
          college: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          specializations: {
            select: {
              id: true,
              name: true,
              slug: true,
              status: true,
              tuitionFee: true,
              currency: true,
            },
            orderBy: { name: 'asc' },
          },
          _count: {
            select: { specializations: true },
          },
        },
        orderBy: [
          { college: { name: 'asc' } },
          { name: 'asc' },
        ],
      })

      return courses.map(course => ({
        course: {
          id: course.id,
          name: course.name,
          slug: course.slug,
          college: course.college,
        },
        specializations: course.specializations,
        totalSpecializations: course._count.specializations,
      }))
    }),
})