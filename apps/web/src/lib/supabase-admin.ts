import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Create a Supabase client with the service role key
// This bypasses RLS policies and allows full CRUD operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'Authorization': `Bearer ${supabaseServiceKey}`
    }
  }
})

// Helper functions for common operations
export const supabaseOperations = {
  // Colleges
  async getColleges() {
    const { data, error } = await supabaseAdmin
      .from('colleges')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async createCollege(college: any) {
    const { data, error } = await supabaseAdmin
      .from('colleges')
      .insert([college])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateCollege(id: string, updates: any) {
    const { data, error } = await supabaseAdmin
      .from('colleges')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deleteCollege(id: string) {
    const { error } = await supabaseAdmin
      .from('colleges')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  },

  // Stats
  async getStats() {
    const [colleges, courses, specializations, leads] = await Promise.all([
      supabaseAdmin.from('colleges').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('courses').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('specializations').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('leads').select('*', { count: 'exact', head: true })
    ])

    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    // Get leads for today and this week
    const { count: todaysLeads } = await supabaseAdmin
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', todayStart.toISOString())

    const { count: weeklyLeads } = await supabaseAdmin
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', weekStart.toISOString())

    return {
      totalColleges: colleges.count || 0,
      totalCourses: courses.count || 0,
      totalSpecializations: specializations.count || 0,
      totalLeads: leads.count || 0,
      todaysLeads: todaysLeads || 0,
      weeklyLeads: weeklyLeads || 0
    }
  }
}