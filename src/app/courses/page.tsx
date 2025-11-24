'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import TopBanner from '@/components/TopBanner'
import Footer from '@/components/Footer'
import FloatingActions from '@/components/FloatingActions'
import { useSearchParams } from 'next/navigation'
import { 
  Search, 
  BookOpen, 
  Clock, 
  DollarSign, 
  Users, 
  Award, 
  TrendingUp, 
  Filter,
  Star,
  Globe,
  GraduationCap,
  Briefcase,
  Calendar,
  ChevronDown,
  X,
  ArrowRight,
  Target,
  Zap,
  Building
} from 'lucide-react'

export default function CoursesPage() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search') || ''
  
  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedDuration, setSelectedDuration] = useState('all')
  const [selectedField, setSelectedField] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Carousel images for hero section
  const carouselImages = [
    { name: 'Computer Science', field: 'Technology', id: 1 },
    { name: 'Business Administration', field: 'Business', id: 2 },
    { name: 'Medicine', field: 'Healthcare', id: 3 },
    { name: 'Engineering', field: 'Technology', id: 4 },
    { name: 'Data Science', field: 'Analytics', id: 5 }
  ]
  
  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [])
  
  // Sample courses data
  const courses = [
    {
      id: 1,
      name: 'Computer Science',
      slug: 'computer-science',
      level: 'Bachelor',
      duration: '4 years',
      field: 'Technology',
      universities: 1200,
      avgSalary: '$95,000',
      description: 'Study algorithms, software development, AI, and cutting-edge technology',
      skills: ['Programming', 'AI/ML', 'Data Structures', 'Software Engineering'],
      jobRoles: ['Software Engineer', 'Data Scientist', 'AI Engineer', 'Tech Lead'],
      popularity: 95,
      image: '/api/placeholder/400/300'
    },
    {
      id: 2,
      name: 'Business Administration (MBA)',
      slug: 'business-administration',
      level: 'Master',
      duration: '2 years',
      field: 'Business',
      universities: 800,
      avgSalary: '$115,000',
      description: 'Master business strategy, leadership, finance, and entrepreneurship',
      skills: ['Leadership', 'Strategy', 'Finance', 'Marketing'],
      jobRoles: ['CEO', 'Product Manager', 'Consultant', 'Investment Banker'],
      popularity: 92,
      image: '/api/placeholder/400/300'
    },
    {
      id: 3,
      name: 'Data Science',
      slug: 'data-science',
      level: 'Master',
      duration: '2 years',
      field: 'Technology',
      universities: 600,
      avgSalary: '$120,000',
      description: 'Analyze big data, machine learning, statistics, and predictive modeling',
      skills: ['Machine Learning', 'Statistics', 'Python/R', 'Data Visualization'],
      jobRoles: ['Data Scientist', 'ML Engineer', 'Data Analyst', 'AI Researcher'],
      popularity: 98,
      image: '/api/placeholder/400/300'
    },
    {
      id: 4,
      name: 'Medicine (MD)',
      slug: 'medicine',
      level: 'Doctorate',
      duration: '4-6 years',
      field: 'Healthcare',
      universities: 400,
      avgSalary: '$200,000',
      description: 'Comprehensive medical training for diagnosing and treating patients',
      skills: ['Clinical Skills', 'Diagnosis', 'Patient Care', 'Medical Research'],
      jobRoles: ['Physician', 'Surgeon', 'Medical Researcher', 'Specialist Doctor'],
      popularity: 88,
      image: '/api/placeholder/400/300'
    },
    {
      id: 5,
      name: 'Mechanical Engineering',
      slug: 'mechanical-engineering',
      level: 'Bachelor',
      duration: '4 years',
      field: 'Engineering',
      universities: 900,
      avgSalary: '$88,000',
      description: 'Design and develop mechanical systems, robotics, and machinery',
      skills: ['CAD', 'Thermodynamics', 'Robotics', 'Materials Science'],
      jobRoles: ['Mechanical Engineer', 'Design Engineer', 'Project Manager', 'R&D Engineer'],
      popularity: 85,
      image: '/api/placeholder/400/300'
    },
    {
      id: 6,
      name: 'Psychology',
      slug: 'psychology',
      level: 'Bachelor',
      duration: '3-4 years',
      field: 'Social Sciences',
      universities: 700,
      avgSalary: '$65,000',
      description: 'Study human behavior, mental processes, and psychological theories',
      skills: ['Research Methods', 'Counseling', 'Statistical Analysis', 'Clinical Assessment'],
      jobRoles: ['Psychologist', 'Therapist', 'HR Specialist', 'Research Analyst'],
      popularity: 80,
      image: '/api/placeholder/400/300'
    },
    {
      id: 7,
      name: 'Artificial Intelligence',
      slug: 'artificial-intelligence',
      level: 'Master',
      duration: '2 years',
      field: 'Technology',
      universities: 350,
      avgSalary: '$130,000',
      description: 'Advanced study in AI, deep learning, neural networks, and intelligent systems',
      skills: ['Deep Learning', 'Neural Networks', 'NLP', 'Computer Vision'],
      jobRoles: ['AI Engineer', 'ML Research Scientist', 'AI Product Manager', 'Robotics Engineer'],
      popularity: 99,
      image: '/api/placeholder/400/300'
    },
    {
      id: 8,
      name: 'Finance',
      level: 'Bachelor',
      duration: '3-4 years',
      field: 'Business',
      universities: 1000,
      avgSalary: '$85,000',
      description: 'Master financial markets, investment strategies, and corporate finance',
      skills: ['Financial Analysis', 'Investment', 'Risk Management', 'Accounting'],
      jobRoles: ['Financial Analyst', 'Investment Banker', 'CFO', 'Portfolio Manager'],
      popularity: 87,
      image: '/api/placeholder/400/300'
    },
    {
      id: 9,
      name: 'Law (JD/LLB)',
      level: 'Professional',
      duration: '3-4 years',
      field: 'Law',
      universities: 500,
      avgSalary: '$120,000',
      description: 'Comprehensive legal education covering various areas of law',
      skills: ['Legal Research', 'Litigation', 'Contract Law', 'Legal Writing'],
      jobRoles: ['Lawyer', 'Legal Counsel', 'Judge', 'Legal Consultant'],
      popularity: 82,
      image: '/api/placeholder/400/300'
    }
  ]
  
  // Filter courses based on search and filters
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel
    const matchesDuration = selectedDuration === 'all' || 
                           (selectedDuration === '2years' && course.duration.includes('2')) ||
                           (selectedDuration === '3-4years' && (course.duration.includes('3') || course.duration.includes('4'))) ||
                           (selectedDuration === '5+years' && (course.duration.includes('5') || course.duration.includes('6')))
    const matchesField = selectedField === 'all' || course.field === selectedField
    
    return matchesSearch && matchesLevel && matchesDuration && matchesField
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBanner />
      <Navigation />

      {/* Hero Section with Carousel */}
      <section className="relative pt-20 pb-16 min-h-[70vh] bg-gradient-to-br from-blue-600 via-blue-800 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        
        {/* Course Image Carousel */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <img
                src={`https://picsum.photos/1920/1080?random=${carouselImages[currentImageIndex].id + 100}`}
                alt={carouselImages[currentImageIndex].name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/50" />
              
              {/* Course name overlay */}
              <motion.div
                className="absolute bottom-8 left-8 bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/30"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="text-white text-lg font-semibold">
                  {carouselImages[currentImageIndex].name} • {carouselImages[currentImageIndex].field}
                </span>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          
          {/* Carousel indicators */}
          <div className="absolute bottom-8 right-8 flex space-x-2">
            {carouselImages.map((_, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-white scale-110' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                onClick={() => setCurrentImageIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center relative z-10 py-8"
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Explore Top Courses
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-blue-50 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover degree programs that align with your career goals from universities worldwide
            </motion.p>
            
            {/* Featured Course Tags */}
            <motion.div
              className="flex flex-wrap justify-center items-center gap-3 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {['Computer Science', 'MBA', 'Medicine', 'Engineering', 'Data Science', 'Law', 'Psychology'].map((course, index) => (
                <motion.div
                  key={course}
                  className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white/95 text-sm font-semibold border border-white/30 cursor-pointer relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.1,
                    y: -5,
                    backgroundColor: "rgba(255,255,255,0.4)",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                    rotateY: 10
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.6, rotateX: -90, y: 30 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotateX: 0,
                    y: 0,
                    transition: {
                      duration: 0.7,
                      delay: 0.8 + index * 0.15,
                      type: "spring",
                      stiffness: 120
                    }
                  }}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 + index * 0.15, duration: 0.3 }}
                  >
                    {course}
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 rounded-full"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-6 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search courses, skills, or career paths..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Filter Buttons */}
            <div className="flex gap-2">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="all">All Levels</option>
                <option value="Bachelor">Bachelor's</option>
                <option value="Master">Master's</option>
                <option value="Doctorate">Doctorate</option>
                <option value="Professional">Professional</option>
              </select>
              
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="all">All Durations</option>
                <option value="2years">2 Years</option>
                <option value="3-4years">3-4 Years</option>
                <option value="5+years">5+ Years</option>
              </select>
              
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="all">All Fields</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Engineering">Engineering</option>
                <option value="Social Sciences">Social Sciences</option>
                <option value="Law">Law</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredCourses.length} courses
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12 relative overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 bg-blue-100/30 rounded-full blur-xl"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-32 h-32 bg-blue-100/20 rounded-full blur-2xl"
            animate={{
              y: [0, 30, 0],
              x: [0, -15, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div
            className="absolute bottom-40 left-1/4 w-16 h-16 bg-indigo-100/40 rounded-full blur-lg"
            animate={{
              y: [0, -25, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {filteredCourses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 60, scale: 0.8, rotateY: -20 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateY: 0,
                    transition: {
                      duration: 0.7,
                      delay: index * 0.15,
                      type: "spring",
                      stiffness: 100
                    }
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.03,
                    rotateX: 5,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                    transition: { duration: 0.4, type: "spring" }
                  }}
                  viewport={{ once: true, margin: "-80px" }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group relative cursor-pointer"
                >
                  {/* Course Header */}
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-100 relative p-6">
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-white rounded-full px-3 py-1 flex items-center shadow-sm">
                        <TrendingUp className="w-4 h-4 text-blue-600 mr-1" />
                        <span className="text-sm font-semibold text-gray-700">{course.popularity}% Popular</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-end h-full">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 inline-block mb-3">
                        <BookOpen className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {course.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                    </div>
                  </div>
                  
                  {/* Course Content */}
                  <div className="p-6">
                    {/* Key Info */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center">
                        <GraduationCap className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-600">{course.level}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-600">{course.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-600">{course.universities}+ Unis</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-sm font-semibold text-blue-800">{course.avgSalary}</span>
                      </div>
                    </div>
                    
                    {/* Skills Tags */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">Key Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {course.skills.slice(0, 3).map(skill => (
                          <span key={skill} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                            {skill}
                          </span>
                        ))}
                        {course.skills.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            +{course.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Job Roles */}
                    <div className="mb-6">
                      <p className="text-xs text-gray-500 mb-2">Career Opportunities:</p>
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-700 truncate">
                          {course.jobRoles.slice(0, 2).join(', ')}
                        </span>
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    <Link href={`/courses/${course.slug}`}>
                      <motion.button 
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-800 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 relative overflow-hidden group/btn"
                        whileHover={{ 
                          scale: 1.05,
                          y: -2,
                          boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                      >
                        <motion.span 
                          className="relative z-10"
                          initial={{ x: 0 }}
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          View Programs
                        </motion.span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600 rounded-lg"
                          initial={{ scale: 0, opacity: 0 }}
                          whileHover={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '1000+', label: 'Degree Programs', icon: <BookOpen className="w-6 h-6" /> },
              { number: '50+', label: 'Fields of Study', icon: <Target className="w-6 h-6" /> },
              { number: '500+', label: 'Universities', icon: <Building className="w-6 h-6" /> },
              { number: '95%', label: 'Employment Rate', icon: <Briefcase className="w-6 h-6" /> },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.5 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    duration: 0.8,
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100
                  }
                }}
                whileHover={{
                  y: -5,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-center cursor-pointer"
              >
                <motion.div 
                  className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-600 relative overflow-hidden"
                  whileHover={{ 
                    backgroundColor: "#3b82f6",
                    scale: 1.1,
                    rotateY: 180
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    whileHover={{ color: "#ffffff" }}
                    transition={{ duration: 0.3 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                <motion.div 
                  className="text-3xl font-bold text-gray-900"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
                >
                  {stat.number}
                </motion.div>
                <motion.div 
                  className="text-sm text-gray-600"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.2, duration: 0.4 }}
                >
                  {stat.label}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </div>
  )
}