'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAISearch } from '@/hooks/useAISearch'
import { Search, Globe, TrendingUp, Users, ChevronRight, Sparkles, ArrowRight, Award, Star, Target, Zap, Heart, BarChart, FileText, Video, GraduationCap, Menu, X, Play, Pause, Volume2, VolumeX, ChevronDown, BookOpen, Phone, Check, XCircle, Facebook, Instagram, Youtube, MessageCircle, Send, Calculator, Clock, FileCheck, DollarSign, Percent, BookOpenCheck } from 'lucide-react'
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import TopBanner from '@/components/TopBanner'
import Footer from '@/components/Footer'
import FloatingActions from '@/components/FloatingActions'
// TEMPORARILY DISABLED - Mobile popup imports
// import MobileNumberPopup from '@/components/MobileNumberPopup'
// import { useMobilePopup } from '@/hooks/useMobilePopup'

// StatCard component for animated statistics
const StatCard = ({ number, suffix, label, icon, delay, useCountAnimation, format }: {
  number: number
  suffix: string
  label: string
  icon: React.ReactNode
  delay: number
  useCountAnimation: (end: number, duration?: number) => { count: number; ref: React.RefObject<HTMLDivElement> }
  format?: string
}) => {
  const { count, ref } = useCountAnimation(format === 'K' ? number / 1000 : number, 2000)
  
  const formatNumber = (num: number) => {
    if (format === 'K') {
      return num.toFixed(0) + 'K'
    }
    return num.toString()
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="text-white"
    >
      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <div className="text-4xl font-bold mb-2">
        {formatNumber(count)}{suffix}
      </div>
      <div className="text-emerald-100">{label}</div>
    </motion.div>
  )
}

export default function HomePage() {
  // Mobile popup hook - TEMPORARILY DISABLED
  // const { isPopupOpen, mobileSubmitted, closePopup, submitMobile } = useMobilePopup()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const { searchWithAI, isSearching, searchResults } = useAISearch()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  // Counting animation hook
  const useCountAnimation = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
          }
        },
        { threshold: 0.5 }
      )

      if (ref.current) {
        observer.observe(ref.current)
      }

      return () => observer.disconnect()
    }, [isVisible])

    useEffect(() => {
      if (!isVisible) return

      let startTime: number | null = null
      let animationFrame: number

      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        setCount(Math.floor(end * easeOutQuart))

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      animationFrame = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(animationFrame)
    }, [isVisible, end, duration])

    return { count, ref }
  }
  
  // Animation refs and scroll
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

  const placeholders = [
    "Search universities, courses, or countries...",
    "Try 'Harvard', 'Computer Science', 'UK'...",
    "Find your dream university...",
    "Discover top programs worldwide..."
  ]

  // Search suggestions data with keywords for better matching
  const searchSuggestions = [
    { type: 'university', name: 'Harvard University', country: 'USA', keywords: ['harvard', 'ivy league'] },
    { type: 'university', name: 'Stanford University', country: 'USA', keywords: ['stanford', 'silicon valley'] },
    { type: 'university', name: 'MIT', country: 'USA', keywords: ['mit', 'massachusetts', 'technology'] },
    { type: 'university', name: 'Oxford University', country: 'UK', keywords: ['oxford', 'uk'] },
    { type: 'university', name: 'Cambridge University', country: 'UK', keywords: ['cambridge', 'uk'] },
    { type: 'course', name: 'Computer Science', programs: '1,200+ programs', keywords: ['cs', 'programming', 'coding', 'software', 'tech'] },
    { type: 'course', name: 'Business Administration', programs: '800+ programs', keywords: ['mba', 'business', 'management', 'administration'] },
    { type: 'course', name: 'Engineering', programs: '1,500+ programs', keywords: ['engineer', 'mechanical', 'electrical', 'civil'] },
    { type: 'course', name: 'Medicine', programs: '400+ programs', keywords: ['medical', 'doctor', 'mbbs', 'healthcare'] },
    { type: 'country', name: 'United States', universities: '500+ universities', keywords: ['usa', 'us', 'america'] },
    { type: 'country', name: 'United Kingdom', universities: '300+ universities', keywords: ['uk', 'britain', 'england'] },
    { type: 'country', name: 'Canada', universities: '200+ universities', keywords: ['canadian'] },
    { type: 'country', name: 'Australia', universities: '150+ universities', keywords: ['aussie', 'aus'] },
  ]

  // Filter suggestions based on search term - now checks both name and keywords
  const filteredSuggestions = searchSuggestions.filter(suggestion => {
    const searchLower = searchTerm.toLowerCase()
    return suggestion.name.toLowerCase().includes(searchLower) ||
           suggestion.keywords.some(keyword => keyword.includes(searchLower))
  }).slice(0, 8) // Increased to 8 to show more options

  // Handle search submission with AI
  const handleSearch = async (term: string = searchTerm) => {
    if (term.trim()) {
      setShowSuggestions(false)
      
      // Use AI search if available
      const aiResults = await searchWithAI(term)
      
      if (aiResults && aiResults.success) {
        // Store AI results in sessionStorage for the search results page
        sessionStorage.setItem('aiSearchResults', JSON.stringify(aiResults))
        router.push(`/search?q=${encodeURIComponent(term)}&ai=true`)
      } else {
        // Fallback to traditional search
        const suggestion = filteredSuggestions.find(s => 
          s.name.toLowerCase() === term.toLowerCase()
        )
        
        if (suggestion) {
          switch (suggestion.type) {
            case 'university':
              router.push(`/universities?search=${encodeURIComponent(term)}`)
              break
            case 'course':
              router.push(`/courses?search=${encodeURIComponent(term)}`)
              break
            case 'country':
              router.push(`/countries?search=${encodeURIComponent(term)}`)
              break
            default:
              router.push(`/universities?search=${encodeURIComponent(term)}`)
          }
        } else {
          router.push(`/universities?search=${encodeURIComponent(term)}`)
        }
      }
      
      setSearchTerm('')
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    setShowSuggestions(value.length > 0)
  }

  const handleSuggestionClick = (suggestion: any) => {
    handleSearch(suggestion.name)
  }

  // Form submission handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields')
      setIsSubmitting(false)
      return
    }
    
    try {
      // Use data collection service
      const { submitHomepageForm } = await import('@/services/dataCollection')
      const success = await submitHomepageForm(
        formData.name,
        formData.email,
        formData.phone,
        formData.message || undefined
      )
      
      setIsSubmitting(false)
      setShowSuccess(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000)
      
      if (!success) {
        console.log('Data stored locally as backup')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setIsSubmitting(false)
      alert('There was an error submitting the form. Please try again.')
    }
  }

  // Form input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Success Stories data - reduced to 4 for cleaner layout
  const successStories = [
    {
      name: "Riya Sharma",
      university: "NMIMS University",
      program: "MBA",
      flag: "🇮🇳",
      quote: "AdmitVerse helped me shortlist colleges in India and abroad with clarity. Their education loan team got me approval in 3 days!"
    },
    {
      name: "Raj Patel", 
      university: "MIT",
      program: "PhD, Data Science",
      flag: "🇮🇳",
      quote: "The personalized guidance and essay reviews helped me secure full funding at MIT."
    },
    {
      name: "Maria Rodriguez",
      university: "Oxford University", 
      program: "MBA",
      flag: "🇲🇽",
      quote: "From SOP prep to visa and forex help, AdmitVerse was with me till the end."
    },
    {
      name: "Ankit Verma",
      university: "Chandigarh University",
      program: "B.Tech",
      flag: "🇮🇳",
      quote: "Got admission, loan, and hostel support — all from one platform!"
    }
  ]

  // Why Choose Us Features with enhanced content
  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global & Domestic Universities',
      description: 'Explore 500+ universities across 50+ countries and 200+ reputed Indian institutions. Get course details, admission criteria, fee structures, deadlines, and scholarship options — all in one place.',
      highlights: ['500+ Global Universities', '200+ Indian Colleges', '50+ Countries', 'Real-time Updates'],
      stats: '99% of our students get accepted to their top 3 choices',
      imageSrc: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      ctaText: 'Explore Universities',
      ctaHref: '/universities'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'AI-Powered Matching Engine',
      description: 'Our proprietary AI system curates the best-fit programs based on your profile, career aspirations, and affordability — whether you aim for an IIM, ISB, Delhi University, or Oxford.',
      highlights: ['🎯 Smart Recommendations', '95% Accuracy', 'Instant Results', 'Global & Indian Unis'],
      stats: 'Over 10,000 successful matches made',
      imageSrc: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      ctaText: 'Find Your Match',
      ctaHref: '/courses'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Personalized Guidance',
      description: 'Work 1-on-1 with experienced counselors who specialize in MBA, MS, MBBS, B.Tech, Nursing, and Online Education admissions.',
      highlights: ['Certified Counselors', '24/7 Support', 'Application & SOP Help', 'Interview Prep'],
      stats: '15+ years average counselor experience',
      imageSrc: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      ctaText: 'Book Consultation',
      ctaHref: '/contact'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Education Loan Support',
      description: 'Get guaranteed low-interest rates with our tie-ups across government banks, private banks, and NBFCs. From profile-based approvals to 100% digital processing — we make financing your education easy.',
      highlights: ['Lowest Interest', 'Fast Approvals', 'Collateral & Non-Collateral Options', 'Digital Processing'],
      stats: '85% of students receive financial aid',
      imageSrc: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      ctaText: 'Find Scholarships',
      ctaHref: '/courses'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Career Planning & Placement',
      description: 'Get guided career roadmaps, internship tie-ups, resume building, and job placement assistance.',
      highlights: ['Industry Connections', '92% Placement Rate', 'Global Network', 'Resume Building'],
      stats: '92% employed within 6 months of graduation',
      imageSrc: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      ctaText: 'Plan Your Career',
      ctaHref: '/contact'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Online & Distance Degrees',
      description: 'Earn accredited degrees from India\'s top UGC-approved universities and international partners — fully online, flexible, and placement-supported.',
      highlights: ['MBA, BCA, MCA, BBA', 'UGC-Approved', 'EMI & Loan Options', 'Placement Support'],
      stats: '100% online with placement assistance',
      imageSrc: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      ctaText: 'Explore Online Degrees',
      ctaHref: '/courses'
    }
  ]

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch(e => console.log('Video play failed:', e))
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted
      setIsVideoMuted(!isVideoMuted)
    }
  }

  // Video initialization effect
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleLoadStart = () => {
        console.log('Video load started')
        setVideoLoaded(false)
        setVideoError(false)
      }
      
      const handleLoadedData = () => {
        console.log('Video loaded successfully')
        setVideoLoaded(true)
        video.play().catch(e => {
          console.log('Autoplay failed:', e)
          setIsVideoPlaying(false)
        })
      }
      
      const handleCanPlay = () => {
        console.log('Video can play')
        setVideoLoaded(true)
        video.play().catch(e => {
          console.log('Play failed:', e)
          setIsVideoPlaying(false)
        })
      }
      
      const handlePlay = () => {
        console.log('Video started playing')
        setIsVideoPlaying(true)
        setVideoLoaded(true)
      }
      
      const handlePause = () => {
        console.log('Video paused')
        setIsVideoPlaying(false)
      }
      
      const handleError = (e: Event) => {
        console.error('Video error:', e)
        setVideoError(true)
        setVideoLoaded(false)
        setIsVideoPlaying(false)
      }
      
      video.addEventListener('loadstart', handleLoadStart)
      video.addEventListener('loadeddata', handleLoadedData)
      video.addEventListener('canplay', handleCanPlay)
      video.addEventListener('play', handlePlay)
      video.addEventListener('pause', handlePause)
      video.addEventListener('error', handleError)
      
      // Force load the video
      video.load()
      
      return () => {
        video.removeEventListener('loadstart', handleLoadStart)
        video.removeEventListener('loadeddata', handleLoadedData)
        video.removeEventListener('canplay', handleCanPlay)
        video.removeEventListener('play', handlePlay)
        video.removeEventListener('pause', handlePause)
        video.removeEventListener('error', handleError)
      }
    }
  }, [])

  // Handle hash navigation (for Book Free Counseling button from other pages)
  useEffect(() => {
    const handleHashNavigation = () => {
      if (window.location.hash === '#book-counseling') {
        setTimeout(() => {
          const counselingSection = document.getElementById('book-counseling')
          if (counselingSection) {
            counselingSection.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            })
          }
        }, 100) // Small delay to ensure page is fully loaded
      }
    }

    // Check hash on load
    handleHashNavigation()

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation)
    
    return () => {
      window.removeEventListener('hashchange', handleHashNavigation)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <TopBanner />
      <Navigation />
      <div ref={containerRef} className="min-h-screen">
        
        {/* Hero Section with Video Background */}
        <motion.section 
          className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900"
          style={{ 
            opacity: heroOpacity, 
            transform: `scale(${heroScale})`,
            ...(videoError && {
              backgroundImage: 'url(https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            })
          }}
        >
          {/* Video Background */}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ 
              objectFit: 'cover',
              opacity: videoLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out'
            }}
            onError={(e) => {
              console.log('Video failed to load:', e)
              setVideoError(true)
              setVideoLoaded(false)
            }}
          >
            <source src="/cambridge-welcome.mp4" type="video/mp4" />
            <source src="https://cdn.pixabay.com/video/2022/12/11/142747-781159490_large.mp4" type="video/mp4" />
            <source src="https://assets.mixkit.co/videos/preview/mixkit-university-campus-aerial-view-5348-large.mp4" type="video/mp4" />
          </video>
          
          {/* Loading State */}
          {!videoLoaded && !videoError && (
            <div className="absolute inset-0 bg-gray-900 z-5 flex items-center justify-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-white text-sm opacity-75">Loading video...</p>
              </div>
            </div>
          )}
          
          {/* Video Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 z-10" />
          
          {/* Video Controls */}
          <div className="absolute bottom-8 right-8 flex gap-3 z-30">
            <motion.button
              onClick={toggleVideo}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-white hover:bg-white/30 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isVideoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </motion.button>
            <motion.button
              onClick={toggleMute}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-white hover:bg-white/30 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isVideoMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </motion.button>
          </div>

          {/* Hero Content */}
          <div className="relative z-20 text-center max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 text-white" style={{ lineHeight: '1.3' }}>
                Your Complete
                <span className="block bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                  Admission Journey
                </span>
              </h1>
              <div className="flex items-center justify-center gap-3 mb-8">
                <span className="text-emerald-300 font-medium text-lg md:text-xl">in India</span>
                <span className="text-white/60">•</span>
                <span className="text-green-300 font-medium text-lg md:text-xl">and Abroad</span>
              </div>
              <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
                Discover top universities worldwide. Get personalized recommendations, expert guidance, and make your dream of studying a reality.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative max-w-2xl mx-auto mb-12 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder={placeholders[placeholderIndex]}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch()
                    }
                  }}
                  onFocus={() => searchTerm && setShowSuggestions(true)}
                  className="w-full pl-16 pr-32 py-6 text-lg bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-emerald-300/50 border-0 transition-all duration-300"
                />
                <button
                  onClick={() => handleSearch()}
                  disabled={isSearching}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSearching ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>AI Searching...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>AI Search</span>
                    </>
                  )}
                </button>
              </motion.div>

              {/* Search Suggestions */}
              <AnimatePresence>
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                  >
                    {filteredSuggestions.map((suggestion, index) => (
                      <motion.div
                        key={`${suggestion.type}-${suggestion.name}`}
                        className="flex items-center p-4 hover:bg-emerald-50 cursor-pointer transition-colors duration-200 border-b border-gray-50 last:border-b-0"
                        onClick={() => handleSuggestionClick(suggestion)}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.1 }}
                      >
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3 flex-shrink-0">
                          {suggestion.type === 'university' && <GraduationCap className="w-5 h-5 text-emerald-600" />}
                          {suggestion.type === 'course' && <BookOpen className="w-5 h-5 text-emerald-600" />}
                          {suggestion.type === 'country' && <Globe className="w-5 h-5 text-emerald-600" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate">{suggestion.name}</div>
                          <div className="text-sm text-gray-500 truncate">
                            {suggestion.type === 'university' && `University in ${suggestion.country}`}
                            {suggestion.type === 'course' && suggestion.programs}
                            {suggestion.type === 'country' && suggestion.universities}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0" />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="space-y-6 max-w-lg mx-auto"
            >
              {/* Primary CTA */}
              <div className="text-center">
                <Link href="/contact">
                  <motion.button 
                    className="w-full sm:w-auto px-12 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all duration-300 shadow-lg text-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Free Consultation
                  </motion.button>
                </Link>
              </div>
              
              {/* Secondary CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/universities">
                  <motion.button 
                    className="w-full sm:w-auto px-6 py-3 bg-white/15 backdrop-blur-sm text-white font-medium rounded-lg border border-white/20 hover:bg-white/25 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Explore Universities
                  </motion.button>
                </Link>
                <Link href="/dev-features/b-school">
                  <motion.button 
                    className="w-full sm:w-auto px-6 py-3 bg-purple-600/20 backdrop-blur-sm text-white font-medium rounded-lg border border-purple-400/30 hover:bg-purple-600/30 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    B-School Zone
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* How It Works Section */}
        <section className="py-20 bg-emerald-50/30">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                How AdmitVerse Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Your 4-Step Path to Admission Success
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Profile Assessment",
                  description: "Share your academic background, career goals, and budget — we'll evaluate your profile to find your best-fit options.",
                  icon: <FileText className="w-8 h-8" />,
                  color: "bg-emerald-100 text-emerald-600"
                },
                {
                  step: "02", 
                  title: "AI Matching",
                  description: "Our intelligent algorithm instantly matches your profile with top universities, domestic and international, along with scholarships and loan options.",
                  icon: <Target className="w-8 h-8" />,
                  color: "bg-emerald-100 text-emerald-600"
                },
                {
                  step: "03",
                  title: "Personalized Guidance",
                  description: "Connect with our admission experts for personalized guidance — from SOPs, essays, and applications to visa and loan support.",
                  icon: <Users className="w-8 h-8" />,
                  color: "bg-emerald-100 text-emerald-600"
                },
                {
                  step: "04",
                  title: "Application Success",
                  description: "Receive your offer letter, secure your loan, and access post-admission support for housing, forex, or online learning resources.",
                  icon: <Award className="w-8 h-8" />,
                  color: "bg-emerald-100 text-emerald-600"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center relative"
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                      {item.step}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-8 pt-12 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                    <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                  
                  {/* Arrow for desktop */}
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-emerald-300" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link href="/contact">
                <motion.button 
                  className="px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Your Journey Today
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Why Choose Us Section */}
        <section className="py-20 bg-green-50/20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Choose AdmitVerse?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                One Platform. Endless Admission Possibilities.
              </p>
            </motion.div>

            <div className="space-y-16">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  {/* Content */}
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                        {feature.icon}
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900">{feature.title}</h3>
                    </div>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    {/* Highlights */}
                    <div className="grid grid-cols-2 gap-3">
                      {feature.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Stats */}
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                      <div className="flex items-center space-x-2">
                        <BarChart className="w-5 h-5 text-emerald-600" />
                        <span className="text-sm font-semibold text-emerald-800">{feature.stats}</span>
                      </div>
                    </div>
                    
                    {/* CTA */}
                    <Link href={feature.ctaHref}>
                      <motion.button
                        className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all duration-300 shadow-md"
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {feature.ctaText}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </motion.button>
                    </Link>
                  </div>

                  {/* Image */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <motion.div
                      className="relative h-96 rounded-2xl overflow-hidden shadow-xl"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={feature.imageSrc}
                        alt={feature.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-transparent"></div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose AdmitVerse Over Others - Comparison Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why AdmitVerse Stands Out
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how we compare with traditional consultants and other online platforms
              </p>
            </motion.div>

            {/* Comparison Table */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="overflow-x-auto"
            >
              <div className="min-w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-emerald-600 to-green-600 text-white">
                      <th className="px-6 py-5 text-left text-lg font-semibold">Features</th>
                      <th className="px-6 py-5 text-center">
                        <div className="flex flex-col items-center">
                          <span className="text-lg font-bold">AdmitVerse</span>
                          <span className="text-xs text-emerald-100 mt-1">✨ Recommended</span>
                        </div>
                      </th>
                      <th className="px-6 py-5 text-center text-lg">Traditional Consultants</th>
                      <th className="px-6 py-5 text-center text-lg">Other Online Platforms</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      {
                        feature: "University & College Coverage",
                        admitverse: "500+ Global + 200+ Indian",
                        traditional: "Limited Options",
                        others: "Mostly International"
                      },
                      {
                        feature: "AI-Powered Matching",
                        admitverse: true,
                        traditional: false,
                        others: "Basic Filters Only"
                      },
                      {
                        feature: "Education Loan Support",
                        admitverse: "₹50 Cr+ Facilitated",
                        traditional: "Limited Partners",
                        others: false
                      },
                      {
                        feature: "1-on-1 Expert Counseling",
                        admitverse: true,
                        traditional: true,
                        others: false
                      },
                      {
                        feature: "SOP & Essay Review",
                        admitverse: "Unlimited Revisions",
                        traditional: "2-3 Revisions",
                        others: "AI Generated Only"
                      },
                      {
                        feature: "Visa Assistance",
                        admitverse: true,
                        traditional: true,
                        others: "Documentation Only"
                      },
                      {
                        feature: "24/7 Support",
                        admitverse: true,
                        traditional: false,
                        others: "Chatbot Only"
                      },
                      {
                        feature: "Career Planning",
                        admitverse: "Pre & Post Admission",
                        traditional: "Limited",
                        others: false
                      },
                      {
                        feature: "Scholarship Database",
                        admitverse: "10,000+ Options",
                        traditional: "Few Options",
                        others: "Basic List"
                      },
                      {
                        feature: "Transparent Pricing",
                        admitverse: "Free to ₹25,000",
                        traditional: "₹50,000 - ₹2,00,000",
                        others: "Hidden Fees"
                      },
                      {
                        feature: "Success Rate",
                        admitverse: "95%",
                        traditional: "70-80%",
                        others: "Not Disclosed"
                      },
                      {
                        feature: "Online Degree Options",
                        admitverse: true,
                        traditional: false,
                        others: "Limited"
                      }
                    ].map((row, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 text-gray-900 font-medium">{row.feature}</td>
                        <td className="px-6 py-4 text-center bg-emerald-50/50">
                          {typeof row.admitverse === 'boolean' ? (
                            row.admitverse ? (
                              <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center justify-center"
                              >
                                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                                  <Check className="w-5 h-5 text-white" />
                                </div>
                              </motion.div>
                            ) : (
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                                <XCircle className="w-5 h-5 text-gray-400" />
                              </div>
                            )
                          ) : (
                            <span className="text-emerald-600 font-semibold">{row.admitverse}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {typeof row.traditional === 'boolean' ? (
                            row.traditional ? (
                              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                                <Check className="w-5 h-5 text-white" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                                <XCircle className="w-5 h-5 text-gray-400" />
                              </div>
                            )
                          ) : (
                            <span className="text-gray-600">{row.traditional}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {typeof row.others === 'boolean' ? (
                            row.others ? (
                              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                                <Check className="w-5 h-5 text-white" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                                <XCircle className="w-5 h-5 text-gray-400" />
                              </div>
                            )
                          ) : (
                            <span className="text-gray-600">{row.others}</span>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Key Advantages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <motion.div
                className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-6 text-white"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">10x</div>
                    <div className="text-emerald-100 text-sm">More Affordable</div>
                  </div>
                </div>
                <p className="text-emerald-50">
                  Save up to ₹1,75,000 compared to traditional consultants with better results
                </p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl p-6 text-white"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">3x</div>
                    <div className="text-teal-100 text-sm">Faster Process</div>
                  </div>
                </div>
                <p className="text-teal-50">
                  Get matched with universities in minutes, not weeks. Complete applications 3x faster
                </p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">95%</div>
                    <div className="text-green-100 text-sm">Success Rate</div>
                  </div>
                </div>
                <p className="text-green-50">
                  Highest admission success rate with personalized support at every step
                </p>
              </motion.div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link href="/contact">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Experience the AdmitVerse Difference
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Free Tools & Resources Section */}
        <section className="py-20 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
          {/* Animated background elements */}
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
            animate={{
              x: [0, -30, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block mb-4"
              >
                <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                  ✨ Exclusive Resources
                </span>
              </motion.div>
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Free Tools & Resources
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Empower your study abroad journey with our exclusive tools and resources
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
              {/* SOP Review Card */}
              <motion.div
                initial={{ opacity: 0, y: 50, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-emerald-100 group relative overflow-hidden"
              >
                <motion.div 
                  className="absolute top-0 right-0 bg-gradient-to-bl from-emerald-500 to-transparent w-20 h-20 opacity-10"
                  whileHover={{ scale: 2, opacity: 0.2 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="flex justify-center mb-6">
                  <div className="w-28 h-28 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <FileCheck className="w-14 h-14 text-teal-600" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">SOP Review</h3>
                  <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider mb-4">Professional Guidance</p>
                  <p className="text-sm text-gray-600 mb-6 min-h-[80px] leading-relaxed">
                    Get a comprehensive review of your Statement of Purpose within 48 hours from our expert admission counselors.
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-center text-xs text-gray-500">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      Expert feedback
                    </div>
                    <div className="flex items-center justify-center text-xs text-gray-500">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      Grammar & structure check
                    </div>
                    <div className="flex items-center justify-center text-xs text-gray-500">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      University-specific tips
                    </div>
                  </div>
                  <Link href="/tools/sop-review">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg font-semibold text-sm hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Get SOP Review
                    </motion.button>
                  </Link>
                </div>
              </motion.div>

              {/* CV Review Card */}
              <motion.div
                initial={{ opacity: 0, y: 50, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-emerald-100 group relative overflow-hidden"
              >
                <motion.div 
                  className="absolute top-0 right-0 bg-gradient-to-bl from-green-500 to-transparent w-20 h-20 opacity-10"
                  whileHover={{ scale: 2, opacity: 0.2 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="flex justify-center mb-6">
                  <div className="w-28 h-28 bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <FileText className="w-14 h-14 text-green-600" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">CV Review</h3>
                  <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider mb-4">Career Enhancement</p>
                  <p className="text-sm text-gray-600 mb-6 min-h-[80px] leading-relaxed">
                    Transform your CV into a powerful tool that stands out. Get detailed tips from our study abroad coaches.
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-center text-xs text-gray-500">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      ATS optimization
                    </div>
                    <div className="flex items-center justify-center text-xs text-gray-500">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      Industry standards
                    </div>
                    <div className="flex items-center justify-center text-xs text-gray-500">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      Achievement highlights
                    </div>
                  </div>
                  <Link href="/tools/cv-review">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg font-semibold text-sm hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Review My CV
                    </motion.button>
                  </Link>
                </div>
              </motion.div>

              {/* Cost of Living Calculator Card */}
              <motion.div
                initial={{ opacity: 0, y: 50, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-emerald-100 group relative overflow-hidden"
              >
                <motion.div 
                  className="absolute top-0 right-0 bg-gradient-to-bl from-teal-500 to-transparent w-20 h-20 opacity-10"
                  whileHover={{ scale: 2, opacity: 0.2 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="flex justify-center mb-6">
                  <div className="w-28 h-28 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <DollarSign className="w-14 h-14 text-emerald-600" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Cost Calculator</h3>
                  <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider mb-4">Financial Planning</p>
                  <p className="text-sm text-gray-600 mb-6 min-h-[80px] leading-relaxed">
                    Plan your budget accurately. Calculate living expenses for your dream study destination worldwide.
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-center text-xs text-gray-500">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      150+ cities covered
                    </div>
                    <div className="flex items-center justify-center text-xs text-gray-500">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      Real-time data
                    </div>
                    <div className="flex items-center justify-center text-xs text-gray-500">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      Student lifestyle costs
                    </div>
                  </div>
                  <Link href="/tools/cost-calculator">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg font-semibold text-sm hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Calculate Now
                    </motion.button>
                  </Link>
                </div>
              </motion.div>

              {/* SGPA to CGPA Converter Card */}
              <motion.div
                initial={{ opacity: 0, y: 50, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.3,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-emerald-100 group relative overflow-hidden"
              >
                <motion.div 
                  className="absolute top-0 right-0 bg-gradient-to-bl from-emerald-500 to-transparent w-20 h-20 opacity-10"
                  whileHover={{ scale: 2, opacity: 0.2 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="flex justify-center mb-6">
                  <div className="w-28 h-28 bg-gradient-to-br from-teal-100 to-green-100 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <Calculator className="w-14 h-14 text-teal-600" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">SGPA to CGPA</h3>
                  <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider mb-4">Grade Converter</p>
                  <p className="text-sm text-gray-600 mb-6 min-h-[80px] leading-relaxed">
                    Convert your semester grades to cumulative GPA instantly with our accurate calculation tool.
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-center text-xs text-gray-500">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      All university scales
                    </div>
                    <div className="flex items-center justify-center text-xs text-gray-500">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      Instant results
                    </div>
                    <div className="flex items-center justify-center text-xs text-gray-500">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      100% accurate
                    </div>
                  </div>
                  <Link href="/tools/sgpa-to-cgpa">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg font-semibold text-sm hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Convert Grade
                    </motion.button>
                  </Link>
                </div>
              </motion.div>

              {/* CGPA - Percentage Converter Card */}
              <motion.div
                initial={{ opacity: 0, y: 50, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.4,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-emerald-100 group relative overflow-hidden"
              >
                <motion.div 
                  className="absolute top-0 right-0 bg-gradient-to-bl from-green-500 to-transparent w-20 h-20 opacity-10"
                  whileHover={{ scale: 2, opacity: 0.2 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="flex justify-center mb-6">
                  <div className="w-28 h-28 bg-gradient-to-br from-green-100 to-teal-100 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <Percent className="w-14 h-14 text-green-600" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">CGPA to %</h3>
                  <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider mb-4">Quick Conversion</p>
                  <p className="text-sm text-gray-600 mb-6 min-h-[80px] leading-relaxed">
                    Convert between CGPA and percentage instantly. Support for multiple grading systems worldwide.
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-center text-xs text-gray-500">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      4.0, 5.0, 10.0 scales
                    </div>
                    <div className="flex items-center justify-center text-xs text-gray-500">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      Reverse calculation
                    </div>
                    <div className="flex items-center justify-center text-xs text-gray-500">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      Download report
                    </div>
                  </div>
                  <Link href="/tools/cgpa-to-percentage">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg font-semibold text-sm hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Start Converting
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 bg-emerald-50/20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Success Stories</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Students Who Turned Their Dreams Into Reality
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {successStories.map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  <div className="flex items-start mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">{story.flag}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{story.name} {story.flag}</h4>
                      <p className="text-emerald-600 font-semibold">{story.university}</p>
                      <p className="text-gray-600 text-sm">{story.program}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -top-2 -left-2 text-emerald-200 text-4xl font-serif">"</div>
                    <p className="text-gray-600 italic pl-4">{story.quote}</p>
                    <div className="absolute -bottom-2 -right-2 text-emerald-200 text-4xl font-serif">"</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* Stats Section */}
        <section className="py-16 bg-emerald-600">
          <div className="max-w-7xl mx-auto px-6">
            {(() => {
              // Create animation hooks for each stat
              const studentsAnimation = useCountAnimation(10000, 2000)
              const successAnimation = useCountAnimation(95, 2000)
              const loansAnimation = useCountAnimation(50, 2000)
              
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
                    <motion.div
                      ref={studentsAnimation.ref}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 text-white"
                    >
                      <Users className="w-6 h-6 text-emerald-200" />
                      <span className="text-2xl md:text-3xl font-bold">{studentsAnimation.count.toLocaleString()}+</span>
                      <span className="text-lg md:text-xl text-emerald-100">Students Guided</span>
                    </motion.div>
                    
                    <span className="text-emerald-300 text-2xl hidden md:block">•</span>
                    
                    <motion.div
                      ref={successAnimation.ref}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 text-white"
                    >
                      <Award className="w-6 h-6 text-emerald-200" />
                      <span className="text-2xl md:text-3xl font-bold">{successAnimation.count}%</span>
                      <span className="text-lg md:text-xl text-emerald-100">Admission Success</span>
                    </motion.div>
                    
                    <span className="text-emerald-300 text-2xl hidden md:block">•</span>
                    
                    <motion.div
                      ref={loansAnimation.ref}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 text-white"
                    >
                      <TrendingUp className="w-6 h-6 text-emerald-200" />
                      <span className="text-2xl md:text-3xl font-bold">₹{loansAnimation.count} Cr+</span>
                      <span className="text-lg md:text-xl text-emerald-100">Loans Facilitated</span>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })()}
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="book-counseling" className="py-16 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
          
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Book Your Free Consultation
              </h2>
              <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
                Get Personalized Guidance from Experts Who've Helped Thousands
              </p>
            </motion.div>

            {/* Form and Social Media Section */}
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Form Card - Left Side */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Start Your Journey</h3>
                  <p className="text-sm text-gray-600">We'll get back to you within 24 hours</p>
                </div>

                <form className="space-y-4" onSubmit={handleFormSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 placeholder-gray-400"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 placeholder-gray-400"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 placeholder-gray-400"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 placeholder-gray-400 resize-none"
                      placeholder="Tell us about your goals or any specific questions..."
                    ></textarea>
                  </div>
                  
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm text-center"
                    >
                      ✓ Thank you! We'll contact you within 24 hours.
                    </motion.div>
                  )}
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Book Free Consultation'}
                    {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2 inline" />}
                  </motion.button>
                </form>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center">
                      <Award className="w-3 h-3 text-emerald-600 mr-1" />
                      Free Consultation
                    </div>
                    <div className="flex items-center">
                      <Target className="w-3 h-3 text-emerald-600 mr-1" />
                      Expert Guidance
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-3 h-3 text-emerald-600 mr-1" />
                      Loan & Scholarship Help
                    </div>
                  </div>
                </div>
              </div>
                </motion.div>
                
                {/* Social Media Section - Right Side */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-emerald-800/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 h-full">
                    <div className="text-center lg:text-left mb-6">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Join Our Community</h3>
                      <p className="text-emerald-100">Connect with 50,000+ students worldwide</p>
                    </div>
                  
                  <div className="space-y-4">
                    {/* Facebook Button */}
                    <motion.a
                      href="https://facebook.com/admitverse"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-5 transition-all duration-300 border border-white/20 group"
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                          <Facebook className="w-6 h-6 text-white fill-white" />
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold text-white">Join our Community</h4>
                          <p className="text-sm text-emerald-100">Daily tips & updates</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                    
                    {/* Instagram Button */}
                    <motion.a
                      href="https://instagram.com/admitverse"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-5 transition-all duration-300 border border-white/20 group"
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                          <Instagram className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold text-white">Follow Us</h4>
                          <p className="text-sm text-emerald-100">Success stories & more</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                    
                    {/* YouTube Button */}
                    <motion.a
                      href="https://youtube.com/@admitverse"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-5 transition-all duration-300 border border-white/20 group"
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                          <Youtube className="w-6 h-6 text-white fill-white" />
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold text-white">Subscribe</h4>
                          <p className="text-sm text-emerald-100">Free webinars & guides</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                    
                    {/* WhatsApp Button */}
                    <motion.a
                      href="https://wa.me/919876543210?text=Hi%20I%20want%20to%20join%20AdmitVerse%20WhatsApp%20Group"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-5 transition-all duration-300 border border-white/20 group"
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                          <MessageCircle className="w-6 h-6 text-white fill-white" />
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold text-white">Join Now</h4>
                          <p className="text-sm text-emerald-100">WhatsApp community</p>
                        </div>
                      </div>
                      <motion.span
                        className="bg-green-400 text-green-900 px-3 py-1 rounded-full text-sm font-bold"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        5K+ Members
                      </motion.span>
                    </motion.a>
                    
                    {/* Telegram Button */}
                    <motion.a
                      href="https://t.me/admitverse"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-5 transition-all duration-300 border border-white/20 group"
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-sky-600 rounded-full flex items-center justify-center">
                          <Send className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold text-white">Join Now</h4>
                          <p className="text-sm text-emerald-100">Telegram channel</p>
                        </div>
                      </div>
                      <motion.span
                        className="bg-sky-400 text-sky-900 px-3 py-1 rounded-full text-sm font-bold"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                      >
                        3K+ Members
                      </motion.span>
                    </motion.a>
                  </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <div className="flex justify-center items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
                <span className="text-emerald-100 ml-2 text-sm">4.9/5 (10,000+ students)</span>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
      <FloatingActions />
      
      {/* Mobile Number Popup - TEMPORARILY DISABLED */}
      {/* <MobileNumberPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        onSubmit={submitMobile}
      /> */}
    </div>
  )
}