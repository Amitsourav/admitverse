export interface Course {
  id: number
  name: string
  slug: string
  level: string
  duration: string
  field: string
  universities: number
  avgSalary: string
  description: string
  skills: string[]
  jobRoles: string[]
  popularity: number
  image: string
}

export interface CourseDetail extends Course {
  category: string
  overview: string
  careerOutlook: string
  averageSalary: string
  jobGrowth: string
  keySkills: string[]
  careerPaths: string[]
  topUniversities: Array<{
    name: string
    location: string
    ranking: number
    tuition: string
    image: string
  }>
  admissionRequirements: string[]
  coursework: Array<{
    semester: string
    subjects: string[]
  }>
  specializations: string[]
  prerequisites: string[]
  certifications: string[]
  industryConnections: string[]
  heroImage: string
  icon: string
}

export const courses: Course[] = [
  {
    id: 1,
    name: 'Computer Science',
    slug: 'computer-science',
    level: 'Bachelor',
    duration: '4 years',
    field: 'Technology',
    universities: 1200,
    avgSalary: '$95,000',
    description: 'Study algorithms, software development, AI, and cutting-edge technology',
    skills: ['Programming', 'AI/ML', 'Data Structures', 'Software Engineering'],
    jobRoles: ['Software Engineer', 'Data Scientist', 'AI Engineer', 'Tech Lead'],
    popularity: 95,
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Business Administration (MBA)',
    slug: 'business-administration',
    level: 'Master',
    duration: '2 years',
    field: 'Business',
    universities: 800,
    avgSalary: '$115,000',
    description: 'Master business strategy, leadership, finance, and entrepreneurship',
    skills: ['Leadership', 'Strategy', 'Finance', 'Marketing'],
    jobRoles: ['CEO', 'Product Manager', 'Consultant', 'Investment Banker'],
    popularity: 92,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Data Science',
    slug: 'data-science',
    level: 'Master',
    duration: '2 years',
    field: 'Technology',
    universities: 600,
    avgSalary: '$120,000',
    description: 'Analyze big data, machine learning, statistics, and predictive modeling',
    skills: ['Machine Learning', 'Statistics', 'Python/R', 'Data Visualization'],
    jobRoles: ['Data Scientist', 'ML Engineer', 'Data Analyst', 'AI Researcher'],
    popularity: 98,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    name: 'Medicine (MD)',
    slug: 'medicine',
    level: 'Doctorate',
    duration: '4-6 years',
    field: 'Healthcare',
    universities: 400,
    avgSalary: '$200,000',
    description: 'Comprehensive medical training for diagnosing and treating patients',
    skills: ['Clinical Skills', 'Diagnosis', 'Patient Care', 'Medical Research'],
    jobRoles: ['Physician', 'Surgeon', 'Medical Researcher', 'Specialist Doctor'],
    popularity: 88,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    name: 'Mechanical Engineering',
    slug: 'mechanical-engineering',
    level: 'Bachelor',
    duration: '4 years',
    field: 'Engineering',
    universities: 900,
    avgSalary: '$88,000',
    description: 'Design and develop mechanical systems, robotics, and machinery',
    skills: ['CAD', 'Thermodynamics', 'Robotics', 'Materials Science'],
    jobRoles: ['Mechanical Engineer', 'Design Engineer', 'Project Manager', 'R&D Engineer'],
    popularity: 85,
    image: 'https://images.unsplash.com/photo-1581092795442-6d4e57e67f2f?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    name: 'Psychology',
    slug: 'psychology',
    level: 'Bachelor',
    duration: '3-4 years',
    field: 'Social Sciences',
    universities: 700,
    avgSalary: '$65,000',
    description: 'Study human behavior, mental processes, and psychological theories',
    skills: ['Research Methods', 'Counseling', 'Statistical Analysis', 'Clinical Assessment'],
    jobRoles: ['Psychologist', 'Therapist', 'HR Specialist', 'Research Analyst'],
    popularity: 80,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop'
  },
  {
    id: 7,
    name: 'Artificial Intelligence',
    slug: 'artificial-intelligence',
    level: 'Master',
    duration: '2 years',
    field: 'Technology',
    universities: 350,
    avgSalary: '$130,000',
    description: 'Advanced study in AI, deep learning, neural networks, and intelligent systems',
    skills: ['Deep Learning', 'Neural Networks', 'NLP', 'Computer Vision'],
    jobRoles: ['AI Engineer', 'ML Research Scientist', 'AI Product Manager', 'Robotics Engineer'],
    popularity: 99,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop'
  }
]

// Helper function to generate detailed course data from basic course data
export function generateCourseDetail(course: Course): CourseDetail {
  // Generate job growth based on field
  const jobGrowthMap: { [key: string]: string } = {
    'Technology': '22% (Much faster than average)',
    'Business': '15% (Much faster than average)',
    'Healthcare': '18% (Much faster than average)',
    'Engineering': '12% (Faster than average)',
    'Social Sciences': '8% (Average)'
  }

  // Generate coursework based on level and field
  const generateCoursework = (course: Course) => {
    if (course.level === 'Bachelor') {
      return [
        {
          semester: 'Year 1',
          subjects: [
            `Introduction to ${course.field}`,
            'Mathematics & Statistics',
            'Communication Skills',
            'Computer Fundamentals'
          ]
        },
        {
          semester: 'Year 2',
          subjects: [
            'Core Concepts',
            'Research Methods',
            'Programming/Tools',
            'Elective Courses'
          ]
        },
        {
          semester: 'Year 3',
          subjects: [
            'Advanced Topics',
            'Practical Applications',
            'Industry Projects',
            'Specialization Modules'
          ]
        },
        {
          semester: 'Year 4',
          subjects: [
            'Capstone Project',
            'Internship',
            'Advanced Electives',
            'Final Thesis'
          ]
        }
      ]
    } else if (course.level === 'Master') {
      return [
        {
          semester: 'Core Curriculum',
          subjects: [
            'Advanced Theory',
            'Research Methodology',
            'Industry Applications',
            'Data Analysis'
          ]
        },
        {
          semester: 'Specialization',
          subjects: [
            'Advanced Specialization',
            'Thesis/Project Work',
            'Professional Practice',
            'Elective Modules'
          ]
        }
      ]
    } else {
      return [
        {
          semester: 'Foundation Years',
          subjects: [
            'Fundamental Sciences',
            'Basic Theory',
            'Laboratory Work',
            'Clinical/Practical Training'
          ]
        },
        {
          semester: 'Advanced Studies',
          subjects: [
            'Specialized Practice',
            'Research Work',
            'Professional Training',
            'Dissertation'
          ]
        }
      ]
    }
  }

  return {
    ...course,
    category: course.field,
    overview: course.description,
    careerOutlook: `Strong demand for ${course.field.toLowerCase()} professionals with excellent growth prospects across industries.`,
    averageSalary: course.avgSalary,
    jobGrowth: jobGrowthMap[course.field] || '10% (Average)',
    keySkills: course.skills,
    careerPaths: course.jobRoles,
    topUniversities: [
      {
        name: `Top University for ${course.name}`,
        location: 'Major City, Country',
        ranking: course.id * 5,
        tuition: course.avgSalary.includes('$') ? '$45,000/year' : '€35,000/year',
        image: course.image
      },
      {
        name: `Leading Institute`,
        location: 'Academic Hub',
        ranking: course.id * 5 + 3,
        tuition: course.avgSalary.includes('$') ? '$42,000/year' : '€32,000/year',
        image: course.image
      },
      {
        name: `Premier University`,
        location: 'Research Center',
        ranking: course.id * 5 + 5,
        tuition: course.avgSalary.includes('$') ? '$48,000/year' : '€38,000/year',
        image: course.image
      }
    ],
    admissionRequirements: [
      course.level === 'Bachelor' ? 'High school diploma' : 'Bachelor\'s degree',
      'Academic transcripts',
      'Language proficiency (TOEFL/IELTS)',
      'Statement of Purpose',
      'Letters of Recommendation',
      course.level === 'Master' ? 'GRE/GMAT scores' : 'Standardized test scores',
      course.field === 'Technology' ? 'Programming portfolio' : 'Relevant experience'
    ],
    coursework: generateCoursework(course),
    specializations: course.skills.map(skill => `${skill} Specialization`),
    prerequisites: [
      course.level === 'Bachelor' ? 'High school mathematics' : 'Undergraduate degree in related field',
      'Strong analytical skills',
      'Interest in ' + course.field.toLowerCase(),
      course.field === 'Technology' ? 'Basic programming knowledge' : 'Relevant background knowledge'
    ],
    certifications: course.skills.map(skill => `Professional ${skill} Certification`),
    industryConnections: [
      'Fortune 500 Companies',
      'Leading Tech Companies',
      'Healthcare Organizations',
      'Research Institutions',
      'Startups & Unicorns'
    ],
    heroImage: course.image.replace('w=400&h=300', 'w=1920&h=1080'),
    icon: course.field === 'Technology' ? '💻' : 
          course.field === 'Business' ? '💼' :
          course.field === 'Healthcare' ? '🏥' :
          course.field === 'Engineering' ? '⚙️' :
          course.field === 'Social Sciences' ? '🧠' : '📚'
  }
}

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find(course => course.slug === slug)
}

export function getCourseDetailBySlug(slug: string): CourseDetail | undefined {
  const course = getCourseBySlug(slug)
  if (!course) return undefined
  return generateCourseDetail(course)
}