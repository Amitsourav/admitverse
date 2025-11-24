'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import TopBanner from '@/components/TopBanner'
import Footer from '@/components/Footer'
import FloatingActions from '@/components/FloatingActions'
import AnimatedCounter from '@/components/AnimatedCounter'
import { 
  Users,
  MessageSquare,
  Presentation,
  FileText,
  Video,
  Target,
  Trophy,
  BookOpen
} from 'lucide-react'
import Link from 'next/link'

export default function GDPIPreparationPage() {
  const gdTopics = [
    "Current Affairs & Business News",
    "Economic & Political Issues",
    "Social Issues & Ethics",
    "Abstract Topics",
    "Case Studies",
    "Leadership & Team Dynamics"
  ]

  const piQuestions = [
    "Tell me about yourself",
    "Why MBA? Why now?",
    "Career goals & aspirations",
    "Strengths & weaknesses",
    "Leadership experiences",
    "Ethical dilemmas & decisions"
  ]

  const preparationModules = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Group Discussion",
      description: "Master the art of group discussions with practice sessions on diverse topics"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Personal Interview",
      description: "One-on-one mock interviews with detailed feedback and improvement areas"
    },
    {
      icon: <Presentation className="w-6 h-6" />,
      title: "WAT Preparation",
      description: "Written Ability Test practice with essay writing techniques and time management"
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "Mock Sessions",
      description: "Realistic mock GD-PI sessions with experienced mentors and peer groups"
    }
  ]

  const institutions = [
    { name: "IIMs", description: "All Indian Institutes of Management" },
    { name: "ISB", description: "Indian School of Business" },
    { name: "XLRI", description: "Xavier School of Management" },
    { name: "FMS", description: "Faculty of Management Studies" },
    { name: "MDI", description: "Management Development Institute" },
    { name: "SPJIMR", description: "S.P. Jain Institute" }
  ]

  const sessionStructure = [
    {
      week: "Week 1-2",
      focus: "Foundation & Basics",
      activities: ["Communication skills", "Current affairs", "Self-introduction"]
    },
    {
      week: "Week 3-4",
      focus: "GD Techniques",
      activities: ["Topic analysis", "Point articulation", "Group dynamics"]
    },
    {
      week: "Week 5-6",
      focus: "PI Preparation",
      activities: ["Mock interviews", "Body language", "Stress interviews"]
    },
    {
      week: "Week 7-8",
      focus: "Final Practice",
      activities: ["Full mock sessions", "Feedback implementation", "Confidence building"]
    }
  ]

  return (
    <>
      <TopBanner />
      <Navigation />
      <FloatingActions />
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30 pt-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        {[8, 22, 36, 50, 64, 78, 92, 16, 30, 44, 58, 72, 86, 14, 28, 42, 56, 70, 84, 98].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            style={{
              left: `${pos}%`,
              top: `${((i * 19) % 80) + 10}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: (i % 4) + 3,
              repeat: Infinity,
              delay: (i % 6) * 0.3,
            }}
          />
        ))}
        
        {/* Flowing Lines */}
        {[220, 360, 300, 440, 270, 390].map((width, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-0.5 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
            style={{
              width: `${width}px`,
              left: `${(i * 16) % 78}%`,
              top: `${(i * 30) % 70 + 15}%`,
            }}
            animate={{
              x: [-800, 800],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: (i % 3) * 2.2 + 6,
              repeat: Infinity,
              delay: i * 1.3,
            }}
          />
        ))}

        {/* Geometric Shapes */}
        {[36, 54, 28, 46, 40, 58, 32, 48].map((size, i) => (
          <motion.div
            key={`shape-${i}`}
            className={`absolute ${i % 2 === 0 ? 'bg-blue-400/10' : 'bg-blue-400/10'} ${
              i % 3 === 0 ? 'rounded-full' : 'rounded-lg'
            }`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${(i * 14 + 10) % 82}%`,
              top: `${(i * 24 + 8) % 68}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: (i % 5) * 1.5 + 8.5,
              repeat: Infinity,
              delay: i * 1.6,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4 relative z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center bg-gradient-to-br from-blue-500/90 to-blue-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              GD-PI <span className="text-blue-100">Preparation</span>
            </h1>
            <p className="text-xl text-blue-50 max-w-3xl mx-auto">
              Comprehensive Group Discussion and Personal Interview preparation for top B-Schools in India
            </p>
          </motion.div>
        </div>
      </section>

      {/* Preparation Modules */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Our Preparation Modules
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {preparationModules.map((module, index) => (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)", 
                  transition: { duration: 0.3, ease: "easeOut" } 
                }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              >
                <div className="bg-blue-100 group-hover:bg-blue-200 rounded-lg p-3 inline-block mb-4 transition-colors duration-300">
                  {module.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                  {module.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {module.description}
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4">
                  <div className="w-full h-0.5 bg-gradient-to-r from-blue-400 to-blue-500"></div>
                  <p className="text-sm text-blue-600 mt-2 font-medium">
                    {module.title === "Group Discussion" && "15+ topics covered with expert feedback"}
                    {module.title === "Personal Interview" && "1-on-1 sessions with IIM alumni"}
                    {module.title === "WAT Preparation" && "Essay writing techniques & time management"}
                    {module.title === "Mock Sessions" && "Real exam simulation environment"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Coverage */}
      <section className="py-12 px-4 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -40, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="w-6 h-6 text-blue-600 mr-3" />
                GD Topics Covered
              </h3>
              <ul className="space-y-3">
                {gdTopics.map((topic) => (
                  <li key={topic} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{topic}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <MessageSquare className="w-6 h-6 text-blue-600 mr-3" />
                Common PI Questions
              </h3>
              <ul className="space-y-3">
                {piQuestions.map((question) => (
                  <li key={question} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{question}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Session Structure */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            8-Week Intensive Program
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sessionStructure.map((session, index) => (
              <motion.div
                key={session.week}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)", transition: { duration: 0.2 } }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6"
              >
                <div className="text-blue-600 font-bold mb-2">{session.week}</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{session.focus}</h4>
                <ul className="space-y-2">
                  {session.activities.map((activity) => (
                    <li key={activity} className="text-sm text-gray-600">
                      • {activity}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Institutions */}
      <section className="py-12 px-4 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Prepare for Top B-Schools
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {institutions.map((inst, index) => (
              <motion.div
                key={inst.name}
                initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="bg-blue-50 rounded-lg p-6 text-center hover:bg-blue-100 transition-colors"
              >
                <h3 className="text-xl font-bold text-blue-600 mb-2">{inst.name}</h3>
                <p className="text-gray-600 text-sm">{inst.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-500 to-blue-800 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Our Success Record
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-white">
              <Trophy className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">
                <AnimatedCounter value="90%" />
              </h3>
              <p>Conversion Rate</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-white">
              <Target className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">
                <AnimatedCounter value="1000+" />
              </h3>
              <p>Students Trained</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-white">
              <BookOpen className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">
                <AnimatedCounter value="50+" />
              </h3>
              <p>Mock Sessions</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ace Your GD-PI Rounds
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join our comprehensive preparation program and convert your B-School calls
            </p>
            <Link
              href="/#book-counseling"
              className="inline-block bg-gradient-to-r from-blue-500 to-blue-800 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            >
              Enroll Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  )
}