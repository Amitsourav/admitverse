'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import TopBanner from '@/components/TopBanner'
import Footer from '@/components/Footer'
import FloatingActions from '@/components/FloatingActions'
import { Search, MapPin, Users, GraduationCap, DollarSign, Globe, Zap, Star, TrendingUp, Award } from 'lucide-react'
import { countries } from '@/data/countries'

interface Country {
  id: number
  name: string
  slug: string
  flag: string
  continent: string
  capital: string
  universities: number
  internationalStudents: string
  averageTuition: string
  ranking: number
  popularPrograms: string[]
  language: string
  visa: string
  workPermit: string
  description: string
  image: string
  stats: {
    universities: number
    students: string
    programs: number
    satisfaction: string
  }
}

const heroImages = [
  'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1554072675-66db59dba46f?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&h=1080&fit=crop'
]

const mockCountries: Country[] = [
  {
    id: 1,
    name: 'United States',
    slug: 'united-states',
    flag: '🇺🇸',
    continent: 'North America',
    capital: 'Washington, D.C.',
    universities: 5300,
    internationalStudents: '1.1M+',
    averageTuition: '$30,000 - $70,000',
    ranking: 1,
    popularPrograms: ['Business', 'Engineering', 'Computer Science', 'Medicine'],
    language: 'English',
    visa: 'F-1 Student Visa',
    workPermit: 'OPT (1-3 years)',
    description: 'Home to world-renowned universities like Harvard, MIT, and Stanford. The US offers diverse academic programs and excellent research opportunities.',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&h=300&fit=crop',
    stats: {
      universities: 5300,
      students: '1.1M',
      programs: 50000,
      satisfaction: '4.2'
    }
  },
  {
    id: 2,
    name: 'United Kingdom',
    slug: 'united-kingdom',
    flag: '🇬🇧',
    continent: 'Europe',
    capital: 'London',
    universities: 395,
    internationalStudents: '500K+',
    averageTuition: '£15,000 - £40,000',
    ranking: 2,
    popularPrograms: ['Business', 'Engineering', 'Arts & Humanities', 'Medicine'],
    language: 'English',
    visa: 'Student Visa (Tier 4)',
    workPermit: 'Graduate Route (2 years)',
    description: 'Historic universities like Oxford and Cambridge, plus modern institutions. Known for shorter degree programs and rich cultural heritage.',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop',
    stats: {
      universities: 395,
      students: '500K',
      programs: 15000,
      satisfaction: '4.1'
    }
  },
  {
    id: 3,
    name: 'Canada',
    slug: 'canada',
    flag: '🇨🇦',
    continent: 'North America',
    capital: 'Ottawa',
    universities: 223,
    internationalStudents: '720K+',
    averageTuition: 'CAD $20,000 - $50,000',
    ranking: 3,
    popularPrograms: ['Engineering', 'Business', 'Computer Science', 'Healthcare'],
    language: 'English, French',
    visa: 'Study Permit',
    workPermit: 'PGWP (up to 3 years)',
    description: 'Welcoming immigration policies and high-quality education. Universities like UofT and McGill offer excellent programs in a multicultural environment.',
    image: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=400&h=300&fit=crop',
    stats: {
      universities: 223,
      students: '720K',
      programs: 8500,
      satisfaction: '4.3'
    }
  },
  {
    id: 4,
    name: 'Australia',
    slug: 'australia',
    flag: '🇦🇺',
    continent: 'Oceania',
    capital: 'Canberra',
    universities: 147,
    internationalStudents: '760K+',
    averageTuition: 'AUD $25,000 - $55,000',
    ranking: 4,
    popularPrograms: ['Engineering', 'Business', 'Medicine', 'Environmental Science'],
    language: 'English',
    visa: 'Student Visa (Subclass 500)',
    workPermit: 'Temporary Graduate Visa (2-4 years)',
    description: 'Eight universities in the world\'s top 100. Known for research excellence, beautiful campuses, and post-study work opportunities.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    stats: {
      universities: 147,
      students: '760K',
      programs: 6200,
      satisfaction: '4.0'
    }
  },
  {
    id: 5,
    name: 'Germany',
    slug: 'germany',
    flag: '🇩🇪',
    continent: 'Europe',
    capital: 'Berlin',
    universities: 426,
    internationalStudents: '400K+',
    averageTuition: '€0 - €20,000',
    ranking: 5,
    popularPrograms: ['Engineering', 'Natural Sciences', 'Business', 'Medicine'],
    language: 'German, English',
    visa: 'National Visa (Type D)',
    workPermit: '18 months post-graduation',
    description: 'Many public universities with no tuition fees for international students. Strong in engineering and research with excellent industry connections.',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop',
    stats: {
      universities: 426,
      students: '400K',
      programs: 12000,
      satisfaction: '3.9'
    }
  },
  {
    id: 6,
    name: 'France',
    slug: 'france',
    flag: '🇫🇷',
    continent: 'Europe',
    capital: 'Paris',
    universities: 380,
    internationalStudents: '370K+',
    averageTuition: '€2,770 - €30,000',
    ranking: 6,
    popularPrograms: ['Business', 'Arts & Humanities', 'Engineering', 'Fashion'],
    language: 'French, English',
    visa: 'Student Visa (VLS-TS)',
    workPermit: 'APS (up to 2 years)',
    description: 'Rich cultural heritage with world-class institutions. Low tuition fees at public universities and strong programs in arts, business, and engineering.',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop',
    stats: {
      universities: 380,
      students: '370K',
      programs: 9500,
      satisfaction: '3.8'
    }
  },
  {
    id: 7,
    name: 'Netherlands',
    slug: 'netherlands',
    flag: '🇳🇱',
    continent: 'Europe',
    capital: 'Amsterdam',
    universities: 75,
    internationalStudents: '122K+',
    averageTuition: '€8,000 - €20,000',
    ranking: 7,
    popularPrograms: ['Engineering', 'Business', 'Social Sciences', 'Agriculture'],
    language: 'Dutch, English',
    visa: 'Student Visa (MVV)',
    workPermit: 'Orientation Year (1 year)',
    description: 'High-quality education with many English-taught programs. Known for innovation, liberal society, and excellent student life.',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400&h=300&fit=crop',
    stats: {
      universities: 75,
      students: '122K',
      programs: 2100,
      satisfaction: '4.2'
    }
  },
  {
    id: 8,
    name: 'Switzerland',
    slug: 'switzerland',
    flag: '🇨🇭',
    continent: 'Europe',
    capital: 'Bern',
    universities: 67,
    internationalStudents: '57K+',
    averageTuition: 'CHF 1,000 - CHF 4,000',
    ranking: 8,
    popularPrograms: ['Engineering', 'Business', 'Sciences', 'Hospitality'],
    language: 'German, French, Italian, English',
    visa: 'Student Visa (Type D)',
    workPermit: '6 months post-graduation',
    description: 'World-renowned universities like ETH Zurich. Excellent research facilities and high quality of life in a multilingual environment.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    stats: {
      universities: 67,
      students: '57K',
      programs: 1800,
      satisfaction: '4.4'
    }
  },
  {
    id: 9,
    name: 'Sweden',
    slug: 'sweden',
    flag: '🇸🇪',
    continent: 'Europe',
    capital: 'Stockholm',
    universities: 48,
    internationalStudents: '40K+',
    averageTuition: 'SEK 80,000 - SEK 300,000',
    ranking: 9,
    popularPrograms: ['Engineering', 'Technology', 'Design', 'Sustainability'],
    language: 'Swedish, English',
    visa: 'Residence Permit for Studies',
    workPermit: '6 months post-graduation',
    description: 'Innovation-focused education with strong emphasis on sustainability and technology. Free tuition for EU students.',
    image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=400&h=300&fit=crop',
    stats: {
      universities: 48,
      students: '40K',
      programs: 1200,
      satisfaction: '4.1'
    }
  },
  {
    id: 10,
    name: 'Japan',
    slug: 'japan',
    flag: '🇯🇵',
    continent: 'Asia',
    capital: 'Tokyo',
    universities: 775,
    internationalStudents: '312K+',
    averageTuition: '¥500,000 - ¥2,000,000',
    ranking: 10,
    popularPrograms: ['Engineering', 'Technology', 'Business', 'Anime & Manga'],
    language: 'Japanese, English',
    visa: 'Student Visa',
    workPermit: 'Designated Activities (1 year)',
    description: 'Cutting-edge technology and traditional culture. Strong programs in engineering, robotics, and innovation.',
    image: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=400&h=300&fit=crop',
    stats: {
      universities: 775,
      students: '312K',
      programs: 15000,
      satisfaction: '3.9'
    }
  },
  {
    id: 11,
    name: 'South Korea',
    slug: 'south-korea',
    flag: '🇰🇷',
    continent: 'Asia',
    capital: 'Seoul',
    universities: 370,
    internationalStudents: '160K+',
    averageTuition: '₩4,000,000 - ₩12,000,000',
    ranking: 11,
    popularPrograms: ['Technology', 'Business', 'Korean Studies', 'Engineering'],
    language: 'Korean, English',
    visa: 'Student Visa (D-2)',
    workPermit: 'Job Seeking Visa (D-10)',
    description: 'Advanced technology sector and K-culture. Strong in engineering, technology, and business programs.',
    image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&h=300&fit=crop',
    stats: {
      universities: 370,
      students: '160K',
      programs: 8500,
      satisfaction: '4.0'
    }
  },
  {
    id: 12,
    name: 'Singapore',
    slug: 'singapore',
    flag: '🇸🇬',
    continent: 'Asia',
    capital: 'Singapore',
    universities: 34,
    internationalStudents: '85K+',
    averageTuition: 'S$17,000 - S$58,000',
    ranking: 12,
    popularPrograms: ['Business', 'Engineering', 'Computer Science', 'Finance'],
    language: 'English, Mandarin, Malay, Tamil',
    visa: 'Student Pass',
    workPermit: 'Long-term Visit Pass',
    description: 'Global financial hub with top-ranked universities. Multicultural environment and excellent career opportunities.',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=300&fit=crop',
    stats: {
      universities: 34,
      students: '85K',
      programs: 1500,
      satisfaction: '4.3'
    }
  },
  {
    id: 13,
    name: 'New Zealand',
    slug: 'new-zealand',
    flag: '🇳🇿',
    continent: 'Oceania',
    capital: 'Wellington',
    universities: 39,
    internationalStudents: '54K+',
    averageTuition: 'NZ$22,000 - NZ$35,000',
    ranking: 13,
    popularPrograms: ['Agriculture', 'Engineering', 'Tourism', 'Environmental Science'],
    language: 'English, Māori',
    visa: 'Student Visa',
    workPermit: 'Post-study Work Visa (1-3 years)',
    description: 'Beautiful landscapes and high-quality education. Strong in agriculture, environmental science, and adventure tourism.',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
    stats: {
      universities: 39,
      students: '54K',
      programs: 2500,
      satisfaction: '4.2'
    }
  },
  {
    id: 14,
    name: 'Norway',
    slug: 'norway',
    flag: '🇳🇴',
    continent: 'Europe',
    capital: 'Oslo',
    universities: 51,
    internationalStudents: '25K+',
    averageTuition: 'Free (public universities)',
    ranking: 14,
    popularPrograms: ['Engineering', 'Environmental Science', 'Maritime', 'Oil & Gas'],
    language: 'Norwegian, English',
    visa: 'Student Residence Permit',
    workPermit: '6 months post-graduation',
    description: 'Free education at public universities and high quality of life. Strong in engineering and environmental sciences.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    stats: {
      universities: 51,
      students: '25K',
      programs: 1100,
      satisfaction: '4.3'
    }
  },
  {
    id: 15,
    name: 'Italy',
    slug: 'italy',
    flag: '🇮🇹',
    continent: 'Europe',
    capital: 'Rome',
    universities: 367,
    internationalStudents: '98K+',
    averageTuition: '€900 - €4,000',
    ranking: 15,
    popularPrograms: ['Arts & Humanities', 'Architecture', 'Fashion', 'Engineering'],
    language: 'Italian, English',
    visa: 'Student Visa',
    workPermit: '1 year post-graduation',
    description: 'Rich cultural heritage and excellent programs in arts, architecture, and design. Affordable tuition and beautiful campuses.',
    image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&h=300&fit=crop',
    stats: {
      universities: 367,
      students: '98K',
      programs: 7500,
      satisfaction: '3.7'
    }
  },
  {
    id: 16,
    name: 'Spain',
    slug: 'spain',
    flag: '🇪🇸',
    continent: 'Europe',
    capital: 'Madrid',
    universities: 324,
    internationalStudents: '120K+',
    averageTuition: '€1,500 - €12,000',
    ranking: 16,
    popularPrograms: ['Business', 'Arts & Humanities', 'Engineering', 'Medicine'],
    language: 'Spanish, English',
    visa: 'Student Visa',
    workPermit: '1 year post-graduation',
    description: 'Vibrant culture and affordable education. Strong programs in business, arts, and languages with excellent student life.',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300&fit=crop',
    stats: {
      universities: 324,
      students: '120K',
      programs: 6800,
      satisfaction: '3.8'
    }
  },
  {
    id: 17,
    name: 'Ireland',
    slug: 'ireland',
    flag: '🇮🇪',
    continent: 'Europe',
    capital: 'Dublin',
    universities: 34,
    internationalStudents: '35K+',
    averageTuition: '€10,000 - €25,000',
    ranking: 17,
    popularPrograms: ['Technology', 'Business', 'Pharmaceuticals', 'Literature'],
    language: 'English, Irish',
    visa: 'Student Visa',
    workPermit: 'Stay Back Option (2 years)',
    description: 'Tech hub of Europe with major companies like Google and Facebook. Strong programs in technology and business.',
    image: 'https://images.unsplash.com/photo-1590089415225-401ed6b9b193?w=400&h=300&fit=crop',
    stats: {
      universities: 34,
      students: '35K',
      programs: 1800,
      satisfaction: '4.1'
    }
  },
  {
    id: 18,
    name: 'Belgium',
    slug: 'belgium',
    flag: '🇧🇪',
    continent: 'Europe',
    capital: 'Brussels',
    universities: 63,
    internationalStudents: '52K+',
    averageTuition: '€835 - €12,000',
    ranking: 18,
    popularPrograms: ['European Studies', 'Business', 'Engineering', 'Medicine'],
    language: 'Dutch, French, German, English',
    visa: 'Student Visa (Type D)',
    workPermit: '9 months post-graduation',
    description: 'Heart of Europe with EU institutions. Multicultural environment and strong programs in European studies and business.',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop',
    stats: {
      universities: 63,
      students: '52K',
      programs: 2200,
      satisfaction: '3.9'
    }
  },
  {
    id: 19,
    name: 'Austria',
    slug: 'austria',
    flag: '🇦🇹',
    continent: 'Europe',
    capital: 'Vienna',
    universities: 70,
    internationalStudents: '75K+',
    averageTuition: '€1,500 - €15,000',
    ranking: 19,
    popularPrograms: ['Music', 'Arts', 'Engineering', 'Business'],
    language: 'German, English',
    visa: 'Student Visa (Type D)',
    workPermit: '6 months post-graduation',
    description: 'Rich cultural heritage and excellent music programs. Beautiful alpine setting with high quality of life.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    stats: {
      universities: 70,
      students: '75K',
      programs: 2800,
      satisfaction: '4.0'
    }
  },
  {
    id: 20,
    name: 'Denmark',
    slug: 'denmark',
    flag: '🇩🇰',
    continent: 'Europe',
    capital: 'Copenhagen',
    universities: 38,
    internationalStudents: '32K+',
    averageTuition: 'Free (EU), DKK 45,000-120,000 (non-EU)',
    ranking: 20,
    popularPrograms: ['Design', 'Engineering', 'Sustainability', 'Business'],
    language: 'Danish, English',
    visa: 'Student Residence Permit',
    workPermit: '6 months post-graduation',
    description: 'Innovative design culture and strong focus on sustainability. High quality of life and excellent work-life balance.',
    image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=400&h=300&fit=crop',
    stats: {
      universities: 38,
      students: '32K',
      programs: 1400,
      satisfaction: '4.2'
    }
  }
]

const continents = ['All', 'North America', 'Europe', 'Asia', 'Oceania', 'South America', 'Africa']
const rankings = ['All', 'Top 10', 'Top 20', 'Top 50']

export default function CountriesPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedContinent, setSelectedContinent] = useState('All')
  const [selectedRanking, setSelectedRanking] = useState('All')
  const [filteredCountries, setFilteredCountries] = useState(countries)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    let filtered = countries

    if (searchTerm) {
      filtered = filtered.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.continent.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.popularPrograms.some(program => 
          program.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    if (selectedContinent !== 'All') {
      filtered = filtered.filter(country => country.continent === selectedContinent)
    }

    if (selectedRanking !== 'All') {
      const rankingMap = {
        'Top 10': 10,
        'Top 20': 20,
        'Top 50': 50
      }
      const maxRank = rankingMap[selectedRanking as keyof typeof rankingMap]
      filtered = filtered.filter(country => country.ranking <= maxRank)
    }

    setFilteredCountries(filtered)
  }, [searchTerm, selectedContinent, selectedRanking])

  const floatingElements = Array.from({ length: 8 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-4 h-4 bg-emerald-400 rounded-full opacity-20"
      animate={{
        x: [0, 100, 0],
        y: [0, -100, 0],
        scale: [1, 1.5, 1],
      }}
      transition={{
        duration: 10 + i * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.5,
      }}
      style={{
        left: `${10 + i * 12}%`,
        top: `${20 + (i % 3) * 30}%`,
      }}
    />
  ))

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBanner />
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 h-[70vh] bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentImageIndex]}
              alt="Study destinations"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/50" />
        
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Study Destinations
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-emerald-100 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Discover the perfect country for your educational journey
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex justify-center space-x-4"
            >
              <span className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30">
                🌍 150+ Countries
              </span>
              <span className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30">
                🎓 10M+ Students
              </span>
              <span className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30">
                🏆 Top Ranked
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Carousel indicator at bottom */}
        <motion.div
          className="absolute bottom-8 left-8 bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/30"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="text-white text-lg font-semibold">
            Exploring {heroImages.length} Destinations
          </span>
        </motion.div>

        {/* Carousel dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {floatingElements}
      </section>

      {/* Search and Filters */}
      <section className="py-12 px-6 -mt-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-600 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              
              <div>
                <select
                  value={selectedContinent}
                  onChange={(e) => setSelectedContinent(e.target.value)}
                  className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                >
                  {continents.map(continent => (
                    <option key={continent} value={continent}>{continent}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <select
                  value={selectedRanking}
                  onChange={(e) => setSelectedRanking(e.target.value)}
                  className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                >
                  {rankings.map(ranking => (
                    <option key={ranking} value={ranking}>{ranking}</option>
                  ))}
                </select>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-300 font-semibold"
              >
                Search Countries
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Globe, label: 'Countries', value: '150+', color: 'text-emerald-600' },
              { icon: Users, label: 'Students', value: '10M+', color: 'text-teal-600' },
              { icon: GraduationCap, label: 'Universities', value: '7K+', color: 'text-cyan-600' },
              { icon: Award, label: 'Success Rate', value: '95%', color: 'text-emerald-700' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.color} bg-white rounded-2xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Countries Grid */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Popular Study Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore countries that offer world-class education, diverse cultures, and excellent career opportunities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredCountries.map((country, index) => (
                <motion.div
                  key={country.id}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <motion.div
                    whileHover={{ 
                      y: -8, 
                      rotateY: 5,
                      rotateX: 5,
                      scale: 1.02
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 25 
                    }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100 h-full transform-gpu perspective-1000"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={country.image}
                        alt={country.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-2xl mr-2">{country.flag}</span>
                        <span className="text-sm font-medium text-gray-800">#{country.ranking}</span>
                      </div>
                      <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {country.internationalStudents}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                          {country.name}
                        </h3>
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className="text-emerald-500"
                        >
                          <Star className="w-6 h-6 fill-current" />
                        </motion.div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-2 text-emerald-500" />
                          <span>{country.continent} • {country.capital}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <GraduationCap className="w-4 h-4 mr-2 text-emerald-500" />
                          <span>{country.universities.toLocaleString()} Universities</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <DollarSign className="w-4 h-4 mr-2 text-emerald-500" />
                          <span>{country.averageTuition}</span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {country.popularPrograms.slice(0, 3).map((program, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium"
                            >
                              {program}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p className="text-gray-600 mb-6 line-clamp-3">
                        {country.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center p-3 bg-emerald-50 rounded-xl">
                          <div className="text-2xl font-bold text-emerald-600">{country.stats.universities}</div>
                          <div className="text-xs text-gray-600">Universities</div>
                        </div>
                        <div className="text-center p-3 bg-teal-50 rounded-xl">
                          <div className="text-2xl font-bold text-teal-600">{country.stats.satisfaction}</div>
                          <div className="text-xs text-gray-600">Rating</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Link href={`/countries/${country.slug}`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-300 font-semibold"
                          >
                            Explore {country.name}
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredCountries.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Countries Found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </div>
  )
}