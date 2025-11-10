'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import TopBanner from '@/components/TopBanner'
import Footer from '@/components/Footer'
import FloatingActions from '@/components/FloatingActions'
import { useAISearch } from '@/hooks/useAISearch'
import { 
  Search, 
  Sparkles, 
  MapPin, 
  Star, 
  Users, 
  BookOpen, 
  GraduationCap, 
  Globe, 
  ChevronRight,
  Loader2,
  Bot,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Clock,
  Award
} from 'lucide-react'
import Link from 'next/link'

export default function AISearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [searchTerm, setSearchTerm] = useState(query)
  const { searchWithAI, isSearching, searchResults, error } = useAISearch()
  const [showAIResponse, setShowAIResponse] = useState(true)

  // Perform AI search when page loads or query changes
  useEffect(() => {
    if (query) {
      setSearchTerm(query)
      handleAISearch(query)
    }
  }, [query])

  // Check for stored AI results from home page
  useEffect(() => {
    const storedResults = sessionStorage.getItem('aiSearchResults')
    if (storedResults) {
      try {
        const results = JSON.parse(storedResults)
        // Use the stored results directly
        // This would need to be integrated with the hook
        sessionStorage.removeItem('aiSearchResults')
      } catch (e) {
        console.error('Error parsing stored results:', e)
      }
    }
  }, [])

  const handleAISearch = async (term: string = searchTerm) => {
    if (term.trim()) {
      await searchWithAI(term)
    }
  }

  const handleNewSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim() && searchTerm !== query) {
      // Update URL with new search query
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchTerm)}&ai=true`)
      handleAISearch(searchTerm)
    }
  }

  return (
    <>
      <TopBanner />
      <Navigation />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Search Header */}
          <div className="max-w-4xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-8 h-8 text-emerald-500" />
                <h1 className="text-3xl font-bold text-gray-900">AI-Powered Search</h1>
                <Sparkles className="w-8 h-8 text-emerald-500" />
              </div>
              <p className="text-gray-600">
                Using ChatGPT to understand and find exactly what you're looking for
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onSubmit={handleNewSearch}
              className="relative"
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ask me anything about universities, courses, or study destinations..."
                className="w-full pl-14 pr-32 py-5 text-lg bg-white rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-emerald-300/50 border border-gray-200"
              />
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <button
                type="submit"
                disabled={isSearching || !searchTerm.trim()}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Bot className="w-4 h-4" />
                    <span>AI Search</span>
                  </>
                )}
              </button>
            </motion.form>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto mb-8"
            >
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                {error}
              </div>
            </motion.div>
          )}

          {/* Loading State */}
          {isSearching && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="relative">
                    <Bot className="w-16 h-16 text-emerald-500" />
                    <div className="absolute inset-0 animate-ping">
                      <Bot className="w-16 h-16 text-emerald-500 opacity-30" />
                    </div>
                  </div>
                  <p className="text-lg font-medium text-gray-700">AI is analyzing your query...</p>
                  <p className="text-sm text-gray-500">Understanding context and searching across all databases</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Search Results */}
          {searchResults && !isSearching && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-6xl mx-auto"
            >
              {/* AI Response Section */}
              {showAIResponse && searchResults.naturalResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl shadow-lg p-6 border border-emerald-200">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                          <Bot className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <MessageSquare className="w-5 h-5" />
                          AI Understanding
                        </h3>
                        <div className="prose prose-sm text-gray-700 whitespace-pre-line">
                          {searchResults.naturalResponse}
                        </div>
                        
                        {/* Search Intent & Filters */}
                        {searchResults.interpretation && (
                          <div className="mt-4 pt-4 border-t border-emerald-200">
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">
                                Type: {searchResults.interpretation.searchType}
                              </span>
                              {searchResults.interpretation.filters.country && (
                                <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">
                                  Country: {searchResults.interpretation.filters.country}
                                </span>
                              )}
                              {searchResults.interpretation.filters.field && (
                                <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">
                                  Field: {searchResults.interpretation.filters.field}
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Suggestions */}
                        {searchResults.interpretation?.suggestions && searchResults.interpretation.suggestions.length > 0 && (
                          <div className="mt-4">
                            <p className="text-sm font-medium text-gray-600 mb-2">Related searches:</p>
                            <div className="flex flex-wrap gap-2">
                              {searchResults.interpretation.suggestions.map((suggestion, index) => (
                                <button
                                  key={index}
                                  onClick={() => {
                                    setSearchTerm(suggestion)
                                    handleAISearch(suggestion)
                                  }}
                                  className="px-3 py-1 bg-emerald-100 hover:bg-emerald-200 rounded-full text-sm text-emerald-700 transition-colors"
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Results Summary */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-lg text-gray-700">
                  Found <span className="font-semibold text-emerald-600">{searchResults.totalResults}</span> results for "{query}"
                </p>
                {searchResults.fallbackMode && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                    Basic Search Mode
                  </span>
                )}
              </div>

              {/* Universities Results */}
              {searchResults.results.universities.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-emerald-500" />
                    Universities ({searchResults.results.universities.length})
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.results.universities.map((university, index) => (
                      <motion.div
                        key={university.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link href={`/universities/${university.slug || university.id}`}>
                          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer h-full">
                            <div className="relative h-48 overflow-hidden">
                              <img
                                src={university.image || 'https://images.unsplash.com/photo-1562774053-701939374585?w=400'}
                                alt={university.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                                <span className="text-sm font-semibold text-emerald-600">
                                  Rank #{university.ranking}
                                </span>
                              </div>
                            </div>
                            <div className="p-6">
                              <h3 className="text-xl font-semibold mb-2 group-hover:text-emerald-600 transition-colors">
                                {university.name}
                              </h3>
                              <p className="text-gray-600 mb-4 flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {university.location}
                              </p>
                              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                                <span className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500" />
                                  {university.rating}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {university.students} students
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold text-emerald-600">
                                  {university.tuitionFee}
                                </span>
                                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Courses Results */}
              {searchResults.results.courses.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-emerald-500" />
                    Courses ({searchResults.results.courses.length})
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.results.courses.map((course, index) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link href={`/courses/${course.slug || course.id}`}>
                          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer h-full">
                            <div className="mb-4">
                              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-3">
                                <BookOpen className="w-6 h-6 text-emerald-600" />
                              </div>
                              <h3 className="text-xl font-semibold mb-2 hover:text-emerald-600 transition-colors">
                                {course.name}
                              </h3>
                              <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                            </div>
                            <div className="space-y-2 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-emerald-500" />
                                <span>{course.level}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-emerald-500" />
                                <span>{course.duration}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-emerald-500" />
                                <span>{course.field}</span>
                              </div>
                            </div>
                            <div className="mt-4 pt-4 border-t">
                              <div className="flex flex-wrap gap-1">
                                {course.skills.slice(0, 3).map((skill: string, i: number) => (
                                  <span key={i} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Countries Results */}
              {searchResults.results.countries.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Globe className="w-6 h-6 text-emerald-500" />
                    Study Destinations ({searchResults.results.countries.length})
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.results.countries.map((country, index) => (
                      <motion.div
                        key={country.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link href={`/countries/${country.slug || country.id}`}>
                          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer h-full">
                            <div className="relative h-48 overflow-hidden">
                              <img
                                src={country.image}
                                alt={country.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="text-2xl font-bold mb-1">{country.name}</h3>
                                <p className="text-sm opacity-90">{country.continent}</p>
                              </div>
                            </div>
                            <div className="p-6">
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                  <p className="text-sm text-gray-600 mb-1">Universities</p>
                                  <p className="text-lg font-semibold text-emerald-600">
                                    {country.universities}+
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600 mb-1">Avg. Tuition</p>
                                  <p className="text-lg font-semibold text-gray-900">
                                    {country.averageTuition}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600 mb-2">Popular Programs</p>
                                <div className="flex flex-wrap gap-1">
                                  {country.popularPrograms.slice(0, 3).map((program: string, i: number) => (
                                    <span key={i} className="px-2 py-1 bg-emerald-100 rounded text-xs text-emerald-700">
                                      {program}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results */}
              {searchResults.totalResults === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No results found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search terms or browse our categories
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      <FloatingActions />
      <Footer />
    </>
  )
}