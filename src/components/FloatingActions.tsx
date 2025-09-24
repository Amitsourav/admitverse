'use client'

import { useState } from 'react'
import { MessageCircle, Phone, Mail, HelpCircle, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    {
      icon: MessageCircle,
      label: 'Live Chat',
      href: '#chat',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      icon: Phone,
      label: 'Call Us',
      href: 'tel:+15551234567',
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:info@admitverse.com',
      color: 'bg-purple-500 hover:bg-purple-600',
    },
    {
      icon: HelpCircle,
      label: 'Help',
      href: '/help',
      color: 'bg-orange-500 hover:bg-orange-600',
    },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Action Menu */}
      <div className="flex flex-col items-end space-y-3">
        {/* Action Items */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col space-y-3"
            >
              {actions.map((action, index) => {
                const Icon = action.icon
                return (
                  <motion.a
                    key={action.label}
                    href={action.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`group flex items-center space-x-3 ${action.color} text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium whitespace-nowrap pr-1">
                      {action.label}
                    </span>
                  </motion.a>
                )
              })}
              
              {/* Scroll to Top */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: actions.length * 0.1 }}
                onClick={scrollToTop}
                className="group flex items-center space-x-3 bg-gray-700 hover:bg-gray-800 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                <ChevronUp className="w-5 h-5" />
                <span className="text-sm font-medium whitespace-nowrap pr-1">
                  Top
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <ChevronUp className="w-6 h-6" />
            ) : (
              <MessageCircle className="w-6 h-6" />
            )}
          </motion.div>
        </motion.button>
      </div>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 -z-10"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}