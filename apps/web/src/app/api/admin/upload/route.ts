import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { 
  uploadFile, 
  generateUniqueFilename, 
  validateFile, 
  createImagePath,
  STORAGE_BUCKETS,
  type UploadOptions
} from '@/lib/supabase-storage'

async function verifyAdminAuth(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get('cookie')
    if (!cookieHeader) {
      return null
    }

    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=')
      acc[key] = value
      return acc
    }, {} as Record<string, string>)

    const sessionCookieName = process.env.SESSION_COOKIE_NAME || 'admitverse_session'
    const token = cookies[sessionCookieName]

    if (!token || !process.env.JWT_SECRET) {
      return null
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as any
    return {
      id: decoded.id,
      username: decoded.username,
      role: decoded.role
    }
  } catch (error) {
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const user = await verifyAdminAuth(request)
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string
    const entityId = formData.get('entityId') as string
    const category = formData.get('category') as string || 'general'

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    if (!type || !['college', 'course', 'avatar', 'document'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid upload type' },
        { status: 400 }
      )
    }

    // Validate file based on type
    let validationOptions: { maxSize?: number; allowedTypes?: string[] } = {}
    
    switch (type) {
      case 'college':
      case 'course':
        validationOptions = {
          maxSize: 10 * 1024 * 1024, // 10MB
          allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
        }
        break
      case 'avatar':
        validationOptions = {
          maxSize: 5 * 1024 * 1024, // 5MB
          allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
        }
        break
      case 'document':
        validationOptions = {
          maxSize: 50 * 1024 * 1024, // 50MB
          allowedTypes: [
            'application/pdf',
            'text/csv',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          ]
        }
        break
    }

    const validation = validateFile(file, validationOptions)
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    // Generate unique filename
    const uniqueFilename = generateUniqueFilename(file.name)
    
    // Determine bucket and path
    let bucket: string
    let path: string

    switch (type) {
      case 'college':
        bucket = STORAGE_BUCKETS.COLLEGE_IMAGES
        path = entityId 
          ? createImagePath('college', entityId, uniqueFilename)
          : `temp/${uniqueFilename}`
        break
      case 'course':
        bucket = STORAGE_BUCKETS.COURSE_IMAGES
        path = entityId 
          ? createImagePath('course', entityId, uniqueFilename)
          : `temp/${uniqueFilename}`
        break
      case 'avatar':
        bucket = STORAGE_BUCKETS.AVATARS
        path = entityId 
          ? createImagePath('avatar', entityId, uniqueFilename)
          : `temp/${uniqueFilename}`
        break
      case 'document':
        bucket = STORAGE_BUCKETS.DOCUMENTS
        path = `${category}/${uniqueFilename}`
        break
      default:
        return NextResponse.json(
          { error: 'Invalid upload type' },
          { status: 400 }
        )
    }

    // Convert File to Buffer for upload
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Supabase Storage
    const uploadOptions: UploadOptions = {
      bucket,
      path,
      file: buffer,
      contentType: file.type,
      cacheControl: '3600',
      upsert: true
    }

    const result = await uploadFile(uploadOptions)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Upload failed' },
        { status: 500 }
      )
    }

    // Return success response
    return NextResponse.json({
      success: true,
      url: result.url,
      path: result.path,
      filename: uniqueFilename,
      originalName: file.name,
      size: file.size,
      type: file.type,
      bucket,
      uploadedBy: user.id,
      uploadedAt: new Date().toISOString()
    })

  } catch (error) {
    console.error('Upload API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Verify admin authentication
    const user = await verifyAdminAuth(request)
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const bucket = searchParams.get('bucket')
    const path = searchParams.get('path')

    if (!bucket || !path) {
      return NextResponse.json(
        { error: 'Bucket and path are required' },
        { status: 400 }
      )
    }

    const { deleteFile } = await import('@/lib/supabase-storage')
    const result = await deleteFile(bucket, path)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Delete failed' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully'
    })

  } catch (error) {
    console.error('Delete API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}