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
  const [showAllUniversities, setShowAllUniversities] = useState(false)

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
              Study in <span className="text-yellow-400">Germany</span>
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
              Why Choose <span className="text-blue-600">Germany</span> for Your Studies?
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
              Top German <span className="text-blue-600">Universities</span>
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

      {/* AdmitVerse Services - Modern Design */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🎯 Your Success Partner
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 bg-clip-text text-transparent">
              How <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">AdmitVerse</span> Transforms Your Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience personalized guidance and comprehensive support designed to make your Germany study abroad dreams a reality
            </p>
          </motion.div>

          {/* Enhanced Services Grid */}
          <div className="space-y-12">
            {admitVerseServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-16`}
              >
                {/* Content Side */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <div className="text-white text-2xl">
                        {service.icon}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Step {index + 1}</span>
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">{service.title}</h3>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-600 leading-relaxed">{service.description}</p>
                  
                  {/* Enhanced Features List */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    {service.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openModal(service.title)}
                    className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Get Started Now
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.div>
                  </motion.button>
                </div>

                {/* Visual Side */}
                <div className="flex-1 max-w-lg">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    {/* Card Container */}
                    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 overflow-hidden">
                      {/* Background Pattern */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -translate-y-16 translate-x-16 opacity-60"></div>
                      
                      {/* Icon Display */}
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                          <div className="text-white text-3xl">
                            {service.icon}
                          </div>
                        </div>
                        
                        {/* Stats or Highlights */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <span className="text-gray-600 font-medium">Success Rate</span>
                            <span className="text-2xl font-bold text-green-600">98%</span>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <span className="text-gray-600 font-medium">Processing Time</span>
                            <span className="text-2xl font-bold text-blue-600">2-4 weeks</span>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <span className="text-gray-600 font-medium">Expert Support</span>
                            <span className="text-2xl font-bold text-purple-600">24/7</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating Elements */}
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 5, 0]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 3,
                        ease: "easeInOut"
                      }}
                      className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg"
                    >
                      <span className="text-2xl">✨</span>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-600/90"></div>
              <div className="relative">
                <h3 className="text-3xl font-bold mb-4">Ready to Start Your Germany Journey?</h3>
                <p className="text-xl text-blue-100 mb-8">Join thousands of successful students who chose AdmitVerse</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal('Complete Germany Application Package')}
                  className="bg-white text-blue-600 px-12 py-4 rounded-xl font-bold text-xl hover:bg-gray-50 transition-colors duration-200 shadow-lg"
                >
                  Book Your Free Consultation
                </motion.button>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
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