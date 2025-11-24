'use client'

import { MessageCircle, Send, Sparkles, FileText } from 'lucide-react'

export default function TopBanner() {

  return (
    <div className="fixed top-0 left-0 right-0 z-[60]">
      <div
        className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-4 py-3 text-white shadow-lg"
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
            <div>
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <a
              href="https://chat.whatsapp.com/FTjOvaqnebw0bu5XA1SsEu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm md:text-base font-medium hover:text-yellow-200 transition-colors cursor-pointer"
            >
              Join our community for exclusive tips, updates & scholarships! 🎓
            </a>
            <a
              href="/contact"
              className="hidden lg:inline-flex items-center gap-2 ml-3 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-semibold text-yellow-100">Get Free Consultation</span>
            </a>
          </div>

          {/* Right side - Buttons */}
          <div className="flex items-center gap-3">
            {/* WhatsApp Button */}
            <a
              href="https://chat.whatsapp.com/FTjOvaqnebw0bu5XA1SsEu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border border-white/30"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Join WhatsApp</span>
              <span className="sm:hidden">WhatsApp</span>
              <span
                className="bg-blue-400 text-blue-900 px-2 py-0.5 rounded-full text-xs font-bold"
              >
                Live
              </span>
            </a>

            {/* Telegram Button */}
            <button
              onClick={() => alert('We are working on setting up our Telegram channel. Coming soon!')}
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border border-white/30 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Join Telegram</span>
              <span className="sm:hidden">Telegram</span>
              <span
                className="bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full text-xs font-bold"
              >
                Soon
              </span>
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}