import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
// import { parse } from 'csv-parse'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const entityType = formData.get('entityType') as string
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    if (!entityType || !['colleges', 'courses', 'specializations', 'leads'].includes(entityType)) {
      return NextResponse.json({ error: 'Invalid entity type' }, { status: 400 })
    }

    const text = await file.text()
    const fileExtension = file.name.split('.').pop()?.toLowerCase()
    
    let records: any[] = []
    
    if (fileExtension === 'csv') {
      // Temporarily disabled CSV parsing for deployment
      return NextResponse.json({ error: 'CSV parsing temporarily disabled' }, { status: 400 })
    } else if (fileExtension === 'json') {
      records = JSON.parse(text)
    } else {
      return NextResponse.json({ error: 'Unsupported file format. Use CSV or JSON.' }, { status: 400 })
    }

    if (!Array.isArray(records) || records.length === 0) {
      return NextResponse.json({ error: 'No valid records found in file' }, { status: 400 })
    }

    // Process and validate records based on entity type
    const processedRecords = await processRecords(records, entityType)
    
    // Batch insert with error handling
    const results = await batchInsert(processedRecords, entityType)
    
    return NextResponse.json({
      success: true,
      message: `Successfully imported ${results.successful} records`,
      details: {
        total: records.length,
        successful: results.successful,
        failed: results.failed,
        errors: results.errors
      }
    })
  } catch (error: any) {
    console.error('Bulk import error:', error)
    return NextResponse.json({ 
      error: 'Import failed', 
      details: error.message 
    }, { status: 500 })
  }
}

async function processRecords(records: any[], entityType: string) {
  const processed = []
  
  for (const record of records) {
    let processedRecord: any = {}
    
    switch (entityType) {
      case 'colleges':
        processedRecord = {
          name: record.name || record.Name || record.college_name,
          slug: generateSlug(record.name || record.Name || record.college_name || ''),
          about: record.about || record.About || '',
          description: record.description || record.Description || '',
          location: record.location || record.Location || '',
          country: record.country || record.Country || '',
          ranking: parseInt(record.ranking || record.Ranking || '0') || null,
          acceptance_rate: parseFloat(record.acceptance_rate || record.AcceptanceRate || '0') || null,
          image_url: record.image_url || record.ImageUrl || null,
          website: record.website || record.Website || null,
          notable_alumni: parseJsonField(record.notable_alumni || record.NotableAlumni),
          facilities: parseJsonField(record.facilities || record.Facilities),
          accreditations: parseJsonField(record.accreditations || record.Accreditations),
          is_sample: false
        }
        break
        
      case 'courses':
        // First, get college ID from name if provided
        let collegeId = record.college_id || record.collegeId
        if (!collegeId && (record.college_name || record.collegeName)) {
          const { data: college } = await supabaseAdmin
            .from('colleges')
            .select('id')
            .eq('name', record.college_name || record.collegeName)
            .single()
          collegeId = college?.id
        }
        
        processedRecord = {
          college_id: parseInt(collegeId) || null,
          name: record.name || record.Name || record.course_name,
          short_name: record.short_name || record.ShortName || null,
          degree_type: record.degree_type || record.DegreeType || null,
          duration: record.duration || record.Duration || null,
          total_seats: parseInt(record.total_seats || record.TotalSeats || '0') || null,
          fees: parseInt(record.fees || record.Fees || '0') || null,
          description: record.description || record.Description || '',
          eligibility: record.eligibility || record.Eligibility || '',
          admission_process: record.admission_process || record.AdmissionProcess || '',
          is_sample: false
        }
        break
        
      case 'specializations':
        // Get course ID from name if needed
        let courseId = record.course_id || record.courseId
        if (!courseId && (record.course_name || record.courseName)) {
          const { data: course } = await supabaseAdmin
            .from('courses')
            .select('id')
            .eq('name', record.course_name || record.courseName)
            .single()
          courseId = course?.id
        }
        
        processedRecord = {
          course_id: parseInt(courseId) || null,
          name: record.name || record.Name || record.specialization_name,
          code: record.code || record.Code || null,
          about: record.about || record.About || '',
          description: record.description || record.Description || '',
          requirements: record.requirements || record.Requirements || '',
          career_prospects: record.career_prospects || record.CareerProspects || '',
          syllabus: parseJsonField(record.syllabus || record.Syllabus),
          placement_rate: parseFloat(record.placement_rate || record.PlacementRate || '0') || null,
          avg_package: parseInt(record.avg_package || record.AvgPackage || '0') || null,
          top_recruiters: parseJsonField(record.top_recruiters || record.TopRecruiters),
          research_areas: parseJsonField(record.research_areas || record.ResearchAreas),
          lab_facilities: parseJsonField(record.lab_facilities || record.LabFacilities),
          is_sample: false
        }
        break
        
      case 'leads':
        // Get specialization ID if name provided
        let specializationId = record.specialization_id || record.specializationId
        if (!specializationId && (record.specialization_name || record.specializationName)) {
          const { data: spec } = await supabaseAdmin
            .from('specializations')
            .select('id')
            .eq('name', record.specialization_name || record.specializationName)
            .single()
          specializationId = spec?.id
        }
        
        processedRecord = {
          name: record.name || record.Name || '',
          email: record.email || record.Email || '',
          phone: record.phone || record.Phone || null,
          specialization_id: parseInt(specializationId) || null,
          message: record.message || record.Message || null,
          status: record.status || record.Status || 'new',
          source: record.source || record.Source || 'bulk_import',
          is_sample: false
        }
        break
    }
    
    // Only add if we have minimum required fields
    if (processedRecord.name) {
      processed.push(processedRecord)
    }
  }
  
  return processed
}

async function batchInsert(records: any[], entityType: string) {
  const batchSize = 100
  let successful = 0
  let failed = 0
  const errors: any[] = []
  
  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize)
    
    try {
      const { data, error } = await supabaseAdmin
        .from(entityType)
        .insert(batch)
        .select()
      
      if (error) {
        failed += batch.length
        errors.push({
          batch: `${i + 1}-${Math.min(i + batchSize, records.length)}`,
          error: error.message
        })
      } else {
        successful += batch.length
      }
    } catch (error: any) {
      failed += batch.length
      errors.push({
        batch: `${i + 1}-${Math.min(i + batchSize, records.length)}`,
        error: error.message
      })
    }
  }
  
  return { successful, failed, errors }
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function parseJsonField(field: any): any {
  if (!field) return null
  if (typeof field === 'object') return field
  
  try {
    // Handle comma-separated values
    if (typeof field === 'string' && !field.startsWith('[') && !field.startsWith('{')) {
      return field.split(',').map(item => item.trim()).filter(Boolean)
    }
    return JSON.parse(field)
  } catch {
    return null
  }
}

// GET endpoint to download sample templates
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const template = searchParams.get('template')
  
  const templates: Record<string, any> = {
    colleges: [
      {
        name: 'Harvard University',
        about: 'Premier Ivy League institution',
        description: 'Harvard University is a private Ivy League research university...',
        location: 'Cambridge, MA',
        country: 'USA',
        ranking: 1,
        acceptance_rate: 3.4,
        website: 'https://harvard.edu',
        notable_alumni: 'Barack Obama, Mark Zuckerberg, Bill Gates',
        facilities: 'Library, Sports Complex, Research Labs',
        accreditations: 'NECHE, AACSB'
      }
    ],
    courses: [
      {
        college_name: 'Harvard University',
        name: 'Computer Science',
        short_name: 'CS',
        degree_type: 'Bachelor of Science',
        duration: '4 years',
        total_seats: 100,
        fees: 50000,
        description: 'Comprehensive computer science program',
        eligibility: 'High school diploma with strong math background',
        admission_process: 'SAT/ACT scores, essays, interviews'
      }
    ],
    specializations: [
      {
        course_name: 'Computer Science',
        name: 'Artificial Intelligence',
        code: 'CS-AI',
        about: 'Focus on AI and machine learning',
        description: 'Deep dive into artificial intelligence...',
        requirements: 'Strong programming and math skills',
        career_prospects: 'AI Engineer, Data Scientist, Research Scientist',
        placement_rate: 95.5,
        avg_package: 150000,
        top_recruiters: 'Google, Microsoft, Amazon',
        research_areas: 'Deep Learning, NLP, Computer Vision',
        lab_facilities: 'AI Lab, Robotics Lab'
      }
    ],
    leads: [
      {
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1234567890',
        specialization_name: 'Artificial Intelligence',
        message: 'Interested in AI program',
        status: 'new',
        source: 'website'
      }
    ]
  }
  
  if (!template || !templates[template]) {
    return NextResponse.json({ error: 'Invalid template type' }, { status: 400 })
  }
  
  const csvContent = convertToCSV(templates[template])
  
  return new NextResponse(csvContent, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="${template}_template.csv"`
    }
  })
}

function convertToCSV(data: any[]): string {
  if (data.length === 0) return ''
  
  const headers = Object.keys(data[0])
  const rows = data.map(row => 
    headers.map(header => {
      const value = row[header]
      // Escape values containing commas or quotes
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`
      }
      return value ?? ''
    }).join(',')
  )
  
  return [headers.join(','), ...rows].join('\n')
}