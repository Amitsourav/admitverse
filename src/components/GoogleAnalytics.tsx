'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: any
    ) => void
    dataLayer: any[]
  }
}

interface GoogleAnalyticsProps {
  gaId: string
}

export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views on route changes
  useEffect(() => {
    if (pathname && window.gtag) {
      const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')
      
      window.gtag('config', gaId, {
        page_path: url,
        page_title: document.title,
      })
    }
  }, [pathname, searchParams, gaId])

  if (!gaId) {
    console.warn('Google Analytics ID not configured')
    return null
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `,
        }}
      />
    </>
  )
}

// Helper function to track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Common event tracking functions
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_location: url,
      page_title: title || document.title,
    })
  }
}

export const trackButtonClick = (buttonName: string, page: string) => {
  trackEvent('click', 'button', `${buttonName}_${page}`)
}

export const trackFormSubmit = (formName: string, page: string) => {
  trackEvent('submit', 'form', `${formName}_${page}`)
}

export const trackSearch = (searchTerm: string, resultCount?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchTerm,
      result_count: resultCount,
    })
  }
}

export const trackUniversityView = (universityName: string, universityId: string | number) => {
  trackEvent('view_item', 'university', universityName, Number(universityId))
}

export const trackToolUse = (toolName: string) => {
  trackEvent('tool_use', 'calculator', toolName)
}

export const trackContactSubmit = (contactType: string) => {
  trackEvent('generate_lead', 'contact', contactType)
}

export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent('file_download', fileType, fileName)
}

// E-commerce style events for university applications
export const trackApplicationStart = (universityName: string, program: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      currency: 'USD',
      items: [{
        item_name: universityName,
        item_category: 'University Application',
        item_variant: program,
      }]
    })
  }
}

export const trackApplicationComplete = (universityName: string, program: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      currency: 'USD',
      transaction_id: Date.now().toString(),
      items: [{
        item_name: universityName,
        item_category: 'University Application',
        item_variant: program,
      }]
    })
  }
}