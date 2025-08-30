import { z } from 'zod'
import { createTRPCRouter, adminProcedure } from '@/server/api/trpc'

const collegeCreateSchema = z.object({
  name: z.string().min(1, 'College name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  type: z.enum(['UNIVERSITY', 'COLLEGE', 'INSTITUTE', 'SCHOOL']),
  establishedYear: z.number().int().min(1800).max(new Date().getFullYear()),
  website: z.string().url().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  countryId: z.string().min(1, 'Country is required'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  logoUrl: z.string().url().optional(),
  coverImageUrl: z.string().url().optional(),
  imageUrls: z.array(z.string().url()).default([]),
  accreditation: z.array(z.string()).default([]),
  rankings: z.record(z.union([z.string(), z.number()])).default({}),
  studentCount: z.number().int().min(0).optional(),
  facultyCount: z.number().int().min(0).optional(),
  campusSize: z.string().optional(),
  facilities: z.record(z.boolean()).default({}),
  tuitionFeeMin: z.number().min(0).optional(),
  tuitionFeeMax: z.number().min(0).optional(),
  applicationFee: z.number().min(0).optional(),
  applicationDeadline: z.string().optional(),
  intakeMonths: z.array(z.string()).default([]),
  languagesOfInstruction: z.array(z.string()).default(['English']),
  scholarshipsAvailable: z.boolean().default(false),
  housingAvailable: z.boolean().default(false),
  virtualTourUrl: z.string().url().optional(),
  featured: z.boolean().default(false),
  status: z.enum(['ACTIVE', 'INACTIVE', 'DRAFT']).default('DRAFT'),
  alumni: z.record(z.any()).default({}),
  recruiters: z.record(z.any()).default({}),
})

const collegeUpdateSchema = collegeCreateSchema.extend({
  id: z.string().min(1, 'College ID is required'),
}).partial().extend({
  id: z.string().min(1, 'College ID is required'),
})

const adminCollegeListSchema = z.object({
  query: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'DRAFT']).optional(),
  featured: z.boolean().optional(),
  countryId: z.string().optional(),
  limit: z.number().min(1).max(100).default(20),
  offset: z.number().min(0).default(0),
  sortBy: z.enum(['name', 'createdAt', 'updatedAt', 'establishedYear']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

export const adminCollegesRouter = createTRPCRouter({
  // Get all colleges for admin (including drafts and inactive)
  getAll: adminProcedure
    .input(adminCollegeListSchema)
    .query(async ({ input, ctx }) => {
      const { query, status, featured, countryId, limit, offset, sortBy, sortOrder } = input

      const where = {
        ...(query && {
          OR: [
            { name: { contains: query, mode: 'insensitive' as const } },
            { description: { contains: query, mode: 'insensitive' as const } },
            { city: { contains: query, mode: 'insensitive' as const } },
            { slug: { contains: query, mode: 'insensitive' as const } },
          ],
        }),
        ...(status && { status }),
        ...(featured !== undefined && { featured }),
        ...(countryId && { countryId }),
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
            _count: {
              select: {
                courses: true,
                reviews: true,
                bookmarks: true,
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
        pagination: {
          offset,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      }
    }),

  // Get single college by ID for admin
  getById: adminProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const college = await ctx.prisma.college.findUnique({
        where: { id: input.id },
        include: {
          country: true,
          courses: {
            include: {
              specializations: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
              _count: {
                select: { specializations: true },
              },
            },
          },
          reviews: {
            include: {
              user: {
                select: { id: true, username: true },
              },
            },
            orderBy: { createdAt: 'desc' },
            take: 5,
          },
          _count: {
            select: {
              courses: true,
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

  // Create new college
  create: adminProcedure
    .input(collegeCreateSchema)
    .mutation(async ({ input, ctx }) => {
      // Check if slug already exists
      const existingCollege = await ctx.prisma.college.findUnique({
        where: { slug: input.slug },
      })

      if (existingCollege) {
        throw new Error('A college with this slug already exists')
      }

      const college = await ctx.prisma.college.create({
        data: {
          ...input,
          createdBy: ctx.user.id,
          updatedBy: ctx.user.id,
        },
        include: {
          country: true,
          _count: {
            select: { courses: true },
          },
        },
      })

      return college
    }),

  // Update college
  update: adminProcedure
    .input(collegeUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, ...updateData } = input

      // Check if college exists
      const existingCollege = await ctx.prisma.college.findUnique({
        where: { id },
      })

      if (!existingCollege) {
        throw new Error('College not found')
      }

      // Check if slug is being changed and if it conflicts with existing
      if (updateData.slug && updateData.slug !== existingCollege.slug) {
        const slugExists = await ctx.prisma.college.findUnique({
          where: { slug: updateData.slug },
        })
        if (slugExists) {
          throw new Error('A college with this slug already exists')
        }
      }

      const college = await ctx.prisma.college.update({
        where: { id },
        data: {
          ...updateData,
          updatedBy: ctx.user.id,
          updatedAt: new Date(),
        },
        include: {
          country: true,
          _count: {
            select: { courses: true },
          },
        },
      })

      return college
    }),

  // Delete college (soft delete - change status to inactive)
  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const college = await ctx.prisma.college.findUnique({
        where: { id: input.id },
        include: { _count: { select: { courses: true } } },
      })

      if (!college) {
        throw new Error('College not found')
      }

      // Check if college has active courses
      if (college._count.courses > 0) {
        throw new Error('Cannot delete college with active courses. Please delete or transfer courses first.')
      }

      const deletedCollege = await ctx.prisma.college.update({
        where: { id: input.id },
        data: {
          status: 'INACTIVE',
          updatedBy: ctx.user.id,
          updatedAt: new Date(),
        },
      })

      return { success: true, college: deletedCollege }
    }),

  // Bulk operations
  bulkUpdateStatus: adminProcedure
    .input(z.object({
      ids: z.array(z.string()).min(1),
      status: z.enum(['ACTIVE', 'INACTIVE', 'DRAFT']),
    }))
    .mutation(async ({ input, ctx }) => {
      const { ids, status } = input

      const result = await ctx.prisma.college.updateMany({
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
      const college = await ctx.prisma.college.findUnique({
        where: { id: input.id },
        select: { featured: true },
      })

      if (!college) {
        throw new Error('College not found')
      }

      const updatedCollege = await ctx.prisma.college.update({
        where: { id: input.id },
        data: {
          featured: !college.featured,
          updatedBy: ctx.user.id,
          updatedAt: new Date(),
        },
      })

      return { success: true, featured: updatedCollege.featured }
    }),

  // Get dashboard stats
  getStats: adminProcedure.query(async ({ ctx }) => {
    const [total, active, inactive, draft, featured] = await Promise.all([
      ctx.prisma.college.count(),
      ctx.prisma.college.count({ where: { status: 'ACTIVE' } }),
      ctx.prisma.college.count({ where: { status: 'INACTIVE' } }),
      ctx.prisma.college.count({ where: { status: 'DRAFT' } }),
      ctx.prisma.college.count({ where: { featured: true } }),
    ])

    return {
      total,
      active,
      inactive,
      draft,
      featured,
    }
  }),

  // Get countries for dropdown
  getCountries: adminProcedure.query(async ({ ctx }) => {
    return ctx.prisma.country.findMany({
      select: {
        id: true,
        name: true,
        code: true,
        flag: true,
      },
      orderBy: { name: 'asc' },
    })
  }),
})