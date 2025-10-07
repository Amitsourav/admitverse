'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FloatingActions from '@/components/FloatingActions'
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  BookOpen,
  ChevronRight,
  ThumbsUp,
  Eye,
  Tag
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useParams } from 'next/navigation'

// Blog posts data (in real app, this would come from an API or database)
const blogPosts: { [key: string]: any } = {
  '1': {
    title: "Complete Guide to Studying in the USA: Everything You Need to Know in 2024",
    author: "Dr. Sarah Chen",
    authorTitle: "International Education Expert",
    date: "December 15, 2024",
    readTime: "12 min read",
    category: "Study Abroad",
    views: "15,234",
    likes: "1,289",
    tags: ["USA", "Universities", "Visa", "Applications", "Scholarships", "Student Life"],
    image: "/blog/usa-study-guide.jpg",
    content: `
      <h2>Introduction</h2>
      <p>The United States continues to be the world's most popular destination for international students, with over one million students from around the globe pursuing their academic dreams at American institutions. This comprehensive guide will walk you through everything you need to know about studying in the USA in 2024.</p>
      
      <h2>Why Choose the USA for Higher Education?</h2>
      <p>The United States offers unparalleled educational opportunities with over 4,500 degree-granting institutions. American universities consistently rank among the best globally, with institutions like MIT, Harvard, Stanford, and Yale leading in various fields.</p>
      
      <h3>Academic Excellence and Innovation</h3>
      <p>US universities are at the forefront of research and innovation. They offer state-of-the-art facilities, cutting-edge technology, and opportunities to work with leading experts in every field. The emphasis on practical learning and research ensures that students gain hands-on experience alongside theoretical knowledge.</p>
      
      <h3>Diverse Program Options</h3>
      <p>Whether you're interested in STEM fields, liberal arts, business, or creative disciplines, American universities offer an incredibly diverse range of programs. The flexibility of the American education system allows students to explore different subjects before declaring their major, making it ideal for those still discovering their passions.</p>
      
      <h2>Understanding the US Education System</h2>
      <p>The US higher education system is unique in its structure and approach. Understanding these differences is crucial for international students planning to study in America.</p>
      
      <h3>Degree Levels</h3>
      <ul>
        <li><strong>Associate Degree:</strong> 2-year programs offered at community colleges</li>
        <li><strong>Bachelor's Degree:</strong> 4-year undergraduate programs</li>
        <li><strong>Master's Degree:</strong> 1-2 year graduate programs</li>
        <li><strong>Doctoral Degree (PhD):</strong> 3-7 year advanced research programs</li>
      </ul>
      
      <h3>Credit System and GPA</h3>
      <p>US universities use a credit system where each course is worth a certain number of credits based on the hours spent in class. Students typically need 120-130 credits to graduate with a bachelor's degree. The Grade Point Average (GPA) system measures academic performance on a 4.0 scale.</p>
      
      <h2>Application Process</h2>
      <p>Applying to US universities requires careful planning and preparation. Here's a step-by-step guide to navigate the application process successfully.</p>
      
      <h3>Timeline and Deadlines</h3>
      <p>Most US universities have application deadlines between December and February for fall admission. It's recommended to start your preparation at least 12-18 months before your intended start date.</p>
      
      <h3>Required Documents</h3>
      <ul>
        <li>Academic transcripts and certificates</li>
        <li>Standardized test scores (SAT/ACT for undergrad, GRE/GMAT for grad)</li>
        <li>English proficiency test scores (TOEFL/IELTS)</li>
        <li>Statement of Purpose (SOP)</li>
        <li>Letters of Recommendation (LORs)</li>
        <li>Resume/CV</li>
        <li>Financial documents</li>
      </ul>
      
      <h2>Visa Process</h2>
      <p>Once you receive your admission letter and I-20 form, you'll need to apply for an F-1 student visa. The process involves:</p>
      <ol>
        <li>Paying the SEVIS fee</li>
        <li>Completing the DS-160 form online</li>
        <li>Scheduling a visa interview at the US embassy/consulate</li>
        <li>Preparing for the visa interview with all required documents</li>
      </ol>
      
      <h2>Cost and Financial Planning</h2>
      <p>Studying in the USA can be expensive, but proper planning and exploring funding options can make it achievable.</p>
      
      <h3>Tuition Fees</h3>
      <p>Annual tuition fees vary significantly:</p>
      <ul>
        <li>Community Colleges: $3,000 - $12,000</li>
        <li>State Universities (out-of-state): $20,000 - $35,000</li>
        <li>Private Universities: $30,000 - $60,000+</li>
      </ul>
      
      <h3>Living Expenses</h3>
      <p>Monthly living costs range from $1,000 to $2,500 depending on location and lifestyle. Major cities like New York and San Francisco are significantly more expensive than smaller college towns.</p>
      
      <h2>Scholarships and Financial Aid</h2>
      <p>Many universities offer merit-based scholarships to international students. Additionally, explore external scholarships from organizations like Fulbright, Rotary International, and various government programs.</p>
      
      <h2>Campus Life and Culture</h2>
      <p>American campus life offers a unique blend of academic rigor and extracurricular opportunities. From sports teams and cultural clubs to research projects and internships, there are countless ways to enrich your educational experience.</p>
      
      <h2>Career Opportunities</h2>
      <p>The Optional Practical Training (OPT) program allows international students to work in the US for up to 12 months after graduation (36 months for STEM fields). This provides valuable work experience and can be a pathway to longer-term employment opportunities.</p>
      
      <h2>Conclusion</h2>
      <p>Studying in the USA is a transformative experience that opens doors to global opportunities. With careful planning, dedication, and the right guidance, your American education dream can become a reality. Start your preparation early, research thoroughly, and don't hesitate to seek help from education consultants and current students.</p>
    `
  },
  '2': {
    title: "Top 10 Scholarships for International Students in 2024",
    author: "Prof. Michael Rodriguez",
    authorTitle: "Financial Aid Advisor",
    date: "December 12, 2024",
    readTime: "8 min read",
    category: "Scholarships",
    views: "12,456",
    likes: "2,341",
    tags: ["Scholarships", "Funding", "International", "Financial Aid"],
    content: `
      <h2>Introduction</h2>
      <p>Securing funding for international education can be challenging, but numerous scholarship opportunities exist for deserving students. This guide presents the top 10 scholarships that can make your dream education affordable.</p>
      
      <h2>1. Fulbright Foreign Student Program</h2>
      <p>The Fulbright Program is one of the most prestigious scholarships globally, offering full funding for graduate study, research, or teaching assistantships in the United States.</p>
      <ul>
        <li><strong>Coverage:</strong> Full tuition, living stipend, health insurance, airfare</li>
        <li><strong>Eligibility:</strong> Bachelor's degree, English proficiency</li>
        <li><strong>Deadline:</strong> Varies by country (typically February-October)</li>
      </ul>
      
      <h2>2. Chevening Scholarships (UK)</h2>
      <p>Funded by the UK government, Chevening offers fully-funded master's degrees at any UK university.</p>
      
      <h2>3. DAAD Scholarships (Germany)</h2>
      <p>The German Academic Exchange Service provides numerous scholarship programs for international students at all degree levels.</p>
      
      <h2>4. Erasmus Mundus Joint Masters (Europe)</h2>
      <p>Study in multiple European countries with full scholarships covering tuition, travel, and living expenses.</p>
      
      <h2>5. Australia Awards Scholarships</h2>
      <p>Full scholarships for students from developing countries to study in Australia.</p>
      
      <h2>6. Swiss Government Excellence Scholarships</h2>
      <p>For postgraduate researchers in any discipline.</p>
      
      <h2>7. Gates Cambridge Scholarships</h2>
      <p>Full-cost scholarships for outstanding students to pursue postgraduate degrees at Cambridge University.</p>
      
      <h2>8. Rhodes Scholarships (Oxford)</h2>
      <p>One of the oldest and most prestigious international scholarship programs.</p>
      
      <h2>9. Rotary Peace Fellowships</h2>
      <p>For master's degrees in peace and conflict resolution.</p>
      
      <h2>10. Joint Japan World Bank Scholarships</h2>
      <p>For students from developing countries to pursue development-related studies.</p>
    `
  }
}

// Related articles data
const relatedArticles = [
  {
    id: '3',
    title: "How to Write a Winning Statement of Purpose (SOP)",
    excerpt: "Master the art of crafting compelling SOPs that get noticed.",
    author: "Dr. Emily Watson",
    date: "December 10, 2024",
    readTime: "10 min read",
    category: "Applications"
  },
  {
    id: '4',
    title: "Canada vs UK vs Australia: Which is Best for Masters?",
    excerpt: "Detailed comparison of education systems and opportunities.",
    author: "James Thompson",
    date: "December 8, 2024",
    readTime: "15 min read",
    category: "Country Comparison"
  },
  {
    id: '5',
    title: "IELTS vs TOEFL vs PTE: Complete Comparison Guide",
    excerpt: "Choose the right English proficiency test for your goals.",
    author: "Prof. Lisa Park",
    date: "December 5, 2024",
    readTime: "7 min read",
    category: "Test Preparation"
  }
]

export default function BlogPostPage() {
  const params = useParams()
  const postId = params?.id as string
  const post = blogPosts[postId] || blogPosts['1'] // Default to first post if not found
  
  const [liked, setLiked] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const handleShare = (platform: string) => {
    const url = window.location.href
    const text = post.title
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`)
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`)
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`)
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        alert('Link copied to clipboard!')
        break
    }
    setShowShareMenu(false)
  }

  return (
    <>
      <Navigation />
      <FloatingActions />
      
      {/* New Modern Design */}
      <div className="min-h-screen bg-gray-50">
        
        {/* Clean Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <Link href="/blog" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6 transition-colors font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Link>
            
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full text-sm font-semibold">
                {post.category}
              </span>
              <span className="text-gray-500 text-sm">{post.date}</span>
              <span className="text-gray-500 text-sm">•</span>
              <span className="text-gray-500 text-sm">{post.readTime}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{post.author}</p>
                  <p className="text-gray-600 text-sm">{post.authorTitle}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-gray-500 text-sm">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{post.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{post.likes}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-4 gap-12">
            
            {/* Article Content */}
            <article className="lg:col-span-3 bg-white rounded-lg p-8 shadow-sm">
              <div 
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="prose prose-lg max-w-none
                  prose-headings:text-gray-900 prose-headings:font-bold
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-emerald-100
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-emerald-800
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-emerald-600 prose-a:font-medium hover:prose-a:text-emerald-700
                  prose-strong:text-gray-900 prose-strong:font-semibold
                  prose-ul:my-6 prose-li:text-gray-700 prose-li:mb-2
                  prose-ol:my-6
                  prose-blockquote:border-l-4 prose-blockquote:border-emerald-400 prose-blockquote:bg-emerald-50 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:my-8 prose-blockquote:italic prose-blockquote:text-emerald-800"
              />
              
              {/* Action Bar */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setLiked(!liked)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                      liked ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600 hover:bg-emerald-50'
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                    <span className="font-medium">{liked ? parseInt(post.likes) + 1 : post.likes}</span>
                  </button>
                  
                  <div className="relative">
                    <button
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-emerald-50 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      <span className="font-medium">Share</span>
                    </button>
                    
                    {showShareMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 min-w-[160px]"
                      >
                        <button
                          onClick={() => handleShare('facebook')}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 w-full text-left"
                        >
                          <Facebook className="w-4 h-4 text-blue-600" />
                          Facebook
                        </button>
                        <button
                          onClick={() => handleShare('twitter')}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 w-full text-left"
                        >
                          <Twitter className="w-4 h-4 text-blue-400" />
                          Twitter
                        </button>
                        <button
                          onClick={() => handleShare('linkedin')}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 w-full text-left"
                        >
                          <Linkedin className="w-4 h-4 text-blue-700" />
                          LinkedIn
                        </button>
                        <button
                          onClick={() => handleShare('copy')}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 w-full text-left"
                        >
                          <Link2 className="w-4 h-4 text-gray-600" />
                          Copy Link
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <div className="flex gap-2">
                    {post.tags.slice(0, 3).map((tag: string) => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${tag.toLowerCase()}`}
                        className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-medium hover:bg-emerald-200 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </article>
            
            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Table of Contents */}
              <div className="bg-white rounded-lg p-6 shadow-sm sticky top-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-emerald-600" />
                  Contents
                </h3>
                <nav className="space-y-2 text-sm">
                  <a href="#" className="block text-gray-600 hover:text-emerald-600 transition-colors py-1">Introduction</a>
                  <a href="#" className="block text-gray-600 hover:text-emerald-600 transition-colors py-1">Why Choose the USA?</a>
                  <a href="#" className="block text-gray-600 hover:text-emerald-600 transition-colors py-1">Education System</a>
                  <a href="#" className="block text-gray-600 hover:text-emerald-600 transition-colors py-1">Application Process</a>
                  <a href="#" className="block text-gray-600 hover:text-emerald-600 transition-colors py-1">Visa Process</a>
                  <a href="#" className="block text-gray-600 hover:text-emerald-600 transition-colors py-1">Scholarships</a>
                </nav>
              </div>
              
              {/* Newsletter */}
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg p-6 text-white">
                <h3 className="font-bold mb-2">Stay Updated</h3>
                <p className="text-sm text-emerald-100 mb-4">Get the latest education insights delivered to your inbox.</p>
                <button className="w-full bg-white text-emerald-600 px-4 py-2 rounded-lg font-semibold hover:bg-emerald-50 transition-colors">
                  Subscribe
                </button>
              </div>
            </aside>
          </div>
        </main>

        {/* Related Articles */}
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Continue Reading</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((article) => (
                <article key={article.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all">
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold mb-3 inline-block">
                    {article.category}
                  </span>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{article.readTime}</span>
                    <Link 
                      href={`/blog/${article.id}`}
                      className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm flex items-center gap-1"
                    >
                      Read More
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  )
}