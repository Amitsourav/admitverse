'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import TopBanner from '@/components/TopBanner'
import Footer from '@/components/Footer'
import FloatingActions from '@/components/FloatingActions'
import AnimatedCounter from '@/components/AnimatedCounter'
import { 
  Globe,
  GraduationCap,
  MapPin,
  ClipboardList,
  Plane,
  Home,
  CreditCard,
  HeartHandshake
} from 'lucide-react'
import Link from 'next/link'

export default function StudyAbroadPage() {
  const destinations = [
    {
      country: "USA",
      universities: "5000+",
      students: "1M+ international",
      popular: ["STEM", "Business", "Liberal Arts"]
    },
    {
      country: "UK",
      universities: "130+",
      students: "500K+ international",
      popular: ["Engineering", "Medicine", "Law"]
    },
    {
      country: "Canada",
      universities: "100+",
      students: "640K+ international",
      popular: ["Computer Science", "MBA", "Healthcare"]
    },
    {
      country: "Australia",
      universities: "40+",
      students: "700K+ international",
      popular: ["Engineering", "Business", "Design"]
    }
  ]

  const services = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "University Selection",
      description: "Find the perfect university based on your profile, goals, and budget"
    },
    {
      icon: <ClipboardList className="w-6 h-6" />,
      title: "Application Support",
      description: "Complete application assistance including SOP, LOR, and essays"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Visa Guidance",
      description: "Step-by-step visa application support and interview preparation"
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Scholarship Help",
      description: "Identify and apply for scholarships to reduce education costs"
    },
    {
      icon: <Plane className="w-6 h-6" />,
      title: "Pre-Departure",
      description: "Complete guidance on travel, accommodation, and settling abroad"
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "Accommodation",
      description: "Help finding safe and affordable housing near your university"
    }
  ]

  const process = [
    "Profile Evaluation",
    "University Shortlisting",
    "Test Preparation",
    "Application Filing",
    "Visa Processing",
    "Pre-Departure Briefing"
  ]

  const popularCourses = [
    { name: "Computer Science", icon: "💻", demand: "Very High" },
    { name: "Business Administration", icon: "📊", demand: "High" },
    { name: "Data Science", icon: "📈", demand: "Very High" },
    { name: "Medicine", icon: "⚕️", demand: "High" },
    { name: "Engineering", icon: "⚙️", demand: "High" },
    { name: "Psychology", icon: "🧠", demand: "Medium" }
  ]

  const stats = [
    { label: "Partner Universities", value: "500+" },
    { label: "Countries Covered", value: "20+" },
    { label: "Students Placed", value: "10,000+" },
    { label: "Visa Success Rate", value: "98%" }
  ]

  return (
    <>
      <TopBanner />
      <Navigation />
      <FloatingActions />
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50/30 pt-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        {[15, 28, 41, 54, 67, 80, 93, 7, 21, 34, 47, 60, 73, 86, 99, 13, 26, 39, 52, 65].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400/20 rounded-full"
            style={{
              left: `${pos}%`,
              top: `${((i * 21) % 75) + 12}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: (i % 3) + 3.2,
              repeat: Infinity,
              delay: (i % 7) * 0.35,
            }}
          />
        ))}
        
        {/* Flowing Lines */}
        {[240, 370, 310, 460, 290, 410].map((width, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-0.5 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"
            style={{
              width: `${width}px`,
              left: `${(i * 19) % 76}%`,
              top: `${(i * 26) % 72 + 14}%`,
            }}
            animate={{
              x: [-800, 800],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: (i % 3) * 2.1 + 6.2,
              repeat: Infinity,
              delay: i * 1.4,
            }}
          />
        ))}

        {/* Geometric Shapes */}
        {[38, 56, 30, 44, 42, 60, 34, 50].map((size, i) => (
          <motion.div
            key={`shape-${i}`}
            className={`absolute ${i % 2 === 0 ? 'bg-emerald-400/10' : 'bg-green-400/10'} ${
              i % 3 === 0 ? 'rounded-full' : 'rounded-lg'
            }`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${(i * 16 + 6) % 84}%`,
              top: `${(i * 26 + 12) % 66}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: (i % 4) * 1.7 + 8.8,
              repeat: Infinity,
              delay: i * 1.7,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4 relative z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center bg-gradient-to-br from-emerald-500/90 to-green-600/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Study <span className="text-emerald-100">Abroad</span> Services
            </h1>
            <p className="text-xl text-emerald-50 max-w-3xl mx-auto">
              Your gateway to world-class education at top universities globally
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-emerald-600 mb-2">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-4 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            End-to-End Support Services
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)", 
                  transition: { duration: 0.3, ease: "easeOut" } 
                }}
                className="bg-white border border-emerald-200 rounded-xl p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              >
                <div className="bg-emerald-100 group-hover:bg-emerald-200 rounded-lg p-3 inline-block mb-4 transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {service.description}
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4">
                  <div className="w-full h-0.5 bg-gradient-to-r from-emerald-400 to-green-500"></div>
                  <p className="text-sm text-emerald-600 mt-2 font-medium">
                    {service.title === "University Selection" && "Access to 500+ partner universities worldwide"}
                    {service.title === "Application Support" && "End-to-end application management"}
                    {service.title === "Visa Guidance" && "98% visa success rate"}
                    {service.title === "Scholarship Help" && "Up to 50% tuition fee scholarships"}
                    {service.title === "Pre-Departure" && "Complete orientation & travel assistance"}
                    {service.title === "Accommodation" && "Safe housing options near campus"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Destinations */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Top Study Destinations
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((dest, index) => (
              <motion.div
                key={dest.country}
                initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl p-6"
              >
                <div className="flex items-center mb-4">
                  <MapPin className="w-6 h-6 text-emerald-600 mr-2" />
                  <h3 className="text-2xl font-bold text-gray-900">{dest.country}</h3>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">{dest.universities}</span> Universities
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">{dest.students}</span> Students
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2">Popular Programs:</p>
                  <div className="flex flex-wrap gap-1">
                    {dest.popular.map((prog) => (
                      <span key={prog} className="text-xs bg-white px-2 py-1 rounded">
                        {prog}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-12 px-4 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Popular Courses
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCourses.map((course, index) => (
              <motion.div
                key={course.name}
                initial={{ opacity: 0, x: -30, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="flex items-center justify-between bg-gray-50 rounded-lg p-4 hover:bg-emerald-50 transition-colors"
              >
                <div className="flex items-center">
                  <span className="text-3xl mr-4">{course.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">{course.name}</h4>
                    <p className="text-sm text-gray-600">Demand: {course.demand}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Our Process
          </motion.h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {process.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 30, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="relative"
              >
                <div className="bg-emerald-500 text-white rounded-full px-6 py-3 font-semibold">
                  {index + 1}. {step}
                </div>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-emerald-400">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 px-4 bg-gradient-to-r from-emerald-500 to-green-600 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Why Choose AdmitVerse
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-white">
              <HeartHandshake className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Free Counseling</h3>
              <p>No service charges for university applications</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-white">
              <Globe className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Global Network</h3>
              <p>Partnerships with 500+ universities worldwide</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-white">
              <GraduationCap className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
              <p>Counselors with 10+ years of experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Start Your Global Education Journey
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get personalized guidance for studying at your dream university abroad
            </p>
            <Link
              href="/#book-counseling"
              className="inline-block bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            >
              Book Free Counseling
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  )
}