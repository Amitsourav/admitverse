'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import TopBanner from '@/components/TopBanner'
import Footer from '@/components/Footer'
import FloatingActions from '@/components/FloatingActions'
import { 
  DollarSign, 
  FileText, 
  CheckCircle, 
  Clock, 
  Shield,
  TrendingUp,
  Users,
  Calculator
} from 'lucide-react'
import Link from 'next/link'

export default function EducationLoanPage() {
  const loanFeatures = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Competitive Interest Rates",
      description: "Get loans at the best interest rates from leading banks and financial institutions"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "100% Financing",
      description: "Cover tuition fees, living expenses, travel costs, and other education-related expenses"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Quick Processing",
      description: "Fast loan approval and disbursement to meet admission deadlines"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Minimal Documentation",
      description: "Simplified paperwork and documentation process for hassle-free loan approval"
    }
  ]

  const loanProcess = [
    {
      step: 1,
      title: "Consultation",
      description: "Free consultation to understand your financial needs and loan requirements"
    },
    {
      step: 2,
      title: "Bank Selection",
      description: "Help you choose the best bank based on interest rates and terms"
    },
    {
      step: 3,
      title: "Documentation",
      description: "Assist in preparing and organizing all required documents"
    },
    {
      step: 4,
      title: "Application",
      description: "Submit loan application and follow up with the bank"
    },
    {
      step: 5,
      title: "Approval",
      description: "Get loan sanctioned and disbursed on time"
    }
  ]

  const eligibleCountries = [
    "USA", "UK", "Canada", "Australia", "Germany", "France", 
    "Netherlands", "Ireland", "New Zealand", "Singapore"
  ]

  return (
    <>
      <TopBanner />
      <Navigation />
      <FloatingActions />
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50/30 pt-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        {[10, 20, 30, 40, 50, 60, 70, 80, 90, 15, 25, 35, 45, 55, 65, 75, 85, 95, 12, 87].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400/20 rounded-full"
            style={{
              left: `${pos}%`,
              top: `${((i * 13) % 90) + 5}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: (i % 3) + 3,
              repeat: Infinity,
              delay: (i % 4) * 0.5,
            }}
          />
        ))}
        
        {/* Flowing Lines */}
        {[200, 350, 300, 450, 250, 400].map((width, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-0.5 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"
            style={{
              width: `${width}px`,
              left: `${(i * 20) % 80}%`,
              top: `${(i * 25) % 80 + 10}%`,
            }}
            animate={{
              x: [-800, 800],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: (i % 3) * 2 + 6,
              repeat: Infinity,
              delay: i * 1.5,
            }}
          />
        ))}

        {/* Geometric Shapes */}
        {[40, 60, 30, 50, 35, 45, 55, 25].map((size, i) => (
          <motion.div
            key={`shape-${i}`}
            className={`absolute ${i % 2 === 0 ? 'bg-emerald-400/10' : 'bg-green-400/10'} ${
              i % 3 === 0 ? 'rounded-full' : 'rounded-lg'
            }`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${(i * 15 + 5) % 85}%`,
              top: `${(i * 20 + 10) % 70}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: (i % 4) * 2 + 8,
              repeat: Infinity,
              delay: i * 2,
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
              Education <span className="text-emerald-100">Loan</span> Assistance
            </h1>
            <p className="text-xl text-emerald-50 max-w-3xl mx-auto">
              Making quality education accessible with comprehensive loan support for studying abroad
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Why Choose Our Loan Service
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {loanFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  transition: { duration: 0.3, ease: "easeOut" } 
                }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              >
                <div className="bg-emerald-100 group-hover:bg-emerald-200 rounded-lg p-3 inline-block mb-4 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4">
                  <div className="w-full h-0.5 bg-gradient-to-r from-emerald-400 to-green-500"></div>
                  <p className="text-sm text-emerald-600 mt-2 font-medium">
                    {feature.title === "Competitive Interest Rates" && "Starting from 8.5% per annum"}
                    {feature.title === "100% Financing" && "Up to ₹1.5 Crore coverage"}
                    {feature.title === "Quick Processing" && "Approval within 7-10 days"}
                    {feature.title === "Minimal Documentation" && "Digital submission supported"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Process */}
      <section className="py-12 px-4 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Our Loan Process
          </motion.h2>
          
          <div className="grid md:grid-cols-5 gap-4">
            {loanProcess.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -30, rotateY: -10 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="text-center"
              >
                <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Details */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Loan Coverage</h3>
            <ul className="space-y-3">
              {[
                "Tuition Fees",
                "Living Expenses",
                "Travel Costs",
                "Insurance Premium",
                "Laptop/Books",
                "Other Education Expenses"
              ].map((item) => (
                <li key={item} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Eligible Countries</h3>
            <div className="grid grid-cols-2 gap-3">
              {eligibleCountries.map((country) => (
                <div
                  key={country}
                  className="bg-emerald-50 rounded-lg px-4 py-2 text-center text-gray-700"
                >
                  {country}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-12 px-4 bg-gradient-to-r from-emerald-500 to-green-600 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Partner Banks & Financial Institutions
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-white">
              <Users className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">15+ Partner Banks</h3>
              <p>Tie-ups with leading banks and NBFCs</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-white">
              <TrendingUp className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Up to 1.5 Crore</h3>
              <p>Maximum loan amount available</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-white">
              <Calculator className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Flexible Repayment</h3>
              <p>EMI starts after course completion</p>
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
              Ready to Apply for Education Loan?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get expert guidance and support throughout your loan application process
            </p>
            <Link
              href="/#book-counseling"
              className="inline-block bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            >
              Get Free Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  )
}