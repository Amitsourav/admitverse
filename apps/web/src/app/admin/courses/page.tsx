'use client'

import { BookOpen, Plus, Search, Filter } from 'lucide-react'

export default function CoursesPage() {
  // Mock data for courses
  const courses = [
    {
      id: '1',
      name: 'Computer Science',
      college: 'MIT',
      duration: '4 years',
      degree: 'Bachelor of Science',
      students: 1200,
      status: 'Active'
    },
    {
      id: '2',
      name: 'Business Administration',
      college: 'Harvard University',
      duration: '2 years',
      degree: 'MBA',
      students: 800,
      status: 'Active'
    },
    {
      id: '3',
      name: 'Medicine',
      college: 'Oxford University',
      duration: '6 years',
      degree: 'MBBS',
      students: 500,
      status: 'Active'
    },
    {
      id: '4',
      name: 'Engineering',
      college: 'MIT',
      duration: '4 years',
      degree: 'Bachelor of Engineering',
      students: 1500,
      status: 'Active'
    },
    {
      id: '5',
      name: 'Law',
      college: 'Harvard University',
      duration: '3 years',
      degree: 'JD',
      students: 600,
      status: 'Active'
    }
  ]

  return (
    <div style={{
      padding: '32px',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        marginBottom: '32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '8px'
          }}>
            Courses Management
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#6b7280'
          }}>
            Manage and organize courses across all universities
          </p>
        </div>
        
        <button style={{
          background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '16px',
          fontWeight: '500',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        onClick={() => alert('Add New Course clicked!')}>
          <Plus style={{ width: '20px', height: '20px' }} />
          Add New Course
        </button>
      </div>

      {/* Search Bar */}
      <div style={{
        marginBottom: '24px',
        display: 'flex',
        gap: '16px'
      }}>
        <div style={{
          flex: 1,
          position: 'relative'
        }}>
          <Search style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '20px',
            height: '20px',
            color: '#6b7280'
          }} />
          <input
            type="text"
            placeholder="Search courses..."
            style={{
              width: '100%',
              padding: '12px 12px 12px 44px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>
        
        <button style={{
          padding: '12px 24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          background: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '16px',
          color: '#374151',
          transition: 'all 0.2s'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.borderColor = '#3b82f6'
          e.currentTarget.style.color = '#3b82f6'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.borderColor = '#e5e7eb'
          e.currentTarget.style.color = '#374151'
        }}>
          <Filter style={{ width: '20px', height: '20px' }} />
          Filter
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}>
        {[
          { label: 'Total Courses', value: '87', color: '#3b82f6' },
          { label: 'Active Courses', value: '75', color: '#10b981' },
          { label: 'Total Students', value: '5,100', color: '#8b5cf6' },
          { label: 'Universities', value: '15', color: '#f59e0b' }
        ].map((stat, index) => (
          <div key={index} style={{
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              marginBottom: '8px'
            }}>
              {stat.label}
            </p>
            <p style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: stat.color
            }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Courses Table */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse'
        }}>
          <thead>
            <tr style={{
              backgroundColor: '#f9fafb',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Course Name
              </th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                College
              </th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Degree
              </th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Duration
              </th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Students
              </th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Status
              </th>
              <th style={{
                padding: '16px',
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course.id} style={{
                borderBottom: index < courses.length - 1 ? '1px solid #e5e7eb' : 'none'
              }}>
                <td style={{
                  padding: '16px',
                  fontSize: '15px',
                  color: '#111827'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <BookOpen style={{ width: '20px', height: '20px', color: '#3b82f6' }} />
                    </div>
                    <span style={{ fontWeight: '500' }}>{course.name}</span>
                  </div>
                </td>
                <td style={{
                  padding: '16px',
                  fontSize: '15px',
                  color: '#6b7280'
                }}>
                  {course.college}
                </td>
                <td style={{
                  padding: '16px',
                  fontSize: '15px',
                  color: '#6b7280'
                }}>
                  {course.degree}
                </td>
                <td style={{
                  padding: '16px',
                  fontSize: '15px',
                  color: '#6b7280'
                }}>
                  {course.duration}
                </td>
                <td style={{
                  padding: '16px',
                  fontSize: '15px',
                  color: '#6b7280'
                }}>
                  {course.students.toLocaleString()}
                </td>
                <td style={{
                  padding: '16px'
                }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: '500',
                    backgroundColor: '#dcfce7',
                    color: '#166534'
                  }}>
                    {course.status}
                  </span>
                </td>
                <td style={{
                  padding: '16px',
                  textAlign: 'center'
                }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <button style={{
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: '1px solid #e5e7eb',
                      background: 'white',
                      color: '#374151',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f4f6'
                      e.currentTarget.style.borderColor = '#3b82f6'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'white'
                      e.currentTarget.style.borderColor = '#e5e7eb'
                    }}
                    onClick={() => alert(`Edit ${course.name}`)}>
                      Edit
                    </button>
                    <button style={{
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: '1px solid #fee2e2',
                      background: '#fef2f2',
                      color: '#dc2626',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#fecaca'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#fef2f2'
                    }}
                    onClick={() => alert(`Delete ${course.name}`)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}