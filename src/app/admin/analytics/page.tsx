'use client'

export default function AnalyticsPage() {
  return (
    <div style={{
      padding: '32px',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      textAlign: 'center',
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{
        fontSize: '48px',
        fontWeight: 'bold',
        background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '16px'
      }}>
        Analytics
      </h1>
      <p style={{
        fontSize: '18px',
        color: '#6b7280',
        marginBottom: '32px'
      }}>
        This section is under development
      </p>
      <button style={{
        background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
        color: 'white',
        padding: '12px 32px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '500'
      }}
      onClick={() => window.history.back()}>
        Go Back
      </button>
    </div>
  )
}