'use client'

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic'
export const revalidate = 0

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FloatingActions from '@/components/FloatingActions'
import { Search, Filter, MapPin, Star, Users, BookOpen, GraduationCap, Globe } from 'lucide-react'
import Link from 'next/link'

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [searchTerm, setSearchTerm] = useState(query)

  useEffect(() => {
    setSearchTerm(query)
  }, [query])

  // Mock search results data
  const mockResults = {
    universities: [
      {
        name: 'Harvard University',
        location: 'Cambridge, MA, USA',
        rating: 4.9,
        students: '23,000+',
        image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400',
        programs: ['Medicine', 'Business', 'Law', 'Engineering'],
        tuition: '$54,000/year'
      },
      {
        name: 'Stanford University', 
        location: 'Stanford, CA, USA',
        rating: 4.8,
        students: '17,000+',
        image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400',
        programs: ['Computer Science', 'Business', 'Engineering', 'Medicine'],
        tuition: '$56,000/year'
      },
      {
        name: 'MIT',
        location: 'Cambridge, MA, USA', 
        rating: 4.9,
        students: '11,000+',
        image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400',
        programs: ['Engineering', 'Computer Science', 'Physics', 'Mathematics'],
        tuition: '$55,000/year'
      }
    ],
    courses: [
      {
        name: 'Computer Science',
        universities: '1,200+ universities',
        avgSalary: '$95,000',
        duration: '4 years',
        type: 'Bachelor\'s'
      },
      {
        name: 'Business Administration',
        universities: '800+ universities', 
        avgSalary: '$85,000',
        duration: '2 years',
        type: 'Master\'s'
      }
    ],
    countries: [
      {
        name: 'United States',
        universities: '500+ universities',
        students: '1M+ international students',
        flag: '🇺🇸'
      },
      {
        name: 'United Kingdom',
        universities: '300+ universities',
        students: '500K+ international students', 
        flag: '🇬🇧'
      }
    ]
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Update URL with new search term
    window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Search Header */}
      <section className="pt-24 pb-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Search Results
            </h1>
            {query && (
              <p className="text-lg text-gray-600">
                Showing results for "<span className="font-semibold text-emerald-600">{query}</span>"
              </p>
            )}
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search universities, courses, or countries..."
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {query ? (
            <div className="space-y-12">
              
              {/* Universities Results */}
              {mockResults.universities.length > 0 && (
                <div>
                  <div className="flex items-center mb-6">
                    <GraduationCap className="w-6 h-6 text-emerald-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-900">Universities</h2>
                    <span className="ml-3 text-gray-500">({mockResults.universities.length} results)</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockResults.universities.map((university, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                      >
                        <img
                          src={university.image}
                          alt={university.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{university.name}</h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span className="text-sm">{university.location}</span>
                          </div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 mr-1" />
                              <span className="text-sm text-gray-600">{university.rating}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Users className="w-4 h-4 mr-1" />
                              <span className="text-sm">{university.students}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-4">
                            {university.programs.slice(0, 3).map((program, i) => (
                              <span key={i} className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded">
                                {program}
                              </span>
                            ))}
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-emerald-600">{university.tuition}</span>
                            <Link 
                              href={`/universities/${university.name.toLowerCase().replace(/\s+/g, '-')}`}
                              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Courses Results */}
              {mockResults.courses.length > 0 && (
                <div>
                  <div className="flex items-center mb-6">
                    <BookOpen className="w-6 h-6 text-purple-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
                    <span className="ml-3 text-gray-500">({mockResults.courses.length} results)</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockResults.courses.map((course, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                      >
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{course.name}</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Available at:</span>
                            <span className="font-medium">{course.universities}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Average Salary:</span>
                            <span className="font-medium text-green-600">{course.avgSalary}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Duration:</span>
                            <span className="font-medium">{course.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Level:</span>
                            <span className="font-medium">{course.type}</span>
                          </div>
                        </div>
                        <Link 
                          href={`/courses/${course.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block text-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                        >
                          Explore Programs
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Countries Results */}
              {mockResults.countries.length > 0 && (
                <div>
                  <div className="flex items-center mb-6">
                    <Globe className="w-6 h-6 text-blue-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-900">Countries</h2>
                    <span className="ml-3 text-gray-500">({mockResults.countries.length} results)</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockResults.countries.map((country, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                      >
                        <div className="flex items-center mb-4">
                          <span className="text-4xl mr-4">{country.flag}</span>
                          <h3 className="text-xl font-bold text-gray-900">{country.name}</h3>
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Universities:</span>
                            <span className="font-medium">{country.universities}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">International Students:</span>
                            <span className="font-medium">{country.students}</span>
                          </div>
                        </div>
                        <Link 
                          href={`/countries/${country.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block text-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          Study in {country.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Start Your Search</h2>
              <p className="text-gray-600">Enter keywords to find universities, courses, or countries</p>
            </div>
          )}

        </div>
      </section>

      <Footer />
      <FloatingActions />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <Navigation />
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
        <FloatingActions />
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}