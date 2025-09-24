import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.courseId) {
      return NextResponse.json(
        { error: 'Missing required fields: name and courseId are required' },
        { status: 400 }
      )
    }

    // Create specialization code if not provided
    const specializationCode = body.code || body.name
      .split(' ')
      .map((word: string) => word[0])
      .join('')
      .toUpperCase()

    // Prepare specialization data
    const now = new Date().toISOString()
    const specializationData = {
      course_id: parseInt(body.courseId),
      name: body.name,
      code: specializationCode,
      about: body.about || null,
      description: body.description || null,
      requirements: body.requirements || null,
      career_prospects: body.careerProspects || null,
      syllabus: body.syllabus || null,
      placement_rate: body.placementRate ? parseFloat(body.placementRate) : null,
      avg_package: body.avgPackage ? parseInt(body.avgPackage) : null,
      top_recruiters: body.topRecruiters || null,
      research_areas: body.researchAreas || null,
      lab_facilities: body.labFacilities || null,
      is_sample: false,
      created_at: now,
      updated_at: now
    }

    console.log('🎯 Creating specialization:', specializationData)

    const { data, error } = await supabaseAdmin
      .from('specializations')
      .insert([specializationData])
      .select('*, courses(name)')
      .single()

    if (error) {
      console.error('❌ Specialization creation error:', error)
      return NextResponse.json(
        { error: 'Failed to create specialization in database', details: error.message },
        { status: 500 }
      )
    }

    console.log('✅ Specialization created successfully:', data)

    return NextResponse.json({
      success: true,
      data: data,
      message: 'Specialization created successfully'
    })

  } catch (error) {
    console.error('❌ Specialization creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('🎯 Fetching specializations...')

    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')

    let query = supabaseAdmin
      .from('specializations')
      .select('*, courses(name,colleges(name))')
      .order('created_at', { ascending: false })

    // Filter by course if specified
    if (courseId) {
      query = query.eq('course_id', parseInt(courseId))
    }

    const { data, error } = await query

    if (error) {
      console.error('❌ Specializations fetch error:', error)
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch specializations',
        data: []
      })
    }

    console.log('✅ Fetched specializations:', data?.length || 0)

    return NextResponse.json({
      success: true,
      data: data || [],
      count: data?.length || 0
    })

  } catch (error) {
    console.error('❌ Error fetching specializations:', error)
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
        { error: 'Specialization ID is required' },
        { status: 400 }
      )
    }

    console.log('🔄 Updating specialization:', { id, updateData })

    // Clean the update data
    const cleanUpdateData: any = {
      updated_at: new Date().toISOString()
    }

    // Add fields if they exist
    if (updateData.name) cleanUpdateData.name = updateData.name
    if (updateData.code !== undefined) cleanUpdateData.code = updateData.code
    if (updateData.about !== undefined) cleanUpdateData.about = updateData.about
    if (updateData.description !== undefined) cleanUpdateData.description = updateData.description
    if (updateData.requirements !== undefined) cleanUpdateData.requirements = updateData.requirements
    if (updateData.careerProspects !== undefined) cleanUpdateData.career_prospects = updateData.careerProspects
    if (updateData.syllabus !== undefined) cleanUpdateData.syllabus = updateData.syllabus
    if (updateData.placementRate !== undefined) cleanUpdateData.placement_rate = parseFloat(updateData.placementRate)
    if (updateData.avgPackage !== undefined) cleanUpdateData.avg_package = parseInt(updateData.avgPackage)
    if (updateData.topRecruiters !== undefined) cleanUpdateData.top_recruiters = updateData.topRecruiters
    if (updateData.researchAreas !== undefined) cleanUpdateData.research_areas = updateData.researchAreas
    if (updateData.labFacilities !== undefined) cleanUpdateData.lab_facilities = updateData.labFacilities

    const { data, error } = await supabaseAdmin
      .from('specializations')
      .update(cleanUpdateData)
      .eq('id', id)
      .select('*, courses(name)')
      .single()

    if (error) {
      console.error('❌ Specialization update error:', error)
      return NextResponse.json(
        { error: 'Failed to update specialization', details: error.message },
        { status: 500 }
      )
    }

    console.log('✅ Specialization updated successfully:', data)

    return NextResponse.json({
      success: true,
      data: data,
      message: 'Specialization updated successfully'
    })

  } catch (error) {
    console.error('❌ Specialization update error:', error)
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
        { error: 'Specialization ID is required' },
        { status: 400 }
      )
    }

    const { error } = await supabaseAdmin
      .from('specializations')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('❌ Specialization delete error:', error)
      return NextResponse.json(
        { error: 'Failed to delete specialization' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Specialization deleted successfully'
    })

  } catch (error) {
    console.error('❌ Specialization delete error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}