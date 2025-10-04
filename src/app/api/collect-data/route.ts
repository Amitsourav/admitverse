import { NextRequest, NextResponse } from 'next/server'
import { FormSubmission } from '@/services/dataCollection'

export async function POST(request: NextRequest) {
  try {
    const data: FormSubmission = await request.json()
    
    // Validate required fields
    if (!data.type || !data.timestamp || !data.sessionId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Log the submission (in production, you'd save to database)
    console.log('Form submission received:', {
      type: data.type,
      timestamp: data.timestamp,
      page: data.page,
      sessionId: data.sessionId
    })

    // Here you would typically:
    // 1. Save to database (MongoDB, PostgreSQL, etc.)
    // 2. Send email notifications
    // 3. Add to CRM system
    // 4. Send to marketing automation tools

    // For now, we'll just save to a JSON file (not recommended for production)
    const fs = require('fs').promises
    const path = require('path')
    
    try {
      const submissionsPath = path.join(process.cwd(), 'data', 'submissions.json')
      
      // Ensure data directory exists
      await fs.mkdir(path.dirname(submissionsPath), { recursive: true })
      
      // Read existing submissions
      let submissions = []
      try {
        const existingData = await fs.readFile(submissionsPath, 'utf8')
        submissions = JSON.parse(existingData)
      } catch (error) {
        // File doesn't exist yet, start with empty array
        submissions = []
      }
      
      // Add new submission
      submissions.push(data)
      
      // Write back to file
      await fs.writeFile(submissionsPath, JSON.stringify(submissions, null, 2))
      
      console.log('Submission saved to file successfully')
    } catch (fileError) {
      console.error('Failed to save to file:', fileError)
      // Continue anyway, we'll just log it
    }

    // Success response
    return NextResponse.json({
      success: true,
      message: 'Data collected successfully',
      submissionId: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    })

  } catch (error) {
    console.error('Error processing form submission:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle preflight requests for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}