// Business Schools Data - Top 200 Global List
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

export const businessSchools: BusinessSchool[] = [
  // TOP 10 GLOBAL BUSINESS SCHOOLS
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
    image: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=400&h=300&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=300&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=400&h=300&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&h=300&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&q=80",
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
  },
  // ADDITIONAL TOP SCHOOLS (6-50)
  {
    id: 6,
    name: "MIT Sloan School of Management",
    shortName: "MIT Sloan",
    location: "Cambridge, MA",
    country: "USA",
    region: "North America",
    established: 1914,
    ranking: {
      global: 6,
      ftGlobal: 6,
      qsGlobal: 6,
      usNews: 4
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "80,240",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "198,000"
      },
      masters: ["Master of Finance", "Master of Business Analytics"],
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
        averageScore: 327
      },
      workExperience: {
        required: true,
        averageYears: 4.7,
        minYears: 2
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 816,
      internationalStudents: "40%",
      femaleStudents: "46%",
      averageAge: 28,
      classSize: 408
    },
    outcomes: {
      employmentRate: "95%",
      averageSalary: {
        amount: 172000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "108%",
      topRecruiters: ["McKinsey", "BCG", "Amazon", "Google", "Apple"]
    },
    highlights: [
      "Strong technology and innovation focus",
      "Action learning approach",
      "MIT ecosystem access",
      "Entrepreneurship leadership"
    ],
    specializations: [
      "Technology",
      "Innovation",
      "Finance",
      "Entrepreneurship",
      "Operations",
      "Strategy"
    ],
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop&q=80",
    website: "https://mitsloan.mit.edu",
    applicationDeadlines: {
      round1: "October 3",
      round2: "January 17",
      final: "April 15"
    },
    scholarships: [
      "MIT Sloan Fellowship",
      "Forté Fellowship",
      "Need-based financial aid",
      "Merit scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 50,
      internationalism: "High"
    }
  },
  {
    id: 7,
    name: "University of Chicago Booth School of Business",
    shortName: "Chicago Booth",
    location: "Chicago, IL",
    country: "USA",
    region: "North America",
    established: 1898,
    ranking: {
      global: 7,
      ftGlobal: 7,
      qsGlobal: 7,
      usNews: 5
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "76,920",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "22 months",
        tuitionFee: "215,000"
      },
      masters: ["Master in Computational Analysis"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 731,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 328
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
      studentBody: 1180,
      internationalStudents: "38%",
      femaleStudents: "44%",
      averageAge: 28,
      classSize: 590
    },
    outcomes: {
      employmentRate: "94%",
      averageSalary: {
        amount: 170000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "96%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Deloitte"]
    },
    highlights: [
      "Flexible curriculum",
      "Strong economics foundation",
      "Nobel Prize-winning faculty",
      "Global campuses"
    ],
    specializations: [
      "Finance",
      "Economics",
      "Strategy",
      "Marketing",
      "Operations",
      "Entrepreneurship"
    ],
    image: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400&h=300&fit=crop&q=80",
    website: "https://www.chicagobooth.edu",
    applicationDeadlines: {
      round1: "September 26",
      round2: "January 8",
      round3: "April 14"
    },
    scholarships: [
      "Chicago Scholars",
      "Dean's scholarships",
      "Need-based aid",
      "International scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 85,
      internationalism: "High"
    }
  },
  {
    id: 8,
    name: "Northwestern Kellogg School of Management",
    shortName: "Kellogg",
    location: "Evanston, IL",
    country: "USA",
    region: "North America",
    established: 1908,
    ranking: {
      global: 8,
      ftGlobal: 8,
      qsGlobal: 8,
      usNews: 6
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "78,870",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "26 months",
        tuitionFee: "220,000"
      },
      masters: ["Master in Management Studies"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 732,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 329
      },
      workExperience: {
        required: true,
        averageYears: 5.2,
        minYears: 2
      },
      englishTest: {
        toefl: 109,
        ielts: 7.5
      }
    },
    statistics: {
      studentBody: 1386,
      internationalStudents: "35%",
      femaleStudents: "48%",
      averageAge: 28,
      classSize: 693
    },
    outcomes: {
      employmentRate: "96%",
      averageSalary: {
        amount: 168000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "103%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Amazon", "Microsoft"]
    },
    highlights: [
      "Marketing excellence",
      "Collaborative culture",
      "Global experience requirement",
      "Strong alumni network"
    ],
    specializations: [
      "Marketing",
      "Management",
      "Finance",
      "Strategy",
      "Operations",
      "Social Impact"
    ],
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=300&fit=crop&q=80",
    website: "https://www.kellogg.northwestern.edu",
    applicationDeadlines: {
      round1: "September 19",
      round2: "January 5",
      round3: "April 10"
    },
    scholarships: [
      "Merit scholarships",
      "Need-based aid",
      "Diversity scholarships",
      "International fellowships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 90,
      internationalism: "High"
    }
  },
  {
    id: 9,
    name: "Columbia Business School",
    shortName: "Columbia",
    location: "New York, NY",
    country: "USA",
    region: "North America",
    established: 1916,
    ranking: {
      global: 9,
      ftGlobal: 9,
      qsGlobal: 9,
      usNews: 7
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "81,000",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "233,880"
      },
      masters: ["Master of Science programs"],
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
        averageScore: 326
      },
      workExperience: {
        required: true,
        averageYears: 5.3,
        minYears: 2
      },
      englishTest: {
        toefl: 105,
        ielts: 7.5
      }
    },
    statistics: {
      studentBody: 1296,
      internationalStudents: "47%",
      femaleStudents: "47%",
      averageAge: 28,
      classSize: 648
    },
    outcomes: {
      employmentRate: "92%",
      averageSalary: {
        amount: 175000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "102%",
      topRecruiters: ["Goldman Sachs", "McKinsey", "JPMorgan", "BCG", "Amazon"]
    },
    highlights: [
      "New York City location",
      "Finance specialization",
      "Value investing program",
      "Real estate program"
    ],
    specializations: [
      "Finance",
      "Real Estate",
      "Value Investing",
      "Entrepreneurship",
      "Marketing",
      "Consulting"
    ],
    image: "https://images.unsplash.com/photo-1551474083-7b3bc61ba400?w=400&h=300&fit=crop&q=80",
    website: "https://www8.gsb.columbia.edu",
    applicationDeadlines: {
      round1: "September 12",
      round2: "January 8",
      round3: "April 15"
    },
    scholarships: [
      "Merit fellowships",
      "Need-based aid",
      "Forte Fellowship",
      "International scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 75,
      internationalism: "Very High"
    }
  },
  {
    id: 10,
    name: "Haas School of Business, UC Berkeley",
    shortName: "Berkeley Haas",
    location: "Berkeley, CA",
    country: "USA",
    region: "North America",
    established: 1898,
    ranking: {
      global: 10,
      ftGlobal: 10,
      qsGlobal: 10,
      usNews: 8
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "68,444",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "19 months",
        tuitionFee: "201,530"
      },
      masters: ["Master of Financial Engineering"],
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
        averageScore: 325
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
      studentBody: 508,
      internationalStudents: "39%",
      femaleStudents: "44%",
      averageAge: 28,
      classSize: 254
    },
    outcomes: {
      employmentRate: "89%",
      averageSalary: {
        amount: 165000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "90%",
      topRecruiters: ["Google", "Apple", "McKinsey", "Amazon", "Meta"]
    },
    highlights: [
      "Silicon Valley proximity",
      "Social impact focus",
      "Defining leadership principles",
      "Public university advantage"
    ],
    specializations: [
      "Technology",
      "Social Impact",
      "Finance",
      "Entrepreneurship",
      "Strategy",
      "Marketing"
    ],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop&q=80",
    website: "https://haas.berkeley.edu",
    applicationDeadlines: {
      round1: "September 21",
      round2: "January 11",
      round3: "March 28"
    },
    scholarships: [
      "Berkeley MBA Fellowship",
      "Consortium Fellowship",
      "Need-based aid",
      "Public service scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 60,
      internationalism: "High"
    }
  },
  // BUSINESS SCHOOLS RANKED 11-50
  {
    id: 11,
    name: "Yale School of Management",
    shortName: "Yale SOM",
    location: "New Haven, CT",
    country: "USA",
    region: "North America",
    established: 1976,
    ranking: {
      global: 11,
      ftGlobal: 11,
      qsGlobal: 11,
      usNews: 9
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "73,900",
        currency: "USD"
      },
      emba: {
        available: false,
        duration: "N/A",
        tuitionFee: "N/A"
      },
      masters: ["Master of Management Studies", "Global Executive MBA"],
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
        averageYears: 5.3,
        minYears: 2
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 720,
      internationalStudents: "46%",
      femaleStudents: "48%",
      averageAge: 28,
      classSize: 360
    },
    outcomes: {
      employmentRate: "91%",
      averageSalary: {
        amount: 162000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "86%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Amazon"]
    },
    highlights: [
      "Integrated curriculum",
      "Non-profit management focus",
      "Global network for advanced management",
      "Ivy League prestige"
    ],
    specializations: [
      "Nonprofit Management",
      "Asset Management", 
      "Finance",
      "Consulting",
      "Sustainability",
      "Healthcare"
    ],
    image: "https://images.unsplash.com/photo-1609166214667-34f7c52e8e16?w=400&h=300&fit=crop&q=80",
    website: "https://som.yale.edu",
    applicationDeadlines: {
      round1: "September 14",
      round2: "January 5",
      round3: "April 18"
    },
    scholarships: [
      "Dean's fellowships",
      "Need-based aid",
      "International scholarships",
      "Public service scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 45,
      internationalism: "Very High"
    }
  },
  {
    id: 12,
    name: "Duke University Fuqua School of Business",
    shortName: "Fuqua",
    location: "Durham, NC",
    country: "USA",
    region: "North America",
    established: 1969,
    ranking: {
      global: 12,
      ftGlobal: 12,
      qsGlobal: 12,
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
        tuitionFee: "185,000"
      },
      masters: ["Master of Quantitative Management", "Master of Management Studies"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 701,
        minScore: 590
      },
      gre: {
        accepted: true,
        averageScore: 319
      },
      workExperience: {
        required: true,
        averageYears: 5.4,
        minYears: 2
      },
      englishTest: {
        toefl: 105,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 880,
      internationalStudents: "34%",
      femaleStudents: "44%",
      averageAge: 28,
      classSize: 440
    },
    outcomes: {
      employmentRate: "94%",
      averageSalary: {
        amount: 155000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "95%",
      topRecruiters: ["McKinsey", "BCG", "Deloitte", "Amazon", "Microsoft"]
    },
    highlights: [
      "Team Fuqua culture",
      "Global academic centers",
      "Health sector management",
      "Research Triangle location"
    ],
    specializations: [
      "Healthcare",
      "Finance",
      "Consulting",
      "Marketing",
      "Operations",
      "Entrepreneurship"
    ],
    image: "https://images.unsplash.com/photo-1599670409242-c02f6825dafb?w=400&h=300&fit=crop&q=80",
    website: "https://www.fuqua.duke.edu",
    applicationDeadlines: {
      round1: "September 19",
      round2: "January 3",
      round3: "March 20"
    },
    scholarships: [
      "Fuqua scholars",
      "Need-based aid",
      "Forte Fellowship",
      "International fellowships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 50,
      internationalism: "High"
    }
  },
  {
    id: 13,
    name: "New York University Stern School of Business",
    shortName: "NYU Stern",
    location: "New York, NY",
    country: "USA",
    region: "North America",
    established: 1900,
    ranking: {
      global: 13,
      ftGlobal: 13,
      qsGlobal: 13,
      usNews: 11
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "80,262",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "22 months",
        tuitionFee: "229,086"
      },
      masters: ["Master of Science in various fields"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 721,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 324
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
      studentBody: 796,
      internationalStudents: "42%",
      femaleStudents: "42%",
      averageAge: 28,
      classSize: 398
    },
    outcomes: {
      employmentRate: "95%",
      averageSalary: {
        amount: 175000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "98%",
      topRecruiters: ["Goldman Sachs", "JPMorgan", "McKinsey", "Amazon", "Google"]
    },
    highlights: [
      "New York City location",
      "Finance specialization",
      "Global study opportunities",
      "Industry connections"
    ],
    specializations: [
      "Finance",
      "Marketing",
      "Strategy",
      "Data Science",
      "Entrepreneurship",
      "Real Estate"
    ],
    image: "https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?w=400&h=300&fit=crop&q=80",
    website: "https://www.stern.nyu.edu",
    applicationDeadlines: {
      round1: "September 15",
      round2: "November 15",
      round3: "January 15"
    },
    scholarships: [
      "Dean's merit scholarships",
      "Need-based aid", 
      "Forte Fellowship",
      "International scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 65,
      internationalism: "Very High"
    }
  },
  {
    id: 14,
    name: "Oxford Saïd Business School",
    shortName: "Oxford Saïd",
    location: "Oxford",
    country: "UK",
    region: "Europe",
    established: 1996,
    ranking: {
      global: 14,
      ftGlobal: 14,
      qsGlobal: 14,
      regional: 3
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "12 months",
        tuitionFee: "69,510",
        currency: "GBP"
      },
      emba: {
        available: true,
        duration: "21 months",
        tuitionFee: "95,000"
      },
      masters: ["Master of Science in various fields"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 690,
        minScore: 650
      },
      gre: {
        accepted: true,
        averageScore: 315
      },
      workExperience: {
        required: true,
        averageYears: 6.8,
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
      femaleStudents: "39%",
      averageAge: 29,
      classSize: 330
    },
    outcomes: {
      employmentRate: "89%",
      averageSalary: {
        amount: 128000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "88%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Amazon", "Google"]
    },
    highlights: [
      "Oxford University prestige",
      "One-year intensive program",
      "Strong European network",
      "Research excellence"
    ],
    specializations: [
      "Strategy",
      "Finance",
      "Entrepreneurship",
      "Social Innovation",
      "Technology",
      "Consulting"
    ],
    image: "https://images.unsplash.com/photo-1533834681848-0cad92e1e6a5?w=400&h=300&fit=crop&q=80",
    website: "https://www.sbs.ox.ac.uk",
    applicationDeadlines: {
      round1: "September 8",
      round2: "November 3",
      round3: "January 5"
    },
    scholarships: [
      "Skoll scholarships",
      "Saïd Foundation scholarships",
      "Oxford scholarships",
      "Regional fellowships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 40,
      internationalism: "Extremely High"
    }
  },
  {
    id: 15,
    name: "Cambridge Judge Business School",
    shortName: "Cambridge Judge",
    location: "Cambridge",
    country: "UK", 
    region: "Europe",
    established: 1990,
    ranking: {
      global: 15,
      ftGlobal: 15,
      qsGlobal: 15,
      regional: 4
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
      masters: ["Master of Finance", "Master of Accounting"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 692,
        minScore: 620
      },
      gre: {
        accepted: true,
        averageScore: 316
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
      studentBody: 202,
      internationalStudents: "93%",
      femaleStudents: "32%",
      averageAge: 30,
      classSize: 202
    },
    outcomes: {
      employmentRate: "90%",
      averageSalary: {
        amount: 126000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "97%",
      topRecruiters: ["McKinsey", "BCG", "Amazon", "Google", "Microsoft"]
    },
    highlights: [
      "Cambridge University prestige",
      "Technology and innovation focus",
      "Small class size",
      "Entrepreneurship ecosystem"
    ],
    specializations: [
      "Technology",
      "Finance", 
      "Consulting",
      "Entrepreneurship",
      "Strategy",
      "Operations"
    ],
    image: "https://images.unsplash.com/photo-1564672284862-7ecabaa50ee0?w=400&h=300&fit=crop&q=80",
    website: "https://www.jbs.cam.ac.uk",
    applicationDeadlines: {
      round1: "October 3",
      round2: "December 5",
      round3: "February 6"
    },
    scholarships: [
      "Cambridge scholarships",
      "Reliance scholarships",
      "Regional scholarships",
      "Need-based aid"
    ],
    campusLife: {
      housing: true,
      studentClubs: 30,
      internationalism: "Extremely High"
    }
  },
  {
    id: 16,
    name: "IE Business School",
    shortName: "IE",
    location: "Madrid",
    country: "Spain",
    region: "Europe",
    established: 1973,
    ranking: {
      global: 16,
      ftGlobal: 16,
      qsGlobal: 16,
      regional: 5
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "11 months",
        tuitionFee: "79,200",
        currency: "EUR"
      },
      emba: {
        available: true,
        duration: "13 months",
        tuitionFee: "85,500"
      },
      masters: ["Master in Management", "Master in Finance"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 680,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 314
      },
      workExperience: {
        required: true,
        averageYears: 5.8,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 400,
      internationalStudents: "92%",
      femaleStudents: "35%",
      averageAge: 29,
      classSize: 400
    },
    outcomes: {
      employmentRate: "88%",
      averageSalary: {
        amount: 115000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "84%",
      topRecruiters: ["McKinsey", "BCG", "Amazon", "Google", "Telefónica"]
    },
    highlights: [
      "Innovation and entrepreneurship focus",
      "Highly international program",
      "Technology integration",
      "Madrid location advantage"
    ],
    specializations: [
      "Entrepreneurship",
      "Innovation",
      "Digital Business",
      "Finance",
      "Strategy",
      "Marketing"
    ],
    image: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=400&h=300&fit=crop&q=80",
    website: "https://www.ie.edu",
    applicationDeadlines: {
      round1: "October 15",
      round2: "December 15",
      round3: "February 15"
    },
    scholarships: [
      "IE Foundation scholarships",
      "Merit scholarships",
      "Diversity scholarships",
      "Regional scholarships"
    ],
    campusLife: {
      housing: false,
      studentClubs: 35,
      internationalism: "Extremely High"
    }
  },
  {
    id: 17,
    name: "HEC Paris",
    location: "Jouy-en-Josas",
    country: "France",
    region: "Europe",
    established: 1881,
    ranking: {
      global: 17,
      ftGlobal: 17,
      qsGlobal: 17,
      regional: 6
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "16 months",
        tuitionFee: "79,800",
        currency: "EUR"
      },
      emba: {
        available: true,
        duration: "18 months",
        tuitionFee: "95,000"
      },
      masters: ["Master in Management", "Master in International Finance"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 690,
        minScore: 650
      },
      gre: {
        accepted: true,
        averageScore: 315
      },
      workExperience: {
        required: true,
        averageYears: 5.2,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 6.5
      }
    },
    statistics: {
      studentBody: 280,
      internationalStudents: "93%",
      femaleStudents: "36%",
      averageAge: 29,
      classSize: 280
    },
    outcomes: {
      employmentRate: "90%",
      averageSalary: {
        amount: 118000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "85%",
      topRecruiters: ["McKinsey", "BCG", "L'Oréal", "LVMH", "Amazon"]
    },
    highlights: [
      "European business focus",
      "Strong alumni network",
      "Paris proximity", 
      "Research excellence"
    ],
    specializations: [
      "Luxury Management",
      "Finance",
      "Consulting",
      "Strategy",
      "Marketing",
      "Entrepreneurship"
    ],
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=300&fit=crop&q=80",
    website: "https://www.hec.edu",
    applicationDeadlines: {
      round1: "October 15",
      round2: "January 15",
      round3: "April 15"
    },
    scholarships: [
      "HEC Foundation scholarships",
      "Regional scholarships",
      "Merit-based aid",
      "Diversity scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 40,
      internationalism: "Extremely High"
    }
  },
  {
    id: 18,
    name: "Indian School of Business",
    shortName: "ISB",
    location: "Hyderabad / Mohali",
    country: "India",
    region: "Asia",
    established: 2001,
    ranking: {
      global: 18,
      ftGlobal: 18,
      qsGlobal: 24,
      regional: 1
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "12 months",
        tuitionFee: "34,00,000",
        currency: "INR"
      },
      emba: {
        available: true,
        duration: "15 months",
        tuitionFee: "29,50,000"
      },
      masters: ["Fellow Programme in Management"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 708,
        minScore: 650
      },
      gre: {
        accepted: true,
        averageScore: 318
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
      studentBody: 917,
      internationalStudents: "15%",
      femaleStudents: "28%",
      averageAge: 27,
      classSize: 917
    },
    outcomes: {
      employmentRate: "95%",
      averageSalary: {
        amount: 25000000,
        currency: "INR",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "118%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Amazon", "Microsoft"]
    },
    highlights: [
      "Top Indian business school",
      "Strong industry connections",
      "Innovative curriculum",
      "Global faculty"
    ],
    specializations: [
      "Consulting",
      "Finance",
      "Technology",
      "Marketing",
      "Operations",
      "Family Business"
    ],
    image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=400&h=300&fit=crop&q=80",
    website: "https://www.isb.edu",
    applicationDeadlines: {
      round1: "October 15",
      round2: "December 15", 
      round3: "February 15"
    },
    scholarships: [
      "ISB Trust scholarships",
      "Merit scholarships",
      "Need-based aid",
      "Women leadership scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 60,
      internationalism: "Moderate"
    }
  },
  {
    id: 19,
    name: "IESE Business School",
    location: "Barcelona / Madrid",
    country: "Spain", 
    region: "Europe",
    established: 1958,
    ranking: {
      global: 19,
      ftGlobal: 19,
      qsGlobal: 18,
      regional: 7
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "19 months",
        tuitionFee: "89,500",
        currency: "EUR"
      },
      emba: {
        available: true,
        duration: "18 months",
        tuitionFee: "155,000"
      },
      masters: ["Master in Management"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 687,
        minScore: 650
      },
      gre: {
        accepted: true,
        averageScore: 314
      },
      workExperience: {
        required: true,
        averageYears: 5.1,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 320,
      internationalStudents: "89%",
      femaleStudents: "31%",
      averageAge: 28,
      classSize: 320
    },
    outcomes: {
      employmentRate: "92%",
      averageSalary: {
        amount: 112000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "89%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Amazon", "Telefónica"]
    },
    highlights: [
      "Case method teaching",
      "Strong European network",
      "Family business specialization",
      "Global campuses"
    ],
    specializations: [
      "General Management",
      "Finance",
      "Consulting", 
      "Family Business",
      "Entrepreneurship",
      "Strategy"
    ],
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&h=300&fit=crop&q=80",
    website: "https://www.iese.edu",
    applicationDeadlines: {
      round1: "October 3",
      round2: "December 12",
      round3: "February 13"
    },
    scholarships: [
      "IESE scholarships",
      "Merit scholarships",
      "Regional scholarships",
      "Diversity scholarships"
    ],
    campusLife: {
      housing: false,
      studentClubs: 45,
      internationalism: "Very High"
    }
  },
  {
    id: 20,
    name: "National University of Singapore Business School",
    shortName: "NUS Business",
    location: "Singapore",
    country: "Singapore",
    region: "Asia",
    established: 1965,
    ranking: {
      global: 20,
      ftGlobal: 20,
      qsGlobal: 19,
      regional: 2
    },
    accreditation: ["AACSB", "EQUIS"],
    programs: {
      mba: {
        available: true,
        duration: "17 months",
        tuitionFee: "58,000",
        currency: "SGD"
      },
      emba: {
        available: true,
        duration: "17 months",
        tuitionFee: "98,000"
      },
      masters: ["Master of Science programs"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 665,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 312
      },
      workExperience: {
        required: true,
        averageYears: 5.8,
        minYears: 2
      },
      englishTest: {
        toefl: 100,
        ielts: 6.5
      }
    },
    statistics: {
      studentBody: 180,
      internationalStudents: "95%",
      femaleStudents: "37%",
      averageAge: 29,
      classSize: 180
    },
    outcomes: {
      employmentRate: "89%",
      averageSalary: {
        amount: 112000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "76%",
      topRecruiters: ["McKinsey", "BCG", "Amazon", "Google", "DBS Bank"]
    },
    highlights: [
      "Gateway to Asia",
      "Strong Asian network",
      "Singapore location advantage", 
      "Research excellence"
    ],
    specializations: [
      "Finance",
      "Strategy",
      "Marketing",
      "Operations",
      "Real Estate",
      "Healthcare"
    ],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&q=80",
    website: "https://bba.nus.edu.sg",
    applicationDeadlines: {
      round1: "October 31",
      round2: "January 31",
      round3: "March 31"
    },
    scholarships: [
      "NUS scholarships",
      "ASEAN scholarships",
      "Merit scholarships",
      "Regional fellowships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 50,
      internationalism: "Extremely High"
    }
  },
  {
    id: 21,
    name: "Hong Kong University of Science and Technology Business School",
    shortName: "HKUST Business School",
    location: "Hong Kong",
    country: "Hong Kong",
    region: "Asia",
    established: 1991,
    ranking: {
      global: 21,
      ftGlobal: 21,
      qsGlobal: 20,
      regional: 3
    },
    accreditation: ["AACSB", "EQUIS"],
    programs: {
      mba: {
        available: true,
        duration: "12 months",
        tuitionFee: "560,000",
        currency: "HKD"
      },
      emba: {
        available: true,
        duration: "22 months",
        tuitionFee: "790,000"
      },
      masters: ["Master of Science in Finance", "Master of Science in Information Systems Management"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 660,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 310
      },
      workExperience: {
        required: true,
        averageYears: 6.2,
        minYears: 2
      },
      englishTest: {
        toefl: 80,
        ielts: 6.5
      }
    },
    statistics: {
      studentBody: 140,
      internationalStudents: "85%",
      femaleStudents: "34%",
      averageAge: 30,
      classSize: 140
    },
    outcomes: {
      employmentRate: "87%",
      averageSalary: {
        amount: 105000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "73%",
      topRecruiters: ["McKinsey", "BCG", "Goldman Sachs", "Amazon", "Alibaba"]
    },
    highlights: [
      "Asia-Pacific focus",
      "Strong finance program",
      "Hong Kong financial hub location",
      "Technology integration"
    ],
    specializations: [
      "Finance",
      "Technology",
      "Consulting",
      "Strategy",
      "Marketing",
      "Operations"
    ],
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop&q=80",
    website: "https://www.bm.ust.hk",
    applicationDeadlines: {
      round1: "November 30",
      round2: "February 28",
      round3: "April 30"
    },
    scholarships: [
      "HKUST scholarships",
      "Merit scholarships",
      "Regional scholarships",
      "Need-based aid"
    ],
    campusLife: {
      housing: true,
      studentClubs: 25,
      internationalism: "Very High"
    }
  },
  {
    id: 22,
    name: "Georgetown University McDonough School of Business",
    shortName: "Georgetown McDonough",
    location: "Washington, DC",
    country: "USA",
    region: "North America",
    established: 1957,
    ranking: {
      global: 22,
      ftGlobal: 22,
      qsGlobal: 25,
      usNews: 15
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "64,896",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "198,000"
      },
      masters: ["Master of Science in Finance", "Master of Public Policy"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 706,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 318
      },
      workExperience: {
        required: true,
        averageYears: 5.1,
        minYears: 2
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 546,
      internationalStudents: "38%",
      femaleStudents: "49%",
      averageAge: 28,
      classSize: 273
    },
    outcomes: {
      employmentRate: "92%",
      averageSalary: {
        amount: 152000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "89%",
      topRecruiters: ["McKinsey", "Deloitte", "Amazon", "Microsoft", "Capital One"]
    },
    highlights: [
      "Washington DC location",
      "Government and policy focus",
      "Ethics and social responsibility",
      "Global business emphasis"
    ],
    specializations: [
      "Finance",
      "Consulting",
      "Public Policy",
      "Healthcare",
      "International Business",
      "Nonprofit Management"
    ],
    image: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400&h=300&fit=crop&q=80",
    website: "https://msb.georgetown.edu",
    applicationDeadlines: {
      round1: "October 15",
      round2: "January 7",
      round3: "March 15"
    },
    scholarships: [
      "Dean's scholarships",
      "Merit-based aid",
      "Need-based aid",
      "International scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 40,
      internationalism: "High"
    }
  },
  {
    id: 23,
    name: "ESADE Business School",
    location: "Barcelona / Madrid",
    country: "Spain",
    region: "Europe",
    established: 1958,
    ranking: {
      global: 23,
      ftGlobal: 23,
      qsGlobal: 28,
      regional: 8
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "12 months",
        tuitionFee: "75,000",
        currency: "EUR"
      },
      emba: {
        available: true,
        duration: "15 months",
        tuitionFee: "89,000"
      },
      masters: ["Master in Management", "Master in Innovation and Entrepreneurship"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 675,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 313
      },
      workExperience: {
        required: true,
        averageYears: 5.8,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 190,
      internationalStudents: "89%",
      femaleStudents: "38%",
      averageAge: 29,
      classSize: 190
    },
    outcomes: {
      employmentRate: "89%",
      averageSalary: {
        amount: 110000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "85%",
      topRecruiters: ["McKinsey", "BCG", "Amazon", "Telefónica", "Santander"]
    },
    highlights: [
      "Entrepreneurship focus",
      "European business network",
      "Barcelona location",
      "Innovation emphasis"
    ],
    specializations: [
      "Entrepreneurship",
      "Innovation",
      "Finance",
      "Marketing",
      "Strategy",
      "Operations"
    ],
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=300&fit=crop&q=80",
    website: "https://www.esade.edu",
    applicationDeadlines: {
      round1: "October 10",
      round2: "December 19",
      round3: "February 20"
    },
    scholarships: [
      "ESADE scholarships",
      "Merit scholarships",
      "Diversity scholarships",
      "Regional fellowships"
    ],
    campusLife: {
      housing: false,
      studentClubs: 30,
      internationalism: "Very High"
    }
  },
  {
    id: 24,
    name: "Ross School of Business, University of Michigan",
    shortName: "Michigan Ross",
    location: "Ann Arbor, MI",
    country: "USA",
    region: "North America",
    established: 1924,
    ranking: {
      global: 24,
      ftGlobal: 24,
      qsGlobal: 23,
      usNews: 12
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
        duration: "20 months",
        tuitionFee: "195,000"
      },
      masters: ["Master of Management", "Master of Supply Chain Management"],
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
        averageScore: 320
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
      studentBody: 828,
      internationalStudents: "30%",
      femaleStudents: "46%",
      averageAge: 28,
      classSize: 414
    },
    outcomes: {
      employmentRate: "93%",
      averageSalary: {
        amount: 157000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "92%",
      topRecruiters: ["McKinsey", "BCG", "Amazon", "Microsoft", "General Motors"]
    },
    highlights: [
      "Action-based learning",
      "Strong alumni network",
      "Automotive industry connections",
      "Collaborative culture"
    ],
    specializations: [
      "Strategy",
      "Operations",
      "Finance",
      "Marketing",
      "Technology",
      "Automotive"
    ],
    image: "https://images.unsplash.com/photo-1551474083-7b3bc61ba400?w=400&h=300&fit=crop&q=80",
    website: "https://michiganross.umich.edu",
    applicationDeadlines: {
      round1: "September 19",
      round2: "January 3",
      round3: "March 21"
    },
    scholarships: [
      "Ross fellowships",
      "Merit scholarships",
      "Need-based aid",
      "Diversity scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 70,
      internationalism: "High"
    }
  },
  {
    id: 25,
    name: "China Europe International Business School",
    shortName: "CEIBS",
    location: "Shanghai",
    country: "China",
    region: "Asia",
    established: 1994,
    ranking: {
      global: 25,
      ftGlobal: 25,
      qsGlobal: 27,
      regional: 4
    },
    accreditation: ["AACSB", "EQUIS"],
    programs: {
      mba: {
        available: true,
        duration: "18 months",
        tuitionFee: "298,000",
        currency: "CNY"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "528,000"
      },
      masters: ["Master in Management", "Master in Finance"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 665,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 312
      },
      workExperience: {
        required: true,
        averageYears: 6.8,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 180,
      internationalStudents: "30%",
      femaleStudents: "33%",
      averageAge: 31,
      classSize: 180
    },
    outcomes: {
      employmentRate: "94%",
      averageSalary: {
        amount: 125000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "195%",
      topRecruiters: ["McKinsey", "BCG", "Alibaba", "Tencent", "Bain"]
    },
    highlights: [
      "China business expertise",
      "Strong alumni network in China",
      "Government connections",
      "Asia-Europe bridge"
    ],
    specializations: [
      "General Management",
      "Finance",
      "Strategy",
      "Marketing",
      "Operations",
      "Entrepreneurship"
    ],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop&q=80",
    website: "https://www.ceibs.edu",
    applicationDeadlines: {
      round1: "October 31",
      round2: "January 15",
      round3: "March 31"
    },
    scholarships: [
      "CEIBS scholarships",
      "Merit scholarships",
      "International scholarships",
      "Regional fellowships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 35,
      internationalism: "Moderate"
    }
  },
  {
    id: 26,
    name: "UCLA Anderson School of Management",
    shortName: "UCLA Anderson",
    location: "Los Angeles, CA",
    country: "USA",
    region: "North America", 
    established: 1935,
    ranking: {
      global: 26,
      ftGlobal: 26,
      qsGlobal: 26,
      usNews: 13
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
        tuitionFee: "208,000"
      },
      masters: ["Master of Financial Engineering"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 714,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 322
      },
      workExperience: {
        required: true,
        averageYears: 5.8,
        minYears: 2
      },
      englishTest: {
        toefl: 87,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 734,
      internationalStudents: "29%",
      femaleStudents: "43%",
      averageAge: 28,
      classSize: 367
    },
    outcomes: {
      employmentRate: "91%",
      averageSalary: {
        amount: 159000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "88%",
      topRecruiters: ["Amazon", "Google", "Microsoft", "McKinsey", "Apple"]
    },
    highlights: [
      "Los Angeles location",
      "Entertainment industry connections",
      "Technology focus",
      "Entrepreneurship program"
    ],
    specializations: [
      "Technology",
      "Entertainment",
      "Entrepreneurship",
      "Finance",
      "Marketing",
      "Real Estate"
    ],
    image: "https://images.unsplash.com/photo-1609166214667-34f7c52e8e16?w=400&h=300&fit=crop&q=80",
    website: "https://www.anderson.ucla.edu",
    applicationDeadlines: {
      round1: "October 10",
      round2: "January 5",
      round3: "April 15"
    },
    scholarships: [
      "Anderson fellowships",
      "Merit scholarships",
      "Need-based aid",
      "Diversity scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 55,
      internationalism: "High"
    }
  },
  {
    id: 27,
    name: "University of Virginia Darden School of Business",
    shortName: "Darden",
    location: "Charlottesville, VA",
    country: "USA",
    region: "North America",
    established: 1955,
    ranking: {
      global: 27,
      ftGlobal: 27,
      qsGlobal: 29,
      usNews: 14
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
        duration: "24 months",
        tuitionFee: "202,000"
      },
      masters: ["Master of Science in Business Analytics"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 706,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 319
      },
      workExperience: {
        required: true,
        averageYears: 4.9,
        minYears: 2
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 678,
      internationalStudents: "35%",
      femaleStudents: "40%",
      averageAge: 28,
      classSize: 339
    },
    outcomes: {
      employmentRate: "93%",
      averageSalary: {
        amount: 155000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "96%",
      topRecruiters: ["McKinsey", "BCG", "Deloitte", "Amazon", "Capital One"]
    },
    highlights: [
      "Case method teaching",
      "Honor code tradition",
      "Strong alumni network",
      "General management focus"
    ],
    specializations: [
      "General Management",
      "Consulting",
      "Finance",
      "Marketing",
      "Operations",
      "Strategy"
    ],
    image: "https://images.unsplash.com/photo-1599670409242-c02f6825dafb?w=400&h=300&fit=crop&q=80",
    website: "https://www.darden.virginia.edu",
    applicationDeadlines: {
      round1: "September 19",
      round2: "January 3",
      round3: "March 28"
    },
    scholarships: [
      "Jefferson fellowships",
      "Merit scholarships",
      "Need-based aid",
      "Diversity scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 50,
      internationalism: "High"
    }
  },
  {
    id: 28,
    name: "SAID Business School, University of Cambridge",
    shortName: "Cambridge SAID",
    location: "Cambridge",
    country: "UK",
    region: "Europe",
    established: 1990,
    ranking: {
      global: 28,
      ftGlobal: 28,
      qsGlobal: 31,
      regional: 9
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
      masters: ["Master of Finance", "Master of Accounting"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 692,
        minScore: 620
      },
      gre: {
        accepted: true,
        averageScore: 316
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
      studentBody: 202,
      internationalStudents: "93%",
      femaleStudents: "32%",
      averageAge: 30,
      classSize: 202
    },
    outcomes: {
      employmentRate: "90%",
      averageSalary: {
        amount: 126000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "97%",
      topRecruiters: ["McKinsey", "BCG", "Amazon", "Google", "Microsoft"]
    },
    highlights: [
      "Cambridge University prestige",
      "Technology and innovation focus",
      "Small class size",
      "Entrepreneurship ecosystem"
    ],
    specializations: [
      "Technology",
      "Finance",
      "Consulting", 
      "Entrepreneurship",
      "Strategy",
      "Operations"
    ],
    image: "https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?w=400&h=300&fit=crop&q=80",
    website: "https://www.jbs.cam.ac.uk",
    applicationDeadlines: {
      round1: "October 3",
      round2: "December 5",
      round3: "February 6"
    },
    scholarships: [
      "Cambridge scholarships",
      "Reliance scholarships",
      "Regional scholarships",
      "Need-based aid"
    ],
    campusLife: {
      housing: true,
      studentClubs: 30,
      internationalism: "Extremely High"
    }
  },
  {
    id: 29,
    name: "Melbourne Business School",
    shortName: "Melbourne BS",
    location: "Melbourne",
    country: "Australia",
    region: "Oceania",
    established: 1955,
    ranking: {
      global: 29,
      ftGlobal: 29,
      qsGlobal: 32,
      regional: 1
    },
    accreditation: ["AACSB", "EQUIS"],
    programs: {
      mba: {
        available: true,
        duration: "12 months",
        tuitionFee: "89,000",
        currency: "AUD"
      },
      emba: {
        available: true,
        duration: "17 months",
        tuitionFee: "112,000"
      },
      masters: ["Master of Management"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 680,
        minScore: 630
      },
      gre: {
        accepted: true,
        averageScore: 315
      },
      workExperience: {
        required: true,
        averageYears: 7.0,
        minYears: 2
      },
      englishTest: {
        toefl: 102,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 200,
      internationalStudents: "75%",
      femaleStudents: "45%",
      averageAge: 31,
      classSize: 200
    },
    outcomes: {
      employmentRate: "87%",
      averageSalary: {
        amount: 95000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "82%",
      topRecruiters: ["McKinsey", "BCG", "Deloitte", "ANZ", "Commonwealth Bank"]
    },
    highlights: [
      "Asia-Pacific focus",
      "Melbourne location",
      "Strong regional network",
      "Research excellence"
    ],
    specializations: [
      "Finance",
      "Consulting",
      "Strategy",
      "Marketing",
      "Operations",
      "Entrepreneurship"
    ],
    image: "https://images.unsplash.com/photo-1533834681848-0cad92e1e6a5?w=400&h=300&fit=crop&q=80",
    website: "https://mbs.edu",
    applicationDeadlines: {
      round1: "November 30",
      round2: "February 28",
      round3: "April 30"
    },
    scholarships: [
      "Melbourne scholarships",
      "Merit scholarships",
      "Regional scholarships",
      "Need-based aid"
    ],
    campusLife: {
      housing: true,
      studentClubs: 25,
      internationalism: "Very High"
    }
  },
  {
    id: 30,
    name: "IMD Business School",
    location: "Lausanne",
    country: "Switzerland",
    region: "Europe",
    established: 1946,
    ranking: {
      global: 30,
      ftGlobal: 30,
      qsGlobal: 33,
      regional: 10
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
        tuitionFee: "149,000"
      },
      masters: ["Master in Management, Technology and Economics"],
      phd: false
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 680,
        minScore: 650
      },
      gre: {
        accepted: true,
        averageScore: 315
      },
      workExperience: {
        required: true,
        averageYears: 7.5,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 90,
      internationalStudents: "97%",
      femaleStudents: "30%",
      averageAge: 31,
      classSize: 90
    },
    outcomes: {
      employmentRate: "95%",
      averageSalary: {
        amount: 142000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "80%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Google", "Amazon"]
    },
    highlights: [
      "Small class size",
      "Executive education focus",
      "Swiss location",
      "Highly international"
    ],
    specializations: [
      "General Management",
      "Strategy",
      "Finance",
      "Technology",
      "Innovation",
      "Leadership"
    ],
    image: "https://images.unsplash.com/photo-1564672284862-7ecabaa50ee0?w=400&h=300&fit=crop&q=80",
    website: "https://www.imd.org",
    applicationDeadlines: {
      round1: "September 30",
      round2: "November 30",
      round3: "February 15"
    },
    scholarships: [
      "IMD scholarships",
      "Merit scholarships",
      "Swiss government scholarships",
      "Regional fellowships"
    ],
    campusLife: {
      housing: false,
      studentClubs: 15,
      internationalism: "Extremely High"
    }
  },
  // BUSINESS SCHOOLS RANKED 31-50  
  {
    id: 31,
    name: "Booth School of Business, University of Chicago",
    shortName: "Chicago Booth",
    location: "Chicago, IL",
    country: "USA",
    region: "North America",
    established: 1898,
    ranking: {
      global: 31,
      ftGlobal: 31,
      qsGlobal: 34,
      usNews: 16
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "76,920",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "22 months",
        tuitionFee: "215,000"
      },
      masters: ["Master in Computational Analysis"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 731,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 328
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
      studentBody: 1180,
      internationalStudents: "38%",
      femaleStudents: "44%",
      averageAge: 28,
      classSize: 590
    },
    outcomes: {
      employmentRate: "94%",
      averageSalary: {
        amount: 170000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "96%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Deloitte"]
    },
    highlights: [
      "Flexible curriculum",
      "Strong economics foundation", 
      "Nobel Prize-winning faculty",
      "Global campuses"
    ],
    specializations: [
      "Finance",
      "Economics",
      "Strategy",
      "Marketing",
      "Operations",
      "Entrepreneurship"
    ],
    image: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=400&h=300&fit=crop&q=80",
    website: "https://www.chicagobooth.edu",
    applicationDeadlines: {
      round1: "September 26",
      round2: "January 8", 
      round3: "April 14"
    },
    scholarships: [
      "Chicago Scholars",
      "Dean's scholarships",
      "Need-based aid",
      "International scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 85,
      internationalism: "High"
    }
  },
  {
    id: 32,
    name: "IIMB - Indian Institute of Management Bangalore",
    shortName: "IIM Bangalore",
    location: "Bangalore",
    country: "India",
    region: "Asia",
    established: 1973,
    ranking: {
      global: 32,
      ftGlobal: 35,
      qsGlobal: 45,
      regional: 5
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "23,50,000",
        currency: "INR"
      },
      emba: {
        available: true,
        duration: "15 months",
        tuitionFee: "28,50,000"
      },
      masters: ["Fellow Programme in Management", "Executive PGPM"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: 680,
        minScore: 600
      },
      gre: {
        accepted: false
      },
      workExperience: {
        required: true,
        averageYears: 4.2,
        minYears: 2
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 480,
      internationalStudents: "8%",
      femaleStudents: "32%",
      averageAge: 26,
      classSize: 480
    },
    outcomes: {
      employmentRate: "98%",
      averageSalary: {
        amount: 21500000,
        currency: "INR",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "125%",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Amazon", "Goldman Sachs"]
    },
    highlights: [
      "Top Indian MBA program",
      "Silicon Valley of India location",
      "Strong industry connections",
      "CAT entrance exam"
    ],
    specializations: [
      "Consulting",
      "Finance",
      "Technology",
      "Marketing",
      "Operations",
      "Strategy"
    ],
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=300&fit=crop&q=80",
    website: "https://www.iimb.ac.in",
    applicationDeadlines: {
      round1: "December 31",
      round2: "February 28",
      final: "March 31"
    },
    scholarships: [
      "Merit scholarships",
      "Need-based aid",
      "Government scholarships",
      "Alumni scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 45,
      internationalism: "Low"
    }
  },
  {
    id: 33,
    name: "Rotman School of Management, University of Toronto",
    shortName: "Rotman",
    location: "Toronto",
    country: "Canada",
    region: "North America",
    established: 1827,
    ranking: {
      global: 33,
      ftGlobal: 32,
      qsGlobal: 36,
      regional: 1
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "20 months",
        tuitionFee: "117,310",
        currency: "CAD"
      },
      emba: {
        available: true,
        duration: "16 months",
        tuitionFee: "164,000"
      },
      masters: ["Master of Finance", "Master of Management Analytics"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 665,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 315
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
      studentBody: 280,
      internationalStudents: "70%",
      femaleStudents: "42%",
      averageAge: 29,
      classSize: 280
    },
    outcomes: {
      employmentRate: "91%",
      averageSalary: {
        amount: 119000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "78%",
      topRecruiters: ["McKinsey", "BCG", "Amazon", "RBC", "Shopify"]
    },
    highlights: [
      "Toronto financial center",
      "Design thinking focus",
      "Strong Canadian network",
      "Integrative thinking"
    ],
    specializations: [
      "Finance",
      "Consulting",
      "Technology",
      "Healthcare",
      "Marketing",
      "Strategy"
    ],
    image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=400&h=300&fit=crop&q=80",
    website: "https://www.rotman.utoronto.ca",
    applicationDeadlines: {
      round1: "October 12",
      round2: "December 7",
      round3: "February 15"
    },
    scholarships: [
      "Rotman scholarships",
      "Merit scholarships",
      "International scholarships",
      "Need-based aid"
    ],
    campusLife: {
      housing: true,
      studentClubs: 35,
      internationalism: "Very High"
    }
  },
  {
    id: 34,
    name: "Cranfield School of Management",
    location: "Cranfield",
    country: "UK",
    region: "Europe",
    established: 1967,
    ranking: {
      global: 34,
      ftGlobal: 33,
      qsGlobal: 37,
      regional: 11
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "12 months",
        tuitionFee: "47,000",
        currency: "GBP"
      },
      emba: {
        available: true,
        duration: "18 months",
        tuitionFee: "55,000"
      },
      masters: ["Master of Management", "Master in Finance"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 640,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 310
      },
      workExperience: {
        required: true,
        averageYears: 8.2,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 6.5
      }
    },
    statistics: {
      studentBody: 120,
      internationalStudents: "95%",
      femaleStudents: "28%",
      averageAge: 32,
      classSize: 120
    },
    outcomes: {
      employmentRate: "89%",
      averageSalary: {
        amount: 108000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "91%",
      topRecruiters: ["Deloitte", "PwC", "Amazon", "BAE Systems", "Rolls-Royce"]
    },
    highlights: [
      "Aerospace and defense focus",
      "Manufacturing expertise",
      "Executive education strength",
      "Industry partnerships"
    ],
    specializations: [
      "Manufacturing",
      "Aerospace",
      "Supply Chain",
      "Finance",
      "Strategy",
      "Operations"
    ],
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&h=300&fit=crop&q=80",
    website: "https://www.cranfield.ac.uk",
    applicationDeadlines: {
      round1: "November 30",
      round2: "February 29",
      round3: "April 30"
    },
    scholarships: [
      "Cranfield scholarships",
      "Industry scholarships",
      "International scholarships",
      "Merit-based aid"
    ],
    campusLife: {
      housing: true,
      studentClubs: 20,
      internationalism: "Extremely High"
    }
  },
  {
    id: 35,
    name: "Johnson Graduate School of Management, Cornell University",
    shortName: "Cornell Johnson",
    location: "Ithaca, NY",
    country: "USA",
    region: "North America",
    established: 1946,
    ranking: {
      global: 35,
      ftGlobal: 34,
      qsGlobal: 38,
      usNews: 17
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "68,380",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "192,000"
      },
      masters: ["Master of Professional Studies"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 700,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 320
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
      studentBody: 574,
      internationalStudents: "37%",
      femaleStudents: "39%",
      averageAge: 28,
      classSize: 287
    },
    outcomes: {
      employmentRate: "90%",
      averageSalary: {
        amount: 152000,
        currency: "USD",
        timeFrame: "3 months post-graduation"
      },
      salaryIncrease: "89%",
      topRecruiters: ["McKinsey", "Deloitte", "Amazon", "Johnson & Johnson", "Goldman Sachs"]
    },
    highlights: [
      "Ivy League prestige",
      "Collaborative culture",
      "Rural campus setting",
      "Strong alumni network"
    ],
    specializations: [
      "Finance",
      "Consulting",
      "Technology",
      "Healthcare",
      "Marketing",
      "Operations"
    ],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&q=80",
    website: "https://www.johnson.cornell.edu",
    applicationDeadlines: {
      round1: "September 21",
      round2: "January 5",
      round3: "March 30"
    },
    scholarships: [
      "Johnson fellowships",
      "Merit scholarships",
      "Need-based aid",
      "Diversity scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 45,
      internationalism: "High"
    }
  },
  // NORTH AMERICAN BUSINESS SCHOOLS (36-55)
  {
    id: 36,
    name: "Tuck School of Business, Dartmouth College",
    shortName: "Dartmouth Tuck",
    location: "Hanover, NH",
    country: "USA",
    region: "North America",
    established: 1900,
    ranking: {
      global: 36,
      ftGlobal: 12,
      qsGlobal: 19,
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
        available: true,
        duration: "20 months",
        tuitionFee: "215,000"
      },
      masters: [],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 720,
        minScore: 650
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
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 560,
      internationalStudents: "35%",
      femaleStudents: "47%",
      averageAge: 28,
      classSize: 280
    },
    outcomes: {
      employmentRate: "95%",
      averageSalary: {
        amount: 175000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "92%",
      topRecruiters: ["McKinsey & Company", "Bain & Company", "Goldman Sachs", "Amazon", "Google"]
    },
    highlights: [
      "Strong alumni network in consulting and finance",
      "Close-knit community with collaborative culture",
      "Located in beautiful New Hampshire setting",
      "Excellent career services and job placement"
    ],
    specializations: [
      "Consulting",
      "Finance",
      "General Management",
      "Entrepreneurship",
      "Strategy"
    ],
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop&q=80",
    website: "https://www.tuck.dartmouth.edu",
    applicationDeadlines: {
      round1: "October 15",
      round2: "January 3",
      round3: "April 1"
    },
    scholarships: [
      "Tuck Scholarships",
      "Consortium Fellowship",
      "Yellow Ribbon Program",
      "Merit-based aid"
    ],
    campusLife: {
      housing: true,
      studentClubs: 50,
      internationalism: "Very High"
    }
  },
  {
    id: 37,
    name: "Tepper School of Business, Carnegie Mellon University",
    shortName: "CMU Tepper",
    location: "Pittsburgh, PA",
    country: "USA",
    region: "North America",
    established: 1949,
    ranking: {
      global: 37,
      ftGlobal: 22,
      qsGlobal: 35,
      usNews: 19
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
        tuitionFee: "175,000"
      },
      masters: ["Master of Science in Computational Finance", "Master of Information Technology"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 690,
        minScore: 580
      },
      gre: {
        accepted: true,
        averageScore: 318
      },
      workExperience: {
        required: true,
        averageYears: 4.8,
        minYears: 1
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 440,
      internationalStudents: "38%",
      femaleStudents: "35%",
      averageAge: 27,
      classSize: 220
    },
    outcomes: {
      employmentRate: "94%",
      averageSalary: {
        amount: 155000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "85%",
      topRecruiters: ["Amazon", "Google", "Microsoft", "Goldman Sachs", "McKinsey & Company"]
    },
    highlights: [
      "Strong in analytics and technology",
      "Small class size with personalized attention",
      "Excellent quantitative curriculum",
      "Strong connections to tech industry"
    ],
    specializations: [
      "Analytics",
      "Technology",
      "Finance",
      "Operations",
      "Entrepreneurship"
    ],
    image: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400&h=300&fit=crop&q=80",
    website: "https://www.cmu.edu/tepper/",
    applicationDeadlines: {
      round1: "September 19",
      round2: "January 5",
      round3: "March 15"
    },
    scholarships: [
      "Tepper Merit Scholarships",
      "Dean's Fellowships",
      "Diversity Scholarships",
      "Need-based aid"
    ],
    campusLife: {
      housing: true,
      studentClubs: 35,
      internationalism: "High"
    }
  },
  {
    id: 38,
    name: "Goizueta Business School, Emory University",
    shortName: "Emory Goizueta",
    location: "Atlanta, GA",
    country: "USA",
    region: "North America",
    established: 1919,
    ranking: {
      global: 38,
      ftGlobal: 25,
      qsGlobal: 40,
      usNews: 20
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "65,880",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "22 months",
        tuitionFee: "185,000"
      },
      masters: ["Master of Analytical Finance", "Master of Management in Hospitality"],
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
        averageScore: 315
      },
      workExperience: {
        required: true,
        averageYears: 4.5,
        minYears: 2
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 360,
      internationalStudents: "32%",
      femaleStudents: "42%",
      averageAge: 28,
      classSize: 180
    },
    outcomes: {
      employmentRate: "93%",
      averageSalary: {
        amount: 145000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "80%",
      topRecruiters: ["Deloitte", "PwC", "Amazon", "Home Depot", "McKinsey & Company"]
    },
    highlights: [
      "Strong in consulting and finance",
      "Excellent alumni network in the Southeast",
      "Small class size and close community",
      "Located in thriving Atlanta business hub"
    ],
    specializations: [
      "Consulting",
      "Finance",
      "Marketing",
      "Healthcare",
      "Real Estate"
    ],
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=300&fit=crop&q=80",
    website: "https://www.goizueta.emory.edu",
    applicationDeadlines: {
      round1: "September 18",
      round2: "November 15",
      round3: "January 15"
    },
    scholarships: [
      "Goizueta Scholarships",
      "Dean's Fellowships",
      "Diversity and Inclusion Scholarships",
      "Merit-based aid"
    ],
    campusLife: {
      housing: true,
      studentClubs: 40,
      internationalism: "High"
    }
  },
  {
    id: 39,
    name: "Olin Business School, Washington University in St. Louis",
    shortName: "WashU Olin",
    location: "St. Louis, MO",
    country: "USA",
    region: "North America",
    established: 1917,
    ranking: {
      global: 39,
      ftGlobal: 30,
      qsGlobal: 45,
      usNews: 22
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "64,500",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "22 months",
        tuitionFee: "180,000"
      },
      masters: ["Master of Finance", "Master of Supply Chain Management"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 696,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 318
      },
      workExperience: {
        required: true,
        averageYears: 4.2,
        minYears: 1
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 280,
      internationalStudents: "40%",
      femaleStudents: "38%",
      averageAge: 27,
      classSize: 140
    },
    outcomes: {
      employmentRate: "92%",
      averageSalary: {
        amount: 140000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "78%",
      topRecruiters: ["Boeing", "Anheuser-Busch", "Deloitte", "EY", "Amazon"]
    },
    highlights: [
      "Strong finance and consulting programs",
      "Small class size with personalized attention",
      "Collaborative learning environment",
      "Excellent career services"
    ],
    specializations: [
      "Finance",
      "Consulting",
      "Marketing",
      "Operations",
      "Healthcare"
    ],
    image: "https://images.unsplash.com/photo-1551474083-7b3bc61ba400?w=400&h=300&fit=crop&q=80",
    website: "https://www.olin.wustl.edu",
    applicationDeadlines: {
      round1: "September 25",
      round2: "January 8",
      round3: "March 26"
    },
    scholarships: [
      "Olin Merit Scholarships",
      "Dean's Fellowships",
      "Diversity Scholarships",
      "Need-based aid"
    ],
    campusLife: {
      housing: true,
      studentClubs: 30,
      internationalism: "Very High"
    }
  },
  {
    id: 40,
    name: "Jones Graduate School of Business, Rice University",
    shortName: "Rice Jones",
    location: "Houston, TX",
    country: "USA",
    region: "North America",
    established: 1974,
    ranking: {
      global: 40,
      ftGlobal: 32,
      qsGlobal: 42,
      usNews: 24
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "62,500",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "21 months",
        tuitionFee: "175,000"
      },
      masters: ["Master of Energy Finance", "Master of Accounting"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 690,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 316
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
      studentBody: 240,
      internationalStudents: "35%",
      femaleStudents: "30%",
      averageAge: 28,
      classSize: 120
    },
    outcomes: {
      employmentRate: "95%",
      averageSalary: {
        amount: 142000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "82%",
      topRecruiters: ["ExxonMobil", "Shell", "Chevron", "McKinsey & Company", "Goldman Sachs"]
    },
    highlights: [
      "Strong in energy and finance",
      "Small cohort with tight-knit community",
      "Located in major energy hub",
      "Excellent return on investment"
    ],
    specializations: [
      "Energy",
      "Finance",
      "Consulting",
      "Entrepreneurship",
      "Operations"
    ],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop&q=80",
    website: "https://business.rice.edu",
    applicationDeadlines: {
      round1: "September 25",
      round2: "November 20",
      round3: "January 24"
    },
    scholarships: [
      "Jones Merit Scholarships",
      "Energy Industry Fellowships",
      "Diversity Scholarships",
      "Need-based aid"
    ],
    campusLife: {
      housing: true,
      studentClubs: 25,
      internationalism: "High"
    }
  },
  {
    id: 41,
    name: "Owen Graduate School of Management, Vanderbilt University",
    shortName: "Vanderbilt Owen",
    location: "Nashville, TN",
    country: "USA",
    region: "North America",
    established: 1969,
    ranking: {
      global: 41,
      ftGlobal: 35,
      qsGlobal: 48,
      usNews: 25
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "61,900",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "165,000"
      },
      masters: ["Master of Finance", "Master of Marketing"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 680,
        minScore: 580
      },
      gre: {
        accepted: true,
        averageScore: 314
      },
      workExperience: {
        required: true,
        averageYears: 4.5,
        minYears: 2
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 380,
      internationalStudents: "28%",
      femaleStudents: "40%",
      averageAge: 27,
      classSize: 190
    },
    outcomes: {
      employmentRate: "91%",
      averageSalary: {
        amount: 135000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "75%",
      topRecruiters: ["Deloitte", "EY", "Amazon", "Nissan", "HCA Healthcare"]
    },
    highlights: [
      "Strong in healthcare and finance",
      "Collaborative culture",
      "Growing Nashville business scene",
      "Excellent alumni network in the South"
    ],
    specializations: [
      "Healthcare",
      "Finance",
      "Operations",
      "Marketing",
      "Entrepreneurship"
    ],
    image: "https://images.unsplash.com/photo-1609166214667-34f7c52e8e16?w=400&h=300&fit=crop&q=80",
    website: "https://www.owen.vanderbilt.edu",
    applicationDeadlines: {
      round1: "October 2",
      round2: "January 3",
      round3: "March 20"
    },
    scholarships: [
      "Owen Merit Scholarships",
      "Leadership Fellowships",
      "Diversity and Inclusion Scholarships",
      "Need-based aid"
    ],
    campusLife: {
      housing: true,
      studentClubs: 35,
      internationalism: "High"
    }
  },
  {
    id: 42,
    name: "Marshall School of Business, University of Southern California",
    shortName: "USC Marshall",
    location: "Los Angeles, CA",
    country: "USA",
    region: "North America",
    established: 1920,
    ranking: {
      global: 42,
      ftGlobal: 28,
      qsGlobal: 43,
      usNews: 18
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "66,640",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "22 months",
        tuitionFee: "195,000"
      },
      masters: ["Master of Business for Veterans", "Master of Management in Library and Information Science"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 707,
        minScore: 620
      },
      gre: {
        accepted: true,
        averageScore: 320
      },
      workExperience: {
        required: true,
        averageYears: 4.9,
        minYears: 2
      },
      englishTest: {
        toefl: 100,
        ielts: 6.5
      }
    },
    statistics: {
      studentBody: 420,
      internationalStudents: "42%",
      femaleStudents: "35%",
      averageAge: 28,
      classSize: 210
    },
    outcomes: {
      employmentRate: "94%",
      averageSalary: {
        amount: 150000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "85%",
      topRecruiters: ["Google", "Amazon", "Disney", "Netflix", "Deloitte"]
    },
    highlights: [
      "Strong connections to entertainment industry",
      "Located in major business and tech hub",
      "Diverse international student body",
      "Strong alumni network in West Coast"
    ],
    specializations: [
      "Entertainment",
      "Technology",
      "Entrepreneurship",
      "Finance",
      "Marketing"
    ],
    image: "https://images.unsplash.com/photo-1599670409242-c02f6825dafb?w=400&h=300&fit=crop&q=80",
    website: "https://www.marshall.usc.edu",
    applicationDeadlines: {
      round1: "October 15",
      round2: "January 15",
      round3: "April 15"
    },
    scholarships: [
      "Marshall Merit Scholarships",
      "Dean's Scholarships",
      "Diversity Scholarships",
      "Veterans scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 55,
      internationalism: "Extremely High"
    }
  },
  {
    id: 43,
    name: "Questrom School of Business, Boston University",
    shortName: "BU Questrom",
    location: "Boston, MA",
    country: "USA",
    region: "North America",
    established: 1913,
    ranking: {
      global: 43,
      ftGlobal: 40,
      qsGlobal: 50,
      usNews: 42
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "60,670",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "155,000"
      },
      masters: ["Master of Mathematical Finance", "Master of Management Studies"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 665,
        minScore: 550
      },
      gre: {
        accepted: true,
        averageScore: 312
      },
      workExperience: {
        required: true,
        averageYears: 4.2,
        minYears: 1
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 420,
      internationalStudents: "45%",
      femaleStudents: "42%",
      averageAge: 27,
      classSize: 210
    },
    outcomes: {
      employmentRate: "90%",
      averageSalary: {
        amount: 125000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "70%",
      topRecruiters: ["Deloitte", "PwC", "Amazon", "State Street", "Fidelity"]
    },
    highlights: [
      "Located in vibrant Boston business hub",
      "Strong finance and consulting programs",
      "Diverse international student body",
      "Good access to Northeast job market"
    ],
    specializations: [
      "Finance",
      "Consulting",
      "Healthcare",
      "Technology",
      "Marketing"
    ],
    image: "https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?w=400&h=300&fit=crop&q=80",
    website: "https://www.bu.edu/questrom/",
    applicationDeadlines: {
      round1: "October 16",
      round2: "January 6",
      round3: "March 17"
    },
    scholarships: [
      "Questrom Merit Scholarships",
      "Dean's Scholarships",
      "Diversity Fellowships",
      "International student aid"
    ],
    campusLife: {
      housing: true,
      studentClubs: 45,
      internationalism: "Extremely High"
    }
  },
  {
    id: 44,
    name: "W. P. Carey School of Business, Arizona State University",
    shortName: "ASU Carey",
    location: "Tempe, AZ",
    country: "USA",
    region: "North America",
    established: 1961,
    ranking: {
      global: 44,
      ftGlobal: 38,
      qsGlobal: 55,
      usNews: 35
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "31,200",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "22 months",
        tuitionFee: "145,000"
      },
      masters: ["Master of Information Management", "Master of Real Estate Development"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 670,
        minScore: 580
      },
      gre: {
        accepted: true,
        averageScore: 310
      },
      workExperience: {
        required: true,
        averageYears: 4.0,
        minYears: 1
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 320,
      internationalStudents: "35%",
      femaleStudents: "38%",
      averageAge: 27,
      classSize: 160
    },
    outcomes: {
      employmentRate: "88%",
      averageSalary: {
        amount: 115000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "68%",
      topRecruiters: ["Intel", "Amazon", "Deloitte", "PwC", "American Express"]
    },
    highlights: [
      "Excellent value for money",
      "Growing tech scene in Phoenix",
      "Strong supply chain management program",
      "Innovative curriculum"
    ],
    specializations: [
      "Supply Chain Management",
      "Technology",
      "Finance",
      "Real Estate",
      "Healthcare"
    ],
    image: "https://images.unsplash.com/photo-1533834681848-0cad92e1e6a5?w=400&h=300&fit=crop&q=80",
    website: "https://wpcarey.asu.edu",
    applicationDeadlines: {
      round1: "October 15",
      round2: "December 15",
      round3: "February 15"
    },
    scholarships: [
      "Dean's Scholarships",
      "Merit-based aid",
      "Graduate assistantships",
      "Diversity scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 40,
      internationalism: "High"
    }
  },
  {
    id: 45,
    name: "Smeal College of Business, Pennsylvania State University",
    shortName: "Penn State Smeal",
    location: "University Park, PA",
    country: "USA",
    region: "North America",
    established: 1953,
    ranking: {
      global: 45,
      ftGlobal: 42,
      qsGlobal: 52,
      usNews: 38
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "44,500",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "22 months",
        tuitionFee: "125,000"
      },
      masters: ["Master of Finance", "Master of Professional Accounting"],
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
        averageScore: 308
      },
      workExperience: {
        required: true,
        averageYears: 3.8,
        minYears: 1
      },
      englishTest: {
        toefl: 100,
        ielts: 6.5
      }
    },
    statistics: {
      studentBody: 180,
      internationalStudents: "40%",
      femaleStudents: "35%",
      averageAge: 26,
      classSize: 90
    },
    outcomes: {
      employmentRate: "87%",
      averageSalary: {
        amount: 105000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "65%",
      topRecruiters: ["Deloitte", "EY", "Johnson & Johnson", "Verizon", "IBM"]
    },
    highlights: [
      "Strong alumni network",
      "Affordable tuition",
      "Beautiful campus setting",
      "Strong in supply chain and operations"
    ],
    specializations: [
      "Supply Chain Management",
      "Finance",
      "Marketing",
      "Operations",
      "Information Systems"
    ],
    image: "https://images.unsplash.com/photo-1564672284862-7ecabaa50ee0?w=400&h=300&fit=crop&q=80",
    website: "https://www.smeal.psu.edu",
    applicationDeadlines: {
      round1: "October 31",
      round2: "January 5",
      round3: "March 1"
    },
    scholarships: [
      "Smeal Scholarships",
      "Graduate assistantships",
      "Merit-based aid",
      "International student aid"
    ],
    campusLife: {
      housing: true,
      studentClubs: 30,
      internationalism: "Very High"
    }
  },
  {
    id: 46,
    name: "Haskayne School of Business, University of Calgary",
    shortName: "Calgary Haskayne",
    location: "Calgary, AB",
    country: "Canada",
    region: "North America",
    established: 1967,
    ranking: {
      global: 46,
      ftGlobal: 85,
      qsGlobal: 51
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "20 months",
        tuitionFee: "52,000",
        currency: "CAD"
      },
      emba: {
        available: true,
        duration: "28 months",
        tuitionFee: "95,000"
      },
      masters: ["Master of Management", "Master of Oil and Gas Management"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 630,
        minScore: 550
      },
      gre: {
        accepted: true,
        averageScore: 305
      },
      workExperience: {
        required: true,
        averageYears: 5.5,
        minYears: 2
      },
      englishTest: {
        toefl: 97,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 85,
      internationalStudents: "30%",
      femaleStudents: "40%",
      averageAge: 30,
      classSize: 42
    },
    outcomes: {
      employmentRate: "92%",
      averageSalary: {
        amount: 95000,
        currency: "CAD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "75%",
      topRecruiters: ["Suncor", "Shell", "Imperial Oil", "Deloitte", "PwC"]
    },
    highlights: [
      "Strong in energy sector",
      "Small class size",
      "Located in energy capital of Canada",
      "Excellent industry connections"
    ],
    specializations: [
      "Energy",
      "Finance",
      "Strategy",
      "Operations",
      "Innovation"
    ],
    image: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=400&h=300&fit=crop&q=80",
    website: "https://haskayne.ucalgary.ca",
    applicationDeadlines: {
      round1: "January 15",
      round2: "March 15",
      round3: "May 15"
    },
    scholarships: [
      "Haskayne Merit Scholarships",
      "Energy industry scholarships",
      "International student awards",
      "Need-based aid"
    ],
    campusLife: {
      housing: true,
      studentClubs: 25,
      internationalism: "High"
    }
  },
  {
    id: 47,
    name: "Smith School of Business, Queen's University",
    shortName: "Queen's Smith",
    location: "Kingston, ON",
    country: "Canada",
    region: "North America",
    established: 1963,
    ranking: {
      global: 47,
      ftGlobal: 89,
      qsGlobal: 58
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "12 months",
        tuitionFee: "98,500",
        currency: "CAD"
      },
      emba: {
        available: true,
        duration: "16 months",
        tuitionFee: "135,000"
      },
      masters: ["Master of Management Analytics", "Master of International Business"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 665,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 312
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
      studentBody: 560,
      internationalStudents: "35%",
      femaleStudents: "38%",
      averageAge: 27,
      classSize: 280
    },
    outcomes: {
      employmentRate: "95%",
      averageSalary: {
        amount: 105000,
        currency: "CAD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "80%",
      topRecruiters: ["McKinsey & Company", "Bain & Company", "RBC", "Goldman Sachs", "Google"]
    },
    highlights: [
      "Strong consulting placement",
      "Intensive 12-month program",
      "Excellent alumni network",
      "Beautiful historic campus"
    ],
    specializations: [
      "Consulting",
      "Finance",
      "Strategy",
      "Marketing",
      "Operations"
    ],
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=300&fit=crop&q=80",
    website: "https://smith.queensu.ca",
    applicationDeadlines: {
      round1: "October 17",
      round2: "December 5",
      round3: "February 6"
    },
    scholarships: [
      "Smith MBA Scholarships",
      "Merit-based aid",
      "International student scholarships",
      "Need-based bursaries"
    ],
    campusLife: {
      housing: true,
      studentClubs: 35,
      internationalism: "High"
    }
  },
  {
    id: 48,
    name: "Desautels Faculty of Management, McGill University",
    shortName: "McGill Desautels",
    location: "Montreal, QC",
    country: "Canada",
    region: "North America",
    established: 1906,
    ranking: {
      global: 48,
      ftGlobal: 95,
      qsGlobal: 62
    },
    accreditation: ["AACSB", "EQUIS"],
    programs: {
      mba: {
        available: true,
        duration: "20 months",
        tuitionFee: "45,000",
        currency: "CAD"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "89,000"
      },
      masters: ["Master of Management in Analytics", "Master of Management in Finance"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 670,
        minScore: 570
      },
      gre: {
        accepted: true,
        averageScore: 315
      },
      workExperience: {
        required: true,
        averageYears: 4.2,
        minYears: 2
      },
      englishTest: {
        toefl: 100,
        ielts: 6.5
      }
    },
    statistics: {
      studentBody: 200,
      internationalStudents: "75%",
      femaleStudents: "42%",
      averageAge: 28,
      classSize: 100
    },
    outcomes: {
      employmentRate: "90%",
      averageSalary: {
        amount: 92000,
        currency: "CAD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "72%",
      topRecruiters: ["Bombardier", "RBC", "Deloitte", "McKinsey & Company", "Google"]
    },
    highlights: [
      "Highly international student body",
      "Bilingual environment (English/French)",
      "Strong in international business",
      "Affordable tuition"
    ],
    specializations: [
      "International Business",
      "Finance",
      "Strategy",
      "Marketing",
      "Analytics"
    ],
    image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=400&h=300&fit=crop&q=80",
    website: "https://www.mcgill.ca/desautels/",
    applicationDeadlines: {
      round1: "November 1",
      round2: "January 15",
      round3: "March 15"
    },
    scholarships: [
      "Desautels MBA Scholarships",
      "International Excellence Awards",
      "Merit-based aid",
      "Need-based bursaries"
    ],
    campusLife: {
      housing: true,
      studentClubs: 30,
      internationalism: "Extremely High"
    }
  },
  {
    id: 49,
    name: "Rotman School of Management, University of Toronto",
    shortName: "Toronto Rotman",
    location: "Toronto, ON",
    country: "Canada",
    region: "North America",
    established: 1827,
    ranking: {
      global: 49,
      ftGlobal: 82,
      qsGlobal: 48
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "20 months",
        tuitionFee: "58,160",
        currency: "CAD"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "168,000"
      },
      masters: ["Master of Finance", "Master of Management Analytics"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 665,
        minScore: 580
      },
      gre: {
        accepted: true,
        averageScore: 312
      },
      workExperience: {
        required: true,
        averageYears: 4.5,
        minYears: 2
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 550,
      internationalStudents: "50%",
      femaleStudents: "40%",
      averageAge: 28,
      classSize: 275
    },
    outcomes: {
      employmentRate: "93%",
      averageSalary: {
        amount: 108000,
        currency: "CAD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "78%",
      topRecruiters: ["RBC", "TD Bank", "McKinsey & Company", "Deloitte", "Amazon"]
    },
    highlights: [
      "Located in Canada's financial center",
      "Strong finance program",
      "Diverse international student body",
      "Excellent access to Canadian job market"
    ],
    specializations: [
      "Finance",
      "Consulting",
      "Technology",
      "Healthcare",
      "Strategy"
    ],
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&h=300&fit=crop&q=80",
    website: "https://www.rotman.utoronto.ca",
    applicationDeadlines: {
      round1: "October 4",
      round2: "December 6",
      round3: "February 7"
    },
    scholarships: [
      "Rotman Merit Scholarships",
      "Entrance Scholarships",
      "International student awards",
      "Need-based aid"
    ],
    campusLife: {
      housing: true,
      studentClubs: 40,
      internationalism: "Extremely High"
    }
  },
  {
    id: 50,
    name: "Sauder School of Business, University of British Columbia",
    shortName: "UBC Sauder",
    location: "Vancouver, BC",
    country: "Canada",
    region: "North America",
    established: 1956,
    ranking: {
      global: 50,
      ftGlobal: 87,
      qsGlobal: 65
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "15 months",
        tuitionFee: "51,000",
        currency: "CAD"
      },
      emba: {
        available: true,
        duration: "17 months",
        tuitionFee: "125,000"
      },
      masters: ["Master of Business Analytics", "Master of Management"],
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
        averageScore: 310
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
      studentBody: 120,
      internationalStudents: "60%",
      femaleStudents: "45%",
      averageAge: 29,
      classSize: 80
    },
    outcomes: {
      employmentRate: "89%",
      averageSalary: {
        amount: 98000,
        currency: "CAD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "70%",
      topRecruiters: ["Amazon", "Microsoft", "RBC", "Deloitte", "Shopify"]
    },
    highlights: [
      "Gateway to Asia-Pacific markets",
      "Strong in technology and sustainability",
      "Beautiful campus setting",
      "Small class size with close community"
    ],
    specializations: [
      "Technology",
      "Sustainability",
      "Finance",
      "International Business",
      "Real Estate"
    ],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&q=80",
    website: "https://www.sauder.ubc.ca",
    applicationDeadlines: {
      round1: "November 30",
      round2: "January 31",
      round3: "March 31"
    },
    scholarships: [
      "Sauder MBA Scholarships",
      "International Entrance Scholarships",
      "Merit-based awards",
      "Indigenous student scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 25,
      internationalism: "Extremely High"
    }
  },
  // EUROPEAN BUSINESS SCHOOLS (51-70)
  {
    id: 51,
    name: "ESMT European School of Management and Technology",
    shortName: "ESMT Berlin",
    location: "Berlin",
    country: "Germany",
    region: "Europe",
    established: 2002,
    ranking: {
      global: 51,
      ftGlobal: 45,
      qsGlobal: 68
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "12 months",
        tuitionFee: "65,000",
        currency: "EUR"
      },
      emba: {
        available: true,
        duration: "18 months",
        tuitionFee: "75,000"
      },
      masters: ["Master in Management", "Master in Innovation and Entrepreneurship"],
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
        averageScore: 310
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
      studentBody: 65,
      internationalStudents: "95%",
      femaleStudents: "30%",
      averageAge: 31,
      classSize: 65
    },
    outcomes: {
      employmentRate: "92%",
      averageSalary: {
        amount: 110000,
        currency: "EUR",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "88%",
      topRecruiters: ["McKinsey & Company", "Bain & Company", "Amazon", "SAP", "Siemens"]
    },
    highlights: [
      "Located in Europe's startup capital",
      "Small, elite program",
      "Strong consulting placement",
      "Highly international student body"
    ],
    specializations: [
      "Consulting",
      "Technology",
      "Entrepreneurship",
      "Digital Transformation",
      "Innovation"
    ],
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop&q=80",
    website: "https://www.esmt.org",
    applicationDeadlines: {
      round1: "September 30",
      round2: "December 1",
      round3: "February 28"
    },
    scholarships: [
      "ESMT Scholarships",
      "Diversity Scholarships",
      "Merit-based aid",
      "Industry-sponsored scholarships"
    ],
    campusLife: {
      housing: false,
      studentClubs: 15,
      internationalism: "Extremely High"
    }
  },
  {
    id: 52,
    name: "Alliance Manchester Business School, University of Manchester",
    shortName: "Manchester Business School",
    location: "Manchester",
    country: "United Kingdom",
    region: "Europe",
    established: 1965,
    ranking: {
      global: 52,
      ftGlobal: 48,
      qsGlobal: 72
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "18 months",
        tuitionFee: "47,000",
        currency: "GBP"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "52,000"
      },
      masters: ["Master of Science in Management", "Master of Science in Finance"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 640,
        minScore: 550
      },
      gre: {
        accepted: true,
        averageScore: 308
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
      studentBody: 180,
      internationalStudents: "85%",
      femaleStudents: "40%",
      averageAge: 30,
      classSize: 180
    },
    outcomes: {
      employmentRate: "88%",
      averageSalary: {
        amount: 85000,
        currency: "GBP",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "78%",
      topRecruiters: ["Deloitte", "PwC", "Amazon", "Barclays", "KPMG"]
    },
    highlights: [
      "One of the original business schools",
      "Strong research reputation",
      "Diverse international student body",
      "Good value for UK business education"
    ],
    specializations: [
      "Finance",
      "Marketing",
      "Operations",
      "International Business",
      "Innovation"
    ],
    image: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400&h=300&fit=crop&q=80",
    website: "https://www.manchester.ac.uk/study/masters/courses/list/12127/mba/",
    applicationDeadlines: {
      round1: "October 31",
      round2: "December 31",
      round3: "March 31"
    },
    scholarships: [
      "Manchester MBA Scholarships",
      "International Excellence Scholarships",
      "Alumni scholarships",
      "Diversity scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 35,
      internationalism: "Extremely High"
    }
  },
  {
    id: 53,
    name: "Imperial College Business School",
    shortName: "Imperial College",
    location: "London",
    country: "United Kingdom",
    region: "Europe",
    established: 2004,
    ranking: {
      global: 53,
      ftGlobal: 25,
      qsGlobal: 45
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "12 months",
        tuitionFee: "59,500",
        currency: "GBP"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "85,000"
      },
      masters: ["Master of Science in Management", "Master of Science in Innovation, Entrepreneurship & Management"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 710,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 320
      },
      workExperience: {
        required: true,
        averageYears: 6.8,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 85,
      internationalStudents: "90%",
      femaleStudents: "35%",
      averageAge: 31,
      classSize: 85
    },
    outcomes: {
      employmentRate: "95%",
      averageSalary: {
        amount: 125000,
        currency: "GBP",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "110%",
      topRecruiters: ["McKinsey & Company", "Boston Consulting Group", "Goldman Sachs", "Google", "Amazon"]
    },
    highlights: [
      "Strong in technology and innovation",
      "Located in London financial district",
      "Small, selective program",
      "Excellent salary outcomes"
    ],
    specializations: [
      "Technology",
      "Innovation",
      "Finance",
      "Entrepreneurship",
      "Consulting"
    ],
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=300&fit=crop&q=80",
    website: "https://www.imperial.ac.uk/business-school/",
    applicationDeadlines: {
      round1: "October 11",
      round2: "December 6",
      round3: "February 7"
    },
    scholarships: [
      "Imperial MBA Scholarships",
      "Excellence Scholarships",
      "Tech industry scholarships",
      "Diversity scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 20,
      internationalism: "Extremely High"
    }
  },
  {
    id: 54,
    name: "Warwick Business School, University of Warwick",
    shortName: "Warwick Business School",
    location: "Coventry",
    country: "United Kingdom",
    region: "Europe",
    established: 1967,
    ranking: {
      global: 54,
      ftGlobal: 52,
      qsGlobal: 55
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "12 months",
        tuitionFee: "49,950",
        currency: "GBP"
      },
      emba: {
        available: true,
        duration: "24 months",
        tuitionFee: "58,500"
      },
      masters: ["Master of Science in Management", "Master of Science in Finance"],
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
        averageScore: 312
      },
      workExperience: {
        required: true,
        averageYears: 5.8,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 140,
      internationalStudents: "80%",
      femaleStudents: "38%",
      averageAge: 30,
      classSize: 140
    },
    outcomes: {
      employmentRate: "90%",
      averageSalary: {
        amount: 95000,
        currency: "GBP",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "85%",
      topRecruiters: ["Deloitte", "PwC", "KPMG", "Accenture", "Amazon"]
    },
    highlights: [
      "Strong research reputation",
      "Diverse international community",
      "Beautiful campus setting",
      "Strong alumni network in Europe"
    ],
    specializations: [
      "Consulting",
      "Finance",
      "Marketing",
      "Operations",
      "Strategy"
    ],
    image: "https://images.unsplash.com/photo-1551474083-7b3bc61ba400?w=400&h=300&fit=crop&q=80",
    website: "https://www.wbs.ac.uk",
    applicationDeadlines: {
      round1: "October 31",
      round2: "January 31",
      round3: "March 31"
    },
    scholarships: [
      "Warwick MBA Scholarships",
      "International scholarships",
      "Merit-based aid",
      "Alumni scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 30,
      internationalism: "Extremely High"
    }
  },
  {
    id: 55,
    name: "Trinity Business School, Trinity College Dublin",
    shortName: "Trinity Dublin",
    location: "Dublin",
    country: "Ireland",
    region: "Europe",
    established: 1925,
    ranking: {
      global: 55,
      ftGlobal: 65,
      qsGlobal: 78
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "12 months",
        tuitionFee: "35,000",
        currency: "EUR"
      },
      emba: {
        available: true,
        duration: "24 months",
        tuitionFee: "45,000"
      },
      masters: ["Master of Science in Management", "Master of Science in Finance"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 620,
        minScore: 550
      },
      gre: {
        accepted: true,
        averageScore: 305
      },
      workExperience: {
        required: true,
        averageYears: 4.5,
        minYears: 2
      },
      englishTest: {
        toefl: 100,
        ielts: 6.5
      }
    },
    statistics: {
      studentBody: 80,
      internationalStudents: "70%",
      femaleStudents: "45%",
      averageAge: 28,
      classSize: 80
    },
    outcomes: {
      employmentRate: "85%",
      averageSalary: {
        amount: 75000,
        currency: "EUR",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "70%",
      topRecruiters: ["Accenture", "PwC", "Deloitte", "Google", "Amazon"]
    },
    highlights: [
      "Historic university in Dublin",
      "Gateway to European markets",
      "Affordable European MBA",
      "Strong in technology sector"
    ],
    specializations: [
      "Technology",
      "Finance",
      "Marketing",
      "Strategy",
      "Innovation"
    ],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop&q=80",
    website: "https://www.tcd.ie/business/",
    applicationDeadlines: {
      round1: "November 30",
      round2: "February 28",
      round3: "April 30"
    },
    scholarships: [
      "Trinity MBA Scholarships",
      "International scholarships",
      "Merit-based aid",
      "EU student aid"
    ],
    campusLife: {
      housing: true,
      studentClubs: 25,
      internationalism: "Very High"
    }
  },
  {
    id: 56,
    name: "SDA Bocconi School of Management",
    shortName: "SDA Bocconi",
    location: "Milan",
    country: "Italy",
    region: "Europe",
    established: 1971,
    ranking: {
      global: 56,
      ftGlobal: 35,
      qsGlobal: 85
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "12 months",
        tuitionFee: "58,000",
        currency: "EUR"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "68,000"
      },
      masters: ["Master in International Management", "Master in Finance"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 640,
        minScore: 580
      },
      gre: {
        accepted: true,
        averageScore: 310
      },
      workExperience: {
        required: true,
        averageYears: 5.5,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 120,
      internationalStudents: "85%",
      femaleStudents: "42%",
      averageAge: 30,
      classSize: 120
    },
    outcomes: {
      employmentRate: "92%",
      averageSalary: {
        amount: 95000,
        currency: "EUR",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "82%",
      topRecruiters: ["McKinsey & Company", "Bain & Company", "Deloitte", "Ferrari", "Luxottica"]
    },
    highlights: [
      "Located in Italy's business capital",
      "Strong luxury and fashion connections",
      "Excellent European network",
      "Beautiful Milan campus"
    ],
    specializations: [
      "Luxury Management",
      "Finance",
      "Strategy",
      "International Business",
      "Fashion & Design"
    ],
    image: "https://images.unsplash.com/photo-1609166214667-34f7c52e8e16?w=400&h=300&fit=crop&q=80",
    website: "https://www.sdabocconi.it",
    applicationDeadlines: {
      round1: "October 10",
      round2: "January 11",
      round3: "March 28"
    },
    scholarships: [
      "SDA Bocconi Scholarships",
      "Merit scholarships",
      "Need-based aid",
      "Industry partnerships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 25,
      internationalism: "Extremely High"
    }
  },
  {
    id: 57,
    name: "Rotterdam School of Management, Erasmus University",
    shortName: "RSM Rotterdam",
    location: "Rotterdam",
    country: "Netherlands",
    region: "Europe",
    established: 1970,
    ranking: {
      global: 57,
      ftGlobal: 42,
      qsGlobal: 75
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "12 months",
        tuitionFee: "56,000",
        currency: "EUR"
      },
      emba: {
        available: true,
        duration: "22 months",
        tuitionFee: "65,000"
      },
      masters: ["Master in Management", "Master in Finance & Investments"],
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
        averageScore: 312
      },
      workExperience: {
        required: true,
        averageYears: 5.8,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 180,
      internationalStudents: "88%",
      femaleStudents: "38%",
      averageAge: 30,
      classSize: 180
    },
    outcomes: {
      employmentRate: "90%",
      averageSalary: {
        amount: 98000,
        currency: "EUR",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "85%",
      topRecruiters: ["Shell", "Unilever", "McKinsey & Company", "ING", "Philips"]
    },
    highlights: [
      "Gateway to European business",
      "Strong in sustainability and innovation",
      "Diverse international student body",
      "Located in major European port"
    ],
    specializations: [
      "Sustainability",
      "Strategy",
      "Finance",
      "Innovation",
      "International Business"
    ],
    image: "https://images.unsplash.com/photo-1599670409242-c02f6825dafb?w=400&h=300&fit=crop&q=80",
    website: "https://www.rsm.nl",
    applicationDeadlines: {
      round1: "September 15",
      round2: "November 15",
      round3: "February 1"
    },
    scholarships: [
      "RSM Scholarships",
      "Excellence Scholarships",
      "Diversity scholarships",
      "EU/EEA scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 30,
      internationalism: "Extremely High"
    }
  },
  {
    id: 58,
    name: "Stockholm School of Economics",
    shortName: "SSE",
    location: "Stockholm",
    country: "Sweden",
    region: "Europe",
    established: 1909,
    ranking: {
      global: 58,
      ftGlobal: 55,
      qsGlobal: 82
    },
    accreditation: ["EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "12 months",
        tuitionFee: "59,000",
        currency: "EUR"
      },
      emba: {
        available: true,
        duration: "18 months",
        tuitionFee: "72,000"
      },
      masters: ["Master in Management", "Master in Finance"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 640,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 310
      },
      workExperience: {
        required: true,
        averageYears: 6.2,
        minYears: 4
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 60,
      internationalStudents: "75%",
      femaleStudents: "40%",
      averageAge: 31,
      classSize: 60
    },
    outcomes: {
      employmentRate: "88%",
      averageSalary: {
        amount: 85000,
        currency: "EUR",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "80%",
      topRecruiters: ["McKinsey & Company", "Boston Consulting Group", "Spotify", "H&M", "Ericsson"]
    },
    highlights: [
      "Small, elite program",
      "Strong Nordic business network",
      "Innovative Scandinavian approach",
      "Located in dynamic Stockholm"
    ],
    specializations: [
      "Innovation",
      "Sustainability",
      "Finance",
      "Entrepreneurship",
      "Technology"
    ],
    image: "https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?w=400&h=300&fit=crop&q=80",
    website: "https://www.hhs.se",
    applicationDeadlines: {
      round1: "October 15",
      round2: "February 1",
      final: "April 1"
    },
    scholarships: [
      "SSE Scholarships",
      "Nordic scholarships",
      "Merit-based aid",
      "Industry sponsorships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 20,
      internationalism: "Very High"
    }
  },
  // ASIAN BUSINESS SCHOOLS (59-85)
  {
    id: 59,
    name: "Indian Institute of Management Ahmedabad",
    shortName: "IIM Ahmedabad",
    location: "Ahmedabad",
    country: "India",
    region: "Asia",
    established: 1961,
    ranking: {
      global: 59,
      ftGlobal: 78,
      qsGlobal: 45
    },
    accreditation: ["AACSB", "EQUIS"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "25,000",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "15 months",
        tuitionFee: "35,000"
      },
      masters: ["Fellow Programme in Management"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: 720,
        minScore: 680
      },
      gre: {
        accepted: true,
        averageScore: 325
      },
      workExperience: {
        required: true,
        averageYears: 5.5,
        minYears: 2
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 395,
      internationalStudents: "15%",
      femaleStudents: "35%",
      averageAge: 26,
      classSize: 395
    },
    outcomes: {
      employmentRate: "98%",
      averageSalary: {
        amount: 45000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "120%",
      topRecruiters: ["McKinsey & Company", "Boston Consulting Group", "Tata Consultancy", "Goldman Sachs", "Google"]
    },
    highlights: [
      "Premier Indian business school",
      "Excellent return on investment",
      "Strong alumni network in India",
      "Academic excellence tradition"
    ],
    specializations: [
      "Consulting",
      "Finance",
      "Strategy",
      "Operations",
      "Marketing"
    ],
    image: "https://images.unsplash.com/photo-1533834681848-0cad92e1e6a5?w=400&h=300&fit=crop&q=80",
    website: "https://www.iima.ac.in",
    applicationDeadlines: {
      round1: "November 30",
      round2: "February 15",
      final: "April 30"
    },
    scholarships: [
      "Merit scholarships",
      "Need-based aid",
      "Government scholarships",
      "Alumni scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 40,
      internationalism: "Moderate"
    }
  },
  {
    id: 60,
    name: "China Europe International Business School",
    shortName: "CEIBS",
    location: "Shanghai",
    country: "China",
    region: "Asia",
    established: 1994,
    ranking: {
      global: 60,
      ftGlobal: 8,
      qsGlobal: 25
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "18 months",
        tuitionFee: "58,000",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "78,000"
      },
      masters: ["Master in Management", "Master in Finance"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 680,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 315
      },
      workExperience: {
        required: true,
        averageYears: 6.8,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 180,
      internationalStudents: "35%",
      femaleStudents: "30%",
      averageAge: 30,
      classSize: 180
    },
    outcomes: {
      employmentRate: "95%",
      averageSalary: {
        amount: 125000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "168%",
      topRecruiters: ["McKinsey & Company", "Boston Consulting Group", "Alibaba", "Tencent", "Huawei"]
    },
    highlights: [
      "Leading Asian business school",
      "Gateway to Chinese market",
      "Strong alumni network in Asia",
      "Excellent salary growth"
    ],
    specializations: [
      "China Business",
      "Finance",
      "Strategy",
      "Entrepreneurship",
      "Technology"
    ],
    image: "https://images.unsplash.com/photo-1564672284862-7ecabaa50ee0?w=400&h=300&fit=crop&q=80",
    website: "https://www.ceibs.edu",
    applicationDeadlines: {
      round1: "September 27",
      round2: "November 8",
      round3: "January 10"
    },
    scholarships: [
      "CEIBS Scholarships",
      "Merit scholarships",
      "Diversity scholarships",
      "Corporate sponsorships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 35,
      internationalism: "High"
    }
  },
  {
    id: 61,
    name: "Nanyang Business School",
    shortName: "NBS",
    location: "Singapore",
    country: "Singapore",
    region: "Asia",
    established: 1981,
    ranking: {
      global: 61,
      ftGlobal: 24,
      qsGlobal: 28
    },
    accreditation: ["AACSB", "EQUIS"],
    programs: {
      mba: {
        available: true,
        duration: "12 months",
        tuitionFee: "68,000",
        currency: "SGD"
      },
      emba: {
        available: true,
        duration: "15 months",
        tuitionFee: "98,000"
      },
      masters: ["Master of Finance", "Master of Applied Finance"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 665,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 315
      },
      workExperience: {
        required: true,
        averageYears: 5.2,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 6.5
      }
    },
    statistics: {
      studentBody: 110,
      internationalStudents: "85%",
      femaleStudents: "35%",
      averageAge: 30,
      classSize: 110
    },
    outcomes: {
      employmentRate: "92%",
      averageSalary: {
        amount: 125000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "95%",
      topRecruiters: ["McKinsey & Company", "Boston Consulting Group", "Goldman Sachs", "Google", "Amazon"]
    },
    highlights: [
      "Gateway to Asia-Pacific markets",
      "Strategic location in Singapore",
      "Strong finance program",
      "Diverse international student body"
    ],
    specializations: [
      "Finance",
      "Strategy",
      "Marketing",
      "Technology",
      "International Business"
    ],
    image: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=400&h=300&fit=crop&q=80",
    website: "https://www.ntu.edu.sg/nbs",
    applicationDeadlines: {
      round1: "September 30",
      round2: "November 30",
      round3: "February 28"
    },
    scholarships: [
      "NBS Scholarships",
      "ASEAN scholarships",
      "Merit-based aid",
      "Industry partnerships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 30,
      internationalism: "Extremely High"
    }
  },
  {
    id: 62,
    name: "Hong Kong University of Science and Technology Business School",
    shortName: "HKUST",
    location: "Hong Kong",
    country: "Hong Kong",
    region: "Asia",
    established: 1991,
    ranking: {
      global: 62,
      ftGlobal: 18,
      qsGlobal: 21
    },
    accreditation: ["AACSB", "EQUIS"],
    programs: {
      mba: {
        available: true,
        duration: "12 months",
        tuitionFee: "55,000",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "16 months",
        tuitionFee: "75,000"
      },
      masters: ["Master of Science in Finance", "Master of Science in Management"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 680,
        minScore: 620
      },
      gre: {
        accepted: true,
        averageScore: 318
      },
      workExperience: {
        required: true,
        averageYears: 5.8,
        minYears: 2
      },
      englishTest: {
        toefl: 100,
        ielts: 6.5
      }
    },
    statistics: {
      studentBody: 140,
      internationalStudents: "75%",
      femaleStudents: "38%",
      averageAge: 29,
      classSize: 140
    },
    outcomes: {
      employmentRate: "94%",
      averageSalary: {
        amount: 135000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "105%",
      topRecruiters: ["McKinsey & Company", "Boston Consulting Group", "Goldman Sachs", "Morgan Stanley", "Google"]
    },
    highlights: [
      "Bridge between East and West",
      "Strong finance and consulting programs",
      "Beautiful waterfront campus",
      "Excellent Asian network"
    ],
    specializations: [
      "Finance",
      "Consulting",
      "Technology",
      "International Business",
      "Strategy"
    ],
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=300&fit=crop&q=80",
    website: "https://www.bm.hkust.edu.hk",
    applicationDeadlines: {
      round1: "October 4",
      round2: "December 6",
      round3: "February 7"
    },
    scholarships: [
      "HKUST Scholarships",
      "Asian scholarships",
      "Merit-based aid",
      "Corporate sponsorships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 25,
      internationalism: "Extremely High"
    }
  },
  {
    id: 63,
    name: "Indian Institute of Management Calcutta",
    shortName: "IIM Calcutta",
    location: "Kolkata",
    country: "India",
    region: "Asia",
    established: 1961,
    ranking: {
      global: 63,
      ftGlobal: 88,
      qsGlobal: 52
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "23,000",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "18 months",
        tuitionFee: "32,000"
      },
      masters: ["Fellow Programme in Management"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: 710,
        minScore: 670
      },
      gre: {
        accepted: true,
        averageScore: 322
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
      studentBody: 460,
      internationalStudents: "12%",
      femaleStudents: "38%",
      averageAge: 26,
      classSize: 460
    },
    outcomes: {
      employmentRate: "97%",
      averageSalary: {
        amount: 42000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "110%",
      topRecruiters: ["McKinsey & Company", "Boston Consulting Group", "Goldman Sachs", "Deloitte", "Amazon"]
    },
    highlights: [
      "Top Indian business school",
      "Strong analytical foundation",
      "Excellent value for money",
      "Historic Kolkata campus"
    ],
    specializations: [
      "Finance",
      "Consulting",
      "Operations",
      "Marketing",
      "Strategy"
    ],
    image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=400&h=300&fit=crop&q=80",
    website: "https://www.iimcal.ac.in",
    applicationDeadlines: {
      round1: "December 15",
      round2: "February 28",
      final: "April 15"
    },
    scholarships: [
      "Merit scholarships",
      "Need-based aid",
      "Government scholarships",
      "Corporate scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 35,
      internationalism: "Moderate"
    }
  },
  // ASIA-PACIFIC AND OCEANIA (64-85)
  {
    id: 64,
    name: "Australian Graduate School of Management",
    shortName: "AGSM",
    location: "Sydney",
    country: "Australia",
    region: "Asia-Pacific",
    established: 1977,
    ranking: {
      global: 64,
      ftGlobal: 65,
      qsGlobal: 95
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "16 months",
        tuitionFee: "89,000",
        currency: "AUD"
      },
      emba: {
        available: true,
        duration: "18 months",
        tuitionFee: "125,000"
      },
      masters: ["Master of Management", "Master of Commerce"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 630,
        minScore: 580
      },
      gre: {
        accepted: true,
        averageScore: 308
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
      studentBody: 180,
      internationalStudents: "55%",
      femaleStudents: "42%",
      averageAge: 31,
      classSize: 90
    },
    outcomes: {
      employmentRate: "88%",
      averageSalary: {
        amount: 98000,
        currency: "AUD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "75%",
      topRecruiters: ["McKinsey & Company", "Deloitte", "PwC", "Commonwealth Bank", "Woolworths"]
    },
    highlights: [
      "Premier Australian business school",
      "Strong Asia-Pacific network",
      "Located in Sydney business district",
      "Excellent industry connections"
    ],
    specializations: [
      "Finance",
      "Strategy",
      "Marketing",
      "Operations",
      "International Business"
    ],
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&h=300&fit=crop&q=80",
    website: "https://www.business.unsw.edu.au/agsm",
    applicationDeadlines: {
      round1: "October 31",
      round2: "February 28",
      round3: "April 30"
    },
    scholarships: [
      "AGSM Scholarships",
      "International scholarships",
      "Merit-based aid",
      "Industry partnerships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 25,
      internationalism: "Very High"
    }
  },
  {
    id: 65,
    name: "Korea Advanced Institute of Science and Technology Business School",
    shortName: "KAIST",
    location: "Seoul",
    country: "South Korea",
    region: "Asia",
    established: 1996,
    ranking: {
      global: 65,
      ftGlobal: 75,
      qsGlobal: 68
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "18 months",
        tuitionFee: "45,000",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "65,000"
      },
      masters: ["Master of Science in Finance", "Master of Information & Media"],
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
        averageScore: 312
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
      studentBody: 120,
      internationalStudents: "45%",
      femaleStudents: "32%",
      averageAge: 29,
      classSize: 60
    },
    outcomes: {
      employmentRate: "90%",
      averageSalary: {
        amount: 85000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "88%",
      topRecruiters: ["Samsung", "LG", "McKinsey & Company", "Deloitte", "Google"]
    },
    highlights: [
      "Strong in technology and innovation",
      "Connection to Korean conglomerates",
      "Growing international reputation",
      "Modern Seoul campus"
    ],
    specializations: [
      "Technology",
      "Innovation",
      "Finance",
      "Strategy",
      "Entrepreneurship"
    ],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&q=80",
    website: "https://business.kaist.ac.kr",
    applicationDeadlines: {
      round1: "November 30",
      round2: "February 28",
      round3: "April 30"
    },
    scholarships: [
      "KAIST Scholarships",
      "International scholarships",
      "Merit-based aid",
      "Government scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 20,
      internationalism: "High"
    }
  },
  // ADDITIONAL ASIAN SCHOOLS (66-70)
  {
    id: 66,
    name: "Indian Institute of Management Lucknow",
    shortName: "IIM Lucknow",
    location: "Lucknow",
    country: "India",
    region: "Asia",
    established: 1984,
    ranking: {
      global: 66,
      ftGlobal: 92,
      qsGlobal: 85
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "22,000",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "16 months",
        tuitionFee: "30,000"
      },
      masters: ["Fellow Programme in Management"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: 700,
        minScore: 650
      },
      gre: {
        accepted: true,
        averageScore: 320
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
      studentBody: 440,
      internationalStudents: "10%",
      femaleStudents: "40%",
      averageAge: 26,
      classSize: 220
    },
    outcomes: {
      employmentRate: "96%",
      averageSalary: {
        amount: 38000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "105%",
      topRecruiters: ["Deloitte", "PwC", "Goldman Sachs", "Amazon", "Tata Consultancy"]
    },
    highlights: [
      "Top-tier Indian business school",
      "Strong industry connections",
      "Excellent value proposition",
      "Growing international reputation"
    ],
    specializations: [
      "Finance",
      "Marketing",
      "Operations",
      "Strategy",
      "IT & Systems"
    ],
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop&q=80",
    website: "https://www.iiml.ac.in",
    applicationDeadlines: {
      round1: "December 31",
      round2: "March 15",
      final: "April 30"
    },
    scholarships: [
      "Merit scholarships",
      "Need-based aid",
      "Government scholarships",
      "Alumni support"
    ],
    campusLife: {
      housing: true,
      studentClubs: 30,
      internationalism: "Moderate"
    }
  },
  {
    id: 67,
    name: "Tsinghua University School of Economics and Management",
    shortName: "Tsinghua SEM",
    location: "Beijing",
    country: "China",
    region: "Asia",
    established: 1984,
    ranking: {
      global: 67,
      ftGlobal: 42,
      qsGlobal: 35
    },
    accreditation: ["AACSB", "EQUIS"],
    programs: {
      mba: {
        available: true,
        duration: "24 months",
        tuitionFee: "45,000",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "65,000"
      },
      masters: ["Master in Management", "Master in Finance"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 665,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 315
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
      studentBody: 300,
      internationalStudents: "25%",
      femaleStudents: "35%",
      averageAge: 28,
      classSize: 150
    },
    outcomes: {
      employmentRate: "94%",
      averageSalary: {
        amount: 105000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "145%",
      topRecruiters: ["McKinsey & Company", "Boston Consulting Group", "Alibaba", "ByteDance", "Tencent"]
    },
    highlights: [
      "Top Chinese university",
      "Strong tech industry connections",
      "Prestigious Beijing location",
      "Government and industry partnerships"
    ],
    specializations: [
      "Technology",
      "Finance",
      "Strategy",
      "Innovation",
      "China Business"
    ],
    image: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400&h=300&fit=crop&q=80",
    website: "https://www.sem.tsinghua.edu.cn",
    applicationDeadlines: {
      round1: "October 15",
      round2: "December 15",
      round3: "March 1"
    },
    scholarships: [
      "University scholarships",
      "Merit-based aid",
      "International student support",
      "Corporate sponsorships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 40,
      internationalism: "High"
    }
  },
  {
    id: 68,
    name: "Peking University Guanghua School of Management",
    shortName: "PKU Guanghua",
    location: "Beijing",
    country: "China",
    region: "Asia",
    established: 1985,
    ranking: {
      global: 68,
      ftGlobal: 38,
      qsGlobal: 42
    },
    accreditation: ["EQUIS"],
    programs: {
      mba: {
        available: true,
        duration: "24 months",
        tuitionFee: "48,000",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "68,000"
      },
      masters: ["Master in Finance", "Master in Management"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 670,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 316
      },
      workExperience: {
        required: true,
        averageYears: 5.8,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 250,
      internationalStudents: "20%",
      femaleStudents: "38%",
      averageAge: 29,
      classSize: 125
    },
    outcomes: {
      employmentRate: "96%",
      averageSalary: {
        amount: 115000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "155%",
      topRecruiters: ["McKinsey & Company", "Boston Consulting Group", "Alibaba", "Tencent", "Goldman Sachs"]
    },
    highlights: [
      "Elite Chinese business school",
      "Strong government connections",
      "Prestigious university brand",
      "Leading research institution"
    ],
    specializations: [
      "Finance",
      "Strategy",
      "China Business",
      "Technology",
      "Investment Banking"
    ],
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=300&fit=crop&q=80",
    website: "https://www.gsm.pku.edu.cn",
    applicationDeadlines: {
      round1: "October 31",
      round2: "January 15",
      round3: "March 31"
    },
    scholarships: [
      "Guanghua scholarships",
      "Merit-based aid",
      "Government support",
      "Corporate partnerships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 35,
      internationalism: "Moderate"
    }
  },
  {
    id: 69,
    name: "Tokyo Business School, Waseda University",
    shortName: "Waseda Business School",
    location: "Tokyo",
    country: "Japan",
    region: "Asia",
    established: 1998,
    ranking: {
      global: 69,
      ftGlobal: 85,
      qsGlobal: 128
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "24 months",
        tuitionFee: "55,000",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "18 months",
        tuitionFee: "72,000"
      },
      masters: ["Master in Finance"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 630,
        minScore: 580
      },
      gre: {
        accepted: true,
        averageScore: 308
      },
      workExperience: {
        required: true,
        averageYears: 5.5,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 180,
      internationalStudents: "35%",
      femaleStudents: "42%",
      averageAge: 30,
      classSize: 90
    },
    outcomes: {
      employmentRate: "88%",
      averageSalary: {
        amount: 95000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "85%",
      topRecruiters: ["McKinsey & Company", "Deloitte", "Sony", "Toyota", "SoftBank"]
    },
    highlights: [
      "Leading Japanese business school",
      "Strong corporate connections",
      "International perspective",
      "Located in global Tokyo"
    ],
    specializations: [
      "Strategy",
      "Finance",
      "Technology",
      "International Business",
      "Innovation"
    ],
    image: "https://images.unsplash.com/photo-1551474083-7b3bc61ba400?w=400&h=300&fit=crop&q=80",
    website: "https://www.waseda.jp/fcom/wbs/",
    applicationDeadlines: {
      round1: "November 30",
      round2: "February 28",
      round3: "April 30"
    },
    scholarships: [
      "Waseda scholarships",
      "International scholarships",
      "Merit-based aid",
      "Corporate sponsorships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 28,
      internationalism: "High"
    }
  },
  {
    id: 70,
    name: "Indian School of Business",
    shortName: "ISB",
    location: "Hyderabad",
    country: "India",
    region: "Asia",
    established: 2001,
    ranking: {
      global: 70,
      ftGlobal: 48,
      qsGlobal: 62
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "12 months",
        tuitionFee: "65,000",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "18 months",
        tuitionFee: "95,000"
      },
      masters: ["Advanced Management Programme"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 708,
        minScore: 650
      },
      gre: {
        accepted: true,
        averageScore: 320
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
      studentBody: 910,
      internationalStudents: "25%",
      femaleStudents: "32%",
      averageAge: 27,
      classSize: 910
    },
    outcomes: {
      employmentRate: "95%",
      averageSalary: {
        amount: 135000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "125%",
      topRecruiters: ["McKinsey & Company", "Boston Consulting Group", "Goldman Sachs", "Amazon", "Google"]
    },
    highlights: [
      "Premier one-year MBA program",
      "Strong industry connections",
      "High salary outcomes",
      "World-class faculty"
    ],
    specializations: [
      "Consulting",
      "Finance",
      "Technology",
      "Strategy",
      "Entrepreneurship"
    ],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop&q=80",
    website: "https://www.isb.edu",
    applicationDeadlines: {
      round1: "September 15",
      round2: "December 10",
      round3: "February 5"
    },
    scholarships: [
      "ISB Scholarships",
      "Merit scholarships",
      "Diversity scholarships",
      "Industry partnerships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 50,
      internationalism: "High"
    }
  },
  // LATIN AMERICA (71-85)
  {
    id: 71,
    name: "INCAE Business School",
    shortName: "INCAE",
    location: "Alajuela",
    country: "Costa Rica",
    region: "Latin America",
    established: 1964,
    ranking: {
      global: 71,
      ftGlobal: 95,
      qsGlobal: 125
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "22 months",
        tuitionFee: "42,000",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "18 months",
        tuitionFee: "55,000"
      },
      masters: ["Master in International Management"],
      phd: false
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 580,
        minScore: 520
      },
      gre: {
        accepted: true,
        averageScore: 300
      },
      workExperience: {
        required: true,
        averageYears: 4.5,
        minYears: 2
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 120,
      internationalStudents: "85%",
      femaleStudents: "45%",
      averageAge: 30,
      classSize: 60
    },
    outcomes: {
      employmentRate: "85%",
      averageSalary: {
        amount: 65000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "75%",
      topRecruiters: ["Deloitte", "PwC", "P&G", "Unilever", "Coca-Cola"]
    },
    highlights: [
      "Premier Latin American business school",
      "Strong regional network",
      "Focus on emerging markets",
      "Sustainable business practices"
    ],
    specializations: [
      "International Business",
      "Sustainability",
      "Emerging Markets",
      "Strategy",
      "Marketing"
    ],
    image: "https://images.unsplash.com/photo-1609166214667-34f7c52e8e16?w=400&h=300&fit=crop&q=80",
    website: "https://www.incae.edu",
    applicationDeadlines: {
      round1: "February 15",
      round2: "April 15",
      round3: "June 15"
    },
    scholarships: [
      "INCAE Scholarships",
      "Regional scholarships",
      "Merit-based aid",
      "Corporate partnerships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 15,
      internationalism: "Extremely High"
    }
  },
  {
    id: 72,
    name: "Fundação Getulio Vargas - EAESP",
    shortName: "FGV-EAESP",
    location: "São Paulo",
    country: "Brazil",
    region: "Latin America",
    established: 1944,
    ranking: {
      global: 72,
      ftGlobal: 88,
      qsGlobal: 135
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "21 months",
        tuitionFee: "38,000",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "24 months",
        tuitionFee: "48,000"
      },
      masters: ["Master in International Management"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 600,
        minScore: 550
      },
      gre: {
        accepted: true,
        averageScore: 305
      },
      workExperience: {
        required: true,
        averageYears: 5.8,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 180,
      internationalStudents: "30%",
      femaleStudents: "50%",
      averageAge: 31,
      classSize: 90
    },
    outcomes: {
      employmentRate: "88%",
      averageSalary: {
        amount: 72000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "80%",
      topRecruiters: ["McKinsey & Company", "Bain & Company", "Petrobras", "Vale", "Itaú"]
    },
    highlights: [
      "Top Brazilian business school",
      "Strong Latin American network",
      "Research excellence",
      "Government connections"
    ],
    specializations: [
      "Finance",
      "Strategy",
      "Public Management",
      "Operations",
      "Marketing"
    ],
    image: "https://images.unsplash.com/photo-1599670409242-c02f6825dafb?w=400&h=300&fit=crop&q=80",
    website: "https://eaesp.fgv.br",
    applicationDeadlines: {
      round1: "March 15",
      round2: "May 15",
      round3: "July 15"
    },
    scholarships: [
      "FGV Scholarships",
      "Merit-based aid",
      "Government scholarships",
      "Corporate partnerships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 25,
      internationalism: "High"
    }
  },
  // MIDDLE EAST & AFRICA (73-80)
  {
    id: 73,
    name: "American University of Beirut - Suliman S. Olayan School of Business",
    shortName: "AUB Olayan",
    location: "Beirut",
    country: "Lebanon",
    region: "Middle East",
    established: 1991,
    ranking: {
      global: 73,
      ftGlobal: 125,
      qsGlobal: 155
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "16 months",
        tuitionFee: "35,000",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "45,000"
      },
      masters: ["Master in Finance"],
      phd: false
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 570,
        minScore: 500
      },
      gre: {
        accepted: true,
        averageScore: 295
      },
      workExperience: {
        required: true,
        averageYears: 4.2,
        minYears: 2
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 85,
      internationalStudents: "60%",
      femaleStudents: "55%",
      averageAge: 29,
      classSize: 42
    },
    outcomes: {
      employmentRate: "82%",
      averageSalary: {
        amount: 55000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "65%",
      topRecruiters: ["Deloitte", "PwC", "KPMG", "Bank Audi", "Blom Bank"]
    },
    highlights: [
      "Leading business school in the region",
      "Strategic location for MENA markets",
      "Strong alumni network",
      "English-language instruction"
    ],
    specializations: [
      "Finance",
      "Marketing",
      "Operations",
      "International Business",
      "Entrepreneurship"
    ],
    image: "https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?w=400&h=300&fit=crop&q=80",
    website: "https://www.aub.edu.lb/osb/",
    applicationDeadlines: {
      round1: "February 1",
      round2: "April 1",
      round3: "June 1"
    },
    scholarships: [
      "AUB Scholarships",
      "Merit-based aid",
      "Regional scholarships",
      "Need-based support"
    ],
    campusLife: {
      housing: true,
      studentClubs: 20,
      internationalism: "Very High"
    }
  },
  {
    id: 74,
    name: "University of Cape Town Graduate School of Business",
    shortName: "UCT GSB",
    location: "Cape Town",
    country: "South Africa",
    region: "Africa",
    established: 1964,
    ranking: {
      global: 74,
      ftGlobal: 115,
      qsGlobal: 145
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "15 months",
        tuitionFee: "28,000",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "18 months",
        tuitionFee: "38,000"
      },
      masters: ["Master of Commerce in Development Finance"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 580,
        minScore: 520
      },
      gre: {
        accepted: true,
        averageScore: 300
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
      studentBody: 160,
      internationalStudents: "45%",
      femaleStudents: "48%",
      averageAge: 32,
      classSize: 80
    },
    outcomes: {
      employmentRate: "80%",
      averageSalary: {
        amount: 48000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "70%",
      topRecruiters: ["Deloitte", "PwC", "Standard Bank", "Nedbank", "MTN"]
    },
    highlights: [
      "Leading African business school",
      "Focus on emerging markets",
      "Beautiful Cape Town setting",
      "Strong development focus"
    ],
    specializations: [
      "Development Finance",
      "Strategy",
      "Marketing",
      "Operations",
      "Sustainability"
    ],
    image: "https://images.unsplash.com/photo-1533834681848-0cad92e1e6a5?w=400&h=300&fit=crop&q=80",
    website: "https://www.gsb.uct.ac.za",
    applicationDeadlines: {
      round1: "April 30",
      round2: "July 31",
      round3: "September 30"
    },
    scholarships: [
      "UCT GSB Scholarships",
      "African scholarships",
      "Development scholarships",
      "Merit-based aid"
    ],
    campusLife: {
      housing: true,
      studentClubs: 18,
      internationalism: "High"
    }
  },
  // ASIA-PACIFIC (75-85)
  {
    id: 75,
    name: "Melbourne Business School",
    shortName: "MBS",
    location: "Melbourne",
    country: "Australia",
    region: "Asia-Pacific",
    established: 1954,
    ranking: {
      global: 75,
      ftGlobal: 58,
      qsGlobal: 89
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "17 months",
        tuitionFee: "92,000",
        currency: "AUD"
      },
      emba: {
        available: true,
        duration: "17 months",
        tuitionFee: "128,000"
      },
      masters: ["Master of Management", "Master of Marketing"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 640,
        minScore: 580
      },
      gre: {
        accepted: true,
        averageScore: 310
      },
      workExperience: {
        required: true,
        averageYears: 7.2,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 200,
      internationalStudents: "70%",
      femaleStudents: "40%",
      averageAge: 32,
      classSize: 100
    },
    outcomes: {
      employmentRate: "90%",
      averageSalary: {
        amount: 105000,
        currency: "AUD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "82%",
      topRecruiters: ["McKinsey & Company", "Deloitte", "Commonwealth Bank", "ANZ", "Telstra"]
    },
    highlights: [
      "Australia's oldest business school",
      "Strong Asia-Pacific connections",
      "Vibrant Melbourne culture",
      "Excellent industry partnerships"
    ],
    specializations: [
      "Finance",
      "Strategy",
      "Marketing",
      "Operations",
      "Innovation"
    ],
    image: "https://images.unsplash.com/photo-1564672284862-7ecabaa50ee0?w=400&h=300&fit=crop&q=80",
    website: "https://www.mbs.edu",
    applicationDeadlines: {
      round1: "September 15",
      round2: "November 30",
      round3: "February 28"
    },
    scholarships: [
      "MBS Scholarships",
      "International scholarships",
      "Merit-based aid",
      "Industry partnerships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 30,
      internationalism: "Very High"
    }
  },
  // ADDITIONAL NORTH AMERICAN SCHOOLS (76-90)
  {
    id: 76,
    name: "Schulich School of Business, York University",
    shortName: "Schulich",
    location: "Toronto, ON",
    country: "Canada",
    region: "North America",
    established: 1966,
    ranking: {
      global: 76,
      ftGlobal: 78,
      qsGlobal: 65
    },
    accreditation: ["AACSB", "EQUIS"],
    programs: {
      mba: {
        available: true,
        duration: "20 months",
        tuitionFee: "55,000",
        currency: "CAD"
      },
      emba: {
        available: true,
        duration: "28 months",
        tuitionFee: "145,000"
      },
      masters: ["Master of Finance", "Master of Real Estate"],
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
        averageScore: 310
      },
      workExperience: {
        required: true,
        averageYears: 4.2,
        minYears: 2
      },
      englishTest: {
        toefl: 100,
        ielts: 7.5
      }
    },
    statistics: {
      studentBody: 350,
      internationalStudents: "65%",
      femaleStudents: "42%",
      averageAge: 28,
      classSize: 175
    },
    outcomes: {
      employmentRate: "91%",
      averageSalary: {
        amount: 98000,
        currency: "CAD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "76%",
      topRecruiters: ["RBC", "TD Bank", "Deloitte", "McKinsey & Company", "Amazon"]
    },
    highlights: [
      "International focus",
      "Strong alumni network globally",
      "Diverse student body",
      "Located in Toronto financial district"
    ],
    specializations: [
      "International Business",
      "Finance",
      "Strategy",
      "Marketing",
      "Real Estate"
    ],
    image: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=400&h=300&fit=crop&q=80",
    website: "https://schulich.yorku.ca",
    applicationDeadlines: {
      round1: "November 3",
      round2: "January 12",
      round3: "March 30"
    },
    scholarships: [
      "Schulich Scholarships",
      "International scholarships",
      "Merit-based aid",
      "Entrance awards"
    ],
    campusLife: {
      housing: true,
      studentClubs: 45,
      internationalism: "Extremely High"
    }
  },
  {
    id: 77,
    name: "Ivey Business School, Western University",
    shortName: "Ivey",
    location: "London, ON",
    country: "Canada",
    region: "North America",
    established: 1922,
    ranking: {
      global: 77,
      ftGlobal: 85,
      qsGlobal: 58
    },
    accreditation: ["AACSB", "EQUIS"],
    programs: {
      mba: {
        available: true,
        duration: "12 months",
        tuitionFee: "89,500",
        currency: "CAD"
      },
      emba: {
        available: true,
        duration: "16 months",
        tuitionFee: "125,000"
      },
      masters: ["Master of International Business"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 660,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 312
      },
      workExperience: {
        required: true,
        averageYears: 4.5,
        minYears: 2
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 180,
      internationalStudents: "35%",
      femaleStudents: "38%",
      averageAge: 27,
      classSize: 180
    },
    outcomes: {
      employmentRate: "94%",
      averageSalary: {
        amount: 102000,
        currency: "CAD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "82%",
      topRecruiters: ["McKinsey & Company", "Bain & Company", "RBC", "Shopify", "Amazon"]
    },
    highlights: [
      "Case-method learning pioneer",
      "Strong general management focus",
      "Excellent alumni network",
      "Intensive one-year program"
    ],
    specializations: [
      "General Management",
      "Strategy",
      "Finance",
      "Consulting",
      "Entrepreneurship"
    ],
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=300&fit=crop&q=80",
    website: "https://www.ivey.uwo.ca",
    applicationDeadlines: {
      round1: "October 7",
      round2: "December 2",
      round3: "February 3"
    },
    scholarships: [
      "Ivey Scholarships",
      "Leadership awards",
      "Merit-based aid",
      "International student support"
    ],
    campusLife: {
      housing: true,
      studentClubs: 25,
      internationalism: "High"
    }
  },
  // MORE EUROPEAN SCHOOLS (78-90)
  {
    id: 78,
    name: "Mannheim Business School",
    shortName: "MBS Mannheim",
    location: "Mannheim",
    country: "Germany",
    region: "Europe",
    established: 2005,
    ranking: {
      global: 78,
      ftGlobal: 68,
      qsGlobal: 92
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "12 months",
        tuitionFee: "54,000",
        currency: "EUR"
      },
      emba: {
        available: true,
        duration: "18 months",
        tuitionFee: "62,000"
      },
      masters: ["Master in Management"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 630,
        minScore: 580
      },
      gre: {
        accepted: true,
        averageScore: 308
      },
      workExperience: {
        required: true,
        averageYears: 5.5,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 95,
      internationalStudents: "80%",
      femaleStudents: "35%",
      averageAge: 30,
      classSize: 95
    },
    outcomes: {
      employmentRate: "92%",
      averageSalary: {
        amount: 95000,
        currency: "EUR",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "78%",
      topRecruiters: ["McKinsey & Company", "Boston Consulting Group", "SAP", "Siemens", "BASF"]
    },
    highlights: [
      "Top German business school",
      "Strong corporate connections",
      "Excellent European network",
      "Focus on digital transformation"
    ],
    specializations: [
      "Digital Transformation",
      "Strategy",
      "Finance",
      "Operations",
      "Innovation"
    ],
    image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=400&h=300&fit=crop&q=80",
    website: "https://www.mannheim-business-school.com",
    applicationDeadlines: {
      round1: "September 30",
      round2: "December 15",
      round3: "March 15"
    },
    scholarships: [
      "MBS Scholarships",
      "Excellence scholarships",
      "Industry partnerships",
      "Diversity scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 20,
      internationalism: "Extremely High"
    }
  },
  // FINAL SCHOOLS TO REACH 100+ (79-105)
  {
    id: 79,
    name: "Cox School of Business, Southern Methodist University",
    shortName: "SMU Cox",
    location: "Dallas, TX",
    country: "USA",
    region: "North America",
    established: 1920,
    ranking: {
      global: 79,
      ftGlobal: 92,
      qsGlobal: 115
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "22 months",
        tuitionFee: "58,680",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "21 months",
        tuitionFee: "158,000"
      },
      masters: ["Master of Finance"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 660,
        minScore: 600
      },
      gre: {
        accepted: true,
        averageScore: 312
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
      studentBody: 380,
      internationalStudents: "38%",
      femaleStudents: "35%",
      averageAge: 28,
      classSize: 190
    },
    outcomes: {
      employmentRate: "89%",
      averageSalary: {
        amount: 128000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "72%",
      topRecruiters: ["ExxonMobil", "AT&T", "American Airlines", "Deloitte", "PwC"]
    },
    highlights: [
      "Strong corporate connections in Texas",
      "Growing tech and energy sectors",
      "Beautiful Dallas campus",
      "Excellent alumni network"
    ],
    specializations: [
      "Finance",
      "Energy",
      "Technology",
      "Strategy",
      "Marketing"
    ],
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&h=300&fit=crop&q=80",
    website: "https://www.smu.edu/cox",
    applicationDeadlines: {
      round1: "October 15",
      round2: "January 15",
      round3: "March 15"
    },
    scholarships: [
      "Cox Scholarships",
      "Merit-based aid",
      "Diversity scholarships",
      "Leadership awards"
    ],
    campusLife: {
      housing: true,
      studentClubs: 35,
      internationalism: "High"
    }
  },
  {
    id: 80,
    name: "Fisher College of Business, The Ohio State University",
    shortName: "Ohio State Fisher",
    location: "Columbus, OH",
    country: "USA",
    region: "North America",
    established: 1916,
    ranking: {
      global: 80,
      ftGlobal: 95,
      qsGlobal: 118
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "34,560",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "21 months",
        tuitionFee: "125,000"
      },
      masters: ["Master of Accounting"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 640,
        minScore: 580
      },
      gre: {
        accepted: true,
        averageScore: 310
      },
      workExperience: {
        required: true,
        averageYears: 4.5,
        minYears: 2
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 220,
      internationalStudents: "42%",
      femaleStudents: "40%",
      averageAge: 27,
      classSize: 110
    },
    outcomes: {
      employmentRate: "86%",
      averageSalary: {
        amount: 110000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "68%",
      topRecruiters: ["Deloitte", "PwC", "Amazon", "JP Morgan Chase", "Nationwide"]
    },
    highlights: [
      "Excellent value for money",
      "Strong Midwest network",
      "Growing Columbus tech scene",
      "Affordable tuition"
    ],
    specializations: [
      "Finance",
      "Operations",
      "Marketing",
      "Real Estate",
      "Supply Chain"
    ],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&q=80",
    website: "https://fisher.osu.edu",
    applicationDeadlines: {
      round1: "October 15",
      round2: "December 15",
      round3: "February 15"
    },
    scholarships: [
      "Fisher Scholarships",
      "Merit-based aid",
      "Graduate assistantships",
      "Diversity awards"
    ],
    campusLife: {
      housing: true,
      studentClubs: 30,
      internationalism: "Very High"
    }
  },
  // FINAL SCHOOLS TO REACH 100+ (81-100)
  {
    id: 81,
    name: "Monash Business School",
    shortName: "Monash",
    location: "Melbourne",
    country: "Australia",
    region: "Asia-Pacific",
    established: 1961,
    ranking: {
      global: 81,
      ftGlobal: 95,
      qsGlobal: 145
    },
    accreditation: ["AACSB", "EQUIS"],
    programs: {
      mba: {
        available: true,
        duration: "18 months",
        tuitionFee: "85,000",
        currency: "AUD"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "118,000"
      },
      masters: ["Master of Business"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 620,
        minScore: 580
      },
      gre: {
        accepted: true,
        averageScore: 305
      },
      workExperience: {
        required: true,
        averageYears: 6.8,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 150,
      internationalStudents: "60%",
      femaleStudents: "45%",
      averageAge: 31,
      classSize: 75
    },
    outcomes: {
      employmentRate: "85%",
      averageSalary: {
        amount: 95000,
        currency: "AUD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "72%",
      topRecruiters: ["Deloitte", "PwC", "ANZ", "Westpac", "BHP"]
    },
    highlights: [
      "Strong research focus",
      "Industry partnerships",
      "Sustainable business focus",
      "Diverse student body"
    ],
    specializations: [
      "Sustainability",
      "Finance",
      "Marketing",
      "Operations",
      "Innovation"
    ],
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop&q=80",
    website: "https://www.monash.edu/business",
    applicationDeadlines: {
      round1: "October 31",
      round2: "February 28",
      final: "May 31"
    },
    scholarships: [
      "Monash Scholarships",
      "International scholarships",
      "Merit-based aid",
      "Research scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 25,
      internationalism: "Very High"
    }
  },
  {
    id: 82,
    name: "McDonough School of Business, Georgetown University",
    shortName: "Georgetown McDonough",
    location: "Washington, DC",
    country: "USA",
    region: "North America",
    established: 1957,
    ranking: {
      global: 82,
      ftGlobal: 68,
      qsGlobal: 95
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "21 months",
        tuitionFee: "65,280",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "195,000"
      },
      masters: ["Master of Science in Finance"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 680,
        minScore: 620
      },
      gre: {
        accepted: true,
        averageScore: 315
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
      studentBody: 580,
      internationalStudents: "35%",
      femaleStudents: "42%",
      averageAge: 28,
      classSize: 290
    },
    outcomes: {
      employmentRate: "92%",
      averageSalary: {
        amount: 145000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "78%",
      topRecruiters: ["Deloitte", "McKinsey & Company", "Amazon", "World Bank", "IMF"]
    },
    highlights: [
      "Located in Washington DC",
      "Strong government and policy connections",
      "Jesuit values and ethics focus",
      "Global perspective"
    ],
    specializations: [
      "Public Policy",
      "International Business",
      "Finance",
      "Consulting",
      "Nonprofit Management"
    ],
    image: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400&h=300&fit=crop&q=80",
    website: "https://msb.georgetown.edu",
    applicationDeadlines: {
      round1: "October 1",
      round2: "January 7",
      round3: "April 1"
    },
    scholarships: [
      "McDonough Scholarships",
      "Dean's Fellowships",
      "Public service scholarships",
      "International student aid"
    ],
    campusLife: {
      housing: true,
      studentClubs: 40,
      internationalism: "High"
    }
  },
  {
    id: 83,
    name: "European School of Economics",
    shortName: "ESE",
    location: "London",
    country: "United Kingdom",
    region: "Europe",
    established: 1994,
    ranking: {
      global: 83,
      ftGlobal: 125,
      qsGlobal: 185
    },
    accreditation: ["AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "12 months",
        tuitionFee: "38,000",
        currency: "GBP"
      },
      emba: {
        available: true,
        duration: "18 months",
        tuitionFee: "48,000"
      },
      masters: ["Master in Marketing", "Master in Finance"],
      phd: false
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 580,
        minScore: 520
      },
      gre: {
        accepted: true,
        averageScore: 295
      },
      workExperience: {
        required: true,
        averageYears: 4.5,
        minYears: 2
      },
      englishTest: {
        toefl: 100,
        ielts: 6.5
      }
    },
    statistics: {
      studentBody: 120,
      internationalStudents: "90%",
      femaleStudents: "50%",
      averageAge: 29,
      classSize: 60
    },
    outcomes: {
      employmentRate: "78%",
      averageSalary: {
        amount: 65000,
        currency: "GBP",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "55%",
      topRecruiters: ["Deloitte", "PwC", "KPMG", "Accenture", "EY"]
    },
    highlights: [
      "Multiple campus locations",
      "Highly international student body",
      "Practical business approach",
      "Industry connections"
    ],
    specializations: [
      "International Business",
      "Marketing",
      "Finance",
      "Fashion Management",
      "Media Management"
    ],
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=300&fit=crop&q=80",
    website: "https://www.ese.ac.uk",
    applicationDeadlines: {
      round1: "December 1",
      round2: "March 1",
      round3: "June 1"
    },
    scholarships: [
      "ESE Scholarships",
      "International scholarships",
      "Merit-based aid",
      "Industry partnerships"
    ],
    campusLife: {
      housing: false,
      studentClubs: 15,
      internationalism: "Extremely High"
    }
  },
  {
    id: 84,
    name: "EGADE Business School, Tecnológico de Monterrey",
    shortName: "EGADE",
    location: "Monterrey",
    country: "Mexico",
    region: "Latin America",
    established: 1995,
    ranking: {
      global: 84,
      ftGlobal: 118,
      qsGlobal: 158
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "24 months",
        tuitionFee: "32,000",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "45,000"
      },
      masters: ["Master in International Business"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 590,
        minScore: 540
      },
      gre: {
        accepted: true,
        averageScore: 302
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
      studentBody: 240,
      internationalStudents: "25%",
      femaleStudents: "48%",
      averageAge: 30,
      classSize: 120
    },
    outcomes: {
      employmentRate: "88%",
      averageSalary: {
        amount: 58000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "85%",
      topRecruiters: ["Deloitte", "PwC", "KPMG", "Cemex", "FEMSA"]
    },
    highlights: [
      "Leading Mexican business school",
      "Strong Latin American network",
      "Innovation focus",
      "Entrepreneurship programs"
    ],
    specializations: [
      "Entrepreneurship",
      "Innovation",
      "International Business",
      "Finance",
      "Strategy"
    ],
    image: "https://images.unsplash.com/photo-1551474083-7b3bc61ba400?w=400&h=300&fit=crop&q=80",
    website: "https://egade.tec.mx",
    applicationDeadlines: {
      round1: "April 15",
      round2: "June 15",
      round3: "August 15"
    },
    scholarships: [
      "EGADE Scholarships",
      "Academic excellence awards",
      "International student aid",
      "Corporate sponsorships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 30,
      internationalism: "High"
    }
  },
  {
    id: 85,
    name: "Macquarie Graduate School of Management",
    shortName: "MGSM",
    location: "Sydney",
    country: "Australia",
    region: "Asia-Pacific",
    established: 1969,
    ranking: {
      global: 85,
      ftGlobal: 105,
      qsGlobal: 165
    },
    accreditation: ["AACSB", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "18 months",
        tuitionFee: "78,000",
        currency: "AUD"
      },
      emba: {
        available: true,
        duration: "18 months",
        tuitionFee: "115,000"
      },
      masters: ["Master of Applied Finance"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 610,
        minScore: 550
      },
      gre: {
        accepted: true,
        averageScore: 300
      },
      workExperience: {
        required: true,
        averageYears: 6.2,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 180,
      internationalStudents: "55%",
      femaleStudents: "40%",
      averageAge: 32,
      classSize: 90
    },
    outcomes: {
      employmentRate: "82%",
      averageSalary: {
        amount: 88000,
        currency: "AUD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "68%",
      topRecruiters: ["Deloitte", "PwC", "Commonwealth Bank", "Westpac", "Macquarie Group"]
    },
    highlights: [
      "Strong finance program",
      "Industry connections",
      "Practical approach",
      "Sydney location"
    ],
    specializations: [
      "Finance",
      "Banking",
      "Strategy",
      "Marketing",
      "Operations"
    ],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop&q=80",
    website: "https://www.mgsm.edu.au",
    applicationDeadlines: {
      round1: "November 30",
      round2: "March 31",
      final: "May 31"
    },
    scholarships: [
      "MGSM Scholarships",
      "Industry scholarships",
      "Merit-based aid",
      "International student support"
    ],
    campusLife: {
      housing: true,
      studentClubs: 20,
      internationalism: "Very High"
    }
  },
  {
    id: 86,
    name: "Indian Institute of Management Bangalore",
    shortName: "IIM Bangalore",
    location: "Bangalore",
    country: "India",
    region: "Asia",
    established: 1973,
    ranking: {
      global: 86,
      ftGlobal: 95,
      qsGlobal: 85
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "24,000",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "17 months",
        tuitionFee: "33,000"
      },
      masters: ["Fellow Programme in Management"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: 705,
        minScore: 650
      },
      gre: {
        accepted: true,
        averageScore: 318
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
      studentBody: 480,
      internationalStudents: "8%",
      femaleStudents: "36%",
      averageAge: 26,
      classSize: 240
    },
    outcomes: {
      employmentRate: "97%",
      averageSalary: {
        amount: 40000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "108%",
      topRecruiters: ["McKinsey & Company", "Boston Consulting Group", "Goldman Sachs", "Amazon", "Google"]
    },
    highlights: [
      "Top Indian business school",
      "Located in India's Silicon Valley",
      "Strong tech industry connections",
      "Excellent academic reputation"
    ],
    specializations: [
      "Technology",
      "Finance",
      "Consulting",
      "Marketing",
      "Operations"
    ],
    image: "https://images.unsplash.com/photo-1609166214667-34f7c52e8e16?w=400&h=300&fit=crop&q=80",
    website: "https://www.iimb.ac.in",
    applicationDeadlines: {
      round1: "January 15",
      round2: "March 15",
      final: "April 30"
    },
    scholarships: [
      "Merit scholarships",
      "Need-based aid",
      "Government scholarships",
      "Alumni support"
    ],
    campusLife: {
      housing: true,
      studentClubs: 45,
      internationalism: "Moderate"
    }
  },
  {
    id: 87,
    name: "Thunderbird School of Global Management",
    shortName: "Thunderbird",
    location: "Phoenix, AZ",
    country: "USA",
    region: "North America",
    established: 1946,
    ranking: {
      global: 87,
      ftGlobal: 125,
      qsGlobal: 155
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "12 months",
        tuitionFee: "69,500",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "18 months",
        tuitionFee: "148,000"
      },
      masters: ["Master of Global Management"],
      phd: false
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 640,
        minScore: 580
      },
      gre: {
        accepted: true,
        averageScore: 308
      },
      workExperience: {
        required: true,
        averageYears: 5.8,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 350,
      internationalStudents: "70%",
      femaleStudents: "45%",
      averageAge: 30,
      classSize: 175
    },
    outcomes: {
      employmentRate: "85%",
      averageSalary: {
        amount: 105000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "65%",
      topRecruiters: ["Deloitte", "PwC", "Amazon", "Intel", "American Express"]
    },
    highlights: [
      "Focus on global management",
      "Highly international student body",
      "Language requirements",
      "Cultural immersion programs"
    ],
    specializations: [
      "Global Management",
      "International Business",
      "Finance",
      "Marketing",
      "Entrepreneurship"
    ],
    image: "https://images.unsplash.com/photo-1599670409242-c02f6825dafb?w=400&h=300&fit=crop&q=80",
    website: "https://thunderbird.asu.edu",
    applicationDeadlines: {
      round1: "November 15",
      round2: "February 15",
      round3: "April 15"
    },
    scholarships: [
      "Thunderbird Scholarships",
      "Global scholarships",
      "Merit-based aid",
      "International student support"
    ],
    campusLife: {
      housing: true,
      studentClubs: 40,
      internationalism: "Extremely High"
    }
  },
  {
    id: 88,
    name: "BI Norwegian Business School",
    shortName: "BI",
    location: "Oslo",
    country: "Norway",
    region: "Europe",
    established: 1943,
    ranking: {
      global: 88,
      ftGlobal: 135,
      qsGlobal: 185
    },
    accreditation: ["EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "18 months",
        tuitionFee: "52,000",
        currency: "EUR"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "65,000"
      },
      masters: ["Master in Management"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 610,
        minScore: 550
      },
      gre: {
        accepted: true,
        averageScore: 302
      },
      workExperience: {
        required: true,
        averageYears: 5.5,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 80,
      internationalStudents: "65%",
      femaleStudents: "48%",
      averageAge: 31,
      classSize: 40
    },
    outcomes: {
      employmentRate: "82%",
      averageSalary: {
        amount: 78000,
        currency: "EUR",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "72%",
      topRecruiters: ["DNB", "Equinor", "Deloitte", "McKinsey & Company", "Telenor"]
    },
    highlights: [
      "Scandinavian business approach",
      "Sustainability focus",
      "Small class size",
      "Nordic business network"
    ],
    specializations: [
      "Sustainability",
      "Energy",
      "Finance",
      "Strategy",
      "Innovation"
    ],
    image: "https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?w=400&h=300&fit=crop&q=80",
    website: "https://www.bi.edu",
    applicationDeadlines: {
      round1: "February 1",
      round2: "April 1",
      final: "June 1"
    },
    scholarships: [
      "BI Scholarships",
      "Nordic scholarships",
      "Merit-based aid",
      "International student support"
    ],
    campusLife: {
      housing: true,
      studentClubs: 15,
      internationalism: "Very High"
    }
  },
  {
    id: 89,
    name: "Jindal Global Business School",
    shortName: "JGBS",
    location: "Sonipat",
    country: "India",
    region: "Asia",
    established: 2009,
    ranking: {
      global: 89,
      ftGlobal: 145,
      qsGlobal: 195
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "18,000",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "16 months",
        tuitionFee: "25,000"
      },
      masters: ["Master of Business Laws"],
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
        averageScore: 310
      },
      workExperience: {
        required: true,
        averageYears: 4.2,
        minYears: 2
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 240,
      internationalStudents: "20%",
      femaleStudents: "45%",
      averageAge: 26,
      classSize: 120
    },
    outcomes: {
      employmentRate: "89%",
      averageSalary: {
        amount: 32000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "95%",
      topRecruiters: ["Deloitte", "PwC", "KPMG", "EY", "Amazon"]
    },
    highlights: [
      "Liberal arts approach",
      "Interdisciplinary learning",
      "International faculty",
      "Modern campus"
    ],
    specializations: [
      "Finance",
      "Marketing",
      "Strategy",
      "International Business",
      "Digital Business"
    ],
    image: "https://images.unsplash.com/photo-1533834681848-0cad92e1e6a5?w=400&h=300&fit=crop&q=80",
    website: "https://jgu.edu.in/jgbs/",
    applicationDeadlines: {
      round1: "February 28",
      round2: "April 30",
      round3: "June 30"
    },
    scholarships: [
      "Merit scholarships",
      "Need-based aid",
      "International student support",
      "Industry sponsorships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 35,
      internationalism: "High"
    }
  },
  {
    id: 90,
    name: "Freeman School of Business, Tulane University",
    shortName: "Tulane Freeman",
    location: "New Orleans, LA",
    country: "USA",
    region: "North America",
    established: 1914,
    ranking: {
      global: 90,
      ftGlobal: 125,
      qsGlobal: 175
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "21 months",
        tuitionFee: "58,320",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "18 months",
        tuitionFee: "142,000"
      },
      masters: ["Master of Finance", "Master of Accounting"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 640,
        minScore: 580
      },
      gre: {
        accepted: true,
        averageScore: 308
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
      studentBody: 320,
      internationalStudents: "35%",
      femaleStudents: "40%",
      averageAge: 28,
      classSize: 160
    },
    outcomes: {
      employmentRate: "87%",
      averageSalary: {
        amount: 118000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "70%",
      topRecruiters: ["Deloitte", "PwC", "EY", "Shell", "Capital One"]
    },
    highlights: [
      "Unique New Orleans culture",
      "Strong energy sector connections",
      "Social impact focus",
      "Tight-knit community"
    ],
    specializations: [
      "Energy",
      "Finance",
      "Marketing",
      "Strategy",
      "Social Impact"
    ],
    image: "https://images.unsplash.com/photo-1564672284862-7ecabaa50ee0?w=400&h=300&fit=crop&q=80",
    website: "https://freeman.tulane.edu",
    applicationDeadlines: {
      round1: "November 15",
      round2: "January 15",
      round3: "March 15"
    },
    scholarships: [
      "Freeman Scholarships",
      "Merit-based aid",
      "Leadership scholarships",
      "Diversity awards"
    ],
    campusLife: {
      housing: true,
      studentClubs: 30,
      internationalism: "High"
    }
  },
  {
    id: 91,
    name: "Strathmore Business School",
    shortName: "SBS",
    location: "Nairobi",
    country: "Kenya",
    region: "Africa",
    established: 1961,
    ranking: {
      global: 91,
      ftGlobal: 155,
      qsGlobal: 225
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "18 months",
        tuitionFee: "15,000",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "24 months",
        tuitionFee: "22,000"
      },
      masters: ["Master of Commerce"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 550,
        minScore: 500
      },
      gre: {
        accepted: true,
        averageScore: 290
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
      studentBody: 180,
      internationalStudents: "35%",
      femaleStudents: "52%",
      averageAge: 32,
      classSize: 90
    },
    outcomes: {
      employmentRate: "75%",
      averageSalary: {
        amount: 28000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "80%",
      topRecruiters: ["Deloitte", "PwC", "KPMG", "Safaricom", "Equity Bank"]
    },
    highlights: [
      "Leading East African business school",
      "Strong regional network",
      "Focus on African markets",
      "Social responsibility emphasis"
    ],
    specializations: [
      "African Business",
      "Finance",
      "Strategy",
      "Entrepreneurship",
      "Development Finance"
    ],
    image: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=400&h=300&fit=crop&q=80",
    website: "https://sbs.strathmore.edu",
    applicationDeadlines: {
      round1: "March 31",
      round2: "July 31",
      round3: "November 30"
    },
    scholarships: [
      "SBS Scholarships",
      "African development scholarships",
      "Merit-based aid",
      "Need-based support"
    ],
    campusLife: {
      housing: true,
      studentClubs: 20,
      internationalism: "High"
    }
  },
  {
    id: 92,
    name: "Grenoble Ecole de Management",
    shortName: "GEM",
    location: "Grenoble",
    country: "France",
    region: "Europe",
    established: 1984,
    ranking: {
      global: 92,
      ftGlobal: 138,
      qsGlobal: 195
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "12 months",
        tuitionFee: "42,000",
        currency: "EUR"
      },
      emba: {
        available: true,
        duration: "18 months",
        tuitionFee: "55,000"
      },
      masters: ["Master in International Business"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 600,
        minScore: 550
      },
      gre: {
        accepted: true,
        averageScore: 300
      },
      workExperience: {
        required: true,
        averageYears: 4.8,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 110,
      internationalStudents: "85%",
      femaleStudents: "45%",
      averageAge: 30,
      classSize: 55
    },
    outcomes: {
      employmentRate: "85%",
      averageSalary: {
        amount: 70000,
        currency: "EUR",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "70%",
      topRecruiters: ["L'Oréal", "Schneider Electric", "Orange", "Deloitte", "Capgemini"]
    },
    highlights: [
      "Beautiful Alpine location",
      "Strong innovation focus",
      "International diversity",
      "Technology emphasis"
    ],
    specializations: [
      "Innovation",
      "Technology",
      "International Business",
      "Finance",
      "Strategy"
    ],
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=300&fit=crop&q=80",
    website: "https://www.grenoble-em.com",
    applicationDeadlines: {
      round1: "November 30",
      round2: "February 28",
      round3: "April 30"
    },
    scholarships: [
      "GEM Scholarships",
      "Excellence scholarships",
      "International student aid",
      "Industry partnerships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 25,
      internationalism: "Extremely High"
    }
  },
  {
    id: 93,
    name: "Lagos Business School",
    shortName: "LBS",
    location: "Lagos",
    country: "Nigeria",
    region: "Africa",
    established: 1991,
    ranking: {
      global: 93,
      ftGlobal: 165,
      qsGlobal: 235
    },
    accreditation: ["AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "15 months",
        tuitionFee: "12,000",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "18,000"
      },
      masters: ["Master of Science in Management"],
      phd: false
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 540,
        minScore: 500
      },
      gre: {
        accepted: true,
        averageScore: 285
      },
      workExperience: {
        required: true,
        averageYears: 6.2,
        minYears: 4
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 120,
      internationalStudents: "25%",
      femaleStudents: "48%",
      averageAge: 33,
      classSize: 60
    },
    outcomes: {
      employmentRate: "78%",
      averageSalary: {
        amount: 25000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "85%",
      topRecruiters: ["Deloitte", "PwC", "KPMG", "MTN", "Dangote Group"]
    },
    highlights: [
      "Leading West African business school",
      "Strong local network",
      "Focus on African business",
      "Development impact"
    ],
    specializations: [
      "African Business",
      "Finance",
      "Strategy",
      "Entrepreneurship",
      "Public Management"
    ],
    image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=400&h=300&fit=crop&q=80",
    website: "https://www.lbs.edu.ng",
    applicationDeadlines: {
      round1: "April 30",
      round2: "July 31",
      final: "October 31"
    },
    scholarships: [
      "LBS Scholarships",
      "African development awards",
      "Merit-based aid",
      "Corporate sponsorships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 15,
      internationalism: "High"
    }
  },
  {
    id: 94,
    name: "Lahore University of Management Sciences",
    shortName: "LUMS",
    location: "Lahore",
    country: "Pakistan",
    region: "Asia",
    established: 1985,
    ranking: {
      global: 94,
      ftGlobal: 175,
      qsGlobal: 245
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "8,500",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "18 months",
        tuitionFee: "12,000"
      },
      masters: ["Master of Science in Management"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 620,
        minScore: 580
      },
      gre: {
        accepted: true,
        averageScore: 305
      },
      workExperience: {
        required: true,
        averageYears: 4.5,
        minYears: 2
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 160,
      internationalStudents: "15%",
      femaleStudents: "42%",
      averageAge: 27,
      classSize: 80
    },
    outcomes: {
      employmentRate: "92%",
      averageSalary: {
        amount: 18000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "120%",
      topRecruiters: ["Deloitte", "PwC", "Unilever", "Nestle", "Standard Chartered"]
    },
    highlights: [
      "Leading Pakistani business school",
      "Strong South Asian network",
      "Academic excellence",
      "Beautiful campus"
    ],
    specializations: [
      "Finance",
      "Marketing",
      "Strategy",
      "Operations",
      "Entrepreneurship"
    ],
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&h=300&fit=crop&q=80",
    website: "https://lums.edu.pk",
    applicationDeadlines: {
      round1: "February 28",
      round2: "April 30",
      final: "June 30"
    },
    scholarships: [
      "LUMS Scholarships",
      "Need-based aid",
      "Merit scholarships",
      "International student support"
    ],
    campusLife: {
      housing: true,
      studentClubs: 40,
      internationalism: "Moderate"
    }
  },
  {
    id: 95,
    name: "College of Management Academic Studies",
    shortName: "COMAS",
    location: "Rishon LeZion",
    country: "Israel",
    region: "Middle East",
    established: 1978,
    ranking: {
      global: 95,
      ftGlobal: 185,
      qsGlobal: 255
    },
    accreditation: ["AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "18 months",
        tuitionFee: "28,000",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "20 months",
        tuitionFee: "35,000"
      },
      masters: ["Master of Science in Finance"],
      phd: false
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 580,
        minScore: 530
      },
      gre: {
        accepted: true,
        averageScore: 295
      },
      workExperience: {
        required: true,
        averageYears: 4.8,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 140,
      internationalStudents: "30%",
      femaleStudents: "55%",
      averageAge: 30,
      classSize: 70
    },
    outcomes: {
      employmentRate: "80%",
      averageSalary: {
        amount: 62000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "68%",
      topRecruiters: ["Deloitte", "PwC", "KPMG", "Bank Leumi", "Check Point"]
    },
    highlights: [
      "Innovation and tech focus",
      "Strategic Middle East location",
      "Strong industry connections",
      "Entrepreneurship emphasis"
    ],
    specializations: [
      "Technology",
      "Innovation",
      "Finance",
      "Entrepreneurship",
      "Strategy"
    ],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&q=80",
    website: "https://www.colman.ac.il",
    applicationDeadlines: {
      round1: "March 1",
      round2: "May 1",
      round3: "July 1"
    },
    scholarships: [
      "COMAS Scholarships",
      "Merit-based aid",
      "Tech industry scholarships",
      "International student support"
    ],
    campusLife: {
      housing: false,
      studentClubs: 18,
      internationalism: "High"
    }
  },
  {
    id: 96,
    name: "Graduate School of Business, University of Witwatersrand",
    shortName: "Wits Business School",
    location: "Johannesburg",
    country: "South Africa",
    region: "Africa",
    established: 1967,
    ranking: {
      global: 96,
      ftGlobal: 195,
      qsGlobal: 265
    },
    accreditation: ["AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "18 months",
        tuitionFee: "22,000",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "24 months",
        tuitionFee: "32,000"
      },
      masters: ["Master of Management in Finance"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 560,
        minScore: 520
      },
      gre: {
        accepted: true,
        averageScore: 290
      },
      workExperience: {
        required: true,
        averageYears: 6.8,
        minYears: 4
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 200,
      internationalStudents: "40%",
      femaleStudents: "50%",
      averageAge: 34,
      classSize: 100
    },
    outcomes: {
      employmentRate: "78%",
      averageSalary: {
        amount: 42000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "75%",
      topRecruiters: ["Deloitte", "PwC", "Standard Bank", "FNB", "Anglo American"]
    },
    highlights: [
      "Strong African focus",
      "Mining and resources expertise",
      "Social responsibility emphasis",
      "Diverse student body"
    ],
    specializations: [
      "Mining & Resources",
      "Finance",
      "Strategy",
      "Public Management",
      "Development Finance"
    ],
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop&q=80",
    website: "https://www.wits.ac.za/wbs/",
    applicationDeadlines: {
      round1: "May 31",
      round2: "August 31",
      final: "October 31"
    },
    scholarships: [
      "Wits Scholarships",
      "African development awards",
      "Mining industry scholarships",
      "Merit-based aid"
    ],
    campusLife: {
      housing: true,
      studentClubs: 22,
      internationalism: "Very High"
    }
  },
  {
    id: 97,
    name: "Business School, University of Edinburgh",
    shortName: "Edinburgh Business School",
    location: "Edinburgh",
    country: "United Kingdom",
    region: "Europe",
    established: 1980,
    ranking: {
      global: 97,
      ftGlobal: 145,
      qsGlobal: 185
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "12 months",
        tuitionFee: "34,900",
        currency: "GBP"
      },
      emba: {
        available: true,
        duration: "24 months",
        tuitionFee: "42,000"
      },
      masters: ["Master of Science in Management"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 620,
        minScore: 580
      },
      gre: {
        accepted: true,
        averageScore: 305
      },
      workExperience: {
        required: true,
        averageYears: 5.5,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 160,
      internationalStudents: "75%",
      femaleStudents: "42%",
      averageAge: 30,
      classSize: 80
    },
    outcomes: {
      employmentRate: "82%",
      averageSalary: {
        amount: 72000,
        currency: "GBP",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "65%",
      topRecruiters: ["Deloitte", "PwC", "KPMG", "RBS", "Standard Life"]
    },
    highlights: [
      "Historic Scottish university",
      "Strong European connections",
      "Beautiful Edinburgh setting",
      "Research excellence"
    ],
    specializations: [
      "Finance",
      "Strategy",
      "International Business",
      "Entrepreneurship",
      "Sustainability"
    ],
    image: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=400&h=300&fit=crop&q=80",
    website: "https://www.business-school.ed.ac.uk",
    applicationDeadlines: {
      round1: "November 30",
      round2: "February 28",
      round3: "May 31"
    },
    scholarships: [
      "Edinburgh MBA Scholarships",
      "Scottish scholarships",
      "International student aid",
      "Merit-based awards"
    ],
    campusLife: {
      housing: true,
      studentClubs: 25,
      internationalism: "Very High"
    }
  },
  {
    id: 98,
    name: "ESSEC Business School",
    shortName: "ESSEC",
    location: "Cergy",
    country: "France",
    region: "Europe",
    established: 1907,
    ranking: {
      global: 98,
      ftGlobal: 125,
      qsGlobal: 165
    },
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    programs: {
      mba: {
        available: true,
        duration: "12 months",
        tuitionFee: "55,000",
        currency: "EUR"
      },
      emba: {
        available: true,
        duration: "18 months",
        tuitionFee: "68,000"
      },
      masters: ["Master in Management", "Master in Finance"],
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
        averageScore: 310
      },
      workExperience: {
        required: true,
        averageYears: 5.8,
        minYears: 3
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 140,
      internationalStudents: "80%",
      femaleStudents: "40%",
      averageAge: 30,
      classSize: 70
    },
    outcomes: {
      employmentRate: "88%",
      averageSalary: {
        amount: 82000,
        currency: "EUR",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "78%",
      topRecruiters: ["L'Oréal", "LVMH", "McKinsey & Company", "Deloitte", "BNP Paribas"]
    },
    highlights: [
      "Prestigious French grande école",
      "Strong luxury industry connections",
      "Multiple campus locations",
      "Excellent European network"
    ],
    specializations: [
      "Luxury Management",
      "Finance",
      "Strategy",
      "Marketing",
      "International Business"
    ],
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=300&fit=crop&q=80",
    website: "https://www.essec.edu",
    applicationDeadlines: {
      round1: "October 15",
      round2: "January 15",
      round3: "March 15"
    },
    scholarships: [
      "ESSEC Scholarships",
      "Excellence scholarships",
      "International student aid",
      "Industry partnerships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 30,
      internationalism: "Extremely High"
    }
  },
  {
    id: 99,
    name: "Asian Institute of Management",
    shortName: "AIM",
    location: "Makati",
    country: "Philippines",
    region: "Asia",
    established: 1968,
    ranking: {
      global: 99,
      ftGlobal: 155,
      qsGlobal: 195
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "12 months",
        tuitionFee: "22,000",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "18 months",
        tuitionFee: "35,000"
      },
      masters: ["Master in Development Management"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 610,
        minScore: 550
      },
      gre: {
        accepted: true,
        averageScore: 300
      },
      workExperience: {
        required: true,
        averageYears: 4.5,
        minYears: 2
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 180,
      internationalStudents: "40%",
      femaleStudents: "48%",
      averageAge: 28,
      classSize: 90
    },
    outcomes: {
      employmentRate: "85%",
      averageSalary: {
        amount: 45000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "95%",
      topRecruiters: ["Deloitte", "PwC", "Ayala Corporation", "SM Group", "Jollibee"]
    },
    highlights: [
      "Leading Asian business school",
      "Strong Southeast Asian network",
      "Development focus",
      "Practical approach"
    ],
    specializations: [
      "Development Management",
      "Finance",
      "Marketing",
      "Strategy",
      "Entrepreneurship"
    ],
    image: "https://images.unsplash.com/photo-1551474083-7b3bc61ba400?w=400&h=300&fit=crop&q=80",
    website: "https://www.aim.edu",
    applicationDeadlines: {
      round1: "January 15",
      round2: "March 15",
      round3: "May 15"
    },
    scholarships: [
      "AIM Scholarships",
      "ASEAN scholarships",
      "Merit-based aid",
      "Development scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 25,
      internationalism: "Very High"
    }
  },
  {
    id: 100,
    name: "Sasin Graduate Institute of Business Administration",
    shortName: "Sasin",
    location: "Bangkok",
    country: "Thailand",
    region: "Asia",
    established: 1982,
    ranking: {
      global: 100,
      ftGlobal: 165,
      qsGlobal: 205
    },
    accreditation: ["AACSB", "EQUIS"],
    programs: {
      mba: {
        available: true,
        duration: "12 months",
        tuitionFee: "28,000",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "15 months",
        tuitionFee: "42,000"
      },
      masters: ["Master of Management"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 630,
        minScore: 580
      },
      gre: {
        accepted: true,
        averageScore: 305
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
      studentBody: 120,
      internationalStudents: "55%",
      femaleStudents: "45%",
      averageAge: 30,
      classSize: 60
    },
    outcomes: {
      employmentRate: "88%",
      averageSalary: {
        amount: 52000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "85%",
      topRecruiters: ["Deloitte", "PwC", "CP Group", "PTT", "SCG"]
    },
    highlights: [
      "Gateway to Southeast Asia",
      "Strong regional connections",
      "International partnerships",
      "Cultural diversity"
    ],
    specializations: [
      "International Business",
      "Finance",
      "Marketing",
      "Strategy",
      "Family Business"
    ],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop&q=80",
    website: "https://www.sasin.edu",
    applicationDeadlines: {
      round1: "January 31",
      round2: "March 31",
      round3: "May 31"
    },
    scholarships: [
      "Sasin Scholarships",
      "ASEAN scholarships",
      "Merit-based aid",
      "Corporate partnerships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 20,
      internationalism: "Very High"
    }
  },
  // TOP 50 INDIAN BUSINESS SCHOOLS (101-150)
  {
    id: 101,
    name: "Indian Institute of Management Ahmedabad",
    shortName: "IIM Ahmedabad",
    location: "Ahmedabad",
    country: "India",
    region: "Asia",
    established: 1961,
    ranking: {
      global: 101,
      regional: 15,
      ftGlobal: 85,
      qsGlobal: 75
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "25,000",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "15 months",
        tuitionFee: "35,000"
      },
      masters: ["Fellow Programme in Management"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: 710,
        minScore: 650
      },
      gre: {
        accepted: true,
        averageScore: 320
      },
      workExperience: {
        required: false,
        averageYears: 0,
        minYears: 0
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 480,
      internationalStudents: "5%",
      femaleStudents: "35%",
      averageAge: 23,
      classSize: 240
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: {
        amount: 50000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "300%",
      topRecruiters: ["McKinsey & Company", "Boston Consulting Group", "Bain & Company", "Goldman Sachs", "Google"]
    },
    highlights: [
      "Premier Indian business school",
      "Highest placement packages in India",
      "Strong alumni network",
      "Case-based learning methodology"
    ],
    specializations: [
      "General Management",
      "Finance",
      "Marketing",
      "Operations",
      "Strategy",
      "Consulting"
    ],
    image: "https://images.unsplash.com/photo-1609166214667-34f7c52e8e16?w=400&h=300&fit=crop&q=80",
    website: "https://www.iima.ac.in",
    applicationDeadlines: {
      round1: "January 15",
      round2: "March 15",
      final: "April 30"
    },
    scholarships: [
      "Merit-based scholarships",
      "Need-based financial aid",
      "Alumni scholarships",
      "Government scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 60,
      internationalism: "Moderate"
    }
  },
  {
    id: 102,
    name: "Indian Institute of Management Calcutta",
    shortName: "IIM Calcutta",
    location: "Kolkata",
    country: "India",
    region: "Asia",
    established: 1961,
    ranking: {
      global: 102,
      regional: 16,
      ftGlobal: 88,
      qsGlobal: 78
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "24,000",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "15 months",
        tuitionFee: "32,000"
      },
      masters: ["Fellow Programme in Management"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: 705,
        minScore: 650
      },
      gre: {
        accepted: true,
        averageScore: 318
      },
      workExperience: {
        required: false,
        averageYears: 0,
        minYears: 0
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 460,
      internationalStudents: "6%",
      femaleStudents: "38%",
      averageAge: 23,
      classSize: 230
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: {
        amount: 48000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "290%",
      topRecruiters: ["McKinsey & Company", "Boston Consulting Group", "Bain & Company", "Amazon", "Microsoft"]
    },
    highlights: [
      "Second oldest IIM",
      "Strong finance program",
      "Excellent faculty",
      "Historic Kolkata location"
    ],
    specializations: [
      "Finance",
      "Marketing",
      "Operations",
      "Strategy",
      "Human Resources",
      "Information Systems"
    ],
    image: "https://images.unsplash.com/photo-1599670409242-c02f6825dafb?w=400&h=300&fit=crop&q=80",
    website: "https://www.iimcal.ac.in",
    applicationDeadlines: {
      round1: "January 15",
      round2: "March 15",
      final: "April 30"
    },
    scholarships: [
      "Merit-based scholarships",
      "Need-based financial aid",
      "Alumni support",
      "Government scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 55,
      internationalism: "Moderate"
    }
  },
  {
    id: 103,
    name: "Indian Institute of Management Delhi",
    shortName: "IIM Delhi",
    location: "New Delhi",
    country: "India",
    region: "Asia",
    established: 1969,
    ranking: {
      global: 103,
      regional: 17,
      ftGlobal: 92,
      qsGlobal: 82
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "24,500",
        currency: "USD"
      },
      emba: {
        available: true,
        duration: "15 months",
        tuitionFee: "33,000"
      },
      masters: ["Fellow Programme in Management"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: 708,
        minScore: 650
      },
      gre: {
        accepted: true,
        averageScore: 319
      },
      workExperience: {
        required: false,
        averageYears: 0,
        minYears: 0
      },
      englishTest: {
        toefl: 100,
        ielts: 7.0
      }
    },
    statistics: {
      studentBody: 440,
      internationalStudents: "8%",
      femaleStudents: "40%",
      averageAge: 23,
      classSize: 220
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: {
        amount: 49000,
        currency: "USD",
        timeFrame: "first year post-MBA"
      },
      salaryIncrease: "295%",
      topRecruiters: ["McKinsey & Company", "Boston Consulting Group", "Goldman Sachs", "Google", "Amazon"]
    },
    highlights: [
      "Capital city advantage",
      "Strong corporate connections",
      "Government proximity",
      "Diverse student body"
    ],
    specializations: [
      "Finance",
      "Marketing",
      "Strategy",
      "Operations",
      "Public Policy",
      "International Business"
    ],
    image: "https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?w=400&h=300&fit=crop&q=80",
    website: "https://www.iimdelhi.ac.in",
    applicationDeadlines: {
      round1: "January 15",
      round2: "March 15",
      final: "April 30"
    },
    scholarships: [
      "Merit-based scholarships",
      "Need-based aid",
      "Government scholarships",
      "Corporate sponsorships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 50,
      internationalism: "Moderate"
    }
  },

  // TOP 50 INDIAN BUSINESS SCHOOLS
  {
    id: 104,
    name: "Indian Institute of Management Ahmedabad",
    shortName: "IIM Ahmedabad",
    location: "Ahmedabad, Gujarat",
    country: "India",
    region: "Asia",
    established: 1961,
    ranking: {
      global: 45,
      regional: 1,
      ftGlobal: 46,
      qsGlobal: 47
    },
    accreditation: ["AACSB", "EQUIS"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "23,00,000",
        currency: "INR"
      },
      emba: {
        available: false,
        duration: "",
        tuitionFee: ""
      },
      masters: ["PGPX (1-year MBA)", "ePGP"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: null,
        minScore: null
      },
      gre: {
        accepted: false,
        averageScore: null
      },
      workExperience: {
        required: true,
        averageYears: 0,
        minYears: 0
      },
      englishTest: {
        toefl: null,
        ielts: null
      }
    },
    statistics: {
      studentBody: 395,
      internationalStudents: "5%",
      femaleStudents: "28%",
      averageAge: 23,
      acceptanceRate: "0.8%"
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: {
        amount: 3400000,
        currency: "INR",
        timeFrame: "Final placements"
      },
      salaryIncrease: "300%",
      topRecruiters: ["McKinsey & Company", "Boston Consulting Group", "Bain & Company", "Goldman Sachs", "Microsoft"]
    },
    highlights: [
      "Premier management institute in India",
      "Highest average salary in India",
      "Louis Kahn designed campus",
      "Strong alumni network globally"
    ],
    specializations: [
      "Finance",
      "Marketing",
      "Operations",
      "Strategy",
      "Economics",
      "Organizational Behaviour"
    ],
    image: "https://images.unsplash.com/photo-1570653773090-fc0ba8db5cf5?w=400&h=300&fit=crop&q=80",
    website: "https://www.iima.ac.in",
    applicationDeadlines: {
      round1: "November 15",
      round2: "January 15",
      final: "March 31"
    },
    scholarships: [
      "Need-based financial aid",
      "Merit scholarships",
      "Minority scholarships",
      "Alumni scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 60,
      internationalism: "Moderate"
    }
  },
  {
    id: 105,
    name: "Indian Institute of Management Bangalore",
    shortName: "IIM Bangalore",
    location: "Bangalore, Karnataka",
    country: "India",
    region: "Asia",
    established: 1973,
    ranking: {
      global: 48,
      regional: 2,
      ftGlobal: 49,
      qsGlobal: 51
    },
    accreditation: ["AACSB", "EQUIS"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "24,50,000",
        currency: "INR"
      },
      emba: {
        available: true,
        duration: "18 months",
        tuitionFee: "18,00,000"
      },
      masters: ["EPGP (1-year MBA)"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: null,
        minScore: null
      },
      gre: {
        accepted: false,
        averageScore: null
      },
      workExperience: {
        required: true,
        averageYears: 0,
        minYears: 0
      },
      englishTest: {
        toefl: null,
        ielts: null
      }
    },
    statistics: {
      studentBody: 480,
      internationalStudents: "8%",
      femaleStudents: "35%",
      averageAge: 24,
      acceptanceRate: "1.2%"
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: {
        amount: 3100000,
        currency: "INR",
        timeFrame: "Final placements"
      },
      salaryIncrease: "280%",
      topRecruiters: ["Amazon", "Microsoft", "McKinsey", "BCG", "Flipkart"]
    },
    highlights: [
      "Strong in technology and consulting",
      "Excellent placement record",
      "Beautiful green campus",
      "Strong industry connections"
    ],
    specializations: [
      "Finance",
      "Marketing",
      "Operations",
      "Technology Management",
      "Entrepreneurship"
    ],
    image: "https://images.unsplash.com/photo-1569097148019-3baa9b71fe1e?w=400&h=300&fit=crop&q=80",
    website: "https://www.iimb.ac.in",
    applicationDeadlines: {
      round1: "November 15",
      round2: "January 15",
      final: "March 31"
    },
    scholarships: [
      "Need-based assistance",
      "Merit scholarships",
      "Diversity scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 45,
      internationalism: "Moderate"
    }
  },
  {
    id: 106,
    name: "Indian Institute of Management Calcutta",
    shortName: "IIM Calcutta",
    location: "Kolkata, West Bengal",
    country: "India",
    region: "Asia",
    established: 1961,
    ranking: {
      global: 50,
      regional: 3,
      ftGlobal: 52,
      qsGlobal: 54
    },
    accreditation: ["AACSB", "EQUIS"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "27,00,000",
        currency: "INR"
      },
      emba: {
        available: true,
        duration: "18 months",
        tuitionFee: "17,00,000"
      },
      masters: ["MBAEx (1-year MBA)"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: null,
        minScore: null
      },
      gre: {
        accepted: false,
        averageScore: null
      },
      workExperience: {
        required: true,
        averageYears: 0,
        minYears: 0
      },
      englishTest: {
        toefl: null,
        ielts: null
      }
    },
    statistics: {
      studentBody: 460,
      internationalStudents: "6%",
      femaleStudents: "32%",
      averageAge: 23,
      acceptanceRate: "0.9%"
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: {
        amount: 2950000,
        currency: "INR",
        timeFrame: "Final placements"
      },
      salaryIncrease: "270%",
      topRecruiters: ["Accenture", "Deloitte", "KPMG", "TCS", "Wipro"]
    },
    highlights: [
      "Strong in finance and analytics",
      "Excellent faculty",
      "Historic campus",
      "Strong alumni network"
    ],
    specializations: [
      "Finance",
      "Marketing",
      "Operations",
      "Human Resources",
      "Information Systems"
    ],
    image: "https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?w=400&h=300&fit=crop&q=80",
    website: "https://www.iimcal.ac.in",
    applicationDeadlines: {
      round1: "November 15",
      round2: "January 15",
      final: "March 31"
    },
    scholarships: [
      "Need-based scholarships",
      "Merit-based awards",
      "Corporate scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 55,
      internationalism: "Moderate"
    }
  },

  // ADDITIONAL TOP INDIAN BUSINESS SCHOOLS (To complete Top 50)
  {
    id: 111,
    name: "Indian Institute of Management Delhi",
    shortName: "IIM Delhi",
    location: "New Delhi, Delhi",
    country: "India",
    region: "Asia",
    established: 1969,
    ranking: {
      global: 52,
      regional: 4
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "21,50,000",
        currency: "INR"
      },
      emba: {
        available: true,
        duration: "18 months",
        tuitionFee: "16,50,000"
      },
      masters: ["EPGP (1-year MBA)"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: undefined,
        minScore: undefined
      },
      gre: {
        accepted: false,
        averageScore: undefined
      },
      workExperience: {
        required: true,
        averageYears: 0,
        minYears: 0
      },
      englishTest: {
        toefl: undefined,
        ielts: undefined
      }
    },
    statistics: {
      studentBody: 440,
      internationalStudents: "7%",
      femaleStudents: "29%",
      averageAge: 23
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: {
        amount: 2750000,
        currency: "INR",
        timeFrame: "Final placements"
      },
      salaryIncrease: "260%",
      topRecruiters: ["Deloitte", "EY", "KPMG", "PwC", "Accenture"]
    },
    highlights: [
      "Capital city advantage",
      "Strong government connections",
      "Excellent consulting placements",
      "Historic campus"
    ],
    specializations: [
      "Finance",
      "Marketing",
      "Operations",
      "Public Policy",
      "International Business"
    ],
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=300&fit=crop&q=80",
    website: "https://www.iimdelhi.ac.in",
    applicationDeadlines: {
      round1: "November 15",
      round2: "January 15",
      final: "March 31"
    },
    scholarships: [
      "Merit scholarships",
      "Need-based assistance",
      "Alumni scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 45,
      internationalism: "Moderate"
    }
  },
  {
    id: 112,
    name: "Indian Institute of Management Indore",
    shortName: "IIM Indore",
    location: "Indore, Madhya Pradesh",
    country: "India",
    region: "Asia",
    established: 1996,
    ranking: {
      global: 60,
      regional: 7
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "16,25,000",
        currency: "INR"
      },
      emba: {
        available: false,
        duration: "",
        tuitionFee: ""
      },
      masters: ["EPGP (1-year MBA)", "5-year IPM"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: undefined,
        minScore: undefined
      },
      gre: {
        accepted: false,
        averageScore: undefined
      },
      workExperience: {
        required: true,
        averageYears: 0,
        minYears: 0
      },
      englishTest: {
        toefl: undefined,
        ielts: undefined
      }
    },
    statistics: {
      studentBody: 450,
      internationalStudents: "5%",
      femaleStudents: "34%",
      averageAge: 23
    },
    outcomes: {
      employmentRate: "98%",
      averageSalary: {
        amount: 2450000,
        currency: "INR",
        timeFrame: "Final placements"
      },
      salaryIncrease: "230%",
      topRecruiters: ["Flipkart", "Amazon", "Microsoft", "Google", "Paytm"]
    },
    highlights: [
      "First IIM with 5-year IPM program",
      "Strong in technology placements",
      "Beautiful campus",
      "Innovative curriculum"
    ],
    specializations: [
      "Finance",
      "Marketing",
      "Operations",
      "Information Technology",
      "Rural Management"
    ],
    image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=400&h=300&fit=crop&q=80",
    website: "https://www.iimidr.ac.in",
    applicationDeadlines: {
      round1: "November 15",
      round2: "January 15",
      final: "March 31"
    },
    scholarships: [
      "Merit-based scholarships",
      "Need-based aid",
      "IPM scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 40,
      internationalism: "Low"
    }
  },
  {
    id: 113,
    name: "SP Jain School of Global Management",
    shortName: "SP Jain",
    location: "Mumbai, Maharashtra",
    country: "India",
    region: "Asia",
    established: 1981,
    ranking: {
      global: 70,
      regional: 8
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "16 months",
        tuitionFee: "18,90,000",
        currency: "INR"
      },
      emba: {
        available: true,
        duration: "18 months",
        tuitionFee: "22,50,000"
      },
      masters: ["Global MBA", "Masters in Data Science"],
      phd: false
    },
    admissionRequirements: {
      gmat: {
        required: true,
        averageScore: 650,
        minScore: 550
      },
      gre: {
        accepted: true,
        averageScore: 315
      },
      workExperience: {
        required: true,
        averageYears: 2.5,
        minYears: 1
      },
      englishTest: {
        toefl: 90,
        ielts: 6.5
      }
    },
    statistics: {
      studentBody: 220,
      internationalStudents: "60%",
      femaleStudents: "42%",
      averageAge: 26
    },
    outcomes: {
      employmentRate: "95%",
      averageSalary: {
        amount: 1950000,
        currency: "INR",
        timeFrame: "Final placements"
      },
      salaryIncrease: "180%",
      topRecruiters: ["JP Morgan", "HSBC", "Standard Chartered", "Citibank", "Deutsche Bank"]
    },
    highlights: [
      "Global tri-city program",
      "Strong international exposure",
      "Industry-focused curriculum",
      "Small batch size"
    ],
    specializations: [
      "Finance",
      "Marketing",
      "Operations",
      "International Business",
      "Data Analytics"
    ],
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&h=300&fit=crop&q=80",
    website: "https://www.spjain.org",
    applicationDeadlines: {
      round1: "October 31",
      round2: "December 31",
      final: "February 28"
    },
    scholarships: [
      "Merit scholarships",
      "International student scholarships",
      "Alumni scholarships"
    ],
    campusLife: {
      housing: false,
      studentClubs: 25,
      internationalism: "Very High"
    }
  },
  {
    id: 114,
    name: "Narsee Monjee Institute of Management Studies",
    shortName: "NMIMS",
    location: "Mumbai, Maharashtra",
    country: "India",
    region: "Asia",
    established: 1981,
    ranking: {
      global: 75,
      regional: 10
    },
    accreditation: ["NAAC"],
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
        tuitionFee: "12,50,000"
      },
      masters: ["PGDM", "Global MBA"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: undefined,
        minScore: undefined
      },
      gre: {
        accepted: false,
        averageScore: undefined
      },
      workExperience: {
        required: true,
        averageYears: 0,
        minYears: 0
      },
      englishTest: {
        toefl: undefined,
        ielts: undefined
      }
    },
    statistics: {
      studentBody: 600,
      internationalStudents: "8%",
      femaleStudents: "45%",
      averageAge: 24
    },
    outcomes: {
      employmentRate: "96%",
      averageSalary: {
        amount: 1750000,
        currency: "INR",
        timeFrame: "Final placements"
      },
      salaryIncrease: "170%",
      topRecruiters: ["Tata Consultancy Services", "Infosys", "Wipro", "HCL", "Tech Mahindra"]
    },
    highlights: [
      "Strong industry connections",
      "Mumbai advantage",
      "Diverse program portfolio",
      "Good placement record"
    ],
    specializations: [
      "Finance",
      "Marketing",
      "Operations",
      "Human Resources",
      "Information Technology"
    ],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&q=80",
    website: "https://www.nmims.edu",
    applicationDeadlines: {
      round1: "November 30",
      round2: "January 31",
      final: "March 31"
    },
    scholarships: [
      "Merit scholarships",
      "Need-based aid",
      "Corporate scholarships"
    ],
    campusLife: {
      housing: false,
      studentClubs: 50,
      internationalism: "Moderate"
    }
  },
  {
    id: 115,
    name: "Management Development Institute",
    shortName: "MDI Gurgaon",
    location: "Gurugram, Haryana",
    country: "India",
    region: "Asia",
    established: 1973,
    ranking: {
      global: 80,
      regional: 12
    },
    accreditation: ["AACSB"],
    programs: {
      mba: {
        available: true,
        duration: "2 years",
        tuitionFee: "20,60,000",
        currency: "INR"
      },
      emba: {
        available: true,
        duration: "2 years",
        tuitionFee: "15,00,000"
      },
      masters: ["PGDM", "PGDM-International Management"],
      phd: true
    },
    admissionRequirements: {
      gmat: {
        required: false,
        averageScore: undefined,
        minScore: undefined
      },
      gre: {
        accepted: false,
        averageScore: undefined
      },
      workExperience: {
        required: true,
        averageYears: 0,
        minYears: 0
      },
      englishTest: {
        toefl: undefined,
        ielts: undefined
      }
    },
    statistics: {
      studentBody: 480,
      internationalStudents: "6%",
      femaleStudents: "38%",
      averageAge: 23
    },
    outcomes: {
      employmentRate: "100%",
      averageSalary: {
        amount: 2350000,
        currency: "INR",
        timeFrame: "Final placements"
      },
      salaryIncrease: "220%",
      topRecruiters: ["McKinsey", "BCG", "Deloitte", "EY", "PwC"]
    },
    highlights: [
      "NCR location advantage",
      "Strong consulting placements",
      "International collaborations",
      "Excellent faculty"
    ],
    specializations: [
      "Finance",
      "Marketing",
      "Operations",
      "Human Resources",
      "International Management"
    ],
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop&q=80",
    website: "https://www.mdi.ac.in",
    applicationDeadlines: {
      round1: "December 15",
      round2: "February 15",
      final: "April 15"
    },
    scholarships: [
      "Merit scholarships",
      "Need-based financial aid",
      "International scholarships"
    ],
    campusLife: {
      housing: true,
      studentClubs: 35,
      internationalism: "Moderate"
    }
  },
  {
    id: 126, name: "Welingkar Institute of Management", shortName: "WeSchool", location: "Mumbai, Maharashtra", country: "India", region: "Asia", established: 1977,
    ranking: { global: 135, regional: 40 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "9,50,000", currency: "INR" }, emba: { available: true, duration: "2 years", tuitionFee: "7,50,000" }, masters: ["PGDM"], phd: false },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 600, internationalStudents: "5%", femaleStudents: "45%", averageAge: 23 },
    outcomes: { employmentRate: "92%", averageSalary: { amount: 1200000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "130%", topRecruiters: ["HDFC", "SBI", "ICICI", "Axis", "Kotak"] },
    highlights: ["Mumbai location", "Industry connections", "Affordable fees", "Banking focus"], specializations: ["Finance", "Marketing", "Operations", "HR", "IT"],
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=300&fit=crop&q=80", website: "https://www.welingkar.org",
    applicationDeadlines: { round1: "March 31", round2: "May 31", final: "June 30" }, scholarships: ["Merit scholarships", "Need-based aid"], campusLife: { housing: false, studentClubs: 25, internationalism: "Low" }
  },
  {
    id: 127, name: "Indian Institute of Management Kashipur", shortName: "IIM Kashipur", location: "Kashipur, Uttarakhand", country: "India", region: "Asia", established: 2011,
    ranking: { global: 140, regional: 42 }, accreditation: ["AACSB"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "16,00,000", currency: "INR" }, emba: { available: false }, masters: ["EPGP"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 240, internationalStudents: "3%", femaleStudents: "30%", averageAge: 23 },
    outcomes: { employmentRate: "92%", averageSalary: { amount: 1550000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "145%", topRecruiters: ["Amazon", "Flipkart", "Paytm", "Ola", "Uber"] },
    highlights: ["New IIM", "Growing reputation", "Mountain campus", "Tech focus"], specializations: ["Finance", "Marketing", "Operations", "Technology", "Analytics"],
    image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=400&h=300&fit=crop&q=80", website: "https://www.iimkashipur.ac.in",
    applicationDeadlines: { round1: "November 15", round2: "January 15", final: "March 31" }, scholarships: ["Merit scholarships", "Need-based aid"], campusLife: { housing: true, studentClubs: 20, internationalism: "Low" }
  },
  {
    id: 128, name: "Indian Institute of Management Udaipur", shortName: "IIM Udaipur", location: "Udaipur, Rajasthan", country: "India", region: "Asia", established: 2011,
    ranking: { global: 145, regional: 44 }, accreditation: ["AACSB"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "17,00,000", currency: "INR" }, emba: { available: false }, masters: ["EPGP"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 240, internationalStudents: "4%", femaleStudents: "32%", averageAge: 23 },
    outcomes: { employmentRate: "94%", averageSalary: { amount: 1750000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "165%", topRecruiters: ["Deloitte", "EY", "KPMG", "PwC", "Accenture"] },
    highlights: ["Beautiful lake city campus", "Strong consulting", "International programs", "Heritage location"], specializations: ["Finance", "Marketing", "Operations", "Strategy", "Analytics"],
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&h=300&fit=crop&q=80", website: "https://www.iimu.ac.in",
    applicationDeadlines: { round1: "November 15", round2: "January 15", final: "March 31" }, scholarships: ["Merit scholarships", "Need-based aid"], campusLife: { housing: true, studentClubs: 25, internationalism: "Low" }
  },
  {
    id: 129, name: "Lal Bahadur Shastri Institute of Management", shortName: "LBSIM", location: "New Delhi, Delhi", country: "India", region: "Asia", established: 1995,
    ranking: { global: 150, regional: 46 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "12,95,000", currency: "INR" }, emba: { available: false }, masters: ["PGDM"], phd: false },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 360, internationalStudents: "5%", femaleStudents: "40%", averageAge: 23 },
    outcomes: { employmentRate: "95%", averageSalary: { amount: 1450000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "140%", topRecruiters: ["HUL", "P&G", "ITC", "Nestle", "Godrej"] },
    highlights: ["Delhi location", "FMCG focus", "Industry interface", "Good placements"], specializations: ["Marketing", "Finance", "Operations", "HR", "International Business"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&q=80", website: "https://www.lbsim.ac.in",
    applicationDeadlines: { round1: "February 28", round2: "April 30", final: "May 31" }, scholarships: ["Merit scholarships", "Need-based aid"], campusLife: { housing: false, studentClubs: 30, internationalism: "Low" }
  },
  {
    id: 130, name: "Institute of Management, Nirma University", shortName: "Nirma IM", location: "Ahmedabad, Gujarat", country: "India", region: "Asia", established: 1996,
    ranking: { global: 155, regional: 48 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "11,60,000", currency: "INR" }, emba: { available: false }, masters: ["MBA"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 240, internationalStudents: "5%", femaleStudents: "38%", averageAge: 23 },
    outcomes: { employmentRate: "93%", averageSalary: { amount: 1250000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "140%", topRecruiters: ["Reliance", "Adani", "Tata", "L&T", "Bajaj"] },
    highlights: ["Gujarat advantage", "Industrial connections", "Affordable", "Good ROI"], specializations: ["Finance", "Marketing", "Operations", "Supply Chain", "Pharma"],
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop&q=80", website: "https://www.nirmauni.ac.in",
    applicationDeadlines: { round1: "February 28", round2: "April 30", final: "May 31" }, scholarships: ["Merit scholarships", "Need-based aid"], campusLife: { housing: true, studentClubs: 25, internationalism: "Low" }
  },
  {
    id: 131, name: "School of Inspired Leadership", shortName: "SOIL", location: "Gurugram, Haryana", country: "India", region: "Asia", established: 2009,
    ranking: { global: 160, regional: 50 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "18,00,000", currency: "INR" }, emba: { available: false }, masters: ["PGPM"], phd: false },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 180, internationalStudents: "8%", femaleStudents: "45%", averageAge: 23 },
    outcomes: { employmentRate: "90%", averageSalary: { amount: 1350000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "135%", topRecruiters: ["Oyo", "Zomato", "Paytm", "Byjus", "Swiggy"] },
    highlights: ["Unique curriculum", "Leadership focus", "Social impact", "Startup ecosystem"], specializations: ["Leadership", "Social Impact", "Entrepreneurship", "Innovation", "Sustainability"],
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop&q=80", website: "https://www.soiluniversity.ac.in",
    applicationDeadlines: { round1: "January 31", round2: "March 15", final: "April 30" }, scholarships: ["Merit scholarships", "Need-based aid"], campusLife: { housing: false, studentClubs: 20, internationalism: "Moderate" }
  },
  {
    id: 132, name: "Jaipuria Institute of Management", shortName: "JIM", location: "Lucknow, Uttar Pradesh", country: "India", region: "Asia", established: 1993,
    ranking: { global: 165, regional: 52 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "7,95,000", currency: "INR" }, emba: { available: true, duration: "2 years", tuitionFee: "6,50,000" }, masters: ["PGDM"], phd: false },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 480, internationalStudents: "3%", femaleStudents: "42%", averageAge: 23 },
    outcomes: { employmentRate: "88%", averageSalary: { amount: 950000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "120%", topRecruiters: ["TCS", "Infosys", "Wipro", "HCL", "Tech Mahindra"] },
    highlights: ["Affordable fees", "Multiple campuses", "Industry partnerships", "Strong alumni"], specializations: ["IT", "Finance", "Marketing", "Operations", "HR"],
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop&q=80", website: "https://www.jaipuria.ac.in",
    applicationDeadlines: { round1: "February 15", round2: "April 15", final: "May 31" }, scholarships: ["Merit scholarships", "Need-based aid"], campusLife: { housing: true, studentClubs: 25, internationalism: "Low" }
  },
  {
    id: 133, name: "Indian Institute of Management Visakhapatnam", shortName: "IIM Vizag", location: "Visakhapatnam, Andhra Pradesh", country: "India", region: "Asia", established: 2015,
    ranking: { global: 170, regional: 54 }, accreditation: ["AACSB"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "15,70,000", currency: "INR" }, emba: { available: false }, masters: ["EPGP"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 180, internationalStudents: "2%", femaleStudents: "28%", averageAge: 23 },
    outcomes: { employmentRate: "91%", averageSalary: { amount: 1400000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "140%", topRecruiters: ["Vizag Steel", "ONGC", "NTPC", "BHEL", "GAIL"] },
    highlights: ["Coastal location", "Industrial belt", "Port city advantage", "Government sector"], specializations: ["Finance", "Marketing", "Operations", "Energy", "Maritime"],
    image: "https://images.unsplash.com/photo-1595950653106-6c9c43bd4ef8?w=400&h=300&fit=crop&q=80", website: "https://www.iimv.ac.in",
    applicationDeadlines: { round1: "November 15", round2: "January 15", final: "March 31" }, scholarships: ["Merit scholarships", "Need-based aid"], campusLife: { housing: true, studentClubs: 20, internationalism: "Low" }
  },
  {
    id: 134, name: "Indian Institute of Management Jammu", shortName: "IIM Jammu", location: "Jammu, Jammu & Kashmir", country: "India", region: "Asia", established: 2016,
    ranking: { global: 175, regional: 56 }, accreditation: ["AACSB"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "15,60,000", currency: "INR" }, emba: { available: false }, masters: ["EPGP"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 120, internationalStudents: "1%", femaleStudents: "25%", averageAge: 23 },
    outcomes: { employmentRate: "89%", averageSalary: { amount: 1300000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "135%", topRecruiters: ["J&K Bank", "PNB", "HDFC", "ICICI", "SBI"] },
    highlights: ["Newest IIM", "Strategic location", "Government focus", "Growing reputation"], specializations: ["Finance", "Marketing", "Operations", "Public Policy", "Tourism"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&q=80", website: "https://www.iimjammu.ac.in",
    applicationDeadlines: { round1: "November 15", round2: "January 15", final: "March 31" }, scholarships: ["Merit scholarships", "Need-based aid"], campusLife: { housing: true, studentClubs: 15, internationalism: "Low" }
  },
  {
    id: 135, name: "Indian Institute of Management Amritsar", shortName: "IIM Amritsar", location: "Amritsar, Punjab", country: "India", region: "Asia", established: 2015,
    ranking: { global: 180, regional: 58 }, accreditation: ["AACSB"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "15,70,000", currency: "INR" }, emba: { available: false }, masters: ["EPGP"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 180, internationalStudents: "2%", femaleStudents: "30%", averageAge: 23 },
    outcomes: { employmentRate: "90%", averageSalary: { amount: 1350000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "138%", topRecruiters: ["Bajaj", "Hero", "Mahindra", "Tata Motors", "L&T"] },
    highlights: ["Heritage city", "Manufacturing hub", "Agricultural focus", "Border trade"], specializations: ["Finance", "Marketing", "Operations", "Agribusiness", "Manufacturing"],
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&h=300&fit=crop&q=80", website: "https://www.iimamritsar.ac.in",
    applicationDeadlines: { round1: "November 15", round2: "January 15", final: "March 31" }, scholarships: ["Merit scholarships", "Need-based aid"], campusLife: { housing: true, studentClubs: 20, internationalism: "Low" }
  },
  {
    id: 136, name: "Indian Institute of Management Bodh Gaya", shortName: "IIM Bodh Gaya", location: "Bodh Gaya, Bihar", country: "India", region: "Asia", established: 2015,
    ranking: { global: 185, regional: 60 }, accreditation: ["AACSB"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "15,60,000", currency: "INR" }, emba: { available: false }, masters: ["EPGP"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 120, internationalStudents: "3%", femaleStudents: "35%", averageAge: 23 },
    outcomes: { employmentRate: "88%", averageSalary: { amount: 1250000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "130%", topRecruiters: ["Coal India", "NTPC", "SAIL", "Power Grid", "Indian Oil"] },
    highlights: ["Buddhist heritage", "Spiritual campus", "Government sector", "Social impact"], specializations: ["Finance", "Marketing", "Operations", "Social Enterprise", "Public Policy"],
    image: "https://images.unsplash.com/photo-1549068106-b024baf5062d?w=400&h=300&fit=crop&q=80", website: "https://www.iimbodhgaya.ac.in",
    applicationDeadlines: { round1: "November 15", round2: "January 15", final: "March 31" }, scholarships: ["Merit scholarships", "Need-based aid"], campusLife: { housing: true, studentClubs: 18, internationalism: "Low" }
  },
  {
    id: 137, name: "Indian Institute of Management Sambalpur", shortName: "IIM Sambalpur", location: "Sambalpur, Odisha", country: "India", region: "Asia", established: 2015,
    ranking: { global: 190, regional: 62 }, accreditation: ["AACSB"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "15,60,000", currency: "INR" }, emba: { available: false }, masters: ["EPGP"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 120, internationalStudents: "2%", femaleStudents: "32%", averageAge: 23 },
    outcomes: { employmentRate: "87%", averageSalary: { amount: 1200000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "125%", topRecruiters: ["ONGC", "NALCO", "MCL", "Vedanta", "JSW"] },
    highlights: ["Mining region", "Industrial corridor", "Government partnerships", "Tribal area focus"], specializations: ["Finance", "Marketing", "Operations", "Mining Management", "Tribal Studies"],
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&h=300&fit=crop&q=80", website: "https://www.iimsambalpur.ac.in",
    applicationDeadlines: { round1: "November 15", round2: "January 15", final: "March 31" }, scholarships: ["Merit scholarships", "Tribal scholarships"], campusLife: { housing: true, studentClubs: 15, internationalism: "Low" }
  },
  {
    id: 138, name: "Indian Institute of Management Nagpur", shortName: "IIM Nagpur", location: "Nagpur, Maharashtra", country: "India", region: "Asia", established: 2015,
    ranking: { global: 195, regional: 64 }, accreditation: ["AACSB"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "15,70,000", currency: "INR" }, emba: { available: false }, masters: ["EPGP"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 180, internationalStudents: "2%", femaleStudents: "28%", averageAge: 23 },
    outcomes: { employmentRate: "89%", averageSalary: { amount: 1280000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "132%", topRecruiters: ["Mahindra", "Bajaj Auto", "L&T", "Godrej", "Asian Paints"] },
    highlights: ["Central location", "Automobile hub", "Orange city", "Government sector"], specializations: ["Finance", "Marketing", "Operations", "Automotive", "Logistics"],
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop&q=80", website: "https://www.iimnagpur.ac.in",
    applicationDeadlines: { round1: "November 15", round2: "January 15", final: "March 31" }, scholarships: ["Merit scholarships", "Need-based aid"], campusLife: { housing: true, studentClubs: 20, internationalism: "Low" }
  },
  {
    id: 139, name: "Indian Institute of Management Sirmaur", shortName: "IIM Sirmaur", location: "Sirmaur, Himachal Pradesh", country: "India", region: "Asia", established: 2015,
    ranking: { global: 200, regional: 66 }, accreditation: ["AACSB"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "15,60,000", currency: "INR" }, emba: { available: false }, masters: ["EPGP"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 120, internationalStudents: "1%", femaleStudents: "30%", averageAge: 23 },
    outcomes: { employmentRate: "86%", averageSalary: { amount: 1150000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "120%", topRecruiters: ["HPMC", "Parle", "Dabur", "Patanjali", "Emami"] },
    highlights: ["Hill station campus", "FMCG focus", "Serene environment", "Growing reputation"], specializations: ["Finance", "Marketing", "Operations", "Rural Marketing", "FMCG"],
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&h=300&fit=crop&q=80", website: "https://www.iimsirmaur.ac.in",
    applicationDeadlines: { round1: "November 15", round2: "January 15", final: "March 31" }, scholarships: ["Merit scholarships", "Hill state quota"], campusLife: { housing: true, studentClubs: 15, internationalism: "Low" }
  },
  {
    id: 140, name: "Narsee Monjee Institute of Management Studies", shortName: "NMIMS Mumbai", location: "Mumbai, Maharashtra", country: "India", region: "Asia", established: 1981,
    ranking: { global: 205, regional: 68 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "20,35,000", currency: "INR" }, emba: { available: true, duration: "2 years", tuitionFee: "15,00,000" }, masters: ["MBA"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 600, internationalStudents: "5%", femaleStudents: "40%", averageAge: 23 },
    outcomes: { employmentRate: "95%", averageSalary: { amount: 1850000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "155%", topRecruiters: ["JP Morgan", "Goldman Sachs", "McKinsey", "BCG", "Bain"] },
    highlights: ["Mumbai financial district", "Strong finance placements", "Industry connections", "Premium brand"], specializations: ["Finance", "Marketing", "Operations", "Investment Banking", "Capital Markets"],
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&h=300&fit=crop&q=80", website: "https://www.nmims.edu",
    applicationDeadlines: { round1: "November 30", round2: "January 31", final: "March 31" }, scholarships: ["Merit scholarships", "Need-based aid"], campusLife: { housing: false, studentClubs: 40, internationalism: "Moderate" }
  },
  {
    id: 141, name: "Symbiosis Institute of Business Management", shortName: "SIBM Pune", location: "Pune, Maharashtra", country: "India", region: "Asia", established: 1978,
    ranking: { global: 210, regional: 70 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "21,50,000", currency: "INR" }, emba: { available: true, duration: "2 years", tuitionFee: "16,00,000" }, masters: ["MBA"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 480, internationalStudents: "8%", femaleStudents: "45%", averageAge: 23 },
    outcomes: { employmentRate: "94%", averageSalary: { amount: 1750000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "150%", topRecruiters: ["TCS", "Infosys", "Wipro", "L&T", "Mahindra"] },
    highlights: ["Pune IT hub", "International exposure", "Strong alumni", "Industry partnerships"], specializations: ["Finance", "Marketing", "Operations", "International Business", "IT"],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop&q=80", website: "https://www.sibmpune.edu.in",
    applicationDeadlines: { round1: "December 31", round2: "February 28", final: "April 30" }, scholarships: ["Merit scholarships", "Need-based aid"], campusLife: { housing: true, studentClubs: 35, internationalism: "Moderate" }
  },
  {
    id: 142, name: "Xavier Institute of Management", shortName: "XIMB", location: "Bhubaneswar, Odisha", country: "India", region: "Asia", established: 1987,
    ranking: { global: 215, regional: 72 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "15,50,000", currency: "INR" }, emba: { available: true, duration: "2 years", tuitionFee: "12,00,000" }, masters: ["PGDM"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 540, internationalStudents: "4%", femaleStudents: "38%", averageAge: 23 },
    outcomes: { employmentRate: "92%", averageSalary: { amount: 1450000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "140%", topRecruiters: ["Accenture", "Capgemini", "Cognizant", "TCS", "Infosys"] },
    highlights: ["Jesuit tradition", "Strong values", "Rural management", "Social responsibility"], specializations: ["Finance", "Marketing", "Operations", "Rural Management", "HR"],
    image: "https://images.unsplash.com/photo-1567515004624-219c11d31f2e?w=400&h=300&fit=crop&q=80", website: "https://www.ximb.ac.in",
    applicationDeadlines: { round1: "January 15", round2: "February 28", final: "March 31" }, scholarships: ["Merit scholarships", "Need-based aid"], campusLife: { housing: true, studentClubs: 30, internationalism: "Low" }
  },
  {
    id: 143, name: "K J Somaiya Institute of Management", shortName: "SIMSR", location: "Mumbai, Maharashtra", country: "India", region: "Asia", established: 1981,
    ranking: { global: 220, regional: 74 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "13,50,000", currency: "INR" }, emba: { available: true, duration: "2 years", tuitionFee: "10,00,000" }, masters: ["MMS"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 360, internationalStudents: "3%", femaleStudents: "42%", averageAge: 23 },
    outcomes: { employmentRate: "91%", averageSalary: { amount: 1350000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "135%", topRecruiters: ["HDFC", "ICICI", "Axis", "Kotak", "Yes Bank"] },
    highlights: ["Mumbai location", "Banking focus", "Industry connections", "Value-based education"], specializations: ["Finance", "Marketing", "Operations", "Banking", "Insurance"],
    image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400&h=300&fit=crop&q=80", website: "https://www.somaiya.edu",
    applicationDeadlines: { round1: "January 31", round2: "March 31", final: "May 15" }, scholarships: ["Merit scholarships", "Jain community scholarships"], campusLife: { housing: false, studentClubs: 25, internationalism: "Low" }
  },
  {
    id: 144, name: "Bharatiya Vidya Bhavan's SPJIMR", shortName: "SPJIMR", location: "Mumbai, Maharashtra", country: "India", region: "Asia", established: 1981,
    ranking: { global: 225, regional: 76 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "17,50,000", currency: "INR" }, emba: { available: true, duration: "15 months", tuitionFee: "13,50,000" }, masters: ["PGDM"], phd: false },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 240, internationalStudents: "5%", femaleStudents: "35%", averageAge: 23 },
    outcomes: { employmentRate: "93%", averageSalary: { amount: 1650000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "145%", topRecruiters: ["Aditya Birla", "Mahindra", "Godrej", "L&T", "Bajaj"] },
    highlights: ["Family business focus", "Values-based education", "Small batch size", "Holistic development"], specializations: ["Finance", "Marketing", "Operations", "Family Business", "Information Management"],
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&q=80", website: "https://www.spjimr.org",
    applicationDeadlines: { round1: "October 31", round2: "December 31", final: "February 28" }, scholarships: ["Merit scholarships", "Need-based aid"], campusLife: { housing: false, studentClubs: 20, internationalism: "Low" }
  },
  {
    id: 145, name: "Indian Institute of Foreign Trade", shortName: "IIFT", location: "New Delhi, Delhi", country: "India", region: "Asia", established: 1963,
    ranking: { global: 230, regional: 78 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "13,50,000", currency: "INR" }, emba: { available: true, duration: "18 months", tuitionFee: "10,50,000" }, masters: ["MBA (IB)"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 420, internationalStudents: "15%", femaleStudents: "40%", averageAge: 23 },
    outcomes: { employmentRate: "95%", averageSalary: { amount: 1750000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "150%", topRecruiters: ["Export Import Bank", "FIDR", "CII", "ASSOCHAM", "Amazon"] },
    highlights: ["International trade focus", "Government connections", "Export-import expertise", "Global outlook"], specializations: ["International Business", "Export Management", "Trade Finance", "Global Marketing", "Supply Chain"],
    image: "https://images.unsplash.com/photo-1541746972996-4e0b0f93e586?w=400&h=300&fit=crop&q=80", website: "https://www.iift.edu",
    applicationDeadlines: { round1: "November 30", round2: "January 31", final: "March 15" }, scholarships: ["Government scholarships", "Merit scholarships"], campusLife: { housing: true, studentClubs: 25, internationalism: "High" }
  },
  {
    id: 146, name: "Faculty of Management Studies", shortName: "FMS Delhi", location: "New Delhi, Delhi", country: "India", region: "Asia", established: 1954,
    ranking: { global: 235, regional: 80 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "10,000", currency: "INR" }, emba: { available: true, duration: "2 years", tuitionFee: "1,50,000" }, masters: ["MBA"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 220, internationalStudents: "2%", femaleStudents: "35%", averageAge: 23 },
    outcomes: { employmentRate: "98%", averageSalary: { amount: 2050000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "180%", topRecruiters: ["Goldman Sachs", "JP Morgan", "McKinsey", "BCG", "Bain"] },
    highlights: ["Extremely low fees", "Delhi University legacy", "High ROI", "Elite placements"], specializations: ["Finance", "Marketing", "Operations", "Strategy", "Investment Banking"],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop&q=80", website: "https://www.fms.edu",
    applicationDeadlines: { round1: "October 31", round2: "December 15", final: "January 31" }, scholarships: ["University scholarships", "Merit scholarships"], campusLife: { housing: false, studentClubs: 30, internationalism: "Low" }
  },
  {
    id: 147, name: "Department of Management Studies, IIT Delhi", shortName: "DMS IIT Delhi", location: "New Delhi, Delhi", country: "India", region: "Asia", established: 1988,
    ranking: { global: 240, regional: 82 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "3,00,000", currency: "INR" }, emba: { available: true, duration: "2 years", tuitionFee: "12,00,000" }, masters: ["MBA"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 120, internationalStudents: "5%", femaleStudents: "25%", averageAge: 23 },
    outcomes: { employmentRate: "96%", averageSalary: { amount: 1850000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "165%", topRecruiters: ["Microsoft", "Google", "Amazon", "McKinsey", "BCG"] },
    highlights: ["IIT brand", "Technology focus", "Low fees", "High caliber students"], specializations: ["Technology Management", "Finance", "Marketing", "Operations", "Strategy"],
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&h=300&fit=crop&q=80", website: "https://dms.iitd.ac.in",
    applicationDeadlines: { round1: "March 31", round2: "April 30", final: "May 31" }, scholarships: ["Institute scholarships", "Government scholarships"], campusLife: { housing: true, studentClubs: 20, internationalism: "Moderate" }
  },
  {
    id: 148, name: "Vinod Gupta School of Management", shortName: "VGSoM IIT Kharagpur", location: "Kharagpur, West Bengal", country: "India", region: "Asia", established: 1993,
    ranking: { global: 245, regional: 84 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "8,82,000", currency: "INR" }, emba: { available: true, duration: "2 years", tuitionFee: "12,00,000" }, masters: ["MBA"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 280, internationalStudents: "8%", femaleStudents: "30%", averageAge: 23 },
    outcomes: { employmentRate: "94%", averageSalary: { amount: 1650000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "155%", topRecruiters: ["Tata Steel", "Reliance", "L&T", "Maruti", "Hero"] },
    highlights: ["IIT heritage", "Industrial engineering", "Strong alumni", "Research focus"], specializations: ["Operations", "Finance", "Marketing", "Industrial Engineering", "Technology Management"],
    image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&h=300&fit=crop&q=80", website: "https://www.iitkgp.ac.in/department/vg",
    applicationDeadlines: { round1: "January 31", round2: "March 15", final: "April 30" }, scholarships: ["Institute scholarships", "Merit scholarships"], campusLife: { housing: true, studentClubs: 25, internationalism: "Moderate" }
  },
  {
    id: 149, name: "Shailesh J. Mehta School of Management", shortName: "SJMSoM IIT Bombay", location: "Mumbai, Maharashtra", country: "India", region: "Asia", established: 1995,
    ranking: { global: 250, regional: 86 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "11,44,000", currency: "INR" }, emba: { available: true, duration: "2 years", tuitionFee: "18,00,000" }, masters: ["MBA"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 120, internationalStudents: "10%", femaleStudents: "28%", averageAge: 24 },
    outcomes: { employmentRate: "97%", averageSalary: { amount: 1950000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "170%", topRecruiters: ["Goldman Sachs", "Morgan Stanley", "McKinsey", "Bain", "Amazon"] },
    highlights: ["Premier IIT brand", "Mumbai advantage", "Small batch", "Elite placements"], specializations: ["Finance", "Marketing", "Operations", "Technology Management", "Entrepreneurship"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop&q=80", website: "https://www.som.iitb.ac.in",
    applicationDeadlines: { round1: "January 31", round2: "March 15", final: "April 30" }, scholarships: ["Institute scholarships", "Merit scholarships"], campusLife: { housing: true, studentClubs: 20, internationalism: "Moderate" }
  },
  {
    id: 150, name: "Indian School of Mines Business School", shortName: "ISM Dhanbad", location: "Dhanbad, Jharkhand", country: "India", region: "Asia", established: 2008,
    ranking: { global: 255, regional: 88 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "4,16,000", currency: "INR" }, emba: { available: false }, masters: ["MBA"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 120, internationalStudents: "2%", femaleStudents: "25%", averageAge: 23 },
    outcomes: { employmentRate: "89%", averageSalary: { amount: 1150000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "140%", topRecruiters: ["Coal India", "ONGC", "SAIL", "Tata Steel", "Vedanta"] },
    highlights: ["Mining focus", "Government sector", "IIT status", "Industry partnerships"], specializations: ["Finance", "Marketing", "Operations", "Mining Management", "Energy"],
    image: "https://images.unsplash.com/photo-1554993109-f7b0666dd0a7?w=400&h=300&fit=crop&q=80", website: "https://www.iitism.ac.in",
    applicationDeadlines: { round1: "February 28", round2: "April 15", final: "May 31" }, scholarships: ["Institute scholarships", "Government scholarships"], campusLife: { housing: true, studentClubs: 20, internationalism: "Low" }
  },
  {
    id: 151, name: "National Institute of Industrial Engineering", shortName: "NITIE", location: "Mumbai, Maharashtra", country: "India", region: "Asia", established: 1963,
    ranking: { global: 260, regional: 90 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "4,50,000", currency: "INR" }, emba: { available: false, duration: "", tuitionFee: "" }, masters: ["PGDIM", "PGDIE"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 240, internationalStudents: "3%", femaleStudents: "25%", averageAge: 23 },
    outcomes: { employmentRate: "95%", averageSalary: { amount: 1650000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "160%", topRecruiters: ["L&T", "Mahindra", "Tata Motors", "Bajaj Auto", "Hero"] },
    highlights: ["Operations focus", "Industrial engineering", "Mumbai location", "Government institute"], specializations: ["Operations", "Supply Chain", "Industrial Engineering", "Systems", "Project Management"],
    image: "https://images.unsplash.com/photo-1586880244386-8b3c8c06e043?w=400&h=300&fit=crop&q=80", website: "https://www.nitie.ac.in",
    applicationDeadlines: { round1: "February 28", round2: "April 15", final: "May 31" }, scholarships: ["Government scholarships", "Merit scholarships"], campusLife: { housing: true, studentClubs: 20, internationalism: "Low" }
  },
  {
    id: 152, name: "Indian Institute of Management Trichy", shortName: "IIM Trichy", location: "Tiruchirappalli, Tamil Nadu", country: "India", region: "Asia", established: 2011,
    ranking: { global: 265, regional: 92 }, accreditation: ["AACSB"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "16,50,000", currency: "INR" }, emba: { available: false, duration: "", tuitionFee: "" }, masters: ["EPGP"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 180, internationalStudents: "2%", femaleStudents: "30%", averageAge: 23 },
    outcomes: { employmentRate: "93%", averageSalary: { amount: 1480000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "145%", topRecruiters: ["TCS", "Infosys", "Cognizant", "Wipro", "HCL"] },
    highlights: ["South India presence", "Technology focus", "Cultural heritage", "Growing reputation"], specializations: ["Finance", "Marketing", "Operations", "Information Systems", "Technology"],
    image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=400&h=300&fit=crop&q=80", website: "https://www.iimtrichy.ac.in",
    applicationDeadlines: { round1: "November 15", round2: "January 15", final: "March 31" }, scholarships: ["Merit scholarships", "Need-based aid"], campusLife: { housing: true, studentClubs: 18, internationalism: "Low" }
  },
  {
    id: 153, name: "Indian Institute of Management Raipur", shortName: "IIM Raipur", location: "Raipur, Chhattisgarh", country: "India", region: "Asia", established: 2010,
    ranking: { global: 270, regional: 94 }, accreditation: ["AACSB"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "15,60,000", currency: "INR" }, emba: { available: false, duration: "", tuitionFee: "" }, masters: ["EPGP"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 180, internationalStudents: "1%", femaleStudents: "28%", averageAge: 23 },
    outcomes: { employmentRate: "91%", averageSalary: { amount: 1350000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "140%", topRecruiters: ["NTPC", "Coal India", "SAIL", "Power Grid", "ONGC"] },
    highlights: ["Central India location", "Mining belt", "Government sector", "Tribal development"], specializations: ["Finance", "Marketing", "Operations", "Mining Management", "Rural Management"],
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop&q=80", website: "https://www.iimraipur.ac.in",
    applicationDeadlines: { round1: "November 15", round2: "January 15", final: "March 31" }, scholarships: ["Merit scholarships", "Tribal scholarships"], campusLife: { housing: true, studentClubs: 15, internationalism: "Low" }
  },
  {
    id: 154, name: "Indian Institute of Management Rohtak", shortName: "IIM Rohtak", location: "Rohtak, Haryana", country: "India", region: "Asia", established: 2009,
    ranking: { global: 275, regional: 96 }, accreditation: ["AACSB"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "16,00,000", currency: "INR" }, emba: { available: false, duration: "", tuitionFee: "" }, masters: ["EPGP"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 240, internationalStudents: "2%", femaleStudents: "32%", averageAge: 23 },
    outcomes: { employmentRate: "92%", averageSalary: { amount: 1420000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "142%", topRecruiters: ["Maruti Suzuki", "Hero MotoCorp", "Bajaj Auto", "Mahindra", "Tata Motors"] },
    highlights: ["NCR proximity", "Automobile industry", "Agricultural belt", "Rural focus"], specializations: ["Finance", "Marketing", "Operations", "Agribusiness", "Rural Management"],
    image: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=400&h=300&fit=crop&q=80", website: "https://www.iimrohtak.ac.in",
    applicationDeadlines: { round1: "November 15", round2: "January 15", final: "March 31" }, scholarships: ["Merit scholarships", "Rural scholarships"], campusLife: { housing: true, studentClubs: 20, internationalism: "Low" }
  },
  {
    id: 155, name: "Indian Institute of Management Shillong", shortName: "IIM Shillong", location: "Shillong, Meghalaya", country: "India", region: "Asia", established: 2008,
    ranking: { global: 280, regional: 98 }, accreditation: ["AACSB"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "15,50,000", currency: "INR" }, emba: { available: false, duration: "", tuitionFee: "" }, masters: ["EPGP"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 180, internationalStudents: "1%", femaleStudents: "35%", averageAge: 23 },
    outcomes: { employmentRate: "89%", averageSalary: { amount: 1280000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "138%", topRecruiters: ["Oil India", "ONGC", "Coal India", "NE Electric", "Assam Tea"] },
    highlights: ["Northeast India", "Scenic campus", "Tribal focus", "Cultural diversity"], specializations: ["Finance", "Marketing", "Operations", "Northeast Development", "Tribal Studies"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&q=80", website: "https://www.iimshillong.ac.in",
    applicationDeadlines: { round1: "November 15", round2: "January 15", final: "March 31" }, scholarships: ["Northeast scholarships", "Tribal scholarships"], campusLife: { housing: true, studentClubs: 15, internationalism: "Low" }
  },
  {
    id: 156, name: "Birla Institute of Management Technology", shortName: "BIMTECH", location: "Greater Noida, Uttar Pradesh", country: "India", region: "Asia", established: 1988,
    ranking: { global: 285, regional: 100 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "13,50,000", currency: "INR" }, emba: { available: true, duration: "2 years", tuitionFee: "10,00,000" }, masters: ["PGDM"], phd: false },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 540, internationalStudents: "4%", femaleStudents: "40%", averageAge: 23 },
    outcomes: { employmentRate: "94%", averageSalary: { amount: 1380000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "145%", topRecruiters: ["Hindustan Unilever", "Nestle", "Britannia", "Dabur", "Godrej"] },
    highlights: ["NCR location", "FMCG focus", "Industry connections", "Birla legacy"], specializations: ["Marketing", "Finance", "Operations", "International Business", "Retail"],
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop&q=80", website: "https://www.bimtech.ac.in",
    applicationDeadlines: { round1: "February 28", round2: "April 30", final: "June 15" }, scholarships: ["Merit scholarships", "Need-based aid"], campusLife: { housing: true, studentClubs: 30, internationalism: "Moderate" }
  },
  {
    id: 157, name: "Institute of Rural Management", shortName: "IRMA", location: "Anand, Gujarat", country: "India", region: "Asia", established: 1979,
    ranking: { global: 290, regional: 102 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "8,50,000", currency: "INR" }, emba: { available: false, duration: "", tuitionFee: "" }, masters: ["PGDRM"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 300, internationalStudents: "2%", femaleStudents: "45%", averageAge: 23 },
    outcomes: { employmentRate: "92%", averageSalary: { amount: 1150000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "140%", topRecruiters: ["ITC", "Nestle", "Mother Dairy", "Amul", "NABARD"] },
    highlights: ["Rural management pioneer", "Social impact", "Agricultural focus", "Cooperative sector"], specializations: ["Rural Management", "Agribusiness", "Social Development", "Cooperatives", "Sustainability"],
    image: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=400&h=300&fit=crop&q=80", website: "https://www.irma.ac.in",
    applicationDeadlines: { round1: "January 15", round2: "February 28", final: "March 31" }, scholarships: ["Rural scholarships", "Merit scholarships"], campusLife: { housing: true, studentClubs: 20, internationalism: "Low" }
  },
  {
    id: 158, name: "Goa Institute of Management", shortName: "GIM", location: "Panaji, Goa", country: "India", region: "Asia", established: 1993,
    ranking: { global: 295, regional: 104 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "14,50,000", currency: "INR" }, emba: { available: true, duration: "2 years", tuitionFee: "11,00,000" }, masters: ["PGDM"], phd: false },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 360, internationalStudents: "6%", femaleStudents: "42%", averageAge: 23 },
    outcomes: { employmentRate: "93%", averageSalary: { amount: 1320000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "142%", topRecruiters: ["Deloitte", "EY", "PwC", "KPMG", "Accenture"] },
    highlights: ["Goa location", "Tourism management", "Coastal advantage", "Work-life balance"], specializations: ["Finance", "Marketing", "Operations", "Tourism", "Hospitality"],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop&q=80", website: "https://www.gim.ac.in",
    applicationDeadlines: { round1: "January 31", round2: "March 15", final: "April 30" }, scholarships: ["Merit scholarships", "Goa domicile scholarships"], campusLife: { housing: true, studentClubs: 25, internationalism: "Moderate" }
  },
  {
    id: 159, name: "Asian Institute of Management", shortName: "AIMTDR", location: "New Delhi, Delhi", country: "India", region: "Asia", established: 1996,
    ranking: { global: 300, regional: 106 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "12,50,000", currency: "INR" }, emba: { available: true, duration: "18 months", tuitionFee: "9,50,000" }, masters: ["PGDM"], phd: false },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 240, internationalStudents: "5%", femaleStudents: "38%", averageAge: 23 },
    outcomes: { employmentRate: "90%", averageSalary: { amount: 1180000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "135%", topRecruiters: ["HDFC Bank", "ICICI", "Axis Bank", "SBI", "Kotak"] },
    highlights: ["Delhi location", "Banking focus", "Industry interface", "Professional development"], specializations: ["Finance", "Marketing", "Banking", "Insurance", "Operations"],
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop&q=80", website: "https://www.aimtdr.ac.in",
    applicationDeadlines: { round1: "February 15", round2: "April 15", final: "May 31" }, scholarships: ["Merit scholarships", "Need-based aid"], campusLife: { housing: false, studentClubs: 20, internationalism: "Moderate" }
  },
  {
    id: 160, name: "Prin. L.N. Welingkar Institute of Management Development", shortName: "WeSchool Bangalore", location: "Bangalore, Karnataka", country: "India", region: "Asia", established: 2006,
    ranking: { global: 305, regional: 108 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "11,50,000", currency: "INR" }, emba: { available: true, duration: "2 years", tuitionFee: "8,50,000" }, masters: ["PGDM"], phd: false },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 420, internationalStudents: "4%", femaleStudents: "44%", averageAge: 23 },
    outcomes: { employmentRate: "91%", averageSalary: { amount: 1250000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "138%", topRecruiters: ["Infosys", "TCS", "Wipro", "Accenture", "IBM"] },
    highlights: ["Bangalore IT hub", "Technology focus", "Industry partnerships", "Startup ecosystem"], specializations: ["IT", "Finance", "Marketing", "Operations", "Entrepreneurship"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop&q=80", website: "https://www.welingkarbangalore.org",
    applicationDeadlines: { round1: "March 31", round2: "May 31", final: "June 30" }, scholarships: ["Merit scholarships", "IT industry scholarships"], campusLife: { housing: false, studentClubs: 25, internationalism: "Moderate" }
  },
  {
    id: 161, name: "Alliance University School of Business", shortName: "Alliance", location: "Bangalore, Karnataka", country: "India", region: "Asia", established: 2010,
    ranking: { global: 310, regional: 110 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "16,50,000", currency: "INR" }, emba: { available: true, duration: "2 years", tuitionFee: "12,50,000" }, masters: ["MBA"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 600, internationalStudents: "8%", femaleStudents: "46%", averageAge: 23 },
    outcomes: { employmentRate: "89%", averageSalary: { amount: 1320000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "142%", topRecruiters: ["Microsoft", "Amazon", "Google", "Flipkart", "Ola"] },
    highlights: ["Bangalore location", "International partnerships", "Modern campus", "Industry focus"], specializations: ["Technology Management", "Finance", "Marketing", "Operations", "Digital Business"],
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&h=300&fit=crop&q=80", website: "https://www.alliance.edu.in",
    applicationDeadlines: { round1: "February 28", round2: "April 30", final: "June 15" }, scholarships: ["Merit scholarships", "International scholarships"], campusLife: { housing: true, studentClubs: 40, internationalism: "High" }
  },
  {
    id: 162, name: "Christ University Institute of Management", shortName: "CUIM", location: "Bangalore, Karnataka", country: "India", region: "Asia", established: 2008,
    ranking: { global: 315, regional: 112 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "13,50,000", currency: "INR" }, emba: { available: false, duration: "", tuitionFee: "" }, masters: ["MBA"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 480, internationalStudents: "5%", femaleStudents: "48%", averageAge: 23 },
    outcomes: { employmentRate: "88%", averageSalary: { amount: 1150000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "132%", topRecruiters: ["Cognizant", "TCS", "Infosys", "Wipro", "HCL"] },
    highlights: ["Christian values", "Holistic education", "Social responsibility", "Diverse programs"], specializations: ["Finance", "Marketing", "HR", "Operations", "International Business"],
    image: "https://images.unsplash.com/photo-1567515004624-219c11d31f2e?w=400&h=300&fit=crop&q=80", website: "https://www.christuniversity.in",
    applicationDeadlines: { round1: "March 15", round2: "May 15", final: "June 30" }, scholarships: ["Merit scholarships", "Christian minority scholarships"], campusLife: { housing: true, studentClubs: 35, internationalism: "Moderate" }
  },
  {
    id: 163, name: "Amrita School of Business", shortName: "ASB", location: "Coimbatore, Tamil Nadu", country: "India", region: "Asia", established: 2001,
    ranking: { global: 320, regional: 114 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "12,50,000", currency: "INR" }, emba: { available: false, duration: "", tuitionFee: "" }, masters: ["MBA"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 360, internationalStudents: "3%", femaleStudents: "45%", averageAge: 23 },
    outcomes: { employmentRate: "87%", averageSalary: { amount: 1080000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "128%", topRecruiters: ["Tata Consultancy Services", "Infosys", "L&T", "Ashok Leyland", "TVS"] },
    highlights: ["Spiritual foundation", "Technology integration", "Research focus", "Value-based education"], specializations: ["Finance", "Marketing", "Operations", "Systems", "Healthcare Management"],
    image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=400&h=300&fit=crop&q=80", website: "https://www.amrita.edu",
    applicationDeadlines: { round1: "February 15", round2: "April 15", final: "May 31" }, scholarships: ["Merit scholarships", "Spiritual scholarships"], campusLife: { housing: true, studentClubs: 30, internationalism: "Low" }
  },
  {
    id: 164, name: "ICFAI Business School", shortName: "IBS Hyderabad", location: "Hyderabad, Telangana", country: "India", region: "Asia", established: 1995,
    ranking: { global: 325, regional: 116 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "10,50,000", currency: "INR" }, emba: { available: true, duration: "2 years", tuitionFee: "8,00,000" }, masters: ["MBA"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 720, internationalStudents: "4%", femaleStudents: "42%", averageAge: 23 },
    outcomes: { employmentRate: "85%", averageSalary: { amount: 950000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "125%", topRecruiters: ["TCS", "Infosys", "Wipro", "Cognizant", "Tech Mahindra"] },
    highlights: ["Multiple campuses", "ICFAI University", "Research orientation", "Case study method"], specializations: ["Finance", "Marketing", "HR", "Operations", "International Business"],
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop&q=80", website: "https://www.ibsindia.org",
    applicationDeadlines: { round1: "March 31", round2: "May 31", final: "June 30" }, scholarships: ["Merit scholarships", "Need-based aid"], campusLife: { housing: true, studentClubs: 25, internationalism: "Moderate" }
  },
  {
    id: 165, name: "Amity Business School", shortName: "ABS", location: "Noida, Uttar Pradesh", country: "India", region: "Asia", established: 2005,
    ranking: { global: 330, regional: 118 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "14,50,000", currency: "INR" }, emba: { available: true, duration: "2 years", tuitionFee: "11,00,000" }, masters: ["MBA"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 900, internationalStudents: "7%", femaleStudents: "50%", averageAge: 23 },
    outcomes: { employmentRate: "86%", averageSalary: { amount: 1180000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "135%", topRecruiters: ["Amazon", "Flipkart", "Paytm", "Microsoft", "Google"] },
    highlights: ["NCR location", "Modern infrastructure", "International exposure", "Industry partnerships"], specializations: ["Finance", "Marketing", "HR", "Operations", "Digital Marketing"],
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop&q=80", website: "https://www.amity.edu",
    applicationDeadlines: { round1: "March 31", round2: "May 31", final: "July 15" }, scholarships: ["Merit scholarships", "Sports scholarships"], campusLife: { housing: true, studentClubs: 50, internationalism: "High" }
  },
  {
    id: 166, name: "Institute of Management Study", shortName: "IMS Ghaziabad", location: "Ghaziabad, Uttar Pradesh", country: "India", region: "Asia", established: 1990,
    ranking: { global: 335, regional: 120 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "9,50,000", currency: "INR" }, emba: { available: true, duration: "2 years", tuitionFee: "7,50,000" }, masters: ["PGDM"], phd: false },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 600, internationalStudents: "3%", femaleStudents: "40%", averageAge: 23 },
    outcomes: { employmentRate: "83%", averageSalary: { amount: 850000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "118%", topRecruiters: ["HDFC", "ICICI", "Axis Bank", "Bajaj", "Hero"] },
    highlights: ["NCR location", "Affordable fees", "Industry connections", "Practical learning"], specializations: ["Finance", "Marketing", "HR", "Operations", "International Business"],
    image: "https://images.unsplash.com/photo-1586880244386-8b3c8c06e043?w=400&h=300&fit=crop&q=80", website: "https://www.imsuniversity.ac.in",
    applicationDeadlines: { round1: "April 15", round2: "June 15", final: "July 31" }, scholarships: ["Merit scholarships", "Need-based aid"], campusLife: { housing: true, studentClubs: 30, internationalism: "Low" }
  },
  {
    id: 167, name: "MICA - School of Ideas", shortName: "MICA", location: "Ahmedabad, Gujarat", country: "India", region: "Asia", established: 1991,
    ranking: { global: 340, regional: 122 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "19,50,000", currency: "INR" }, emba: { available: false, duration: "", tuitionFee: "" }, masters: ["PGDM-C"], phd: false },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 360, internationalStudents: "5%", femaleStudents: "48%", averageAge: 23 },
    outcomes: { employmentRate: "95%", averageSalary: { amount: 1550000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "165%", topRecruiters: ["Ogilvy", "McCann", "JWT", "Leo Burnett", "Publicis"] },
    highlights: ["Communication focus", "Creative industry", "Advertising specialization", "Industry partnerships"], specializations: ["Brand Management", "Advertising", "Digital Marketing", "Media Planning", "Communications"],
    image: "https://images.unsplash.com/photo-1533834971858-eb9d82c21433?w=400&h=300&fit=crop&q=80", website: "https://www.micamail.in",
    applicationDeadlines: { round1: "December 15", round2: "January 31", final: "February 28" }, scholarships: ["Creative scholarships", "Merit scholarships"], campusLife: { housing: true, studentClubs: 20, internationalism: "Moderate" }
  },
  {
    id: 168, name: "Jamnalal Bajaj Institute of Management Studies", shortName: "JBIMS", location: "Mumbai, Maharashtra", country: "India", region: "Asia", established: 1965,
    ranking: { global: 345, regional: 124 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "1,20,000", currency: "INR" }, emba: { available: false, duration: "", tuitionFee: "" }, masters: ["MMS"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 240, internationalStudents: "1%", femaleStudents: "35%", averageAge: 23 },
    outcomes: { employmentRate: "98%", averageSalary: { amount: 2180000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "195%", topRecruiters: ["Goldman Sachs", "JP Morgan", "Morgan Stanley", "McKinsey", "Bain"] },
    highlights: ["Lowest fees", "Highest ROI", "Mumbai advantage", "Finance specialization"], specializations: ["Finance", "Marketing", "Operations", "Investment Banking", "Capital Markets"],
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&h=300&fit=crop&q=80", website: "https://jbims.edu",
    applicationDeadlines: { round1: "June 30", round2: "July 15", final: "July 31" }, scholarships: ["Government scholarships", "Merit scholarships"], campusLife: { housing: false, studentClubs: 25, internationalism: "Low" }
  },
  {
    id: 169, name: "Department of Management Studies, IIT Madras", shortName: "DMS IIT Madras", location: "Chennai, Tamil Nadu", country: "India", region: "Asia", established: 1996,
    ranking: { global: 350, regional: 126 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "2,50,000", currency: "INR" }, emba: { available: true, duration: "2 years", tuitionFee: "15,00,000" }, masters: ["MBA"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 120, internationalStudents: "8%", femaleStudents: "30%", averageAge: 24 },
    outcomes: { employmentRate: "95%", averageSalary: { amount: 1750000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "160%", topRecruiters: ["Microsoft", "Google", "Amazon", "Flipkart", "Ola"] },
    highlights: ["IIT brand", "Technology focus", "Chennai IT hub", "Research excellence"], specializations: ["Technology Management", "Operations", "Finance", "Marketing", "Innovation"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop&q=80", website: "https://dms.iitm.ac.in",
    applicationDeadlines: { round1: "February 28", round2: "April 15", final: "May 31" }, scholarships: ["Institute scholarships", "Government scholarships"], campusLife: { housing: true, studentClubs: 15, internationalism: "Moderate" }
  },
  {
    id: 170, name: "Rajagiri Centre for Business Studies", shortName: "RCBS", location: "Kochi, Kerala", country: "India", region: "Asia", established: 1994,
    ranking: { global: 355, regional: 128 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "11,50,000", currency: "INR" }, emba: { available: false, duration: "", tuitionFee: "" }, masters: ["MBA"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 240, internationalStudents: "4%", femaleStudents: "50%", averageAge: 23 },
    outcomes: { employmentRate: "89%", averageSalary: { amount: 1050000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "130%", topRecruiters: ["TCS", "Infosys", "Wipro", "UST Global", "Cognizant"] },
    highlights: ["Kerala location", "Port city advantage", "IT corridor", "Social values"], specializations: ["Finance", "Marketing", "HR", "Operations", "International Business"],
    image: "https://images.unsplash.com/photo-1595950653106-6c9c43bd4ef8?w=400&h=300&fit=crop&q=80", website: "https://www.rajagiri.edu",
    applicationDeadlines: { round1: "March 15", round2: "May 15", final: "June 30" }, scholarships: ["Merit scholarships", "Need-based aid"], campusLife: { housing: true, studentClubs: 25, internationalism: "Moderate" }
  },
  {
    id: 171, name: "Manipal Academy of Higher Education", shortName: "MAHE", location: "Manipal, Karnataka", country: "India", region: "Asia", established: 1953,
    ranking: { global: 360, regional: 130 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "13,50,000", currency: "INR" }, emba: { available: true, duration: "2 years", tuitionFee: "10,50,000" }, masters: ["MBA"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 480, internationalStudents: "12%", femaleStudents: "45%", averageAge: 23 },
    outcomes: { employmentRate: "88%", averageSalary: { amount: 1120000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "135%", topRecruiters: ["Infosys", "TCS", "Wipro", "Accenture", "IBM"] },
    highlights: ["Healthcare focus", "International campus", "Research university", "Global exposure"], specializations: ["Healthcare Management", "Finance", "Marketing", "Operations", "International Business"],
    image: "https://images.unsplash.com/photo-1567515004624-219c11d31f2e?w=400&h=300&fit=crop&q=80", website: "https://www.manipal.edu",
    applicationDeadlines: { round1: "March 31", round2: "May 31", final: "July 15" }, scholarships: ["Merit scholarships", "International scholarships"], campusLife: { housing: true, studentClubs: 40, internationalism: "High" }
  },
  {
    id: 172, name: "Vellore Institute of Technology Business School", shortName: "VIT BS", location: "Vellore, Tamil Nadu", country: "India", region: "Asia", established: 1984,
    ranking: { global: 365, regional: 132 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "12,50,000", currency: "INR" }, emba: { available: false, duration: "", tuitionFee: "" }, masters: ["MBA"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 600, internationalStudents: "15%", femaleStudents: "48%", averageAge: 23 },
    outcomes: { employmentRate: "85%", averageSalary: { amount: 980000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "125%", topRecruiters: ["TCS", "Infosys", "Cognizant", "HCL", "Tech Mahindra"] },
    highlights: ["Technology university", "International students", "Modern campus", "Industry interface"], specializations: ["Technology Management", "Finance", "Marketing", "Operations", "Digital Business"],
    image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=400&h=300&fit=crop&q=80", website: "https://www.vit.ac.in",
    applicationDeadlines: { round1: "April 15", round2: "June 15", final: "July 31" }, scholarships: ["Merit scholarships", "International scholarships"], campusLife: { housing: true, studentClubs: 50, internationalism: "High" }
  },
  {
    id: 173, name: "Indian Institute of Management Calcutta Executive Education", shortName: "IIM Calcutta EE", location: "Kolkata, West Bengal", country: "India", region: "Asia", established: 1961,
    ranking: { global: 370, regional: 134 }, accreditation: ["AACSB"],
    programs: { mba: { available: false, duration: "", tuitionFee: "" }, emba: { available: true, duration: "18 months", tuitionFee: "25,00,000" }, masters: ["Executive MBA"], phd: false },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 8, minYears: 5 }, englishTest: {} },
    statistics: { studentBody: 120, internationalStudents: "5%", femaleStudents: "25%", averageAge: 32 },
    outcomes: { employmentRate: "100%", averageSalary: { amount: 3500000, currency: "INR", timeFrame: "Post-program" }, salaryIncrease: "65%", topRecruiters: ["Existing employers", "Consulting firms", "MNCs", "Private equity", "Startups"] },
    highlights: ["Executive education", "Working professionals", "Weekend format", "IIM brand"], specializations: ["General Management", "Strategy", "Leadership", "Innovation", "Digital Transformation"],
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop&q=80", website: "https://www.iimcal.ac.in",
    applicationDeadlines: { round1: "January 31", round2: "March 31", final: "May 15" }, scholarships: ["Corporate sponsorships", "Alumni scholarships"], campusLife: { housing: false, studentClubs: 10, internationalism: "Moderate" }
  },
  {
    id: 174, name: "Bharati Vidyapeeth University Institute of Management", shortName: "BVUIM", location: "Pune, Maharashtra", country: "India", region: "Asia", established: 1996,
    ranking: { global: 375, regional: 136 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "8,50,000", currency: "INR" }, emba: { available: true, duration: "2 years", tuitionFee: "6,50,000" }, masters: ["MBA"], phd: true },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 360, internationalStudents: "2%", femaleStudents: "42%", averageAge: 23 },
    outcomes: { employmentRate: "84%", averageSalary: { amount: 780000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "115%", topRecruiters: ["TCS", "Infosys", "Wipro", "Mahindra", "Bajaj"] },
    highlights: ["Pune location", "Affordable fees", "Industry connections", "Value-based education"], specializations: ["Finance", "Marketing", "HR", "Operations", "International Business"],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop&q=80", website: "https://www.bharatividyapeeth.edu",
    applicationDeadlines: { round1: "April 30", round2: "June 30", final: "July 31" }, scholarships: ["Merit scholarships", "Need-based aid"], campusLife: { housing: true, studentClubs: 30, internationalism: "Low" }
  },
  {
    id: 175, name: "Prestige Institute of Management", shortName: "PIM Gwalior", location: "Gwalior, Madhya Pradesh", country: "India", region: "Asia", established: 1994,
    ranking: { global: 380, regional: 138 }, accreditation: ["NAAC"],
    programs: { mba: { available: true, duration: "2 years", tuitionFee: "7,50,000", currency: "INR" }, emba: { available: false, duration: "", tuitionFee: "" }, masters: ["PGDM"], phd: false },
    admissionRequirements: { gmat: { required: false }, gre: { accepted: false }, workExperience: { required: true, averageYears: 0, minYears: 0 }, englishTest: {} },
    statistics: { studentBody: 300, internationalStudents: "1%", femaleStudents: "38%", averageAge: 23 },
    outcomes: { employmentRate: "82%", averageSalary: { amount: 650000, currency: "INR", timeFrame: "Final placements" }, salaryIncrease: "108%", topRecruiters: ["HDFC", "ICICI", "Bajaj", "Hero", "Mahindra"] },
    highlights: ["Central India", "Affordable fees", "Strong alumni", "Regional focus"], specializations: ["Finance", "Marketing", "HR", "Operations", "Agribusiness"],
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop&q=80", website: "https://www.pimgwalior.ac.in",
    applicationDeadlines: { round1: "May 31", round2: "July 15", final: "August 15" }, scholarships: ["Merit scholarships", "Regional scholarships"], campusLife: { housing: true, studentClubs: 20, internationalism: "Low" }
  }
]

// Helper functions
export const getBusinessSchoolsByRegion = (region: string) => {
  return businessSchools.filter(school => school.region === region)
}

export const getBusinessSchoolsByCountry = (country: string) => {
  return businessSchools.filter(school => school.country === country)
}

export const getTopBusinessSchools = (count: number = 10) => {
  return businessSchools
    .sort((a, b) => a.ranking.global - b.ranking.global)
    .slice(0, count)
}

export const searchBusinessSchools = (query: string) => {
  const lowercaseQuery = query.toLowerCase()
  return businessSchools.filter(school => 
    school.name.toLowerCase().includes(lowercaseQuery) ||
    school.location.toLowerCase().includes(lowercaseQuery) ||
    school.country.toLowerCase().includes(lowercaseQuery) ||
    school.specializations.some(spec => spec.toLowerCase().includes(lowercaseQuery))
  )
}