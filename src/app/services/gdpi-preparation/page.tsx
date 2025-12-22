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
  ToggleLeft,
  ToggleRight,
  Grid,
  List,
  Book,
  Brain,
  Zap,
  Gift,
  Star,
  Percent,
  Quote,
  X,
  Phone,
  User
} from 'lucide-react'
import Link from 'next/link'
import { submitGDPIPackage } from '@/services/dataCollection'

export default function GDPIPreparationPage() {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  const [showModal, setShowModal] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Hero form state
  const [heroForm, setHeroForm] = useState({
    name: '',
    phone: '',
    email: ''
  })
  const [heroFormSubmitting, setHeroFormSubmitting] = useState(false)

  const openModal = (packageName: string) => {
    setSelectedPackage(packageName)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedPackage('')
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
        selectedPackage
      )

      if (success) {
        alert(`Thank you ${name}! Our consultant will contact you at ${phoneNumber} regarding the ${selectedPackage} package.`)
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

  const handleHeroFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!heroForm.name.trim() || !heroForm.phone.trim() || !heroForm.email.trim()) return
    
    setHeroFormSubmitting(true)
    
    try {
      // Import the data collection service
      const { submitHomepageForm } = await import('@/services/dataCollection')
      
      const success = await submitHomepageForm(
        heroForm.name.trim(),
        heroForm.email.trim(),
        heroForm.phone.trim(),
        `GDPI Hero Form Submission - Interested in GDPI Preparation consultation`
      )

      if (success) {
        alert(`Thank you ${heroForm.name}! Our consultant will contact you at ${heroForm.phone} regarding GDPI preparation.`)
        setHeroForm({ name: '', phone: '', email: '' })
      } else {
        throw new Error('Failed to submit form')
      }
    } catch (error) {
      console.error('Hero form submission error:', error)
      alert('Sorry, there was an error submitting your request. Please try again.')
    } finally {
      setHeroFormSubmitting(false)
    }
  }

  const testimonials = [
    {
      name: "Ashish",
      review: "It was really informative. Thanks for hosting such a wonderful session !!",
      rating: 5
    },
    {
      name: "Abhinav Bhargav", 
      review: "They are really supportive and help me to search a good college according to my budget thank you.",
      rating: 5
    },
    {
      name: "Devesh Agrawal",
      review: "It was a wonderful and insightful session.",
      rating: 5
    },
    {
      name: "Maitri Upadhyay",
      review: "Great session, Sir. Got a good idea on the preparation structure.",
      rating: 5
    },
    {
      name: "Abhishek Kumar",
      review: "Gave me a new perspective regarding how to tackle GDPI. Indeed a great session.",
      rating: 5
    },
    {
      name: "Sreerag",
      review: "Hey guys, hope you're all doing great. Thought of sharing a mock interview experience which I had today. She was very patient and gave me detailed explanations about interview process and probable questions. She explained how an interview would be and what the interviewers would be looking for. Gratitude towards the whole team.",
      rating: 5
    }
  ]

  const gdTopics = [
    "Current Affairs & Business News",
    "Economic & Political Issues",
    "Social Issues & Ethics",
    "Abstract Topics",
    "Case Studies",
    "Leadership & Team Dynamics"
  ]

  const piQuestions = [
    "Tell me about yourself",
    "Why MBA? Why now?",
    "Career goals & aspirations",
    "Strengths & weaknesses",
    "Leadership experiences",
    "Ethical dilemmas & decisions"
  ]

  const preparationModules = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Group Discussion",
      description: "Master the art of group discussions with practice sessions on diverse topics"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Personal Interview",
      description: "One-on-one mock interviews with detailed feedback and improvement areas"
    },
    {
      icon: <Presentation className="w-6 h-6" />,
      title: "WAT Preparation",
      description: "Written Ability Test practice with essay writing techniques and time management"
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "Mock Sessions",
      description: "Realistic mock GD-PI sessions with experienced mentors and peer groups"
    }
  ]

  const institutions = [
    { name: "IIMs", description: "All Indian Institutes of Management" },
    { name: "ISB", description: "Indian School of Business" },
    { name: "XLRI", description: "Xavier School of Management" },
    { name: "FMS", description: "Faculty of Management Studies" },
    { name: "MDI", description: "Management Development Institute" },
    { name: "SPJIMR", description: "S.P. Jain Institute" }
  ]

  const sessionStructure = [
    {
      week: "Week 1-2",
      focus: "Foundation & Basics",
      activities: ["Communication skills", "Current affairs", "Self-introduction"]
    },
    {
      week: "Week 3-4",
      focus: "GD Techniques",
      activities: ["Topic analysis", "Point articulation", "Group dynamics"]
    },
    {
      week: "Week 5-6",
      focus: "PI Preparation",
      activities: ["Mock interviews", "Body language", "Stress interviews"]
    },
    {
      week: "Week 7-8",
      focus: "Final Practice",
      activities: ["Full mock sessions", "Feedback implementation", "Confidence building"]
    }
  ]

  return (
    <>
      <TopBanner />
      <Navigation />
      <FloatingActions />
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        {[8, 22, 36, 50, 64, 78, 92, 16, 30, 44, 58, 72, 86, 14, 28, 42, 56, 70, 84, 98].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            style={{
              left: `${pos}%`,
              top: `${((i * 19) % 80) + 10}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: (i % 4) + 3,
              repeat: Infinity,
              delay: (i % 6) * 0.3,
            }}
          />
        ))}
        
        {/* Flowing Lines */}
        {[220, 360, 300, 440, 270, 390].map((width, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-0.5 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
            style={{
              width: `${width}px`,
              left: `${(i * 16) % 78}%`,
              top: `${(i * 30) % 70 + 15}%`,
            }}
            animate={{
              x: [-800, 800],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: (i % 3) * 2.2 + 6,
              repeat: Infinity,
              delay: i * 1.3,
            }}
          />
        ))}

        {/* Geometric Shapes */}
        {[36, 54, 28, 46, 40, 58, 32, 48].map((size, i) => (
          <motion.div
            key={`shape-${i}`}
            className={`absolute ${i % 2 === 0 ? 'bg-blue-400/10' : 'bg-blue-400/10'} ${
              i % 3 === 0 ? 'rounded-full' : 'rounded-lg'
            }`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${(i * 14 + 10) % 82}%`,
              top: `${(i * 24 + 8) % 68}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: (i % 5) * 1.5 + 8.5,
              repeat: Infinity,
              delay: i * 1.6,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative z-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Main Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                GD-PI <span className="text-yellow-400">Preparation</span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                Comprehensive Group Discussion and Personal Interview preparation for top B-Schools in India
              </p>
              
              {/* Feature Badges */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4 pt-6"
              >
                <div className="bg-blue-500/30 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-blue-400/50">
                  🏆 90% Conversion Rate
                </div>
                <div className="bg-blue-500/30 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-blue-400/50">
                  📚 1000+ Students Trained
                </div>
                <div className="bg-blue-500/30 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-blue-400/50">
                  🎯 Expert Alumni Mentors
                </div>
              </motion.div>
            </motion.div>

            {/* Right Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex justify-center lg:justify-end"
            >
              <form onSubmit={handleHeroFormSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 w-full max-w-md border border-white/20 shadow-2xl">
                <h3 className="text-xl font-semibold text-white mb-4 text-center">Get Free GDPI Consultation</h3>
                
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={heroForm.name}
                      onChange={(e) => setHeroForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-600 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={heroForm.phone}
                      onChange={(e) => setHeroForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-600 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={heroForm.email}
                      onChange={(e) => setHeroForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-600 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={heroFormSubmitting || !heroForm.name.trim() || !heroForm.phone.trim() || !heroForm.email.trim()}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {heroFormSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Submitting...
                      </div>
                    ) : (
                      'Get Free Consultation'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Preparation Modules */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-[1400px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl font-bold text-center text-white mb-12"
          >
            Our <span className="text-orange-400">Preparation</span> Modules
          </motion.h2>
          
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
            {preparationModules.map((module, index) => (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)", 
                  transition: { duration: 0.3, ease: "easeOut" } 
                }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer group border-2 border-gray-200 hover:border-orange-300"
              >
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 group-hover:bg-gradient-to-br group-hover:from-orange-200 group-hover:to-orange-300 rounded-lg p-3 inline-block mb-4 transition-all duration-300 shadow-md">
                  {module.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                  {module.title}
                </h3>
                <p className="text-gray-800 text-lg group-hover:text-gray-900 transition-colors duration-300">
                  {module.description}
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4">
                  <div className="w-full h-0.5 bg-gradient-to-r from-blue-400 to-blue-500"></div>
                  <p className="text-sm text-blue-600 mt-2 font-medium">
                    {module.title === "Group Discussion" && "15+ topics covered with expert feedback"}
                    {module.title === "Personal Interview" && "1-on-1 sessions with IIM alumni"}
                    {module.title === "WAT Preparation" && "Essay writing techniques & time management"}
                    {module.title === "Mock Sessions" && "Real exam simulation environment"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Coverage */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -40, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="w-6 h-6 text-blue-600 mr-3" />
                GD Topics Covered
              </h3>
              <ul className="space-y-3">
                {gdTopics.map((topic) => (
                  <li key={topic} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-gray-900 text-lg">{topic}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <MessageSquare className="w-6 h-6 text-blue-600 mr-3" />
                Common PI Questions
              </h3>
              <ul className="space-y-3">
                {piQuestions.map((question) => (
                  <li key={question} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-gray-900 text-lg">{question}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Highlights Comparison */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-center md:text-left text-gray-900 mb-6 md:mb-0"
            >
              Course <span className="text-orange-600">Highlights</span>
            </motion.h2>
            
            {/* View Mode Toggle */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center bg-white rounded-lg shadow-md p-1"
            >
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
                  viewMode === 'table' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List className="w-4 h-4 mr-2" />
                Table View
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
                  viewMode === 'cards' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid className="w-4 h-4 mr-2" />
                Card View
              </button>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            {viewMode === 'table' ? (
              <motion.div
                key="table-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="overflow-x-auto"
              >
                <div className="min-w-[800px]">
                  {/* Header Row */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-3 bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-2xl overflow-hidden"
                  >
                    {/* Features Column */}
                    <div className="bg-blue-700 p-6 text-center">
                      <h3 className="text-xl font-bold text-white mb-2">Feature</h3>
                      <p className="text-blue-100 text-base font-medium">Most Suitable For Package Value</p>
                    </div>
                    
                    {/* Elite Package */}
                    <div className="bg-blue-600 p-6 text-center border-l border-blue-500">
                      <h3 className="text-xl font-bold text-white mb-3">Elite IIM Advantage - Online*</h3>
                      <div className="bg-white/20 rounded-lg py-3 px-4 mb-3">
                        <div className="text-3xl font-bold text-orange-300">₹12,000</div>
                        <div className="text-base text-blue-100 font-medium">(inc. GST)</div>
                      </div>
                      <p className="text-blue-100 text-base font-medium">Perfect for IIM Call Getters</p>
                    </div>
                    
                    {/* B-School Ready Package */}
                    <div className="bg-blue-600 p-6 text-center border-l border-blue-500">
                      <h3 className="text-xl font-bold text-white mb-3">B-School Ready Package</h3>
                      <div className="bg-white/20 rounded-lg py-3 px-4 mb-3">
                        <div className="text-3xl font-bold text-orange-300">₹10,000</div>
                        <div className="text-base text-blue-100 font-medium">(inc. GST)</div>
                      </div>
                      <p className="text-blue-100 text-base font-medium">For General B-School Aspirants</p>
                    </div>
                  </motion.div>

              {/* Feature Rows */}
              <div className="bg-white rounded-b-2xl shadow-xl overflow-hidden">
                {[
                  {
                    feature: "GK Sessions",
                    icon: <BookOpen className="w-5 h-5 text-blue-600" />,
                    elite: "10 Sessions",
                    standard: "10 Sessions"
                  },
                  {
                    feature: "Mock Interviews (with Feedback)",
                    icon: <Video className="w-5 h-5 text-blue-600" />,
                    elite: "5 Sessions",
                    standard: "3 Sessions"
                  },
                  {
                    feature: "Practice GD Sessions",
                    icon: <Users className="w-5 h-5 text-blue-600" />,
                    elite: "6 Sessions",
                    standard: "3 Sessions"
                  },
                  {
                    feature: "Assignments",
                    icon: <FileText className="w-5 h-5 text-blue-600" />,
                    elite: "Included",
                    standard: "3 Sessions",
                    isIncluded: true
                  },
                  {
                    feature: "Session on Do's & Don'ts",
                    icon: <Target className="w-5 h-5 text-blue-600" />,
                    elite: "Included",
                    standard: "Included",
                    isIncluded: true
                  },
                  {
                    feature: "Nano MBA Capsule",
                    icon: <Trophy className="w-5 h-5 text-blue-600" />,
                    elite: "Included",
                    standard: "Included",
                    isIncluded: true
                  },
                  {
                    feature: "College-Specific Strategy",
                    icon: <Presentation className="w-5 h-5 text-blue-600" />,
                    elite: "Included",
                    standard: "Included",
                    isIncluded: true
                  },
                  {
                    feature: "SOP/LOR Review",
                    icon: <FileText className="w-5 h-5 text-blue-600" />,
                    elite: "Included",
                    standard: "Included",
                    isIncluded: true
                  },
                  {
                    feature: "Alumni Interaction & Community",
                    icon: <Users className="w-5 h-5 text-blue-600" />,
                    elite: "6 Sessions",
                    standard: "3 Sessions"
                  },
                  {
                    feature: "Practice GD Sessions",
                    icon: <MessageSquare className="w-5 h-5 text-blue-600" />,
                    elite: "6 Sessions",
                    standard: "3 Sessions"
                  }
                ].map((row, index) => (
                  <motion.div
                    key={row.feature + index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`grid grid-cols-3 border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors duration-200`}
                  >
                    {/* Feature Name */}
                    <div className="p-6 flex items-center">
                      <div className="bg-blue-100 rounded-lg p-2 mr-4">
                        {row.icon}
                      </div>
                      <span className="font-medium text-gray-800">{row.feature}</span>
                    </div>
                    
                    {/* Elite Package Value */}
                    <div className="p-6 flex items-center justify-center border-l border-gray-200">
                      {row.isIncluded ? (
                        <div className="flex items-center text-blue-600">
                          <CheckCircle className="w-6 h-6 mr-2" />
                          <span className="font-semibold">{row.elite}</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-gray-900">
                          <CheckCircle className="w-6 h-6 mr-2 text-blue-500" />
                          <span className="font-semibold">{row.elite}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Standard Package Value */}
                    <div className="p-6 flex items-center justify-center border-l border-gray-200">
                      {row.isIncluded ? (
                        <div className="flex items-center text-blue-600">
                          <CheckCircle className="w-6 h-6 mr-2" />
                          <span className="font-semibold">{row.standard}</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-gray-900">
                          <CheckCircle className="w-6 h-6 mr-2 text-blue-500" />
                          <span className="font-semibold">{row.standard}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

                  {/* Action Buttons */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="grid grid-cols-3 mt-6"
                  >
                    <div></div>
                    
                    {/* Elite Package Button */}
                    <div className="flex justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openModal('Elite IIM Advantage - Online')}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        Buy Now
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </motion.button>
                    </div>
                    
                    {/* Standard Package Button */}
                    <div className="flex justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openModal('B-School Ready Package')}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        Buy Now
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              /* Card View */
              <motion.div
                key="card-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid lg:grid-cols-2 gap-6 lg:gap-8"
              >
                {/* Elite Package Card */}
                <motion.div
                  whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Elite IIM Advantage - Online*</h3>
                    <p className="text-blue-100 mb-4">Perfect for IIM Call Getters</p>
                    <div className="text-3xl font-bold">₹12,000 <span className="text-lg font-medium">(inc. GST)</span></div>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">What's Included:</h4>
                    <ul className="space-y-3">
                      {[
                        { feature: "GK Sessions", value: "10 Sessions" },
                        { feature: "Mock Interviews", value: "5 Sessions with Feedback" },
                        { feature: "Practice GD Sessions", value: "6 Sessions" },
                        { feature: "Assignments", value: "Included" },
                        { feature: "Do's & Don'ts Session", value: "Included" },
                        { feature: "Nano MBA Capsule", value: "Included" },
                        { feature: "College-Specific Strategy", value: "Included" },
                        { feature: "SOP/LOR Review", value: "Included" },
                        { feature: "Alumni Interaction", value: "6 Sessions" },
                      ].map((item) => (
                        <li key={item.feature} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-gray-800">{item.feature}:</span>
                            <span className="text-gray-800 ml-2 text-lg font-medium">{item.value}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openModal('Elite IIM Advantage - Online')}
                      className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Enroll Now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </motion.button>
                  </div>
                </motion.div>

                {/* B-School Ready Package Card */}
                <motion.div
                  whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">B-School Ready Package</h3>
                    <p className="text-blue-100 mb-4">For General B-School Aspirants</p>
                    <div className="text-3xl font-bold">₹10,000 <span className="text-lg font-medium">(inc. GST)</span></div>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">What's Included:</h4>
                    <ul className="space-y-3">
                      {[
                        { feature: "GK Sessions", value: "10 Sessions" },
                        { feature: "Mock Interviews", value: "3 Sessions with Feedback" },
                        { feature: "Practice GD Sessions", value: "3 Sessions" },
                        { feature: "Assignments", value: "3 Sessions" },
                        { feature: "Do's & Don'ts Session", value: "Included" },
                        { feature: "Nano MBA Capsule", value: "Included" },
                        { feature: "College-Specific Strategy", value: "Included" },
                        { feature: "SOP/LOR Review", value: "Included" },
                        { feature: "Alumni Interaction", value: "3 Sessions" },
                      ].map((item) => (
                        <li key={item.feature} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-gray-800">{item.feature}:</span>
                            <span className="text-gray-800 ml-2 text-lg font-medium">{item.value}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openModal('B-School Ready Package')}
                      className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Enroll Now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Session Structure */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-r from-emerald-900 to-teal-900">
        <div className="max-w-[1400px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl font-bold text-center text-white mb-12"
          >
            8-Week <span className="text-emerald-400">Intensive</span> Program
          </motion.h2>
          
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
            {sessionStructure.map((session, index) => (
              <motion.div
                key={session.week}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)", transition: { duration: 0.2 } }}
                className="bg-gradient-to-br from-white to-emerald-50 rounded-xl p-6 shadow-xl border-2 border-emerald-200 hover:border-emerald-400 transition-all duration-300"
              >
                <div className="text-emerald-700 font-bold mb-2 text-lg">{session.week}</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{session.focus}</h4>
                <ul className="space-y-2">
                  {session.activities.map((activity) => (
                    <li key={activity} className="text-base text-gray-800 font-medium">
                      • {activity}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Step GDPI Prep Plan */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-bold text-gray-900 mb-12"
              >
                The AdmitVerse 3-Step <span className="text-green-600">GDPI Prep Plan</span>
              </motion.h2>
              
              <div className="space-y-8">
                {/* Step 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex items-start space-x-6"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <Book className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="w-px h-16 bg-blue-200 mx-auto mt-4"></div>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-xl font-bold text-green-700 mb-3">Foundation Building</h3>
                    <p className="text-gray-800 text-lg leading-relaxed font-medium">
                      Comprehensive coverage of current affairs, MBA concepts, and foundational interview skills.
                    </p>
                  </div>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-start space-x-6"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <Brain className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="w-px h-16 bg-blue-200 mx-auto mt-4"></div>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-xl font-bold text-purple-700 mb-3">Intensive Training</h3>
                    <p className="text-gray-800 text-lg leading-relaxed font-medium">
                      Mock PI sessions, group discussions, and personalized feedback from alumni.
                    </p>
                  </div>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex items-start space-x-6"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <Zap className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-xl font-bold text-orange-700 mb-3">Confidence Building</h3>
                    <p className="text-gray-800 text-lg leading-relaxed font-medium">
                      Final phase of mentoring, case study practice, and ensuring readiness for the big day.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-20 h-20 bg-blue-600 rounded-full"></div>
                  <div className="absolute top-32 right-16 w-16 h-16 bg-blue-500 rounded-full"></div>
                  <div className="absolute bottom-20 left-20 w-12 h-12 bg-blue-400 rounded-full"></div>
                </div>
                
                {/* Study Setup Illustration */}
                <div className="relative z-10">
                  <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-white" />
                      </div>
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Target className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-blue-100 rounded-full"></div>
                      <div className="h-3 bg-blue-200 rounded-full w-3/4"></div>
                      <div className="h-3 bg-blue-100 rounded-full w-1/2"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-blue-600 h-16 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="bg-blue-500 h-16 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div className="bg-blue-400 h-16 rounded-lg flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Pencil Holder Illustration */}
                  <div className="mt-6 flex justify-center">
                    <div className="bg-blue-800 w-16 h-20 rounded-lg relative">
                      <div className="absolute -top-2 left-2 w-2 h-8 bg-red-400 rounded-full"></div>
                      <div className="absolute -top-3 left-5 w-2 h-10 bg-yellow-400 rounded-full"></div>
                      <div className="absolute -top-2 left-8 w-2 h-8 bg-green-400 rounded-full"></div>
                      <div className="absolute -top-4 left-11 w-2 h-12 bg-purple-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Target Institutions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl font-bold text-center text-white mb-12"
          >
            Prepare for <span className="text-yellow-400">Top B-Schools</span>
          </motion.h2>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {institutions.map((inst, index) => (
              <motion.div
                key={inst.name}
                initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="bg-gradient-to-br from-white to-purple-50 rounded-lg p-6 text-center hover:bg-gradient-to-br hover:from-purple-50 hover:to-indigo-100 transition-all duration-300 shadow-2xl hover:shadow-3xl border-2 border-purple-200 hover:border-yellow-400"
              >
                <h3 className="text-xl font-bold text-purple-600 mb-2">{inst.name}</h3>
                <p className="text-gray-800 text-base font-medium">{inst.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-800 relative z-10 overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="max-w-7xl mx-auto">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Special Offers
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Complementary Inclusions for AdmitVerse GDPI students
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {[
                {
                  icon: <Gift className="w-6 h-6" />,
                  title: "100% Free Education Loan Support",
                  description: "Complete assistance through our partner banks with zero processing fees"
                },
                {
                  icon: <Star className="w-6 h-6" />,
                  title: "Priority Application Support",
                  description: "Fast-track your B-School applications with dedicated counselor assistance"
                },
                {
                  icon: <Percent className="w-6 h-6" />,
                  title: "Scholarship Guidance",
                  description: "Expert guidance to maximize your scholarship opportunities"
                },
                {
                  icon: <Trophy className="w-6 h-6" />,
                  title: "Alumni Network Access",
                  description: "Connect with successful graduates from top B-Schools for mentorship"
                }
              ].map((offer, index) => (
                <motion.div
                  key={offer.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-blue-500/20 backdrop-blur-sm rounded-xl p-6 border border-blue-400/30"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white">
                        {offer.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                        {offer.title}
                      </h3>
                      <p className="text-blue-100">
                        {offer.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 relative z-10">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Our <span className="text-blue-600">Success</span> Record
          </h2>
          <div className="grid sm:grid-cols-3 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <Trophy className="w-12 h-12 mx-auto mb-4 text-orange-600" />
              <h3 className="text-3xl font-bold mb-2">
                <AnimatedCounter value="90%" />
              </h3>
              <p>Conversion Rate</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <Target className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h3 className="text-3xl font-bold mb-2">
                <AnimatedCounter value="1000+" />
              </h3>
              <p>Students Trained</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h3 className="text-3xl font-bold mb-2">
                <AnimatedCounter value="50+" />
              </h3>
              <p>Mock Sessions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center text-gray-900 mb-4"
          >
            Success <span className="text-green-600">Stories</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl text-gray-800 text-center mb-12 max-w-3xl mx-auto font-medium"
          >
            Hear from our students who successfully cracked their GD-PI rounds
          </motion.p>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start mb-4">
                  <div className="bg-blue-100 rounded-full p-2 mr-4">
                    <Quote className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">{testimonial.name}</h3>
                  </div>
                </div>
                
                <p className="text-gray-800 text-lg leading-relaxed italic font-medium">
                  "{testimonial.review}"
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ace Your GD-PI Rounds
            </h2>
            <p className="text-2xl text-gray-800 mb-8 font-medium">
              Join our comprehensive preparation program and convert your B-School calls
            </p>
            <Link
              href="/#book-counseling"
              className="inline-block bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            >
              Enroll Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
    
    {/* Modal */}
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold mb-2">Get Consultant Callback</h3>
              <p className="text-blue-100 text-sm">
                Selected: <span className="font-semibold">{selectedPackage}</span>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="text-center mb-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Our consultant will connect to you
                </h4>
                <p className="text-gray-600 text-sm">
                  Fill in your details and we'll get back to you within 24 hours
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-blue-900 mb-1">
                      What happens next?
                    </h5>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Our consultant will call you within 24 hours</li>
                      <li>• Discuss course details and payment options</li>
                      <li>• Get personalized guidance for your goals</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !phoneNumber.trim() || !name.trim()}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    'Request Callback'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    
    <Footer />
    </>
  )
}