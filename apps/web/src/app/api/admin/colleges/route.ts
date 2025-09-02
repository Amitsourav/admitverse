import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { fallbackStorage } from '@/lib/fallback-storage'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.city || !body.country) {
      return NextResponse.json(
        { error: 'Missing required fields: name, city, country' },
        { status: 400 }
      )
    }

    // Create slug from name
    const slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Prepare college data with all required fields
    const now = new Date().toISOString()
    const collegeData = {
      name: body.name,
      slug: slug,
      about: body.description || null,
      description: body.description || null,
      location: `${body.city}, ${body.state || ''}, ${body.country}`.trim(),
      country: body.country,
      ranking: body.ranking ? parseInt(body.ranking) : null,
      acceptance_rate: body.acceptanceRate ? parseFloat(body.acceptanceRate) : null,
      website: body.website || null,
      image_url: null,
      notable_alumni: {},
      facilities: {},
      accreditations: {},
      is_sample: false,
      created_at: now,
      updated_at: now
    }

    console.log('🏫 Creating college:', collegeData)

    // Try direct REST API call to Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    
    console.log('🔗 Supabase URL:', supabaseUrl)
    console.log('🔑 Service key length:', serviceKey ? serviceKey.length : 'undefined')
    
    const response = await fetch(`${supabaseUrl}/rest/v1/colleges`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(collegeData)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Direct Supabase API error:', errorText)
      // Use fallback storage 
      const savedCollege = await fallbackStorage.createCollege(collegeData)
      return NextResponse.json({
        success: true,
        data: savedCollege,
        message: 'College saved to local storage (database API error)',
        fallback: true
      })
    }

    const data = await response.json()

    console.log('✅ College created successfully in Supabase:', data)

    return NextResponse.json({
      success: true,
      data: data[0], // API returns array, take first item
      message: 'College created successfully in Supabase'
    })

  } catch (error) {
    console.error('❌ College creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    console.log('📋 Fetching colleges...')

    // Try direct REST API call to Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    
    const response = await fetch(`${supabaseUrl}/rest/v1/colleges?order=created_at.desc`, {
      method: 'GET',
      headers: {
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Direct Supabase API error:', errorText)
      // Use fallback storage when Supabase fails
      const fallbackColleges = await fallbackStorage.getColleges()
      return NextResponse.json({
        success: true,
        data: fallbackColleges,
        count: fallbackColleges.length,
        message: 'Using fallback data (database unavailable)',
        fallback: true
      })
    }

    const data = await response.json()
    console.log('✅ Fetched colleges from Supabase:', data.length)

    return NextResponse.json({
      success: true,
      data: data,
      count: data.length
    })

  } catch (error) {
    console.error('❌ Error fetching colleges:', error)
    // Use fallback storage when there's an error
    const fallbackColleges = await fallbackStorage.getColleges()
    return NextResponse.json({
      success: true,
      data: fallbackColleges,
      count: fallbackColleges.length,
      message: 'Using fallback data (error occurred)',
      fallback: true
    })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json(
        { error: 'College ID is required' },
        { status: 400 }
      )
    }

    console.log('🔄 Updating college:', { id, updateData })

    // Clean the update data to only include valid fields
    const cleanUpdateData: any = {
      updated_at: new Date().toISOString()
    }

    if (updateData.name) cleanUpdateData.name = updateData.name
    if (updateData.location) cleanUpdateData.location = updateData.location
    if (updateData.country) cleanUpdateData.country = updateData.country
    if (updateData.website !== undefined) cleanUpdateData.website = updateData.website
    if (updateData.ranking !== undefined) cleanUpdateData.ranking = updateData.ranking
    if (updateData.acceptance_rate !== undefined) cleanUpdateData.acceptance_rate = updateData.acceptance_rate
    if (updateData.description !== undefined) cleanUpdateData.description = updateData.description
    if (updateData.featured !== undefined) cleanUpdateData.featured = updateData.featured

    const { data, error } = await supabaseAdmin
      .from('colleges')
      .update(cleanUpdateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('❌ College update error:', error)
      return NextResponse.json(
        { error: 'Failed to update college', details: error.message },
        { status: 500 }
      )
    }

    console.log('✅ College updated successfully:', data)

    return NextResponse.json({
      success: true,
      data: data,
      message: 'College updated successfully'
    })

  } catch (error) {
    console.error('❌ College update error:', error)
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
        { error: 'College ID is required' },
        { status: 400 }
      )
    }

    const { error } = await supabaseAdmin
      .from('colleges')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('❌ College delete error:', error)
      return NextResponse.json(
        { error: 'Failed to delete college' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'College deleted successfully'
    })

  } catch (error) {
    console.error('❌ College delete error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}