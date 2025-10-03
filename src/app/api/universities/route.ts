import { NextRequest, NextResponse } from 'next/server'
import { getAllUniversities, addUniversity, searchUniversities } from '@/lib/university-data'

// GET /api/universities - Get all universities or search
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const country = searchParams.get('country') || 'all'
    const ranking = searchParams.get('ranking') || 'all'

    // If any filters are provided, use search function
    if (search || country !== 'all' || ranking !== 'all') {
      const universities = searchUniversities(search, country, ranking)
      return NextResponse.json({
        success: true,
        data: universities,
        count: universities.length
      })
    }

    // Otherwise return all universities
    const universities = getAllUniversities()
    return NextResponse.json({
      success: true,
      data: universities,
      count: universities.length
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch universities' },
      { status: 500 }
    )
  }
}

// POST /api/universities - Add new university (for admin panel)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Basic validation
    if (!body.name || !body.slug || !body.location || !body.country) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newUniversity = addUniversity(body)
    
    return NextResponse.json({
      success: true,
      data: newUniversity,
      message: 'University added successfully'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to add university' },
      { status: 500 }
    )
  }
}