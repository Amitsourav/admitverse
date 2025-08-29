'use client'

import { Search, Globe, Users, Award, BookOpen, TrendingUp } from 'lucide-react'
import { useState } from 'react'

export default function HomePage() {
  const [searchText, setSearchText] = useState('')

  const handleSearch = () => {
    alert(`Searching for: ${searchText}`)
  }

  const handleGetStarted = () => {
    alert('Get Started clicked!')
  }

  const handleSignIn = () => {
    alert('Sign In clicked!')
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          height: '64px',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
              borderRadius: '8px',
              padding: '6px'
            }}>
              <Globe style={{ height: '24px', width: '24px', color: 'white' }} />
            </div>
            <span style={{
              fontSize: '24px',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              AdmitVerse
            </span>
          </div>
          
          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <a href="#" style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              textDecoration: 'none',
              transition: 'color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.color = '#3b82f6'}
            onMouseOut={(e) => e.target.style.color = '#374151'}
            onClick={(e) => {
              e.preventDefault();
              alert('Universities clicked!');
            }}>
              Universities
            </a>
            <a href="#" style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              textDecoration: 'none',
              transition: 'color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.color = '#3b82f6'}
            onMouseOut={(e) => e.target.style.color = '#374151'}
            onClick={(e) => {
              e.preventDefault();
              alert('Courses clicked!');
            }}>
              Courses
            </a>
            <a href="#" style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              textDecoration: 'none',
              transition: 'color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.color = '#3b82f6'}
            onMouseOut={(e) => e.target.style.color = '#374151'}
            onClick={(e) => {
              e.preventDefault();
              alert('Countries clicked!');
            }}>
              Countries
            </a>
            <a href="/admin" style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#dc2626',
              textDecoration: 'none',
              transition: 'color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.color = '#ef4444'}
            onMouseOut={(e) => e.target.style.color = '#dc2626'}>
              Admin Panel
            </a>
          </nav>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={handleSignIn} style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.color = '#3b82f6'}
            onMouseOut={(e) => e.target.style.color = '#374151'}>
              Sign In
            </button>
            <button onClick={handleGetStarted} style={{
              background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
              color: 'white',
              padding: '8px 24px',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.05)'
              e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)'
              e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
        padding: '80px 16px 128px'
      }}>
        <div style={{
          position: 'relative',
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div style={{ marginBottom: '32px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '8px 16px',
                borderRadius: '50px',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                color: '#1e40af',
                fontSize: '14px',
                fontWeight: '500',
                animation: 'pulse 2s infinite'
              }}>
                🎓 Over 10,000 students placed worldwide
              </div>
            </div>
            
            <h1 style={{
              fontSize: '60px',
              fontWeight: 'bold',
              lineHeight: '1.1',
              marginBottom: '32px',
              color: '#111827'
            }}>
              Your Gateway to{' '}
              <span style={{
                background: 'linear-gradient(to right, #3b82f6, #8b5cf6, #6366f1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                International Education
              </span>
            </h1>
            
            <p style={{
              fontSize: '20px',
              color: '#6b7280',
              marginBottom: '48px',
              lineHeight: '1.6',
              maxWidth: '768px',
              margin: '0 auto 48px'
            }}>
              Discover top universities worldwide. Get personalized recommendations for colleges, 
              courses, and specializations that match your profile and career goals.
            </p>
            
            <div style={{
              maxWidth: '512px',
              margin: '0 auto 64px',
              position: 'relative'
            }}>
              <div style={{ position: 'relative' }}>
                <Search style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  height: '20px',
                  width: '20px',
                  transform: 'translateY(-50%)',
                  color: '#6b7280',
                  zIndex: 10
                }} />
                <input
                  type="text"
                  placeholder="Search universities, courses, or countries..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSearch();
                    }
                  }}
                  style={{
                    width: '100%',
                    borderRadius: '50px',
                    border: 'none',
                    backgroundColor: 'white',
                    paddingLeft: '48px',
                    paddingRight: '120px',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    fontSize: '18px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 4px rgba(59, 130, 246, 0.2)'
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                  }}
                />
                <button onClick={(e) => {
                  e.preventDefault();
                  handleSearch();
                }} style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                  color: 'white',
                  padding: '12px 32px',
                  borderRadius: '50px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-50%) scale(1.05)'
                  e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(-50%) scale(1)'
                  e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}>
                  Search
                </button>
              </div>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '24px',
              maxWidth: '768px',
              margin: '0 auto'
            }}>
              {[
                { number: '500+', label: 'Universities' },
                { number: '50+', label: 'Countries' },
                { number: '1000+', label: 'Courses' },
                { number: '10K+', label: 'Students Helped' }
              ].map((stat, index) => (
                <div key={index} style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(16px)',
                  borderRadius: '16px',
                  padding: '24px',
                  textAlign: 'center',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'transform 0.3s',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    {stat.number}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#6b7280',
                    marginTop: '4px'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '96px 16px', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '24px', color: '#111827' }}>
              Why Choose AdmitVerse?
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#6b7280',
              maxWidth: '768px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              We make studying abroad simple with personalized guidance and comprehensive information
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            {[
              {
                icon: <Search style={{ height: '32px', width: '32px', color: 'white' }} />,
                title: 'Smart Search',
                description: 'Advanced filtering by location, fees, rankings, and specializations to find your perfect match',
                bgColor: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                cardBg: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)'
              },
              {
                icon: <Users style={{ height: '32px', width: '32px', color: 'white' }} />,
                title: 'Expert Guidance',
                description: 'Get personalized advice from education consultants and alumni who have been there',
                bgColor: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                cardBg: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)'
              },
              {
                icon: <Award style={{ height: '32px', width: '32px', color: 'white' }} />,
                title: 'Verified Information',
                description: 'Accurate and up-to-date information about admissions and requirements',
                bgColor: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                cardBg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)'
              },
              {
                icon: <BookOpen style={{ height: '32px', width: '32px', color: 'white' }} />,
                title: 'Course Comparison',
                description: 'Compare courses, fees, duration, and career prospects side by side',
                bgColor: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                cardBg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%)'
              },
              {
                icon: <TrendingUp style={{ height: '32px', width: '32px', color: 'white' }} />,
                title: 'Career Insights',
                description: 'Understand job prospects and salary expectations for different fields',
                bgColor: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
                cardBg: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)'
              },
              {
                icon: <Globe style={{ height: '32px', width: '32px', color: 'white' }} />,
                title: 'Global Network',
                description: 'Connect with students and professionals worldwide in our community',
                bgColor: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                cardBg: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)'
              }
            ].map((feature, index) => (
              <div key={index} style={{
                position: 'relative',
                background: feature.cardBg,
                borderRadius: '16px',
                padding: '32px',
                textAlign: 'center',
                transition: 'all 0.5s',
                cursor: 'pointer',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{
                  background: feature.bgColor,
                  borderRadius: '16px',
                  padding: '16px',
                  width: '64px',
                  height: '64px',
                  margin: '0 auto 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '16px',
                  color: '#111827'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        position: 'relative',
        padding: '96px 16px',
        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #6366f1 100%)',
        color: 'white',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'relative',
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '768px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              marginBottom: '24px',
              lineHeight: '1.1'
            }}>
              Ready to Start Your Journey?
            </h2>
            <p style={{
              fontSize: '20px',
              marginBottom: '48px',
              opacity: 0.9,
              maxWidth: '512px',
              margin: '0 auto 48px',
              lineHeight: '1.6'
            }}>
              Join thousands of students who found their dream university through AdmitVerse. 
              Your future starts here.
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '16px',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <button onClick={handleGetStarted} style={{
                backgroundColor: 'white',
                color: '#3b82f6',
                padding: '16px 40px',
                borderRadius: '50px',
                fontWeight: 'bold',
                fontSize: '18px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#f9fafb'
                e.target.style.transform = 'scale(1.05)'
                e.target.style.boxShadow = '0 25px 50px -12px rgba(255, 255, 255, 0.2)'
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'white'
                e.target.style.transform = 'scale(1)'
                e.target.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}>
                Get Started Today
              </button>
              <button onClick={() => alert('Consultation booked!')} style={{
                border: '2px solid white',
                color: 'white',
                backgroundColor: 'transparent',
                padding: '16px 40px',
                borderRadius: '50px',
                fontWeight: 'bold',
                fontSize: '18px',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'white'
                e.target.style.color = '#3b82f6'
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.color = 'white'
              }}>
                Book Consultation
              </button>
            </div>
            
            <div style={{
              marginTop: '64px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '32px',
              opacity: 0.8,
              flexWrap: 'wrap'
            }}>
              <div style={{ fontSize: '14px' }}>✓ Free Consultation</div>
              <div style={{ fontSize: '14px' }}>✓ Expert Guidance</div>
              <div style={{ fontSize: '14px' }}>✓ 24/7 Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#111827', color: 'white', padding: '64px 16px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr',
            gap: '32px',
            marginBottom: '48px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <div style={{
                  background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                  borderRadius: '8px',
                  padding: '8px'
                }}>
                  <Globe style={{ height: '24px', width: '24px', color: 'white' }} />
                </div>
                <span style={{ fontSize: '24px', fontWeight: 'bold' }}>AdmitVerse</span>
              </div>
              <p style={{
                color: '#d1d5db',
                marginBottom: '24px',
                maxWidth: '384px',
                lineHeight: '1.6'
              }}>
                Your gateway to international education and career success. 
                Connecting ambitious students with world-class universities since 2024.
              </p>
            </div>
            
            <div>
              <h4 style={{ fontWeight: 'bold', marginBottom: '24px', fontSize: '18px' }}>Explore</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Universities', 'Courses', 'Countries', 'Scholarships', 'Rankings'].map((item) => (
                  <li key={item}>
                    <a href="#" style={{
                      color: '#d1d5db',
                      textDecoration: 'none',
                      transition: 'color 0.3s'
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`${item} clicked!`);
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = 'white'
                      e.target.style.textDecoration = 'underline'
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = '#d1d5db'
                      e.target.style.textDecoration = 'none'
                    }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 style={{ fontWeight: 'bold', marginBottom: '24px', fontSize: '18px' }}>Support</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Help Center', 'Contact Us', 'Blog', 'About Us', 'Careers'].map((item) => (
                  <li key={item}>
                    <a href="#" style={{
                      color: '#d1d5db',
                      textDecoration: 'none',
                      transition: 'color 0.3s'
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`${item} clicked!`);
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = 'white'
                      e.target.style.textDecoration = 'underline'
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = '#d1d5db'
                      e.target.style.textDecoration = 'none'
                    }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div style={{
            borderTop: '1px solid #374151',
            paddingTop: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ color: '#9ca3af', fontSize: '14px' }}>
              © 2024 AdmitVerse. All rights reserved.
            </div>
            <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: '#9ca3af' }}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <a key={item} href="#" style={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  transition: 'color 0.3s'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  alert(`${item} clicked!`);
                }}
                onMouseOver={(e) => e.target.style.color = 'white'}
                onMouseOut={(e) => e.target.style.color = '#9ca3af'}>
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}