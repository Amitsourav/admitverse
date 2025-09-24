'use client'

import Link from 'next/link'
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    'Quick Links': [
      { href: '/universities', label: 'Universities' },
      { href: '/courses', label: 'Courses' },
      { href: '/countries', label: 'Countries' },
      { href: '/scholarships', label: 'Scholarships' },
    ],
    'Support': [
      { href: '/contact', label: 'Contact Us' },
      { href: '/faq', label: 'FAQ' },
      { href: '/help', label: 'Help Center' },
      { href: '/support', label: 'Student Support' },
    ],
    'Company': [
      { href: '/about', label: 'About Us' },
      { href: '/careers', label: 'Careers' },
      { href: '/blog', label: 'Blog' },
      { href: '/news', label: 'News' },
    ],
    'Legal': [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/cookies', label: 'Cookie Policy' },
      { href: '/disclaimer', label: 'Disclaimer' },
    ],
  }

  const socialLinks = [
    { href: '#', icon: Facebook, label: 'Facebook' },
    { href: '#', icon: Twitter, label: 'Twitter' },
    { href: '#', icon: Instagram, label: 'Instagram' },
    { href: '#', icon: Linkedin, label: 'LinkedIn' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">AdmitVerse</span>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your gateway to international education. Discover top universities worldwide and make your dream of studying abroad a reality.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-gray-300">info@admitverse.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-gray-300">New York, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4 text-white">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            © {currentYear} AdmitVerse. All rights reserved.
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors duration-200"
                  aria-label={social.label}
                >
                  <Icon className="w-4 h-4" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}