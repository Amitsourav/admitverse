import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET() {
  try {
    const { data: leads, error } = await supabaseAdmin
      .from('leads')
      .select(`
        *,
        specialization:specializations(
          id,
          name,
          code,
          course:courses(
            id,
            name,
            college:colleges(
              id,
              name,
              location
            )
          )
        ),
        user:users(
          id,
          username,
          email,
          full_name
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch leads'
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: leads || []
    })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch leads'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Creating lead with data:', body)
    
    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json({
        success: false,
        error: 'Name and email are required'
      }, { status: 400 })
    }

    const now = new Date().toISOString()
    const { data: lead, error } = await supabaseAdmin
      .from('leads')
      .insert({
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        message: body.message || null,
        status: body.status || 'new',
        source: body.source || null,
        specialization_id: body.specialization_id || body.specializationId || null,
        user_id: body.user_id || body.userId || null,
        is_sample: body.is_sample || false,
        created_at: now,
        updated_at: now
      })
      .select(`
        *,
        specialization:specializations(
          id,
          name,
          code,
          course:courses(
            id,
            name,
            college:colleges(
              id,
              name,
              location
            )
          )
        ),
        user:users(
          id,
          username,
          email,
          full_name
        )
      `)
      .single()

    if (error) {
      console.error('Supabase error creating lead:', error)
      return NextResponse.json({
        success: false,
        error: 'Failed to create lead',
        details: error.message
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: lead
    })
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create lead',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (!body.id) {
      return NextResponse.json({
        success: false,
        error: 'Lead ID is required'
      }, { status: 400 })
    }

    const now = new Date().toISOString()
    const { data: lead, error } = await supabaseAdmin
      .from('leads')
      .update({
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        message: body.message || null,
        status: body.status,
        source: body.source || null,
        specialization_id: body.specialization_id || body.specializationId || null,
        user_id: body.user_id || body.userId || null,
        updated_at: now
      })
      .eq('id', body.id)
      .select(`
        *,
        specialization:specializations(
          id,
          name,
          code,
          course:courses(
            id,
            name,
            college:colleges(
              id,
              name,
              location
            )
          )
        ),
        user:users(
          id,
          username,
          email,
          full_name
        )
      `)
      .single()

    if (error) {
      console.error('Supabase error updating lead:', error)
      return NextResponse.json({
        success: false,
        error: 'Failed to update lead',
        details: error.message
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: lead
    })
  } catch (error) {
    console.error('Error updating lead:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to update lead',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'Lead ID is required'
      }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('leads')
      .delete()
      .eq('id', parseInt(id))

    if (error) {
      console.error('Supabase error deleting lead:', error)
      return NextResponse.json({
        success: false,
        error: 'Failed to delete lead',
        details: error.message
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Lead deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting lead:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to delete lead',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}