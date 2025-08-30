import { z } from 'zod'
import { createTRPCRouter, publicProcedure, protectedProcedure, adminProcedure } from '@/server/api/trpc'

const createLeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  country: z.string().optional(),
  collegeId: z.string().optional(),
  courseId: z.string().optional(),
  specializationId: z.string().optional(),
  interestedCountries: z.array(z.string()).optional(),
  budgetRange: z.string().optional(),
  studyLevel: z.enum(['UNDERGRADUATE', 'POSTGRADUATE', 'DOCTORATE', 'CERTIFICATE', 'DIPLOMA']).optional(),
  source: z.string().optional(),
  notes: z.string().optional(),
})

const updateLeadSchema = z.object({
  id: z.string(),
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'NEGOTIATING', 'CONVERTED', 'LOST', 'FOLLOW_UP']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  assignedTo: z.string().optional(),
  notes: z.string().optional(),
  followUpDate: z.date().optional(),
})

const leadSearchSchema = z.object({
  query: z.string().optional(),
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'NEGOTIATING', 'CONVERTED', 'LOST', 'FOLLOW_UP']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  assignedTo: z.string().optional(),
  createdAfter: z.date().optional(),
  createdBefore: z.date().optional(),
  limit: z.number().min(1).max(100).default(20),
  offset: z.number().min(0).default(0),
  sortBy: z.enum(['createdAt', 'name', 'status']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

export const leadsRouter = createTRPCRouter({
  // Create a new lead (public - from contact forms)
  create: publicProcedure
    .input(createLeadSchema)
    .mutation(async ({ input, ctx }) => {
      const { userId } = ctx.session?.user || {}

      // Check if lead with this email already exists
      const existingLead = await ctx.prisma.lead.findFirst({
        where: { email: input.email },
      })

      if (existingLead) {
        // Update existing lead with new information
        return ctx.prisma.lead.update({
          where: { id: existingLead.id },
          data: {
            ...input,
            ...(userId && { userId }),
            updatedAt: new Date(),
          },
          include: {
            college: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
            course: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
            specialization: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        })
      }

      return ctx.prisma.lead.create({
        data: {
          ...input,
          ...(userId && { userId }),
        },
        include: {
          college: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          course: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          specialization: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      })
    }),

  // Get user's leads
  getUserLeads: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.lead.findMany({
      where: { userId: ctx.session.user.id },
      include: {
        college: {
          select: {
            id: true,
            name: true,
            slug: true,
            logo: true,
          },
        },
        course: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        specialization: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  }),

  // Admin: Search and filter leads
  search: adminProcedure
    .input(leadSearchSchema)
    .query(async ({ input, ctx }) => {
      const { 
        query, 
        status, 
        priority, 
        assignedTo, 
        createdAfter, 
        createdBefore,
        limit, 
        offset, 
        sortBy, 
        sortOrder 
      } = input

      const where = {
        ...(query && {
          OR: [
            { name: { contains: query, mode: 'insensitive' as const } },
            { email: { contains: query, mode: 'insensitive' as const } },
            { phone: { contains: query, mode: 'insensitive' as const } },
          ],
        }),
        ...(status && { status }),
        ...(priority && { priority }),
        ...(assignedTo && { assignedTo }),
        ...(createdAfter && { createdAt: { gte: createdAfter } }),
        ...(createdBefore && { createdAt: { lte: createdBefore } }),
      }

      const orderBy = { [sortBy]: sortOrder }

      const [leads, total] = await Promise.all([
        ctx.prisma.lead.findMany({
          where,
          orderBy,
          take: limit,
          skip: offset,
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            college: {
              select: {
                id: true,
                name: true,
                slug: true,
                logo: true,
              },
            },
            course: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
            specialization: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        }),
        ctx.prisma.lead.count({ where }),
      ])

      return {
        leads,
        total,
        hasMore: offset + limit < total,
      }
    }),

  // Admin: Update lead
  update: adminProcedure
    .input(updateLeadSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, ...updateData } = input

      return ctx.prisma.lead.update({
        where: { id },
        data: updateData,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          college: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          course: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          specialization: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      })
    }),

  // Admin: Get lead by ID
  getById: adminProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const lead = await ctx.prisma.lead.findUnique({
        where: { id: input.id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              profile: true,
            },
          },
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
          course: {
            select: {
              id: true,
              name: true,
              slug: true,
              degree: true,
              level: true,
            },
          },
          specialization: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      })

      if (!lead) {
        throw new Error('Lead not found')
      }

      return lead
    }),

  // Admin: Get lead statistics
  getStats: adminProcedure.query(async ({ ctx }) => {
    const [
      totalLeads,
      newLeads,
      qualifiedLeads,
      convertedLeads,
      leadsThisMonth,
      leadsToday,
    ] = await Promise.all([
      ctx.prisma.lead.count(),
      ctx.prisma.lead.count({ where: { status: 'NEW' } }),
      ctx.prisma.lead.count({ where: { status: 'QUALIFIED' } }),
      ctx.prisma.lead.count({ where: { status: 'CONVERTED' } }),
      ctx.prisma.lead.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),
      ctx.prisma.lead.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
    ])

    const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0

    return {
      totalLeads,
      newLeads,
      qualifiedLeads,
      convertedLeads,
      leadsThisMonth,
      leadsToday,
      conversionRate: Math.round(conversionRate * 100) / 100,
    }
  }),

  // Admin: Delete lead
  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.lead.delete({
        where: { id: input.id },
      })
    }),
})