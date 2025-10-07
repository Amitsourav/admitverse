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
  MessageCircle,
  ThumbsUp,
  Eye,
  Tag
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
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
  },
  '3': {
    title: "How to Write a Winning Statement of Purpose (SOP) for Top Universities",
    author: "Dr. Emily Watson",
    authorTitle: "Admissions Consultant",
    date: "December 10, 2024",
    readTime: "10 min read",
    category: "Applications",
    views: "8,923",
    likes: "1,567",
    tags: ["SOP", "Writing", "Applications", "Tips", "Universities"],
    content: `
      <h2>Introduction</h2>
      <p>Your Statement of Purpose (SOP) is arguably the most critical component of your graduate school application. It's your opportunity to tell your unique story and convince the admissions committee that you're the perfect fit for their program.</p>
      
      <h2>Understanding the Purpose</h2>
      <p>An SOP is not just a formal essay about your achievements. It's a narrative that connects your past experiences, present motivations, and future goals. The admissions committee wants to understand who you are beyond your grades and test scores.</p>
      
      <h2>Structure of a Winning SOP</h2>
      <h3>1. Compelling Introduction</h3>
      <p>Start with a hook that captures attention. This could be a pivotal moment, a challenging problem you solved, or a unique perspective that shapes your worldview.</p>
      
      <h3>2. Academic Background</h3>
      <p>Discuss your educational journey, highlighting relevant coursework, projects, and achievements that prepared you for graduate studies.</p>
      
      <h3>3. Professional Experience</h3>
      <p>Detail your work experience, internships, or research projects. Focus on responsibilities, achievements, and skills gained.</p>
      
      <h3>4. Why This Program?</h3>
      <p>Research the program thoroughly and explain why it's the perfect fit for your goals. Mention specific professors, courses, or research opportunities.</p>
      
      <h3>5. Career Goals</h3>
      <p>Articulate clear short-term and long-term career objectives and how this program will help you achieve them.</p>
      
      <h3>6. Strong Conclusion</h3>
      <p>Summarize your key points and reiterate your enthusiasm for the program.</p>
      
      <h2>Common Mistakes to Avoid</h2>
      <ul>
        <li>Being too generic or using clichés</li>
        <li>Focusing only on childhood stories</li>
        <li>Excessive flattery of the university</li>
        <li>Poor grammar and spelling errors</li>
        <li>Exceeding word limits</li>
      </ul>
      
      <h2>Tips for Success</h2>
      <p>Write multiple drafts, get feedback from mentors, and ensure your SOP reflects your authentic voice while maintaining professionalism.</p>
    `
  },
  '4': {
    title: "Canada vs UK vs Australia: Which Country is Best for Your Master's Degree?",
    author: "James Thompson",
    authorTitle: "International Education Expert",
    date: "December 8, 2024",
    readTime: "15 min read",
    category: "Country Comparison",
    views: "11,234",
    likes: "2,089",
    tags: ["Canada", "UK", "Australia", "Masters", "Study Abroad"],
    content: `
      <h2>Introduction</h2>
      <p>Choosing the right country for your master's degree is a crucial decision that impacts your career trajectory. This comprehensive comparison will help you make an informed choice between three popular destinations.</p>
      
      <h2>Canada</h2>
      <h3>Advantages</h3>
      <ul>
        <li>Post-study work permit up to 3 years</li>
        <li>Pathway to permanent residency</li>
        <li>Affordable tuition compared to US/UK</li>
        <li>Multicultural environment</li>
      </ul>
      
      <h3>Top Universities</h3>
      <p>University of Toronto, McGill, UBC, University of Alberta</p>
      
      <h2>United Kingdom</h2>
      <h3>Advantages</h3>
      <ul>
        <li>One-year master's programs</li>
        <li>World-renowned universities</li>
        <li>2-year post-study work visa</li>
        <li>Rich cultural heritage</li>
      </ul>
      
      <h3>Top Universities</h3>
      <p>Oxford, Cambridge, Imperial College London, LSE</p>
      
      <h2>Australia</h2>
      <h3>Advantages</h3>
      <ul>
        <li>2-4 year post-study work rights</li>
        <li>High quality of life</li>
        <li>Part-time work opportunities</li>
        <li>Beautiful weather and landscapes</li>
      </ul>
      
      <h3>Top Universities</h3>
      <p>University of Melbourne, ANU, University of Sydney, UNSW</p>
      
      <h2>Cost Comparison</h2>
      <p>Detailed breakdown of tuition fees, living expenses, and potential earnings in each country.</p>
      
      <h2>Immigration Policies</h2>
      <p>Analysis of student visa requirements and post-graduation opportunities.</p>
      
      <h2>Conclusion</h2>
      <p>Each country offers unique advantages. Your choice should align with your career goals, budget, and personal preferences.</p>
    `
  },
  '5': {
    title: "IELTS vs TOEFL vs PTE: Which English Test Should You Take?",
    author: "Prof. Lisa Park",
    authorTitle: "Language Testing Expert",
    date: "December 5, 2024",
    readTime: "7 min read",
    category: "Test Preparation",
    views: "9,876",
    likes: "1,234",
    tags: ["IELTS", "TOEFL", "PTE", "English Tests", "Test Prep"],
    content: `
      <h2>Overview</h2>
      <p>Choosing the right English proficiency test can significantly impact your study abroad journey. Let's compare the three most popular options.</p>
      
      <h2>IELTS (International English Language Testing System)</h2>
      <h3>Format</h3>
      <ul>
        <li>Paper-based or computer-based</li>
        <li>4 sections: Listening, Reading, Writing, Speaking</li>
        <li>Total time: 2 hours 45 minutes</li>
        <li>Speaking test with human examiner</li>
      </ul>
      
      <h3>Scoring</h3>
      <p>Band score 1-9 for each section and overall</p>
      
      <h3>Best For</h3>
      <p>UK, Australia, Canada, New Zealand universities</p>
      
      <h2>TOEFL (Test of English as a Foreign Language)</h2>
      <h3>Format</h3>
      <ul>
        <li>Internet-based test (iBT)</li>
        <li>4 sections: Reading, Listening, Speaking, Writing</li>
        <li>Total time: 3 hours</li>
        <li>Speaking into microphone</li>
      </ul>
      
      <h3>Scoring</h3>
      <p>0-120 total score (30 points per section)</p>
      
      <h3>Best For</h3>
      <p>US and Canadian universities</p>
      
      <h2>PTE (Pearson Test of English)</h2>
      <h3>Format</h3>
      <ul>
        <li>Computer-based only</li>
        <li>3 sections: Speaking & Writing, Reading, Listening</li>
        <li>Total time: 2 hours</li>
        <li>AI-based scoring</li>
      </ul>
      
      <h3>Scoring</h3>
      <p>10-90 points overall</p>
      
      <h3>Best For</h3>
      <p>Australia, New Zealand, and increasingly accepted globally</p>
      
      <h2>Which Test Should You Choose?</h2>
      <p>Consider your target universities, test availability, personal strengths, and comfort with test formats when making your decision.</p>
    `
  },
  '6': {
    title: "MBA Application Strategy: From GMAT to Interview Success",
    author: "Dr. Robert Kumar",
    authorTitle: "MBA Admissions Consultant",
    date: "December 3, 2024",
    readTime: "12 min read",
    category: "MBA",
    views: "7,654",
    likes: "987",
    tags: ["MBA", "GMAT", "Strategy", "Applications", "Interview"],
    content: `
      <h2>Introduction</h2>
      <p>Getting into a top MBA program requires strategic planning and flawless execution. This guide covers every aspect of the MBA application journey.</p>
      
      <h2>GMAT Preparation</h2>
      <h3>Target Scores</h3>
      <p>Top 10 schools: 730+, Top 20: 700+, Top 50: 650+</p>
      
      <h3>Preparation Timeline</h3>
      <p>Allow 3-6 months for comprehensive preparation</p>
      
      <h2>Application Components</h2>
      <h3>Essays</h3>
      <p>Tell compelling stories that showcase leadership, impact, and growth</p>
      
      <h3>Resume</h3>
      <p>Quantify achievements and highlight progression</p>
      
      <h3>Letters of Recommendation</h3>
      <p>Choose recommenders who know your work well</p>
      
      <h2>Interview Preparation</h2>
      <p>Practice behavioral questions, know your resume inside out, and prepare thoughtful questions for the interviewer.</p>
      
      <h2>Timeline</h2>
      <p>Start 18 months before intended enrollment for best results.</p>
    `
  },
  '7': {
    title: "Student Visa Interview: 50+ Questions and Perfect Answers",
    author: "Maria González",
    authorTitle: "Visa Consultant",
    date: "December 1, 2024",
    readTime: "9 min read",
    category: "Visa",
    views: "13,456",
    likes: "2,876",
    tags: ["Visa", "Interview", "Preparation", "Success", "F1 Visa"],
    content: `
      <h2>Introduction</h2>
      <p>The visa interview is the final hurdle in your study abroad journey. Proper preparation can make the difference between approval and rejection.</p>
      
      <h2>Most Common Questions</h2>
      <h3>1. Why do you want to study in the US?</h3>
      <p>Focus on academic reasons and specific program strengths.</p>
      
      <h3>2. Why this university?</h3>
      <p>Mention specific professors, research facilities, or unique programs.</p>
      
      <h3>3. How will you fund your studies?</h3>
      <p>Be clear about your financial sources and have documents ready.</p>
      
      <h3>4. What are your plans after graduation?</h3>
      <p>Express intent to return to your home country with specific career goals.</p>
      
      <h2>Tips for Success</h2>
      <ul>
        <li>Dress professionally</li>
        <li>Arrive early</li>
        <li>Be confident but not arrogant</li>
        <li>Keep answers concise and honest</li>
        <li>Maintain eye contact</li>
      </ul>
      
      <h2>Documents Checklist</h2>
      <p>Passport, I-20, DS-160 confirmation, SEVIS fee receipt, financial documents, academic transcripts, test scores.</p>
    `
  },
  '8': {
    title: "Cost of Studying Abroad: Complete Financial Planning Guide 2024",
    author: "Dr. Alex Johnson",
    authorTitle: "Financial Aid Advisor",
    date: "November 28, 2024",
    readTime: "11 min read",
    category: "Finance",
    views: "10,987",
    likes: "1,765",
    tags: ["Costs", "Budget", "Finance", "Planning", "Scholarships"],
    content: `
      <h2>Understanding the True Cost</h2>
      <p>Studying abroad involves more than just tuition fees. This comprehensive guide breaks down all expenses you need to consider.</p>
      
      <h2>Major Cost Components</h2>
      <h3>Tuition Fees</h3>
      <ul>
        <li>USA: $20,000 - $60,000 per year</li>
        <li>UK: £10,000 - £38,000 per year</li>
        <li>Canada: CAD 7,000 - CAD 35,000 per year</li>
        <li>Australia: AUD 20,000 - AUD 45,000 per year</li>
      </ul>
      
      <h3>Living Expenses</h3>
      <p>Monthly costs including accommodation, food, transport, and personal expenses.</p>
      
      <h3>Hidden Costs</h3>
      <p>Application fees, test fees, visa fees, health insurance, books, and travel.</p>
      
      <h2>Financial Planning Strategy</h2>
      <h3>Start Early</h3>
      <p>Begin saving at least 2 years before your intended start date.</p>
      
      <h3>Explore Funding Options</h3>
      <ul>
        <li>Scholarships and grants</li>
        <li>Education loans</li>
        <li>Part-time work opportunities</li>
        <li>Teaching/Research assistantships</li>
      </ul>
      
      <h2>Money-Saving Tips</h2>
      <p>Choose affordable cities, cook your own meals, use student discounts, and consider shared accommodation.</p>
      
      <h2>ROI Calculation</h2>
      <p>Evaluate the return on investment by researching average salaries in your field and calculating payback period.</p>
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

  // Function to create slug from heading text
  const createSlug = (text: string) => {
    return text.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim()
  }

  // Function to extract headings from content
  const extractHeadings = (content: string) => {
    const headings: { text: string; id: string; level: number }[] = []
    
    // Extract h2 headings
    const h2Matches = content.match(/<h2>([^<]+)<\/h2>/g) || []
    h2Matches.forEach((match) => {
      const text = match.replace(/<\/?h2>/g, '')
      const id = createSlug(text)
      headings.push({ text, id, level: 2 })
    })
    
    // Extract h3 headings
    const h3Matches = content.match(/<h3>([^<]+)<\/h3>/g) || []
    h3Matches.forEach((match) => {
      const text = match.replace(/<\/?h3>/g, '')
      const id = createSlug(text)
      headings.push({ text, id, level: 3 })
    })
    
    return headings
  }

  // Function to add IDs to headings in HTML content
  const processContentWithIds = (content: string) => {
    return content
      .replace(/<h2>([^<]+)<\/h2>/g, (match, text) => {
        const id = createSlug(text)
        return `<h2 id="${id}">${text}</h2>`
      })
      .replace(/<h3>([^<]+)<\/h3>/g, (match, text) => {
        const id = createSlug(text)
        return `<h3 id="${id}">${text}</h3>`
      })
  }

  // Get headings for current post
  const headings = extractHeadings(post.content)

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 100 // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

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
      
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white">
        {/* Hero Section */}
        <section className="relative">
          {/* Green background for hero */}
          <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-r from-emerald-500 to-green-600"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-12">
            {/* Back to Blog */}
            <Link href="/blog" className="inline-flex items-center text-white hover:text-emerald-100 mb-8 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Blog
            </Link>
            
            {/* Article Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Category Badge */}
              <div className="mb-4">
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {post.category}
                </span>
              </div>
              
              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>
              
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  <span>{post.views} views</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Article Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Main Content */}
            <motion.div 
              className="lg:col-span-8 xl:col-span-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Author Info Card */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 mb-10 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center mr-5 shadow-md">
                      <User className="w-10 h-10 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 mb-1">{post.author}</h3>
                      <p className="text-gray-600 text-base">{post.authorTitle}</p>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                  <button
                    onClick={() => setLiked(!liked)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      liked ? 'bg-emerald-100 text-emerald-700' : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <ThumbsUp className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                    <span>{liked ? parseInt(post.likes) + 1 : post.likes}</span>
                  </button>
                  
                  <div className="relative">
                    <button
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="flex items-center gap-2 px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                    
                    {showShareMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
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
                </div>
              </div>
              
              {/* Article Content with Modern Typography */}
              <article className="max-w-none bg-white rounded-2xl p-8 sm:p-10 lg:p-12 shadow-sm">
                <style dangerouslySetInnerHTML={{ __html: `
                  .blog-content {
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                  }
                  
                  .blog-content h2 {
                    color: #111827;
                    margin-top: 4rem;
                    margin-bottom: 2rem;
                    font-size: 2.25rem;
                    font-weight: 700;
                    line-height: 1.3;
                    letter-spacing: -0.025em;
                    position: relative;
                    padding-bottom: 0.75rem;
                  }
                  
                  .blog-content h2:after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 60px;
                    height: 4px;
                    background: linear-gradient(to right, #10b981, #059669);
                    border-radius: 2px;
                  }
                  
                  .blog-content h3 {
                    color: #1f2937;
                    margin-top: 3rem;
                    margin-bottom: 1.5rem;
                    font-size: 1.75rem;
                    font-weight: 600;
                    line-height: 1.4;
                    letter-spacing: -0.02em;
                  }
                  
                  .blog-content p {
                    color: #4b5563;
                    line-height: 1.875;
                    margin-bottom: 2.5rem;
                    font-size: 1.125rem;
                    font-weight: 400;
                    letter-spacing: 0.01em;
                  }
                  
                  .blog-content p:first-child {
                    font-size: 1.25rem;
                    line-height: 1.9;
                    color: #374151;
                    font-weight: 400;
                    margin-bottom: 3rem;
                  }
                  
                  .blog-content ul,
                  .blog-content ol {
                    color: #4b5563;
                    margin-left: 0;
                    padding-left: 0;
                    margin-bottom: 3rem;
                    margin-top: -1rem;
                    list-style: none;
                  }
                  
                  .blog-content li {
                    margin-bottom: 1.25rem;
                    padding-left: 2rem;
                    position: relative;
                    font-size: 1.125rem;
                    line-height: 1.875;
                  }
                  
                  .blog-content ul li:before {
                    content: '•';
                    position: absolute;
                    left: 0.5rem;
                    color: #10b981;
                    font-weight: bold;
                    font-size: 1.25rem;
                  }
                  
                  .blog-content ol {
                    counter-reset: list-counter;
                  }
                  
                  .blog-content ol li {
                    counter-increment: list-counter;
                  }
                  
                  .blog-content ol li:before {
                    content: counter(list-counter) ".";
                    position: absolute;
                    left: 0;
                    color: #10b981;
                    font-weight: 600;
                    font-size: 1rem;
                  }
                  
                  .blog-content strong {
                    color: #1f2937;
                    font-weight: 600;
                  }
                  
                  .blog-content blockquote {
                    border-left: 4px solid #10b981;
                    padding-left: 2rem;
                    margin: 3rem 0;
                    font-style: italic;
                    color: #374151;
                    font-size: 1.25rem;
                    line-height: 1.8;
                    background: linear-gradient(to right, #f0fdf4, transparent);
                    padding-top: 1.5rem;
                    padding-bottom: 1.5rem;
                    padding-right: 2rem;
                    border-radius: 0 8px 8px 0;
                  }
                  
                  .blog-content a {
                    color: #059669;
                    text-decoration: underline;
                    text-underline-offset: 3px;
                    text-decoration-thickness: 2px;
                    text-decoration-color: #10b98130;
                    transition: all 0.2s;
                  }
                  
                  .blog-content a:hover {
                    color: #047857;
                    text-decoration-color: #10b981;
                  }
                  
                  .blog-content code {
                    background: #f3f4f6;
                    padding: 0.125rem 0.375rem;
                    border-radius: 4px;
                    font-size: 0.95rem;
                    color: #1f2937;
                    font-family: 'Monaco', 'Courier New', monospace;
                  }
                  
                  .blog-content pre {
                    background: #1f2937;
                    color: #f3f4f6;
                    padding: 1.5rem;
                    border-radius: 12px;
                    overflow-x: auto;
                    margin: 2.5rem 0;
                    font-size: 0.95rem;
                    line-height: 1.6;
                  }
                  
                  .blog-content hr {
                    border: none;
                    height: 1px;
                    background: linear-gradient(to right, transparent, #e5e7eb, transparent);
                    margin: 4rem 0;
                  }
                `}} />
                <div 
                  dangerouslySetInnerHTML={{ __html: processContentWithIds(post.content) }}
                  className="blog-content"
                />
              </article>
              
              {/* Tags */}
              <div className="mt-12 pt-12 border-t-2 border-gray-100">
                <div className="flex items-center flex-wrap gap-3">
                  <span className="flex items-center text-gray-600 font-medium mr-2">
                    <Tag className="w-5 h-5 mr-2" />
                    Tags:
                  </span>
                  {post.tags.map((tag: string) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${tag.toLowerCase()}`}
                      className="bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium hover:from-emerald-100 hover:to-green-100 transition-all duration-200 border border-emerald-200"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Sidebar */}
            <motion.div 
              className="lg:col-span-4 xl:col-span-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Table of Contents (sticky) */}
              <div className="sticky top-24">
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-emerald-600" />
                    Table of Contents
                  </h3>
                  <nav className="space-y-2">
                    {headings.map((heading, index) => (
                      <button 
                        key={index}
                        onClick={() => scrollToSection(heading.id)}
                        className={`block text-gray-600 hover:text-emerald-600 transition-colors text-left w-full ${
                          heading.level === 3 ? 'pl-4 text-sm' : ''
                        }`}
                      >
                        {heading.text}
                      </button>
                    ))}
                    {headings.length === 0 && (
                      <p className="text-gray-500 text-sm italic">No headings found</p>
                    )}
                  </nav>
                </div>
                
                {/* Newsletter CTA */}
                <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl p-6 text-white">
                  <h3 className="font-bold mb-3">Get Expert Guidance</h3>
                  <p className="text-sm mb-4 opacity-90">
                    Subscribe to receive personalized advice and updates about studying abroad.
                  </p>
                  <button className="w-full bg-white text-emerald-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Subscribe Now
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Related Articles */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs">
                      {article.category}
                    </span>
                    <span className="text-gray-500 text-xs">{article.readTime}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      <span>{article.author}</span> • <span>{article.date}</span>
                    </div>
                    <Link 
                      href={`/blog/${article.id}`}
                      className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center group"
                    >
                      Read More
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  )
}