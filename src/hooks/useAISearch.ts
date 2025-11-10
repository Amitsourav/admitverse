import { useState, useCallback } from 'react'

export interface AISearchResult {
  success: boolean
  query: string
  interpretation: {
    searchType: 'university' | 'course' | 'country' | 'mixed'
    searchTerms: {
      primary: string
      related: string[]
    }
    filters: {
      country?: string
      field?: string
      level?: string
      ranking?: string
      budget?: string
    }
    intent: string
    suggestions: string[]
  }
  results: {
    universities: any[]
    courses: any[]
    countries: any[]
  }
  naturalResponse: string
  totalResults: number
  fallbackMode?: boolean
}

export const useAISearch = () => {
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<AISearchResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const searchWithAI = useCallback(async (query: string, context?: string) => {
    if (!query.trim()) {
      setError('Please enter a search query')
      return null
    }

    setIsSearching(true)
    setError(null)

    try {
      const response = await fetch('/api/ai-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, context }),
      })

      if (!response.ok) {
        throw new Error('Search failed. Please try again.')
      }

      const data = await response.json()
      setSearchResults(data)
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during search'
      setError(errorMessage)
      console.error('AI Search Error:', err)
      return null
    } finally {
      setIsSearching(false)
    }
  }, [])

  const clearResults = useCallback(() => {
    setSearchResults(null)
    setError(null)
  }, [])

  return {
    searchWithAI,
    isSearching,
    searchResults,
    error,
    clearResults,
  }
}