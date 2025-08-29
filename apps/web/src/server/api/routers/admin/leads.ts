import { z } from 'zod'
import { createTRPCRouter, adminProcedure } from '@/server/api/trpc'
import { startOfDay, endOfDay, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns'

const leadsListSchema = z.object({
  query: z.string().optional(),
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'CLOSED']).optional(),
  source: z.string().optional(),
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
  limit: z.number().min(1).max(100).default(20),
  offset: z.number().min(0).default(0),
  sortBy: z.enum(['createdAt', 'updatedAt', 'name', 'email']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

const dateRangeSchema = z.object({
  from: z.date(),
  to: z.date(),
})

const exportLeadsSchema = z.object({
  format: z.enum(['CSV', 'EXCEL']).default('CSV'),
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'CLOSED']).optional(),
  source: z.string().optional(),
})

export const adminLeadsRouter = createTRPCRouter({
  // Get all leads with filtering and pagination
  getAll: adminProcedure
    .input(leadsListSchema)
    .query(async ({ input, ctx }) => {
      const { query, status, source, dateFrom, dateTo, limit, offset, sortBy, sortOrder } = input

      const where = {
        ...(query && {
          OR: [
            { name: { contains: query, mode: 'insensitive' as const } },
            { email: { contains: query, mode: 'insensitive' as const } },
            { phone: { contains: query, mode: 'insensitive' as const } },
            { message: { contains: query, mode: 'insensitive' as const } },
          ],
        }),
        ...(status && { status }),
        ...(source && { source }),
        ...(dateFrom && dateTo && {
          createdAt: {
            gte: startOfDay(dateFrom),
            lte: endOfDay(dateTo),
          },
        }),
      }

      const orderBy = { [sortBy]: sortOrder }

      const [leads, total] = await Promise.all([
        ctx.prisma.lead.findMany({
          where,
          orderBy,
          take: limit,
          skip: offset,
          include: {
            interestedColleges: {
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
            interestedCourses: {
              select: {
                id: true,
                name: true,
                slug: true,
                degree: true,
                level: true,
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
        pagination: {
          offset,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      }
    }),

  // Get single lead by ID
  getById: adminProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const lead = await ctx.prisma.lead.findUnique({
        where: { id: input.id },
        include: {
          interestedColleges: {
            include: {
              country: {
                select: {
                  name: true,
                  code: true,
                  flag: true,
                },
              },
            },
          },
          interestedCourses: {
            include: {
              college: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },
        },
      })

      if (!lead) {
        throw new Error('Lead not found')
      }

      return lead
    }),

  // Get lead analytics dashboard
  getAnalytics: adminProcedure
    .input(z.object({
      period: z.enum(['today', 'yesterday', 'week', 'month', 'custom']).default('today'),
      dateFrom: z.date().optional(),
      dateTo: z.date().optional(),
    }))
    .query(async ({ input, ctx }) => {
      let dateRange: { from: Date; to: Date }

      // Calculate date range based on period
      switch (input.period) {
        case 'today':
          dateRange = {
            from: startOfDay(new Date()),
            to: endOfDay(new Date()),
          }
          break
        case 'yesterday':
          const yesterday = subDays(new Date(), 1)
          dateRange = {
            from: startOfDay(yesterday),
            to: endOfDay(yesterday),
          }
          break
        case 'week':
          dateRange = {
            from: startOfWeek(new Date()),
            to: endOfWeek(new Date()),
          }
          break
        case 'month':
          dateRange = {
            from: startOfMonth(new Date()),
            to: endOfMonth(new Date()),
          }
          break
        case 'custom':
          if (!input.dateFrom || !input.dateTo) {
            throw new Error('Custom date range requires both dateFrom and dateTo')
          }
          dateRange = {
            from: startOfDay(input.dateFrom),
            to: endOfDay(input.dateTo),
          }
          break
      }

      const whereClause = {
        createdAt: {
          gte: dateRange.from,
          lte: dateRange.to,
        },
      }

      // Get basic stats
      const [totalLeads, newLeads, contactedLeads, qualifiedLeads, convertedLeads] = await Promise.all([
        ctx.prisma.lead.count({ where: whereClause }),
        ctx.prisma.lead.count({ where: { ...whereClause, status: 'NEW' } }),
        ctx.prisma.lead.count({ where: { ...whereClause, status: 'CONTACTED' } }),
        ctx.prisma.lead.count({ where: { ...whereClause, status: 'QUALIFIED' } }),
        ctx.prisma.lead.count({ where: { ...whereClause, status: 'CONVERTED' } }),
      ])

      // Get leads by source
      const leadsBySource = await ctx.prisma.lead.groupBy({
        by: ['source'],
        where: whereClause,
        _count: {
          id: true,
        },
        orderBy: {
          _count: {
            id: 'desc',
          },
        },
      })

      // Get hourly distribution (for today/yesterday)
      let hourlyData: Array<{ hour: number; count: number }> = []
      if (input.period === 'today' || input.period === 'yesterday') {
        const rawHourlyData = await ctx.prisma.$queryRaw<Array<{ hour: number; count: bigint }>>`
          SELECT EXTRACT(HOUR FROM "createdAt") as hour, COUNT(*) as count
          FROM "Lead"
          WHERE "createdAt" >= ${dateRange.from} AND "createdAt" <= ${dateRange.to}
          GROUP BY EXTRACT(HOUR FROM "createdAt")
          ORDER BY hour
        `
        
        hourlyData = rawHourlyData.map(row => ({
          hour: row.hour,
          count: Number(row.count),
        }))
      }

      // Get daily trend for longer periods
      let dailyData: Array<{ date: string; count: number }> = []
      if (input.period === 'week' || input.period === 'month' || input.period === 'custom') {
        const rawDailyData = await ctx.prisma.$queryRaw<Array<{ date: Date; count: bigint }>>`
          SELECT DATE("createdAt") as date, COUNT(*) as count
          FROM "Lead"
          WHERE "createdAt" >= ${dateRange.from} AND "createdAt" <= ${dateRange.to}
          GROUP BY DATE("createdAt")
          ORDER BY date
        `
        
        dailyData = rawDailyData.map(row => ({
          date: row.date.toISOString().split('T')[0],
          count: Number(row.count),
        }))
      }

      // Get top interested colleges
      const topColleges = await ctx.prisma.college.findMany({
        where: {
          leadInterests: {
            some: {
              createdAt: {
                gte: dateRange.from,
                lte: dateRange.to,
              },
            },
          },
        },
        include: {
          _count: {
            select: {
              leadInterests: {
                where: {
                  createdAt: {
                    gte: dateRange.from,
                    lte: dateRange.to,
                  },
                },
              },
            },
          },
        },
        orderBy: {
          leadInterests: {
            _count: 'desc',
          },
        },
        take: 10,
      })

      // Get top interested courses
      const topCourses = await ctx.prisma.course.findMany({
        where: {
          leadInterests: {
            some: {
              createdAt: {
                gte: dateRange.from,
                lte: dateRange.to,
              },
            },
          },
        },
        include: {
          college: {
            select: {
              name: true,
            },
          },
          _count: {
            select: {
              leadInterests: {
                where: {
                  createdAt: {
                    gte: dateRange.from,
                    lte: dateRange.to,
                  },
                },
              },
            },
          },
        },
        orderBy: {
          leadInterests: {
            _count: 'desc',
          },
        },
        take: 10,
      })

      return {
        period: input.period,
        dateRange,
        stats: {
          totalLeads,
          newLeads,
          contactedLeads,
          qualifiedLeads,
          convertedLeads,
          conversionRate: totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0,
        },
        charts: {
          sourceBreakdown: leadsBySource.map(item => ({
            source: item.source || 'Unknown',
            count: item._count.id,
          })),
          hourlyDistribution: hourlyData,
          dailyTrend: dailyData,
        },
        insights: {
          topColleges: topColleges.map(college => ({
            id: college.id,
            name: college.name,
            slug: college.slug,
            interestCount: college._count.leadInterests,
          })),
          topCourses: topCourses.map(course => ({
            id: course.id,
            name: course.name,
            slug: course.slug,
            collegeName: course.college.name,
            interestCount: course._count.leadInterests,
          })),
        },
      }
    }),

  // Update lead status
  updateStatus: adminProcedure
    .input(z.object({
      id: z.string(),
      status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'CLOSED']),
      notes: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { id, status, notes } = input

      const lead = await ctx.prisma.lead.findUnique({
        where: { id },
      })

      if (!lead) {
        throw new Error('Lead not found')
      }

      const updatedLead = await ctx.prisma.lead.update({
        where: { id },
        data: {
          status,
          ...(notes && { notes }),
          updatedAt: new Date(),
        },
      })

      return { success: true, lead: updatedLead }
    }),

  // Get export data (for CSV/Excel)
  getExportData: adminProcedure
    .input(exportLeadsSchema)
    .query(async ({ input, ctx }) => {
      const { dateFrom, dateTo, status, source } = input

      const where = {
        ...(status && { status }),
        ...(source && { source }),
        ...(dateFrom && dateTo && {
          createdAt: {
            gte: startOfDay(dateFrom),
            lte: endOfDay(dateTo),
          },
        }),
      }

      const leads = await ctx.prisma.lead.findMany({
        where,
        include: {
          interestedColleges: {
            select: {
              name: true,
              city: true,
              country: {
                select: { name: true },
              },
            },
          },
          interestedCourses: {
            select: {
              name: true,
              degree: true,
              level: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      })

      // Transform data for export
      const exportData = leads.map(lead => ({
        id: lead.id,
        name: lead.name,
        email: lead.email,
        phone: lead.phone || '',
        age: lead.age || '',
        gender: lead.gender || '',
        nationality: lead.nationality || '',
        currentEducation: lead.currentEducation || '',
        workExperience: lead.workExperience || '',
        preferredCountry: lead.preferredCountry || '',
        budgetRange: lead.budgetRange || '',
        intakePreference: lead.intakePreference || '',
        message: lead.message || '',
        source: lead.source || '',
        status: lead.status,
        interestedColleges: lead.interestedColleges
          .map(college => `${college.name}, ${college.city}, ${college.country.name}`)
          .join('; '),
        interestedCourses: lead.interestedCourses
          .map(course => `${course.name} (${course.degree}, ${course.level})`)
          .join('; '),
        createdAt: lead.createdAt.toISOString(),
        updatedAt: lead.updatedAt.toISOString(),
        notes: lead.notes || '',
      }))

      return {
        data: exportData,
        filename: `leads-export-${new Date().toISOString().split('T')[0]}`,
        totalRecords: exportData.length,
      }
    }),

  // Get lead sources for filtering
  getSources: adminProcedure.query(async ({ ctx }) => {
    const sources = await ctx.prisma.lead.findMany({
      select: { source: true },
      distinct: ['source'],
      where: { source: { not: null } },
    })

    return sources
      .map(item => item.source)
      .filter(Boolean)
      .sort()
  }),

  // Get dashboard summary stats
  getSummaryStats: adminProcedure.query(async ({ ctx }) => {
    const today = new Date()
    const yesterday = subDays(today, 1)
    const lastWeek = subDays(today, 7)
    const lastMonth = subDays(today, 30)

    const [
      totalLeads,
      todayLeads,
      yesterdayLeads,
      weekLeads,
      monthLeads,
      newLeads,
      convertedLeads,
    ] = await Promise.all([
      ctx.prisma.lead.count(),
      ctx.prisma.lead.count({
        where: {
          createdAt: {
            gte: startOfDay(today),
            lte: endOfDay(today),
          },
        },
      }),
      ctx.prisma.lead.count({
        where: {
          createdAt: {
            gte: startOfDay(yesterday),
            lte: endOfDay(yesterday),
          },
        },
      }),
      ctx.prisma.lead.count({
        where: {
          createdAt: { gte: lastWeek },
        },
      }),
      ctx.prisma.lead.count({
        where: {
          createdAt: { gte: lastMonth },
        },
      }),
      ctx.prisma.lead.count({
        where: { status: 'NEW' },
      }),
      ctx.prisma.lead.count({
        where: { status: 'CONVERTED' },
      }),
    ])

    return {
      totalLeads,
      todayLeads,
      yesterdayLeads,
      weekLeads,
      monthLeads,
      newLeads,
      convertedLeads,
      conversionRate: totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0,
      growthRate: {
        daily: yesterdayLeads > 0 ? ((todayLeads - yesterdayLeads) / yesterdayLeads) * 100 : 0,
        weekly: weekLeads > 0 ? ((todayLeads - weekLeads + todayLeads) / weekLeads) * 100 : 0,
      },
    }
  }),
})