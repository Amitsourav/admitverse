'use client'

import { Bot, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="flex flex-col space-y-3">
        {/* AI Matching Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/ai-matching"
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Bot className="w-5 h-5" />
            <span className="font-semibold">AI Matching</span>
          </Link>
        </motion.div>

        {/* Blog Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/blog"
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-800 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <BookOpen className="w-5 h-5" />
            <span className="font-semibold">Blog</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}