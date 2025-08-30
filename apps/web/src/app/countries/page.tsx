'use client'

import Link from 'next/link'
import { ArrowLeft, Search, MapPin, Users, GraduationCap } from 'lucide-react'

export default function CountriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700">
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span className="font-medium">Back to Home</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AdmitVerse
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Countries</h1>
          <p className="text-lg text-gray-600">
            Explore study destinations around the world and find the perfect country for your education.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search countries by name, region, or language..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Regions */}
        <div className="flex flex-wrap gap-4 mb-8">
          {['All', 'North America', 'Europe', 'Asia Pacific', 'UK & Ireland', 'Middle East'].map((region) => (
            <button
              key={region}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                region === 'All' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Coming Soon Message */}
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="h-12 w-12 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Country Guides Coming Soon
            </h2>
            <p className="text-gray-600 mb-6">
              We're creating comprehensive guides for studying in different countries. 
              This will include visa requirements, costs, and application processes.
            </p>
            <div className="space-x-4">
              <Link 
                href="/admin"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
              >
                View Admin Panel
              </Link>
              <Link 
                href="/"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Popular Countries */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {[
            {
              name: "United States",
              flag: "🇺🇸",
              universities: "4,000+",
              students: "1M+ International",
              popular: "Engineering, Business, Computer Science"
            },
            {
              name: "United Kingdom",
              flag: "🇬🇧", 
              universities: "130+",
              students: "500K+ International",
              popular: "Law, Medicine, Business"
            },
            {
              name: "Canada",
              flag: "🇨🇦",
              universities: "100+", 
              students: "800K+ International",
              popular: "Engineering, Healthcare, IT"
            },
            {
              name: "Australia",
              flag: "🇦🇺",
              universities: "40+",
              students: "700K+ International", 
              popular: "Mining, Agriculture, Tourism"
            },
            {
              name: "Germany",
              flag: "🇩🇪",
              universities: "400+",
              students: "400K+ International",
              popular: "Engineering, Research, Technology"
            },
            {
              name: "Singapore",
              flag: "🇸🇬",
              universities: "30+",
              students: "100K+ International",
              popular: "Finance, Technology, Business"
            }
          ].map((country, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{country.flag}</span>
                <h3 className="text-lg font-semibold text-gray-900">{country.name}</h3>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  {country.universities} universities
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {country.students}
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">Popular Fields:</p>
                <p className="text-sm text-gray-700">{country.popular}</p>
              </div>
              
              <button className="w-full px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-md hover:bg-purple-100 transition-colors">
                Learn More (Coming Soon)
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}