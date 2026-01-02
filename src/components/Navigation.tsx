'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X, GraduationCap, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const router = useRouter()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services', hasDropdown: true },
    { href: '/universities', label: 'Universities' },
    { href: '/courses', label: 'Courses' },
    { href: '/countries', label: 'Countries' },
    { href: '/career', label: 'Career' },
    { href: '/contact', label: 'Contact' },
  ]

  const serviceOptions = [
    { href: '/services/education-loan', label: 'Education Loan' },
    { href: '/services/isb-application', label: 'ISB Application' },
    { href: '/services/gdpi-preparation', label: 'GDPI Preparation' },
    { href: '/services/germany-universities', label: 'Germany Public' },
    { href: '/services/study-abroad', label: 'Study Abroad' },
  ]

  const scrollToCounseling = () => {
    const counselingSection = document.getElementById('book-counseling')
    if (counselingSection) {
      // If on homepage, scroll to form
      counselingSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    } else {
      // If not on homepage, redirect to homepage with hash
      router.push('/#book-counseling')
    }
    setMobileMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img 
              src="/admitverse-logo.jpg" 
              alt="AdmitVerse" 
              className="h-10 w-auto rounded-xl"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.hasDropdown ? (
                <div
                  key={link.href}
                  className="relative group"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  <button className="flex items-center text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 group">
                    {link.label}
                    <motion.div
                      animate={{ rotate: servicesDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="ml-1 w-4 h-4" />
                    </motion.div>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {servicesDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ 
                          duration: 0.2,
                          ease: "easeOut"
                        }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                      >
                        {serviceOptions.map((option, index) => (
                          <motion.div
                            key={option.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                              delay: index * 0.05,
                              duration: 0.3
                            }}
                          >
                            <Link
                              href={option.href}
                              className="block px-5 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-50 hover:text-blue-600 transition-all duration-200 relative group/item"
                            >
                              <span className="relative z-10">{option.label}</span>
                              <motion.div
                                className="absolute left-0 top-0 h-full w-1 bg-blue-500"
                                initial={{ scaleY: 0 }}
                                whileHover={{ scaleY: 1 }}
                                transition={{ duration: 0.2 }}
                                style={{ originY: 0.5 }}
                              />
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200"
                >
                  {link.label}
                </Link>
              )
            ))}
            <button
              onClick={scrollToCounseling}
              className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
            >
              Book Free Counseling
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                link.hasDropdown ? (
                  <div key={link.href}>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="flex items-center justify-between w-full text-gray-700 font-semibold py-2 transition-colors duration-200"
                    >
                      <span>{link.label}</span>
                      <motion.div
                        animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-4 mt-2 space-y-2 pb-2">
                            {serviceOptions.map((option, index) => (
                              <motion.div
                                key={option.href}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <Link
                                  href={option.href}
                                  className="block text-gray-600 hover:text-blue-600 py-2 pl-4 border-l-2 border-transparent hover:border-blue-500 transition-all duration-200"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {option.label}
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-gray-700 hover:text-blue-600 font-semibold py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <button
                onClick={scrollToCounseling}
                className="block w-full bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 py-2 rounded-lg font-medium text-center"
              >
                Book Free Counseling
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}