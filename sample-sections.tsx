// Sample sections to replace leadership team - Choose your favorite!

import { motion } from 'framer-motion'

// OPTION 1: Success Stories Showcase
const SuccessStoriesShowcase = () => {
  const successStories = [
    {
      name: "Sarah Chen",
      before: "Computer Science student from Canada",
      after: "Accepted to Stanford University with $50K scholarship",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      flag: "🇨🇦",
      university: "Stanford University",
      scholarship: "$50,000",
      program: "MS Computer Science",
      quote: "AdmitVerse made my impossible dream possible. Their AI matching found the perfect program!"
    },
    {
      name: "Raj Patel",
      before: "Engineering graduate from India",
      after: "PhD at MIT with full funding",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      flag: "🇮🇳",
      university: "MIT",
      scholarship: "Full Funding",
      program: "PhD Data Science",
      quote: "The personalized guidance helped me craft a winning application strategy."
    },
    {
      name: "Maria Rodriguez",
      before: "Business student from Mexico",
      after: "MBA at Oxford with Dean's Scholarship",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      flag: "🇲🇽",
      university: "Oxford University",
      scholarship: "Dean's Award",
      program: "MBA",
      quote: "From GMAT prep to visa assistance, they were with me every step."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Success Stories That Inspire
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real students, real results. See how AdmitVerse transforms dreams into reality
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* Before/After Header */}
                <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-4 text-white text-center">
                  <div className="text-sm font-medium mb-1">Success Story {index + 1}</div>
                  <div className="text-lg font-bold">{story.flag} {story.name}</div>
                </div>

                {/* Student Photo */}
                <div className="relative">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2">
                    <span className="text-2xl">{story.flag}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Before/After Comparison */}
                  <div className="mb-6">
                    <div className="flex items-start mb-3">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-red-600 text-xs">●</span>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">BEFORE</div>
                        <div className="text-gray-700">{story.before}</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-green-600 text-xs">●</span>
                      </div>
                      <div>
                        <div className="text-sm text-emerald-600 font-medium mb-1">AFTER</div>
                        <div className="font-semibold text-gray-900">{story.after}</div>
                      </div>
                    </div>
                  </div>

                  {/* Achievement Badges */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                      <div className="text-sm text-blue-600 font-medium">University</div>
                      <div className="text-xs text-blue-800">{story.university}</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <div className="text-sm text-green-600 font-medium">Scholarship</div>
                      <div className="text-xs text-green-800">{story.scholarship}</div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="bg-emerald-50 p-4 rounded-xl border-l-4 border-emerald-500">
                    <p className="text-sm italic text-gray-700">"{story.quote}"</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// OPTION 2: Innovation & Technology Focus
const InnovationTechFocus = () => {
  const innovations = [
    {
      icon: "🤖",
      title: "AI-Powered Matching",
      description: "Advanced algorithms analyze 200+ data points to find your perfect university match",
      features: ["Smart Profiling", "Predictive Analytics", "Real-time Updates"],
      metric: "95% Accuracy Rate"
    },
    {
      icon: "📊",
      title: "Data-Driven Insights",
      description: "Comprehensive analytics dashboard providing insights into admission trends",
      features: ["Success Probability", "Timeline Tracking", "Performance Metrics"],
      metric: "10M+ Data Points"
    },
    {
      icon: "🎯",
      title: "Personalized Roadmap",
      description: "Custom-built journey maps tailored to your academic and career goals",
      features: ["Goal Setting", "Milestone Tracking", "Progress Monitoring"],
      metric: "100% Customized"
    },
    {
      icon: "🔒",
      title: "Secure Platform",
      description: "Bank-level security protecting your personal and academic information",
      features: ["Data Encryption", "Privacy Controls", "Secure Storage"],
      metric: "99.9% Uptime"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-emerald-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powered by Innovation
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Cutting-edge technology meets educational expertise to deliver unparalleled results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {innovations.map((innovation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500">
                <div className="text-6xl mb-6 text-center">{innovation.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">{innovation.title}</h3>
                <p className="text-blue-100 mb-6 text-center">{innovation.description}</p>
                
                <div className="grid grid-cols-1 gap-2 mb-6">
                  {innovation.features.map((feature, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                      <span className="text-white text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center px-4 py-2 bg-emerald-500 rounded-full">
                    <span className="text-white font-bold">{innovation.metric}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// OPTION 3: Global Network & Partnerships
const GlobalNetworkPartnerships = () => {
  const regions = [
    {
      name: "North America",
      universities: 150,
      students: 5000,
      flag: "🇺🇸",
      topUnis: ["Harvard", "Stanford", "MIT", "Yale"]
    },
    {
      name: "United Kingdom",
      universities: 75,
      students: 2500,
      flag: "🇬🇧",
      topUnis: ["Oxford", "Cambridge", "Imperial", "LSE"]
    },
    {
      name: "Europe",
      universities: 120,
      students: 3000,
      flag: "🇪🇺",
      topUnis: ["ETH Zurich", "TU Munich", "Sorbonne", "KTH"]
    },
    {
      name: "Asia Pacific",
      universities: 80,
      students: 2000,
      flag: "🌏",
      topUnis: ["NUS", "NTU", "University of Melbourne", "ANU"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Global Network & Partnerships
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connecting students worldwide with 500+ top universities across 50+ countries
          </p>
        </motion.div>

        {/* World Map Visualization */}
        <div className="mb-16">
          <div className="relative h-96 bg-gradient-to-b from-blue-50 to-emerald-50 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">🌍</div>
                <div className="text-3xl font-bold text-gray-800">500+ Universities</div>
                <div className="text-xl text-gray-600">50+ Countries Worldwide</div>
              </div>
            </div>
            
            {/* Floating Connection Points */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-emerald-500 rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </div>

        {/* Regional Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {regions.map((region, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-emerald-300">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{region.flag}</div>
                  <h3 className="text-xl font-bold text-gray-900">{region.name}</h3>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Universities:</span>
                    <span className="font-bold text-emerald-600">{region.universities}+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Students Placed:</span>
                    <span className="font-bold text-emerald-600">{region.students}+</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-2">Top Universities:</div>
                  <div className="space-y-1">
                    {region.topUnis.map((uni, i) => (
                      <div key={i} className="text-xs bg-gray-50 px-2 py-1 rounded">
                        {uni}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { SuccessStoriesShowcase, InnovationTechFocus, GlobalNetworkPartnerships };