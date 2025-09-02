import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { fallbackStorage } from '@/lib/fallback-storage'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.college_id) {
      return NextResponse.json(
        { error: 'Missing required fields: name and college_id are required' },
        { status: 400 }
      )
    }

    // Create course code if not provided
    const courseCode = body.course_code || body.name
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .substring(0, 10)

    // Prepare course data
    const now = new Date().toISOString()
    const courseData = {
      college_id: parseInt(body.college_id),
      name: body.name,
      short_name: body.short_name || null,
      degree_type: body.degree_type || null,
      duration: body.duration || null,
      total_seats: body.total_seats ? parseInt(body.total_seats) : null,
      fees: body.fees ? parseInt(body.fees) : null,
      description: body.description || null,
      eligibility: body.eligibility || null,
      admission_process: body.admission_process || null,
      status: body.status || 'ACTIVE',
      featured: body.featured || false,
      category: body.category || null,
      intake_dates: body.intake_dates || [],
      application_deadline: body.application_deadline || null,
      acceptance_rate: body.acceptance_rate ? parseFloat(body.acceptance_rate) : null,
      ranking: body.ranking ? parseInt(body.ranking) : null,
      students_enrolled: body.students_enrolled ? parseInt(body.students_enrolled) : 0,
      max_capacity: body.max_capacity ? parseInt(body.max_capacity) : null,
      course_code: courseCode,
      credits: body.credits ? parseInt(body.credits) : null,
      mode: body.mode || null,
      specializations: body.specializations || [],
      is_sample: false,
      created_at: now,
      updated_at: now
    }

    console.log('📚 Creating course:', courseData)

    // Try direct REST API call to Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    
    const response = await fetch(`${supabaseUrl}/rest/v1/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(courseData)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Direct Supabase API error:', errorText)
      return NextResponse.json(
        { error: 'Failed to create course in database' },
        { status: 500 }
      )
    }

    const data = await response.json()
    console.log('✅ Course created successfully in Supabase:', data)

    return NextResponse.json({
      success: true,
      data: data[0], // API returns array, take first item
      message: 'Course created successfully'
    })

  } catch (error) {
    console.error('❌ Course creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    console.log('📚 Fetching courses...')

    // Try direct REST API call to Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    
    // Fetch courses with college information
    const response = await fetch(`${supabaseUrl}/rest/v1/courses?select=*,colleges(name,location,country)&order=created_at.desc`, {
      method: 'GET',
      headers: {
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Direct Supabase API error:', errorText)
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch courses',
        data: []
      })
    }

    const data = await response.json()
    console.log('✅ Fetched courses from Supabase:', data.length)

    return NextResponse.json({
      success: true,
      data: data,
      count: data.length
    })

  } catch (error) {
    console.error('❌ Error fetching courses:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      data: []
    })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      )
    }

    console.log('🔄 Updating course:', { id, updateData })

    // Clean the update data
    const cleanUpdateData: any = {
      updated_at: new Date().toISOString()
    }

    // Add fields if they exist
    if (updateData.name) cleanUpdateData.name = updateData.name
    if (updateData.short_name !== undefined) cleanUpdateData.short_name = updateData.short_name
    if (updateData.degree_type !== undefined) cleanUpdateData.degree_type = updateData.degree_type
    if (updateData.duration !== undefined) cleanUpdateData.duration = updateData.duration
    if (updateData.total_seats !== undefined) cleanUpdateData.total_seats = parseInt(updateData.total_seats)
    if (updateData.fees !== undefined) cleanUpdateData.fees = parseInt(updateData.fees)
    if (updateData.description !== undefined) cleanUpdateData.description = updateData.description
    if (updateData.eligibility !== undefined) cleanUpdateData.eligibility = updateData.eligibility
    if (updateData.admission_process !== undefined) cleanUpdateData.admission_process = updateData.admission_process
    if (updateData.status !== undefined) cleanUpdateData.status = updateData.status
    if (updateData.featured !== undefined) cleanUpdateData.featured = updateData.featured
    if (updateData.category !== undefined) cleanUpdateData.category = updateData.category
    if (updateData.intake_dates !== undefined) cleanUpdateData.intake_dates = updateData.intake_dates
    if (updateData.application_deadline !== undefined) cleanUpdateData.application_deadline = updateData.application_deadline
    if (updateData.acceptance_rate !== undefined) cleanUpdateData.acceptance_rate = parseFloat(updateData.acceptance_rate)
    if (updateData.ranking !== undefined) cleanUpdateData.ranking = parseInt(updateData.ranking)
    if (updateData.students_enrolled !== undefined) cleanUpdateData.students_enrolled = parseInt(updateData.students_enrolled)
    if (updateData.max_capacity !== undefined) cleanUpdateData.max_capacity = parseInt(updateData.max_capacity)
    if (updateData.course_code !== undefined) cleanUpdateData.course_code = updateData.course_code
    if (updateData.credits !== undefined) cleanUpdateData.credits = parseInt(updateData.credits)
    if (updateData.mode !== undefined) cleanUpdateData.mode = updateData.mode
    if (updateData.specializations !== undefined) cleanUpdateData.specializations = updateData.specializations

    const { data, error } = await supabaseAdmin
      .from('courses')
      .update(cleanUpdateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('❌ Course update error:', error)
      return NextResponse.json(
        { error: 'Failed to update course', details: error.message },
        { status: 500 }
      )
    }

    console.log('✅ Course updated successfully:', data)

    return NextResponse.json({
      success: true,
      data: data,
      message: 'Course updated successfully'
    })

  } catch (error) {
    console.error('❌ Course update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      )
    }

    const { error } = await supabaseAdmin
      .from('courses')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('❌ Course delete error:', error)
      return NextResponse.json(
        { error: 'Failed to delete course' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Course deleted successfully'
    })

  } catch (error) {
    console.error('❌ Course delete error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}