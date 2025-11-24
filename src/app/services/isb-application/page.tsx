'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import TopBanner from '@/components/TopBanner'
import Footer from '@/components/Footer'
import FloatingActions from '@/components/FloatingActions'
import AnimatedCounter from '@/components/AnimatedCounter'
import { 
  Award,
  BookOpen,
  Target,
  Users,
  FileCheck,
  PenTool,
  Calendar,
  BarChart
} from 'lucide-react'
import Link from 'next/link'

export default function ISBApplicationPage() {
  const isbPrograms = [
    {
      name: "Post Graduate Programme in Management (PGP)",
      duration: "12 months",
      description: "Flagship full-time MBA program"
    },
    {
      name: "Post Graduate Programme in Management for Senior Executives (PGPMAX)",
      duration: "15 months",
      description: "For executives with 10+ years experience"
    },
    {
      name: "Post Graduate Programme in Management for Working Professionals (PGPPRO)",
      duration: "18 months",
      description: "Weekend program for working professionals"
    },
    {
      name: "Fellow Programme in Management (FPM)",
      duration: "4-5 years",
      description: "Doctoral program in management"
    }
  ]

  const applicationComponents = [
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Application Form",
      description: "Complete and error-free application form submission"
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      title: "Essays",
      description: "Compelling essays that showcase your unique story and goals"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Recommendations",
      description: "Strong recommendation letters from the right recommenders"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Interview Prep",
      description: "Comprehensive interview preparation and mock sessions"
    }
  ]

  const admissionStats = [
    { label: "Success Rate", value: "95%" },
    { label: "Applications Handled", value: "500+" },
    { label: "Average GMAT", value: "710" },
    { label: "Years of Experience", value: "10+" }
  ]

  const timeline = [
    { month: "April - June", activity: "GMAT/GRE Preparation" },
    { month: "July - August", activity: "Application Strategy & Essay Writing" },
    { month: "September", activity: "Application Submission (Round 1)" },
    { month: "October", activity: "Interview Preparation" },
    { month: "November", activity: "Round 1 Results" },
    { month: "December", activity: "Round 2 Applications" }
  ]

  return (
    <>
      <TopBanner />
      <Navigation />
      <FloatingActions />
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30 pt-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        {[12, 25, 38, 51, 64, 77, 90, 18, 31, 44, 57, 70, 83, 96, 9, 22, 35, 48, 61, 74].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            style={{
              left: `${pos}%`,
              top: `${((i * 17) % 85) + 8}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: (i % 3) + 3.5,
              repeat: Infinity,
              delay: (i % 5) * 0.4,
            }}
          />
        ))}
        
        {/* Flowing Lines */}
        {[250, 380, 320, 480, 280, 420].map((width, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-0.5 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
            style={{
              width: `${width}px`,
              left: `${(i * 18) % 75}%`,
              top: `${(i * 28) % 75 + 12}%`,
            }}
            animate={{
              x: [-800, 800],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: (i % 3) * 1.8 + 6.5,
              repeat: Infinity,
              delay: i * 1.2,
            }}
          />
        ))}

        {/* Geometric Shapes */}
        {[42, 58, 32, 48, 38, 52, 28, 45].map((size, i) => (
          <motion.div
            key={`shape-${i}`}
            className={`absolute ${i % 2 === 0 ? 'bg-blue-400/10' : 'bg-blue-400/10'} ${
              i % 3 === 0 ? 'rounded-full' : 'rounded-lg'
            }`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${(i * 17 + 8) % 80}%`,
              top: `${(i * 22 + 15) % 65}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: (i % 4) * 1.8 + 9,
              repeat: Infinity,
              delay: i * 1.8,
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
            className="text-center bg-gradient-to-br from-blue-500/90 to-blue-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ISB <span className="text-blue-100">Application</span> Services
            </h1>
            <p className="text-xl text-blue-50 max-w-3xl mx-auto">
              Expert guidance for Indian School of Business admissions - One of Asia's top business schools
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {admissionStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ISB Programs */}
      <section className="py-12 px-4 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            ISB Programs We Cover
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {isbPrograms.map((program, index) => (
              <motion.div
                key={program.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40, scale: 0.9, rotateY: index % 2 === 0 ? -10 : 10 }}
                whileInView={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {program.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-2">{program.duration}</p>
                <p className="text-gray-600">{program.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Components */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Our Application Support
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applicationComponents.map((component, index) => (
              <motion.div
                key={component.title}
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
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              >
                <div className="bg-blue-100 group-hover:bg-blue-200 rounded-lg p-3 inline-block mb-4 transition-colors duration-300">
                  {component.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                  {component.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {component.description}
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4">
                  <div className="w-full h-0.5 bg-gradient-to-r from-blue-400 to-blue-500"></div>
                  <p className="text-sm text-blue-600 mt-2 font-medium">
                    {component.title === "Application Form" && "Complete guidance on ISB application portal"}
                    {component.title === "Essays" && "Personalized essay coaching and review"}
                    {component.title === "Recommendations" && "Strategic recommender selection and briefing"}
                    {component.title === "Interview Prep" && "Mock interviews with ISB alumni"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 px-4 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Application Timeline
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timeline.map((item, index) => (
              <motion.div
                key={item.month}
                initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="flex items-start space-x-4"
              >
                <div className="bg-blue-500 text-white rounded-full p-2 mt-1">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{item.month}</h4>
                  <p className="text-gray-600">{item.activity}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why ISB */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-500 to-blue-800 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Why Choose ISB?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-white">
              <Award className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">#1 in India</h3>
              <p>Consistently ranked as India's top business school</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-white">
              <BarChart className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">₹34.26 LPA</h3>
              <p>Average salary for PGP graduates</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-white">
              <BookOpen className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Global Faculty</h3>
              <p>Learn from world-class faculty and industry leaders</p>
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
              Ready to Apply to ISB?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get personalized guidance from ISB alumni and admission experts
            </p>
            <Link
              href="/#book-counseling"
              className="inline-block bg-gradient-to-r from-blue-500 to-blue-800 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            >
              Start Your Application
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  )
}