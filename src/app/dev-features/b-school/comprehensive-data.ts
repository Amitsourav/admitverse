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
      currency?: string
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
  // Global Top 100 Business Schools

  // Top US Business Schools
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
    name: "Kellogg School of Management",
    shortName: "Kellogg",
    location: "Evanston, IL",
    country: "USA",
    region: "North America",
    established: 1908,
    ranking: {
      global: 4,
      ftGlobal: 4,
      qsGlobal: 4,
      usNews: 4
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "76,980",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "24 months",
        tuitionFee: "220,000"
      },
      masters: ["MS in Management Studies", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 727,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 325
      },
      workExperience: {
        required: true,
        averageYears: 5.1,
        minYears: 2
      },
      englishTest: {
        toefl: 104,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 1356,
      internationalStudents: "35%",
      femaleStudents: "44%",
      averageAge: 28,
      classSize: 664
    },
    outcomes: {
      employmentRate: "94%",
      averageSalary: {
        amount: 159000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "118%",
      topRecruiters: ["McKinsey & Co", "BCG", "Bain", "Amazon", "Microsoft"]
    },
    highlights: [
      "Strong marketing and management programs",
      "Collaborative culture",
      "Team-based learning approach",
      "Excellent alumni network"
    ],
    specializations: [
      "Marketing",
      "Management & Organizations",
      "Strategy",
      "Finance",
      "Operations",
      "Analytics"
    ],
    image: "/business-schools/kellogg.jpg",
    website: "https://www.kellogg.northwestern.edu",
    applicationDeadlines: {
      round1: "September 14",
      round2: "January 5",
      round3: "April 12"
    },
    scholarships: [
      "Merit-based scholarships",
      "Forte Fellowship",
      "Military scholarships",
      "Diversity scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 90,
      internationalism: "High"
    }
  },
  {
    id: 5,
    name: "MIT Sloan School of Management",
    shortName: "MIT Sloan",
    location: "Cambridge, MA",
    country: "USA",
    region: "North America",
    established: 1914,
    ranking: {
      global: 5,
      ftGlobal: 5,
      qsGlobal: 5,
      usNews: 5
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "80,400",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "198,000"
      },
      masters: ["Master of Finance", "PhD"],
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
        averageYears: 4.8,
        minYears: 2
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 812,
      internationalStudents: "38%",
      femaleStudents: "42%",
      averageAge: 28,
      classSize: 409
    },
    outcomes: {
      employmentRate: "93%",
      averageSalary: {
        amount: 164000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "109%",
      topRecruiters: ["Amazon", "Google", "McKinsey & Co", "BCG", "Apple"]
    },
    highlights: [
      "Strong in entrepreneurship and innovation",
      "MIT ecosystem access",
      "Technology focus",
      "Action learning methodology"
    ],
    specializations: [
      "Entrepreneurship",
      "Finance",
      "Operations Research",
      "Technology & Innovation",
      "Strategy"
    ],
    image: "/business-schools/mit-sloan.jpg",
    website: "https://mitsloan.mit.edu",
    applicationDeadlines: {
      round1: "September 19",
      round2: "January 17",
      round3: "April 16"
    },
    scholarships: [
      "Merit fellowships",
      "Legatum Fellowship",
      "Military fellowships",
      "Need-based aid"
    ],
    campusLife: {
      housing: true,
      studentClubs: 70,
      internationalism: "High"
    }
  },
  {
    id: 6,
    name: "Columbia Business School",
    shortName: "Columbia",
    location: "New York, NY",
    country: "USA",
    region: "North America",
    established: 1916,
    ranking: {
      global: 6,
      ftGlobal: 6,
      qsGlobal: 6,
      usNews: 6
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "79,752",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "230,000"
      },
      masters: ["MS in Financial Economics", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 729,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 324
      },
      workExperience: {
        required: true,
        averageYears: 5.1,
        minYears: 0
      },
      englishTest: {
        toefl: 105,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 1622,
      internationalStudents: "45%",
      femaleStudents: "42%",
      averageAge: 28,
      classSize: 743
    },
    outcomes: {
      employmentRate: "95%",
      averageSalary: {
        amount: 166000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "86%",
      topRecruiters: ["Goldman Sachs", "JPMorgan Chase", "McKinsey & Co", "BCG", "Amazon"]
    },
    highlights: [
      "NYC location advantage",
      "Strong finance connections",
      "Value investing program",
      "Ivy League network"
    ],
    specializations: [
      "Finance",
      "Real Estate",
      "Marketing",
      "Consulting",
      "Entrepreneurship"
    ],
    image: "/business-schools/columbia.jpg",
    website: "https://www.gsb.columbia.edu",
    applicationDeadlines: {
      round1: "September 15",
      round2: "January 5",
      round3: "April 12"
    },
    scholarships: [
      "Dean's Fellowship",
      "Merit scholarships",
      "Forte Fellowship",
      "Military scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 85,
      internationalism: "Very High"
    }
  },
  {
    id: 7,
    name: "Yale School of Management",
    shortName: "Yale SOM",
    location: "New Haven, CT",
    country: "USA",
    region: "North America",
    established: 1976,
    ranking: {
      global: 7,
      ftGlobal: 9,
      qsGlobal: 7,
      usNews: 7
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "75,500",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "22 months",
        tuitionFee: "210,000"
      },
      masters: ["MAM", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 724,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 323
      },
      workExperience: {
        required: true,
        averageYears: 5.0,
        minYears: 0
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 738,
      internationalStudents: "42%",
      femaleStudents: "46%",
      averageAge: 28,
      classSize: 345
    },
    outcomes: {
      employmentRate: "93%",
      averageSalary: {
        amount: 155000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "95%",
      topRecruiters: ["McKinsey & Co", "BCG", "Bain", "Goldman Sachs", "Amazon"]
    },
    highlights: [
      "Integrated curriculum",
      "Global network for advanced management",
      "Social impact focus",
      "Raw case methodology"
    ],
    specializations: [
      "Asset Management",
      "Nonprofit Management",
      "Sustainable Business",
      "Healthcare Management"
    ],
    image: "/business-schools/yale-som.jpg",
    website: "https://som.yale.edu",
    applicationDeadlines: {
      round1: "September 12",
      round2: "January 9",
      round3: "April 10"
    },
    scholarships: [
      "Silver Scholars",
      "Merit fellowships",
      "Need-based aid",
      "Consortium fellowships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 65,
      internationalism: "High"
    }
  },
  {
    id: 8,
    name: "Tuck School of Business, Dartmouth",
    shortName: "Tuck",
    location: "Hanover, NH",
    country: "USA",
    region: "North America",
    established: 1900,
    ranking: {
      global: 8,
      ftGlobal: 8,
      qsGlobal: 8,
      usNews: 8
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "77,520",
        currency: "USD"
      },
      emba: {
        available: false,
        duration: "N/A",
        tuitionFee: "N/A"
      },
      masters: ["PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 717,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 319
      },
      workExperience: {
        required: true,
        averageYears: 5.0,
        minYears: 2
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 560,
      internationalStudents: "35%",
      femaleStudents: "44%",
      averageAge: 28,
      classSize: 280
    },
    outcomes: {
      employmentRate: "96%",
      averageSalary: {
        amount: 158000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "118%",
      topRecruiters: ["McKinsey & Co", "BCG", "Bain", "Amazon", "Microsoft"]
    },
    highlights: [
      "Close-knit community",
      "General management focus",
      "Strong alumni loyalty",
      "Outdoor recreation opportunities"
    ],
    specializations: [
      "General Management",
      "Consulting",
      "Finance",
      "Technology",
      "Healthcare"
    ],
    image: "/business-schools/tuck.jpg",
    website: "https://www.tuck.dartmouth.edu",
    applicationDeadlines: {
      round1: "October 15",
      round2: "January 3",
      round3: "March 28"
    },
    scholarships: [
      "Merit scholarships",
      "Consortium fellowships",
      "Military scholarships",
      "International fellowships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 50,
      internationalism: "High"
    }
  },
  {
    id: 9,
    name: "Haas School of Business, UC Berkeley",
    shortName: "Berkeley Haas",
    location: "Berkeley, CA",
    country: "USA",
    region: "North America",
    established: 1898,
    ranking: {
      global: 9,
      ftGlobal: 7,
      qsGlobal: 9,
      usNews: 9
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "64,246",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "19 months",
        tuitionFee: "195,000"
      },
      masters: ["MFE", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 726,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 324
      },
      workExperience: {
        required: true,
        averageYears: 5.1,
        minYears: 2
      },
      englishTest: {
        toefl: 90,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 554,
      internationalStudents: "37%",
      femaleStudents: "45%",
      averageAge: 28,
      classSize: 277
    },
    outcomes: {
      employmentRate: "92%",
      averageSalary: {
        amount: 162000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "102%",
      topRecruiters: ["Google", "Amazon", "Apple", "McKinsey & Co", "BCG"]
    },
    highlights: [
      "Bay Area tech ecosystem",
      "Defining leadership principles",
      "Entrepreneurship focus",
      "Socially responsible business"
    ],
    specializations: [
      "Entrepreneurship",
      "Technology",
      "Finance",
      "Social Impact",
      "Healthcare"
    ],
    image: "/business-schools/haas.jpg",
    website: "https://haas.berkeley.edu",
    applicationDeadlines: {
      round1: "September 19",
      round2: "January 9",
      round3: "March 27"
    },
    scholarships: [
      "Merit fellowships",
      "Consortium fellowships",
      "Public service fellowships",
      "Diversity fellowships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 60,
      internationalism: "High"
    }
  },
  {
    id: 10,
    name: "Duke Fuqua School of Business",
    shortName: "Duke Fuqua",
    location: "Durham, NC",
    country: "USA",
    region: "North America",
    established: 1969,
    ranking: {
      global: 10,
      ftGlobal: 10,
      qsGlobal: 10,
      usNews: 10
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "70,000",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "17 months",
        tuitionFee: "190,000"
      },
      masters: ["MQM", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 705,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 318
      },
      workExperience: {
        required: true,
        averageYears: 5.2,
        minYears: 2
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 860,
      internationalStudents: "34%",
      femaleStudents: "40%",
      averageAge: 28,
      classSize: 430
    },
    outcomes: {
      employmentRate: "94%",
      averageSalary: {
        amount: 148000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "104%",
      topRecruiters: ["McKinsey & Co", "BCG", "Bain", "Amazon", "Deloitte"]
    },
    highlights: [
      "Team Fuqua culture",
      "Healthcare management strength",
      "Global network",
      "Leadership focus"
    ],
    specializations: [
      "Healthcare Management",
      "Finance",
      "Marketing",
      "Strategy",
      "Nonprofit Management"
    ],
    image: "/business-schools/fuqua.jpg",
    website: "https://www.fuqua.duke.edu",
    applicationDeadlines: {
      round1: "September 14",
      round2: "January 6",
      round3: "March 20"
    },
    scholarships: [
      "Merit scholarships",
      "Forte fellowships",
      "Military scholarships",
      "International fellowships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 75,
      internationalism: "High"
    }
  },

  // European Business Schools
  {
    id: 11,
    name: "London Business School",
    shortName: "LBS",
    location: "London",
    country: "United Kingdom",
    region: "Europe",
    established: 1964,
    ranking: {
      global: 11,
      ftGlobal: 11,
      qsGlobal: 11
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "15-21 months",
        tuitionFee: "115,000",
        currency: "GBP"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "165,000"
      },
      masters: ["Masters in Finance", "Masters in Analytics", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 708,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 318
      },
      workExperience: {
        required: true,
        averageYears: 6.0,
        minYears: 4
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 500,
      internationalStudents: "95%",
      femaleStudents: "38%",
      averageAge: 29,
      classSize: 500
    },
    outcomes: {
      employmentRate: "92%",
      averageSalary: {
        amount: 140000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "103%",
      topRecruiters: ["McKinsey & Co", "BCG", "Bain", "Goldman Sachs", "Google"]
    },
    highlights: [
      "London financial hub access",
      "Highly international student body",
      "Flexible 15-21 month program",
      "Strong finance network"
    ],
    specializations: [
      "Finance",
      "Consulting",
      "Private Equity",
      "Technology",
      "Entrepreneurship"
    ],
    image: "/business-schools/lbs.jpg",
    website: "https://www.london.edu",
    applicationDeadlines: {
      round1: "September 12",
      round2: "January 8",
      round3: "March 19"
    },
    scholarships: [
      "Dean's scholarships",
      "Forté fellowships",
      "Regional scholarships",
      "Corporate sponsorships"
    ],
    campusLife: {
      housing: false,
      studentClubs: 70,
      internationalism: "Very High"
    }
  },
  {
    id: 12,
    name: "INSEAD",
    shortName: "INSEAD",
    location: "Fontainebleau/Singapore/Abu Dhabi",
    country: "France",
    region: "Europe",
    established: 1957,
    ranking: {
      global: 12,
      ftGlobal: 12,
      qsGlobal: 12
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "10 months",
        tuitionFee: "98,000",
        currency: "EUR"
      },
      emba: {
        available: true,
        duration: "14-17 months",
        tuitionFee: "190,000"
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
        accepted: true,
        averageScore: 324
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
      studentBody: 1100,
      internationalStudents: "95%",
      femaleStudents: "38%",
      averageAge: 29,
      classSize: 550
    },
    outcomes: {
      employmentRate: "93%",
      averageSalary: {
        amount: 165000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "95%",
      topRecruiters: ["McKinsey & Co", "BCG", "Bain", "Amazon", "Google"]
    },
    highlights: [
      "Most international MBA program",
      "Three campus locations",
      "10-month intensive program",
      "Strong in consulting placement"
    ],
    specializations: [
      "Strategy",
      "Consulting",
      "Entrepreneurship",
      "Finance",
      "Technology"
    ],
    image: "/business-schools/insead.jpg",
    website: "https://www.insead.edu",
    applicationDeadlines: {
      round1: "August 27",
      round2: "October 29",
      round3: "January 28"
    },
    scholarships: [
      "Merit scholarships",
      "Need-based aid",
      "Diversity scholarships",
      "Regional scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 80,
      internationalism: "Very High"
    }
  },
  {
    id: 13,
    name: "IESE Business School",
    shortName: "IESE",
    location: "Barcelona/Madrid",
    country: "Spain",
    region: "Europe",
    established: 1958,
    ranking: {
      global: 13,
      ftGlobal: 13,
      qsGlobal: 13
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "19 months",
        tuitionFee: "95,000",
        currency: "EUR"
      },
      emba: {
        available: true,
        duration: "18 months",
        tuitionFee: "165,000"
      },
      masters: ["Master in Finance", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 686,
        minScore: 550
      },
      gre: {
        accepted: true,
        averageScore: 319
      },
      workExperience: {
        required: true,
        averageYears: 5.0,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 320,
      internationalStudents: "90%",
      femaleStudents: "33%",
      averageAge: 28,
      classSize: 320
    },
    outcomes: {
      employmentRate: "90%",
      averageSalary: {
        amount: 125000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "98%",
      topRecruiters: ["McKinsey & Co", "BCG", "Bain", "Accenture", "Amazon"]
    },
    highlights: [
      "Case method teaching",
      "Strong ethics focus",
      "Global network",
      "Family business specialization"
    ],
    specializations: [
      "General Management",
      "Strategy",
      "Finance",
      "Family Business",
      "Entrepreneurship"
    ],
    image: "/business-schools/iese.jpg",
    website: "https://www.iese.edu",
    applicationDeadlines: {
      round1: "September 26",
      round2: "December 3",
      round3: "February 25"
    },
    scholarships: [
      "Merit scholarships",
      "Diversity scholarships",
      "Regional awards",
      "Corporate sponsorships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 60,
      internationalism: "Very High"
    }
  },
  {
    id: 14,
    name: "HEC Paris",
    shortName: "HEC Paris",
    location: "Paris",
    country: "France",
    region: "Europe",
    established: 1881,
    ranking: {
      global: 14,
      ftGlobal: 14,
      qsGlobal: 14
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "16 months",
        tuitionFee: "88,000",
        currency: "EUR"
      },
      emba: {
        available: true,
        duration: "18 months",
        tuitionFee: "155,000"
      },
      masters: ["Master in Finance", "Master in Management", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 690,
        minScore: 550
      },
      gre: {
        accepted: true,
        averageScore: 320
      },
      workExperience: {
        required: true,
        averageYears: 5.2,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 280,
      internationalStudents: "92%",
      femaleStudents: "36%",
      averageAge: 29,
      classSize: 280
    },
    outcomes: {
      employmentRate: "92%",
      averageSalary: {
        amount: 128000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "85%",
      topRecruiters: ["McKinsey & Co", "BCG", "Bain", "L'Oréal", "LVMH"]
    },
    highlights: [
      "Paris location advantage",
      "Strong luxury brand connections",
      "Entrepreneurship excellence",
      "European business network"
    ],
    specializations: [
      "Strategy & Management",
      "Finance",
      "Marketing",
      "Entrepreneurship",
      "Luxury Management"
    ],
    image: "/business-schools/hec-paris.jpg",
    website: "https://www.hec.edu",
    applicationDeadlines: {
      round1: "October 1",
      round2: "January 5",
      round3: "April 15"
    },
    scholarships: [
      "HEC Excellence scholarships",
      "Diversity scholarships",
      "Need-based aid",
      "Corporate partnerships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 70,
      internationalism: "Very High"
    }
  },
  {
    id: 15,
    name: "Oxford Saïd Business School",
    shortName: "Oxford Saïd",
    location: "Oxford",
    country: "United Kingdom",
    region: "Europe",
    established: 1996,
    ranking: {
      global: 15,
      ftGlobal: 15,
      qsGlobal: 15
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "12 months",
        tuitionFee: "72,000",
        currency: "GBP"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "95,000"
      },
      masters: ["MSc in Financial Economics", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 690,
        minScore: 550
      },
      gre: {
        accepted: true,
        averageScore: 316
      },
      workExperience: {
        required: true,
        averageYears: 6.5,
        minYears: 3
      },
      englishTest: {
        toefl: 110,
        ielts: 7.5
      }
    },
    statistics: {
      studentBody: 330,
      internationalStudents: "95%",
      femaleStudents: "40%",
      averageAge: 29,
      classSize: 330
    },
    outcomes: {
      employmentRate: "92%",
      averageSalary: {
        amount: 152000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "114%",
      topRecruiters: ["McKinsey & Co", "BCG", "Bain", "Amazon", "Google"]
    },
    highlights: [
      "Oxford University prestige",
      "One-year intensive program",
      "Social impact focus",
      "Historic institution"
    ],
    specializations: [
      "Strategy",
      "Social Impact",
      "Finance",
      "Entrepreneurship",
      "Technology"
    ],
    image: "/business-schools/oxford-said.jpg",
    website: "https://www.sbs.ox.ac.uk",
    applicationDeadlines: {
      round1: "September 7",
      round2: "November 2",
      round3: "January 11"
    },
    scholarships: [
      "Skoll scholarships",
      "Oxford scholarships",
      "Regional awards",
      "Diversity scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 50,
      internationalism: "Very High"
    }
  },

  // Asian Business Schools
  {
    id: 16,
    name: "National University of Singapore Business School",
    shortName: "NUS Business School",
    location: "Singapore",
    country: "Singapore",
    region: "Asia",
    established: 1965,
    ranking: {
      global: 16,
      regional: 1,
      ftGlobal: 16,
      qsGlobal: 16
    },
    accreditation: ["AACSB", "EQUIS"],
    programs: {
      mba: {
        available: true,
        duration: "17 months",
        tuitionFee: "65,000",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "17 months",
        tuitionFee: "168,000"
      },
      masters: ["Master of Finance", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 650,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 314
      },
      workExperience: {
        required: true,
        averageYears: 5.8,
        minYears: 2
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 200,
      internationalStudents: "80%",
      femaleStudents: "35%",
      averageAge: 30,
      classSize: 100
    },
    outcomes: {
      employmentRate: "95%",
      averageSalary: {
        amount: 120000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "75%",
      topRecruiters: ["McKinsey & Co", "BCG", "Bain", "Google", "Amazon"]
    },
    highlights: [
      "Gateway to Asia",
      "Strong Asia-Pacific network",
      "Diverse international cohort",
      "Singapore business hub"
    ],
    specializations: [
      "Finance",
      "Strategy",
      "Entrepreneurship",
      "Technology",
      "Consulting"
    ],
    image: "/business-schools/nus.jpg",
    website: "https://biz.nus.edu.sg",
    applicationDeadlines: {
      round1: "August 31",
      round2: "October 15",
      round3: "January 31"
    },
    scholarships: [
      "Merit scholarships",
      "ASEAN scholarships",
      "Need-based aid",
      "Corporate sponsorships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 40,
      internationalism: "Very High"
    }
  },
  {
    id: 17,
    name: "Hong Kong University of Science and Technology",
    shortName: "HKUST",
    location: "Hong Kong",
    country: "Hong Kong",
    region: "Asia",
    established: 1991,
    ranking: {
      global: 17,
      regional: 2,
      ftGlobal: 17,
      qsGlobal: 17
    },
    accreditation: ["AACSB", "EQUIS"],
    programs: {
      mba: {
        available: true,
        duration: "12 months",
        tuitionFee: "42,900",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "14 months",
        tuitionFee: "71,000"
      },
      masters: ["Master in Finance", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 650,
        minScore: 550
      },
      gre: {
        accepted: true,
        averageScore: 314
      },
      workExperience: {
        required: true,
        averageYears: 6.0,
        minYears: 2
      },
      englishTest: {
        toefl: 80,
        ielts: 6.5
      }
    },
    statistics: {
      studentBody: 140,
      internationalStudents: "70%",
      femaleStudents: "40%",
      averageAge: 29,
      classSize: 70
    },
    outcomes: {
      employmentRate: "92%",
      averageSalary: {
        amount: 110000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "80%",
      topRecruiters: ["JPMorgan Chase", "Goldman Sachs", "Deloitte", "McKinsey & Co", "Google"]
    },
    highlights: [
      "Hong Kong financial center",
      "Strong finance focus",
      "China market access",
      "International outlook"
    ],
    specializations: [
      "Finance",
      "Investment Management",
      "Consulting",
      "Technology",
      "Entrepreneurship"
    ],
    image: "/business-schools/hkust.jpg",
    website: "https://www.bm.ust.hk",
    applicationDeadlines: {
      round1: "November 15",
      round2: "January 15",
      round3: "March 31"
    },
    scholarships: [
      "Merit scholarships",
      "Diversity scholarships",
      "Regional awards",
      "Need-based aid"
    ],
    campusLife: {
      housing: true,
      studentClubs: 30,
      internationalism: "Very High"
    }
  },

  // Continue with more global schools...
  {
    id: 18,
    name: "Johnson Graduate School of Management, Cornell",
    shortName: "Cornell Johnson",
    location: "Ithaca, NY",
    country: "USA",
    region: "North America",
    established: 1946,
    ranking: {
      global: 18,
      ftGlobal: 18,
      qsGlobal: 18,
      usNews: 15
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "72,750",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "198,000"
      },
      masters: ["MPS", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 700,
        minScore: 550
      },
      gre: {
        accepted: true,
        averageScore: 315
      },
      workExperience: {
        required: true,
        averageYears: 5.1,
        minYears: 0
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 554,
      internationalStudents: "40%",
      femaleStudents: "39%",
      averageAge: 28,
      classSize: 277
    },
    outcomes: {
      employmentRate: "93%",
      averageSalary: {
        amount: 148000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "85%",
      topRecruiters: ["Amazon", "Microsoft", "Deloitte", "McKinsey & Co", "BCG"]
    },
    highlights: [
      "Ivy League prestige",
      "Strong tech and finance programs",
      "Immersive learning experiences",
      "Collaborative culture"
    ],
    specializations: [
      "Technology",
      "Finance",
      "Consulting",
      "Marketing",
      "Operations"
    ],
    image: "/business-schools/cornell-johnson.jpg",
    website: "https://www.johnson.cornell.edu",
    applicationDeadlines: {
      round1: "October 1",
      round2: "January 6",
      round3: "March 15"
    },
    scholarships: [
      "Merit fellowships",
      "Park fellowships",
      "Diversity scholarships",
      "Military fellowships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 65,
      internationalism: "High"
    }
  },
  {
    id: 19,
    name: "Ross School of Business, University of Michigan",
    shortName: "Michigan Ross",
    location: "Ann Arbor, MI",
    country: "USA",
    region: "North America",
    established: 1924,
    ranking: {
      global: 19,
      ftGlobal: 19,
      qsGlobal: 19,
      usNews: 12
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "71,048",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "185,000"
      },
      masters: ["MAcc", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 708,
        minScore: 550
      },
      gre: {
        accepted: true,
        averageScore: 315
      },
      workExperience: {
        required: true,
        averageYears: 5.1,
        minYears: 0
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 822,
      internationalStudents: "32%",
      femaleStudents: "42%",
      averageAge: 28,
      classSize: 411
    },
    outcomes: {
      employmentRate: "94%",
      averageSalary: {
        amount: 150000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "100%",
      topRecruiters: ["McKinsey & Co", "BCG", "Amazon", "Microsoft", "Deloitte"]
    },
    highlights: [
      "Action-based learning",
      "Strong alumni network",
      "Multidisciplinary approach",
      "Global opportunities"
    ],
    specializations: [
      "Strategy",
      "Finance",
      "Operations",
      "Marketing",
      "Technology"
    ],
    image: "/business-schools/michigan-ross.jpg",
    website: "https://michiganross.umich.edu",
    applicationDeadlines: {
      round1: "September 26",
      round2: "January 2",
      round3: "March 20"
    },
    scholarships: [
      "Merit scholarships",
      "Consortium fellowships",
      "Veterans scholarships",
      "International fellowships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 70,
      internationalism: "High"
    }
  },
  {
    id: 20,
    name: "Anderson School of Management, UCLA",
    shortName: "UCLA Anderson",
    location: "Los Angeles, CA",
    country: "USA",
    region: "North America",
    established: 1935,
    ranking: {
      global: 20,
      ftGlobal: 20,
      qsGlobal: 20,
      usNews: 16
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "65,049",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "22 months",
        tuitionFee: "195,000"
      },
      masters: ["FEMBA", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 719,
        minScore: 550
      },
      gre: {
        accepted: true,
        averageScore: 317
      },
      workExperience: {
        required: true,
        averageYears: 5.3,
        minYears: 0
      },
      englishTest: {
        toefl: 87,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 734,
      internationalStudents: "30%",
      femaleStudents: "37%",
      averageAge: 28,
      classSize: 367
    },
    outcomes: {
      employmentRate: "91%",
      averageSalary: {
        amount: 156000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "80%",
      topRecruiters: ["Amazon", "Google", "Apple", "McKinsey & Co", "Deloitte"]
    },
    highlights: [
      "Los Angeles location",
      "Entertainment industry connections",
      "Tech proximity",
      "Entrepreneurship focus"
    ],
    specializations: [
      "Technology",
      "Entertainment",
      "Finance",
      "Marketing",
      "Entrepreneurship"
    ],
    image: "/business-schools/ucla-anderson.jpg",
    website: "https://www.anderson.ucla.edu",
    applicationDeadlines: {
      round1: "October 3",
      round2: "January 3",
      round3: "April 17"
    },
    scholarships: [
      "Merit fellowships",
      "Consortium fellowships",
      "Military fellowships",
      "International fellowships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 80,
      internationalism: "High"
    }
  },

  // Top Indian Business Schools
  {
    id: 101,
    name: "Indian Institute of Management Ahmedabad",
    shortName: "IIM-A",
    location: "Ahmedabad",
    country: "India",
    region: "Asia",
    established: 1961,
    ranking: {
      global: 25,
      regional: 1,
      qsGlobal: 45
    },
    accreditation: ["AACSB", "EQUIS"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "25,00,000",
        currency: "INR"
      },
      emba: {
        available: true,
        duration: "1 year",
        tuitionFee: "30,00,000"
      },
      masters: ["PGP", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: 650
      },
      gre: {
        accepted: false
      },
      workExperience: {
        required: false,
        averageYears: 0,
        minYears: 0
      },
      englishTest: {
        toefl: 0,
        ielts: 0
      }
    },
    statistics: {
      studentBody: 395,
      internationalStudents: "5%",
      femaleStudents: "35%",
      averageAge: 22,
      classSize: 395
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: {
        amount: 3279000,
        currency: "INR",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "300%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Microsoft"]
    },
    highlights: [
      "Top-ranked MBA program in India",
      "Strong alumni network",
      "World-class faculty",
      "Excellent placement record"
    ],
    specializations: [
      "General Management",
      "Finance",
      "Marketing",
      "Operations",
      "Strategy",
      "Technology"
    ],
    image: "/business-schools/iim-ahmedabad.jpg",
    website: "https://www.iima.ac.in",
    applicationDeadlines: {
      round1: "CAT Exam",
      round2: "WAT & PI"
    },
    scholarships: [
      "Merit-based scholarships",
      "Need-based financial aid",
      "Industry-sponsored scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 50,
      internationalism: "Medium"
    }
  },
  {
    id: 102,
    name: "Indian Institute of Management Bangalore",
    shortName: "IIM-B",
    location: "Bangalore",
    country: "India",
    region: "Asia",
    established: 1973,
    ranking: {
      global: 28,
      regional: 2,
      qsGlobal: 50
    },
    accreditation: ["AACSB", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "24,50,000",
        currency: "INR"
      },
      emba: {
        available: true,
        duration: "1 year",
        tuitionFee: "28,00,000"
      },
      masters: ["PGPBA", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: 640
      },
      gre: {
        accepted: false
      },
      workExperience: {
        required: false,
        averageYears: 0,
        minYears: 0
      },
      englishTest: {
        toefl: 0,
        ielts: 0
      }
    },
    statistics: {
      studentBody: 406,
      internationalStudents: "8%",
      femaleStudents: "38%",
      averageAge: 22,
      classSize: 406
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: {
        amount: 3436000,
        currency: "INR",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "290%",
      topRecruiters: ["Amazon", "Microsoft", "Google", "Flipkart", "Deloitte"]
    },
    highlights: [
      "Strong in business analytics",
      "Tech industry connections",
      "Innovation hub",
      "Excellent faculty"
    ],
    specializations: [
      "Business Analytics",
      "Finance",
      "Marketing",
      "Technology Management",
      "Consulting",
      "Entrepreneurship"
    ],
    image: "/business-schools/iim-bangalore.jpg",
    website: "https://www.iimb.ac.in",
    applicationDeadlines: {
      round1: "CAT Exam",
      round2: "WAT & PI"
    },
    scholarships: [
      "Merit scholarships",
      "Need-based aid",
      "Diversity scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 60,
      internationalism: "Medium"
    }
  },
  {
    id: 103,
    name: "Faculty of Management Studies, Delhi University",
    shortName: "FMS Delhi",
    location: "New Delhi",
    country: "India",
    region: "Asia",
    established: 1954,
    ranking: {
      global: 45,
      regional: 3,
      qsGlobal: 75
    },
    accreditation: ["AICTE", "NAAC A+"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "1,92,000",
        currency: "INR"
      },
      emba: {
        available: false,
        duration: "N/A",
        tuitionFee: "N/A"
      },
      masters: ["MBA", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: 600
      },
      gre: {
        accepted: false
      },
      workExperience: {
        required: false,
        averageYears: 0,
        minYears: 0
      },
      englishTest: {
        toefl: 0,
        ielts: 0
      }
    },
    statistics: {
      studentBody: 220,
      internationalStudents: "2%",
      femaleStudents: "40%",
      averageAge: 22,
      classSize: 220
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: {
        amount: 3240000,
        currency: "INR",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "400%",
      topRecruiters: ["Goldman Sachs", "McKinsey", "BCG", "Amazon", "Google"]
    },
    highlights: [
      "Best ROI in India",
      "Low fees with high placement",
      "Strong Delhi location",
      "Excellent faculty"
    ],
    specializations: [
      "Finance",
      "Marketing",
      "Operations",
      "HR",
      "Strategy",
      "International Business"
    ],
    image: "/business-schools/fms-delhi.jpg",
    website: "https://www.fms.edu",
    applicationDeadlines: {
      round1: "CAT Exam",
      round2: "WAT & PI"
    },
    scholarships: [
      "Merit scholarships",
      "Need-based aid",
      "Government scholarships"
    ],
    campusLife: {
      housing: false,
      studentClubs: 25,
      internationalism: "Low"
    }
  },
  {
    id: 104,
    name: "Indian Institute of Management Calcutta",
    shortName: "IIM-C",
    location: "Calcutta",
    country: "India",
    region: "Asia",
    established: 1961,
    ranking: {
      global: 30,
      regional: 4,
      qsGlobal: 55
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "27,00,000",
        currency: "INR"
      },
      emba: {
        available: true,
        duration: "1 year",
        tuitionFee: "25,00,000"
      },
      masters: ["PGP", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: 630
      },
      gre: {
        accepted: false
      },
      workExperience: {
        required: false,
        averageYears: 0,
        minYears: 0
      },
      englishTest: {
        toefl: 0,
        ielts: 0
      }
    },
    statistics: {
      studentBody: 460,
      internationalStudents: "6%",
      femaleStudents: "33%",
      averageAge: 22,
      classSize: 460
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: {
        amount: 3100000,
        currency: "INR",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "280%",
      topRecruiters: ["Deloitte", "PwC", "KPMG", "EY", "Accenture"]
    },
    highlights: [
      "Strong finance and consulting focus",
      "Research excellence",
      "Industry partnerships",
      "Alumni network"
    ],
    specializations: [
      "Finance",
      "Marketing",
      "Operations",
      "Economics",
      "Strategy",
      "HR"
    ],
    image: "/business-schools/iim-calcutta.jpg",
    website: "https://www.iimcal.ac.in",
    applicationDeadlines: {
      round1: "CAT Exam",
      round2: "WAT & PI"
    },
    scholarships: [
      "Merit scholarships",
      "Need-based aid",
      "Alumni scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 55,
      internationalism: "Medium"
    }
  },
  {
    id: 105,
    name: "XLRI - Xavier School of Management",
    shortName: "XLRI",
    location: "Jamshedpur",
    country: "India",
    region: "Asia",
    established: 1949,
    ranking: {
      global: 50,
      regional: 5,
      qsGlobal: 80
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "25,00,000",
        currency: "INR"
      },
      emba: {
        available: true,
        duration: "1 year",
        tuitionFee: "18,50,000"
      },
      masters: ["PGDM", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: 620
      },
      gre: {
        accepted: false
      },
      workExperience: {
        required: false,
        averageYears: 0,
        minYears: 0
      },
      englishTest: {
        toefl: 0,
        ielts: 0
      }
    },
    statistics: {
      studentBody: 360,
      internationalStudents: "3%",
      femaleStudents: "45%",
      averageAge: 22,
      classSize: 180
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: {
        amount: 2850000,
        currency: "INR",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "260%",
      topRecruiters: ["TCS", "Infosys", "Wipro", "HCL", "Cognizant"]
    },
    highlights: [
      "Oldest business school in India",
      "Strong HR program",
      "Ethical leadership focus",
      "Jesuit values"
    ],
    specializations: [
      "Human Resources",
      "Business Management",
      "Finance",
      "Marketing",
      "Operations"
    ],
    image: "/business-schools/xlri.jpg",
    website: "https://www.xlri.ac.in",
    applicationDeadlines: {
      round1: "XAT Exam",
      round2: "GD & PI"
    },
    scholarships: [
      "Merit scholarships",
      "Need-based aid",
      "Christian minority scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 40,
      internationalism: "Low"
    }
  },
  {
    id: 106,
    name: "Indian School of Business",
    shortName: "ISB",
    location: "Hyderabad/Mohali",
    country: "India",
    region: "Asia",
    established: 2001,
    ranking: {
      global: 35,
      regional: 6,
      qsGlobal: 65
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "1 year",
        tuitionFee: "36,30,000",
        currency: "INR"
      },
      emba: {
        available: true,
        duration: "1 year",
        tuitionFee: "28,50,000"
      },
      masters: ["PGP", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 709,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 318
      },
      workExperience: {
        required: true,
        averageYears: 5.2,
        minYears: 2
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 920,
      internationalStudents: "15%",
      femaleStudents: "32%",
      averageAge: 27,
      classSize: 460
    },
    outcomes: {
      employmentRate: "98%",
      averageSalary: {
        amount: 3420000,
        currency: "INR",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "85%",
      topRecruiters: ["Amazon", "Microsoft", "Google", "BCG", "McKinsey"]
    },
    highlights: [
      "One-year MBA program",
      "International faculty",
      "Strong industry connections",
      "Global outlook"
    ],
    specializations: [
      "Strategy",
      "Finance",
      "Marketing",
      "Operations",
      "Analytics",
      "Technology"
    ],
    image: "/business-schools/isb.jpg",
    website: "https://www.isb.edu",
    applicationDeadlines: {
      round1: "September 15",
      round2: "November 15",
      round3: "January 15"
    },
    scholarships: [
      "Merit scholarships",
      "Need-based aid",
      "Diversity scholarships",
      "International fellowships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 70,
      internationalism: "High"
    }
  },
  {
    id: 107,
    name: "Management Development Institute",
    shortName: "MDI Gurgaon",
    location: "Gurgaon",
    country: "India",
    region: "Asia",
    established: 1973,
    ranking: {
      global: 60,
      regional: 7,
      qsGlobal: 95
    },
    accreditation: ["AACSB", "SAQS"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "21,40,000",
        currency: "INR"
      },
      emba: {
        available: true,
        duration: "2 years",
        tuitionFee: "15,50,000"
      },
      masters: ["PGDM", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: 600
      },
      gre: {
        accepted: false
      },
      workExperience: {
        required: false,
        averageYears: 0,
        minYears: 0
      },
      englishTest: {
        toefl: 0,
        ielts: 0
      }
    },
    statistics: {
      studentBody: 360,
      internationalStudents: "5%",
      femaleStudents: "35%",
      averageAge: 22,
      classSize: 180
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: {
        amount: 2650000,
        currency: "INR",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "240%",
      topRecruiters: ["Accenture", "Deloitte", "KPMG", "EY", "Capgemini"]
    },
    highlights: [
      "Strong industry interface",
      "HR excellence",
      "Research focus",
      "Alumni network"
    ],
    specializations: [
      "Human Resource Management",
      "Marketing",
      "Finance",
      "Operations",
      "International Business"
    ],
    image: "/business-schools/mdi.jpg",
    website: "https://www.mdi.ac.in",
    applicationDeadlines: {
      round1: "CAT Exam",
      round2: "GD & PI"
    },
    scholarships: [
      "Merit scholarships",
      "Need-based aid",
      "Alumni scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 45,
      internationalism: "Medium"
    }
  },
  {
    id: 108,
    name: "S.P. Jain Institute of Management and Research",
    shortName: "SPJIMR",
    location: "Mumbai",
    country: "India",
    region: "Asia",
    established: 1981,
    ranking: {
      global: 70,
      regional: 8,
      qsGlobal: 100
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "20,50,000",
        currency: "INR"
      },
      emba: {
        available: true,
        duration: "2 years",
        tuitionFee: "18,50,000"
      },
      masters: ["PGDM", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: 590
      },
      gre: {
        accepted: false
      },
      workExperience: {
        required: false,
        averageYears: 0,
        minYears: 0
      },
      englishTest: {
        toefl: 0,
        ielts: 0
      }
    },
    statistics: {
      studentBody: 240,
      internationalStudents: "4%",
      femaleStudents: "40%",
      averageAge: 22,
      classSize: 120
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: {
        amount: 2780000,
        currency: "INR",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "250%",
      topRecruiters: ["Reliance", "Tata Group", "Aditya Birla", "Mahindra", "L&T"]
    },
    highlights: [
      "Industry-academia interface",
      "Social responsibility focus",
      "Innovation in education",
      "Mumbai location advantage"
    ],
    specializations: [
      "Marketing",
      "Finance",
      "Operations",
      "Information Management",
      "Family Business"
    ],
    image: "/business-schools/spjimr.jpg",
    website: "https://www.spjimr.org",
    applicationDeadlines: {
      round1: "CAT Exam",
      round2: "GD & PI"
    },
    scholarships: [
      "Merit scholarships",
      "Need-based aid",
      "Family business scholarships"
    ],
    campusLife: {
      housing: false,
      studentClubs: 35,
      internationalism: "Medium"
    }
  },
  {
    id: 109,
    name: "IIM Lucknow",
    shortName: "IIM-L",
    location: "Lucknow",
    country: "India",
    region: "Asia",
    established: 1984,
    ranking: {
      global: 40,
      regional: 9,
      qsGlobal: 70
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "19,25,000",
        currency: "INR"
      },
      emba: {
        available: true,
        duration: "1 year",
        tuitionFee: "15,50,000"
      },
      masters: ["PGP", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: 610
      },
      gre: {
        accepted: false
      },
      workExperience: {
        required: false,
        averageYears: 0,
        minYears: 0
      },
      englishTest: {
        toefl: 0,
        ielts: 0
      }
    },
    statistics: {
      studentBody: 340,
      internationalStudents: "4%",
      femaleStudents: "37%",
      averageAge: 22,
      classSize: 340
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: {
        amount: 2890000,
        currency: "INR",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "270%",
      topRecruiters: ["Amazon", "Flipkart", "Paytm", "Ola", "Uber"]
    },
    highlights: [
      "Strong general management focus",
      "Rural management specialty",
      "Industry partnerships",
      "Alumni network"
    ],
    specializations: [
      "General Management",
      "Marketing",
      "Finance",
      "Operations",
      "Rural Management",
      "Agribusiness"
    ],
    image: "/business-schools/iim-lucknow.jpg",
    website: "https://www.iiml.ac.in",
    applicationDeadlines: {
      round1: "CAT Exam",
      round2: "WAT & PI"
    },
    scholarships: [
      "Merit scholarships",
      "Need-based aid",
      "Rural background scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 50,
      internationalism: "Medium"
    }
  },
  {
    id: 110,
    name: "IIM Kozhikode",
    shortName: "IIM-K",
    location: "Kozhikode",
    country: "India",
    region: "Asia",
    established: 1996,
    ranking: {
      global: 50,
      regional: 10,
      qsGlobal: 85
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "20,50,000",
        currency: "INR"
      },
      emba: {
        available: true,
        duration: "1 year",
        tuitionFee: "12,50,000"
      },
      masters: ["PGP", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: 600
      },
      gre: {
        accepted: false
      },
      workExperience: {
        required: false,
        averageYears: 0,
        minYears: 0
      },
      englishTest: {
        toefl: 0,
        ielts: 0
      }
    },
    statistics: {
      studentBody: 360,
      internationalStudents: "3%",
      femaleStudents: "40%",
      averageAge: 22,
      classSize: 180
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: {
        amount: 2450000,
        currency: "INR",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "230%",
      topRecruiters: ["Infosys", "TCS", "Wipro", "Cognizant", "HCL"]
    },
    highlights: [
      "Beautiful campus",
      "Strong regional presence",
      "Innovation focus",
      "Industry connect"
    ],
    specializations: [
      "Finance",
      "Marketing",
      "Operations",
      "Information Systems",
      "Strategy"
    ],
    image: "/business-schools/iim-kozhikode.jpg",
    website: "https://iimk.ac.in",
    applicationDeadlines: {
      round1: "CAT Exam",
      round2: "WAT & PI"
    },
    scholarships: [
      "Merit scholarships",
      "Need-based aid",
      "Regional scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 45,
      internationalism: "Medium"
    }
  },
  // Additional Top Global Schools
  {
    id: 21,
    name: "Darden School of Business, University of Virginia",
    shortName: "Virginia Darden",
    location: "Charlottesville, VA",
    country: "USA",
    region: "North America",
    established: 1955,
    ranking: {
      global: 21,
      ftGlobal: 21,
      qsGlobal: 21,
      usNews: 13
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "69,500",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "18 months",
        tuitionFee: "195,000"
      },
      masters: ["PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 706,
        minScore: 550
      },
      gre: {
        accepted: true,
        averageScore: 315
      },
      workExperience: {
        required: true,
        averageYears: 4.9,
        minYears: 0
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 658,
      internationalStudents: "31%",
      femaleStudents: "38%",
      averageAge: 27,
      classSize: 329
    },
    outcomes: {
      employmentRate: "94%",
      averageSalary: {
        amount: 155000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "92%",
      topRecruiters: ["McKinsey & Co", "BCG", "Deloitte", "Amazon", "Capital One"]
    },
    highlights: [
      "Case method teaching",
      "Strong general management focus",
      "First-year learning teams",
      "Honor system"
    ],
    specializations: [
      "General Management",
      "Consulting",
      "Finance",
      "Marketing",
      "Operations"
    ],
    image: "/business-schools/darden.jpg",
    website: "https://www.darden.virginia.edu",
    applicationDeadlines: {
      round1: "September 5",
      round2: "November 7",
      round3: "January 16"
    },
    scholarships: [
      "Merit scholarships",
      "Jefferson Fellowships",
      "Military scholarships",
      "International fellowships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 60,
      internationalism: "High"
    }
  },
  {
    id: 22,
    name: "Cambridge Judge Business School",
    shortName: "Cambridge Judge",
    location: "Cambridge",
    country: "United Kingdom",
    region: "Europe",
    established: 1990,
    ranking: {
      global: 22,
      ftGlobal: 22,
      qsGlobal: 22
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "12 months",
        tuitionFee: "64,000",
        currency: "GBP"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "89,000"
      },
      masters: ["Master in Finance", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 692,
        minScore: 550
      },
      gre: {
        accepted: true,
        averageScore: 315
      },
      workExperience: {
        required: true,
        averageYears: 6.2,
        minYears: 3
      },
      englishTest: {
        toefl: 110,
        ielts: 7.5
      }
    },
    statistics: {
      studentBody: 200,
      internationalStudents: "94%",
      femaleStudents: "35%",
      averageAge: 29,
      classSize: 200
    },
    outcomes: {
      employmentRate: "90%",
      averageSalary: {
        amount: 145000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "108%",
      topRecruiters: ["McKinsey & Co", "BCG", "Amazon", "Google", "Deloitte"]
    },
    highlights: [
      "Cambridge University prestige",
      "One-year intensive program",
      "Entrepreneurship focus",
      "Historic university setting"
    ],
    specializations: [
      "Entrepreneurship",
      "Strategy",
      "Finance",
      "Technology",
      "Social Innovation"
    ],
    image: "/business-schools/cambridge-judge.jpg",
    website: "https://www.jbs.cam.ac.uk",
    applicationDeadlines: {
      round1: "September 6",
      round2: "November 1",
      round3: "January 10"
    },
    scholarships: [
      "Cambridge scholarships",
      "Regional awards",
      "Diversity scholarships",
      "Corporate sponsorships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 45,
      internationalism: "Very High"
    }
  },
  {
    id: 23,
    name: "IMD Business School",
    shortName: "IMD",
    location: "Lausanne",
    country: "Switzerland",
    region: "Europe",
    established: 1990,
    ranking: {
      global: 23,
      ftGlobal: 23,
      qsGlobal: 23
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "11 months",
        tuitionFee: "84,000",
        currency: "CHF"
      },
      emba: {
        available: true,
        duration: "18 months",
        tuitionFee: "178,000"
      },
      masters: ["PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 680,
        minScore: 550
      },
      gre: {
        accepted: true,
        averageScore: 312
      },
      workExperience: {
        required: true,
        averageYears: 6.5,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 90,
      internationalStudents: "98%",
      femaleStudents: "30%",
      averageAge: 31,
      classSize: 90
    },
    outcomes: {
      employmentRate: "89%",
      averageSalary: {
        amount: 138000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "89%",
      topRecruiters: ["McKinsey & Co", "BCG", "Bain", "Nestlé", "Novartis"]
    },
    highlights: [
      "Small, elite cohort",
      "Real-world consulting projects",
      "Swiss Alps location",
      "Global perspective"
    ],
    specializations: [
      "General Management",
      "Strategy",
      "Leadership",
      "Innovation",
      "Family Business"
    ],
    image: "/business-schools/imd.jpg",
    website: "https://www.imd.org",
    applicationDeadlines: {
      round1: "September 19",
      round2: "November 21",
      round3: "February 13"
    },
    scholarships: [
      "Merit scholarships",
      "Diversity scholarships",
      "Regional awards",
      "Corporate sponsorships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 25,
      internationalism: "Very High"
    }
  },
  {
    id: 24,
    name: "IE Business School",
    shortName: "IE Madrid",
    location: "Madrid",
    country: "Spain",
    region: "Europe",
    established: 1973,
    ranking: {
      global: 24,
      ftGlobal: 24,
      qsGlobal: 24
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "11 months",
        tuitionFee: "79,800",
        currency: "EUR"
      },
      emba: {
        available: true,
        duration: "15 months",
        tuitionFee: "142,000"
      },
      masters: ["Master in Finance", "Master in Management", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 670,
        minScore: 550
      },
      gre: {
        accepted: true,
        averageScore: 315
      },
      workExperience: {
        required: true,
        averageYears: 5.3,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 400,
      internationalStudents: "89%",
      femaleStudents: "40%",
      averageAge: 28,
      classSize: 200
    },
    outcomes: {
      employmentRate: "92%",
      averageSalary: {
        amount: 115000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "87%",
      topRecruiters: ["McKinsey & Co", "BCG", "Amazon", "Google", "Accenture"]
    },
    highlights: [
      "Innovative teaching methods",
      "Entrepreneurship focus",
      "Madrid and global campuses",
      "Tech-forward approach"
    ],
    specializations: [
      "Entrepreneurship",
      "Digital Innovation",
      "Finance",
      "Marketing",
      "Strategy"
    ],
    image: "/business-schools/ie-business-school.jpg",
    website: "https://www.ie.edu",
    applicationDeadlines: {
      round1: "October 31",
      round2: "January 31",
      round3: "April 30"
    },
    scholarships: [
      "Excellence scholarships",
      "Diversity scholarships",
      "Regional awards",
      "Women in business scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 55,
      internationalism: "Very High"
    }
  },

  // Additional Indian Business Schools (continuing from ID 111)
  {
    id: 111,
    name: "IIM Indore",
    shortName: "IIM-I",
    location: "Indore",
    country: "India",
    region: "Asia",
    established: 1996,
    ranking: {
      global: 55,
      regional: 11,
      qsGlobal: 90
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "16,50,000",
        currency: "INR"
      },
      emba: {
        available: true,
        duration: "1 year",
        tuitionFee: "12,00,000"
      },
      masters: ["PGP", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: 590
      },
      gre: {
        accepted: false
      },
      workExperience: {
        required: false,
        averageYears: 0,
        minYears: 0
      },
      englishTest: {
        toefl: 0,
        ielts: 0
      }
    },
    statistics: {
      studentBody: 450,
      internationalStudents: "3%",
      femaleStudents: "42%",
      averageAge: 22,
      classSize: 225
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: {
        amount: 2375000,
        currency: "INR",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "220%",
      topRecruiters: ["Hindustan Unilever", "P&G", "ITC", "Asian Paints", "Godrej"]
    },
    highlights: [
      "Strong FMCG placements",
      "Beautiful campus",
      "5-year integrated program",
      "Research focus"
    ],
    specializations: [
      "Marketing",
      "Finance",
      "Operations",
      "HR",
      "Strategy"
    ],
    image: "/business-schools/iim-indore.jpg",
    website: "https://www.iimidr.ac.in",
    applicationDeadlines: {
      round1: "CAT Exam",
      round2: "WAT & PI"
    },
    scholarships: [
      "Merit scholarships",
      "Need-based aid",
      "Government scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 50,
      internationalism: "Low"
    }
  },
  {
    id: 112,
    name: "NMIMS - Narsee Monjee Institute of Management Studies",
    shortName: "NMIMS",
    location: "Mumbai",
    country: "India",
    region: "Asia",
    established: 1981,
    ranking: {
      global: 75,
      regional: 12,
      qsGlobal: 110
    },
    accreditation: ["NAAC A++"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "19,53,000",
        currency: "INR"
      },
      emba: {
        available: true,
        duration: "2 years",
        tuitionFee: "15,00,000"
      },
      masters: ["PGDM", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: 580
      },
      gre: {
        accepted: false
      },
      workExperience: {
        required: false,
        averageYears: 0,
        minYears: 0
      },
      englishTest: {
        toefl: 0,
        ielts: 0
      }
    },
    statistics: {
      studentBody: 540,
      internationalStudents: "3%",
      femaleStudents: "43%",
      averageAge: 22,
      classSize: 270
    },
    outcomes: {
      employmentRate: "95%",
      averageSalary: {
        amount: 2050000,
        currency: "INR",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "180%",
      topRecruiters: ["ICICI Bank", "HDFC Bank", "Axis Bank", "Kotak Mahindra", "Yes Bank"]
    },
    highlights: [
      "Strong Mumbai network",
      "Finance specialization",
      "Industry connections",
      "Modern infrastructure"
    ],
    specializations: [
      "Finance",
      "Marketing",
      "Operations",
      "HR",
      "Technology"
    ],
    image: "/business-schools/nmims.jpg",
    website: "https://www.nmims.edu",
    applicationDeadlines: {
      round1: "NMAT Exam",
      round2: "GD & PI"
    },
    scholarships: [
      "Merit scholarships",
      "Need-based aid",
      "Alumni scholarships"
    ],
    campusLife: {
      housing: false,
      studentClubs: 40,
      internationalism: "Low"
    }
  },
  {
    id: 113,
    name: "Symbiosis Centre for Management and Human Resource Development",
    shortName: "SCMHRD",
    location: "Pune",
    country: "India",
    region: "Asia",
    established: 1993,
    ranking: {
      global: 80,
      regional: 13,
      qsGlobal: 120
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "20,50,000",
        currency: "INR"
      },
      emba: {
        available: false,
        duration: "N/A",
        tuitionFee: "N/A"
      },
      masters: ["PGDM", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: 570
      },
      gre: {
        accepted: false
      },
      workExperience: {
        required: false,
        averageYears: 0,
        minYears: 0
      },
      englishTest: {
        toefl: 0,
        ielts: 0
      }
    },
    statistics: {
      studentBody: 240,
      internationalStudents: "2%",
      femaleStudents: "48%",
      averageAge: 22,
      classSize: 120
    },
    outcomes: {
      employmentRate: "98%",
      averageSalary: {
        amount: 1850000,
        currency: "INR",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "170%",
      topRecruiters: ["Tech Mahindra", "Wipro", "Cognizant", "Accenture", "TCS"]
    },
    highlights: [
      "Strong HR program",
      "Pune IT hub location",
      "International exchange programs",
      "Industry partnerships"
    ],
    specializations: [
      "Human Resources",
      "Marketing",
      "Finance",
      "Operations",
      "International Business"
    ],
    image: "/business-schools/scmhrd.jpg",
    website: "https://www.scmhrd.edu",
    applicationDeadlines: {
      round1: "SNAP Exam",
      round2: "GD & PI"
    },
    scholarships: [
      "Merit scholarships",
      "Need-based aid",
      "Women scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 35,
      internationalism: "Low"
    }
  },
  {
    id: 114,
    name: "Indian Institute of Foreign Trade",
    shortName: "IIFT",
    location: "New Delhi/Kolkata",
    country: "India",
    region: "Asia",
    established: 1963,
    ranking: {
      global: 85,
      regional: 14,
      qsGlobal: 130
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "15,85,000",
        currency: "INR"
      },
      emba: {
        available: false,
        duration: "N/A",
        tuitionFee: "N/A"
      },
      masters: ["MBA (IB)", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: 560
      },
      gre: {
        accepted: false
      },
      workExperience: {
        required: false,
        averageYears: 0,
        minYears: 0
      },
      englishTest: {
        toefl: 0,
        ielts: 0
      }
    },
    statistics: {
      studentBody: 420,
      internationalStudents: "5%",
      femaleStudents: "35%",
      averageAge: 22,
      classSize: 210
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: {
        amount: 2050000,
        currency: "INR",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "190%",
      topRecruiters: ["Deloitte", "KPMG", "EY", "PwC", "Accenture"]
    },
    highlights: [
      "International business focus",
      "Government institution",
      "Strong export-import connections",
      "Policy research"
    ],
    specializations: [
      "International Business",
      "Export-Import Management",
      "International Finance",
      "Global Marketing",
      "Trade Policy"
    ],
    image: "/business-schools/iift.jpg",
    website: "https://www.iift.ac.in",
    applicationDeadlines: {
      round1: "IIFT Exam",
      round2: "GD & PI"
    },
    scholarships: [
      "Merit scholarships",
      "Government scholarships",
      "International exchange grants"
    ],
    campusLife: {
      housing: true,
      studentClubs: 30,
      internationalism: "Medium"
    }
  },
  {
    id: 115,
    name: "NITIE - National Institute of Industrial Engineering",
    shortName: "NITIE",
    location: "Mumbai",
    country: "India",
    region: "Asia",
    established: 1963,
    ranking: {
      global: 90,
      regional: 15,
      qsGlobal: 140
    },
    accreditation: ["AICTE"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "13,50,000",
        currency: "INR"
      },
      emba: {
        available: false,
        duration: "N/A",
        tuitionFee: "N/A"
      },
      masters: ["PGDM", "PhD"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: 550
      },
      gre: {
        accepted: false
      },
      workExperience: {
        required: false,
        averageYears: 0,
        minYears: 0
      },
      englishTest: {
        toefl: 0,
        ielts: 0
      }
    },
    statistics: {
      studentBody: 220,
      internationalStudents: "4%",
      femaleStudents: "25%",
      averageAge: 23,
      classSize: 110
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: {
        amount: 2150000,
        currency: "INR",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "200%",
      topRecruiters: ["Mahindra", "Tata Motors", "Bajaj Auto", "Hero MotoCorp", "Maruti Suzuki"]
    },
    highlights: [
      "Operations and supply chain focus",
      "Strong manufacturing connections",
      "Mumbai location advantage",
      "Technical background"
    ],
    specializations: [
      "Operations Management",
      "Supply Chain Management",
      "Industrial Engineering",
      "Systems Management",
      "Project Management"
    ],
    image: "/business-schools/nitie.jpg",
    website: "https://www.nitie.ac.in",
    applicationDeadlines: {
      round1: "CAT/GATE Exam",
      round2: "GD & PI"
    },
    scholarships: [
      "Merit scholarships",
      "Government scholarships",
      "Industry sponsorships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 25,
      internationalism: "Low"
    }
  },

  // Additional Top US Schools
  {
    id: 40,
    name: "University of Chicago Booth School of Business",
    shortName: "Chicago Booth",
    location: "Chicago, IL",
    country: "USA",
    region: "North America",
    established: 1898,
    ranking: { global: 4, ftGlobal: 6, qsGlobal: 4, usNews: 4 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "2 years", tuitionFee: "75,891", currency: "USD" },
      emba: { available: true, duration: "22 months", tuitionFee: "215,000" },
      masters: ["MBA", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 731, minScore: 600 },
      gre: { accepted: true, averageScore: 325 },
      workExperience: { required: true, averageYears: 5.2, minYears: 2 },
      englishTest: { toefl: 104, ielts: 7.0 }
    },
    statistics: {
      studentBody: 1180,
      internationalStudents: "38%",
      femaleStudents: "42%",
      averageAge: 28,
      classSize: 590
    },
    outcomes: {
      employmentRate: "95%",
      averageSalary: { amount: 170000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "85%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Amazon"]
    },
    highlights: ["Flexible curriculum", "Strong finance program", "Nobel Prize winning faculty", "Global campuses"],
    specializations: ["Finance", "Consulting", "Marketing", "Operations", "Strategy", "Entrepreneurship"],
    image: "/business-schools/chicago-booth.jpg",
    website: "https://www.chicagobooth.edu",
    applicationDeadlines: { round1: "September 26", round2: "January 5", round3: "April 11" },
    scholarships: ["Merit scholarships", "Need-based aid", "Forte Fellowship"],
    campusLife: { housing: true, studentClubs: 100, internationalism: "Very High" }
  },

  {
    id: 41,
    name: "Kellogg School of Management",
    shortName: "Kellogg",
    location: "Evanston, IL",
    country: "USA",
    region: "North America",
    established: 1908,
    ranking: { global: 5, ftGlobal: 4, qsGlobal: 5, usNews: 5 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "2 years", tuitionFee: "76,956", currency: "USD" },
      emba: { available: true, duration: "24 months", tuitionFee: "220,000" },
      masters: ["MBA", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 732, minScore: 600 },
      gre: { accepted: true, averageScore: 327 },
      workExperience: { required: true, averageYears: 5.1, minYears: 2 },
      englishTest: { toefl: 109, ielts: 7.5 }
    },
    statistics: {
      studentBody: 1326,
      internationalStudents: "35%",
      femaleStudents: "46%",
      averageAge: 28,
      classSize: 663
    },
    outcomes: {
      employmentRate: "94%",
      averageSalary: { amount: 172000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "88%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Amazon", "Microsoft"]
    },
    highlights: ["Collaborative culture", "Marketing excellence", "Team-based learning", "Global network"],
    specializations: ["Marketing", "Finance", "Operations", "Strategy", "Technology", "Social Impact"],
    image: "/business-schools/kellogg.jpg",
    website: "https://www.kellogg.northwestern.edu",
    applicationDeadlines: { round1: "September 13", round2: "January 3", round3: "April 10" },
    scholarships: ["Merit scholarships", "Need-based aid", "Diversity scholarships"],
    campusLife: { housing: true, studentClubs: 120, internationalism: "Very High" }
  },

  // More Indian Schools
  {
    id: 200,
    name: "Indian Institute of Management Lucknow",
    shortName: "IIM-L",
    location: "Lucknow",
    country: "India",
    region: "Asia",
    established: 1984,
    ranking: { global: 65, regional: 8, qsGlobal: 120 },
    accreditation: ["AICTE"],
    programs: {
      mba: { available: true, duration: "2 years", tuitionFee: "20,00,000", currency: "INR" },
      emba: { available: true, duration: "1 year", tuitionFee: "22,00,000" },
      masters: ["PGP", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 600 },
      gre: { accepted: false },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 0, ielts: 0 }
    },
    statistics: {
      studentBody: 440,
      internationalStudents: "3%",
      femaleStudents: "35%",
      averageAge: 22,
      classSize: 440
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: { amount: 3103000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "300%",
      topRecruiters: ["Accenture", "Deloitte", "Amazon", "Flipkart", "TCS"]
    },
    highlights: ["Strong industry connect", "Research excellence", "Innovation focus", "Alumni network"],
    specializations: ["Finance", "Marketing", "Operations", "Strategy", "IT", "Consulting"],
    image: "/business-schools/iim-lucknow.jpg",
    website: "https://www.iiml.ac.in",
    applicationDeadlines: { round1: "CAT Exam", round2: "WAT & PI" },
    scholarships: ["Merit scholarships", "Need-based aid", "Government schemes"],
    campusLife: { housing: true, studentClubs: 50, internationalism: "Medium" }
  },

  // Chicago Booth
  {
    id: 41,
    name: "University of Chicago Booth School of Business",
    shortName: "Chicago Booth",
    location: "Chicago, IL",
    country: "USA",
    region: "North America",
    established: 1898,
    ranking: { global: 4, ftGlobal: 6, qsGlobal: 4, usNews: 4 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "2 years", tuitionFee: "75,891", currency: "USD" },
      emba: { available: true, duration: "22 months", tuitionFee: "215,000", currency: "USD" },
      masters: ["MBA", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 731, minScore: 600 },
      gre: { accepted: true, averageScore: 325 },
      workExperience: { required: true, averageYears: 5.2, minYears: 2 },
      englishTest: { toefl: 104, ielts: 7.0 }
    },
    statistics: {
      studentBody: 1180,
      internationalStudents: "38%",
      femaleStudents: "42%",
      averageAge: 28,
      classSize: 590
    },
    outcomes: {
      employmentRate: "95%",
      averageSalary: { amount: 170000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "85%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Amazon"]
    },
    highlights: ["Flexible curriculum", "Strong finance program", "Nobel Prize winning faculty", "Global campuses"],
    specializations: ["Finance", "Consulting", "Marketing", "Operations", "Strategy", "Entrepreneurship"],
    image: "/business-schools/chicago-booth.jpg",
    website: "https://www.chicagobooth.edu",
    applicationDeadlines: { round1: "September 26", round2: "January 5", round3: "April 11" },
    scholarships: ["Merit scholarships", "Need-based aid", "Forte Fellowship"],
    campusLife: { housing: true, studentClubs: 100, internationalism: "Very High" }
  },

  // IIM Calcutta
  {
    id: 151,
    name: "Indian Institute of Management Calcutta",
    shortName: "IIM-C",
    location: "Kolkata",
    country: "India",
    region: "Asia",
    established: 1961,
    ranking: { global: 27, regional: 3, qsGlobal: 55 },
    accreditation: ["AACSB", "AMBA"],
    programs: {
      mba: { available: true, duration: "2 years", tuitionFee: "23,00,000", currency: "INR" },
      emba: { available: true, duration: "1 year", tuitionFee: "25,00,000", currency: "INR" },
      masters: ["PGDM", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 630 },
      gre: { accepted: false },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 0, ielts: 0 }
    },
    statistics: {
      studentBody: 462,
      internationalStudents: "6%",
      femaleStudents: "32%",
      averageAge: 22,
      classSize: 462
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: { amount: 3436000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "320%",
      topRecruiters: ["McKinsey", "BCG", "Amazon", "Microsoft", "Deloitte"]
    },
    highlights: ["Heritage institution", "Strong alumni network", "Academic excellence", "Cultural diversity"],
    specializations: ["Finance", "Marketing", "Operations", "IT Systems", "Strategy", "Consulting"],
    image: "/business-schools/iim-calcutta.jpg",
    website: "https://www.iimcal.ac.in",
    applicationDeadlines: { round1: "CAT Exam", round2: "WAT & PI" },
    scholarships: ["Merit scholarships", "Need-based aid", "Minority scholarships"],
    campusLife: { housing: true, studentClubs: 45, internationalism: "Medium" }
  },

  // XLRI
  {
    id: 152,
    name: "Xavier Labour Relations Institute",
    shortName: "XLRI",
    location: "Jamshedpur",
    country: "India",
    region: "Asia",
    established: 1949,
    ranking: { global: 35, regional: 5, qsGlobal: 85 },
    accreditation: ["AICTE", "AACSB"],
    programs: {
      mba: { available: true, duration: "2 years", tuitionFee: "25,80,000", currency: "INR" },
      emba: { available: false, duration: "N/A", tuitionFee: "N/A", currency: "INR" },
      masters: ["BM", "HRM", "GMP"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 620 },
      gre: { accepted: false },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 0, ielts: 0 }
    },
    statistics: {
      studentBody: 350,
      internationalStudents: "4%",
      femaleStudents: "45%",
      averageAge: 22,
      classSize: 350
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: { amount: 3073000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "280%",
      topRecruiters: ["Aditya Birla Group", "Tata Group", "HUL", "P&G", "Accenture"]
    },
    highlights: ["Strong HR focus", "Jesuit values", "Industry connections", "Social responsibility"],
    specializations: ["Human Resource Management", "Business Management", "Finance", "Marketing", "Operations"],
    image: "/business-schools/xlri.jpg",
    website: "https://www.xlri.ac.in",
    applicationDeadlines: { round1: "XAT Exam", round2: "GD & PI" },
    scholarships: ["Merit scholarships", "Need-based aid", "Alumni scholarships"],
    campusLife: { housing: true, studentClubs: 40, internationalism: "Medium" }
  },

  // HEC Paris
  {
    id: 42,
    name: "HEC Paris",
    shortName: "HEC Paris",
    location: "Jouy-en-Josas",
    country: "France",
    region: "Europe",
    established: 1881,
    ranking: { global: 8, ftGlobal: 7, qsGlobal: 8, regional: 3 },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: { available: true, duration: "16 months", tuitionFee: "89,000", currency: "EUR" },
      emba: { available: true, duration: "18 months", tuitionFee: "185,000", currency: "EUR" },
      masters: ["MiM", "MiF", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 690, minScore: 600 },
      gre: { accepted: true, averageScore: 318 },
      workExperience: { required: true, averageYears: 5.8, minYears: 3 },
      englishTest: { toefl: 100, ielts: 7.0 }
    },
    statistics: {
      studentBody: 280,
      internationalStudents: "93%",
      femaleStudents: "35%",
      averageAge: 29,
      classSize: 280
    },
    outcomes: {
      employmentRate: "95%",
      averageSalary: { amount: 125000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "85%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "L'Oréal", "LVMH"]
    },
    highlights: ["French excellence", "Luxury sector strength", "European focus", "Strong alumni network"],
    specializations: ["Strategy", "Finance", "Marketing", "Luxury Management", "Entrepreneurship"],
    image: "/business-schools/hec-paris.jpg",
    website: "https://www.hec.edu",
    applicationDeadlines: { round1: "October 6", round2: "January 12", round3: "March 30" },
    scholarships: ["HEC Foundation scholarships", "Need-based aid", "Diversity scholarships"],
    campusLife: { housing: true, studentClubs: 35, internationalism: "Extremely High" }
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