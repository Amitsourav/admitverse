import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client for storage operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use service role key for server-side operations
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export interface UploadResult {
  success: boolean
  url?: string
  path?: string
  error?: string
}

export interface UploadOptions {
  bucket: string
  path: string
  file: File | Buffer
  contentType?: string
  cacheControl?: string
  upsert?: boolean
}

/**
 * Upload a file to Supabase Storage
 */
export async function uploadFile(options: UploadOptions): Promise<UploadResult> {
  try {
    const { bucket, path, file, contentType, cacheControl = '3600', upsert = false } = options

    // Ensure bucket exists
    const { data: buckets } = await supabase.storage.listBuckets()
    const bucketExists = buckets?.find(b => b.name === bucket)
    
    if (!bucketExists) {
      const { error: bucketError } = await supabase.storage.createBucket(bucket, {
        public: true,
        fileSizeLimit: 50 * 1024 * 1024, // 50MB
        allowedMimeTypes: [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/webp',
          'application/pdf',
          'text/csv',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ]
      })
      
      if (bucketError) {
        console.error('Error creating bucket:', bucketError)
        return { success: false, error: `Failed to create bucket: ${bucketError.message}` }
      }
    }

    // Upload file
    const uploadOptions: any = {
      cacheControl,
      upsert
    }

    if (contentType) {
      uploadOptions.contentType = contentType
    }

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, uploadOptions)

    if (error) {
      console.error('Upload error:', error)
      return { success: false, error: error.message }
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path)

    return {
      success: true,
      url: urlData.publicUrl,
      path: data.path
    }

  } catch (error) {
    console.error('Storage upload error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteFile(bucket: string, path: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])

    if (error) {
      console.error('Delete error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }

  } catch (error) {
    console.error('Storage delete error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Get public URL for a file
 */
export function getPublicUrl(bucket: string, path: string): string {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)

  return data.publicUrl
}

/**
 * List files in a bucket
 */
export async function listFiles(bucket: string, folder?: string, limit = 100) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder, {
        limit,
        sortBy: { column: 'created_at', order: 'desc' }
      })

    if (error) {
      console.error('List files error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, files: data || [] }

  } catch (error) {
    console.error('Storage list error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Generate a unique filename with timestamp
 */
export function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(7)
  const extension = originalName.split('.').pop()
  const nameWithoutExtension = originalName.replace(`.${extension}`, '')
  
  // Clean filename (remove special characters)
  const cleanName = nameWithoutExtension
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  return `${cleanName}-${timestamp}-${random}.${extension}`
}

/**
 * Storage bucket configurations
 */
export const STORAGE_BUCKETS = {
  COLLEGE_IMAGES: 'college-images',
  COURSE_IMAGES: 'course-images',
  AVATARS: 'avatars',
  DOCUMENTS: 'documents',
  EXPORTS: 'exports',
} as const

/**
 * Validate file type and size
 */
export function validateFile(
  file: File,
  options: {
    maxSize?: number // in bytes
    allowedTypes?: string[]
  } = {}
): { valid: boolean; error?: string } {
  const {
    maxSize = 10 * 1024 * 1024, // 10MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  } = options

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`
    }
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`
    }
  }

  return { valid: true }
}

/**
 * Create optimized image path structure
 */
export function createImagePath(
  type: 'college' | 'course' | 'avatar',
  entityId: string,
  filename: string,
  size?: 'thumbnail' | 'medium' | 'large'
): string {
  const sizePrefix = size ? `${size}/` : ''
  return `${type}s/${entityId}/${sizePrefix}${filename}`
}