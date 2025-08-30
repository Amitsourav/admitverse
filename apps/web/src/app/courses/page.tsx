'use client'

import Link from 'next/link'
import { ArrowLeft, Search, BookOpen, Clock, DollarSign } from 'lucide-react'

export default function CoursesPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Courses</h1>
          <p className="text-lg text-gray-600">
            Discover degree programs and courses offered by universities worldwide.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search courses by name, degree type, or field..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          {['All', 'Bachelor\'s', 'Master\'s', 'PhD', 'Engineering', 'Business', 'Computer Science', 'Medicine'].map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'All' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Coming Soon Message */}
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Course Listings Coming Soon
            </h2>
            <p className="text-gray-600 mb-6">
              We're building a comprehensive database of courses and degree programs. 
              Check our admin panel to see the course management system.
            </p>
            <div className="space-x-4">
              <Link 
                href="/admin"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
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

        {/* Sample Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {[
            {
              name: "Master of Science in Computer Science",
              university: "Stanford University",
              duration: "2 years",
              fees: "$55,000/year",
              type: "Master's"
            },
            {
              name: "Bachelor of Engineering",
              university: "MIT",
              duration: "4 years", 
              fees: "$53,000/year",
              type: "Bachelor's"
            },
            {
              name: "MBA",
              university: "Harvard Business School",
              duration: "2 years",
              fees: "$73,000/year", 
              type: "Master's"
            }
          ].map((course, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {course.type}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.name}</h3>
                <p className="text-sm text-gray-600">{course.university}</p>
              </div>
              
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  {course.fees}
                </div>
              </div>
              
              <div className="mt-4">
                <button className="w-full px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition-colors">
                  View Details (Coming Soon)
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}