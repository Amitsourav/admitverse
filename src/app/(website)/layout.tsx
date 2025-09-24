import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FloatingActions from '@/components/FloatingActions'

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="website-container">
      <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <Navigation />
        {children}
        <Footer />
        <FloatingActions />
      </div>
    </div>
  )
}