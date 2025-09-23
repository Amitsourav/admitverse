import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

// Force dynamic rendering for admin routes
export const dynamic = 'force-dynamic'

async function getUser() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('admitverse_session')?.value

    if (!token) {
      return null
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET not found in environment variables')
      return null
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as any
    return decoded
  } catch (error) {
    console.error('JWT verification error:', error)
    return null
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  // Redirect unauthenticated users to login
  if (!user) {
    redirect('/auth/login')
  }

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