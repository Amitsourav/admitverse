'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
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
  BookOpen
} from 'lucide-react'

export default function UniversitiesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('all')
  const [selectedRanking, setSelectedRanking] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  
  // Sample university data - in real app this would come from API
  const universities = [
    {
      id: 1,
      name: 'Harvard University',
      location: 'Cambridge, MA',
      country: 'USA',
      rating: 4.9,
      ranking: 1,
      students: '23,000+',
      programs: 50,
      image: '/api/placeholder/400/300'
    },
    {
      id: 2,
      name: 'Stanford University',
      location: 'Stanford, CA',
      country: 'USA',
      rating: 4.8,
      ranking: 2,
      students: '17,000+',
      programs: 45,
      image: '/api/placeholder/400/300'
    },
    {
      id: 3,
      name: 'MIT',
      location: 'Cambridge, MA',
      country: 'USA',
      rating: 4.9,
      ranking: 3,
      students: '11,000+',
      programs: 42,
      image: '/api/placeholder/400/300'
    },
    {
      id: 4,
      name: 'University of Oxford',
      location: 'Oxford',
      country: 'UK',
      rating: 4.8,
      ranking: 4,
      students: '24,000+',
      programs: 48,
      image: '/api/placeholder/400/300'
    },
    {
      id: 5,
      name: 'University of Cambridge',
      location: 'Cambridge',
      country: 'UK',
      rating: 4.8,
      ranking: 5,
      students: '23,000+',
      programs: 46,
      image: '/api/placeholder/400/300'
    },
    {
      id: 6,
      name: 'University of Toronto',
      location: 'Toronto, ON',
      country: 'Canada',
      rating: 4.6,
      ranking: 18,
      students: '97,000+',
      programs: 52,
      image: '/api/placeholder/400/300'
    }
  ]
  
  // Filter universities based on search and filters
  const filteredUniversities = universities.filter(university => {
    const matchesSearch = university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         university.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCountry = selectedCountry === 'all' || university.country === selectedCountry
    
    let matchesRanking = true
    if (selectedRanking !== 'all') {
      switch (selectedRanking) {
        case 'top10':
          matchesRanking = university.ranking <= 10
          break
        case 'top50':
          matchesRanking = university.ranking <= 50
          break
      }
    }
    
    return matchesSearch && matchesCountry && matchesRanking
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section - Clean and Simple */}
      <section className="relative pt-24 pb-12 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700">
        <div className="absolute inset-0 bg-black/10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Explore Top Universities
            </h1>
            <p className="text-xl text-emerald-50 max-w-2xl mx-auto">
              Find your perfect university from our curated selection of world-class institutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-6 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search universities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Filter Buttons */}
            <div className="flex gap-2">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
              >
                <option value="all">All Countries</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
              </select>
              
              <select
                value={selectedRanking}
                onChange={(e) => setSelectedRanking(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
              >
                <option value="all">All Rankings</option>
                <option value="top10">Top 10</option>
                <option value="top50">Top 50</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredUniversities.length} universities
            </p>
          </div>
        </div>
      </section>

      {/* Universities Grid - Clean Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredUniversities.length === 0 ? (
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUniversities.map((university, index) => (
                <motion.div
                  key={university.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  {/* Card Header with Gradient */}
                  <div className="h-32 bg-gradient-to-br from-emerald-100 to-green-100 relative">
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                      <Award className="w-4 h-4 text-emerald-600 mr-1" />
                      <span className="text-sm font-medium">#{university.ranking}</span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <GraduationCap className="w-12 h-12 text-emerald-600/30" />
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                        {university.name}
                      </h3>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">{university.rating}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        {university.location}, {university.country}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-gray-400" />
                        {university.students} students
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-2 text-gray-400" />
                        {university.programs} programs
                      </div>
                    </div>
                    
                    <motion.button 
                      className="mt-6 w-full py-2 px-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium rounded-lg hover:shadow-md transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
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
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-600">
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
    </div>
  )
}