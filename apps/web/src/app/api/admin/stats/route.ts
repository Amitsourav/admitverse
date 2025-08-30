import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    console.log('📊 Fetching dashboard stats...')

    // Get current date boundaries
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    console.log('📅 Date ranges:', { todayStart, weekStart })

    // Parallel queries for better performance
    const [
      totalColleges,
      totalCourses, 
      totalSpecializations,
      totalLeads,
      todaysLeads,
      weeklyLeads
    ] = await Promise.all([
      // Total colleges count (including sample data for now)
      prisma.college.count(),
      
      // Total courses count (including sample data for now)
      prisma.course.count(),
      
      // Total specializations count (including sample data for now)
      prisma.specialization.count(),
      
      // Total leads count (including sample data for now)
      prisma.lead.count(),
      
      // Today's leads count
      prisma.lead.count({
        where: {
          createdAt: {
            gte: todayStart
          }
        }
      }),
      
      // This week's leads count
      prisma.lead.count({
        where: {
          createdAt: {
            gte: weekStart
          }
        }
      })
    ])

    const stats = {
      totalColleges,
      totalCourses,
      totalSpecializations,
      totalLeads,
      todaysLeads,
      weeklyLeads,
      lastUpdated: now.toISOString()
    }

    console.log('📊 Dashboard stats retrieved:', stats)

    return NextResponse.json({
      success: true,
      data: stats
    })
    
  } catch (error) {
    console.error('❌ Dashboard stats error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch dashboard statistics',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}