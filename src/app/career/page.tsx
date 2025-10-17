'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { 
  Briefcase, 
  Users, 
  Target, 
  Heart, 
  TrendingUp, 
  Award,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Star,
  Sparkles,
  GraduationCap,
  Globe,
  Rocket,
  Coffee,
  Gift,
  Home,
  Calendar,
  Shield,
  Zap,
  ChevronRight,
  Mail,
  Phone
} from 'lucide-react'

interface JobOpening {
  id: number
  title: string
  department: string
  location: string
  type: string
  experience: string
  salary: string
  description: string
  requirements: string[]
  isHot?: boolean
}

export default function CareerPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const [expandedJob, setExpandedJob] = useState<number | null>(null)
  const [hoveredValue, setHoveredValue] = useState<number | null>(null)
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null)

  // Job openings data
  const jobOpenings: JobOpening[] = [
    {
      id: 1,
      title: 'Senior Education Counselor',
      department: 'Counseling',
      location: 'Delhi, Mumbai, Bangalore',
      type: 'Full-time',
      experience: '3-5 years',
      salary: '₹6-10 LPA',
      description: 'Guide students through their admission journey, from profile evaluation to visa assistance.',
      requirements: [
        'Experience in education counseling or admissions',
        'Knowledge of international education systems',
        'Excellent communication and interpersonal skills',
        'Fluency in English and Hindi'
      ],
      isHot: true
    },
    {
      id: 2,
      title: 'Digital Marketing Manager',
      department: 'Marketing',
      location: 'Remote/Hybrid',
      type: 'Full-time',
      experience: '4-6 years',
      salary: '₹8-12 LPA',
      description: 'Lead our digital marketing efforts to reach and engage with students across India and abroad.',
      requirements: [
        'Proven experience in digital marketing and SEO',
        'Experience with Google Ads, Facebook Ads, and LinkedIn',
        'Strong analytical skills and ROI-focused mindset',
        'Experience in education sector is a plus'
      ]
    },
    {
      id: 3,
      title: 'Business Development Executive',
      department: 'Sales',
      location: 'Pan India',
      type: 'Full-time',
      experience: '2-4 years',
      salary: '₹4-7 LPA + Incentives',
      description: 'Build partnerships with universities and expand our network of educational institutions.',
      requirements: [
        'Strong sales and negotiation skills',
        'Experience in B2B sales',
        'Willingness to travel',
        'Target-oriented mindset'
      ],
      isHot: true
    },
    {
      id: 4,
      title: 'Content Writer - Education',
      department: 'Content',
      location: 'Remote',
      type: 'Full-time',
      experience: '1-3 years',
      salary: '₹3-5 LPA',
      description: 'Create engaging content about universities, courses, and study abroad programs.',
      requirements: [
        'Excellent writing skills in English',
        'Research skills and attention to detail',
        'Knowledge of SEO best practices',
        'Interest in education and career guidance'
      ]
    },
    {
      id: 5,
      title: 'Full Stack Developer',
      department: 'Technology',
      location: 'Bangalore/Remote',
      type: 'Full-time',
      experience: '3-5 years',
      salary: '₹10-15 LPA',
      description: 'Build and maintain our web platform using modern technologies.',
      requirements: [
        'Experience with React, Node.js, and Next.js',
        'Strong knowledge of TypeScript',
        'Experience with cloud platforms (AWS/GCP)',
        'Understanding of CI/CD pipelines'
      ]
    },
    {
      id: 6,
      title: 'Student Success Manager',
      department: 'Operations',
      location: 'Delhi NCR',
      type: 'Full-time',
      experience: '2-4 years',
      salary: '₹5-8 LPA',
      description: 'Ensure student satisfaction throughout their admission journey and post-enrollment.',
      requirements: [
        'Experience in customer success or support',
        'Strong problem-solving abilities',
        'Empathy and patience in dealing with students',
        'Knowledge of CRM systems'
      ]
    }
  ]

  // Filter departments
  const departments = ['All', 'Counseling', 'Marketing', 'Sales', 'Content', 'Technology', 'Operations']
  
  // Filter jobs by department
  const filteredJobs = selectedDepartment === 'All' 
    ? jobOpenings 
    : jobOpenings.filter(job => job.department === selectedDepartment)

  // Company values
  const companyValues = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Student First',
      description: 'Every decision we make prioritizes student success and satisfaction'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Collaborative Spirit',
      description: 'We work together, celebrate together, and grow together as one team'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, every single day'
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Innovation',
      description: 'We embrace new ideas and technologies to better serve our students'
    }
  ]

  // Benefits
  const benefits = [
    { icon: <DollarSign className="w-6 h-6" />, title: 'Competitive Salary', description: 'Industry-best compensation packages' },
    { icon: <Shield className="w-6 h-6" />, title: 'Health Insurance', description: 'Comprehensive health coverage for you and family' },
    { icon: <Home className="w-6 h-6" />, title: 'Work from Home', description: 'Flexible remote and hybrid options' },
    { icon: <Calendar className="w-6 h-6" />, title: 'Paid Time Off', description: '21 days paid leave + public holidays' },
    { icon: <GraduationCap className="w-6 h-6" />, title: 'Learning Budget', description: '₹25,000 annual learning & development fund' },
    { icon: <Gift className="w-6 h-6" />, title: 'Performance Bonus', description: 'Quarterly and annual performance incentives' },
    { icon: <Coffee className="w-6 h-6" />, title: 'Team Outings', description: 'Regular team events and celebrations' },
    { icon: <TrendingUp className="w-6 h-6" />, title: 'Career Growth', description: 'Clear progression paths and mentorship' }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-600 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            >
              Join Our Mission to
              <motion.span 
                className="block bg-gradient-to-r from-emerald-200 to-green-200 bg-clip-text text-transparent mt-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Transform Education
              </motion.span>
            </motion.h1>
            <p className="text-xl text-emerald-50 max-w-3xl mx-auto mb-8">
              Be part of a team that's helping thousands of students achieve their dreams of quality education in India and abroad
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30 hover:bg-white/25 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-emerald-100">Team Members</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30 hover:bg-white/25 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-3xl font-bold text-white">5</div>
                <div className="text-emerald-100">Office Locations</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30 hover:bg-white/25 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-emerald-100">Students Helped</div>
              </motion.div>
            </div>

            <motion.a
              href="#openings"
              className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Open Positions
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16 bg-emerald-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These values guide everything we do at AdmitVerse
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group cursor-pointer"
                onMouseEnter={() => setHoveredValue(index)}
                onMouseLeave={() => setHoveredValue(null)}
              >
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-600 group-hover:shadow-lg transition-all duration-300"
                  animate={{
                    scale: hoveredValue === index ? 1.1 : 1,
                    rotate: hoveredValue === index ? 5 : 0
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {value.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">{value.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section id="openings" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Current Openings
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find your perfect role and grow with us
            </p>
          </motion.div>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedDepartment === dept
                    ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-400 hover:text-emerald-600'
                }`}
              >
                {dept}
                {dept !== 'All' && (
                  <span className="ml-2 text-sm opacity-75">
                    ({jobOpenings.filter(job => job.department === dept).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            <AnimatePresence>
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-emerald-200"
                >
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                          {job.isHot && (
                            <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                              HOT
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-1" />
                            {job.department}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {job.type}
                          </span>
                          <span className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {job.salary}
                          </span>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedJob === job.id ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 md:mt-0"
                      >
                        <ChevronRight className="w-6 h-6 text-gray-400" />
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {expandedJob === job.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 pt-6 border-t border-gray-100"
                        >
                          <p className="text-gray-700 mb-4">{job.description}</p>
                          
                          <div className="mb-4">
                            <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                            <ul className="space-y-2">
                              {job.requirements.map((req, idx) => (
                                <li key={idx} className="flex items-start text-gray-600">
                                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex gap-4">
                            <motion.button
                              className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all duration-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation()
                                window.location.href = `mailto:careers@admitverse.com?subject=Application for ${job.title}`
                              }}
                            >
                              Apply Now
                            </motion.button>
                            <motion.button
                              className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Save for Later
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Work at AdmitVerse?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We believe in taking care of our team so they can take care of our students
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100 hover:border-emerald-200"
                onMouseEnter={() => setHoveredBenefit(index)}
                onMouseLeave={() => setHoveredBenefit(null)}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl flex items-center justify-center mb-4 text-emerald-600"
                  animate={{
                    rotate: hoveredBenefit === index ? 360 : 0
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {benefit.icon}
                </motion.div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">{benefit.title}</h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Life at AdmitVerse */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Life at AdmitVerse
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join a vibrant, inclusive workplace where your growth matters
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-8 text-white"
            >
              <Sparkles className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Innovation First</h3>
              <p className="text-emerald-50">
                We encourage creative thinking and new ideas. Your voice matters, and your innovations can shape our future.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-8 text-white relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
            >
              <Globe className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Global Impact</h3>
              <p className="text-emerald-50">
                Help students from around the world achieve their dreams. Your work directly impacts thousands of lives.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
            >
              <Award className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Growth Focused</h3>
              <p className="text-green-50">
                Regular training, mentorship programs, and clear career progression paths to help you reach your potential.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-600 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Join us in our mission to democratize quality education
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="mailto:careers@admitverse.com"
                className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5 mr-2" />
                Send Your Resume
              </motion.a>
              <motion.a
                href="tel:+919876543210"
                className="inline-flex items-center px-8 py-4 bg-emerald-700 text-white font-semibold rounded-xl hover:bg-emerald-800 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call HR Team
              </motion.a>
            </div>

            <p className="mt-8 text-emerald-100">
              Can't find a suitable position? Send your resume to{' '}
              <a href="mailto:careers@admitverse.com" className="underline font-semibold">
                careers@admitverse.com
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}