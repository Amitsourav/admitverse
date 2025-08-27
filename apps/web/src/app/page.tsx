import { Metadata } from 'next'
import { Search, Globe, Users, Award, BookOpen, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AdmitVerse - Discover Your Perfect University Abroad',
  description: 'Find the best universities, colleges, and courses worldwide. Get personalized recommendations and expert guidance for studying abroad.',
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-gradient">AdmitVerse</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Universities</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Courses</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Countries</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Blog</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">About</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="text-sm font-medium hover:text-primary transition-colors">
              Sign In
            </button>
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-gradient py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight lg:text-6xl mb-6">
              Your Gateway to{' '}
              <span className="text-gradient">International Education</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover top universities worldwide. Get personalized recommendations for colleges, 
              courses, and specializations that match your profile and career goals.
            </p>
            
            {/* Search Bar */}
            <div className="mx-auto max-w-2xl mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search universities, courses, or countries..."
                  className="w-full rounded-full border border-input bg-white px-12 py-4 text-lg shadow-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-full font-medium transition-colors btn-glow">
                  Search
                </button>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Universities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Students Helped</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose AdmitVerse?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make studying abroad simple with personalized guidance and comprehensive information
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-hover bg-card border rounded-lg p-6 text-center">
              <div className="bg-primary/10 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
              <p className="text-muted-foreground">
                Advanced filtering by location, fees, rankings, and specializations
              </p>
            </div>
            
            <div className="card-hover bg-card border rounded-lg p-6 text-center">
              <div className="bg-primary/10 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
              <p className="text-muted-foreground">
                Get personalized advice from education consultants and alumni
              </p>
            </div>
            
            <div className="card-hover bg-card border rounded-lg p-6 text-center">
              <div className="bg-primary/10 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Information</h3>
              <p className="text-muted-foreground">
                Accurate and up-to-date information about admissions and requirements
              </p>
            </div>
            
            <div className="card-hover bg-card border rounded-lg p-6 text-center">
              <div className="bg-primary/10 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Course Comparison</h3>
              <p className="text-muted-foreground">
                Compare courses, fees, duration, and career prospects side by side
              </p>
            </div>
            
            <div className="card-hover bg-card border rounded-lg p-6 text-center">
              <div className="bg-primary/10 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Career Insights</h3>
              <p className="text-muted-foreground">
                Understand job prospects and salary expectations for different fields
              </p>
            </div>
            
            <div className="card-hover bg-card border rounded-lg p-6 text-center">
              <div className="bg-primary/10 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Network</h3>
              <p className="text-muted-foreground">
                Connect with students and professionals worldwide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who found their dream university through AdmitVerse
          </p>
          <button className="bg-white text-primary hover:bg-gray-50 px-8 py-3 rounded-full font-semibold transition-colors btn-glow">
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">AdmitVerse</span>
              </div>
              <p className="text-muted-foreground">
                Your gateway to international education and career success.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Explore</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Universities</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Courses</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Countries</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Scholarships</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Guides</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Rankings</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">News</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 AdmitVerse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}