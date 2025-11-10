// Comprehensive Business Schools Data - Top 200 Global List
export interface BusinessSchool {
  id: number
  name: string
  shortName?: string
  location: string
  country: string
  region: string
  established: number
  ranking: {
    global: number
    regional?: number
    ftGlobal?: number
    qsGlobal?: number
    usNews?: number
  }
  accreditation: string[]
  programs: {
    mba: {
      available: boolean
      duration: string
      tuitionFee: string
      currency: string
    }
    emba?: {
      available: boolean
      duration: string
      tuitionFee: string
    }
    masters?: string[]
    phd?: boolean
  }
  admissionRequirements: {
    gmat: {
      required: boolean
      averageScore?: number
      minScore?: number
    }
    gre: {
      accepted: boolean
      averageScore?: number
    }
    workExperience: {
      required: boolean
      averageYears?: number
      minYears?: number
    }
    englishTest: {
      toefl?: number
      ielts?: number
    }
  }
  statistics: {
    studentBody: number
    internationalStudents: string
    femaleStudents?: string
    averageAge?: number
    classSize?: number
  }
  outcomes: {
    employmentRate: string
    averageSalary: {
      amount: number
      currency: string
      timeFrame: string
    }
    salaryIncrease?: string
    topRecruiters?: string[]
  }
  highlights: string[]
  specializations: string[]
  image: string
  website: string
  applicationDeadlines: {
    round1?: string
    round2?: string
    round3?: string
    final?: string
  }
  scholarships: string[]
  campusLife: {
    housing: boolean
    studentClubs: number
    internationalism: string
  }
}

export const topBusinessSchools: BusinessSchool[] = [
  {
    id: 1,
    name: "Harvard Business School",
    shortName: "HBS",
    location: "Boston, MA",
    country: "USA",
    region: "North America",
    established: 1908,
    ranking: {
      global: 1,
      ftGlobal: 1,
      qsGlobal: 1,
      usNews: 1
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "73,440",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "205,000"
      },
      masters: ["Master in Management", "PhD in Business Administration"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 730,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 326
      },
      workExperience: {
        required: true,
        averageYears: 4.8,
        minYears: 2
      },
      englishTest: {
        toefl: 109,
        ielts: 7.5
      }
    },
    statistics: {
      studentBody: 1859,
      internationalStudents: "37%",
      femaleStudents: "45%",
      averageAge: 27,
      classSize: 930
    },
    outcomes: {
      employmentRate: "96%",
      averageSalary: {
        amount: 169000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "116%",
      topRecruiters: ["McKinsey & Co", "Boston Consulting Group", "Bain & Company", "Goldman Sachs", "Amazon"]
    },
    highlights: [
      "Case method teaching pioneer",
      "Largest MBA program alumni network",
      "Access to Harvard University resources",
      "Strong entrepreneurship ecosystem"
    ],
    specializations: [
      "General Management",
      "Finance",
      "Consulting",
      "Entrepreneurship",
      "Technology",
      "Healthcare",
      "Real Estate"
    ],
    image: "/business-schools/harvard-business-school.jpg",
    website: "https://www.hbs.edu",
    applicationDeadlines: {
      round1: "September 2",
      round2: "January 7",
      final: "April 24"
    },
    scholarships: [
      "Baker Scholars (top 5% of class)",
      "Fellowship awards up to full tuition",
      "Need-based financial aid",
      "Military veteran scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 80,
      internationalism: "Very High"
    }
  },
  {
    id: 2,
    name: "Stanford Graduate School of Business",
    shortName: "Stanford GSB",
    location: "Stanford, CA",
    country: "USA",
    region: "North America",
    established: 1925,
    ranking: {
      global: 2,
      ftGlobal: 2,
      qsGlobal: 2,
      usNews: 2
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "74,706",
        currency: "USD"
      },
      emba: {
        available: false,
        duration: "N/A",
        tuitionFee: "N/A"
      },
      masters: ["MSx Program (1-year MBA)", "PhD in Business"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: 734,
        minScore: 620
      },
      gre: {
        accepted: true,
        averageScore: 330
      },
      workExperience: {
        required: true,
        averageYears: 4.6,
        minYears: 2
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 855,
      internationalStudents: "42%",
      femaleStudents: "47%",
      averageAge: 28,
      classSize: 417
    },
    outcomes: {
      employmentRate: "92%",
      averageSalary: {
        amount: 175000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "142%",
      topRecruiters: ["McKinsey & Co", "Google", "Amazon", "Apple", "Meta"]
    },
    highlights: [
      "Silicon Valley location advantage",
      "Small class size for personalized attention",
      "Strong tech industry connections",
      "Leadership-focused curriculum"
    ],
    specializations: [
      "Technology & Innovation",
      "Venture Capital",
      "Social Innovation",
      "Finance",
      "Marketing",
      "Operations"
    ],
    image: "/business-schools/stanford-gsb.jpg",
    website: "https://www.gsb.stanford.edu",
    applicationDeadlines: {
      round1: "September 13",
      round2: "January 10",
      round3: "April 5"
    },
    scholarships: [
      "Stanford Reliance Fellowship",
      "Knight-Hennessy Scholars",
      "Stanford Africa MBA Fellowship",
      "Need-based financial aid"
    ],
    campusLife: {
      housing: true,
      studentClubs: 60,
      internationalism: "Very High"
    }
  },
  {
    id: 3,
    name: "Wharton School, University of Pennsylvania",
    shortName: "Wharton",
    location: "Philadelphia, PA",
    country: "USA",
    region: "North America",
    established: 1881,
    ranking: {
      global: 3,
      ftGlobal: 3,
      qsGlobal: 3,
      usNews: 3
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "81,378",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "22 months",
        tuitionFee: "228,900"
      },
      masters: ["MBA for Executives", "PhD Programs"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 728,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 324
      },
      workExperience: {
        required: true,
        averageYears: 5.0,
        minYears: 1
      },
      englishTest: {
        toefl: 110,
        ielts: 7.5
      }
    },
    statistics: {
      studentBody: 1742,
      internationalStudents: "33%",
      femaleStudents: "50%",
      averageAge: 28,
      classSize: 863
    },
    outcomes: {
      employmentRate: "95%",
      averageSalary: {
        amount: 165000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "80%",
      topRecruiters: ["McKinsey & Co", "BCG", "Bain", "Goldman Sachs", "JPMorgan Chase"]
    },
    highlights: [
      "World's first collegiate business school",
      "Strong finance program",
      "Comprehensive curriculum with 19 majors",
      "Ivy League prestige"
    ],
    specializations: [
      "Finance",
      "Consulting",
      "Marketing",
      "Operations",
      "Entrepreneurship",
      "Real Estate",
      "Healthcare Management"
    ],
    image: "/business-schools/wharton.jpg",
    website: "https://www.wharton.upenn.edu",
    applicationDeadlines: {
      round1: "September 15",
      round2: "January 3",
      round3: "March 28"
    },
    scholarships: [
      "Joseph Wharton Fellowships",
      "Dean's Fellowships",
      "Diversity & Inclusion Fellowships",
      "Need-based aid"
    ],
    campusLife: {
      housing: true,
      studentClubs: 100,
      internationalism: "High"
    }
  },
  {
    id: 4,
    name: "London Business School",
    shortName: "LBS",
    location: "London",
    country: "UK",
    region: "Europe",
    established: 1964,
    ranking: {
      global: 4,
      ftGlobal: 4,
      qsGlobal: 4,
      regional: 1
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "15-21 months",
        tuitionFee: "104,000",
        currency: "GBP"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "132,000"
      },
      masters: ["Masters in Finance", "Masters in Analytics", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 701,
        minScore: 600
      },
      gre: {
        accepted: true
      },
      workExperience: {
        required: true,
        averageYears: 6.0,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 500,
      internationalStudents: "97%",
      femaleStudents: "38%",
      averageAge: 29,
      classSize: 500
    },
    outcomes: {
      employmentRate: "94%",
      averageSalary: {
        amount: 136000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "103%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Amazon"]
    },
    highlights: [
      "Most international MBA program",
      "London financial center location",
      "Strong European network",
      "Flexible program duration"
    ],
    specializations: [
      "Finance",
      "Consulting",
      "Entrepreneurship",
      "Marketing",
      "Strategy",
      "Private Equity"
    ],
    image: "/business-schools/london-business-school.jpg",
    website: "https://www.london.edu",
    applicationDeadlines: {
      round1: "October 1",
      round2: "January 8",
      round3: "March 31"
    },
    scholarships: [
      "Forté Fellowship",
      "Sainsbury Scholarship",
      "Dean's Scholarships",
      "Regional scholarships"
    ],
    campusLife: {
      housing: false,
      studentClubs: 70,
      internationalism: "Extremely High"
    }
  },
  {
    id: 5,
    name: "INSEAD",
    location: "Fontainebleau, France / Singapore / Abu Dhabi",
    country: "France",
    region: "Europe",
    established: 1957,
    ranking: {
      global: 5,
      ftGlobal: 5,
      qsGlobal: 5,
      regional: 2
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "10 months",
        tuitionFee: "89,000",
        currency: "EUR"
      },
      emba: {
        available: true,
        duration: "14-17 months",
        tuitionFee: "180,000"
      },
      masters: ["Master in Finance", "Master in Management", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 709,
        minScore: 650
      },
      gre: {
        accepted: true
      },
      workExperience: {
        required: true,
        averageYears: 5.5,
        minYears: 2
      },
      englishTest: {
        toefl: 105,
        ielts: 7.5
      }
    },
    statistics: {
      studentBody: 540,
      internationalStudents: "99%",
      femaleStudents: "39%",
      averageAge: 29,
      classSize: 540
    },
    outcomes: {
      employmentRate: "93%",
      averageSalary: {
        amount: 142600,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "93%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Amazon", "Google"]
    },
    highlights: [
      "Multi-campus global program",
      "Most diverse student body",
      "Intensive 10-month program",
      "Strong European and Asian networks"
    ],
    specializations: [
      "General Management",
      "Finance",
      "Consulting",
      "Technology",
      "Entrepreneurship",
      "Strategy"
    ],
    image: "/business-schools/insead.jpg",
    website: "https://www.insead.edu",
    applicationDeadlines: {
      round1: "August 28",
      round2: "October 30",
      round3: "February 5"
    },
    scholarships: [
      "INSEAD scholarships",
      "L'Oréal scholarship",
      "Regional scholarships",
      "Need-based aid"
    ],
    campusLife: {
      housing: true,
      studentClubs: 50,
      internationalism: "Extremely High"
    }
  }
]

// Helper functions
export const getBusinessSchoolsByRegion = (region: string) => {
  return topBusinessSchools.filter(school => school.region === region)
}

export const getBusinessSchoolsByCountry = (country: string) => {
  return topBusinessSchools.filter(school => school.country === country)
}

export const getTopBusinessSchools = (count: number = 10) => {
  return topBusinessSchools
    .sort((a, b) => a.ranking.global - b.ranking.global)
    .slice(0, count)
}

export const searchBusinessSchools = (query: string) => {
  const lowercaseQuery = query.toLowerCase()
  return topBusinessSchools.filter(school => 
    school.name.toLowerCase().includes(lowercaseQuery) ||
    school.location.toLowerCase().includes(lowercaseQuery) ||
    school.country.toLowerCase().includes(lowercaseQuery) ||
    school.specializations.some(spec => spec.toLowerCase().includes(lowercaseQuery))
  )
}