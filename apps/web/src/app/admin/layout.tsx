import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

async function getUser() {
  const cookieStore = cookies()
  const token = cookieStore.get('admitverse_session')?.value

  if (!token) {
    return null
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key') as any
    return decoded
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  // This layout should only be reached if user is authenticated
  // Middleware should redirect to /auth/login if no user
  // But let's add a safety check
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p>Authentication required. Redirecting...</p>
        </div>
      </div>
    )
  }

  // User is authenticated, show full admin layout
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: 'flex'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '256px',
        minHeight: '100vh',
        backgroundColor: 'white',
        borderRight: '1px solid #e5e7eb',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 30
      }}>
        <AdminSidebar />
      </div>
      
      {/* Main Content */}
      <div style={{ 
        flex: 1,
        paddingLeft: '256px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <AdminHeader user={user} />
        <main style={{ 
          flex: 1,
          padding: '0'
        }}>
          {children}
        </main>
      </div>
    </div>
  )
}