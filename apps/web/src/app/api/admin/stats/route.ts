import { NextResponse } from 'next/server'
import { supabaseOperations } from '@/lib/supabase-admin'
import { fallbackStorage } from '@/lib/fallback-storage'

export async function GET() {
  try {
    console.log('📊 Fetching dashboard stats...')

    // Get current date boundaries
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    console.log('📅 Date ranges:', { todayStart, weekStart })

    let totalColleges, totalCourses, totalSpecializations, totalLeads, todaysLeads, weeklyLeads

    try {
      // Try Supabase REST API first
      const supabaseStats = await supabaseOperations.getStats()
      
      // Get fallback storage stats
      const fallbackStats = await fallbackStorage.getStats()
      
      // Combine both sources (Supabase + fallback storage)
      totalColleges = supabaseStats.totalColleges + fallbackStats.totalColleges
      totalCourses = supabaseStats.totalCourses + fallbackStats.totalCourses
      totalSpecializations = supabaseStats.totalSpecializations + fallbackStats.totalSpecializations
      totalLeads = supabaseStats.totalLeads + fallbackStats.totalLeads
      todaysLeads = supabaseStats.todaysLeads + fallbackStats.todaysLeads
      weeklyLeads = supabaseStats.weeklyLeads + fallbackStats.weeklyLeads
      
      console.log('📊 Combined stats:', {
        supabase: supabaseStats,
        fallback: fallbackStats,
        total: { totalColleges, totalCourses, totalSpecializations, totalLeads }
      })
    } catch (dbError) {
      console.warn('⚠️ Database connection failed, using fallback storage only:', dbError)
      
      // Use fallback storage when DB is unavailable
      const fallbackStats = await fallbackStorage.getStats()
      totalColleges = fallbackStats.totalColleges
      totalCourses = fallbackStats.totalCourses
      totalSpecializations = fallbackStats.totalSpecializations
      totalLeads = fallbackStats.totalLeads
      todaysLeads = fallbackStats.todaysLeads
      weeklyLeads = fallbackStats.weeklyLeads
    }

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
  }
}