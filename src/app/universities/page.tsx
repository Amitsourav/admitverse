'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useUniversities } from '@/hooks/useUniversities'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import TopBanner from '@/components/TopBanner'
import Footer from '@/components/Footer'
import FloatingActions from '@/components/FloatingActions'
import { 
  Search, 
  MapPin, 
  Star, 
  Users, 
  Filter, 
  Globe, 
  GraduationCap, 
  Award, 
  TrendingUp,
  Building,
  ChevronDown,
  X,
  BookOpen,
  Grid3x3,
  List,
  DollarSign,
  Calendar,
  Languages
} from 'lucide-react'

import { useSearchParams } from 'next/navigation'
import MobileNumberPopup from '@/components/MobileNumberPopup'
import { useMobilePopup } from '@/hooks/useMobilePopup'

export default function UniversitiesPage() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search') || ''
  const initialCountry = searchParams.get('country') || 'all'
  
  // Mobile popup hook
  const { isPopupOpen, mobileSubmitted, closePopup, submitMobile } = useMobilePopup()
  
  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [selectedCountry, setSelectedCountry] = useState(initialCountry)
  const [selectedRanking, setSelectedRanking] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [viewType, setViewType] = useState<'grid' | 'row'>('row')
  const [tuitionRange, setTuitionRange] = useState('all')
  const [acceptanceRate, setAcceptanceRate] = useState('all')
  const [programType, setProgramType] = useState('all')
  const [campusSize, setCampusSize] = useState('all')
  const [studentSize, setStudentSize] = useState('all')
  const [researchOutput, setResearchOutput] = useState('all')
  const [internationalStudents, setInternationalStudents] = useState('all')
  const [studentFacultyRatio, setStudentFacultyRatio] = useState('all')
  const [specializations, setSpecializations] = useState('all')
  const [universityType, setUniversityType] = useState('all') // all, domestic, international
  
  // University carousel images
  const carouselImages = [
    { name: 'Harvard University', id: 1 },
    { name: 'Stanford University', id: 2 },
    { name: 'MIT', id: 3 },
    { name: 'Oxford University', id: 4 },
    { name: 'Cambridge University', id: 5 }
  ]
  
  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
    }, 4000) // Change image every 4 seconds
    
    return () => clearInterval(interval)
  }, [])
  
  // Use dynamic university data from API
  const { universities: allUniversities, loading, error } = useUniversities({
    search: searchTerm,
    country: selectedCountry,
    ranking: selectedRanking
  })

  // Apply domestic/international filtering
  const filteredUniversities = useMemo(() => {
    if (universityType === 'all') {
      return allUniversities
    } else if (universityType === 'domestic') {
      return allUniversities.filter(university => university.country === 'India')
    } else if (universityType === 'international') {
      return allUniversities.filter(university => university.country !== 'India')
    }
    return allUniversities
  }, [allUniversities, universityType])

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBanner />
      <Navigation />

      {/* Hero Section with University Images */}
      <section className="relative pt-24 pb-16 h-[70vh] bg-gradient-to-br from-blue-600 via-blue-800 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        
        {/* University Image Carousel */}
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
                src={`https://picsum.photos/1920/1080?random=${carouselImages[currentImageIndex].id}`}
                alt={carouselImages[currentImageIndex].name}
                className="w-full h-full object-cover"
              />
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/50" />
              
              {/* University name overlay */}
              <motion.div
                className="absolute bottom-8 left-8 bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/30"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="text-white text-lg font-semibold">
                  {carouselImages[currentImageIndex].name}
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
              Explore Top Universities
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-blue-50 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Find your perfect university from our curated selection of world-class institutions
            </motion.p>
            
            {/* Featured University Badges */}
            <motion.div
              className="flex flex-wrap justify-center items-center gap-3 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {['Harvard', 'Stanford', 'MIT', 'Oxford', 'Cambridge', 'Yale', 'Princeton'].map((uni, index) => (
                <motion.div
                  key={uni}
                  className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white/95 text-sm font-semibold border border-white/30 cursor-pointer"
                  whileHover={{ 
                    scale: 1.1, 
                    backgroundColor: "rgba(255,255,255,0.4)",
                    y: -5,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotateX: 0,
                    transition: {
                      duration: 0.6,
                      delay: 0.8 + index * 0.15,
                      type: "spring",
                      stiffness: 100
                    }
                  }}
                >
                  {uni}
                </motion.div>
              ))}
            </motion.div>
            
            {/* CTA Button */}
            <motion.button
              className="mt-8 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-3 px-8 rounded-full border border-white/30 transition-all duration-300 shadow-lg relative overflow-hidden group"
              whileHover={{ 
                scale: 1.08, 
                y: -3,
                boxShadow: "0 15px 35px rgba(0,0,0,0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                rotateX: 0,
                transition: {
                  duration: 0.8,
                  delay: 1.4,
                  type: "spring",
                  stiffness: 120
                }
              }}
            >
              <motion.span 
                className="relative z-10"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                Start Your Journey
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area with Sidebar */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar - Filters */}
            <motion.div 
              className="lg:w-80 w-full"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            >
              <motion.div 
                className="bg-white rounded-xl shadow-sm sticky top-6 max-h-[calc(100vh-6rem)] overflow-y-auto"
                whileHover={{ boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6">
                <motion.div 
                  className="flex items-center justify-between mb-6"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <motion.div
                      animate={{ rotate: [0, 180, 360] }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <Filter className="w-5 h-5 mr-2 text-blue-600" />
                    </motion.div>
                    Filters
                  </h2>
                  {(selectedCountry !== 'all' || selectedRanking !== 'all' || tuitionRange !== 'all' || acceptanceRate !== 'all' || 
                    campusSize !== 'all' || studentSize !== 'all' || researchOutput !== 'all' || internationalStudents !== 'all' || 
                    specializations !== 'all' || universityType !== 'all') && (
                    <motion.span 
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      {[
                        selectedCountry !== 'all', 
                        selectedRanking !== 'all', 
                        tuitionRange !== 'all', 
                        acceptanceRate !== 'all',
                        campusSize !== 'all',
                        studentSize !== 'all',
                        researchOutput !== 'all',
                        internationalStudents !== 'all',
                        specializations !== 'all',
                        universityType !== 'all'
                      ].filter(Boolean).length} Active
                    </motion.span>
                  )}
                </motion.div>

                {/* Search Bar */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <motion.div 
                    className="relative" 
                    whileHover={{ scale: 1.02 }} 
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="absolute left-3 top-1/2 transform -translate-y-1/2"
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Search className="text-gray-400 h-4 w-4" />
                    </motion.div>
                    <input
                      type="text"
                      placeholder="Search universities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-300 hover:border-blue-300"
                    />
                  </motion.div>
                </motion.div>

                {/* Country Filter */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  whileHover={{ x: 5 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                        <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                      </motion.div>
                      Country
                    </span>
                  </label>
                  <motion.select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm transition-all duration-300 hover:border-blue-300 cursor-pointer"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <option value="all">All Countries</option>
                    <option value="USA">🇺🇸 USA</option>
                    <option value="UK">🇬🇧 UK</option>
                    <option value="Canada">🇨🇦 Canada</option>
                    <option value="Australia">🇦🇺 Australia</option>
                    <option value="Germany">🇩🇪 Germany</option>
                  </motion.select>
                </motion.div>

                {/* Ranking Filter */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  whileHover={{ x: 5 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity }}>
                        <Award className="w-4 h-4 mr-1 text-gray-400" />
                      </motion.div>
                      Ranking
                    </span>
                  </label>
                  <motion.select
                    value={selectedRanking}
                    onChange={(e) => setSelectedRanking(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm transition-all duration-300 hover:border-blue-300 cursor-pointer"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <option value="all">All Rankings</option>
                    <option value="top10">Top 10</option>
                    <option value="top50">Top 50</option>
                    <option value="top100">Top 100</option>
                  </motion.select>
                </motion.div>

                {/* Tuition Filter */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  whileHover={{ x: 5 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                        <DollarSign className="w-4 h-4 mr-1 text-gray-400" />
                      </motion.div>
                      Tuition Range
                    </span>
                  </label>
                  <motion.select
                    value={tuitionRange}
                    onChange={(e) => setTuitionRange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm transition-all duration-300 hover:border-blue-300 cursor-pointer"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <option value="all">All Tuition</option>
                    <option value="0-20000">Under $20k</option>
                    <option value="20000-40000">$20k - $40k</option>
                    <option value="40000-60000">$40k - $60k</option>
                    <option value="60000+">Above $60k</option>
                  </motion.select>
                </motion.div>

                {/* Acceptance Rate Filter */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  whileHover={{ x: 5 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      <motion.div animate={{ x: [0, 3, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
                        <TrendingUp className="w-4 h-4 mr-1 text-gray-400" />
                      </motion.div>
                      Acceptance Rate
                    </span>
                  </label>
                  <motion.select
                    value={acceptanceRate}
                    onChange={(e) => setAcceptanceRate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm transition-all duration-300 hover:border-blue-300 cursor-pointer"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <option value="all">All Rates</option>
                    <option value="0-10">Under 10%</option>
                    <option value="10-25">10% - 25%</option>
                    <option value="25-50">25% - 50%</option>
                    <option value="50+">Above 50%</option>
                  </motion.select>
                </motion.div>

                {/* Student Size Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1 text-gray-400" />
                      Student Size
                    </span>
                  </label>
                  <select
                    value={studentSize}
                    onChange={(e) => setStudentSize(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                  >
                    <option value="all">All Sizes</option>
                    <option value="small">Small (&lt; 5,000)</option>
                    <option value="medium">Medium (5,000 - 15,000)</option>
                    <option value="large">Large (15,000 - 30,000)</option>
                    <option value="very-large">Very Large (&gt; 30,000)</option>
                  </select>
                </div>

                {/* Campus Type Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      <Building className="w-4 h-4 mr-1 text-gray-400" />
                      Campus Type
                    </span>
                  </label>
                  <select
                    value={campusSize}
                    onChange={(e) => setCampusSize(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                  >
                    <option value="all">All Types</option>
                    <option value="urban">Urban</option>
                    <option value="suburban">Suburban</option>
                    <option value="rural">Rural</option>
                    <option value="college-town">College Town</option>
                  </select>
                </div>

                {/* Program Specialization Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1 text-gray-400" />
                      Specialization
                    </span>
                  </label>
                  <select
                    value={specializations}
                    onChange={(e) => setSpecializations(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                  >
                    <option value="all">All Fields</option>
                    <option value="engineering">Engineering</option>
                    <option value="business">Business</option>
                    <option value="medicine">Medicine</option>
                    <option value="law">Law</option>
                    <option value="arts">Liberal Arts</option>
                    <option value="science">Sciences</option>
                    <option value="tech">Technology</option>
                  </select>
                </div>

                {/* International Students Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      <Globe className="w-4 h-4 mr-1 text-gray-400" />
                      International Students
                    </span>
                  </label>
                  <select
                    value={internationalStudents}
                    onChange={(e) => setInternationalStudents(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                  >
                    <option value="all">All Percentages</option>
                    <option value="0-10">Under 10%</option>
                    <option value="10-20">10% - 20%</option>
                    <option value="20-30">20% - 30%</option>
                    <option value="30+">Above 30%</option>
                  </select>
                </div>

                {/* Research Output Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      <Award className="w-4 h-4 mr-1 text-gray-400" />
                      Research Level
                    </span>
                  </label>
                  <select
                    value={researchOutput}
                    onChange={(e) => setResearchOutput(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                  >
                    <option value="all">All Levels</option>
                    <option value="very-high">Very High Research</option>
                    <option value="high">High Research</option>
                    <option value="moderate">Moderate Research</option>
                    <option value="undergraduate">Undergraduate Focus</option>
                  </select>
                </div>

                {/* Clear Filters Button */}
                <motion.button
                  onClick={() => {
                    setSelectedCountry('all')
                    setSelectedRanking('all')
                    setTuitionRange('all')
                    setAcceptanceRate('all')
                    setProgramType('all')
                    setCampusSize('all')
                    setStudentSize('all')
                    setResearchOutput('all')
                    setInternationalStudents('all')
                    setStudentFacultyRatio('all')
                    setSpecializations('all')
                    setUniversityType('all')
                    setSearchTerm('')
                  }}
                  className="w-full px-4 py-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg font-medium transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear All Filters
                </motion.button>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content Area */}
            <div className="flex-1">
              {/* Top Bar with View Toggle and Results Count */}
              <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-600 font-medium">
                    Showing <span className="text-gray-900 font-semibold">{filteredUniversities.length}</span> universities
                  </p>
                  
                  {/* View Toggle */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewType('row')}
                      className={`flex items-center px-3 py-1.5 rounded-md transition-colors text-sm ${
                        viewType === 'row' 
                          ? 'bg-white text-blue-600 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <List className="w-4 h-4 mr-1" />
                      List
                    </button>
                    <button
                      onClick={() => setViewType('grid')}
                      className={`flex items-center px-3 py-1.5 rounded-md transition-colors text-sm ${
                        viewType === 'grid' 
                          ? 'bg-white text-blue-600 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Grid3x3 className="w-4 h-4 mr-1" />
                      Grid
                    </button>
                  </div>
                </div>
                
                {/* Domestic/International Filter */}
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => setUniversityType('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                      universityType === 'all'
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    All Universities
                  </motion.button>
                  <motion.button
                    onClick={() => setUniversityType('domestic')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                      universityType === 'domestic'
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🇮🇳 Domestic
                  </motion.button>
                  <motion.button
                    onClick={() => setUniversityType('international')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                      universityType === 'international'
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🌍 International
                  </motion.button>
                </div>
              </div>

              {/* Universities Content */}
              <div>
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center space-x-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="text-lg text-gray-600">Loading universities...</span>
              </div>
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Universities</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          ) : filteredUniversities.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No universities found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </motion.div>
          ) : viewType === 'row' ? (
            // Row View  
            <div className="space-y-4">
              {filteredUniversities.map((university, index) => (
                <motion.div
                  key={university.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Left side - Image and Ranking */}
                    <div className="md:w-48 h-40 md:h-auto bg-gradient-to-br from-blue-100 to-blue-100 relative flex-shrink-0">
                      {university.image ? (
                        <img 
                          src={university.image} 
                          alt={university.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <GraduationCap className="w-12 h-12 text-blue-300" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                        <Award className="w-4 h-4 text-blue-600 mr-1" />
                        <span className="text-sm font-medium">#{university.ranking}</span>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-blue-500/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {university.rating} ⭐
                      </div>
                    </div>

                    {/* Middle - University Details */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {university.name}
                          </h3>
                          <div className="flex flex-wrap gap-3 mb-3 text-sm text-gray-600">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                              {university.location}, {university.country}
                            </div>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1 text-blue-500" />
                              {university.students} Students
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-1 text-blue-500" />
                              {university.tuition}
                            </div>
                            {university.acceptance && (
                              <div className="flex items-center">
                                <TrendingUp className="w-4 h-4 mr-1 text-blue-500" />
                                {university.acceptance} Acceptance
                              </div>
                            )}
                          </div>
                          
                          {/* Programs */}
                          {university.programs && Array.isArray(university.programs) && university.programs.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {university.programs.slice(0, 4).map((program: string, idx: number) => (
                                <span 
                                  key={idx}
                                  className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                                >
                                  {program}
                                </span>
                              ))}
                              {university.programs.length > 4 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                                  +{university.programs.length - 4} more
                                </span>
                              )}
                            </div>
                          )}

                          <p className="text-gray-600 text-sm line-clamp-2">
                            {university.description || 'A prestigious institution offering world-class education and research opportunities.'}
                          </p>
                        </div>

                        {/* Right side - Actions */}
                        <div className="mt-4 md:mt-0 md:ml-6 flex flex-col gap-2">
                          <Link href={`/universities/${university.slug}`}>
                            <motion.button 
                              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-800 text-white font-medium rounded-lg hover:shadow-md transition-all duration-300 whitespace-nowrap"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              View Details
                            </motion.button>
                          </Link>
                          <button className="px-6 py-2 border border-blue-500 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all duration-300 whitespace-nowrap">
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            // Grid View
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredUniversities.map((university, index) => (
                <motion.div
                  key={university.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9, rotateY: -15 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1, 
                    rotateY: 0,
                    transition: {
                      duration: 0.6,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    rotateX: 5,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    transition: { duration: 0.3 }
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                >
                  {/* Card Header with Image - Increased height for better image display */}
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-100 relative overflow-hidden">
                    {university.image ? (
                      <img 
                        src={university.image} 
                        alt={university.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <GraduationCap className="w-16 h-16 text-blue-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                      <Award className="w-4 h-4 text-blue-600 mr-1" />
                      <span className="text-sm font-medium">#{university.ranking}</span>
                    </div>
                  </div>
                  
                  {/* Card Content - Adjusted padding for rectangular shape */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {university.name}
                      </h3>
                      <div className="flex items-center flex-shrink-0 ml-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">{university.rating}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1.5 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="line-clamp-1">{university.location}, {university.country}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-gray-400" />
                        {university.students} students
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-2 text-gray-400" />
                        {Array.isArray(university.programs) ? university.programs.length : university.programs} programs
                      </div>
                    </div>
                    
                    <Link href={`/universities/${university.slug}`}>
                      <motion.button 
                        className="mt-4 w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-800 text-white font-medium rounded-lg hover:shadow-md transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        View Details
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Simple and Clean */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Universities', icon: <Building className="w-6 h-6" /> },
              { number: '50+', label: 'Countries', icon: <Globe className="w-6 h-6" /> },
              { number: '10K+', label: 'Programs', icon: <GraduationCap className="w-6 h-6" /> },
              { number: '1M+', label: 'Students', icon: <Users className="w-6 h-6" /> },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-600">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
      
      {/* Mobile Number Popup */}
      <MobileNumberPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        onSubmit={submitMobile}
      />
    </div>
  )
}