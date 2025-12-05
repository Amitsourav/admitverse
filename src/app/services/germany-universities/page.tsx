'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import TopBanner from '@/components/TopBanner'
import Footer from '@/components/Footer'
import FloatingActions from '@/components/FloatingActions'
import AnimatedCounter from '@/components/AnimatedCounter'
import { 
  Users,
  MessageSquare,
  Presentation,
  FileText,
  Video,
  Target,
  Trophy,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Globe,
  GraduationCap,
  Calculator,
  Clock,
  Phone,
  User,
  X,
  ChevronDown,
  ChevronRight,
  Search,
  MapPin,
  Star,
  Award,
  DollarSign,
  Briefcase,
  Heart,
  Shield,
  Zap,
  TrendingUp,
  Building2,
  Plane,
  Languages
} from 'lucide-react'
import Link from 'next/link'
import { submitGDPIPackage } from '@/services/dataCollection'

export default function GermanyUniversitiesPage() {
  const [showModal, setShowModal] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAllUniversities, setShowAllUniversities] = useState(false)
  
  // Cost Calculator States
  const [studyDuration, setStudyDuration] = useState('2')
  const [selectedCity, setSelectedCity] = useState('Berlin')
  const [costEstimate, setCostEstimate] = useState({ min: 15600, max: 18000 })
  
  // Eligibility Checker States
  const [academicLevel, setAcademicLevel] = useState("Bachelor's")
  const [gpaScore, setGpaScore] = useState('')
  const [englishTest, setEnglishTest] = useState('IELTS 6.5+')
  const [eligibilityResult, setEligibilityResult] = useState({ eligible: false, percentage: 0, universities: 0 })
  
  // University Finder States
  const [fieldOfStudy, setFieldOfStudy] = useState('Engineering')
  const [preferredLanguage, setPreferredLanguage] = useState('English')
  const [budgetRange, setBudgetRange] = useState('€0 - €500/semester')
  const [matchedUniversities, setMatchedUniversities] = useState(0)
  
  // IELTS Score Predictor States
  const [listeningScore, setListeningScore] = useState('')
  const [readingScore, setReadingScore] = useState('')
  const [writingScore, setWritingScore] = useState('')
  const [speakingScore, setSpeakingScore] = useState('')
  const [predictedBand, setPredictedBand] = useState(0)
  
  // Visa Requirements Checker States
  const [nationality, setNationality] = useState('Indian')
  const [studyPurpose, setStudyPurpose] = useState("Bachelor's Degree")
  const [studyDurationVisa, setStudyDurationVisa] = useState('2 years')
  const [visaRequirements, setVisaRequirements] = useState({ type: '', requirements: [], processing_time: '' })
  
  // Document Checklist Generator States
  const [studentType, setStudentType] = useState('International')
  const [applicationLevel, setApplicationLevel] = useState("Bachelor's")
  const [hasWorkExperience, setHasWorkExperience] = useState(false)
  const [documentChecklist, setDocumentChecklist] = useState<string[]>([])
  
  // Tool Modal State
  const [activeToolModal, setActiveToolModal] = useState<string | null>(null)

  // Cost Calculator Function
  const calculateCost = () => {
    const cityMultipliers: { [key: string]: number } = {
      'Berlin': 1.0,
      'Munich': 1.3,
      'Hamburg': 1.15,
      'Dresden': 0.85,
      'Frankfurt': 1.25
    }
    
    const baseCost = 10000 // Base annual cost in euros
    const multiplier = cityMultipliers[selectedCity] || 1.0
    const duration = parseInt(studyDuration)
    
    const minCost = Math.round(baseCost * multiplier * duration * 0.9)
    const maxCost = Math.round(baseCost * multiplier * duration * 1.2)
    
    setCostEstimate({ min: minCost, max: maxCost })
  }
  
  // Eligibility Checker Function
  const checkEligibility = () => {
    let score = 0
    let eligibleCount = 0
    
    // GPA Score evaluation
    const gpa = parseFloat(gpaScore)
    if (gpa >= 3.5 || gpa >= 85) {
      score += 40
      eligibleCount = 150
    } else if (gpa >= 3.0 || gpa >= 75) {
      score += 30
      eligibleCount = 100
    } else if (gpa >= 2.5 || gpa >= 65) {
      score += 20
      eligibleCount = 50
    } else {
      score += 10
      eligibleCount = 20
    }
    
    // English Test evaluation
    if (englishTest.includes('7.0') || englishTest.includes('90')) {
      score += 40
    } else if (englishTest.includes('6.5') || englishTest.includes('80')) {
      score += 30
    } else if (englishTest.includes('6.0')) {
      score += 20
    } else {
      score += 5
    }
    
    // Academic Level evaluation
    if (academicLevel === "Master's") {
      score += 20
      eligibleCount += 50
    } else if (academicLevel === 'PhD') {
      score += 15
      eligibleCount += 30
    } else {
      score += 10
    }
    
    const percentage = Math.min(score, 95)
    setEligibilityResult({
      eligible: percentage >= 40,
      percentage: percentage,
      universities: eligibleCount
    })
  }
  
  // University Finder Function
  const findUniversities = () => {
    let count = 0
    
    // Field of study matching
    const fieldCounts: { [key: string]: number } = {
      'Engineering': 85,
      'Business': 60,
      'Computer Science': 75,
      'Medicine': 40,
      'Arts & Design': 35
    }
    
    count = fieldCounts[fieldOfStudy] || 50
    
    // Language preference adjustment
    if (preferredLanguage === 'English') {
      count = Math.round(count * 0.6)
    } else if (preferredLanguage === 'Both') {
      count = Math.round(count * 1.2)
    }
    
    // Budget adjustment
    if (budgetRange.includes('€0')) {
      count = Math.round(count * 0.7) // Public universities
    } else if (budgetRange.includes('15000')) {
      count = Math.round(count * 0.3) // Premium universities
    }
    
    setMatchedUniversities(Math.max(count, 5))
  }
  
  // IELTS Score Predictor Function
  const predictIELTSBand = () => {
    const listening = parseFloat(listeningScore) || 0
    const reading = parseFloat(readingScore) || 0
    const writing = parseFloat(writingScore) || 0
    const speaking = parseFloat(speakingScore) || 0
    
    if (listening > 9 || reading > 9 || writing > 9 || speaking > 9) {
      alert('IELTS band scores range from 0 to 9')
      return
    }
    
    const average = (listening + reading + writing + speaking) / 4
    
    // IELTS rounding rules
    let band = 0
    const decimal = average - Math.floor(average)
    
    if (decimal < 0.25) {
      band = Math.floor(average)
    } else if (decimal < 0.75) {
      band = Math.floor(average) + 0.5
    } else {
      band = Math.ceil(average)
    }
    
    setPredictedBand(band)
  }
  
  // Visa Requirements Checker Function
  const checkVisaRequirements = () => {
    const visaData: { [key: string]: any } = {
      'Indian': {
        "Bachelor's Degree": {
          type: 'Student Visa (National Visa)',
          requirements: [
            'Valid passport with 12+ months validity',
            'University admission letter',
            'Proof of financial resources (€10,236/year)',
            'Health insurance coverage',
            'Academic transcripts and certificates',
            'IELTS/TOEFL or German language certificate',
            'Motivation letter',
            'CV/Resume',
            'Passport photos (biometric)'
          ],
          processing_time: '4-8 weeks'
        },
        "Master's Degree": {
          type: 'Student Visa (National Visa)',
          requirements: [
            'Valid passport with 12+ months validity',
            'University admission letter',
            'Bachelor\'s degree certificates',
            'Proof of financial resources (€10,236/year)',
            'Health insurance coverage',
            'Academic transcripts',
            'IELTS/TOEFL or German language certificate',
            'Statement of Purpose',
            'CV with work experience',
            'Passport photos (biometric)'
          ],
          processing_time: '4-8 weeks'
        },
        'PhD': {
          type: 'Student/Research Visa',
          requirements: [
            'Valid passport with 12+ months validity',
            'PhD admission/acceptance letter',
            'Master\'s degree certificates',
            'Research proposal',
            'Proof of financial resources',
            'Health insurance coverage',
            'Academic transcripts',
            'Language certificates',
            'Supervisor confirmation letter',
            'CV with research experience'
          ],
          processing_time: '6-10 weeks'
        }
      },
      'EU Citizen': {
        "Bachelor's Degree": {
          type: 'No Visa Required',
          requirements: [
            'Valid EU ID/Passport',
            'University enrollment confirmation',
            'Health insurance (EHIC or private)',
            'Proof of accommodation'
          ],
          processing_time: 'No processing needed'
        },
        "Master's Degree": {
          type: 'No Visa Required',
          requirements: [
            'Valid EU ID/Passport',
            'University enrollment confirmation',
            'Bachelor\'s degree certificate',
            'Health insurance (EHIC or private)'
          ],
          processing_time: 'No processing needed'
        }
      },
      'Other': {
        "Bachelor's Degree": {
          type: 'Student Visa (Check Embassy)',
          requirements: [
            'Valid passport',
            'University admission letter',
            'Proof of financial resources',
            'Health insurance',
            'Academic documents',
            'Language certificates',
            'Biometric photos',
            'Embassy-specific requirements'
          ],
          processing_time: '4-12 weeks'
        }
      }
    }
    
    const nationalityData = visaData[nationality] || visaData['Other']
    const purposeData = nationalityData[studyPurpose] || nationalityData["Bachelor's Degree"]
    
    setVisaRequirements(purposeData)
  }
  
  // Document Checklist Generator Function
  const generateDocumentChecklist = () => {
    let documents: string[] = []
    
    // Common documents for all
    documents.push(
      'Valid passport (12+ months validity)',
      'Passport-sized photographs (biometric)',
      'University application form',
      'Academic transcripts and certificates'
    )
    
    // Level-specific documents
    if (applicationLevel === "Bachelor's") {
      documents.push(
        'High school diploma/12th grade certificate',
        'High school transcripts',
        'Entrance exam scores (if applicable)'
      )
    } else if (applicationLevel === "Master's") {
      documents.push(
        "Bachelor's degree certificate",
        'University transcripts',
        'Academic recommendation letters (2-3)',
        'Statement of Purpose/Motivation letter'
      )
      
      if (hasWorkExperience) {
        documents.push(
          'CV/Resume with work experience',
          'Employment certificates',
          'Professional recommendation letters'
        )
      }
    } else if (applicationLevel === 'PhD') {
      documents.push(
        "Master's degree certificate",
        'Research proposal',
        'Academic recommendation letters (3-4)',
        'Publications list (if any)',
        'Supervisor acceptance letter'
      )
    }
    
    // International student specific
    if (studentType === 'International') {
      documents.push(
        'English proficiency certificate (IELTS/TOEFL)',
        'German language certificate (if required)',
        'Proof of financial resources',
        'Health insurance confirmation',
        'Visa application documents',
        'Apostilled/attested documents',
        'Translation of documents (German/English)'
      )
    }
    
    // Additional documents
    documents.push(
      'Accommodation proof/arrangement',
      'Medical certificate',
      'Police clearance certificate',
      'Application fee payment receipt'
    )
    
    setDocumentChecklist(documents)
  }

  const openModal = (serviceName: string) => {
    setSelectedService(serviceName)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedService('')
    setPhoneNumber('')
    setName('')
    setIsSubmitting(false)
  }

  const openToolModal = (toolName: string) => {
    setActiveToolModal(toolName)
  }

  const closeToolModal = () => {
    setActiveToolModal(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phoneNumber.trim() || !name.trim()) return
    
    setIsSubmitting(true)
    
    try {
      const success = await submitGDPIPackage(
        name.trim(),
        phoneNumber.trim(),
        `Germany Study Abroad - ${selectedService}`
      )

      if (success) {
        alert(`Thank you ${name}! Our consultant will contact you at ${phoneNumber} regarding ${selectedService} for studying in Germany.`)
        closeModal()
      } else {
        throw new Error('Failed to submit form')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Sorry, there was an error submitting your request. Please try again.')
      setIsSubmitting(false)
    }
  }

  const benefits = [
    {
      icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
      title: "World-Class Education",
      description: "Germany hosts 48 universities in QS World Rankings 2025, with tuition-free education at public universities."
    },
    {
      icon: <DollarSign className="w-8 h-8 text-blue-600" />,
      title: "Affordable Education",
      description: "Study for FREE at public universities! Only €250-350 semester fee. Low cost of living compared to other European countries."
    },
    {
      icon: <Briefcase className="w-8 h-8 text-blue-600" />,
      title: "Excellent Career Prospects",
      description: "18-month post-study work visa. 92% student visa approval rate. Strong job market with €12.82/hour minimum wage."
    },
    {
      icon: <Languages className="w-8 h-8 text-blue-600" />,
      title: "English-Taught Programs",
      description: "1,500+ English-taught programs available. Study without learning German initially. 250+ bachelor's programs in English."
    },
    {
      icon: <Plane className="w-8 h-8 text-blue-600" />,
      title: "European Gateway",
      description: "Student visa gives access to 26 Schengen countries. Explore Europe during weekends and breaks."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Safe & Welcoming",
      description: "High standard of living and safety. Multicultural environment with excellent student support services."
    }
  ]

  const topUniversities = [
    {
      name: "Technical University of Munich (TUM)",
      ranking: "#28",
      worldRank: "QS World Ranking 2025",
      location: "Munich, Bavaria",
      students: "52,931",
      intlStudents: "45%",
      programs: "Engineering, Technology, Natural Sciences",
      tuition: "Free (€144 semester fee)",
      image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=250&fit=crop"
    },
    {
      name: "Ludwig Maximilian University Munich (LMU)",
      ranking: "#54",
      worldRank: "QS World Ranking 2025",
      location: "Munich, Bavaria",
      students: "52,000",
      intlStudents: "20.9%",
      programs: "Medicine, Law, Business, Sciences",
      tuition: "Free (€144 semester fee)",
      image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=250&fit=crop"
    },
    {
      name: "University of Heidelberg",
      ranking: "#71",
      worldRank: "Global Employability Ranking",
      location: "Heidelberg, Baden-Württemberg",
      students: "30,000",
      intlStudents: "20%",
      programs: "Medicine, Sciences, Humanities",
      tuition: "Free (€171 semester fee)",
      image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=400&h=250&fit=crop"
    },
    {
      name: "Humboldt University of Berlin",
      ranking: "#87",
      worldRank: "QS World Ranking 2025",
      location: "Berlin",
      students: "35,000",
      intlStudents: "22%",
      programs: "Humanities, Social Sciences, Natural Sciences",
      tuition: "Free (€315 semester fee)",
      image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=400&h=250&fit=crop"
    },
    {
      name: "Free University of Berlin",
      ranking: "#98",
      worldRank: "QS World Ranking 2025",
      location: "Berlin",
      students: "37,000",
      intlStudents: "23%",
      programs: "Political Science, International Relations, Sciences",
      tuition: "Free (€311 semester fee)",
      image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=400&h=250&fit=crop"
    },
    {
      name: "Technical University of Berlin",
      ranking: "#145",
      worldRank: "QS World Ranking 2025",
      location: "Berlin",
      students: "34,000",
      intlStudents: "30%",
      programs: "Engineering, Computer Science, Architecture",
      tuition: "Free (€307 semester fee)",
      image: "https://images.unsplash.com/photo-1587330979470-3595ac045ab0?w=400&h=250&fit=crop"
    },
    {
      name: "RWTH Aachen University",
      ranking: "#147",
      worldRank: "QS World Ranking 2025",
      location: "Aachen, North Rhine-Westphalia",
      students: "47,000",
      intlStudents: "24%",
      programs: "Engineering, Technology, Natural Sciences",
      tuition: "Free (€300 semester fee)",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop"
    },
    {
      name: "University of Freiburg",
      ranking: "#172",
      worldRank: "QS World Ranking 2025",
      location: "Freiburg, Baden-Württemberg",
      students: "25,000",
      intlStudents: "18%",
      programs: "Liberal Arts, Sciences, Medicine",
      tuition: "Free (€161 semester fee)",
      image: "https://images.unsplash.com/photo-1607734834519-d8576ae60ea6?w=400&h=250&fit=crop"
    },
    {
      name: "Karlsruhe Institute of Technology (KIT)",
      ranking: "#180",
      worldRank: "QS World Ranking 2025",
      location: "Karlsruhe, Baden-Württemberg",
      students: "25,000",
      intlStudents: "26%",
      programs: "Engineering, Computer Science, Natural Sciences",
      tuition: "Free (€154 semester fee)",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=250&fit=crop"
    },
    {
      name: "University of Hamburg",
      ranking: "#189",
      worldRank: "QS World Ranking 2025",
      location: "Hamburg",
      students: "43,000",
      intlStudents: "13%",
      programs: "Business, Law, Medicine, Sciences",
      tuition: "Free (€335 semester fee)",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop"
    },
    {
      name: "University of Tübingen",
      ranking: "#195",
      worldRank: "QS World Ranking 2025",
      location: "Tübingen, Baden-Württemberg",
      students: "28,000",
      intlStudents: "13%",
      programs: "Theology, Medicine, Law, Humanities",
      tuition: "Free (€160 semester fee)",
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=250&fit=crop"
    },
    {
      name: "University of Bonn",
      ranking: "#201",
      worldRank: "QS World Ranking 2025",
      location: "Bonn, North Rhine-Westphalia",
      students: "38,000",
      intlStudents: "16%",
      programs: "Mathematics, Economics, Natural Sciences",
      tuition: "Free (€321 semester fee)",
      image: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=400&h=250&fit=crop"
    }
  ]

  const admitVerseServices = [
    {
      icon: <User className="w-6 h-6 text-white" />,
      title: "Profile Evaluation",
      description: "Comprehensive assessment of your academic profile, identifying strengths and areas for improvement.",
      features: ["Academic Background Analysis", "Skill Gap Assessment", "University Shortlisting", "Improvement Roadmap"]
    },
    {
      icon: <FileText className="w-6 h-6 text-white" />,
      title: "Application Assistance",
      description: "End-to-end support for university applications, ensuring maximum success rate.",
      features: ["SOP Writing Support", "LOR Guidance", "Document Preparation", "Application Review"]
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-white" />,
      title: "Visa Guidance", 
      description: "Expert assistance with German student visa process and documentation.",
      features: ["Visa Documentation", "Interview Preparation", "Embassy Guidance", "Success Rate: 95%"]
    },
    {
      icon: <Languages className="w-6 h-6 text-white" />,
      title: "Language Preparation",
      description: "IELTS/TOEFL preparation and German language training support.",
      features: ["IELTS Coaching", "German Language Basics", "Test Prep Materials", "Mock Tests"]
    },
    {
      icon: <Calculator className="w-6 h-6 text-white" />,
      title: "Financial Planning",
      description: "Scholarship guidance and financial planning for your German education.",
      features: ["Scholarship Applications", "Education Loan Guidance", "Budget Planning", "Cost Estimation"]
    },
    {
      icon: <Globe className="w-6 h-6 text-white" />,
      title: "Pre-Departure Support",
      description: "Complete preparation for your journey to Germany including accommodation.",
      features: ["Accommodation Assistance", "Travel Planning", "Cultural Orientation", "Airport Assistance"]
    }
  ]

  const faqs = [
    {
      question: "Is IELTS required to study in Germany?",
      answer: "For English-taught programs, IELTS is typically required with scores of 6.0-6.5 for undergraduate and 6.5-7.0 for postgraduate programs. However, many universities accept TOEFL, and some accept Medium of Instruction (MOI) certificates. Over 250 bachelor's programs and 1,500+ programs overall are taught in English without requiring German language proficiency."
    },
    {
      question: "How much does it cost to study in Germany?",
      answer: "Public universities in Germany offer tuition-free education! You only need to pay a semester contribution of €250-350. Private universities charge €10,000-20,000 per year. Living costs are approximately €800-1,200 per month depending on the city. Munich and Frankfurt are more expensive, while smaller cities are very affordable."
    },
    {
      question: "Can I work while studying in Germany?",
      answer: "Yes! International students can work up to 20 hours per week during studies and full-time during semester breaks. The minimum wage is €12.82 per hour. You can work up to 120 full days or 240 half days per year before needing a work permit. After graduation, you get an 18-month job search visa."
    },
    {
      question: "What are the admission requirements for German universities?",
      answer: "Requirements include: Academic transcripts with minimum 2.5 GPA, English proficiency test (IELTS 6.0+/TOEFL), Statement of Purpose, Letters of Recommendation, and specific program prerequisites. Some programs may require GRE/GMAT scores. Requirements vary by university and program level."
    },
    {
      question: "How long does the German student visa process take?",
      answer: "The German student visa process typically takes 6-8 weeks. The success rate is excellent at 92-95%. You need to show proof of financial resources (€11,208 per year), admission letter, language proficiency, and other documents. Visa fees are €75 (€37.50 for under 18)."
    },
    {
      question: "Which cities in Germany are best for international students?",
      answer: "Top student cities include Berlin (multicultural, affordable), Munich (high-quality universities, tech hub), Hamburg (maritime culture, media), Frankfurt (financial center), and Dresden (affordable, beautiful). Each offers unique advantages in terms of culture, cost of living, and career opportunities."
    },
    {
      question: "Can I stay in Germany after completing my studies?",
      answer: "Yes! Germany offers an 18-month post-study work visa for job searching. Once you find employment, you can apply for a work permit. After 2-3 years of work experience, you can apply for permanent residence. 69.2% of international students plan to stay in Germany after graduation."
    },
    {
      question: "Do I need to learn German to study in Germany?",
      answer: "Not necessarily! There are 1,500+ English-taught programs available. However, learning basic German will help with daily life and increase job opportunities. For German-taught programs, you need B2 level German proficiency (TestDaF, DSH, or Goethe certificates)."
    },
    {
      question: "What are the best courses to study in Germany?",
      answer: "Germany excels in Engineering, Computer Science, Business, Medicine, Natural Sciences, and Automotive Technology. Popular programs include Mechanical Engineering, Data Science, International Business, Medicine, and Renewable Energy. German universities are world-renowned for research and practical learning."
    },
    {
      question: "How do I find accommodation in Germany as a student?",
      answer: "Options include university dormitories (€200-400/month), shared apartments (WG - €300-600/month), or private studios (€400-800/month). Apply early for dorms as they're limited. Many students use platforms like WG-Gesucht, Studenten-WG, or university housing services."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBanner />
      <Navigation />
      <FloatingActions />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <div className="text-[20rem] font-bold">🇩🇪</div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Study in <span className="text-yellow-400">Germany Public</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              World-Class Education • Tuition-Free Universities • Excellent Career Prospects
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">🆓 Free Education at Public Universities</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">📈 92% Visa Success Rate</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">🌍 Access to 26 Schengen Countries</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openModal('Free Germany Study Consultation')}
              className="bg-white hover:bg-gray-100 text-blue-700 px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-200"
            >
              Get Free Germany Study Consultation
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                <AnimatedCounter value="48" />
              </div>
              <p className="text-gray-600">Universities in QS Rankings</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                <AnimatedCounter value="1500" />+
              </div>
              <p className="text-gray-600">English-Taught Programs</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                <AnimatedCounter value="100000" />+
              </div>
              <p className="text-gray-600">International Students</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                <AnimatedCounter value="18" />
              </div>
              <p className="text-gray-600">Months Post-Study Visa</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Study in Germany Public */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="text-blue-600">Germany Public</span> for Your Studies?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover why Germany is the top destination for international students worldwide
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="mb-6">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Universities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Top German <span className="text-blue-600">Public Universities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Explore world-renowned universities with exceptional international student support
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search universities by name, location, or programs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Universities List View */}
          <div className="space-y-4">
            {(() => {
              const filteredUniversities = topUniversities.filter(university => 
                university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                university.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                university.programs.toLowerCase().includes(searchQuery.toLowerCase())
              );
              
              const displayedUniversities = showAllUniversities || searchQuery 
                ? filteredUniversities 
                : filteredUniversities.slice(0, 3);
              
              return displayedUniversities.map((university, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* University Image */}
                    <div className="md:w-48 h-32 md:h-40">
                      <img 
                        src={university.image} 
                        alt={university.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* University Details - More Compact */}
                    <div className="flex-1 p-4 md:p-5">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                        <div>
                          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">{university.name}</h3>
                          <div className="flex items-center text-gray-600 text-sm">
                            <MapPin className="w-4 h-4 mr-1 text-blue-600" />
                            <span>{university.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mt-2 md:mt-0">
                          <span className="text-2xl font-bold text-blue-600">{university.ranking}</span>
                          <span className="text-xs text-gray-500">{university.worldRank}</span>
                        </div>
                      </div>
                      
                      {/* Compact Stats */}
                      <div className="flex flex-wrap gap-4 mb-3 text-sm">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1 text-gray-400" />
                          <span className="text-gray-700">{university.students} students</span>
                        </div>
                        <div className="flex items-center">
                          <Globe className="w-4 h-4 mr-1 text-gray-400" />
                          <span className="text-gray-700">{university.intlStudents} international</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1 text-green-500" />
                          <span className="text-green-600 font-semibold">{university.tuition}</span>
                        </div>
                      </div>
                      
                      {/* Programs - Compact */}
                      <div className="mb-3">
                        <span className="text-xs text-gray-500">Programs: </span>
                        <span className="text-sm text-gray-700">{university.programs}</span>
                      </div>
                      
                      {/* Action Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => openModal(`${university.name} - Admission Consultation`)}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                      >
                        Get Admission Guidance
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ));
            })()}
          </div>
          
          {/* Show More/Less Button */}
          {!searchQuery && topUniversities.length > 3 && (
            <div className="text-center mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAllUniversities(!showAllUniversities)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center"
              >
                {showAllUniversities ? (
                  <>
                    Show Less
                    <ChevronDown className="w-5 h-5 ml-2 rotate-180" />
                  </>
                ) : (
                  <>
                    Show More Universities ({topUniversities.length - 3} more)
                    <ChevronDown className="w-5 h-5 ml-2" />
                  </>
                )}
              </motion.button>
            </div>
          )}
          
          {/* No Results Message */}
          {topUniversities.filter(university => 
            university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            university.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            university.programs.toLowerCase().includes(searchQuery.toLowerCase())
          ).length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No universities found matching your search criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* AdmitVerse Services - Compact Design */}
      <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs font-semibold mb-3">
              🎯 Your Success Partner
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
              How <span className="text-blue-600">AdmitVerse</span> Helps You
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete support for your Germany study journey
            </p>
          </motion.div>

          {/* Compact Services Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {admitVerseServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-white">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.slice(0, 2).map((feature, idx) => (
                    <li key={idx} className="flex items-start text-xs text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Single CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openModal('Complete Germany Application Package')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started Now →
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Interactive Tools Section - Compact Design */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🛠️ Smart Tools
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Interactive <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Planning Tools</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Click on any tool below to get instant calculations and personalized insights
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Cost Calculator Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              onClick={() => openToolModal('cost-calculator')}
              className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Cost Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate study & living costs</p>
                </div>
              </div>
              <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
                <span>Click to calculate</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </motion.div>

            {/* Eligibility Checker Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              onClick={() => openToolModal('eligibility-checker')}
              className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Eligibility Checker</h3>
                  <p className="text-sm text-gray-600">Check university eligibility</p>
                </div>
              </div>
              <div className="flex items-center text-green-600 text-sm font-medium group-hover:text-green-700">
                <span>Check eligibility</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </motion.div>

            {/* University Finder Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              onClick={() => openToolModal('university-finder')}
              className="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-4">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">University Finder</h3>
                  <p className="text-sm text-gray-600">Find perfect university match</p>
                </div>
              </div>
              <div className="flex items-center text-purple-600 text-sm font-medium group-hover:text-purple-700">
                <span>Find universities</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </motion.div>

            {/* IELTS Score Predictor Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              onClick={() => openToolModal('ielts-predictor')}
              className="group bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">IELTS Predictor</h3>
                  <p className="text-sm text-gray-600">Calculate your band score</p>
                </div>
              </div>
              <div className="flex items-center text-orange-600 text-sm font-medium group-hover:text-orange-700">
                <span>Predict score</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </motion.div>

            {/* Visa Requirements Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              onClick={() => openToolModal('visa-checker')}
              className="group bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Visa Requirements</h3>
                  <p className="text-sm text-gray-600">Check visa requirements</p>
                </div>
              </div>
              <div className="flex items-center text-cyan-600 text-sm font-medium group-hover:text-cyan-700">
                <span>Check visa</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </motion.div>

            {/* Document Checklist Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              onClick={() => openToolModal('document-checklist')}
              className="group bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mr-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Document Checklist</h3>
                  <p className="text-sm text-gray-600">Get personalized checklist</p>
                </div>
              </div>
              <div className="flex items-center text-emerald-600 text-sm font-medium group-hover:text-emerald-700">
                <span>Generate list</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </motion.div>
          </div>

          {/* Tools CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Need Personalized Guidance?</h3>
              <p className="text-blue-100 mb-4">Get expert consultation for your Germany study journey</p>
              <button 
                onClick={() => openModal('Personalized Germany Consultation')}
                className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
              >
                Book Expert Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              ❓ Got Questions?
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to the most common questions about studying in Germany
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-blue-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-5 text-left bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 flex items-center justify-between group"
                >
                  <span className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">{faq.question}</span>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                      {expandedFaq === index ? 
                        <ChevronDown className="w-4 h-4 text-white" /> : 
                        <ChevronRight className="w-4 h-4 text-white" />
                      }
                    </div>
                  </div>
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-5 bg-white text-gray-700 leading-relaxed border-l-4 border-blue-400 ml-2">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* FAQ CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="bg-white border border-blue-200 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
              <p className="text-gray-600 mb-6">Our expert counselors are here to help with personalized guidance</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openModal('FAQ Consultation')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Schedule Free Consultation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your <span className="text-yellow-400">German</span> Journey?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of successful students who chose Germany for their higher education. 
              Get personalized guidance from our expert counselors.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openModal('Complete Germany Study Package')}
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-200"
            >
              Book Free Consultation
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Tool Modals */}
      <AnimatePresence>
        {activeToolModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  {activeToolModal === 'cost-calculator' && 'Cost Calculator'}
                  {activeToolModal === 'eligibility-checker' && 'Eligibility Checker'}
                  {activeToolModal === 'university-finder' && 'University Finder'}
                  {activeToolModal === 'ielts-predictor' && 'IELTS Score Predictor'}
                  {activeToolModal === 'visa-checker' && 'Visa Requirements Checker'}
                  {activeToolModal === 'document-checklist' && 'Document Checklist Generator'}
                </h3>
                <button 
                  onClick={closeToolModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                {/* Cost Calculator Modal Content */}
                {activeToolModal === 'cost-calculator' && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Calculator className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-gray-600">Calculate your total study and living expenses in Germany</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Study Duration</label>
                        <select 
                          value={studyDuration}
                          onChange={(e) => setStudyDuration(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="1">1 Year</option>
                          <option value="2">2 Years</option>
                          <option value="3">3 Years</option>
                          <option value="4">4 Years</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                        <select 
                          value={selectedCity}
                          onChange={(e) => setSelectedCity(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Berlin">Berlin</option>
                          <option value="Munich">Munich</option>
                          <option value="Hamburg">Hamburg</option>
                          <option value="Dresden">Dresden</option>
                          <option value="Frankfurt">Frankfurt</option>
                        </select>
                      </div>
                      <div className="bg-blue-100 rounded-lg p-4">
                        <div className="text-sm text-blue-700 font-medium">Estimated Total Cost</div>
                        <div className="text-3xl font-bold text-blue-900">€{costEstimate.min.toLocaleString()} - €{costEstimate.max.toLocaleString()}</div>
                        <div className="text-sm text-blue-600">For {studyDuration} year{parseInt(studyDuration) > 1 ? 's' : ''} (including living expenses)</div>
                      </div>
                      <button 
                        onClick={calculateCost}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                      >
                        Calculate Cost
                      </button>
                    </div>
                  </div>
                )}

                {/* Eligibility Checker Modal Content */}
                {activeToolModal === 'eligibility-checker' && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-gray-600">Check if you qualify for German universities</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Academic Level</label>
                        <select 
                          value={academicLevel}
                          onChange={(e) => setAcademicLevel(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="Bachelor's">Bachelor's</option>
                          <option value="Master's">Master's</option>
                          <option value="PhD">PhD</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">GPA/Percentage</label>
                        <input 
                          type="number" 
                          value={gpaScore}
                          onChange={(e) => setGpaScore(e.target.value)}
                          placeholder="Enter your GPA (4.0) or % (100)"
                          min="0"
                          max="100"
                          step="0.1"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">English Test</label>
                        <select 
                          value={englishTest}
                          onChange={(e) => setEnglishTest(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="IELTS 6.0+">IELTS 6.0+</option>
                          <option value="IELTS 6.5+">IELTS 6.5+</option>
                          <option value="IELTS 7.0+">IELTS 7.0+</option>
                          <option value="TOEFL 80+">TOEFL 80+</option>
                          <option value="TOEFL 90+">TOEFL 90+</option>
                          <option value="No Test Yet">No Test Yet</option>
                        </select>
                      </div>
                      {eligibilityResult.percentage > 0 && (
                        <div className={`${eligibilityResult.eligible ? 'bg-green-100' : 'bg-red-100'} rounded-lg p-4`}>
                          <div className="flex items-center">
                            <CheckCircle className={`w-5 h-5 ${eligibilityResult.eligible ? 'text-green-600' : 'text-red-600'} mr-2`} />
                            <span className={`${eligibilityResult.eligible ? 'text-green-800' : 'text-red-800'} font-semibold`}>
                              {eligibilityResult.percentage}% Match {eligibilityResult.eligible ? 'Found!' : 'Low'}
                            </span>
                          </div>
                          <div className={`text-sm ${eligibilityResult.eligible ? 'text-green-700' : 'text-red-700'} mt-1`}>
                            You're eligible for {eligibilityResult.universities}+ universities
                          </div>
                        </div>
                      )}
                      <button 
                        onClick={checkEligibility}
                        disabled={!gpaScore}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Check Eligibility
                      </button>
                    </div>
                  </div>
                )}

                {/* University Finder Modal Content */}
                {activeToolModal === 'university-finder' && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-gray-600">Find universities that match your preferences</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
                        <select 
                          value={fieldOfStudy}
                          onChange={(e) => setFieldOfStudy(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="Engineering">Engineering</option>
                          <option value="Business">Business</option>
                          <option value="Computer Science">Computer Science</option>
                          <option value="Medicine">Medicine</option>
                          <option value="Arts & Design">Arts & Design</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
                        <select 
                          value={preferredLanguage}
                          onChange={(e) => setPreferredLanguage(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="English">English</option>
                          <option value="German">German</option>
                          <option value="Both">Both</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                        <select 
                          value={budgetRange}
                          onChange={(e) => setBudgetRange(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="€0 - €500/semester">€0 - €500/semester</option>
                          <option value="€500 - €5,000/semester">€500 - €5,000/semester</option>
                          <option value="€5,000 - €15,000/semester">€5,000 - €15,000/semester</option>
                          <option value="€15,000+/semester">€15,000+/semester</option>
                        </select>
                      </div>
                      {matchedUniversities > 0 && (
                        <div className="bg-purple-100 rounded-lg p-4">
                          <div className="text-purple-800 font-semibold">{matchedUniversities} Universities Found</div>
                          <div className="text-sm text-purple-700">Including TUM, RWTH, Heidelberg</div>
                        </div>
                      )}
                      <button 
                        onClick={findUniversities}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                      >
                        Find Universities
                      </button>
                    </div>
                  </div>
                )}

                {/* IELTS Predictor Modal Content */}
                {activeToolModal === 'ielts-predictor' && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-gray-600">Calculate your overall IELTS band score</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Listening</label>
                          <input 
                            type="number" 
                            value={listeningScore}
                            onChange={(e) => setListeningScore(e.target.value)}
                            placeholder="0.0 - 9.0"
                            min="0"
                            max="9"
                            step="0.5"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Reading</label>
                          <input 
                            type="number" 
                            value={readingScore}
                            onChange={(e) => setReadingScore(e.target.value)}
                            placeholder="0.0 - 9.0"
                            min="0"
                            max="9"
                            step="0.5"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Writing</label>
                          <input 
                            type="number" 
                            value={writingScore}
                            onChange={(e) => setWritingScore(e.target.value)}
                            placeholder="0.0 - 9.0"
                            min="0"
                            max="9"
                            step="0.5"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Speaking</label>
                          <input 
                            type="number" 
                            value={speakingScore}
                            onChange={(e) => setSpeakingScore(e.target.value)}
                            placeholder="0.0 - 9.0"
                            min="0"
                            max="9"
                            step="0.5"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      {predictedBand > 0 && (
                        <div className="bg-orange-100 rounded-lg p-4 text-center">
                          <div className="text-orange-800 font-semibold">Overall Band Score</div>
                          <div className="text-4xl font-bold text-orange-900 my-2">{predictedBand}</div>
                          <div className="text-sm text-orange-700">
                            {predictedBand >= 7.0 ? 'Excellent for German universities!' : 
                             predictedBand >= 6.5 ? 'Good for most German universities' :
                             predictedBand >= 6.0 ? 'Meets minimum requirements' : 
                             'May need improvement for German universities'}
                          </div>
                        </div>
                      )}
                      <button 
                        onClick={predictIELTSBand}
                        disabled={!listeningScore || !readingScore || !writingScore || !speakingScore}
                        className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Calculate Band Score
                      </button>
                    </div>
                  </div>
                )}

                {/* Visa Checker Modal Content */}
                {activeToolModal === 'visa-checker' && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Plane className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-gray-600">Check what visa requirements apply to your situation</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Nationality</label>
                        <select 
                          value={nationality}
                          onChange={(e) => setNationality(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        >
                          <option value="Indian">Indian</option>
                          <option value="EU Citizen">EU Citizen</option>
                          <option value="Other">Other (Non-EU)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Study Purpose</label>
                        <select 
                          value={studyPurpose}
                          onChange={(e) => setStudyPurpose(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        >
                          <option value="Bachelor's Degree">Bachelor's Degree</option>
                          <option value="Master's Degree">Master's Degree</option>
                          <option value="PhD">PhD</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Study Duration</label>
                        <select 
                          value={studyDurationVisa}
                          onChange={(e) => setStudyDurationVisa(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        >
                          <option value="6 months">6 months</option>
                          <option value="1 year">1 year</option>
                          <option value="2 years">2 years</option>
                          <option value="3+ years">3+ years</option>
                        </select>
                      </div>
                      {visaRequirements.type && (
                        <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                          <div className="text-cyan-800 font-semibold text-lg mb-2">{visaRequirements.type}</div>
                          <div className="text-sm text-cyan-700 mb-3">Processing Time: {visaRequirements.processing_time}</div>
                          <div className="text-sm text-gray-700">
                            <div className="font-medium mb-2">Required Documents:</div>
                            <ul className="list-disc list-inside space-y-1">
                              {visaRequirements.requirements.slice(0, 5).map((req, index) => (
                                <li key={index}>{req}</li>
                              ))}
                              {visaRequirements.requirements.length > 5 && (
                                <li>... and {visaRequirements.requirements.length - 5} more documents</li>
                              )}
                            </ul>
                          </div>
                        </div>
                      )}
                      <button 
                        onClick={checkVisaRequirements}
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all duration-200"
                      >
                        Check Requirements
                      </button>
                    </div>
                  </div>
                )}

                {/* Document Checklist Modal Content */}
                {activeToolModal === 'document-checklist' && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-gray-600">Get personalized document checklist for your application</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Student Type</label>
                        <select 
                          value={studentType}
                          onChange={(e) => setStudentType(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        >
                          <option value="International">International Student</option>
                          <option value="EU">EU Student</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Application Level</label>
                        <select 
                          value={applicationLevel}
                          onChange={(e) => setApplicationLevel(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        >
                          <option value="Bachelor's">Bachelor's</option>
                          <option value="Master's">Master's</option>
                          <option value="PhD">PhD</option>
                        </select>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="workExperience"
                          checked={hasWorkExperience}
                          onChange={(e) => setHasWorkExperience(e.target.checked)}
                          className="mr-3 w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        />
                        <label htmlFor="workExperience" className="text-sm font-medium text-gray-700">
                          I have work experience
                        </label>
                      </div>
                      {documentChecklist.length > 0 && (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 max-h-60 overflow-y-auto">
                          <div className="text-emerald-800 font-semibold mb-3">{documentChecklist.length} Documents Required</div>
                          <ul className="text-sm text-emerald-700 space-y-2">
                            {documentChecklist.map((doc, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span>{doc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <button 
                        onClick={generateDocumentChecklist}
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-200"
                      >
                        Generate Checklist
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Consultation Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl max-w-md w-full p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Get Expert Consultation</h3>
                  <p className="text-sm text-gray-600">{selectedService}</p>
                </div>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Get Free Consultation'}
                </motion.button>
              </form>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Our consultant will contact you within 24 hours to discuss your Germany study plans.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}