'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, Gift, Star } from 'lucide-react'

interface MobileNumberPopupProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (mobile: string) => void
}

export default function MobileNumberPopup({ isOpen, onClose, onSubmit }: MobileNumberPopupProps) {
  const [mobile, setMobile] = useState('')
  const [isValid, setIsValid] = useState(true)

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onClose])

  const validateMobile = (number: string) => {
    const mobileRegex = /^[6-9]\d{9}$/
    return mobileRegex.test(number)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateMobile(mobile)) {
      onSubmit(mobile)
      setMobile('')
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10)
    setMobile(value)
    if (!isValid && value.length >= 10) {
      setIsValid(validateMobile(value))
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onClose()
            }}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[9999] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onClose()
            }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-6 text-white relative overflow-hidden">
                <motion.button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log('Close button clicked')
                    onClose()
                  }}
                  className="absolute top-3 right-3 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors z-[10000] cursor-pointer touch-manipulation"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  aria-label="Close popup"
                >
                  <X className="w-6 h-6 text-white" />
                </motion.button>
                
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="p-3 bg-white/20 rounded-full"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Gift className="w-6 h-6" />
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-bold">🎉 Special Offer!</h2>
                    <p className="text-emerald-100">Get personalized university recommendations</p>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-6 -left-6 w-16 h-16 bg-white/10 rounded-full"
                  animate={{ scale: [1.2, 1, 1.2] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="flex justify-center space-x-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.div
                        key={star}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: star * 0.1 }}
                      >
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      </motion.div>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Unlock Premium Features
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Get instant access to personalized university recommendations, scholarship alerts, and expert counseling!
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center">
                        <Phone className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">+91</span>
                      </div>
                      <input
                        type="tel"
                        value={mobile}
                        onChange={handleMobileChange}
                        placeholder="Enter your mobile number"
                        className={`w-full pl-16 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 ${
                          !isValid ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                        maxLength={10}
                      />
                    </div>
                    {!isValid && (
                      <motion.p
                        className="text-red-500 text-xs mt-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        Please enter a valid 10-digit mobile number
                      </motion.p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={mobile.length < 10}
                  >
                    Get Free Recommendations 🚀
                  </motion.button>
                </form>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    We respect your privacy. Your number will only be used for educational consultations.
                  </p>
                </div>

                {/* Benefits list */}
                <div className="mt-4 space-y-2">
                  {[
                    "🎯 Personalized university matches",
                    "💰 Scholarship opportunities",
                    "📞 Free expert counseling"
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-2 text-sm text-gray-600"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <span>{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}