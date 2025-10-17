// University data types
export interface University {
  id: number
  name: string
  slug: string
  location: string
  country: string
  established?: number
  ranking: number
  students: string
  internationalStudents?: string
  acceptance?: string
  tuition?: string
  rating: number
  programs: number | string[]
  image: string
  description?: string
  highlights?: string[]
  facilities?: string[]
  admissions?: {
    requirements: string[]
    deadlines: Record<string, string>
  }
  scholarships?: string[]
  contact?: {
    email: string
    phone: string
    website: string
    address: string
  }
}

// This would typically come from your database/API
let universities: University[] = [
  {
    id: 1,
    name: 'Harvard University',
    slug: 'harvard-university',
    location: 'Cambridge, MA',
    country: 'USA',
    established: 1636,
    rating: 4.9,
    ranking: 1,
    students: '23,000+',
    internationalStudents: '25%',
    acceptance: '3.4%',
    tuition: '$54,000/year',
    programs: [
      'Business Administration (MBA)',
      'Medicine (MD)',
      'Law (JD)',
      'Computer Science',
      'Economics',
      'Psychology',
      'Engineering',
      'Public Policy'
    ],
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800',
    description: 'Harvard University is a prestigious Ivy League research university known for its academic excellence, influential alumni, and groundbreaking research across various disciplines.',
    highlights: [
      'Oldest higher education institution in the US',
      'Home to Harvard Business School and Harvard Medical School',
      '8 US Presidents among alumni',
      'Largest academic library system in the world'
    ],
    facilities: [
      'State-of-the-art research laboratories',
      'Widener Library - largest university library',
      'Harvard Art Museums',
      'Athletic facilities and gymnasium',
      '400+ student organizations',
      'On-campus housing for all undergraduates'
    ],
    admissions: {
      requirements: [
        'High school diploma or equivalent',
        'SAT/ACT scores',
        'Letters of recommendation',
        'Personal essay',
        'Extracurricular activities',
        'TOEFL/IELTS for international students'
      ],
      deadlines: {
        'Early Action': 'November 1',
        'Regular Decision': 'January 1',
        'Financial Aid': 'February 1'
      }
    },
    scholarships: [
      'Need-based financial aid (up to full tuition)',
      'Harvard College Scholarship',
      'International Student Aid',
      'Merit-based scholarships for exceptional students'
    ],
    contact: {
      email: 'admissions@harvard.edu',
      phone: '+1 (617) 495-1551',
      website: 'https://www.harvard.edu',
      address: 'Massachusetts Hall, Cambridge, MA 02138'
    }
  },
  {
    id: 2,
    name: 'Stanford University',
    slug: 'stanford-university',
    location: 'Stanford, CA',
    country: 'USA',
    established: 1885,
    rating: 4.8,
    ranking: 2,
    students: '17,000+',
    internationalStudents: '22%',
    acceptance: '3.9%',
    tuition: '$56,000/year',
    programs: [
      'Computer Science',
      'Engineering',
      'Business (MBA)',
      'Medicine',
      'Law',
      'Education',
      'Earth Sciences',
      'Psychology'
    ],
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800',
    description: 'Stanford University is a leading research university in Silicon Valley, renowned for innovation, entrepreneurship, and academic excellence in technology and sciences.',
    highlights: [
      'Located in the heart of Silicon Valley',
      'Top-ranked engineering and computer science programs',
      'Numerous Nobel Prize winners on faculty',
      'Strong ties to tech industry and startups'
    ],
    facilities: [
      'Stanford Research Park',
      'Hoover Institution',
      'Stanford Medical Center',
      'Green Library',
      '650+ student organizations',
      'State-of-the-art athletic facilities'
    ],
    admissions: {
      requirements: [
        'High school diploma',
        'Standardized test scores (SAT/ACT)',
        'Teacher recommendations',
        'Essays and personal statements',
        'Leadership and extracurricular involvement'
      ],
      deadlines: {
        'Restrictive Early Action': 'November 1',
        'Regular Decision': 'January 2',
        'Financial Aid': 'February 15'
      }
    },
    scholarships: [
      'Knight-Hennessy Scholars Program',
      'Need-based Stanford Financial Aid',
      'Athletic scholarships',
      'International student financial aid'
    ],
    contact: {
      email: 'admission@stanford.edu',
      phone: '+1 (650) 723-2091',
      website: 'https://www.stanford.edu',
      address: '450 Serra Mall, Stanford, CA 94305'
    }
  },
  {
    id: 3,
    name: 'MIT',
    slug: 'mit',
    location: 'Cambridge, MA',
    country: 'USA',
    established: 1861,
    rating: 4.9,
    ranking: 3,
    students: '11,000+',
    internationalStudents: '33%',
    acceptance: '7.3%',
    tuition: '$55,000/year',
    programs: [
      'Computer Science & AI',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Physics',
      'Mathematics',
      'Economics',
      'Architecture',
      'Management (Sloan)'
    ],
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800',
    description: 'MIT is a world-renowned institution specializing in science, technology, engineering, and mathematics, fostering innovation and groundbreaking research.',
    highlights: [
      '#1 Engineering and Technology programs globally',
      'Cutting-edge research in AI and robotics',
      'Strong alumni network in tech industry',
      'Innovation and entrepreneurship culture'
    ],
    facilities: [
      'MIT.nano - nanoscale research facility',
      'Computer Science and Artificial Intelligence Laboratory',
      'Media Lab',
      'Lincoln Laboratory',
      'MIT Libraries',
      'Recreation and fitness centers'
    ],
    admissions: {
      requirements: [
        'High school completion',
        'SAT/ACT scores',
        'Subject tests in Math and Science',
        'Letters of recommendation',
        'Essays demonstrating fit with MIT culture'
      ],
      deadlines: {
        'Early Action': 'November 1',
        'Regular Action': 'January 1',
        'Financial Aid': 'February 15'
      }
    },
    scholarships: [
      'Need-based financial aid',
      'International student support',
      'Undergraduate Research Opportunities Program (UROP)',
      'Merit-based departmental awards'
    ],
    contact: {
      email: 'admissions@mit.edu',
      phone: '+1 (617) 253-3400',
      website: 'https://www.mit.edu',
      address: '77 Massachusetts Avenue, Cambridge, MA 02139'
    }
  },
  {
    id: 4,
    name: 'University of Oxford',
    slug: 'oxford-university',
    location: 'Oxford',
    country: 'UK',
    established: 1096,
    rating: 4.8,
    ranking: 4,
    students: '24,000+',
    internationalStudents: '41%',
    acceptance: '17.5%',
    tuition: '£38,000/year',
    programs: [
      'Philosophy, Politics & Economics (PPE)',
      'Medicine',
      'Law',
      'English Literature',
      'History',
      'Mathematics',
      'Physics',
      'Chemistry'
    ],
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800',
    description: 'The University of Oxford is one of the oldest and most prestigious universities in the world, known for its rigorous academic programs and historic collegiate system.',
    highlights: [
      'Oldest university in the English-speaking world',
      'Tutorial system with personalized teaching',
      'Home to the Bodleian Library',
      '28 British Prime Ministers among alumni'
    ],
    facilities: [
      'Bodleian Library - one of Europe\'s oldest libraries',
      '38 colleges with historic architecture',
      'Oxford University Museum of Natural History',
      'Radcliffe Camera',
      'Numerous research institutes',
      'Sports facilities and rowing clubs'
    ],
    admissions: {
      requirements: [
        'A-levels or equivalent qualifications',
        'Oxford admissions test (varies by subject)',
        'Personal statement',
        'Academic reference',
        'Interview (for shortlisted candidates)',
        'English language requirements for international students'
      ],
      deadlines: {
        'UCAS Application': 'October 15',
        'Admissions Tests': 'November (varies)',
        'Interview Period': 'December'
      }
    },
    scholarships: [
      'Rhodes Scholarships',
      'Oxford Bursaries for UK students',
      'Clarendon Scholarships for international students',
      'Subject-specific scholarships'
    ],
    contact: {
      email: 'undergraduate.admissions@ox.ac.uk',
      phone: '+44 1865 288000',
      website: 'https://www.ox.ac.uk',
      address: 'University of Oxford, Oxford OX1 2JD, UK'
    }
  },
  {
    id: 5,
    name: 'University of Cambridge',
    slug: 'cambridge-university',
    location: 'Cambridge',
    country: 'UK',
    established: 1209,
    rating: 4.8,
    ranking: 5,
    students: '23,000+',
    internationalStudents: '38%',
    acceptance: '21%',
    tuition: '£38,000/year',
    programs: [
      'Natural Sciences',
      'Engineering',
      'Mathematics',
      'Medicine',
      'Law',
      'Economics',
      'History',
      'English Literature'
    ],
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800',
    description: 'The University of Cambridge is a prestigious collegiate research university known for its academic excellence and significant contributions to science, mathematics, and literature.',
    highlights: [
      'Second-oldest university in the English-speaking world',
      '121 Nobel Prize winners affiliated',
      'Strong tradition in mathematics and sciences',
      'Famous alumni include Stephen Hawking and Isaac Newton'
    ],
    facilities: [
      'Cambridge University Library',
      '31 colleges with historic buildings',
      'Cavendish Laboratory',
      'Fitzwilliam Museum',
      'Mathematical sciences research institutes',
      'Extensive sports and recreation facilities'
    ],
    admissions: {
      requirements: [
        'Excellent A-level results or equivalent',
        'Cambridge admissions assessments',
        'Completed application form',
        'Academic references',
        'Interview for shortlisted candidates',
        'English proficiency for international students'
      ],
      deadlines: {
        'UCAS Application': 'October 15',
        'Admissions Assessments': 'November',
        'Interview Invitations': 'December'
      }
    },
    scholarships: [
      'Gates Cambridge Scholarships',
      'Cambridge Bursary Scheme',
      'International scholarships',
      'College-specific awards'
    ],
    contact: {
      email: 'admissions@cam.ac.uk',
      phone: '+44 1223 333308',
      website: 'https://www.cam.ac.uk',
      address: 'The Old Schools, Trinity Lane, Cambridge CB2 1TN, UK'
    }
  },
  {
    id: 6,
    name: 'University of Toronto',
    slug: 'university-of-toronto',
    location: 'Toronto, ON',
    country: 'Canada',
    established: 1827,
    rating: 4.6,
    ranking: 18,
    students: '97,000+',
    internationalStudents: '25%',
    acceptance: '43%',
    tuition: 'CAD $60,000/year',
    programs: [
      'Medicine',
      'Engineering',
      'Business (Rotman)',
      'Computer Science',
      'Life Sciences',
      'Arts & Science',
      'Law',
      'Public Health'
    ],
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800',
    description: 'The University of Toronto is Canada\'s leading institution of higher learning, renowned for its research excellence and diverse academic programs.',
    highlights: [
      'Canada\'s top-ranked university',
      'Birthplace of insulin discovery',
      'Strong research output and innovation',
      'Diverse and inclusive campus community'
    ],
    facilities: [
      'Robarts Library - largest academic library in Canada',
      'Multiple campuses across Toronto',
      'Advanced research laboratories',
      'Hospitals affiliated with medical school',
      '800+ student clubs and organizations',
      'Comprehensive sports and recreation facilities'
    ],
    admissions: {
      requirements: [
        'High school diploma with excellent grades',
        'English language proficiency',
        'Program-specific prerequisites',
        'Supplementary application (some programs)',
        'Letters of recommendation',
        'Personal statement or essays'
      ],
      deadlines: {
        'Regular Admission': 'January 13',
        'Late Admission': 'March 1',
        'International Applications': 'January 13'
      }
    },
    scholarships: [
      'Lester B. Pearson International Scholarships',
      'University of Toronto Scholars Program',
      'National Scholarship Program',
      'Need-based financial aid'
    ],
    contact: {
      email: 'admissions.help@utoronto.ca',
      phone: '+1 (416) 978-2190',
      website: 'https://www.utoronto.ca',
      address: '27 King\'s College Circle, Toronto, ON M5S 1A1, Canada'
    }
  },
  {
    id: 7,
    name: 'Indian Institute of Technology Delhi',
    slug: 'iit-delhi',
    location: 'New Delhi',
    country: 'India',
    established: 1961,
    rating: 4.6,
    ranking: 185,
    students: '10,000+',
    internationalStudents: '5%',
    acceptance: '2.5%',
    tuition: '₹2,50,000/year',
    programs: [
      'Computer Science & Engineering',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Chemical Engineering',
      'Civil Engineering',
      'Mathematics & Computing',
      'Physics',
      'Chemistry'
    ],
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800',
    description: 'IIT Delhi is one of India\'s premier technical institutions, known for excellence in engineering, technology, and research.',
    highlights: [
      'Top engineering institution in India',
      'Strong industry connections',
      'World-class research facilities',
      'Distinguished alumni network'
    ],
    facilities: [
      'Central Library',
      'Advanced computing facilities',
      'Research laboratories',
      'Sports complex',
      'Hostels for students',
      'Medical center'
    ],
    admissions: {
      requirements: [
        'JEE Advanced qualification',
        'Class 12 with 75% marks',
        'Age limit requirements',
        'Medical fitness certificate'
      ],
      deadlines: {
        'JEE Main': 'March',
        'JEE Advanced': 'May',
        'Counselling': 'June-July'
      }
    },
    scholarships: [
      'Merit-cum-Means Scholarship',
      'Institute Scholarship',
      'SC/ST/OBC Fee Waiver',
      'International Exchange Programs'
    ],
    contact: {
      email: 'admissions@admin.iitd.ac.in',
      phone: '+91-11-2659-1785',
      website: 'https://www.iitd.ac.in',
      address: 'Hauz Khas, New Delhi - 110016'
    }
  },
  {
    id: 8,
    name: 'Indian Institute of Science Bangalore',
    slug: 'iisc-bangalore',
    location: 'Bangalore',
    country: 'India',
    established: 1909,
    rating: 4.7,
    ranking: 155,
    students: '3,500+',
    internationalStudents: '8%',
    acceptance: '3.5%',
    tuition: '₹50,000/year',
    programs: [
      'Aerospace Engineering',
      'Biological Sciences',
      'Chemical Engineering',
      'Computer Science & Automation',
      'Electrical Communication Engineering',
      'Physics',
      'Mathematics',
      'Management'
    ],
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
    description: 'IISc Bangalore is India\'s leading institution for advanced scientific and technological research and education.',
    highlights: [
      'Highest ranked Indian institution globally',
      'Research-intensive environment',
      'Top faculty from around the world',
      'Strong PhD and Masters programs'
    ],
    facilities: [
      'J.R.D. Tata Memorial Library',
      'Super computing facility',
      'Advanced research labs',
      'Hostel accommodation',
      'Gym and sports facilities',
      'Medical center'
    ],
    admissions: {
      requirements: [
        'GATE/NET qualification (for Masters)',
        'Entrance exam for PhD',
        'Bachelor\'s degree in relevant field',
        'Academic excellence record'
      ],
      deadlines: {
        'GATE Score': 'March',
        'Application': 'April-May',
        'Interview': 'May-June'
      }
    },
    scholarships: [
      'Institute Fellowship',
      'INSPIRE Fellowship',
      'CSIR/UGC Fellowship',
      'International student support'
    ],
    contact: {
      email: 'regr@iisc.ac.in',
      phone: '+91-80-2293-2001',
      website: 'https://www.iisc.ac.in',
      address: 'C V Raman Avenue, Bangalore - 560012'
    }
  },
  {
    id: 9,
    name: 'Jawaharlal Nehru University',
    slug: 'jnu-delhi',
    location: 'New Delhi',
    country: 'India',
    established: 1969,
    rating: 4.3,
    ranking: 801,
    students: '8,500+',
    internationalStudents: '12%',
    acceptance: '8%',
    tuition: '₹1,00,000/year',
    programs: [
      'International Relations',
      'Economics',
      'History',
      'Political Science',
      'Languages & Literature',
      'Life Sciences',
      'Physical Sciences',
      'Computer Science'
    ],
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800',
    description: 'JNU is a premier research university known for its academic excellence in humanities, social sciences, and sciences.',
    highlights: [
      'Top university for social sciences in India',
      'Diverse international community',
      'Strong research focus',
      'Beautiful campus with modern facilities'
    ],
    facilities: [
      'Central Library with vast collection',
      'Computer centers',
      'Hostels for all students',
      'Health center',
      'Sports complex',
      'Cultural activity centers'
    ],
    admissions: {
      requirements: [
        'JNU Entrance Examination (JNUEE)',
        'Bachelor\'s degree for Masters',
        'Masters degree for PhD',
        'English proficiency'
      ],
      deadlines: {
        'Application': 'March-April',
        'Entrance Exam': 'May',
        'Admission': 'July'
      }
    },
    scholarships: [
      'Merit Scholarship',
      'UGC Fellowship',
      'International Student Scholarship',
      'Research Assistantship'
    ],
    contact: {
      email: 'registrar@mail.jnu.ac.in',
      phone: '+91-11-2670-4019',
      website: 'https://www.jnu.ac.in',
      address: 'New Mehrauli Road, New Delhi - 110067'
    }
  }
]

// Data access functions
export const getAllUniversities = (): University[] => {
  return universities
}

export const getUniversityBySlug = (slug: string): University | undefined => {
  return universities.find(uni => uni.slug === slug)
}

export const getUniversityById = (id: number): University | undefined => {
  return universities.find(uni => uni.id === id)
}

export const addUniversity = (university: Omit<University, 'id'>): University => {
  const newId = Math.max(...universities.map(u => u.id)) + 1
  const newUniversity = { ...university, id: newId }
  universities.push(newUniversity)
  return newUniversity
}

export const updateUniversity = (id: number, updates: Partial<University>): University | null => {
  const index = universities.findIndex(uni => uni.id === id)
  if (index === -1) return null
  
  universities[index] = { ...universities[index], ...updates }
  return universities[index]
}

export const deleteUniversity = (id: number): boolean => {
  const index = universities.findIndex(uni => uni.id === id)
  if (index === -1) return false
  
  universities.splice(index, 1)
  return true
}

// Search and filter functions
export const searchUniversities = (
  searchTerm: string = '',
  country: string = 'all',
  ranking: string = 'all'
): University[] => {
  return universities.filter(university => {
    const matchesSearch = university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         university.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCountry = country === 'all' || university.country === country
    
    let matchesRanking = true
    if (ranking !== 'all') {
      switch (ranking) {
        case 'top10':
          matchesRanking = university.ranking <= 10
          break
        case 'top50':
          matchesRanking = university.ranking <= 50
          break
      }
    }
    
    return matchesSearch && matchesCountry && matchesRanking
  })
}