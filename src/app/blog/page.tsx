'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FloatingActions from '@/components/FloatingActions'
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  ArrowRight,
  BookOpen,
  Globe,
  TrendingUp,
  Target,
  Award,
  Users,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function BlogPage() {
  const featuredPosts = [
    {
      id: 1,
      title: "Complete Guide to Studying in the USA: Everything You Need to Know in 2024",
      excerpt: "From choosing the right university to visa applications, this comprehensive guide covers every aspect of studying in America.",
      author: "Dr. Sarah Chen",
      date: "December 15, 2024",
      readTime: "12 min read",
      category: "Study Abroad",
      image: "/blog/usa-study-guide.jpg",
      featured: true,
      tags: ["USA", "Universities", "Visa", "Applications"]
    },
    {
      id: 2,
      title: "Top 10 Scholarships for International Students in 2024",
      excerpt: "Discover fully-funded scholarships worth millions that can make your dream education affordable.",
      author: "Prof. Michael Rodriguez",
      date: "December 12, 2024",
      readTime: "8 min read",
      category: "Scholarships",
      image: "/blog/scholarships-2024.jpg",
      featured: true,
      tags: ["Scholarships", "Funding", "International"]
    }
  ]

  const blogPosts = [
    {
      id: 3,
      title: "How to Write a Winning Statement of Purpose (SOP) for Top Universities",
      excerpt: "Learn the art of crafting compelling SOPs that get noticed by admissions committees at world's best universities.",
      author: "Dr. Emily Watson",
      date: "December 10, 2024",
      readTime: "10 min read",
      category: "Applications",
      tags: ["SOP", "Writing", "Applications", "Tips"]
    },
    {
      id: 4,
      title: "Canada vs UK vs Australia: Which Country is Best for Your Master's Degree?",
      excerpt: "A detailed comparison of education systems, costs, work opportunities, and immigration policies.",
      author: "James Thompson",
      date: "December 8, 2024",
      readTime: "15 min read",
      category: "Country Comparison",
      tags: ["Canada", "UK", "Australia", "Masters"]
    },
    {
      id: 5,
      title: "IELTS vs TOEFL vs PTE: Which English Test Should You Take?",
      excerpt: "Complete breakdown of all major English proficiency tests to help you choose the right one for your goals.",
      author: "Prof. Lisa Park",
      date: "December 5, 2024",
      readTime: "7 min read",
      category: "Test Preparation",
      tags: ["IELTS", "TOEFL", "PTE", "English Tests"]
    },
    {
      id: 6,
      title: "MBA Application Strategy: From GMAT to Interview Success",
      excerpt: "Step-by-step guide to securing admission in top MBA programs worldwide with expert insights.",
      author: "Dr. Robert Kumar",
      date: "December 3, 2024",
      readTime: "12 min read",
      category: "MBA",
      tags: ["MBA", "GMAT", "Strategy", "Applications"]
    },
    {
      id: 7,
      title: "Student Visa Interview: 50+ Questions and Perfect Answers",
      excerpt: "Comprehensive preparation guide with real interview questions and expert-approved answers.",
      author: "Maria González",
      date: "December 1, 2024",
      readTime: "9 min read",
      category: "Visa",
      tags: ["Visa", "Interview", "Preparation", "Success"]
    },
    {
      id: 8,
      title: "Cost of Studying Abroad: Complete Financial Planning Guide 2024",
      excerpt: "Detailed breakdown of education costs, living expenses, and money-saving tips for international students.",
      author: "Dr. Alex Johnson",
      date: "November 28, 2024",
      readTime: "11 min read",
      category: "Finance",
      tags: ["Costs", "Budget", "Finance", "Planning"]
    }
  ]

  const categories = [
    { name: "Study Abroad", count: 15, icon: Globe },
    { name: "Scholarships", count: 12, icon: Award },
    { name: "Applications", count: 18, icon: Target },
    { name: "Test Preparation", count: 10, icon: BookOpen },
    { name: "Visa", count: 8, icon: Users },
    { name: "MBA", count: 6, icon: TrendingUp }
  ]

  const popularTags = [
    "USA", "UK", "Canada", "Australia", "Scholarships", "IELTS", "TOEFL", 
    "SOP", "LOR", "MBA", "MS", "PhD", "Visa", "Interview", "GMAT", "GRE"
  ]

  return (
    <>
      <Navigation />
      <FloatingActions />
      <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50/30 pt-20">
        
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Education <span className="text-emerald-600">Insights</span> & Guidance
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Expert advice, insider tips, and comprehensive guides to help you navigate your international education journey successfully.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>500+ Articles</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Expert Authors</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span>Global Insights</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 mb-8"
            >
              Featured Articles
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-64 bg-gradient-to-r from-emerald-500 to-green-600">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-100 transition-colors">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <Link 
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold group"
                    >
                      Read Full Article
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Categories and Recent Posts */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              
              {/* Main Content */}
              <div className="lg:col-span-3">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold text-gray-900 mb-8"
                >
                  Latest Articles
                </motion.h2>
                
                <div className="space-y-6">
                  {blogPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                          {post.category}
                        </span>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        
                        <Link 
                          href={`/blog/${post.id}`}
                          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold group"
                        >
                          Read More
                          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Categories */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-xl p-6 mb-8"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
                  <div className="space-y-3">
                    {categories.map((category) => {
                      const Icon = category.icon
                      return (
                        <Link
                          key={category.name}
                          href={`/blog/category/${category.name.toLowerCase().replace(' ', '-')}`}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all group"
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className="w-5 h-5 text-emerald-600" />
                            <span className="text-gray-700 group-hover:text-gray-900">{category.name}</span>
                          </div>
                          <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-sm">
                            {category.count}
                          </span>
                        </Link>
                      )
                    })}
                  </div>
                </motion.div>

                {/* Popular Tags */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-gray-50 rounded-xl p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog/tag/${tag.toLowerCase()}`}
                        className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 px-4 bg-gradient-to-r from-emerald-500 to-green-600">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <h2 className="text-3xl font-bold mb-4">
                Stay Updated with Latest Education Insights
              </h2>
              <p className="text-emerald-100 mb-8 text-lg">
                Get weekly expert tips, university updates, and scholarship alerts delivered to your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:outline-none"
                />
                <button className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Subscribe
                </button>
              </div>
              
              <p className="text-emerald-100 text-sm mt-4">
                Join 50,000+ students who trust our insights. Unsubscribe anytime.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}