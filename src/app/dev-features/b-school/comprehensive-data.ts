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
  },

  // India's Top Business Schools - Part 1 (IIMs)
  
  // IIM Ahmedabad
  {
    id: 48,
    name: "Indian Institute of Management Ahmedabad",
    shortName: "IIM-A",
    location: "Ahmedabad",
    country: "India",
    region: "Asia",
    established: 1961,
    ranking: { global: 25, regional: 2, qsGlobal: 45 },
    accreditation: ["AACSB", "AMBA"],
    programs: {
      mba: { available: true, duration: "2 years", tuitionFee: "25,00,000", currency: "INR" },
      emba: { available: true, duration: "1 year", tuitionFee: "28,00,000", currency: "INR" },
      masters: ["PGDM", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 680 },
      gre: { accepted: false },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 0, ielts: 0 }
    },
    statistics: {
      studentBody: 395,
      internationalStudents: "5%",
      femaleStudents: "35%",
      averageAge: 23,
      classSize: 395
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: { amount: 3500000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "300%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Amazon", "Google"]
    },
    highlights: ["India's premier B-school", "Louis Kahn designed campus", "Strong alumni network", "Case study method"],
    specializations: ["General Management", "Finance", "Marketing", "Operations", "Strategy"],
    image: "/business-schools/iim-ahmedabad.jpg",
    website: "https://www.iima.ac.in",
    applicationDeadlines: { round1: "November 15", round2: "January 15", round3: "March 15" },
    scholarships: ["Merit scholarships", "Need-based aid", "Diversity scholarships"],
    campusLife: { housing: true, studentClubs: 50, internationalism: "Medium" }
  },

  // IIM Bangalore
  {
    id: 49,
    name: "Indian Institute of Management Bangalore",
    shortName: "IIM-B",
    location: "Bangalore",
    country: "India",
    region: "Asia",
    established: 1973,
    ranking: { global: 28, regional: 3, qsGlobal: 48 },
    accreditation: ["AACSB", "AMBA"],
    programs: {
      mba: { available: true, duration: "2 years", tuitionFee: "24,00,000", currency: "INR" },
      emba: { available: true, duration: "1 year", tuitionFee: "26,00,000", currency: "INR" },
      masters: ["PGDM", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 670 },
      gre: { accepted: false },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 0, ielts: 0 }
    },
    statistics: {
      studentBody: 420,
      internationalStudents: "8%",
      femaleStudents: "38%",
      averageAge: 23,
      classSize: 420
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: { amount: 3200000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "280%",
      topRecruiters: ["Microsoft", "Amazon", "Flipkart", "Consulting firms", "Investment banks"]
    },
    highlights: ["IT hub location", "Strong tech placements", "Research focus", "International programs"],
    specializations: ["Technology Management", "Finance", "Marketing", "Operations", "Analytics"],
    image: "/business-schools/iim-bangalore.jpg",
    website: "https://www.iimb.ac.in",
    applicationDeadlines: { round1: "November 15", round2: "January 15", round3: "March 15" },
    scholarships: ["Merit scholarships", "Need-based aid", "Women diversity scholarships"],
    campusLife: { housing: true, studentClubs: 45, internationalism: "High" }
  },

  // IIM Delhi
  {
    id: 50,
    name: "Indian Institute of Management Delhi",
    shortName: "IIM-D",
    location: "New Delhi",
    country: "India",
    region: "Asia",
    established: 1969,
    ranking: { global: 30, regional: 4, qsGlobal: 52 },
    accreditation: ["AACSB", "AMBA"],
    programs: {
      mba: { available: true, duration: "2 years", tuitionFee: "22,00,000", currency: "INR" },
      emba: { available: true, duration: "1 year", tuitionFee: "24,00,000", currency: "INR" },
      masters: ["PGDM", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 650 },
      gre: { accepted: false },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 0, ielts: 0 }
    },
    statistics: {
      studentBody: 440,
      internationalStudents: "7%",
      femaleStudents: "36%",
      averageAge: 23,
      classSize: 440
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: { amount: 3100000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "270%",
      topRecruiters: ["Deloitte", "EY", "KPMG", "Accenture", "TCS"]
    },
    highlights: ["Capital city advantage", "Government relations", "Public policy focus", "Strong consulting placements"],
    specializations: ["Public Policy", "Finance", "Marketing", "Strategy", "Operations"],
    image: "/business-schools/iim-delhi.jpg",
    website: "https://www.iimdelhi.ac.in",
    applicationDeadlines: { round1: "November 15", round2: "January 15", round3: "March 15" },
    scholarships: ["Merit scholarships", "Need-based aid", "SC/ST scholarships"],
    campusLife: { housing: true, studentClubs: 40, internationalism: "Medium" }
  },

  // IIM Kozhikode
  {
    id: 51,
    name: "Indian Institute of Management Kozhikode",
    shortName: "IIM-K",
    location: "Kozhikode",
    country: "India",
    region: "Asia",
    established: 1996,
    ranking: { global: 55, regional: 8, qsGlobal: 85 },
    accreditation: ["AACSB", "AMBA"],
    programs: {
      mba: { available: true, duration: "2 years", tuitionFee: "20,00,000", currency: "INR" },
      emba: { available: true, duration: "1 year", tuitionFee: "22,00,000", currency: "INR" },
      masters: ["PGDM", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 640 },
      gre: { accepted: false },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 0, ielts: 0 }
    },
    statistics: {
      studentBody: 450,
      internationalStudents: "6%",
      femaleStudents: "34%",
      averageAge: 23,
      classSize: 450
    },
    outcomes: {
      employmentRate: "98%",
      averageSalary: { amount: 2800000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "250%",
      topRecruiters: ["TCS", "Infosys", "Wipro", "Accenture", "IBM"]
    },
    highlights: ["Coastal campus", "Strong IT placements", "Sustainable practices", "International exchange programs"],
    specializations: ["IT Management", "Finance", "Marketing", "Operations", "HR"],
    image: "/business-schools/iim-kozhikode.jpg",
    website: "https://www.iimk.ac.in",
    applicationDeadlines: { round1: "November 15", round2: "January 15", round3: "March 15" },
    scholarships: ["Merit scholarships", "Need-based aid", "Diversity scholarships"],
    campusLife: { housing: true, studentClubs: 35, internationalism: "Medium" }
  },

  // Indian School of Business
  {
    id: 52,
    name: "Indian School of Business",
    shortName: "ISB",
    location: "Hyderabad",
    country: "India",
    region: "Asia",
    established: 2001,
    ranking: { global: 35, regional: 5, qsGlobal: 62 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "1 year", tuitionFee: "36,30,000", currency: "INR" },
      emba: { available: true, duration: "1 year", tuitionFee: "28,50,000", currency: "INR" },
      masters: ["PGP", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 710, minScore: 600 },
      gre: { accepted: true, averageScore: 320 },
      workExperience: { required: true, averageYears: 5.5, minYears: 2 },
      englishTest: { toefl: 100, ielts: 7.0 }
    },
    statistics: {
      studentBody: 920,
      internationalStudents: "15%",
      femaleStudents: "32%",
      averageAge: 28,
      classSize: 920
    },
    outcomes: {
      employmentRate: "95%",
      averageSalary: { amount: 3400000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "85%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Google", "Microsoft", "Amazon"]
    },
    highlights: ["US-style curriculum", "World-class faculty", "Global partnerships", "Startup ecosystem"],
    specializations: ["Consulting", "Finance", "Technology", "Marketing", "Strategy"],
    image: "/business-schools/isb-hyderabad.jpg",
    website: "https://www.isb.edu",
    applicationDeadlines: { round1: "September 19", round2: "November 14", round3: "January 16" },
    scholarships: ["Merit scholarships", "Need-based aid", "Diversity scholarships", "ISB Trust scholarships"],
    campusLife: { housing: true, studentClubs: 60, internationalism: "High" }
  },

  // XLRI Jamshedpur
  {
    id: 53,
    name: "Xavier Labour Relations Institute",
    shortName: "XLRI",
    location: "Jamshedpur",
    country: "India",
    region: "Asia",
    established: 1949,
    ranking: { global: 65, regional: 12, qsGlobal: 95 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "2 years", tuitionFee: "25,30,000", currency: "INR" },
      emba: { available: true, duration: "1 year", tuitionFee: "18,50,000", currency: "INR" },
      masters: ["PGDM", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 650 },
      gre: { accepted: false },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 0, ielts: 0 }
    },
    statistics: {
      studentBody: 350,
      internationalStudents: "4%",
      femaleStudents: "30%",
      averageAge: 23,
      classSize: 350
    },
    outcomes: {
      employmentRate: "98%",
      averageSalary: { amount: 2900000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "260%",
      topRecruiters: ["Aditya Birla", "Tata", "Godrej", "ITC", "HUL"]
    },
    highlights: ["HR specialization pioneer", "Jesuit values", "Strong alumni network", "Ethics focus"],
    specializations: ["Human Resources", "Finance", "Marketing", "Operations", "Rural Management"],
    image: "/business-schools/xlri-jamshedpur.jpg",
    website: "https://www.xlri.ac.in",
    applicationDeadlines: { round1: "November 30", round2: "January 31", final: "March 31" },
    scholarships: ["Merit scholarships", "Need-based aid", "Minority scholarships"],
    campusLife: { housing: true, studentClubs: 25, internationalism: "Low" }
  },

  // FMS Delhi
  {
    id: 54,
    name: "Faculty of Management Studies",
    shortName: "FMS Delhi",
    location: "New Delhi",
    country: "India",
    region: "Asia",
    established: 1954,
    ranking: { global: 70, regional: 15, qsGlobal: 100 },
    accreditation: ["UGC"],
    programs: {
      mba: { available: true, duration: "2 years", tuitionFee: "19,500", currency: "INR" },
      masters: ["MBA", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 680 },
      gre: { accepted: false },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 0, ielts: 0 }
    },
    statistics: {
      studentBody: 220,
      internationalStudents: "2%",
      femaleStudents: "25%",
      averageAge: 22,
      classSize: 220
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: { amount: 3200000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "400%",
      topRecruiters: ["Goldman Sachs", "McKinsey", "BCG", "Bain", "JP Morgan"]
    },
    highlights: ["Low fees", "High ROI", "Delhi University affiliation", "Finance strength"],
    specializations: ["Finance", "Marketing", "Operations", "Strategy", "International Business"],
    image: "/business-schools/fms-delhi.jpg",
    website: "https://www.fms.edu",
    applicationDeadlines: { round1: "December 31", final: "December 31" },
    scholarships: ["Merit scholarships", "SC/ST reservations", "EWS quotas"],
    campusLife: { housing: false, studentClubs: 15, internationalism: "Low" }
  },

  // JBIMS Mumbai
  {
    id: 55,
    name: "Jamnalal Bajaj Institute of Management Studies",
    shortName: "JBIMS",
    location: "Mumbai",
    country: "India",
    region: "Asia",
    established: 1965,
    ranking: { global: 75, regional: 18, qsGlobal: 105 },
    accreditation: ["UGC"],
    programs: {
      mba: { available: true, duration: "2 years", tuitionFee: "6,25,000", currency: "INR" },
      masters: ["MMS", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 670 },
      gre: { accepted: false },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 0, ielts: 0 }
    },
    statistics: {
      studentBody: 240,
      internationalStudents: "3%",
      femaleStudents: "28%",
      averageAge: 22,
      classSize: 240
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: { amount: 2800000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "350%",
      topRecruiters: ["HDFC", "Kotak", "Bajaj", "L&T", "Reliance"]
    },
    highlights: ["Mumbai location", "Finance focus", "Industry connections", "Value for money"],
    specializations: ["Finance", "Marketing", "HR", "Operations", "Systems"],
    image: "/business-schools/jbims-mumbai.jpg",
    website: "https://www.jbims.edu",
    applicationDeadlines: { round1: "January 31", final: "January 31" },
    scholarships: ["Merit scholarships", "State reservations", "Need-based aid"],
    campusLife: { housing: false, studentClubs: 20, internationalism: "Low" }
  },

  // Batch 1: More Indian B-Schools (IDs 56-65)
  
  // IIM Lucknow
  {
    id: 56,
    name: "Indian Institute of Management Lucknow",
    shortName: "IIM-L",
    location: "Lucknow",
    country: "India",
    region: "Asia",
    established: 1984,
    ranking: { global: 60, regional: 10, qsGlobal: 90 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "2 years", tuitionFee: "19,25,000", currency: "INR" },
      emba: { available: true, duration: "1 year", tuitionFee: "20,00,000", currency: "INR" },
      masters: ["PGDM", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 630 },
      gre: { accepted: false },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 0, ielts: 0 }
    },
    statistics: {
      studentBody: 460,
      internationalStudents: "5%",
      femaleStudents: "32%",
      averageAge: 23,
      classSize: 460
    },
    outcomes: {
      employmentRate: "97%",
      averageSalary: { amount: 2650000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "240%",
      topRecruiters: ["Wipro", "TCS", "Infosys", "Cognizant", "HCL"]
    },
    highlights: ["Established IIM", "Strong alumni network", "Industry connections", "Research focus"],
    specializations: ["IT Management", "Finance", "Marketing", "Operations", "Strategy"],
    image: "/business-schools/iim-lucknow.jpg",
    website: "https://www.iiml.ac.in",
    applicationDeadlines: { round1: "November 15", round2: "January 15", round3: "March 15" },
    scholarships: ["Merit scholarships", "Need-based aid", "Diversity scholarships"],
    campusLife: { housing: true, studentClubs: 30, internationalism: "Medium" }
  },

  // MDI Gurgaon
  {
    id: 57,
    name: "Management Development Institute",
    shortName: "MDI Gurgaon",
    location: "Gurgaon",
    country: "India",
    region: "Asia",
    established: 1973,
    ranking: { global: 80, regional: 20, qsGlobal: 110 },
    accreditation: ["UGC"],
    programs: {
      mba: { available: true, duration: "2 years", tuitionFee: "21,50,000", currency: "INR" },
      emba: { available: true, duration: "1 year", tuitionFee: "18,00,000", currency: "INR" },
      masters: ["PGDM", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 660 },
      gre: { accepted: false },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 0, ielts: 0 }
    },
    statistics: {
      studentBody: 420,
      internationalStudents: "6%",
      femaleStudents: "35%",
      averageAge: 23,
      classSize: 420
    },
    outcomes: {
      employmentRate: "98%",
      averageSalary: { amount: 2750000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "250%",
      topRecruiters: ["Amazon", "Microsoft", "Google", "Deloitte", "PwC"]
    },
    highlights: ["HR specialization", "Industry partnerships", "International programs", "Research excellence"],
    specializations: ["Human Resources", "Finance", "Marketing", "Operations", "International Management"],
    image: "/business-schools/mdi-gurgaon.jpg",
    website: "https://www.mdi.ac.in",
    applicationDeadlines: { round1: "December 15", round2: "February 15", final: "March 31" },
    scholarships: ["Merit scholarships", "Need-based aid", "Women diversity scholarships"],
    campusLife: { housing: true, studentClubs: 25, internationalism: "Medium" }
  },

  // SP Jain Mumbai
  {
    id: 58,
    name: "S.P. Jain Institute of Management and Research",
    shortName: "SPJIMR",
    location: "Mumbai",
    country: "India",
    region: "Asia",
    established: 1981,
    ranking: { global: 85, regional: 22, qsGlobal: 115 },
    accreditation: ["UGC"],
    programs: {
      mba: { available: true, duration: "2 years", tuitionFee: "19,50,000", currency: "INR" },
      emba: { available: true, duration: "1 year", tuitionFee: "16,50,000", currency: "INR" },
      masters: ["PGDM", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 650 },
      gre: { accepted: false },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 0, ielts: 0 }
    },
    statistics: {
      studentBody: 360,
      internationalStudents: "8%",
      femaleStudents: "38%",
      averageAge: 23,
      classSize: 360
    },
    outcomes: {
      employmentRate: "96%",
      averageSalary: { amount: 2600000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "230%",
      topRecruiters: ["Bajaj", "Mahindra", "Tata Motors", "Asian Paints", "Godrej"]
    },
    highlights: ["Family business focus", "Innovation labs", "Industry immersion", "Ethics emphasis"],
    specializations: ["Finance", "Marketing", "Operations", "Information Management", "Family Business"],
    image: "/business-schools/spjimr-mumbai.jpg",
    website: "https://www.spjimr.org",
    applicationDeadlines: { round1: "November 30", round2: "January 15", round3: "March 15" },
    scholarships: ["Merit scholarships", "Need-based aid", "Minority scholarships"],
    campusLife: { housing: false, studentClubs: 20, internationalism: "Medium" }
  },

  // NMIMS Mumbai
  {
    id: 59,
    name: "Narsee Monjee Institute of Management Studies",
    shortName: "NMIMS",
    location: "Mumbai",
    country: "India",
    region: "Asia",
    established: 1981,
    ranking: { global: 90, regional: 25, qsGlobal: 120 },
    accreditation: ["UGC"],
    programs: {
      mba: { available: true, duration: "2 years", tuitionFee: "21,90,000", currency: "INR" },
      emba: { available: true, duration: "2 years", tuitionFee: "19,50,000", currency: "INR" },
      masters: ["MBA", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 640 },
      gre: { accepted: false },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 0, ielts: 0 }
    },
    statistics: {
      studentBody: 600,
      internationalStudents: "4%",
      femaleStudents: "40%",
      averageAge: 22,
      classSize: 600
    },
    outcomes: {
      employmentRate: "95%",
      averageSalary: { amount: 2400000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "220%",
      topRecruiters: ["HDFC Bank", "ICICI", "Kotak", "Reliance", "Aditya Birla"]
    },
    highlights: ["Mumbai advantage", "Industry exposure", "Diverse programs", "Strong placements"],
    specializations: ["Finance", "Marketing", "HR", "Operations", "Analytics"],
    image: "/business-schools/nmims-mumbai.jpg",
    website: "https://www.nmims.edu",
    applicationDeadlines: { round1: "January 31", final: "January 31" },
    scholarships: ["Merit scholarships", "Need-based aid", "Sports scholarships"],
    campusLife: { housing: true, studentClubs: 35, internationalism: "Low" }
  },

  // Great Lakes Chennai
  {
    id: 60,
    name: "Great Lakes Institute of Management",
    shortName: "GLIM",
    location: "Chennai",
    country: "India",
    region: "Asia",
    established: 2004,
    ranking: { global: 95, regional: 28, qsGlobal: 125 },
    accreditation: ["UGC"],
    programs: {
      mba: { available: true, duration: "1 year", tuitionFee: "22,50,000", currency: "INR" },
      emba: { available: true, duration: "1 year", tuitionFee: "18,75,000", currency: "INR" },
      masters: ["PGPM", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 680, minScore: 550 },
      gre: { accepted: true, averageScore: 315 },
      workExperience: { required: true, averageYears: 4, minYears: 2 },
      englishTest: { toefl: 85, ielts: 6.5 }
    },
    statistics: {
      studentBody: 280,
      internationalStudents: "12%",
      femaleStudents: "30%",
      averageAge: 27,
      classSize: 280
    },
    outcomes: {
      employmentRate: "94%",
      averageSalary: { amount: 2350000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "75%",
      topRecruiters: ["Capgemini", "Cognizant", "Infosys", "TCS", "Tech Mahindra"]
    },
    highlights: ["One-year MBA", "International faculty", "US curriculum", "Tech focus"],
    specializations: ["Technology", "Finance", "Marketing", "Operations", "Consulting"],
    image: "/business-schools/great-lakes-chennai.jpg",
    website: "https://www.greatlakes.edu.in",
    applicationDeadlines: { round1: "October 31", round2: "December 15", round3: "February 28" },
    scholarships: ["Merit scholarships", "Need-based aid", "Diversity scholarships"],
    campusLife: { housing: true, studentClubs: 25, internationalism: "High" }
  },

  // IMT Ghaziabad
  {
    id: 61,
    name: "Institute for Management Technology",
    shortName: "IMT Ghaziabad",
    location: "Ghaziabad",
    country: "India",
    region: "Asia",
    established: 1980,
    ranking: { global: 100, regional: 30, qsGlobal: 130 },
    accreditation: ["UGC"],
    programs: {
      mba: { available: true, duration: "2 years", tuitionFee: "19,53,000", currency: "INR" },
      emba: { available: true, duration: "2 years", tuitionFee: "15,75,000", currency: "INR" },
      masters: ["PGDM", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 620 },
      gre: { accepted: false },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 0, ielts: 0 }
    },
    statistics: {
      studentBody: 540,
      internationalStudents: "6%",
      femaleStudents: "35%",
      averageAge: 23,
      classSize: 540
    },
    outcomes: {
      employmentRate: "96%",
      averageSalary: { amount: 2300000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "210%",
      topRecruiters: ["EY", "KPMG", "PwC", "Deloitte", "Accenture"]
    },
    highlights: ["Marketing strength", "International collaborations", "Industry interface", "Research focus"],
    specializations: ["Marketing", "Finance", "HR", "Operations", "International Business"],
    image: "/business-schools/imt-ghaziabad.jpg",
    website: "https://www.imt.edu",
    applicationDeadlines: { round1: "November 30", round2: "January 31", round3: "March 31" },
    scholarships: ["Merit scholarships", "Need-based aid", "Academic excellence awards"],
    campusLife: { housing: true, studentClubs: 30, internationalism: "Medium" }
  },

  // IIFT Delhi
  {
    id: 62,
    name: "Indian Institute of Foreign Trade",
    shortName: "IIFT Delhi",
    location: "New Delhi",
    country: "India",
    region: "Asia",
    established: 1963,
    ranking: { global: 105, regional: 32, qsGlobal: 135 },
    accreditation: ["UGC"],
    programs: {
      mba: { available: true, duration: "2 years", tuitionFee: "10,40,000", currency: "INR" },
      masters: ["MBA (IB)", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 630 },
      gre: { accepted: false },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 0, ielts: 0 }
    },
    statistics: {
      studentBody: 420,
      internationalStudents: "8%",
      femaleStudents: "32%",
      averageAge: 23,
      classSize: 420
    },
    outcomes: {
      employmentRate: "98%",
      averageSalary: { amount: 2500000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "250%",
      topRecruiters: ["Mahindra", "Bajaj", "ITC", "Asian Paints", "Godrej"]
    },
    highlights: ["International trade focus", "Government institute", "Export-import expertise", "Global connections"],
    specializations: ["International Business", "Finance", "Marketing", "Operations", "Trade Policy"],
    image: "/business-schools/iift-delhi.jpg",
    website: "https://www.iift.edu",
    applicationDeadlines: { round1: "November 30", final: "November 30" },
    scholarships: ["Merit scholarships", "Government scholarships", "Need-based aid"],
    campusLife: { housing: true, studentClubs: 20, internationalism: "High" }
  },

  // SIBM Pune
  {
    id: 63,
    name: "Symbiosis Institute of Business Management",
    shortName: "SIBM Pune",
    location: "Pune",
    country: "India",
    region: "Asia",
    established: 1978,
    ranking: { global: 110, regional: 35, qsGlobal: 140 },
    accreditation: ["UGC"],
    programs: {
      mba: { available: true, duration: "2 years", tuitionFee: "24,80,000", currency: "INR" },
      emba: { available: true, duration: "2 years", tuitionFee: "18,50,000", currency: "INR" },
      masters: ["MBA", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 615 },
      gre: { accepted: false },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 0, ielts: 0 }
    },
    statistics: {
      studentBody: 360,
      internationalStudents: "10%",
      femaleStudents: "45%",
      averageAge: 22,
      classSize: 360
    },
    outcomes: {
      employmentRate: "94%",
      averageSalary: { amount: 2200000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "200%",
      topRecruiters: ["Wipro", "Infosys", "TCS", "Cognizant", "HCL"]
    },
    highlights: ["International exposure", "Innovation focus", "Industry partnerships", "Diverse programs"],
    specializations: ["Innovation", "Finance", "Marketing", "Operations", "Energy & Environment"],
    image: "/business-schools/sibm-pune.jpg",
    website: "https://www.sibmpune.edu.in",
    applicationDeadlines: { round1: "November 30", round2: "January 31", round3: "March 15" },
    scholarships: ["Merit scholarships", "Need-based aid", "International scholarships"],
    campusLife: { housing: true, studentClubs: 40, internationalism: "High" }
  },

  // NITIE Mumbai
  {
    id: 64,
    name: "National Institute of Industrial Engineering",
    shortName: "NITIE",
    location: "Mumbai",
    country: "India",
    region: "Asia",
    established: 1963,
    ranking: { global: 115, regional: 38, qsGlobal: 145 },
    accreditation: ["UGC"],
    programs: {
      mba: { available: true, duration: "2 years", tuitionFee: "13,44,500", currency: "INR" },
      masters: ["PGDIE", "PGDIM", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 600 },
      gre: { accepted: false },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 0, ielts: 0 }
    },
    statistics: {
      studentBody: 380,
      internationalStudents: "5%",
      femaleStudents: "25%",
      averageAge: 23,
      classSize: 380
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: { amount: 2550000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "280%",
      topRecruiters: ["L&T", "Mahindra", "Tata", "Bajaj", "Godrej"]
    },
    highlights: ["Operations excellence", "Industrial engineering focus", "Technical orientation", "Manufacturing strength"],
    specializations: ["Operations", "Supply Chain", "Industrial Engineering", "Systems", "Project Management"],
    image: "/business-schools/nitie-mumbai.jpg",
    website: "https://www.nitie.ac.in",
    applicationDeadlines: { round1: "February 28", final: "February 28" },
    scholarships: ["Merit scholarships", "Government scholarships", "SC/ST reservations"],
    campusLife: { housing: true, studentClubs: 25, internationalism: "Low" }
  },

  // MICA Ahmedabad
  {
    id: 65,
    name: "Mudra Institute of Communications Ahmedabad",
    shortName: "MICA",
    location: "Ahmedabad",
    country: "India",
    region: "Asia",
    established: 1991,
    ranking: { global: 120, regional: 40, qsGlobal: 150 },
    accreditation: ["UGC"],
    programs: {
      mba: { available: true, duration: "2 years", tuitionFee: "19,50,000", currency: "INR" },
      masters: ["PGDM-C", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 590 },
      gre: { accepted: false },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 0, ielts: 0 }
    },
    statistics: {
      studentBody: 210,
      internationalStudents: "3%",
      femaleStudents: "50%",
      averageAge: 22,
      classSize: 210
    },
    outcomes: {
      employmentRate: "96%",
      averageSalary: { amount: 2100000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "190%",
      topRecruiters: ["Ogilvy", "JWT", "McCann", "Leo Burnett", "Publicis"]
    },
    highlights: ["Communication specialization", "Creative focus", "Industry connections", "Unique positioning"],
    specializations: ["Strategic Marketing", "Brand Management", "Digital Marketing", "Communication", "Media"],
    image: "/business-schools/mica-ahmedabad.jpg",
    website: "https://www.mica.ac.in",
    applicationDeadlines: { round1: "December 31", round2: "February 28", final: "March 31" },
    scholarships: ["Merit scholarships", "Need-based aid", "Creative scholarships"],
    campusLife: { housing: true, studentClubs: 15, internationalism: "Low" }
  },

  // Batch 2: Mix of Indian & International Schools (IDs 66-75)

  // IIM Indore
  {
    id: 66,
    name: "Indian Institute of Management Indore",
    shortName: "IIM-I",
    location: "Indore",
    country: "India",
    region: "Asia",
    established: 1996,
    ranking: { global: 58, regional: 9, qsGlobal: 88 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "2 years", tuitionFee: "19,50,000", currency: "INR" },
      emba: { available: true, duration: "1 year", tuitionFee: "21,00,000", currency: "INR" },
      masters: ["PGDM", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 635 },
      gre: { accepted: false },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 0, ielts: 0 }
    },
    statistics: {
      studentBody: 480,
      internationalStudents: "5%",
      femaleStudents: "33%",
      averageAge: 23,
      classSize: 480
    },
    outcomes: {
      employmentRate: "97%",
      averageSalary: { amount: 2700000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "240%",
      topRecruiters: ["HDFC Bank", "ICICI", "SBI", "Bajaj", "Mahindra"]
    },
    highlights: ["5-year integrated program", "Strong research focus", "Industry partnerships", "Rural immersion"],
    specializations: ["Rural Management", "Finance", "Marketing", "Operations", "Strategy"],
    image: "/business-schools/iim-indore.jpg",
    website: "https://www.iimidr.ac.in",
    applicationDeadlines: { round1: "November 15", round2: "January 15", round3: "March 15" },
    scholarships: ["Merit scholarships", "Need-based aid", "Rural scholarships"],
    campusLife: { housing: true, studentClubs: 38, internationalism: "Low" }
  },

  // London Business School
  {
    id: 67,
    name: "London Business School",
    shortName: "LBS",
    location: "London",
    country: "United Kingdom",
    region: "Europe",
    established: 1964,
    ranking: { global: 6, regional: 1, qsGlobal: 8, ftGlobal: 4 },
    accreditation: ["AACSB", "AMBA", "EQUIS"],
    programs: {
      mba: { available: true, duration: "15-21 months", tuitionFee: "104,000", currency: "GBP" },
      emba: { available: true, duration: "20 months", tuitionFee: "166,000", currency: "GBP" },
      masters: ["MFA", "MiM", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 708, minScore: 600 },
      gre: { accepted: true, averageScore: 326 },
      workExperience: { required: true, averageYears: 6, minYears: 2 },
      englishTest: { toefl: 100, ielts: 7.0 }
    },
    statistics: {
      studentBody: 500,
      internationalStudents: "95%",
      femaleStudents: "40%",
      averageAge: 29,
      classSize: 500
    },
    outcomes: {
      employmentRate: "94%",
      averageSalary: { amount: 140000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "90%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Morgan Stanley"]
    },
    highlights: ["Global diversity", "Finance strength", "London location", "Flexible curriculum"],
    specializations: ["Finance", "Consulting", "Strategy", "Entrepreneurship", "Private Equity"],
    image: "/business-schools/london-business-school.jpg",
    website: "https://www.london.edu",
    applicationDeadlines: { round1: "September 5", round2: "November 7", round3: "January 9" },
    scholarships: ["Merit scholarships", "Need-based aid", "Diversity scholarships"],
    campusLife: { housing: false, studentClubs: 70, internationalism: "Extremely High" }
  },

  // INSEAD
  {
    id: 68,
    name: "INSEAD",
    shortName: "INSEAD",
    location: "Fontainebleau",
    country: "France",
    region: "Europe",
    established: 1957,
    ranking: { global: 7, regional: 2, qsGlobal: 9, ftGlobal: 3 },
    accreditation: ["AACSB", "AMBA", "EQUIS"],
    programs: {
      mba: { available: true, duration: "10 months", tuitionFee: "95,000", currency: "EUR" },
      emba: { available: true, duration: "14-17 months", tuitionFee: "190,000", currency: "EUR" },
      masters: ["MIM", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 709, minScore: 650 },
      gre: { accepted: true, averageScore: 327 },
      workExperience: { required: true, averageYears: 5.5, minYears: 2 },
      englishTest: { toefl: 105, ielts: 7.5 }
    },
    statistics: {
      studentBody: 500,
      internationalStudents: "98%",
      femaleStudents: "36%",
      averageAge: 29,
      classSize: 500
    },
    outcomes: {
      employmentRate: "95%",
      averageSalary: { amount: 150000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "85%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "L'Oreal", "LVMH"]
    },
    highlights: ["Multi-campus experience", "Global perspective", "Accelerated program", "Strong alumni network"],
    specializations: ["Strategy", "Entrepreneurship", "Finance", "Marketing", "Consulting"],
    image: "/business-schools/insead.jpg",
    website: "https://www.insead.edu",
    applicationDeadlines: { round1: "August 31", round2: "October 31", round3: "February 28" },
    scholarships: ["Need-based scholarships", "Diversity scholarships", "Country-specific scholarships"],
    campusLife: { housing: true, studentClubs: 50, internationalism: "Extremely High" }
  },

  // Oxford Said Business School
  {
    id: 69,
    name: "Saïd Business School, University of Oxford",
    shortName: "Oxford Said",
    location: "Oxford",
    country: "United Kingdom",
    region: "Europe",
    established: 1996,
    ranking: { global: 11, regional: 3, qsGlobal: 13, ftGlobal: 9 },
    accreditation: ["AACSB", "AMBA", "EQUIS"],
    programs: {
      mba: { available: true, duration: "12 months", tuitionFee: "73,000", currency: "GBP" },
      emba: { available: true, duration: "21 months", tuitionFee: "95,000", currency: "GBP" },
      masters: ["MFE", "MSc", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 690, minScore: 600 },
      gre: { accepted: true, averageScore: 321 },
      workExperience: { required: true, averageYears: 5.5, minYears: 3 },
      englishTest: { toefl: 110, ielts: 7.5 }
    },
    statistics: {
      studentBody: 340,
      internationalStudents: "92%",
      femaleStudents: "38%",
      averageAge: 29,
      classSize: 340
    },
    outcomes: {
      employmentRate: "93%",
      averageSalary: { amount: 125000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "78%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Barclays"]
    },
    highlights: ["Oxford University prestige", "One-year program", "Global network", "Research excellence"],
    specializations: ["Strategy", "Finance", "Entrepreneurship", "Social Impact", "Consulting"],
    image: "/business-schools/oxford-said.jpg",
    website: "https://www.sbs.ox.ac.uk",
    applicationDeadlines: { round1: "September 12", round2: "November 7", round3: "January 9" },
    scholarships: ["Oxford scholarships", "Need-based aid", "Country-specific scholarships"],
    campusLife: { housing: true, studentClubs: 40, internationalism: "Extremely High" }
  },

  // National University of Singapore Business School
  {
    id: 70,
    name: "National University of Singapore Business School",
    shortName: "NUS",
    location: "Singapore",
    country: "Singapore",
    region: "Asia",
    established: 1965,
    ranking: { global: 15, regional: 1, qsGlobal: 18, ftGlobal: 12 },
    accreditation: ["AACSB", "AMBA", "EQUIS"],
    programs: {
      mba: { available: true, duration: "17 months", tuitionFee: "65,000", currency: "SGD" },
      emba: { available: true, duration: "17 months", tuitionFee: "95,000", currency: "SGD" },
      masters: ["MSc", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 680, minScore: 600 },
      gre: { accepted: true, averageScore: 320 },
      workExperience: { required: true, averageYears: 5.5, minYears: 2 },
      englishTest: { toefl: 100, ielts: 6.5 }
    },
    statistics: {
      studentBody: 200,
      internationalStudents: "85%",
      femaleStudents: "35%",
      averageAge: 29,
      classSize: 200
    },
    outcomes: {
      employmentRate: "96%",
      averageSalary: { amount: 105000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "80%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Google", "Amazon"]
    },
    highlights: ["Asian gateway", "Diverse cohort", "Strong in Asia", "Government connections"],
    specializations: ["Finance", "Consulting", "Technology", "Healthcare", "Real Estate"],
    image: "/business-schools/nus-singapore.jpg",
    website: "https://bba.nus.edu.sg",
    applicationDeadlines: { round1: "September 15", round2: "November 15", round3: "February 15" },
    scholarships: ["Merit scholarships", "ASEAN scholarships", "Need-based aid"],
    campusLife: { housing: true, studentClubs: 45, internationalism: "Extremely High" }
  },

  // Batch 3: More Top Global & Indian Schools (IDs 71-80)

  // Cambridge Judge Business School
  {
    id: 71,
    name: "Cambridge Judge Business School",
    shortName: "Cambridge Judge",
    location: "Cambridge",
    country: "United Kingdom",
    region: "Europe",
    established: 1990,
    ranking: { global: 17, regional: 5, qsGlobal: 20, ftGlobal: 15 },
    accreditation: ["AACSB", "AMBA", "EQUIS"],
    programs: {
      mba: { available: true, duration: "12 months", tuitionFee: "64,000", currency: "GBP" },
      emba: { available: true, duration: "20 months", tuitionFee: "89,000", currency: "GBP" },
      masters: ["MFin", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 692, minScore: 600 },
      gre: { accepted: true, averageScore: 319 },
      workExperience: { required: true, averageYears: 6, minYears: 3 },
      englishTest: { toefl: 110, ielts: 7.5 }
    },
    statistics: {
      studentBody: 200,
      internationalStudents: "91%",
      femaleStudents: "36%",
      averageAge: 30,
      classSize: 200
    },
    outcomes: {
      employmentRate: "94%",
      averageSalary: { amount: 118000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "76%",
      topRecruiters: ["McKinsey", "BCG", "Deloitte", "Amazon", "Microsoft"]
    },
    highlights: ["Cambridge University prestige", "Entrepreneurship focus", "Tech innovation", "Small cohort"],
    specializations: ["Entrepreneurship", "Finance", "Technology", "Strategy", "Consulting"],
    image: "/business-schools/cambridge-judge.jpg",
    website: "https://www.jbs.cam.ac.uk",
    applicationDeadlines: { round1: "October 17", round2: "December 5", round3: "February 6" },
    scholarships: ["Cambridge scholarships", "Need-based aid", "Entrepreneurship scholarships"],
    campusLife: { housing: true, studentClubs: 30, internationalism: "Extremely High" }
  },

  // IESE Business School
  {
    id: 72,
    name: "IESE Business School",
    shortName: "IESE",
    location: "Barcelona",
    country: "Spain",
    region: "Europe",
    established: 1958,
    ranking: { global: 9, regional: 3, qsGlobal: 11, ftGlobal: 8 },
    accreditation: ["AACSB", "AMBA", "EQUIS"],
    programs: {
      mba: { available: true, duration: "19 months", tuitionFee: "93,500", currency: "EUR" },
      emba: { available: true, duration: "18 months", tuitionFee: "155,000", currency: "EUR" },
      masters: ["MIM", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 686, minScore: 600 },
      gre: { accepted: true, averageScore: 318 },
      workExperience: { required: true, averageYears: 5, minYears: 3 },
      englishTest: { toefl: 100, ielts: 7.0 }
    },
    statistics: {
      studentBody: 350,
      internationalStudents: "89%",
      femaleStudents: "31%",
      averageAge: 28,
      classSize: 350
    },
    outcomes: {
      employmentRate: "96%",
      averageSalary: { amount: 112000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "84%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "P&G", "Coca-Cola"]
    },
    highlights: ["Case method teaching", "Strong European network", "General management focus", "Ethics emphasis"],
    specializations: ["General Management", "Strategy", "Finance", "Marketing", "Operations"],
    image: "/business-schools/iese-barcelona.jpg",
    website: "https://www.iese.edu",
    applicationDeadlines: { round1: "September 27", round2: "November 29", round3: "January 31" },
    scholarships: ["Merit scholarships", "Need-based aid", "Diversity scholarships"],
    campusLife: { housing: true, studentClubs: 40, internationalism: "Extremely High" }
  },

  // University of Toronto Rotman
  {
    id: 73,
    name: "University of Toronto Rotman School of Management",
    shortName: "Rotman",
    location: "Toronto",
    country: "Canada",
    region: "North America",
    established: 1901,
    ranking: { global: 24, regional: 6, qsGlobal: 28, ftGlobal: 25 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "20 months", tuitionFee: "70,000", currency: "CAD" },
      emba: { available: true, duration: "16 months", tuitionFee: "150,000", currency: "CAD" },
      masters: ["MFin", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 665, minScore: 600 },
      gre: { accepted: true, averageScore: 315 },
      workExperience: { required: true, averageYears: 5, minYears: 2 },
      englishTest: { toefl: 100, ielts: 7.0 }
    },
    statistics: {
      studentBody: 500,
      internationalStudents: "45%",
      femaleStudents: "38%",
      averageAge: 28,
      classSize: 500
    },
    outcomes: {
      employmentRate: "91%",
      averageSalary: { amount: 95000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "68%",
      topRecruiters: ["McKinsey", "BCG", "RBC", "TD Bank", "Amazon"]
    },
    highlights: ["Design thinking", "Innovation focus", "Canadian gateway", "Strong finance program"],
    specializations: ["Finance", "Consulting", "Technology", "Healthcare", "Real Estate"],
    image: "/business-schools/rotman-toronto.jpg",
    website: "https://www.rotman.utoronto.ca",
    applicationDeadlines: { round1: "October 4", round2: "December 6", round3: "February 28" },
    scholarships: ["Merit scholarships", "Need-based aid", "Canadian scholarships"],
    campusLife: { housing: true, studentClubs: 50, internationalism: "High" }
  },

  // Chinese University of Hong Kong Business School
  {
    id: 74,
    name: "Chinese University of Hong Kong Business School",
    shortName: "CUHK",
    location: "Hong Kong",
    country: "Hong Kong",
    region: "Asia",
    established: 1963,
    ranking: { global: 26, regional: 2, qsGlobal: 30, ftGlobal: 28 },
    accreditation: ["AACSB", "EQUIS"],
    programs: {
      mba: { available: true, duration: "12 months", tuitionFee: "55,000", currency: "USD" },
      emba: { available: true, duration: "14 months", tuitionFee: "75,000", currency: "USD" },
      masters: ["MFin", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 650, minScore: 600 },
      gre: { accepted: true, averageScore: 315 },
      workExperience: { required: true, averageYears: 6, minYears: 3 },
      englishTest: { toefl: 100, ielts: 6.5 }
    },
    statistics: {
      studentBody: 55,
      internationalStudents: "70%",
      femaleStudents: "30%",
      averageAge: 30,
      classSize: 55
    },
    outcomes: {
      employmentRate: "98%",
      averageSalary: { amount: 90000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "70%",
      topRecruiters: ["Goldman Sachs", "JP Morgan", "Morgan Stanley", "HSBC", "Standard Chartered"]
    },
    highlights: ["Asia-Pacific gateway", "Small cohort", "Finance strength", "Chinese market access"],
    specializations: ["Finance", "Consulting", "Real Estate", "Private Equity", "Investment Banking"],
    image: "/business-schools/cuhk-hong-kong.jpg",
    website: "https://www.bschool.cuhk.edu.hk",
    applicationDeadlines: { round1: "October 15", round2: "December 15", round3: "February 15" },
    scholarships: ["Merit scholarships", "Asian scholarships", "Need-based aid"],
    campusLife: { housing: true, studentClubs: 25, internationalism: "Extremely High" }
  },

  // HEC Paris
  {
    id: 75,
    name: "HEC Paris",
    shortName: "HEC",
    location: "Paris",
    country: "France",
    region: "Europe",
    established: 1881,
    ranking: { global: 5, regional: 2, qsGlobal: 6, ftGlobal: 5 },
    accreditation: ["AACSB", "AMBA", "EQUIS"],
    programs: {
      mba: { available: true, duration: "16 months", tuitionFee: "81,000", currency: "EUR" },
      emba: { available: true, duration: "18 months", tuitionFee: "160,000", currency: "EUR" },
      masters: ["MSc", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 690, minScore: 650 },
      gre: { accepted: true, averageScore: 325 },
      workExperience: { required: true, averageYears: 5, minYears: 3 },
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
      salaryIncrease: "82%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "L'Oreal", "LVMH"]
    },
    highlights: ["French excellence", "Luxury sector strength", "European focus", "Strong alumni network"],
    specializations: ["Strategy", "Finance", "Marketing", "Luxury Management", "Entrepreneurship"],
    image: "/business-schools/hec-paris.jpg",
    website: "https://www.hec.edu",
    applicationDeadlines: { round1: "October 6", round2: "January 12", round3: "March 30" },
    scholarships: ["HEC Foundation scholarships", "Need-based aid", "Diversity scholarships"],
    campusLife: { housing: true, studentClubs: 35, internationalism: "Extremely High" }
  },
  {
    id: 76,
    name: "NYU Stern School of Business",
    shortName: "NYU Stern",
    location: "New York City",
    country: "United States",
    region: "North America",
    established: 1900,
    ranking: { global: 26, ftGlobal: 26, qsGlobal: 30 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "24 months", tuitionFee: "249,792", currency: "USD" },
      emba: { available: true, duration: "22 months", tuitionFee: "270,000", currency: "USD" },
      masters: ["MS in Finance", "MS in Business Analytics", "MS in Management"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 732, minScore: 600 },
      gre: { accepted: true, averageScore: 327 },
      workExperience: { required: true, averageYears: 5, minYears: 2 },
      englishTest: { toefl: 100, ielts: 7.0 }
    },
    statistics: {
      studentBody: 406,
      internationalStudents: "42%",
      femaleStudents: "44%",
      averageAge: 28,
      classSize: 406
    },
    outcomes: {
      employmentRate: "96%",
      averageSalary: { amount: 175000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "93%",
      topRecruiters: ["Goldman Sachs", "McKinsey", "BCG", "JPMorgan", "Google"]
    },
    highlights: ["NYC location advantage", "Finance industry connections", "Tech recruitment", "Entrepreneurship hub"],
    specializations: ["Finance", "Consulting", "Technology", "Entrepreneurship", "Marketing"],
    image: "/business-schools/nyu-stern.jpg",
    website: "https://www.stern.nyu.edu",
    applicationDeadlines: { round1: "September 15", round2: "November 15", round3: "January 15" },
    scholarships: ["Merit scholarships", "Diversity fellowships", "Need-based aid"],
    campusLife: { housing: true, studentClubs: 90, internationalism: "High" }
  },
  {
    id: 77,
    name: "Indian Institute of Management Raipur",
    shortName: "IIM Raipur",
    location: "Raipur",
    country: "India",
    region: "Asia",
    established: 2010,
    ranking: { global: 85, ftGlobal: 85, qsGlobal: 90 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "24 months", tuitionFee: "20,50,000", currency: "INR" },
      emba: { available: true, duration: "24 months", tuitionFee: "15,00,000", currency: "INR" },
      masters: ["Fellow Program in Management (FPM)"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 650, minScore: 600 },
      gre: { accepted: true, averageScore: 315 },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 90, ielts: 6.5 }
    },
    statistics: {
      studentBody: 480,
      internationalStudents: "8%",
      femaleStudents: "35%",
      averageAge: 23,
      classSize: 240
    },
    outcomes: {
      employmentRate: "95%",
      averageSalary: { amount: 1800000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "250%",
      topRecruiters: ["TCS", "Infosys", "Deloitte", "PwC", "Aditya Birla Group"]
    },
    highlights: ["Young IIM with modern curriculum", "Strong industry partnerships", "Focus on innovation", "Growing alumni network"],
    specializations: ["General Management", "Finance", "Marketing", "Operations", "HR"],
    image: "/business-schools/iim-raipur.jpg",
    website: "https://www.iimraipur.ac.in",
    applicationDeadlines: { round1: "CAT Result based", round2: "WAT-PI based", round3: "Final List" },
    scholarships: ["Government scholarships", "Merit-based aid", "Need-based scholarships"],
    campusLife: { housing: true, studentClubs: 25, internationalism: "Medium" }
  },
  {
    id: 78,
    name: "ESADE Business School",
    shortName: "ESADE",
    location: "Barcelona",
    country: "Spain",
    region: "Europe",
    established: 1958,
    ranking: { global: 27, ftGlobal: 27, qsGlobal: 25 },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: { available: true, duration: "15 months", tuitionFee: "89,500", currency: "EUR" },
      emba: { available: true, duration: "18 months", tuitionFee: "98,000", currency: "EUR" },
      masters: ["Master in Finance", "Master in Marketing"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 680, minScore: 550 },
      gre: { accepted: true, averageScore: 318 },
      workExperience: { required: true, averageYears: 5, minYears: 3 },
      englishTest: { toefl: 100, ielts: 7.0 }
    },
    statistics: {
      studentBody: 200,
      internationalStudents: "89%",
      femaleStudents: "38%",
      averageAge: 29,
      classSize: 200
    },
    outcomes: {
      employmentRate: "88%",
      averageSalary: { amount: 105000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "78%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Amazon", "Google"]
    },
    highlights: ["Barcelona location", "Strong European network", "Innovation focus", "Entrepreneurship excellence"],
    specializations: ["Strategy", "Innovation", "Entrepreneurship", "Finance", "Marketing"],
    image: "/business-schools/esade.jpg",
    website: "https://www.esade.edu",
    applicationDeadlines: { round1: "October 15", round2: "December 15", round3: "February 15" },
    scholarships: ["ESADE Excellence scholarships", "Diversity scholarships", "Need-based aid"],
    campusLife: { housing: true, studentClubs: 40, internationalism: "Very High" }
  },
  {
    id: 79,
    name: "AGSM at UNSW Business School",
    shortName: "AGSM Sydney",
    location: "Sydney",
    country: "Australia",
    region: "Asia-Pacific",
    established: 1977,
    ranking: { global: 42, ftGlobal: 42, qsGlobal: 45 },
    accreditation: ["AACSB", "EQUIS"],
    programs: {
      mba: { available: true, duration: "16 months", tuitionFee: "120,000", currency: "AUD" },
      emba: { available: true, duration: "22 months", tuitionFee: "150,000", currency: "AUD" },
      masters: ["Master of Finance", "Master of Business Analytics"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 670, minScore: 550 },
      gre: { accepted: true, averageScore: 315 },
      workExperience: { required: true, averageYears: 6, minYears: 4 },
      englishTest: { toefl: 94, ielts: 6.5 }
    },
    statistics: {
      studentBody: 150,
      internationalStudents: "70%",
      femaleStudents: "40%",
      averageAge: 31,
      classSize: 150
    },
    outcomes: {
      employmentRate: "90%",
      averageSalary: { amount: 120000, currency: "AUD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "65%",
      topRecruiters: ["Deloitte", "PwC", "Commonwealth Bank", "Westpac", "BHP"]
    },
    highlights: ["Sydney location", "Asia-Pacific focus", "Strong alumni network", "Industry partnerships"],
    specializations: ["General Management", "Finance", "Strategy", "Leadership", "Innovation"],
    image: "/business-schools/agsm-sydney.jpg",
    website: "https://www.agsm.edu.au",
    applicationDeadlines: { round1: "August 31", round2: "October 31", round3: "December 15" },
    scholarships: ["AGSM scholarships", "Diversity scholarships", "Merit-based aid"],
    campusLife: { housing: true, studentClubs: 30, internationalism: "Very High" }
  },
  {
    id: 80,
    name: "Alliance School of Business, Alliance University",
    shortName: "Alliance University",
    location: "Bangalore",
    country: "India",
    region: "Asia",
    established: 2010,
    ranking: { global: 120, ftGlobal: 120, qsGlobal: 125 },
    accreditation: ["NAAC A+"],
    programs: {
      mba: { available: true, duration: "24 months", tuitionFee: "12,50,000", currency: "INR" },
      emba: { available: true, duration: "24 months", tuitionFee: "10,00,000", currency: "INR" },
      masters: ["PGDM", "PhD in Management"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 620, minScore: 550 },
      gre: { accepted: true, averageScore: 310 },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 80, ielts: 6.0 }
    },
    statistics: {
      studentBody: 360,
      internationalStudents: "15%",
      femaleStudents: "42%",
      averageAge: 22,
      classSize: 180
    },
    outcomes: {
      employmentRate: "92%",
      averageSalary: { amount: 1200000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "180%",
      topRecruiters: ["Infosys", "TCS", "Wipro", "Cognizant", "Accenture"]
    },
    highlights: ["Bangalore tech hub location", "Industry-oriented curriculum", "Modern facilities", "Strong placement record"],
    specializations: ["Business Analytics", "Digital Marketing", "Finance", "HR", "Operations"],
    image: "/business-schools/alliance-university.jpg",
    website: "https://www.alliance.edu.in",
    applicationDeadlines: { round1: "CAT/MAT/XAT based", round2: "Direct admission", round3: "Management quota" },
    scholarships: ["Merit scholarships", "Need-based aid", "Sports scholarships"],
    campusLife: { housing: true, studentClubs: 40, internationalism: "Medium" }
  },
  {
    id: 81,
    name: "Manchester Business School",
    shortName: "Manchester BS",
    location: "Manchester",
    country: "United Kingdom",
    region: "Europe",
    established: 1965,
    ranking: { global: 35, ftGlobal: 35, qsGlobal: 38 },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: { available: true, duration: "18 months", tuitionFee: "52,000", currency: "GBP" },
      emba: { available: true, duration: "20 months", tuitionFee: "78,000", currency: "GBP" },
      masters: ["MSc Finance", "MSc Marketing", "MSc Management"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 640, minScore: 550 },
      gre: { accepted: true, averageScore: 315 },
      workExperience: { required: true, averageYears: 5, minYears: 3 },
      englishTest: { toefl: 90, ielts: 6.5 }
    },
    statistics: {
      studentBody: 180,
      internationalStudents: "85%",
      femaleStudents: "35%",
      averageAge: 30,
      classSize: 180
    },
    outcomes: {
      employmentRate: "88%",
      averageSalary: { amount: 95000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "72%",
      topRecruiters: ["Deloitte", "PwC", "KPMG", "Barclays", "Manchester United FC"]
    },
    highlights: ["Triple accreditation", "Strong European network", "Research excellence", "Industry connections"],
    specializations: ["Finance", "Marketing", "Operations", "Strategy", "Entrepreneurship"],
    image: "/business-schools/manchester-bs.jpg",
    website: "https://www.manchester.ac.uk/study/masters/courses/list/08902/mba/",
    applicationDeadlines: { round1: "October 31", round2: "January 31", round3: "March 31" },
    scholarships: ["Dean's scholarships", "Alumni scholarships", "International scholarships"],
    campusLife: { housing: true, studentClubs: 50, internationalism: "Very High" }
  },
  {
    id: 82,
    name: "BML Munjal University School of Management",
    shortName: "BMU",
    location: "Gurugram",
    country: "India",
    region: "Asia",
    established: 2014,
    ranking: { global: 140, ftGlobal: 140, qsGlobal: 145 },
    accreditation: ["UGC"],
    programs: {
      mba: { available: true, duration: "24 months", tuitionFee: "14,50,000", currency: "INR" },
      emba: { available: true, duration: "24 months", tuitionFee: "12,00,000", currency: "INR" },
      masters: ["PGDM", "Executive PGDM"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 600, minScore: 550 },
      gre: { accepted: true, averageScore: 305 },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 75, ielts: 6.0 }
    },
    statistics: {
      studentBody: 240,
      internationalStudents: "10%",
      femaleStudents: "38%",
      averageAge: 23,
      classSize: 120
    },
    outcomes: {
      employmentRate: "90%",
      averageSalary: { amount: 1000000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "150%",
      topRecruiters: ["Hero MotoCorp", "Maruti Suzuki", "Samsung", "LG", "Hyundai"]
    },
    highlights: ["Industry partnerships", "Modern campus", "Gurugram location", "Corporate connections"],
    specializations: ["Marketing", "Finance", "Operations", "HR", "Business Analytics"],
    image: "/business-schools/bmu.jpg",
    website: "https://www.bml.edu.in",
    applicationDeadlines: { round1: "CAT/MAT/XAT based", round2: "Personal Interview", round3: "Final admission" },
    scholarships: ["Merit scholarships", "Need-based aid", "Industry-sponsored scholarships"],
    campusLife: { housing: true, studentClubs: 25, internationalism: "Low" }
  },
  {
    id: 83,
    name: "Warwick Business School",
    shortName: "Warwick BS",
    location: "Coventry",
    country: "United Kingdom",
    region: "Europe",
    established: 1967,
    ranking: { global: 28, ftGlobal: 28, qsGlobal: 32 },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: { available: true, duration: "12 months", tuitionFee: "49,950", currency: "GBP" },
      emba: { available: true, duration: "30 months", tuitionFee: "69,500", currency: "GBP" },
      masters: ["MSc Finance", "MSc Marketing & Strategy", "MSc Management"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 650, minScore: 550 },
      gre: { accepted: true, averageScore: 318 },
      workExperience: { required: true, averageYears: 5, minYears: 3 },
      englishTest: { toefl: 92, ielts: 6.5 }
    },
    statistics: {
      studentBody: 160,
      internationalStudents: "90%",
      femaleStudents: "40%",
      averageAge: 30,
      classSize: 160
    },
    outcomes: {
      employmentRate: "90%",
      averageSalary: { amount: 100000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "80%",
      topRecruiters: ["Deloitte", "PwC", "McKinsey", "Amazon", "Microsoft"]
    },
    highlights: ["Triple accreditation", "Strong research focus", "International diversity", "UK university prestige"],
    specializations: ["Finance", "Strategy", "Marketing", "Operations", "Entrepreneurship"],
    image: "/business-schools/warwick-bs.jpg",
    website: "https://www.wbs.ac.uk",
    applicationDeadlines: { round1: "October 20", round2: "December 15", round3: "February 28" },
    scholarships: ["Warwick scholarships", "International scholarships", "Merit-based aid"],
    campusLife: { housing: true, studentClubs: 45, internationalism: "Very High" }
  },
  {
    id: 84,
    name: "Christ University Institute of Management",
    shortName: "Christ University",
    location: "Bangalore",
    country: "India",
    region: "Asia",
    established: 1969,
    ranking: { global: 150, ftGlobal: 150, qsGlobal: 155 },
    accreditation: ["NAAC A++", "UGC"],
    programs: {
      mba: { available: true, duration: "24 months", tuitionFee: "8,50,000", currency: "INR" },
      emba: { available: true, duration: "24 months", tuitionFee: "7,00,000", currency: "INR" },
      masters: ["PGDM", "MIB"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 580, minScore: 500 },
      gre: { accepted: true, averageScore: 300 },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 70, ielts: 5.5 }
    },
    statistics: {
      studentBody: 480,
      internationalStudents: "12%",
      femaleStudents: "45%",
      averageAge: 22,
      classSize: 240
    },
    outcomes: {
      employmentRate: "88%",
      averageSalary: { amount: 800000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "120%",
      topRecruiters: ["Wipro", "Infosys", "TCS", "Cognizant", "Capgemini"]
    },
    highlights: ["Bangalore tech hub", "Strong academics", "Diverse programs", "Value for money"],
    specializations: ["Finance", "Marketing", "HR", "International Business", "Systems"],
    image: "/business-schools/christ-university.jpg",
    website: "https://www.christuniversity.in",
    applicationDeadlines: { round1: "CAT/MAT based", round2: "University entrance", round3: "Management quota" },
    scholarships: ["Merit scholarships", "Need-based aid", "Sports scholarships"],
    campusLife: { housing: true, studentClubs: 60, internationalism: "Medium" }
  },
  {
    id: 85,
    name: "Rotterdam School of Management",
    shortName: "RSM",
    location: "Rotterdam",
    country: "Netherlands",
    region: "Europe",
    established: 1970,
    ranking: { global: 29, ftGlobal: 29, qsGlobal: 31 },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: { available: true, duration: "12 months", tuitionFee: "62,500", currency: "EUR" },
      emba: { available: true, duration: "22 months", tuitionFee: "78,000", currency: "EUR" },
      masters: ["Master in Finance", "Master in Management", "Master in Marketing"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 650, minScore: 600 },
      gre: { accepted: true, averageScore: 316 },
      workExperience: { required: true, averageYears: 5, minYears: 3 },
      englishTest: { toefl: 100, ielts: 7.0 }
    },
    statistics: {
      studentBody: 240,
      internationalStudents: "95%",
      femaleStudents: "37%",
      averageAge: 29,
      classSize: 240
    },
    outcomes: {
      employmentRate: "92%",
      averageSalary: { amount: 110000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "85%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Unilever", "Shell"]
    },
    highlights: ["Triple accreditation", "European business hub", "International diversity", "Sustainability focus"],
    specializations: ["Strategy", "Finance", "Marketing", "Operations", "Sustainability"],
    image: "/business-schools/rsm.jpg",
    website: "https://www.rsm.nl",
    applicationDeadlines: { round1: "September 30", round2: "November 30", round3: "January 31" },
    scholarships: ["RSM scholarships", "Excellence scholarships", "Diversity scholarships"],
    campusLife: { housing: true, studentClubs: 35, internationalism: "Extremely High" }
  },
  {
    id: 86,
    name: "Duke Fuqua School of Business",
    shortName: "Duke Fuqua",
    location: "Durham, NC",
    country: "United States",
    region: "North America",
    established: 1969,
    ranking: { global: 24, ftGlobal: 24, qsGlobal: 26 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "22 months", tuitionFee: "252,072", currency: "USD" },
      emba: { available: true, duration: "17 months", tuitionFee: "180,000", currency: "USD" },
      masters: ["MMS", "MQM"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 705, minScore: 600 },
      gre: { accepted: true, averageScore: 322 },
      workExperience: { required: true, averageYears: 5, minYears: 2 },
      englishTest: { toefl: 100, ielts: 7.0 }
    },
    statistics: {
      studentBody: 440,
      internationalStudents: "32%",
      femaleStudents: "45%",
      averageAge: 28,
      classSize: 440
    },
    outcomes: {
      employmentRate: "94%",
      averageSalary: { amount: 165000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "85%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Amazon"]
    },
    highlights: ["Team Fuqua culture", "Healthcare management strength", "Strong alumni network", "Leadership focus"],
    specializations: ["Healthcare", "Finance", "Consulting", "Technology", "Entrepreneurship"],
    image: "/business-schools/duke-fuqua.jpg",
    website: "https://www.fuqua.duke.edu",
    applicationDeadlines: { round1: "September 6", round2: "October 22", round3: "January 7" },
    scholarships: ["Merit scholarships", "Consortium fellowships", "Need-based aid"],
    campusLife: { housing: true, studentClubs: 75, internationalism: "High" }
  },
  {
    id: 87,
    name: "Indian Institute of Management Indore",
    shortName: "IIM Indore",
    location: "Indore",
    country: "India",
    region: "Asia",
    established: 1996,
    ranking: { global: 75, ftGlobal: 75, qsGlobal: 80 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "24 months", tuitionFee: "20,75,000", currency: "INR" },
      emba: { available: true, duration: "24 months", tuitionFee: "18,00,000", currency: "INR" },
      masters: ["IPM", "Fellow Program"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 660, minScore: 600 },
      gre: { accepted: true, averageScore: 318 },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 90, ielts: 6.5 }
    },
    statistics: {
      studentBody: 540,
      internationalStudents: "10%",
      femaleStudents: "38%",
      averageAge: 23,
      classSize: 270
    },
    outcomes: {
      employmentRate: "98%",
      averageSalary: { amount: 2500000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "280%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Flipkart"]
    },
    highlights: ["Top tier IIM", "Strong consulting placements", "5-year IPM program", "Excellent infrastructure"],
    specializations: ["Strategy", "Finance", "Marketing", "Operations", "Consulting"],
    image: "/business-schools/iim-indore.jpg",
    website: "https://www.iimidr.ac.in",
    applicationDeadlines: { round1: "CAT Result based", round2: "WAT-PI based", round3: "Final List" },
    scholarships: ["Government scholarships", "Merit-based aid", "Need-based scholarships"],
    campusLife: { housing: true, studentClubs: 40, internationalism: "Medium" }
  },
  {
    id: 88,
    name: "IE Business School",
    shortName: "IE Madrid",
    location: "Madrid",
    country: "Spain",
    region: "Europe",
    established: 1973,
    ranking: { global: 31, ftGlobal: 31, qsGlobal: 35 },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: { available: true, duration: "11 months", tuitionFee: "89,200", currency: "EUR" },
      emba: { available: true, duration: "15 months", tuitionFee: "97,000", currency: "EUR" },
      masters: ["Master in Finance", "Master in Management"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 690, minScore: 550 },
      gre: { accepted: true, averageScore: 320 },
      workExperience: { required: true, averageYears: 5, minYears: 3 },
      englishTest: { toefl: 100, ielts: 7.0 }
    },
    statistics: {
      studentBody: 400,
      internationalStudents: "85%",
      femaleStudents: "42%",
      averageAge: 29,
      classSize: 400
    },
    outcomes: {
      employmentRate: "90%",
      averageSalary: { amount: 115000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "90%",
      topRecruiters: ["McKinsey", "BCG", "Amazon", "Google", "Telefónica"]
    },
    highlights: ["Innovation focus", "Tech entrepreneurship", "Madrid location", "Digital transformation"],
    specializations: ["Innovation", "Entrepreneurship", "Technology", "Strategy", "Finance"],
    image: "/business-schools/ie-madrid.jpg",
    website: "https://www.ie.edu",
    applicationDeadlines: { round1: "October 31", round2: "December 15", round3: "February 28" },
    scholarships: ["IE Excellence scholarships", "Diversity scholarships", "Women in business awards"],
    campusLife: { housing: true, studentClubs: 50, internationalism: "Very High" }
  },
  {
    id: 89,
    name: "Imperial College Business School",
    shortName: "Imperial CBS",
    location: "London",
    country: "United Kingdom",
    region: "Europe",
    established: 2003,
    ranking: { global: 40, ftGlobal: 40, qsGlobal: 42 },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: { available: true, duration: "12 months", tuitionFee: "59,500", currency: "GBP" },
      emba: { available: true, duration: "24 months", tuitionFee: "78,000", currency: "GBP" },
      masters: ["MSc Finance", "MSc Innovation", "MSc Management"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 680, minScore: 600 },
      gre: { accepted: true, averageScore: 318 },
      workExperience: { required: true, averageYears: 6, minYears: 3 },
      englishTest: { toefl: 100, ielts: 7.0 }
    },
    statistics: {
      studentBody: 80,
      internationalStudents: "95%",
      femaleStudents: "30%",
      averageAge: 31,
      classSize: 80
    },
    outcomes: {
      employmentRate: "92%",
      averageSalary: { amount: 110000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "75%",
      topRecruiters: ["Goldman Sachs", "JPMorgan", "McKinsey", "Google", "Amazon"]
    },
    highlights: ["STEM focus", "London financial hub", "Small class size", "Technology innovation"],
    specializations: ["Finance", "Technology", "Innovation", "Entrepreneurship", "Energy"],
    image: "/business-schools/imperial-cbs.jpg",
    website: "https://www.imperial.ac.uk/business-school",
    applicationDeadlines: { round1: "October 15", round2: "December 15", round3: "February 28" },
    scholarships: ["Imperial scholarships", "Alumni scholarships", "International awards"],
    campusLife: { housing: true, studentClubs: 25, internationalism: "Extremely High" }
  },
  {
    id: 90,
    name: "NMIMS School of Business Management",
    shortName: "NMIMS Mumbai",
    location: "Mumbai",
    country: "India",
    region: "Asia",
    established: 1981,
    ranking: { global: 110, ftGlobal: 110, qsGlobal: 115 },
    accreditation: ["NAAC A++"],
    programs: {
      mba: { available: true, duration: "24 months", tuitionFee: "19,53,000", currency: "INR" },
      emba: { available: true, duration: "24 months", tuitionFee: "15,00,000", currency: "INR" },
      masters: ["PGDM", "Executive PGDM"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 650, minScore: 600 },
      gre: { accepted: true, averageScore: 315 },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 85, ielts: 6.5 }
    },
    statistics: {
      studentBody: 600,
      internationalStudents: "8%",
      femaleStudents: "40%",
      averageAge: 23,
      classSize: 300
    },
    outcomes: {
      employmentRate: "95%",
      averageSalary: { amount: 1800000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "220%",
      topRecruiters: ["Deloitte", "EY", "KPMG", "JPMorgan", "Aditya Birla Group"]
    },
    highlights: ["Mumbai financial hub", "Strong industry connections", "Excellent placement record", "Modern facilities"],
    specializations: ["Finance", "Marketing", "Operations", "HR", "Business Analytics"],
    image: "/business-schools/nmims.jpg",
    website: "https://www.nmims.edu",
    applicationDeadlines: { round1: "NMAT based", round2: "GD-PI process", round3: "Final admission" },
    scholarships: ["Merit scholarships", "Need-based aid", "Industry-sponsored awards"],
    campusLife: { housing: true, studentClubs: 45, internationalism: "Low" }
  },
  {
    id: 91,
    name: "Toronto Rotman School of Management",
    shortName: "Rotman",
    location: "Toronto",
    country: "Canada",
    region: "North America",
    established: 1827,
    ranking: { global: 44, ftGlobal: 44, qsGlobal: 48 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "20 months", tuitionFee: "116,700", currency: "CAD" },
      emba: { available: true, duration: "17 months", tuitionFee: "142,000", currency: "CAD" },
      masters: ["Master of Finance", "Master of Management Analytics"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 665, minScore: 550 },
      gre: { accepted: true, averageScore: 315 },
      workExperience: { required: true, averageYears: 5, minYears: 2 },
      englishTest: { toefl: 100, ielts: 7.0 }
    },
    statistics: {
      studentBody: 300,
      internationalStudents: "70%",
      femaleStudents: "40%",
      averageAge: 28,
      classSize: 300
    },
    outcomes: {
      employmentRate: "88%",
      averageSalary: { amount: 110000, currency: "CAD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "70%",
      topRecruiters: ["Deloitte", "McKinsey", "RBC", "TD Bank", "Amazon"]
    },
    highlights: ["Toronto financial center", "Design thinking", "Strong Canadian network", "Integrative thinking"],
    specializations: ["Finance", "Strategy", "Marketing", "Operations", "Analytics"],
    image: "/business-schools/rotman.jpg",
    website: "https://www.rotman.utoronto.ca",
    applicationDeadlines: { round1: "October 6", round2: "December 8", round3: "February 23" },
    scholarships: ["Rotman scholarships", "International awards", "Diversity scholarships"],
    campusLife: { housing: true, studentClubs: 40, internationalism: "Very High" }
  },
  {
    id: 92,
    name: "Great Lakes Institute of Management",
    shortName: "Great Lakes",
    location: "Chennai",
    country: "India",
    region: "Asia",
    established: 2004,
    ranking: { global: 130, ftGlobal: 130, qsGlobal: 135 },
    accreditation: ["AICTE"],
    programs: {
      mba: { available: true, duration: "24 months", tuitionFee: "17,50,000", currency: "INR" },
      emba: { available: true, duration: "15 months", tuitionFee: "14,50,000", currency: "INR" },
      masters: ["PGDM", "PGPM"], phd: false
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 630, minScore: 550 },
      gre: { accepted: true, averageScore: 310 },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 80, ielts: 6.0 }
    },
    statistics: {
      studentBody: 480,
      internationalStudents: "15%",
      femaleStudents: "35%",
      averageAge: 24,
      classSize: 240
    },
    outcomes: {
      employmentRate: "92%",
      averageSalary: { amount: 1400000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "200%",
      topRecruiters: ["TCS", "Infosys", "Wipro", "Cognizant", "L&T"]
    },
    highlights: ["Industry-academia partnership", "Chennai IT hub", "Strong alumni network", "Practical learning"],
    specializations: ["IT Management", "Finance", "Marketing", "Operations", "Strategy"],
    image: "/business-schools/great-lakes.jpg",
    website: "https://www.greatlakes.edu.in",
    applicationDeadlines: { round1: "CAT/XAT based", round2: "Personal Interview", round3: "Final admission" },
    scholarships: ["Merit scholarships", "Need-based aid", "Alumni scholarships"],
    campusLife: { housing: true, studentClubs: 30, internationalism: "Medium" }
  },
  {
    id: 93,
    name: "Vanderbilt Owen Graduate School",
    shortName: "Vanderbilt Owen",
    location: "Nashville, TN",
    country: "United States",
    region: "North America",
    established: 1969,
    ranking: { global: 48, ftGlobal: 48, qsGlobal: 52 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "21 months", tuitionFee: "218,412", currency: "USD" },
      emba: { available: true, duration: "22 months", tuitionFee: "189,000", currency: "USD" },
      masters: ["MS Finance", "MS Marketing"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 680, minScore: 550 },
      gre: { accepted: true, averageScore: 318 },
      workExperience: { required: true, averageYears: 4, minYears: 2 },
      englishTest: { toefl: 100, ielts: 7.0 }
    },
    statistics: {
      studentBody: 350,
      internationalStudents: "30%",
      femaleStudents: "38%",
      averageAge: 28,
      classSize: 175
    },
    outcomes: {
      employmentRate: "91%",
      averageSalary: { amount: 140000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "80%",
      topRecruiters: ["Deloitte", "EY", "Amazon", "Bridgestone", "HCA Healthcare"]
    },
    highlights: ["Healthcare management", "Finance strength", "Nashville hub", "Small class sizes"],
    specializations: ["Healthcare", "Finance", "Operations", "Strategy", "Marketing"],
    image: "/business-schools/vanderbilt-owen.jpg",
    website: "https://business.vanderbilt.edu",
    applicationDeadlines: { round1: "October 2", round2: "November 13", round3: "January 8" },
    scholarships: ["Merit scholarships", "Diversity fellowships", "Dean's scholarships"],
    campusLife: { housing: true, studentClubs: 35, internationalism: "High" }
  },
  {
    id: 94,
    name: "IMT Ghaziabad",
    shortName: "IMT Ghaziabad",
    location: "Ghaziabad",
    country: "India",
    region: "Asia",
    established: 1980,
    ranking: { global: 125, ftGlobal: 125, qsGlobal: 130 },
    accreditation: ["AICTE", "SAQS"],
    programs: {
      mba: { available: true, duration: "24 months", tuitionFee: "19,50,000", currency: "INR" },
      emba: { available: true, duration: "24 months", tuitionFee: "16,00,000", currency: "INR" },
      masters: ["PGDM", "PGDM-DCP"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 640, minScore: 550 },
      gre: { accepted: true, averageScore: 315 },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 85, ielts: 6.5 }
    },
    statistics: {
      studentBody: 540,
      internationalStudents: "12%",
      femaleStudents: "42%",
      averageAge: 23,
      classSize: 180
    },
    outcomes: {
      employmentRate: "94%",
      averageSalary: { amount: 1550000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "210%",
      topRecruiters: ["Accenture", "Deloitte", "KPMG", "Amazon", "Flipkart"]
    },
    highlights: ["Established legacy", "Strong industry ties", "NCR location advantage", "Excellent placements"],
    specializations: ["Marketing", "Finance", "Operations", "HR", "IT"],
    image: "/business-schools/imt-ghaziabad.jpg",
    website: "https://www.imt.edu",
    applicationDeadlines: { round1: "CAT/XAT based", round2: "Personal Interview", round3: "Final List" },
    scholarships: ["Merit scholarships", "Need-based scholarships", "Alumni awards"],
    campusLife: { housing: true, studentClubs: 35, internationalism: "Medium" }
  },
  {
    id: 95,
    name: "Ivey Business School at Western University",
    shortName: "Ivey",
    location: "London, ON",
    country: "Canada",
    region: "North America",
    established: 1922,
    ranking: { global: 46, ftGlobal: 46, qsGlobal: 50 },
    accreditation: ["AACSB", "EQUIS"],
    programs: {
      mba: { available: true, duration: "12 months", tuitionFee: "89,000", currency: "CAD" },
      emba: { available: true, duration: "16 months", tuitionFee: "118,000", currency: "CAD" },
      masters: ["Master in Management", "MSc"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 660, minScore: 550 },
      gre: { accepted: true, averageScore: 315 },
      workExperience: { required: true, averageYears: 4, minYears: 2 },
      englishTest: { toefl: 100, ielts: 7.0 }
    },
    statistics: {
      studentBody: 180,
      internationalStudents: "50%",
      femaleStudents: "35%",
      averageAge: 27,
      classSize: 180
    },
    outcomes: {
      employmentRate: "90%",
      averageSalary: { amount: 105000, currency: "CAD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "75%",
      topRecruiters: ["Deloitte", "McKinsey", "RBC", "TD Bank", "Shopify"]
    },
    highlights: ["Case method excellence", "General management focus", "Strong Canadian presence", "Leadership development"],
    specializations: ["General Management", "Strategy", "Finance", "Marketing", "Operations"],
    image: "/business-schools/ivey.jpg",
    website: "https://www.ivey.uwo.ca",
    applicationDeadlines: { round1: "October 1", round2: "December 1", round3: "February 1" },
    scholarships: ["Ivey scholarships", "International awards", "Leadership scholarships"],
    campusLife: { housing: true, studentClubs: 30, internationalism: "High" }
  },
  {
    id: 96,
    name: "Yale School of Management",
    shortName: "Yale SOM",
    location: "New Haven, CT",
    country: "United States",
    region: "North America",
    established: 1976,
    ranking: { global: 25, ftGlobal: 25, qsGlobal: 28 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "24 months", tuitionFee: "251,250", currency: "USD" },
      emba: { available: true, duration: "22 months", tuitionFee: "235,000", currency: "USD" },
      masters: ["MAM", "Global MMS"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 720, minScore: 600 },
      gre: { accepted: true, averageScore: 325 },
      workExperience: { required: true, averageYears: 5, minYears: 0 },
      englishTest: { toefl: 100, ielts: 7.0 }
    },
    statistics: {
      studentBody: 343,
      internationalStudents: "45%",
      femaleStudents: "47%",
      averageAge: 28,
      classSize: 343
    },
    outcomes: {
      employmentRate: "95%",
      averageSalary: { amount: 170000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "90%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Google"]
    },
    highlights: ["Ivy League prestige", "Integrated curriculum", "Global perspective", "Social impact focus"],
    specializations: ["Strategy", "Finance", "Marketing", "Nonprofit", "Social Enterprise"],
    image: "/business-schools/yale-som.jpg",
    website: "https://som.yale.edu",
    applicationDeadlines: { round1: "September 12", round2: "November 7", round3: "January 6" },
    scholarships: ["Merit scholarships", "Need-based aid", "Fellowship programs"],
    campusLife: { housing: true, studentClubs: 80, internationalism: "Very High" }
  },
  {
    id: 97,
    name: "XLRI - Xavier School of Management",
    shortName: "XLRI",
    location: "Jamshedpur",
    country: "India",
    region: "Asia",
    established: 1949,
    ranking: { global: 95, ftGlobal: 95, qsGlobal: 100 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "24 months", tuitionFee: "23,00,000", currency: "INR" },
      emba: { available: true, duration: "15 months", tuitionFee: "18,50,000", currency: "INR" },
      masters: ["PGDM-GM", "PGDM-HRM"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 670, minScore: 600 },
      gre: { accepted: true, averageScore: 320 },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 90, ielts: 6.5 }
    },
    statistics: {
      studentBody: 380,
      internationalStudents: "8%",
      femaleStudents: "35%",
      averageAge: 23,
      classSize: 190
    },
    outcomes: {
      employmentRate: "98%",
      averageSalary: { amount: 2800000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "300%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Microsoft"]
    },
    highlights: ["Legacy institution", "Strong HR specialization", "Jesuit values", "Industry leadership"],
    specializations: ["Human Resources", "General Management", "Finance", "Marketing", "Operations"],
    image: "/business-schools/xlri.jpg",
    website: "https://www.xlri.ac.in",
    applicationDeadlines: { round1: "XAT Result based", round2: "GD-PI process", round3: "Final List" },
    scholarships: ["Merit scholarships", "Need-based aid", "Minority scholarships"],
    campusLife: { housing: true, studentClubs: 50, internationalism: "Medium" }
  },
  {
    id: 98,
    name: "Cornell Johnson Graduate School",
    shortName: "Cornell Johnson",
    location: "Ithaca, NY",
    country: "United States",
    region: "North America",
    established: 1946,
    ranking: { global: 32, ftGlobal: 32, qsGlobal: 36 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "24 months", tuitionFee: "243,200", currency: "USD" },
      emba: { available: true, duration: "20 months", tuitionFee: "220,000", currency: "USD" },
      masters: ["MPS", "MBA/MPA"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 700, minScore: 600 },
      gre: { accepted: true, averageScore: 322 },
      workExperience: { required: true, averageYears: 5, minYears: 0 },
      englishTest: { toefl: 100, ielts: 7.0 }
    },
    statistics: {
      studentBody: 570,
      internationalStudents: "35%",
      femaleStudents: "43%",
      averageAge: 28,
      classSize: 285
    },
    outcomes: {
      employmentRate: "93%",
      averageSalary: { amount: 155000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "85%",
      topRecruiters: ["Goldman Sachs", "McKinsey", "Amazon", "Microsoft", "JPMorgan"]
    },
    highlights: ["Ivy League network", "Tech industry connections", "Immersion learning", "Diverse specializations"],
    specializations: ["Finance", "Technology", "Consulting", "Healthcare", "Real Estate"],
    image: "/business-schools/cornell-johnson.jpg",
    website: "https://www.johnson.cornell.edu",
    applicationDeadlines: { round1: "October 1", round2: "January 3", round3: "March 15" },
    scholarships: ["Park fellowships", "Merit scholarships", "Diversity fellowships"],
    campusLife: { housing: true, studentClubs: 85, internationalism: "High" }
  },
  {
    id: 99,
    name: "NUS Business School",
    shortName: "NUS",
    location: "Singapore",
    country: "Singapore",
    region: "Asia-Pacific",
    established: 1965,
    ranking: { global: 36, ftGlobal: 36, qsGlobal: 40 },
    accreditation: ["AACSB", "EQUIS"],
    programs: {
      mba: { available: true, duration: "17 months", tuitionFee: "118,000", currency: "SGD" },
      emba: { available: true, duration: "17 months", tuitionFee: "148,000", currency: "SGD" },
      masters: ["MSc Finance", "MSc Marketing Analytics"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 660, minScore: 600 },
      gre: { accepted: true, averageScore: 318 },
      workExperience: { required: true, averageYears: 5, minYears: 3 },
      englishTest: { toefl: 100, ielts: 6.5 }
    },
    statistics: {
      studentBody: 200,
      internationalStudents: "90%",
      femaleStudents: "35%",
      averageAge: 29,
      classSize: 200
    },
    outcomes: {
      employmentRate: "90%",
      averageSalary: { amount: 125000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "70%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Google", "Grab"]
    },
    highlights: ["Singapore hub advantage", "Asia-Pacific focus", "Strong network", "Tech industry access"],
    specializations: ["Finance", "Strategy", "Marketing", "Operations", "Technology"],
    image: "/business-schools/nus.jpg",
    website: "https://biz.nus.edu.sg",
    applicationDeadlines: { round1: "September 30", round2: "November 30", round3: "February 28" },
    scholarships: ["NUS scholarships", "ASEAN scholarships", "Merit awards"],
    campusLife: { housing: true, studentClubs: 45, internationalism: "Extremely High" }
  },
  {
    id: 100,
    name: "Faculty of Management Studies, Delhi University",
    shortName: "FMS Delhi",
    location: "New Delhi",
    country: "India",
    region: "Asia",
    established: 1954,
    ranking: { global: 105, ftGlobal: 105, qsGlobal: 110 },
    accreditation: ["NAAC A++"],
    programs: {
      mba: { available: true, duration: "24 months", tuitionFee: "20,000", currency: "INR" },
      emba: { available: true, duration: "24 months", tuitionFee: "50,000", currency: "INR" },
      masters: ["MBA", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 680, minScore: 600 },
      gre: { accepted: false, averageScore: 0 },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 85, ielts: 6.0 }
    },
    statistics: {
      studentBody: 220,
      internationalStudents: "5%",
      femaleStudents: "40%",
      averageAge: 22,
      classSize: 110
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: { amount: 3200000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "400%",
      topRecruiters: ["Goldman Sachs", "McKinsey", "BCG", "Bain", "Google"]
    },
    highlights: ["Exceptional ROI", "Top placement record", "Delhi University legacy", "Affordable fees"],
    specializations: ["Finance", "Marketing", "Operations", "Strategy", "HR"],
    image: "/business-schools/fms-delhi.jpg",
    website: "https://www.fms.edu",
    applicationDeadlines: { round1: "CAT Result based", round2: "Personal Interview", round3: "Final Merit List" },
    scholarships: ["Government scholarships", "Merit-based aid", "Need-based scholarships"],
    campusLife: { housing: true, studentClubs: 25, internationalism: "Low" }
  },
  {
    id: 101,
    name: "Rice Jones Graduate School",
    shortName: "Rice Jones",
    location: "Houston, TX",
    country: "United States",
    region: "North America",
    established: 1974,
    ranking: { global: 50, ftGlobal: 50, qsGlobal: 55 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "22 months", tuitionFee: "204,000", currency: "USD" },
      emba: { available: true, duration: "21 months", tuitionFee: "178,000", currency: "USD" },
      masters: ["MS Accounting", "Professional MBA"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 670, minScore: 550 },
      gre: { accepted: true, averageScore: 315 },
      workExperience: { required: true, averageYears: 4, minYears: 2 },
      englishTest: { toefl: 100, ielts: 7.0 }
    },
    statistics: {
      studentBody: 240,
      internationalStudents: "40%",
      femaleStudents: "35%",
      averageAge: 28,
      classSize: 120
    },
    outcomes: {
      employmentRate: "89%",
      averageSalary: { amount: 135000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "75%",
      topRecruiters: ["ExxonMobil", "Shell", "Deloitte", "Amazon", "JPMorgan"]
    },
    highlights: ["Energy sector strength", "Houston business hub", "Small class sizes", "Strong alumni network"],
    specializations: ["Energy", "Finance", "Consulting", "Technology", "Healthcare"],
    image: "/business-schools/rice-jones.jpg",
    website: "https://business.rice.edu",
    applicationDeadlines: { round1: "October 10", round2: "December 5", round3: "February 12" },
    scholarships: ["Merit scholarships", "Consortium fellowships", "Energy industry awards"],
    campusLife: { housing: true, studentClubs: 40, internationalism: "High" }
  },
  {
    id: 102,
    name: "Indian School of Business",
    shortName: "ISB",
    location: "Hyderabad",
    country: "India",
    region: "Asia",
    established: 2001,
    ranking: { global: 60, ftGlobal: 60, qsGlobal: 65 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "12 months", tuitionFee: "35,60,000", currency: "INR" },
      emba: { available: true, duration: "12 months", tuitionFee: "32,50,000", currency: "INR" },
      masters: ["AMPGP", "MFAB"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 710, minScore: 650 },
      gre: { accepted: true, averageScore: 325 },
      workExperience: { required: true, averageYears: 5, minYears: 2 },
      englishTest: { toefl: 100, ielts: 7.0 }
    },
    statistics: {
      studentBody: 917,
      internationalStudents: "15%",
      femaleStudents: "35%",
      averageAge: 27,
      classSize: 917
    },
    outcomes: {
      employmentRate: "95%",
      averageSalary: { amount: 3400000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "140%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Amazon"]
    },
    highlights: ["World-class faculty", "Industry partnerships", "Strong alumni network", "Global exposure"],
    specializations: ["Strategy", "Finance", "Marketing", "Operations", "Technology"],
    image: "/business-schools/isb.jpg",
    website: "https://www.isb.edu",
    applicationDeadlines: { round1: "October 15", round2: "December 15", round3: "February 15" },
    scholarships: ["Need-based scholarships", "Merit awards", "Women in leadership awards"],
    campusLife: { housing: true, studentClubs: 60, internationalism: "High" }
  },
  {
    id: 103,
    name: "Georgetown McDonough School",
    shortName: "Georgetown McDonough",
    location: "Washington, DC",
    country: "United States",
    region: "North America",
    established: 1957,
    ranking: { global: 45, ftGlobal: 45, qsGlobal: 49 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "21 months", tuitionFee: "228,950", currency: "USD" },
      emba: { available: true, duration: "20 months", tuitionFee: "215,000", currency: "USD" },
      masters: ["MS Finance", "MS Analytics"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 680, minScore: 600 },
      gre: { accepted: true, averageScore: 320 },
      workExperience: { required: true, averageYears: 4, minYears: 2 },
      englishTest: { toefl: 100, ielts: 7.0 }
    },
    statistics: {
      studentBody: 285,
      internationalStudents: "35%",
      femaleStudents: "42%",
      averageAge: 28,
      classSize: 285
    },
    outcomes: {
      employmentRate: "91%",
      averageSalary: { amount: 145000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "80%",
      topRecruiters: ["Deloitte", "PwC", "Amazon", "Capital One", "World Bank"]
    },
    highlights: ["DC location advantage", "Government connections", "International focus", "Ethics emphasis"],
    specializations: ["Finance", "Consulting", "International Business", "Healthcare", "Public Policy"],
    image: "/business-schools/georgetown-mcdonough.jpg",
    website: "https://msb.georgetown.edu",
    applicationDeadlines: { round1: "October 15", round2: "December 15", round3: "March 1" },
    scholarships: ["Merit scholarships", "Public service fellowships", "International awards"],
    campusLife: { housing: true, studentClubs: 55, internationalism: "High" }
  },
  {
    id: 104,
    name: "SP Jain Institute of Management",
    shortName: "SP Jain",
    location: "Mumbai",
    country: "India",
    region: "Asia",
    established: 1981,
    ranking: { global: 135, ftGlobal: 135, qsGlobal: 140 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "24 months", tuitionFee: "17,50,000", currency: "INR" },
      emba: { available: true, duration: "15 months", tuitionFee: "15,00,000", currency: "INR" },
      masters: ["PGDM", "Global MBA"], phd: false
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 650, minScore: 600 },
      gre: { accepted: true, averageScore: 315 },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 80, ielts: 6.5 }
    },
    statistics: {
      studentBody: 240,
      internationalStudents: "20%",
      femaleStudents: "40%",
      averageAge: 24,
      classSize: 120
    },
    outcomes: {
      employmentRate: "93%",
      averageSalary: { amount: 1650000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "230%",
      topRecruiters: ["Accenture", "Deloitte", "KPMG", "Wipro", "L&T"]
    },
    highlights: ["Global campuses", "International exposure", "Industry focus", "Mumbai financial center"],
    specializations: ["Finance", "Marketing", "Operations", "Information Management", "Economics"],
    image: "/business-schools/sp-jain.jpg",
    website: "https://www.spjimr.org",
    applicationDeadlines: { round1: "CAT/XAT based", round2: "Personal Interview", round3: "Final admission" },
    scholarships: ["Merit scholarships", "Need-based aid", "Industry scholarships"],
    campusLife: { housing: true, studentClubs: 35, internationalism: "High" }
  },
  {
    id: 105,
    name: "Emory Goizueta Business School",
    shortName: "Emory Goizueta",
    location: "Atlanta, GA",
    country: "United States",
    region: "North America",
    established: 1919,
    ranking: { global: 38, ftGlobal: 38, qsGlobal: 42 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "22 months", tuitionFee: "215,000", currency: "USD" },
      emba: { available: true, duration: "22 months", tuitionFee: "198,000", currency: "USD" },
      masters: ["MS Analytics", "MS Finance"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 690, minScore: 600 },
      gre: { accepted: true, averageScore: 320 },
      workExperience: { required: true, averageYears: 4, minYears: 0 },
      englishTest: { toefl: 100, ielts: 7.0 }
    },
    statistics: {
      studentBody: 320,
      internationalStudents: "30%",
      femaleStudents: "41%",
      averageAge: 28,
      classSize: 160
    },
    outcomes: {
      employmentRate: "92%",
      averageSalary: { amount: 148000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "85%",
      topRecruiters: ["McKinsey", "BCG", "Deloitte", "Amazon", "Goldman Sachs"]
    },
    highlights: ["Atlanta business hub", "Collaborative culture", "Strong alumni network", "Innovation focus"],
    specializations: ["Consulting", "Finance", "Marketing", "Operations", "Healthcare"],
    image: "/business-schools/emory-goizueta.jpg",
    website: "https://goizueta.emory.edu",
    applicationDeadlines: { round1: "October 1", round2: "November 15", round3: "January 5" },
    scholarships: ["Merit scholarships", "Consortium fellowships", "Need-based aid"],
    campusLife: { housing: true, studentClubs: 65, internationalism: "High" }
  },
  {
    id: 106,
    name: "University of Washington Foster School",
    shortName: "UW Foster",
    location: "Seattle, WA",
    country: "United States",
    region: "North America",
    established: 1917,
    ranking: { global: 52, ftGlobal: 52, qsGlobal: 56 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "21 months", tuitionFee: "198,000", currency: "USD" },
      emba: { available: true, duration: "21 months", tuitionFee: "175,000", currency: "USD" },
      masters: ["MS Information Systems", "MS Finance"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 665, minScore: 550 },
      gre: { accepted: true, averageScore: 315 },
      workExperience: { required: true, averageYears: 4, minYears: 2 },
      englishTest: { toefl: 100, ielts: 7.0 }
    },
    statistics: {
      studentBody: 220,
      internationalStudents: "35%",
      femaleStudents: "40%",
      averageAge: 28,
      classSize: 110
    },
    outcomes: {
      employmentRate: "90%",
      averageSalary: { amount: 135000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "78%",
      topRecruiters: ["Amazon", "Microsoft", "Deloitte", "Boeing", "Starbucks"]
    },
    highlights: ["Seattle tech hub", "Strong tech recruitment", "Innovation focus", "Pacific Northwest network"],
    specializations: ["Technology", "Consulting", "Finance", "Operations", "Entrepreneurship"],
    image: "/business-schools/uw-foster.jpg",
    website: "https://foster.uw.edu",
    applicationDeadlines: { round1: "October 19", round2: "December 14", round3: "February 15" },
    scholarships: ["Merit scholarships", "Diversity fellowships", "Tech industry awards"],
    campusLife: { housing: true, studentClubs: 45, internationalism: "High" }
  },
  {
    id: 107,
    name: "IIM Kozhikode",
    shortName: "IIM Kozhikode",
    location: "Kozhikode",
    country: "India",
    region: "Asia",
    established: 1996,
    ranking: { global: 90, ftGlobal: 90, qsGlobal: 95 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "24 months", tuitionFee: "20,50,000", currency: "INR" },
      emba: { available: true, duration: "15 months", tuitionFee: "16,50,000", currency: "INR" },
      masters: ["Fellow Program in Management", "EPGP"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 650, minScore: 600 },
      gre: { accepted: true, averageScore: 315 },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 90, ielts: 6.5 }
    },
    statistics: {
      studentBody: 480,
      internationalStudents: "8%",
      femaleStudents: "36%",
      averageAge: 23,
      classSize: 240
    },
    outcomes: {
      employmentRate: "96%",
      averageSalary: { amount: 2300000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "260%",
      topRecruiters: ["McKinsey", "BCG", "Deloitte", "Amazon", "Flipkart"]
    },
    highlights: ["Top tier IIM", "Kerala location", "Strong consulting placement", "Innovation focus"],
    specializations: ["Strategy", "Finance", "Marketing", "Operations", "Analytics"],
    image: "/business-schools/iim-kozhikode.jpg",
    website: "https://www.iimk.ac.in",
    applicationDeadlines: { round1: "CAT Result based", round2: "WAT-PI process", round3: "Final List" },
    scholarships: ["Government scholarships", "Merit-based aid", "Need-based scholarships"],
    campusLife: { housing: true, studentClubs: 35, internationalism: "Medium" }
  },
  {
    id: 108,
    name: "University of Texas McCombs",
    shortName: "UT McCombs",
    location: "Austin, TX",
    country: "United States",
    region: "North America",
    established: 1922,
    ranking: { global: 33, ftGlobal: 33, qsGlobal: 37 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "21 months", tuitionFee: "207,866", currency: "USD" },
      emba: { available: true, duration: "22 months", tuitionFee: "185,000", currency: "USD" },
      masters: ["MS Finance", "MS Technology Commercialization"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 695, minScore: 600 },
      gre: { accepted: true, averageScore: 320 },
      workExperience: { required: true, averageYears: 4, minYears: 0 },
      englishTest: { toefl: 105, ielts: 7.5 }
    },
    statistics: {
      studentBody: 520,
      internationalStudents: "30%",
      femaleStudents: "45%",
      averageAge: 28,
      classSize: 260
    },
    outcomes: {
      employmentRate: "94%",
      averageSalary: { amount: 155000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "85%",
      topRecruiters: ["McKinsey", "BCG", "Amazon", "Dell", "IBM"]
    },
    highlights: ["Austin tech scene", "Entrepreneurship strength", "Energy sector connections", "Strong alumni network"],
    specializations: ["Technology", "Finance", "Consulting", "Energy", "Entrepreneurship"],
    image: "/business-schools/ut-mccombs.jpg",
    website: "https://www.mccombs.utexas.edu",
    applicationDeadlines: { round1: "October 2", round2: "December 4", round3: "February 5" },
    scholarships: ["Merit scholarships", "Texas resident scholarships", "Diversity fellowships"],
    campusLife: { housing: true, studentClubs: 70, internationalism: "High" }
  },
  {
    id: 109,
    name: "Melbourne Business School",
    shortName: "Melbourne BS",
    location: "Melbourne",
    country: "Australia",
    region: "Asia-Pacific",
    established: 1955,
    ranking: { global: 47, ftGlobal: 47, qsGlobal: 51 },
    accreditation: ["AACSB", "EQUIS"],
    programs: {
      mba: { available: true, duration: "17 months", tuitionFee: "130,000", currency: "AUD" },
      emba: { available: true, duration: "18 months", tuitionFee: "155,000", currency: "AUD" },
      masters: ["Master of Management", "Master of Marketing"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 680, minScore: 550 },
      gre: { accepted: true, averageScore: 318 },
      workExperience: { required: true, averageYears: 6, minYears: 4 },
      englishTest: { toefl: 102, ielts: 7.0 }
    },
    statistics: {
      studentBody: 200,
      internationalStudents: "75%",
      femaleStudents: "38%",
      averageAge: 31,
      classSize: 200
    },
    outcomes: {
      employmentRate: "88%",
      averageSalary: { amount: 125000, currency: "AUD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "68%",
      topRecruiters: ["McKinsey", "BCG", "Deloitte", "Commonwealth Bank", "BHP"]
    },
    highlights: ["Melbourne business hub", "Asia-Pacific focus", "Strong research", "Diverse cohort"],
    specializations: ["General Management", "Finance", "Marketing", "Strategy", "Innovation"],
    image: "/business-schools/melbourne-bs.jpg",
    website: "https://mbs.edu",
    applicationDeadlines: { round1: "September 30", round2: "November 30", round3: "January 31" },
    scholarships: ["Melbourne scholarships", "International awards", "Merit-based aid"],
    campusLife: { housing: true, studentClubs: 35, internationalism: "Very High" }
  },
  {
    id: 110,
    name: "MDI Gurgaon",
    shortName: "MDI Gurgaon",
    location: "Gurgaon",
    country: "India",
    region: "Asia",
    established: 1973,
    ranking: { global: 115, ftGlobal: 115, qsGlobal: 120 },
    accreditation: ["AICTE", "NAAC A++"],
    programs: {
      mba: { available: true, duration: "24 months", tuitionFee: "21,50,000", currency: "INR" },
      emba: { available: true, duration: "15 months", tuitionFee: "17,50,000", currency: "INR" },
      masters: ["PGDM", "PGPM"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 640, minScore: 550 },
      gre: { accepted: true, averageScore: 315 },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 85, ielts: 6.5 }
    },
    statistics: {
      studentBody: 540,
      internationalStudents: "10%",
      femaleStudents: "42%",
      averageAge: 23,
      classSize: 180
    },
    outcomes: {
      employmentRate: "95%",
      averageSalary: { amount: 1950000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "240%",
      topRecruiters: ["Deloitte", "EY", "KPMG", "Amazon", "Microsoft"]
    },
    highlights: ["NCR location advantage", "Strong industry connections", "HR specialization", "Excellent placements"],
    specializations: ["Human Resources", "Finance", "Marketing", "Operations", "International Business"],
    image: "/business-schools/mdi-gurgaon.jpg",
    website: "https://www.mdi.ac.in",
    applicationDeadlines: { round1: "CAT/XAT based", round2: "Personal Interview", round3: "Final admission" },
    scholarships: ["Merit scholarships", "Need-based aid", "Industry scholarships"],
    campusLife: { housing: true, studentClubs: 40, internationalism: "Medium" }
  },
  {
    id: 111,
    name: "Boston University Questrom",
    shortName: "BU Questrom",
    location: "Boston, MA",
    country: "United States",
    region: "North America",
    established: 1913,
    ranking: { global: 55, ftGlobal: 55, qsGlobal: 59 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "21 months", tuitionFee: "225,200", currency: "USD" },
      emba: { available: true, duration: "20 months", tuitionFee: "198,000", currency: "USD" },
      masters: ["MS Digital Innovation", "MS Mathematical Finance"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 675, minScore: 550 },
      gre: { accepted: true, averageScore: 318 },
      workExperience: { required: true, averageYears: 4, minYears: 0 },
      englishTest: { toefl: 100, ielts: 7.0 }
    },
    statistics: {
      studentBody: 280,
      internationalStudents: "40%",
      femaleStudents: "43%",
      averageAge: 28,
      classSize: 140
    },
    outcomes: {
      employmentRate: "91%",
      averageSalary: { amount: 140000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "80%",
      topRecruiters: ["Deloitte", "PwC", "Amazon", "Fidelity", "State Street"]
    },
    highlights: ["Boston business hub", "Healthcare sector strength", "Tech innovation", "Global programs"],
    specializations: ["Healthcare", "Technology", "Finance", "Consulting", "Digital Innovation"],
    image: "/business-schools/bu-questrom.jpg",
    website: "https://www.bu.edu/questrom",
    applicationDeadlines: { round1: "October 15", round2: "December 3", round3: "February 4" },
    scholarships: ["Merit scholarships", "Dean's scholarships", "International awards"],
    campusLife: { housing: true, studentClubs: 50, internationalism: "Very High" }
  },
  {
    id: 112,
    name: "Shailesh J. Mehta School of Management, IIT Bombay",
    shortName: "SJMSOM IIT Bombay",
    location: "Mumbai",
    country: "India",
    region: "Asia",
    established: 1995,
    ranking: { global: 100, ftGlobal: 100, qsGlobal: 105 },
    accreditation: ["NAAC A++"],
    programs: {
      mba: { available: true, duration: "24 months", tuitionFee: "12,50,000", currency: "INR" },
      emba: { available: false, duration: "0 months", tuitionFee: "0", currency: "INR" },
      masters: ["PhD Management"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 650, minScore: 600 },
      gre: { accepted: true, averageScore: 320 },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 85, ielts: 6.5 }
    },
    statistics: {
      studentBody: 140,
      internationalStudents: "15%",
      femaleStudents: "35%",
      averageAge: 24,
      classSize: 70
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: { amount: 2650000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "350%",
      topRecruiters: ["Goldman Sachs", "McKinsey", "BCG", "Google", "Microsoft"]
    },
    highlights: ["IIT brand value", "Technology focus", "Small batch size", "Exceptional ROI"],
    specializations: ["Technology Management", "Finance", "Operations", "Strategy", "Analytics"],
    image: "/business-schools/sjmsom-iitb.jpg",
    website: "https://www.som.iitb.ac.in",
    applicationDeadlines: { round1: "CAT Result based", round2: "WAT-PI process", round3: "Final Merit List" },
    scholarships: ["Government scholarships", "Merit-based aid", "Need-based scholarships"],
    campusLife: { housing: true, studentClubs: 20, internationalism: "Medium" }
  },
  {
    id: 113,
    name: "Brigham Young Marriott School",
    shortName: "BYU Marriott",
    location: "Provo, UT",
    country: "United States",
    region: "North America",
    established: 1891,
    ranking: { global: 58, ftGlobal: 58, qsGlobal: 62 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "24 months", tuitionFee: "48,000", currency: "USD" },
      emba: { available: true, duration: "22 months", tuitionFee: "85,000", currency: "USD" },
      masters: ["MS Information Systems", "MAcc"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 640, minScore: 550 },
      gre: { accepted: true, averageScore: 315 },
      workExperience: { required: true, averageYears: 3, minYears: 1 },
      englishTest: { toefl: 100, ielts: 7.0 }
    },
    statistics: {
      studentBody: 320,
      internationalStudents: "25%",
      femaleStudents: "32%",
      averageAge: 27,
      classSize: 160
    },
    outcomes: {
      employmentRate: "92%",
      averageSalary: { amount: 125000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "85%",
      topRecruiters: ["Deloitte", "EY", "Amazon", "Adobe", "Goldman Sachs"]
    },
    highlights: ["Low cost MBA", "Strong ethics focus", "Technology sector", "Excellent ROI"],
    specializations: ["Finance", "Information Systems", "Operations", "Strategy", "Entrepreneurship"],
    image: "/business-schools/byu-marriott.jpg",
    website: "https://marriottschool.byu.edu",
    applicationDeadlines: { round1: "October 15", round2: "December 1", round3: "February 1" },
    scholarships: ["Merit scholarships", "Need-based aid", "Church member discounts"],
    campusLife: { housing: true, studentClubs: 35, internationalism: "Medium" }
  },
  {
    id: 114,
    name: "JBIMS Mumbai",
    shortName: "JBIMS",
    location: "Mumbai",
    country: "India",
    region: "Asia",
    established: 1965,
    ranking: { global: 108, ftGlobal: 108, qsGlobal: 112 },
    accreditation: ["AICTE", "University of Mumbai"],
    programs: {
      mba: { available: true, duration: "24 months", tuitionFee: "4,84,000", currency: "INR" },
      emba: { available: false, duration: "0 months", tuitionFee: "0", currency: "INR" },
      masters: ["MMS", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 650, minScore: 600 },
      gre: { accepted: false, averageScore: 0 },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 80, ielts: 6.0 }
    },
    statistics: {
      studentBody: 240,
      internationalStudents: "5%",
      femaleStudents: "45%",
      averageAge: 22,
      classSize: 120
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: { amount: 2800000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "380%",
      topRecruiters: ["Goldman Sachs", "JPMorgan", "McKinsey", "Bain", "Google"]
    },
    highlights: ["Mumbai financial capital", "Exceptional ROI", "Strong finance placement", "Legacy institution"],
    specializations: ["Finance", "Marketing", "Operations", "HR", "International Business"],
    image: "/business-schools/jbims.jpg",
    website: "https://www.jbims.edu",
    applicationDeadlines: { round1: "Maharashtra CET based", round2: "CAP process", round3: "Final admission" },
    scholarships: ["Government scholarships", "Merit-based aid", "Need-based scholarships"],
    campusLife: { housing: false, studentClubs: 25, internationalism: "Low" }
  },
  {
    id: 115,
    name: "Washington University Olin",
    shortName: "WashU Olin",
    location: "St. Louis, MO",
    country: "United States",
    region: "North America",
    established: 1917,
    ranking: { global: 43, ftGlobal: 43, qsGlobal: 47 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "22 months", tuitionFee: "212,000", currency: "USD" },
      emba: { available: true, duration: "22 months", tuitionFee: "188,000", currency: "USD" },
      masters: ["MS Finance", "MS Supply Chain"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 680, minScore: 600 },
      gre: { accepted: true, averageScore: 320 },
      workExperience: { required: true, averageYears: 4, minYears: 0 },
      englishTest: { toefl: 100, ielts: 7.0 }
    },
    statistics: {
      studentBody: 280,
      internationalStudents: "30%",
      femaleStudents: "40%",
      averageAge: 28,
      classSize: 140
    },
    outcomes: {
      employmentRate: "90%",
      averageSalary: { amount: 135000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "75%",
      topRecruiters: ["Deloitte", "PwC", "Amazon", "Emerson", "Anheuser-Busch"]
    },
    highlights: ["Healthcare sector strength", "Small class sizes", "Collaborative culture", "Midwest connections"],
    specializations: ["Healthcare", "Finance", "Marketing", "Operations", "Consulting"],
    image: "/business-schools/washu-olin.jpg",
    website: "https://olin.wustl.edu",
    applicationDeadlines: { round1: "October 1", round2: "November 15", round3: "January 15" },
    scholarships: ["Merit scholarships", "Dean's fellowships", "Diversity awards"],
    campusLife: { housing: true, studentClubs: 40, internationalism: "High" }
  },
  {
    id: 116,
    name: "University of North Carolina Kenan-Flagler",
    shortName: "UNC Kenan-Flagler",
    location: "Chapel Hill, NC",
    country: "United States",
    region: "North America",
    established: 1919,
    ranking: { global: 41, ftGlobal: 41, qsGlobal: 45 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "21 months", tuitionFee: "206,898", currency: "USD" },
      emba: { available: true, duration: "19 months", tuitionFee: "168,000", currency: "USD" },
      masters: ["MAC", "MS Real Estate"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 695, minScore: 600 },
      gre: { accepted: true, averageScore: 320 },
      workExperience: { required: true, averageYears: 4, minYears: 0 },
      englishTest: { toefl: 100, ielts: 7.0 }
    },
    statistics: {
      studentBody: 580,
      internationalStudents: "28%",
      femaleStudents: "44%",
      averageAge: 28,
      classSize: 290
    },
    outcomes: {
      employmentRate: "93%",
      averageSalary: { amount: 145000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "82%",
      topRecruiters: ["Deloitte", "BCG", "Amazon", "Bank of America", "Wells Fargo"]
    },
    highlights: ["Research Triangle location", "Strong finance program", "Sustainable enterprise", "Team-based learning"],
    specializations: ["Finance", "Consulting", "Real Estate", "Sustainable Enterprise", "Marketing"],
    image: "/business-schools/unc-kenan-flagler.jpg",
    website: "https://www.kenan-flagler.unc.edu",
    applicationDeadlines: { round1: "October 15", round2: "January 5", round3: "March 15" },
    scholarships: ["Merit fellowships", "Consortium fellowships", "Forté fellowships"],
    campusLife: { housing: true, studentClubs: 60, internationalism: "High" }
  },
  {
    id: 117,
    name: "IIM Shillong",
    shortName: "IIM Shillong",
    location: "Shillong",
    country: "India",
    region: "Asia",
    established: 2007,
    ranking: { global: 92, ftGlobal: 92, qsGlobal: 97 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "24 months", tuitionFee: "19,50,000", currency: "INR" },
      emba: { available: true, duration: "15 months", tuitionFee: "15,00,000", currency: "INR" },
      masters: ["Fellow Program in Management"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 640, minScore: 600 },
      gre: { accepted: true, averageScore: 315 },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 90, ielts: 6.5 }
    },
    statistics: {
      studentBody: 360,
      internationalStudents: "10%",
      femaleStudents: "40%",
      averageAge: 23,
      classSize: 180
    },
    outcomes: {
      employmentRate: "94%",
      averageSalary: { amount: 2100000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "250%",
      topRecruiters: ["Deloitte", "KPMG", "Amazon", "Flipkart", "Wipro"]
    },
    highlights: ["Northeast India location", "Innovation focus", "Rural management specialization", "Diverse cohort"],
    specializations: ["Rural Management", "Innovation", "Finance", "Marketing", "Operations"],
    image: "/business-schools/iim-shillong.jpg",
    website: "https://www.iimshillong.ac.in",
    applicationDeadlines: { round1: "CAT Result based", round2: "WAT-PI process", round3: "Final List" },
    scholarships: ["Government scholarships", "Merit-based aid", "Northeast region scholarships"],
    campusLife: { housing: true, studentClubs: 30, internationalism: "Medium" }
  },
  {
    id: 118,
    name: "Indiana Kelley School of Business",
    shortName: "Indiana Kelley",
    location: "Bloomington, IN",
    country: "United States",
    region: "North America",
    established: 1920,
    ranking: { global: 54, ftGlobal: 54, qsGlobal: 58 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "21 months", tuitionFee: "188,500", currency: "USD" },
      emba: { available: true, duration: "21 months", tuitionFee: "165,000", currency: "USD" },
      masters: ["MS Finance", "MS Marketing"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 665, minScore: 550 },
      gre: { accepted: true, averageScore: 315 },
      workExperience: { required: true, averageYears: 4, minYears: 0 },
      englishTest: { toefl: 100, ielts: 7.0 }
    },
    statistics: {
      studentBody: 380,
      internationalStudents: "35%",
      femaleStudents: "42%",
      averageAge: 28,
      classSize: 190
    },
    outcomes: {
      employmentRate: "92%",
      averageSalary: { amount: 130000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "78%",
      topRecruiters: ["Deloitte", "EY", "Amazon", "Eli Lilly", "Cummins"]
    },
    highlights: ["Strong Midwest network", "Finance and consulting strength", "Academy structure", "Global immersion"],
    specializations: ["Finance", "Consulting", "Marketing", "Operations", "Strategy"],
    image: "/business-schools/indiana-kelley.jpg",
    website: "https://kelley.iu.edu",
    applicationDeadlines: { round1: "October 15", round2: "December 5", round3: "February 1" },
    scholarships: ["Merit scholarships", "Consortium fellowships", "Indiana resident scholarships"],
    campusLife: { housing: true, studentClubs: 55, internationalism: "High" }
  },
  {
    id: 119,
    name: "CUHK Business School",
    shortName: "CUHK",
    location: "Hong Kong",
    country: "Hong Kong",
    region: "Asia-Pacific",
    established: 1963,
    ranking: { global: 49, ftGlobal: 49, qsGlobal: 53 },
    accreditation: ["AACSB", "EQUIS"],
    programs: {
      mba: { available: true, duration: "16 months", tuitionFee: "680,000", currency: "HKD" },
      emba: { available: true, duration: "20 months", tuitionFee: "998,000", currency: "HKD" },
      masters: ["MSc Finance", "MSc Management"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 650, minScore: 600 },
      gre: { accepted: true, averageScore: 318 },
      workExperience: { required: true, averageYears: 5, minYears: 2 },
      englishTest: { toefl: 100, ielts: 6.5 }
    },
    statistics: {
      studentBody: 140,
      internationalStudents: "85%",
      femaleStudents: "38%",
      averageAge: 29,
      classSize: 140
    },
    outcomes: {
      employmentRate: "89%",
      averageSalary: { amount: 120000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "65%",
      topRecruiters: ["Goldman Sachs", "JPMorgan", "McKinsey", "Google", "Alibaba"]
    },
    highlights: ["Hong Kong financial hub", "China gateway", "Strong finance program", "Global network"],
    specializations: ["Finance", "Strategy", "Marketing", "Operations", "Entrepreneurship"],
    image: "/business-schools/cuhk.jpg",
    website: "https://www.bschool.cuhk.edu.hk",
    applicationDeadlines: { round1: "October 31", round2: "December 31", round3: "March 15" },
    scholarships: ["CUHK scholarships", "International awards", "Asian leadership awards"],
    campusLife: { housing: true, studentClubs: 35, internationalism: "Extremely High" }
  },
  {
    id: 120,
    name: "Symbiosis Institute of Business Management",
    shortName: "SIBM Pune",
    location: "Pune",
    country: "India",
    region: "Asia",
    established: 1978,
    ranking: { global: 118, ftGlobal: 118, qsGlobal: 123 },
    accreditation: ["NAAC A++"],
    programs: {
      mba: { available: true, duration: "24 months", tuitionFee: "20,83,000", currency: "INR" },
      emba: { available: true, duration: "15 months", tuitionFee: "17,50,000", currency: "INR" },
      masters: ["PGDM", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 630, minScore: 550 },
      gre: { accepted: true, averageScore: 310 },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 85, ielts: 6.5 }
    },
    statistics: {
      studentBody: 360,
      internationalStudents: "12%",
      femaleStudents: "45%",
      averageAge: 23,
      classSize: 180
    },
    outcomes: {
      employmentRate: "93%",
      averageSalary: { amount: 1750000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "220%",
      topRecruiters: ["TCS", "Infosys", "Deloitte", "KPMG", "Amazon"]
    },
    highlights: ["Pune IT hub", "Strong industry connections", "International exposure", "Holistic development"],
    specializations: ["Finance", "Marketing", "Operations", "HR", "International Business"],
    image: "/business-schools/sibm-pune.jpg",
    website: "https://www.sibmpune.edu.in",
    applicationDeadlines: { round1: "SNAP based", round2: "Personal Interview", round3: "Final admission" },
    scholarships: ["Merit scholarships", "Need-based aid", "Diversity scholarships"],
    campusLife: { housing: true, studentClubs: 45, internationalism: "Medium" }
  },
  {
    id: 121,
    name: "Arizona State Carey School",
    shortName: "ASU Carey",
    location: "Tempe, AZ",
    country: "United States",
    region: "North America",
    established: 1962,
    ranking: { global: 56, ftGlobal: 56, qsGlobal: 60 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "21 months", tuitionFee: "174,000", currency: "USD" },
      emba: { available: true, duration: "22 months", tuitionFee: "158,000", currency: "USD" },
      masters: ["MS Business Analytics", "MS Supply Chain"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 660, minScore: 550 },
      gre: { accepted: true, averageScore: 315 },
      workExperience: { required: true, averageYears: 4, minYears: 0 },
      englishTest: { toefl: 100, ielts: 7.0 }
    },
    statistics: {
      studentBody: 240,
      internationalStudents: "40%",
      femaleStudents: "38%",
      averageAge: 28,
      classSize: 120
    },
    outcomes: {
      employmentRate: "90%",
      averageSalary: { amount: 125000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "75%",
      topRecruiters: ["Intel", "Amazon", "Deloitte", "American Express", "PwC"]
    },
    highlights: ["Innovation focus", "Supply chain excellence", "Tech industry connections", "Sustainability emphasis"],
    specializations: ["Supply Chain", "Analytics", "Innovation", "Finance", "Marketing"],
    image: "/business-schools/asu-carey.jpg",
    website: "https://wpcarey.asu.edu",
    applicationDeadlines: { round1: "October 15", round2: "December 15", round3: "February 15" },
    scholarships: ["Merit scholarships", "Dean's fellowships", "Sustainability awards"],
    campusLife: { housing: true, studentClubs: 50, internationalism: "High" }
  },
  {
    id: 122,
    name: "Nirma University Institute of Management",
    shortName: "Nirma University",
    location: "Ahmedabad",
    country: "India",
    region: "Asia",
    established: 1996,
    ranking: { global: 132, ftGlobal: 132, qsGlobal: 137 },
    accreditation: ["NAAC A++"],
    programs: {
      mba: { available: true, duration: "24 months", tuitionFee: "11,40,000", currency: "INR" },
      emba: { available: true, duration: "15 months", tuitionFee: "9,50,000", currency: "INR" },
      masters: ["PGDM", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 620, minScore: 550 },
      gre: { accepted: true, averageScore: 310 },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 80, ielts: 6.0 }
    },
    statistics: {
      studentBody: 240,
      internationalStudents: "8%",
      femaleStudents: "42%",
      averageAge: 23,
      classSize: 120
    },
    outcomes: {
      employmentRate: "91%",
      averageSalary: { amount: 1150000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "160%",
      topRecruiters: ["TCS", "Infosys", "Wipro", "L&T", "Reliance"]
    },
    highlights: ["Gujarat business hub", "Industry partnerships", "Value for money", "Strong alumni network"],
    specializations: ["Finance", "Marketing", "Operations", "HR", "International Business"],
    image: "/business-schools/nirma-university.jpg",
    website: "https://www.nirmauni.ac.in",
    applicationDeadlines: { round1: "CAT/MAT based", round2: "Personal Interview", round3: "Final admission" },
    scholarships: ["Merit scholarships", "Need-based aid", "Industry scholarships"],
    campusLife: { housing: true, studentClubs: 30, internationalism: "Low" }
  },
  {
    id: 123,
    name: "University of Rochester Simon School",
    shortName: "Rochester Simon",
    location: "Rochester, NY",
    country: "United States",
    region: "North America",
    established: 1962,
    ranking: { global: 59, ftGlobal: 59, qsGlobal: 63 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "17 months", tuitionFee: "195,000", currency: "USD" },
      emba: { available: true, duration: "20 months", tuitionFee: "168,000", currency: "USD" },
      masters: ["MS Finance", "MS Marketing Analytics"], phd: true
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 665, minScore: 550 },
      gre: { accepted: true, averageScore: 315 },
      workExperience: { required: true, averageYears: 4, minYears: 0 },
      englishTest: { toefl: 100, ielts: 7.0 }
    },
    statistics: {
      studentBody: 200,
      internationalStudents: "50%",
      femaleStudents: "35%",
      averageAge: 28,
      classSize: 100
    },
    outcomes: {
      employmentRate: "88%",
      averageSalary: { amount: 125000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "72%",
      topRecruiters: ["Deloitte", "PwC", "Amazon", "Xerox", "Paychex"]
    },
    highlights: ["Small class sizes", "Finance strength", "Customizable curriculum", "Strong quant focus"],
    specializations: ["Finance", "Analytics", "Consulting", "Healthcare", "Operations"],
    image: "/business-schools/rochester-simon.jpg",
    website: "https://simon.rochester.edu",
    applicationDeadlines: { round1: "October 15", round2: "December 1", round3: "February 1" },
    scholarships: ["Merit scholarships", "Simon fellowships", "International awards"],
    campusLife: { housing: true, studentClubs: 35, internationalism: "Very High" }
  },
  {
    id: 124,
    name: "KJ Somaiya Institute of Management",
    shortName: "KJ Somaiya",
    location: "Mumbai",
    country: "India",
    region: "Asia",
    established: 1981,
    ranking: { global: 128, ftGlobal: 128, qsGlobal: 133 },
    accreditation: ["NAAC A++"],
    programs: {
      mba: { available: true, duration: "24 months", tuitionFee: "17,80,000", currency: "INR" },
      emba: { available: true, duration: "15 months", tuitionFee: "14,50,000", currency: "INR" },
      masters: ["PGDM", "PhD"], phd: true
    },
    admissionRequirements: {
      gmat: { required: false, averageScore: 630, minScore: 550 },
      gre: { accepted: true, averageScore: 310 },
      workExperience: { required: false, averageYears: 0, minYears: 0 },
      englishTest: { toefl: 80, ielts: 6.0 }
    },
    statistics: {
      studentBody: 360,
      internationalStudents: "10%",
      femaleStudents: "40%",
      averageAge: 23,
      classSize: 180
    },
    outcomes: {
      employmentRate: "92%",
      averageSalary: { amount: 1650000, currency: "INR", timeFrame: "3 months post-graduation" },
      salaryIncrease: "210%",
      topRecruiters: ["HDFC Bank", "ICICI Bank", "TCS", "L&T", "Mahindra"]
    },
    highlights: ["Mumbai financial hub", "Strong banking connections", "Industry orientation", "Value-based education"],
    specializations: ["Banking & Finance", "Marketing", "Operations", "HR", "International Business"],
    image: "/business-schools/kj-somaiya.jpg",
    website: "https://www.somaiya.edu",
    applicationDeadlines: { round1: "CAT/XAT based", round2: "Personal Interview", round3: "Final admission" },
    scholarships: ["Merit scholarships", "Need-based aid", "Community scholarships"],
    campusLife: { housing: true, studentClubs: 40, internationalism: "Medium" }
  },
  {
    id: 125,
    name: "Babson Olin Graduate School",
    shortName: "Babson Olin",
    location: "Wellesley, MA",
    country: "United States",
    region: "North America",
    established: 1919,
    ranking: { global: 62, ftGlobal: 62, qsGlobal: 66 },
    accreditation: ["AACSB"],
    programs: {
      mba: { available: true, duration: "21 months", tuitionFee: "220,000", currency: "USD" },
      emba: { available: true, duration: "22 months", tuitionFee: "195,000", currency: "USD" },
      masters: ["MS Management", "MS Entrepreneurship"], phd: false
    },
    admissionRequirements: {
      gmat: { required: true, averageScore: 640, minScore: 550 },
      gre: { accepted: true, averageScore: 315 },
      workExperience: { required: true, averageYears: 4, minYears: 0 },
      englishTest: { toefl: 100, ielts: 7.0 }
    },
    statistics: {
      studentBody: 180,
      internationalStudents: "45%",
      femaleStudents: "40%",
      averageAge: 28,
      classSize: 90
    },
    outcomes: {
      employmentRate: "85%",
      averageSalary: { amount: 125000, currency: "USD", timeFrame: "3 months post-graduation" },
      salaryIncrease: "70%",
      topRecruiters: ["Amazon", "Deloitte", "PwC", "Accenture", "State Street"]
    },
    highlights: ["Entrepreneurship excellence", "#1 Entrepreneurship ranking", "Small cohort", "Action-based learning"],
    specializations: ["Entrepreneurship", "Innovation", "Strategy", "Marketing", "Finance"],
    image: "/business-schools/babson-olin.jpg",
    website: "https://www.babson.edu/academics/graduate-school/",
    applicationDeadlines: { round1: "October 15", round2: "December 1", round3: "February 15" },
    scholarships: ["Merit scholarships", "Entrepreneurship fellowships", "Diversity awards"],
    campusLife: { housing: true, studentClubs: 25, internationalism: "Very High" }
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