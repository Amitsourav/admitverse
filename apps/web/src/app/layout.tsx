import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@/styles/rich-text.css'
import { ToastProvider } from '@/components/Toast'

// Force dynamic rendering to prevent static generation issues with Framer Motion
export const dynamic = 'force-dynamic'
export const revalidate = 0

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AdmitVerse - Your Gateway to International Education',
  description: 'Discover top universities worldwide. Get personalized recommendations for colleges, courses, and specializations that match your profile.',
  keywords: [
    'study abroad',
    'international education',
    'universities',
    'colleges',
    'courses',
    'admissions',
    'education abroad',
    'higher education'
  ],
  authors: [{ name: 'AdmitVerse Team' }],
  creator: 'AdmitVerse',
  publisher: 'AdmitVerse',
  openGraph: {
    title: 'AdmitVerse - Your Gateway to International Education',
    description: 'Discover top universities worldwide. Get personalized recommendations for colleges, courses, and specializations.',
    url: 'https://admitverse.com',
    siteName: 'AdmitVerse',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AdmitVerse - Gateway to International Education',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AdmitVerse - Your Gateway to International Education',
    description: 'Discover top universities worldwide. Get personalized recommendations.',
    images: ['/twitter-image.jpg'],
    creator: '@admitverse',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#667eea" />
      </head>
      <body className={inter.className}>
        <ToastProvider>
          <div className="min-h-screen bg-background">
            {children}
          </div>
        </ToastProvider>
      </body>
    </html>
  )
}