'use client'

import { useState, useEffect } from 'react'
import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Clock, DollarSign, Users, BookOpen, TrendingUp, Award, MapPin, Star, CheckCircle, GraduationCap, Briefcase, Target, Heart, Share2 } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { CourseDetail, getCourseDetailBySlug } from '@/data/courses'



export default function CourseDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [course, setCourse] = useState<CourseDetail | null>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [savedCourse, setSavedCourse] = useState(false)

  useEffect(() => {
    const courseData = getCourseDetailBySlug(slug)
    if (courseData) {
      setCourse(courseData)
    } else {
      notFound()
    }
  }, [slug])

  if (!course) {
    return <div>Loading...</div>
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'universities', label: 'Universities' },
    { id: 'careers', label: 'Careers' },
    { id: 'requirements', label: 'Requirements' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 h-[70vh] bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 overflow-hidden">
        <motion.img
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={course.heroImage}
          alt={course.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/50" />
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="flex items-center mb-4">
              <Link href="/courses">
                <motion.button 
                  className="flex items-center text-white/80 hover:text-white transition-colors"
                  whileHover={{ x: -5 }}
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Courses
                </motion.button>
              </Link>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-4">
                <motion.span 
                  className="text-5xl mr-4"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
                >
                  {course.icon}
                </motion.span>
                <div>
                  <h1 className="text-5xl font-bold text-white mb-2">{course.name}</h1>
                  <p className="text-xl text-emerald-100">{course.category} • {course.level}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 text-emerald-100">
                <motion.div 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Clock className="w-5 h-5 mr-2" />
                  {course.duration}
                </motion.div>
                <motion.div 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <DollarSign className="w-5 h-5 mr-2" />
                  {course.averageSalary}
                </motion.div>
                <motion.div 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  {course.jobGrowth} Growth
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex gap-3">
          <motion.button
            onClick={() => setSavedCourse(!savedCourse)}
            className={`p-3 rounded-full backdrop-blur-sm border transition-all ${
              savedCourse 
                ? 'bg-red-500 border-red-500 text-white' 
                : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className={`w-5 h-5 ${savedCourse ? 'fill-current' : ''}`} />
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
      <section className="sticky top-16 z-40 bg-white shadow-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </motion.button>
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6">About {course.name}</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">{course.overview}</p>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Skills You'll Learn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.keySkills.map((skill, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Quick Facts */}
              <div className="lg:col-span-1">
                <motion.div 
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Facts</h3>
                  <div className="space-y-4">
                    <motion.div 
                      className="flex justify-between"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-gray-600">Level:</span>
                      <span className="font-medium">{course.level}</span>
                    </motion.div>
                    <motion.div 
                      className="flex justify-between"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{course.duration}</span>
                    </motion.div>
                    <motion.div 
                      className="flex justify-between"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{course.category}</span>
                    </motion.div>
                    <motion.div 
                      className="flex justify-between"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-gray-600">Job Growth:</span>
                      <span className="font-medium text-emerald-600">{course.jobGrowth}</span>
                    </motion.div>
                    <motion.div 
                      className="flex justify-between"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-gray-600">Avg. Salary:</span>
                      <span className="font-medium text-emerald-600">{course.averageSalary}</span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Specializations */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular Specializations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {course.specializations.map((spec, index) => (
                  <motion.div
                    key={index}
                    className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 hover:bg-emerald-100 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="font-medium text-gray-900 text-center">{spec}</h4>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Curriculum Tab */}
        {activeTab === 'curriculum' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Course Curriculum</h2>
            <div className="space-y-6">
              {course.coursework.map((yearData, index) => (
                <motion.div
                  key={index}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{yearData.semester}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {yearData.subjects.map((subject, subIndex) => (
                      <div key={subIndex} className="flex items-center">
                        <BookOpen className="w-4 h-4 text-emerald-500 mr-3" />
                        <span className="text-gray-700">{subject}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Prerequisites</h3>
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
                <div className="space-y-3">
                  {course.prerequisites.map((prereq, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{prereq}</span>
                    </motion.div>
                  ))}
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Top Universities for {course.name}</h2>
            <div className="space-y-6">
              {course.topUniversities.map((university, index) => (
                <motion.div
                  key={index}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
                    <div className="md:col-span-1">
                      <img
                        src={university.image}
                        alt={university.name}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:col-span-3 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{university.name}</h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 mr-2" />
                            {university.location}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-emerald-600 font-medium">#{university.ranking} Global</div>
                          <div className="text-lg font-bold text-gray-900">{university.tuition}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm text-gray-600">Top-ranked program</span>
                        </div>
                        <Link href="/contact">
                          <motion.button
                            className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Get Info
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Careers Tab */}
        {activeTab === 'careers' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Career Outlook</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">{course.careerOutlook}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <motion.div 
                  className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                  >
                    <DollarSign className="w-8 h-8 text-emerald-600 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="font-bold text-gray-900 mb-2">Average Salary</h3>
                  <motion.p 
                    className="text-2xl font-bold text-emerald-600"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {course.averageSalary}
                  </motion.p>
                </motion.div>
                
                <motion.div 
                  className="bg-teal-50 border border-teal-100 rounded-2xl p-6 text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                  >
                    <TrendingUp className="w-8 h-8 text-teal-600 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="font-bold text-gray-900 mb-2">Job Growth</h3>
                  <motion.p 
                    className="text-2xl font-bold text-teal-600"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    {course.jobGrowth}
                  </motion.p>
                </motion.div>
                
                <motion.div 
                  className="bg-purple-50 border border-purple-100 rounded-2xl p-6 text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                  >
                    <Briefcase className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="font-bold text-gray-900 mb-2">Career Paths</h3>
                  <h3 className="font-bold text-gray-900 mb-2">Career Paths</h3>
                  <motion.p 
                    className="text-2xl font-bold text-purple-600"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    viewport={{ once: true }}
                  >
                    {course.careerPaths.length}+
                  </motion.p>
                </motion.div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Career Paths</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {course.careerPaths.map((career, index) => (
                  <motion.div
                    key={index}
                    className="bg-white border rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center mb-3">
                      <Target className="w-5 h-5 text-emerald-600 mr-2" />
                      <h4 className="font-medium text-gray-900">{career}</h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Industry Connections</h3>
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {course.industryConnections.map((company, index) => (
                    <div key={index} className="flex items-center">
                      <Award className="w-4 h-4 text-emerald-500 mr-3" />
                      <span className="text-gray-700">{company}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Certifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {course.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 hover:bg-yellow-100 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center">
                      <GraduationCap className="w-5 h-5 text-yellow-600 mr-3" />
                      <span className="font-medium text-gray-900">{cert}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Requirements Tab */}
        {activeTab === 'requirements' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Admission Requirements</h2>
            <div className="bg-white border rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {course.admissionRequirements.map((requirement, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-emerald-500 mr-4 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Apply?</h3>
              <p className="text-gray-600 mb-6">Get personalized guidance from our education experts to strengthen your application</p>
              <Link href="/contact">
                <motion.button
                  className="px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Application Support
                </motion.button>
              </Link>
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
              Start Your Journey in {course.name}
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Connect with our experts to find the perfect program and university for your goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-all shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Free Consultation
                </motion.button>
              </Link>
              <Link href="/universities">
                <motion.button
                  className="px-8 py-4 bg-emerald-700 text-white font-semibold rounded-xl hover:bg-emerald-800 transition-all border border-emerald-500"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Find Universities
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