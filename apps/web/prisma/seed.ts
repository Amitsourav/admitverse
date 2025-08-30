import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clear existing data (optional, but useful for development)
  await prisma.lead.deleteMany({ where: { isSample: true } })
  await prisma.specialization.deleteMany({ where: { isSample: true } })
  await prisma.course.deleteMany({ where: { isSample: true } })
  await prisma.college.deleteMany({ where: { isSample: true } })
  await prisma.user.deleteMany({ where: { isSample: true } })

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123456', 10)
  const adminUser = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@admitverse.com',
      password: hashedPassword,
      fullName: 'AdmitVerse Administrator',
      role: 'admin',
      isActive: true,
      isSample: true
    }
  })
  console.log('👤 Created admin user:', adminUser.username)

  // Create colleges
  const colleges = [
    {
      name: 'Harvard University',
      slug: 'harvard-university',
      about: 'Harvard University is a prestigious Ivy League research university located in Cambridge, Massachusetts.',
      description: 'One of the oldest institutions of higher education in the United States, established in 1636.',
      location: 'Cambridge, MA',
      country: 'United States',
      ranking: 1,
      acceptanceRate: 5.2,
      website: 'https://www.harvard.edu',
      notableAlumni: [
        { name: 'Barack Obama', currentRole: 'Former U.S. President' },
        { name: 'Mark Zuckerberg', currentRole: 'CEO of Meta' }
      ],
      facilities: ['Central Library', 'Research Labs', 'Sports Complex', 'Student Housing'],
      accreditations: ['NEASC', 'AACSB'],
      isSample: true
    },
    {
      name: 'Stanford University',
      slug: 'stanford-university',
      about: 'Stanford University is a private research university in Stanford, California.',
      description: 'Known for its academic strength, proximity to Silicon Valley, and wealth.',
      location: 'Stanford, CA',
      country: 'United States',
      ranking: 2,
      acceptanceRate: 4.3,
      website: 'https://www.stanford.edu',
      notableAlumni: [
        { name: 'Larry Page', currentRole: 'Co-founder of Google' },
        { name: 'Elon Musk', currentRole: 'CEO of Tesla' }
      ],
      facilities: ['Green Library', 'Engineering Labs', 'Medical Center', 'Athletics Complex'],
      accreditations: ['WASC', 'AACSB'],
      isSample: true
    },
    {
      name: 'MIT',
      slug: 'massachusetts-institute-technology',
      about: 'MIT is a private research university in Cambridge, Massachusetts.',
      description: 'World-renowned for science, technology, engineering, and mathematics programs.',
      location: 'Cambridge, MA',
      country: 'United States',
      ranking: 3,
      acceptanceRate: 6.7,
      website: 'https://web.mit.edu',
      notableAlumni: [
        { name: 'Tim Berners-Lee', currentRole: 'Inventor of World Wide Web' },
        { name: 'Richard Feynman', currentRole: 'Nobel Prize Winner in Physics' }
      ],
      facilities: ['MIT Libraries', 'Computer Science Lab', 'Nuclear Reactor', 'Media Lab'],
      accreditations: ['NEASC', 'ABET'],
      isSample: true
    }
  ]

  const createdColleges = []
  for (const college of colleges) {
    const created = await prisma.college.create({ data: college })
    createdColleges.push(created)
    console.log(`🏫 Created college: ${created.name}`)
  }

  // Create courses for each college
  const courseTemplates = [
    { name: 'Computer Science', shortName: 'CS', degreeType: 'Bachelor\'s', duration: '4 years', fees: 50000 },
    { name: 'Business Administration', shortName: 'MBA', degreeType: 'Master\'s', duration: '2 years', fees: 70000 },
    { name: 'Engineering', shortName: 'ENG', degreeType: 'Bachelor\'s', duration: '4 years', fees: 55000 },
    { name: 'Medicine', shortName: 'MD', degreeType: 'Doctorate', duration: '4 years', fees: 80000 },
    { name: 'Data Science', shortName: 'DS', degreeType: 'Master\'s', duration: '2 years', fees: 60000 }
  ]

  const createdCourses = []
  for (const college of createdColleges) {
    // Each college gets 3-4 random courses
    const collegeCourses = courseTemplates.slice(0, Math.floor(Math.random() * 2) + 3)
    
    for (const course of collegeCourses) {
      const created = await prisma.course.create({
        data: {
          ...course,
          collegeId: college.id,
          totalSeats: Math.floor(Math.random() * 100) + 50,
          description: `Comprehensive ${course.name} program at ${college.name}`,
          eligibility: 'Bachelor\'s degree with minimum 3.0 GPA',
          admissionProcess: 'Application, transcripts, letters of recommendation, and interviews',
          isSample: true
        }
      })
      createdCourses.push(created)
      console.log(`📚 Created course: ${created.name} at ${college.name}`)
    }
  }

  // Create specializations for each course
  const specializationTemplates = {
    'Computer Science': ['Artificial Intelligence', 'Machine Learning', 'Cybersecurity', 'Software Engineering'],
    'Business Administration': ['Finance', 'Marketing', 'Operations', 'Strategy'],
    'Engineering': ['Mechanical', 'Electrical', 'Civil', 'Chemical'],
    'Medicine': ['Internal Medicine', 'Surgery', 'Pediatrics', 'Cardiology'],
    'Data Science': ['Big Data Analytics', 'Statistical Modeling', 'Business Intelligence', 'Deep Learning']
  }

  const createdSpecializations = []
  for (const course of createdCourses) {
    const specializations = specializationTemplates[course.name] || ['General Studies']
    
    for (const spec of specializations) {
      const created = await prisma.specialization.create({
        data: {
          courseId: course.id,
          name: spec,
          code: spec.split(' ').map(s => s[0]).join('').toUpperCase(),
          about: `Specialized program in ${spec} within ${course.name}`,
          description: `Advanced study focusing on ${spec} principles and applications`,
          requirements: 'Strong foundation in relevant prerequisites',
          careerProspects: 'Excellent opportunities in growing industry sectors',
          placementRate: Math.floor(Math.random() * 30) + 70, // 70-100%
          avgPackage: Math.floor(Math.random() * 50000) + 60000, // $60k-110k
          topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta'],
          researchAreas: ['Innovation', 'Applied Research', 'Industry Collaboration'],
          labFacilities: ['Modern Labs', 'Research Equipment', 'Collaboration Spaces'],
          isSample: true
        }
      })
      createdSpecializations.push(created)
      console.log(`🎯 Created specialization: ${created.name}`)
    }
  }

  // Create sample leads
  const leadNames = [
    'John Smith', 'Emily Johnson', 'Michael Brown', 'Sarah Davis', 'David Wilson',
    'Lisa Anderson', 'Robert Taylor', 'Jennifer White', 'William Jones', 'Jessica Miller',
    'Christopher Garcia', 'Ashley Rodriguez', 'Matthew Martinez', 'Amanda Hernandez', 'Daniel Lopez'
  ]

  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'university.edu', 'student.edu']
  const sources = ['website', 'google', 'referral', 'social media', 'advertisement']
  const statuses = ['new', 'contacted', 'enrolled', 'rejected']

  // Create leads over the past 30 days
  const leads = []
  const now = new Date()
  
  for (let i = 0; i < 50; i++) {
    // Random date within last 30 days
    const daysAgo = Math.floor(Math.random() * 30)
    const createdAt = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)
    
    const name = leadNames[Math.floor(Math.random() * leadNames.length)]
    const email = `${name.toLowerCase().replace(' ', '.')}${Math.floor(Math.random() * 100)}@${domains[Math.floor(Math.random() * domains.length)]}`
    const specialization = createdSpecializations[Math.floor(Math.random() * createdSpecializations.length)]
    
    leads.push({
      userId: adminUser.id,
      name,
      email,
      phone: `+1-555-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      specializationId: specialization.id,
      message: `I'm interested in learning more about the ${specialization.name} program. Please provide more information about admission requirements and course curriculum.`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      source: sources[Math.floor(Math.random() * sources.length)],
      isSample: true,
      createdAt,
      updatedAt: createdAt
    })
  }

  await prisma.lead.createMany({ data: leads })
  console.log(`📋 Created ${leads.length} sample leads`)

  console.log('✅ Database seeding completed successfully!')
  
  // Print summary
  const summary = {
    colleges: await prisma.college.count({ where: { isSample: true } }),
    courses: await prisma.course.count({ where: { isSample: true } }),
    specializations: await prisma.specialization.count({ where: { isSample: true } }),
    leads: await prisma.lead.count({ where: { isSample: true } }),
    users: await prisma.user.count({ where: { isSample: true } })
  }
  
  console.log('📊 Seeding Summary:')
  console.log(`   👤 Users: ${summary.users}`)
  console.log(`   🏫 Colleges: ${summary.colleges}`)
  console.log(`   📚 Courses: ${summary.courses}`)
  console.log(`   🎯 Specializations: ${summary.specializations}`)
  console.log(`   📋 Leads: ${summary.leads}`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })