export interface Country {
  id: number
  name: string
  slug: string
  flag: string
  continent: string
  capital: string
  universities: number
  internationalStudents: string
  averageTuition: string
  ranking: number
  popularPrograms: string[]
  language: string
  visa: string
  workPermit: string
  description: string
  image: string
  stats: {
    universities: number
    students: string
    programs: number
    satisfaction: string
  }
}

export interface CountryDetail extends Country {
  whyStudy: string[]
  topUniversities: Array<{
    name: string
    ranking: number
    location: string
    image: string
  }>
  admissionRequirements: string[]
  livingCost: {
    accommodation: string
    food: string
    transport: string
    miscellaneous: string
  }
  scholarships: Array<{
    name: string
    amount: string
    eligibility: string
  }>
  workRights: {
    duringStudy: string
    afterGraduation: string
  }
  visaInfo: {
    type: string
    processingTime: string
    requirements: string[]
  }
  heroImage: string
  gallery: string[]
  currency: string
  timezone: string
  overview: string
}

export const countries: Country[] = [
  {
    id: 1,
    name: 'United States',
    slug: 'united-states',
    flag: '🇺🇸',
    continent: 'North America',
    capital: 'Washington, D.C.',
    universities: 5300,
    internationalStudents: '1.1M+',
    averageTuition: '$30,000 - $70,000',
    ranking: 1,
    popularPrograms: ['Business', 'Engineering', 'Computer Science', 'Medicine'],
    language: 'English',
    visa: 'F-1 Student Visa',
    workPermit: 'OPT (1-3 years)',
    description: 'Home to world-renowned universities like Harvard, MIT, and Stanford. The US offers diverse academic programs and excellent research opportunities.',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&h=300&fit=crop',
    stats: {
      universities: 5300,
      students: '1.1M',
      programs: 50000,
      satisfaction: '4.2'
    }
  },
  {
    id: 2,
    name: 'United Kingdom',
    slug: 'united-kingdom',
    flag: '🇬🇧',
    continent: 'Europe',
    capital: 'London',
    universities: 395,
    internationalStudents: '500K+',
    averageTuition: '£15,000 - £40,000',
    ranking: 2,
    popularPrograms: ['Business', 'Engineering', 'Arts & Humanities', 'Medicine'],
    language: 'English',
    visa: 'Student Visa (Tier 4)',
    workPermit: 'Graduate Route (2 years)',
    description: 'Historic universities like Oxford and Cambridge, plus modern institutions. Known for shorter degree programs and rich cultural heritage.',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop',
    stats: {
      universities: 395,
      students: '500K',
      programs: 15000,
      satisfaction: '4.1'
    }
  },
  {
    id: 3,
    name: 'Canada',
    slug: 'canada',
    flag: '🇨🇦',
    continent: 'North America',
    capital: 'Ottawa',
    universities: 223,
    internationalStudents: '720K+',
    averageTuition: 'CAD $20,000 - $50,000',
    ranking: 3,
    popularPrograms: ['Engineering', 'Business', 'Computer Science', 'Healthcare'],
    language: 'English, French',
    visa: 'Study Permit',
    workPermit: 'PGWP (up to 3 years)',
    description: 'Welcoming immigration policies and high-quality education. Universities like UofT and McGill offer excellent programs in a multicultural environment.',
    image: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=400&h=300&fit=crop',
    stats: {
      universities: 223,
      students: '720K',
      programs: 8500,
      satisfaction: '4.3'
    }
  },
  {
    id: 4,
    name: 'Australia',
    slug: 'australia',
    flag: '🇦🇺',
    continent: 'Oceania',
    capital: 'Canberra',
    universities: 147,
    internationalStudents: '760K+',
    averageTuition: 'AUD $25,000 - $55,000',
    ranking: 4,
    popularPrograms: ['Engineering', 'Business', 'Medicine', 'Environmental Science'],
    language: 'English',
    visa: 'Student Visa (Subclass 500)',
    workPermit: 'Temporary Graduate Visa (2-4 years)',
    description: 'Eight universities in the world\'s top 100. Known for research excellence, beautiful campuses, and post-study work opportunities.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    stats: {
      universities: 147,
      students: '760K',
      programs: 6200,
      satisfaction: '4.0'
    }
  },
  {
    id: 5,
    name: 'Germany',
    slug: 'germany',
    flag: '🇩🇪',
    continent: 'Europe',
    capital: 'Berlin',
    universities: 426,
    internationalStudents: '400K+',
    averageTuition: '€0 - €20,000',
    ranking: 5,
    popularPrograms: ['Engineering', 'Natural Sciences', 'Business', 'Medicine'],
    language: 'German, English',
    visa: 'National Visa (Type D)',
    workPermit: '18 months post-graduation',
    description: 'Many public universities with no tuition fees for international students. Strong in engineering and research with excellent industry connections.',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop',
    stats: {
      universities: 426,
      students: '400K',
      programs: 12000,
      satisfaction: '3.9'
    }
  },
  {
    id: 6,
    name: 'France',
    slug: 'france',
    flag: '🇫🇷',
    continent: 'Europe',
    capital: 'Paris',
    universities: 380,
    internationalStudents: '370K+',
    averageTuition: '€2,770 - €30,000',
    ranking: 6,
    popularPrograms: ['Business', 'Arts & Humanities', 'Engineering', 'Fashion'],
    language: 'French, English',
    visa: 'Student Visa (VLS-TS)',
    workPermit: 'APS (up to 2 years)',
    description: 'Rich cultural heritage with world-class institutions. Low tuition fees at public universities and strong programs in arts, business, and engineering.',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop',
    stats: {
      universities: 380,
      students: '370K',
      programs: 9500,
      satisfaction: '3.8'
    }
  },
  {
    id: 7,
    name: 'Netherlands',
    slug: 'netherlands',
    flag: '🇳🇱',
    continent: 'Europe',
    capital: 'Amsterdam',
    universities: 75,
    internationalStudents: '122K+',
    averageTuition: '€8,000 - €20,000',
    ranking: 7,
    popularPrograms: ['Engineering', 'Business', 'Social Sciences', 'Agriculture'],
    language: 'Dutch, English',
    visa: 'Student Visa (MVV)',
    workPermit: 'Orientation Year (1 year)',
    description: 'High-quality education with many English-taught programs. Known for innovation, liberal society, and excellent student life.',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400&h=300&fit=crop',
    stats: {
      universities: 75,
      students: '122K',
      programs: 2100,
      satisfaction: '4.2'
    }
  },
  {
    id: 8,
    name: 'Switzerland',
    slug: 'switzerland',
    flag: '🇨🇭',
    continent: 'Europe',
    capital: 'Bern',
    universities: 67,
    internationalStudents: '57K+',
    averageTuition: 'CHF 1,000 - CHF 4,000',
    ranking: 8,
    popularPrograms: ['Engineering', 'Business', 'Sciences', 'Hospitality'],
    language: 'German, French, Italian, English',
    visa: 'Student Visa (Type D)',
    workPermit: '6 months post-graduation',
    description: 'World-renowned universities like ETH Zurich. Excellent research facilities and high quality of life in a multilingual environment.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    stats: {
      universities: 67,
      students: '57K',
      programs: 1800,
      satisfaction: '4.4'
    }
  },
  {
    id: 9,
    name: 'Sweden',
    slug: 'sweden',
    flag: '🇸🇪',
    continent: 'Europe',
    capital: 'Stockholm',
    universities: 48,
    internationalStudents: '40K+',
    averageTuition: 'SEK 80,000 - SEK 300,000',
    ranking: 9,
    popularPrograms: ['Engineering', 'Technology', 'Design', 'Sustainability'],
    language: 'Swedish, English',
    visa: 'Residence Permit for Studies',
    workPermit: '6 months post-graduation',
    description: 'Innovation-focused education with strong emphasis on sustainability and technology. Free tuition for EU students.',
    image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=400&h=300&fit=crop',
    stats: {
      universities: 48,
      students: '40K',
      programs: 1200,
      satisfaction: '4.1'
    }
  }
]

// Helper function to generate detailed country data from basic country data
export function generateCountryDetail(country: Country): CountryDetail {
  // Default currency mapping
  const currencyMap: { [key: string]: string } = {
    'united-states': 'USD ($)',
    'united-kingdom': 'GBP (£)',
    'canada': 'CAD ($)',
    'australia': 'AUD ($)',
    'germany': 'EUR (€)',
    'france': 'EUR (€)',
    'netherlands': 'EUR (€)',
    'switzerland': 'CHF',
    'sweden': 'SEK'
  }

  // Default timezone mapping
  const timezoneMap: { [key: string]: string } = {
    'united-states': 'UTC-5 to UTC-10',
    'united-kingdom': 'UTC+0',
    'canada': 'UTC-3.5 to UTC-8',
    'australia': 'UTC+8 to UTC+11',
    'germany': 'UTC+1',
    'france': 'UTC+1',
    'netherlands': 'UTC+1',
    'switzerland': 'UTC+1',
    'sweden': 'UTC+1'
  }

  return {
    ...country,
    currency: currencyMap[country.slug] || 'Contact for details',
    timezone: timezoneMap[country.slug] || 'Contact for details',
    overview: country.description,
    whyStudy: [
      `Access to ${country.stats.universities} top universities`,
      `Join ${country.stats.students}+ international students`,
      `Choose from ${country.stats.programs.toLocaleString()}+ programs`,
      `High student satisfaction rating of ${country.stats.satisfaction}/5`,
      'Strong post-graduation career opportunities'
    ],
    topUniversities: [
      {
        name: `Top University in ${country.name}`,
        ranking: country.ranking * 10,
        location: country.capital,
        image: country.image
      },
      {
        name: `Leading Institute - ${country.capital}`,
        ranking: country.ranking * 10 + 5,
        location: country.capital,
        image: country.image
      },
      {
        name: `Premier University`,
        ranking: country.ranking * 10 + 10,
        location: `Major city in ${country.name}`,
        image: country.image
      }
    ],
    admissionRequirements: [
      'Valid academic transcripts',
      'Language proficiency test scores',
      'Statement of Purpose',
      'Letters of Recommendation',
      'Financial documentation',
      'Valid passport'
    ],
    livingCost: {
      accommodation: country.averageTuition.includes('$') ? '$500 - $1,500/month' : 
                    country.averageTuition.includes('£') ? '£400 - £1,200/month' :
                    country.averageTuition.includes('€') ? '€300 - €800/month' :
                    country.averageTuition.includes('AUD') ? 'AUD $600 - $1,800/month' :
                    country.averageTuition.includes('CAD') ? 'CAD $500 - $1,400/month' :
                    country.averageTuition.includes('CHF') ? 'CHF 800 - CHF 1,500/month' :
                    country.averageTuition.includes('SEK') ? 'SEK 4,000 - SEK 12,000/month' :
                    'Contact for details',
      food: country.averageTuition.includes('$') ? '$200 - $500/month' : 
            country.averageTuition.includes('£') ? '£150 - £400/month' :
            country.averageTuition.includes('€') ? '€150 - €350/month' :
            country.averageTuition.includes('AUD') ? 'AUD $250 - $600/month' :
            country.averageTuition.includes('CAD') ? 'CAD $200 - $450/month' :
            country.averageTuition.includes('CHF') ? 'CHF 300 - CHF 600/month' :
            country.averageTuition.includes('SEK') ? 'SEK 2,000 - SEK 4,000/month' :
            'Contact for details',
      transport: country.averageTuition.includes('$') ? '$50 - $150/month' : 
                 country.averageTuition.includes('£') ? '£30 - £120/month' :
                 country.averageTuition.includes('€') ? '€30 - €100/month' :
                 country.averageTuition.includes('AUD') ? 'AUD $80 - $200/month' :
                 country.averageTuition.includes('CAD') ? 'CAD $60 - $180/month' :
                 country.averageTuition.includes('CHF') ? 'CHF 50 - CHF 150/month' :
                 country.averageTuition.includes('SEK') ? 'SEK 500 - SEK 1,500/month' :
                 'Contact for details',
      miscellaneous: country.averageTuition.includes('$') ? '$100 - $300/month' : 
                     country.averageTuition.includes('£') ? '£80 - £250/month' :
                     country.averageTuition.includes('€') ? '€80 - €200/month' :
                     country.averageTuition.includes('AUD') ? 'AUD $120 - $350/month' :
                     country.averageTuition.includes('CAD') ? 'CAD $100 - $300/month' :
                     country.averageTuition.includes('CHF') ? 'CHF 100 - CHF 300/month' :
                     country.averageTuition.includes('SEK') ? 'SEK 1,000 - SEK 3,000/month' :
                     'Contact for details'
    },
    scholarships: [
      {
        name: `${country.name} Excellence Scholarship`,
        amount: 'Partial to Full funding',
        eligibility: 'Academic merit and financial need'
      },
      {
        name: 'International Student Grant',
        amount: '25-50% tuition coverage',
        eligibility: 'International students with strong academics'
      }
    ],
    workRights: {
      duringStudy: '20 hours/week during studies',
      afterGraduation: country.workPermit
    },
    visaInfo: {
      type: country.visa,
      processingTime: '2-6 weeks',
      requirements: [
        'Letter of acceptance from university',
        'Financial proof',
        'Valid passport',
        'Health insurance',
        'Visa application form'
      ]
    },
    heroImage: country.image.replace('w=400&h=300', 'w=1920&h=1080'),
    gallery: [
      country.image.replace('w=400&h=300', 'w=800&h=600'),
      country.image.replace('w=400&h=300', 'w=800&h=600'),
      country.image.replace('w=400&h=300', 'w=800&h=600')
    ]
  }
}

export function getCountryBySlug(slug: string): Country | undefined {
  return countries.find(country => country.slug === slug)
}

export function getCountryDetailBySlug(slug: string): CountryDetail | undefined {
  const country = getCountryBySlug(slug)
  if (!country) return undefined
  return generateCountryDetail(country)
}