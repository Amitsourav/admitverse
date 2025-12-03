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
      icon: <GraduationCap className="w-8 h-8 text-red-600" />,
      title: "World-Class Education",
      description: "Germany hosts 48 universities in QS World Rankings 2025, with tuition-free education at public universities."
    },
    {
      icon: <DollarSign className="w-8 h-8 text-red-600" />,
      title: "Affordable Education",
      description: "Study for FREE at public universities! Only €250-350 semester fee. Low cost of living compared to other European countries."
    },
    {
      icon: <Briefcase className="w-8 h-8 text-red-600" />,
      title: "Excellent Career Prospects",
      description: "18-month post-study work visa. 92% student visa approval rate. Strong job market with €12.82/hour minimum wage."
    },
    {
      icon: <Languages className="w-8 h-8 text-red-600" />,
      title: "English-Taught Programs",
      description: "1,500+ English-taught programs available. Study without learning German initially. 250+ bachelor's programs in English."
    },
    {
      icon: <Plane className="w-8 h-8 text-red-600" />,
      title: "European Gateway",
      description: "Student visa gives access to 26 Schengen countries. Explore Europe during weekends and breaks."
    },
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
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
      <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-black text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
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
              Study in <span className="text-yellow-400">Germany</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
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
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-200"
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
              <div className="text-4xl font-bold text-red-600 mb-2">
                <AnimatedCounter value="48" />
              </div>
              <p className="text-gray-600">Universities in QS Rankings</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">
                <AnimatedCounter value="1500" />+
              </div>
              <p className="text-gray-600">English-Taught Programs</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">
                <AnimatedCounter value="100000" />+
              </div>
              <p className="text-gray-600">International Students</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">
                <AnimatedCounter value="18" />
              </div>
              <p className="text-gray-600">Months Post-Study Visa</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Study in Germany */}
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
              Why Choose <span className="text-red-600">Germany</span> for Your Studies?
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
              Top German <span className="text-red-600">Universities</span>
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
                  className="w-full px-6 py-4 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 placeholder-gray-500"
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
          <div className="space-y-6">
            {topUniversities
              .filter(university => 
                university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                university.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                university.programs.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((university, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* University Image */}
                  <div className="lg:w-1/3 h-48 lg:h-auto">
                    <img 
                      src={university.image} 
                      alt={university.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* University Details */}
                  <div className="flex-1 p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{university.name}</h3>
                        <div className="flex items-center text-gray-600 mb-3">
                          <MapPin className="w-5 h-5 mr-2 text-red-600" />
                          <span>{university.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-3xl font-bold text-red-600">{university.ranking}</span>
                        <span className="text-sm text-gray-500">{university.worldRank}</span>
                      </div>
                    </div>
                    
                    {/* University Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-600 mb-1">Total Students</div>
                        <div className="text-lg font-semibold text-gray-900">{university.students}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-600 mb-1">International</div>
                        <div className="text-lg font-semibold text-gray-900">{university.intlStudents}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-600 mb-1">Tuition</div>
                        <div className="text-lg font-semibold text-green-600">{university.tuition}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-600 mb-1">Programs</div>
                        <div className="text-sm font-semibold text-gray-900 truncate" title={university.programs}>
                          {university.programs.split(',')[0]}...
                        </div>
                      </div>
                    </div>
                    
                    {/* Programs */}
                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-2">Popular Programs:</div>
                      <div className="text-sm text-gray-800">{university.programs}</div>
                    </div>
                    
                    {/* Action Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => openModal(`${university.name} - Admission Consultation`)}
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                    >
                      Get Admission Guidance
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
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

      {/* AdmitVerse Services */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-red-800 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How <span className="text-yellow-400">AdmitVerse</span> Helps You
            </h2>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Comprehensive support for your Germany study abroad journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {admitVerseServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-xl hover:bg-white/15 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-100 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal(service.title)}
                  className="w-full mt-6 bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Learn More
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked <span className="text-red-600">Questions</span>
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
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  {expandedFaq === index ? 
                    <ChevronDown className="w-5 h-5 text-gray-500" /> : 
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  }
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
                      <div className="px-6 py-4 bg-white text-gray-700 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-black text-white">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50"
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