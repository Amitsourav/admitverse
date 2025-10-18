'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Send, Users, Sparkles, FileText } from 'lucide-react'

export default function TopBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="relative bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-600 px-4 py-3 text-white shadow-lg z-40"
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M0 20h40v2H0v-2zm0-20h40v2H0V0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          {/* Left side - Announcement text */}
          <div className="flex items-center gap-2 mb-3 md:mb-0">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </motion.div>
            <span className="text-sm md:text-base font-medium">
              Join our community for exclusive tips, updates & scholarships! 🎓
            </span>
            <motion.a
              href="#" // Replace # with your PDF link later, e.g., "/mba-guide.pdf" or external URL
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 ml-3 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-semibold text-yellow-100">Free PDF with all MBA queries</span>
            </motion.a>
          </div>

          {/* Right side - Buttons */}
          <div className="flex items-center gap-3">
            {/* WhatsApp Button */}
            <motion.a
              href="https://wa.me/919876543210?text=Hi%20I%20want%20to%20join%20AdmitVerse%20WhatsApp%20Group"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border border-white/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Join WhatsApp</span>
              <span className="sm:hidden">WhatsApp</span>
              <motion.span
                className="bg-green-400 text-emerald-900 px-2 py-0.5 rounded-full text-xs font-bold"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                5K+
              </motion.span>
            </motion.a>

            {/* Telegram Button */}
            <motion.a
              href="https://t.me/admitverse"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border border-white/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Join Telegram</span>
              <span className="sm:hidden">Telegram</span>
              <motion.span
                className="bg-blue-400 text-blue-900 px-2 py-0.5 rounded-full text-xs font-bold"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
              >
                3K+
              </motion.span>
            </motion.a>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}