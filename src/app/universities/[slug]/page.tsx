'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { useUniversity } from '@/hooks/useUniversities'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FloatingActions from '@/components/FloatingActions'
import {
  ArrowLeft,
  MapPin,
  Users,
  GraduationCap,
  Star,
  Award,
  Calendar,
  Globe,
  BookOpen,
  Building,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  ExternalLink,
  Mail,
  Phone,
  Download,
  Heart,
  Share2,
  Play
} from 'lucide-react'

export default function UniversityDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const [activeTab, setActiveTab] = useState('overview')
  const [isLiked, setIsLiked] = useState(false)

  // Use dynamic university data from API
  const { university, loading, error } = useUniversity(slug)

  // Extended university data with detailed information (fallback for static data)
  const fallbackUniversities = [
    {
      id: 1,
      name: 'Harvard University',
      slug: 'harvard-university',
      location: 'Cambridge, Massachusetts, USA',
      country: 'United States',
      established: 1636,
      ranking: 1,
      students: '23,000+',
      internationalStudents: '25%',
      acceptance: '3.4%',
      tuition: '$54,000/year',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800',
      description: 'Harvard University is a prestigious Ivy League research university known for its academic excellence, influential alumni, and groundbreaking research across various disciplines.',
      highlights: [
        'Oldest higher education institution in the US',
        'Home to Harvard Business School and Harvard Medical School',
        '8 US Presidents among alumni',
        'Largest academic library system in the world'
      ],
      programs: [
        'Business Administration (MBA)',
        'Medicine (MD)',
        'Law (JD)',
        'Computer Science',
        'Economics',
        'Psychology',
        'Engineering',
        'Public Policy'
      ],
      facilities: [
        'State-of-the-art research laboratories',
        'Widener Library - largest university library',
        'Harvard Art Museums',
        'Athletic facilities and gymnasium',
        '400+ student organizations',
        'On-campus housing for all undergraduates'
      ],
      admissions: {
        requirements: [
          'High school diploma or equivalent',
          'SAT/ACT scores',
          'Letters of recommendation',
          'Personal essay',
          'Extracurricular activities',
          'TOEFL/IELTS for international students'
        ],
        deadlines: {
          'Early Action': 'November 1',
          'Regular Decision': 'January 1',
          'Financial Aid': 'February 1'
        }
      },
      scholarships: [
        'Need-based financial aid (up to full tuition)',
        'Harvard College Scholarship',
        'International Student Aid',
        'Merit-based scholarships for exceptional students'
      ],
      contact: {
        email: 'admissions@harvard.edu',
        phone: '+1 (617) 495-1551',
        website: 'https://www.harvard.edu',
        address: 'Massachusetts Hall, Cambridge, MA 02138'
      }
    },
    {
      id: 2,
      name: 'Stanford University',
      slug: 'stanford-university',
      location: 'Stanford, California, USA',
      country: 'United States',
      established: 1885,
      ranking: 2,
      students: '17,000+',
      internationalStudents: '22%',
      acceptance: '3.9%',
      tuition: '$56,000/year',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800',
      description: 'Stanford University is a leading research university in Silicon Valley, renowned for innovation, entrepreneurship, and academic excellence in technology and sciences.',
      highlights: [
        'Located in the heart of Silicon Valley',
        'Top-ranked engineering and computer science programs',
        'Numerous Nobel Prize winners on faculty',
        'Strong ties to tech industry and startups'
      ],
      programs: [
        'Computer Science',
        'Engineering',
        'Business (MBA)',
        'Medicine',
        'Law',
        'Education',
        'Earth Sciences',
        'Psychology'
      ],
      facilities: [
        'Stanford Research Park',
        'Hoover Institution',
        'Stanford Medical Center',
        'Green Library',
        '650+ student organizations',
        'State-of-the-art athletic facilities'
      ],
      admissions: {
        requirements: [
          'High school diploma',
          'Standardized test scores (SAT/ACT)',
          'Teacher recommendations',
          'Essays and personal statements',
          'Leadership and extracurricular involvement'
        ],
        deadlines: {
          'Restrictive Early Action': 'November 1',
          'Regular Decision': 'January 2',
          'Financial Aid': 'February 15'
        }
      },
      scholarships: [
        'Knight-Hennessy Scholars Program',
        'Need-based Stanford Financial Aid',
        'Athletic scholarships',
        'International student financial aid'
      ],
      contact: {
        email: 'admission@stanford.edu',
        phone: '+1 (650) 723-2091',
        website: 'https://www.stanford.edu',
        address: '450 Serra Mall, Stanford, CA 94305'
      }
    },
    {
      id: 3,
      name: 'MIT',
      slug: 'mit',
      location: 'Cambridge, Massachusetts, USA',
      country: 'United States',
      established: 1861,
      ranking: 3,
      students: '11,000+',
      internationalStudents: '33%',
      acceptance: '7.3%',
      tuition: '$55,000/year',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800',
      description: 'MIT is a world-renowned institution specializing in science, technology, engineering, and mathematics, fostering innovation and groundbreaking research.',
      highlights: [
        '#1 Engineering and Technology programs globally',
        'Cutting-edge research in AI and robotics',
        'Strong alumni network in tech industry',
        'Innovation and entrepreneurship culture'
      ],
      programs: [
        'Computer Science & AI',
        'Electrical Engineering',
        'Mechanical Engineering',
        'Physics',
        'Mathematics',
        'Economics',
        'Architecture',
        'Management (Sloan)'
      ],
      facilities: [
        'MIT.nano - nanoscale research facility',
        'Computer Science and Artificial Intelligence Laboratory',
        'Media Lab',
        'Lincoln Laboratory',
        'MIT Libraries',
        'Recreation and fitness centers'
      ],
      admissions: {
        requirements: [
          'High school completion',
          'SAT/ACT scores',
          'Subject tests in Math and Science',
          'Letters of recommendation',
          'Essays demonstrating fit with MIT culture'
        ],
        deadlines: {
          'Early Action': 'November 1',
          'Regular Action': 'January 1',
          'Financial Aid': 'February 15'
        }
      },
      scholarships: [
        'Need-based financial aid',
        'International student support',
        'Undergraduate Research Opportunities Program (UROP)',
        'Merit-based departmental awards'
      ],
      contact: {
        email: 'admissions@mit.edu',
        phone: '+1 (617) 253-3400',
        website: 'https://www.mit.edu',
        address: '77 Massachusetts Avenue, Cambridge, MA 02139'
      }
    },
    {
      id: 4,
      name: 'University of Oxford',
      slug: 'oxford-university',
      location: 'Oxford, England, UK',
      country: 'United Kingdom',
      established: 1096,
      ranking: 4,
      students: '24,000+',
      internationalStudents: '41%',
      acceptance: '17.5%',
      tuition: '£38,000/year',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800',
      description: 'The University of Oxford is one of the oldest and most prestigious universities in the world, known for its rigorous academic programs and historic collegiate system.',
      highlights: [
        'Oldest university in the English-speaking world',
        'Tutorial system with personalized teaching',
        'Home to the Bodleian Library',
        '28 British Prime Ministers among alumni'
      ],
      programs: [
        'Philosophy, Politics & Economics (PPE)',
        'Medicine',
        'Law',
        'English Literature',
        'History',
        'Mathematics',
        'Physics',
        'Chemistry'
      ],
      facilities: [
        'Bodleian Library - one of Europe\'s oldest libraries',
        '38 colleges with historic architecture',
        'Oxford University Museum of Natural History',
        'Radcliffe Camera',
        'Numerous research institutes',
        'Sports facilities and rowing clubs'
      ],
      admissions: {
        requirements: [
          'A-levels or equivalent qualifications',
          'Oxford admissions test (varies by subject)',
          'Personal statement',
          'Academic reference',
          'Interview (for shortlisted candidates)',
          'English language requirements for international students'
        ],
        deadlines: {
          'UCAS Application': 'October 15',
          'Admissions Tests': 'November (varies)',
          'Interview Period': 'December'
        }
      },
      scholarships: [
        'Rhodes Scholarships',
        'Oxford Bursaries for UK students',
        'Clarendon Scholarships for international students',
        'Subject-specific scholarships'
      ],
      contact: {
        email: 'undergraduate.admissions@ox.ac.uk',
        phone: '+44 1865 288000',
        website: 'https://www.ox.ac.uk',
        address: 'University of Oxford, Oxford OX1 2JD, UK'
      }
    },
    {
      id: 5,
      name: 'University of Cambridge',
      slug: 'cambridge-university',
      location: 'Cambridge, England, UK',
      country: 'United Kingdom',
      established: 1209,
      ranking: 5,
      students: '23,000+',
      internationalStudents: '38%',
      acceptance: '21%',
      tuition: '£38,000/year',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800',
      description: 'The University of Cambridge is a prestigious collegiate research university known for its academic excellence and significant contributions to science, mathematics, and literature.',
      highlights: [
        'Second-oldest university in the English-speaking world',
        '121 Nobel Prize winners affiliated',
        'Strong tradition in mathematics and sciences',
        'Famous alumni include Stephen Hawking and Isaac Newton'
      ],
      programs: [
        'Natural Sciences',
        'Engineering',
        'Mathematics',
        'Medicine',
        'Law',
        'Economics',
        'History',
        'English Literature'
      ],
      facilities: [
        'Cambridge University Library',
        '31 colleges with historic buildings',
        'Cavendish Laboratory',
        'Fitzwilliam Museum',
        'Mathematical sciences research institutes',
        'Extensive sports and recreation facilities'
      ],
      admissions: {
        requirements: [
          'Excellent A-level results or equivalent',
          'Cambridge admissions assessments',
          'Completed application form',
          'Academic references',
          'Interview for shortlisted candidates',
          'English proficiency for international students'
        ],
        deadlines: {
          'UCAS Application': 'October 15',
          'Admissions Assessments': 'November',
          'Interview Invitations': 'December'
        }
      },
      scholarships: [
        'Gates Cambridge Scholarships',
        'Cambridge Bursary Scheme',
        'International scholarships',
        'College-specific awards'
      ],
      contact: {
        email: 'admissions@cam.ac.uk',
        phone: '+44 1223 333308',
        website: 'https://www.cam.ac.uk',
        address: 'The Old Schools, Trinity Lane, Cambridge CB2 1TN, UK'
      }
    },
    {
      id: 6,
      name: 'University of Toronto',
      slug: 'university-of-toronto',
      location: 'Toronto, Ontario, Canada',
      country: 'Canada',
      established: 1827,
      ranking: 18,
      students: '97,000+',
      internationalStudents: '25%',
      acceptance: '43%',
      tuition: 'CAD $60,000/year',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800',
      description: 'The University of Toronto is Canada\'s leading institution of higher learning, renowned for its research excellence and diverse academic programs.',
      highlights: [
        'Canada\'s top-ranked university',
        'Birthplace of insulin discovery',
        'Strong research output and innovation',
        'Diverse and inclusive campus community'
      ],
      programs: [
        'Medicine',
        'Engineering',
        'Business (Rotman)',
        'Computer Science',
        'Life Sciences',
        'Arts & Science',
        'Law',
        'Public Health'
      ],
      facilities: [
        'Robarts Library - largest academic library in Canada',
        'Multiple campuses across Toronto',
        'Advanced research laboratories',
        'Hospitals affiliated with medical school',
        '800+ student clubs and organizations',
        'Comprehensive sports and recreation facilities'
      ],
      admissions: {
        requirements: [
          'High school diploma with excellent grades',
          'English language proficiency',
          'Program-specific prerequisites',
          'Supplementary application (some programs)',
          'Letters of recommendation',
          'Personal statement or essays'
        ],
        deadlines: {
          'Regular Admission': 'January 13',
          'Late Admission': 'March 1',
          'International Applications': 'January 13'
        }
      },
      scholarships: [
        'Lester B. Pearson International Scholarships',
        'University of Toronto Scholars Program',
        'National Scholarship Program',
        'Need-based financial aid'
      ],
      contact: {
        email: 'admissions.help@utoronto.ca',
        phone: '+1 (416) 978-2190',
        website: 'https://www.utoronto.ca',
        address: '27 King\'s College Circle, Toronto, ON M5S 1A1, Canada'
      }
    }
  ]

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading university details...</h2>
          <p className="text-gray-600">Please wait while we fetch the information.</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !university) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'University not found'}
          </h2>
          <p className="text-gray-600 mb-6">
            {error ? 'There was an error loading the university details.' : 'The requested university could not be found.'}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="block px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => router.push('/universities')}
              className="block px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back to Universities
            </button>
          </div>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'programs', label: 'Programs', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'admissions', label: 'Admissions', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'facilities', label: 'Facilities', icon: <Building className="w-4 h-4" /> },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={university.image}
            alt={university.name}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 to-teal-900/50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.button
            onClick={() => router.back()}
            className="mb-6 flex items-center text-white/90 hover:text-white transition-colors group"
            whileHover={{ x: -5 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            Back to Universities
          </motion.button>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <div className="flex items-center mb-4">
                <motion.div
                  className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 mr-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-white font-medium">#{university.ranking} Global</span>
                </motion.div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="text-white font-medium">{university.rating}</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {university.name}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-white/90 mb-6">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  {university.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Est. {university.established}
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  {university.students} students
                </div>
              </div>

              <p className="text-lg text-white/90 max-w-3xl">
                {university.description}
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  isLiked 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                }`}
                onClick={() => setIsLiked(!isLiked)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className={`w-5 h-5 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                {isLiked ? 'Saved' : 'Save'}
              </motion.button>

              <motion.button
                className="flex items-center px-6 py-3 bg-white text-emerald-600 rounded-full font-semibold hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </motion.button>

              <motion.button
                className="flex items-center px-6 py-3 bg-emerald-500 text-white rounded-full font-semibold hover:bg-emerald-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Visit Website
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Acceptance Rate', value: university.acceptance, icon: <TrendingUp className="w-6 h-6" /> },
              { label: 'International Students', value: university.internationalStudents, icon: <Globe className="w-6 h-6" /> },
              { label: 'Annual Tuition', value: university.tuition, icon: <DollarSign className="w-6 h-6" /> },
              { label: 'Global Ranking', value: `#${university.ranking}`, icon: <Award className="w-6 h-6" /> },
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
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-6 bg-white sticky top-0 z-40 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 pb-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                <div className="lg:col-span-2 space-y-8">
                  {university.highlights && university.highlights.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">University Highlights</h3>
                      <div className="space-y-4">
                        {university.highlights.map((highlight, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start"
                          >
                            <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{highlight}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-white rounded-xl shadow-sm p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">About {university.name}</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {university.description} The university has been at the forefront of education and research for centuries, 
                      contributing to groundbreaking discoveries and nurturing leaders who have shaped the world. With a diverse 
                      student body and world-class faculty, it continues to be a beacon of academic excellence and innovation.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {university.contact && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h4>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Mail className="w-5 h-5 text-emerald-500 mr-3" />
                          <span className="text-gray-700">{university.contact.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-5 h-5 text-emerald-500 mr-3" />
                          <span className="text-gray-700">{university.contact.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Globe className="w-5 h-5 text-emerald-500 mr-3" />
                          <span className="text-gray-700">{university.contact.website}</span>
                        </div>
                        <div className="flex items-start">
                          <MapPin className="w-5 h-5 text-emerald-500 mr-3 mt-0.5" />
                          <span className="text-gray-700">{university.contact.address}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-100">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h4>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-center px-4 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                        <Download className="w-5 h-5 mr-2" />
                        Download Brochure
                      </button>
                      <button className="w-full flex items-center justify-center px-4 py-3 bg-white text-emerald-600 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors">
                        <Play className="w-5 h-5 mr-2" />
                        Watch Virtual Tour
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'programs' && (
              <motion.div
                key="programs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Academic Programs</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.isArray(university.programs) ? (
                      university.programs.map((program, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:shadow-md transition-all duration-300 cursor-pointer group"
                        >
                          <div className="flex items-center">
                            <GraduationCap className="w-5 h-5 text-emerald-500 mr-3 group-hover:scale-110 transition-transform" />
                            <span className="font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">
                              {program}
                            </span>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-gray-600">
                        {university.programs}+ Programs Available
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'admissions' && (
              <motion.div
                key="admissions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Admission Requirements</h3>
                    <div className="space-y-3">
                      {university.admissions?.requirements?.map((requirement, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start"
                        >
                          <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{requirement}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Application Deadlines</h3>
                    <div className="space-y-4">
                      {university.admissions?.deadlines && Object.entries(university.admissions.deadlines).map(([type, deadline], index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                        >
                          <span className="font-medium text-gray-900">{type}</span>
                          <span className="text-emerald-600 font-semibold">{deadline}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Scholarships & Financial Aid</h3>
                  <div className="space-y-4">
                    {university.scholarships?.map((scholarship, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="p-4 border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors"
                      >
                        <div className="flex items-start">
                          <Award className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{scholarship}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'facilities' && (
              <motion.div
                key="facilities"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Campus Facilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {university.facilities?.map((facility, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="p-6 border border-gray-200 rounded-lg hover:border-emerald-300 hover:shadow-md transition-all duration-300 cursor-pointer group"
                      >
                        <div className="flex items-start">
                          <Building className="w-6 h-6 text-emerald-500 mr-4 mt-1 group-hover:scale-110 transition-transform" />
                          <div>
                            <h4 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                              {facility}
                            </h4>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </div>
  )
}