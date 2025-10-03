import { NextRequest, NextResponse } from 'next/server'
import { getUniversityBySlug, updateUniversity, deleteUniversity } from '@/lib/university-data'

// GET /api/universities/[slug] - Get university by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const university = getUniversityBySlug(params.slug)
    
    if (!university) {
      return NextResponse.json(
        { success: false, error: 'University not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: university
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch university' },
      { status: 500 }
    )
  }
}

// PUT /api/universities/[slug] - Update university (for admin panel)
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json()
    const university = getUniversityBySlug(params.slug)
    
    if (!university) {
      return NextResponse.json(
        { success: false, error: 'University not found' },
        { status: 404 }
      )
    }

    const updatedUniversity = updateUniversity(university.id, body)
    
    return NextResponse.json({
      success: true,
      data: updatedUniversity,
      message: 'University updated successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update university' },
      { status: 500 }
    )
  }
}

// DELETE /api/universities/[slug] - Delete university (for admin panel)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const university = getUniversityBySlug(params.slug)
    
    if (!university) {
      return NextResponse.json(
        { success: false, error: 'University not found' },
        { status: 404 }
      )
    }

    const deleted = deleteUniversity(university.id)
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete university' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'University deleted successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete university' },
      { status: 500 }
    )
  }
}