'use client'

import { useState, useEffect } from 'react'
import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Users, GraduationCap, DollarSign, Clock, Globe, Star, TrendingUp, CheckCircle, ExternalLink, Heart, Share2 } from 'lucide-react'
import Navigation from '@/components/Navigation'
import TopBanner from '@/components/TopBanner'
import Footer from '@/components/Footer'
import { CountryDetail, getCountryDetailBySlug } from '@/data/countries'


export default function CountryDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [country, setCountry] = useState<CountryDetail | null>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [savedCountry, setSavedCountry] = useState(false)

  useEffect(() => {
    const countryData = getCountryDetailBySlug(slug)
    if (countryData) {
      setCountry(countryData)
    } else {
      notFound()
    }
  }, [slug])

  if (!country) {
    return <div>Loading...</div>
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'universities', label: 'Universities' },
    { id: 'programs', label: 'Programs' },
    { id: 'costs', label: 'Costs' },
    { id: 'visa', label: 'Visa Info' }
  ]

  return (
    <div className="min-h-screen bg-white">
      <TopBanner />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img
          src={country.heroImage}
          alt={country.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="flex items-center mb-4">
              <Link href="/countries">
                <motion.button 
                  className="flex items-center text-white/80 hover:text-white transition-colors"
                  whileHover={{ x: -5 }}
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Countries
                </motion.button>
              </Link>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-4">
                <span className="text-6xl mr-4">{country.flag}</span>
                <div>
                  <h1 className="text-5xl font-bold text-white mb-2">{country.name}</h1>
                  <p className="text-xl text-white/90">{country.continent} • {country.capital}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 text-white/90">
                <div className="flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  {country.universities.toLocaleString()} Universities
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  {country.internationalStudents} International Students
                </div>
                <div className="flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  {country.language}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex gap-3">
          <motion.button
            onClick={() => setSavedCountry(!savedCountry)}
            className={`p-3 rounded-full backdrop-blur-sm border transition-all ${
              savedCountry 
                ? 'bg-red-500 border-red-500 text-white' 
                : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className={`w-5 h-5 ${savedCountry ? 'fill-current' : ''}`} />
          </motion.button>
          <motion.button
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-white hover:bg-white/30 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 className="w-5 h-5" />
          </motion.button>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-16 z-40 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            {/* About Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">About {country.name}</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">{country.description}</p>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Study in {country.name}?</h3>
                <div className="space-y-3">
                  {country.whyStudy.map((reason, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Quick Facts */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Facts</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capital:</span>
                      <span className="font-medium">{country.capital}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Language:</span>
                      <span className="font-medium">{country.language}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Currency:</span>
                      <span className="font-medium">{country.currency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Timezone:</span>
                      <span className="font-medium">{country.timezone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg. Tuition:</span>
                      <span className="font-medium">{country.averageTuition}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Universities Tab */}
        {activeTab === 'universities' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Top Universities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {country.topUniversities.map((university, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <img
                    src={university.image}
                    alt={university.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-emerald-600 font-medium">#{university.ranking} Global</span>
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{university.name}</h3>
                    <p className="text-gray-600 mb-4">{university.location}</p>
                    <button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Programs Tab */}
        {activeTab === 'programs' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Programs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {country.popularPrograms.map((program, index) => (
                <motion.div
                  key={index}
                  className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 hover:bg-emerald-100 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="font-bold text-gray-900 mb-2">{program}</h3>
                  <div className="flex items-center text-emerald-600">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    <span className="text-sm">High demand</span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Admission Requirements</h3>
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {country.admissionRequirements.map((requirement, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Costs Tab */}
        {activeTab === 'costs' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Cost of Living</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Accommodation</h3>
                <p className="text-2xl font-bold text-blue-600">{country.livingCost.accommodation}</p>
              </div>
              
              <div className="bg-white border rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Food</h3>
                <p className="text-2xl font-bold text-green-600">{country.livingCost.food}</p>
              </div>
              
              <div className="bg-white border rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Transport</h3>
                <p className="text-2xl font-bold text-purple-600">{country.livingCost.transport}</p>
              </div>
              
              <div className="bg-white border rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Miscellaneous</h3>
                <p className="text-2xl font-bold text-orange-600">{country.livingCost.miscellaneous}</p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Scholarships Available</h3>
              <div className="space-y-4">
                {country.scholarships.map((scholarship, index) => (
                  <div key={index} className="bg-emerald-50 border border-emerald-100 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-900">{scholarship.name}</h4>
                      <span className="text-emerald-600 font-bold">{scholarship.amount}</span>
                    </div>
                    <p className="text-gray-600">{scholarship.eligibility}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Work Rights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-2">During Study</h4>
                  <p className="text-gray-700">{country.workRights.duringStudy}</p>
                </div>
                <div className="bg-green-50 border border-green-100 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-2">After Graduation</h4>
                  <p className="text-gray-700">{country.workRights.afterGraduation}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Visa Tab */}
        {activeTab === 'visa' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Visa Information</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white border rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{country.visaInfo.type}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <div className="flex items-center mb-2">
                        <Clock className="w-5 h-5 text-emerald-600 mr-2" />
                        <span className="font-medium text-gray-900">Processing Time</span>
                      </div>
                      <p className="text-gray-600">{country.visaInfo.processingTime}</p>
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Requirements</h4>
                  <div className="space-y-3">
                    {country.visaInfo.requirements.map((requirement, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Need Help?</h4>
                  <p className="text-gray-600 mb-6">Our visa experts can guide you through the application process.</p>
                  <Link href="/contact">
                    <motion.button
                      className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Visa Assistance
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-emerald-600 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Journey to {country.name}?
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Get personalized guidance from our education experts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-all shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book Free Consultation
                </motion.button>
              </Link>
              <Link href="/universities">
                <motion.button
                  className="px-8 py-4 bg-emerald-700 text-white font-semibold rounded-xl hover:bg-emerald-800 transition-all border border-emerald-500"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore Universities
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}