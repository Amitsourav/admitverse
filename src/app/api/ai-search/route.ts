import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { searchUniversities } from '@/lib/university-data'
import { courses } from '@/data/courses'
import { countries } from '@/data/countries'

// Secure OpenAI client initialization
const initializeOpenAI = () => {
  const apiKey = process.env.OPENAI_API_KEY
  
  if (!apiKey) {
    console.warn('OPENAI_API_KEY environment variable not found')
    return null
  }
  
  if (apiKey.length < 20 || !apiKey.startsWith('sk-')) {
    console.warn('Invalid OpenAI API key format')
    return null
  }
  
  try {
    return new OpenAI({
      apiKey: apiKey,
      organization: process.env.OPENAI_ORGANIZATION || undefined,
    })
  } catch (error) {
    console.error('Failed to initialize OpenAI client:', error)
    return null
  }
}

const openai = initializeOpenAI()

// System prompt for AI search
const SYSTEM_PROMPT = `You are an intelligent education search assistant for AdmitVerse. 
Your role is to understand user search queries and return relevant educational information.

You have access to three databases:
1. Universities: Information about universities worldwide including rankings, locations, and programs
2. Courses: Various academic programs and fields of study
3. Countries: Study destinations and their educational systems

When a user searches, you should:
1. Understand the intent of their query
2. Identify what type of information they're looking for (university, course, or country)
3. Extract relevant search parameters like field of study, location, budget, etc.
4. Return structured search parameters that can be used to filter results

Return your response as a JSON object with the following structure:
{
  "searchType": "university" | "course" | "country" | "mixed",
  "searchTerms": {
    "primary": "main search term",
    "related": ["related", "terms"]
  },
  "filters": {
    "country": "country name or null",
    "field": "field of study or null",
    "level": "degree level or null",
    "ranking": "ranking range or null",
    "budget": "budget range or null"
  },
  "intent": "brief description of user intent",
  "suggestions": ["array of helpful suggestions or related searches"]
}`

interface AISearchResponse {
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

export async function POST(request: NextRequest) {
  let query = ''
  let context = ''
  
  try {
    const body = await request.json()
    query = body.query
    context = body.context || ''

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      )
    }

    // Check if OpenAI client is available
    if (!openai) {
      console.warn('OpenAI client not available, using fallback search')
      return fallbackSearch(query)
    }

    // Call OpenAI API to understand the search query
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { 
          role: 'user', 
          content: `Search query: "${query}"${context ? `\nContext: ${context}` : ''}` 
        }
      ],
      temperature: 0.3,
      max_tokens: 500,
      response_format: { type: 'json_object' }
    })

    const aiResponse = JSON.parse(completion.choices[0]?.message?.content || '{}') as AISearchResponse

    // Now use the AI response to search our data
    const results = await searchWithAIParameters(aiResponse)

    // Generate natural language response
    const nlResponse = await generateNaturalResponse(query, results, aiResponse)

    return NextResponse.json({
      success: true,
      query,
      interpretation: aiResponse,
      results,
      naturalResponse: nlResponse,
      totalResults: results.universities.length + results.courses.length + results.countries.length
    })

  } catch (error) {
    console.error('AI Search Error:', error)
    
    // Check if it's an OpenAI API error
    if (error instanceof Error) {
      if (error.message.includes('401')) {
        console.error('OpenAI API authentication failed. Please check your API key.')
      } else if (error.message.includes('429')) {
        console.error('OpenAI API rate limit exceeded.')
      } else if (error.message.includes('500') || error.message.includes('503')) {
        console.error('OpenAI API service is temporarily unavailable.')
      }
    }
    
    // Fallback to basic search if AI fails
    try {
      const body = await request.json().catch(() => ({ query: '' }))
      return fallbackSearch(body.query || query)
    } catch (fallbackError) {
      return NextResponse.json(
        { 
          error: 'Search service temporarily unavailable',
          success: false,
          fallbackMode: true 
        },
        { status: 503 }
      )
    }
  }
}

async function searchWithAIParameters(aiResponse: AISearchResponse) {
  const results = {
    universities: [] as any[],
    courses: [] as any[],
    countries: [] as any[]
  }

  const searchTerm = aiResponse.searchTerms.primary.toLowerCase()
  const relatedTerms = aiResponse.searchTerms.related.map(t => t.toLowerCase())

  // Search universities
  if (aiResponse.searchType === 'university' || aiResponse.searchType === 'mixed') {
    const universityResults = searchUniversities(
      searchTerm,
      aiResponse.filters.country || 'all',
      aiResponse.filters.ranking || 'all'
    )

    // Also check related terms
    for (const term of relatedTerms) {
      const additionalResults = searchUniversities(term, 'all', 'all')
      universityResults.push(...additionalResults.filter(u => 
        !universityResults.find(existing => existing.id === u.id)
      ))
    }

    results.universities = universityResults.slice(0, 10)
  }

  // Search courses
  if (aiResponse.searchType === 'course' || aiResponse.searchType === 'mixed') {
    const courseResults = courses.filter(course => {
      const matchesPrimary = 
        course.name.toLowerCase().includes(searchTerm) ||
        course.field.toLowerCase().includes(searchTerm) ||
        course.description.toLowerCase().includes(searchTerm) ||
        course.skills.some(skill => skill.toLowerCase().includes(searchTerm))

      const matchesRelated = relatedTerms.some(term =>
        course.name.toLowerCase().includes(term) ||
        course.field.toLowerCase().includes(term) ||
        course.skills.some(skill => skill.toLowerCase().includes(term))
      )

      const matchesLevel = !aiResponse.filters.level || 
        course.level.toLowerCase() === aiResponse.filters.level.toLowerCase()

      return (matchesPrimary || matchesRelated) && matchesLevel
    })

    results.courses = courseResults.slice(0, 10)
  }

  // Search countries
  if (aiResponse.searchType === 'country' || aiResponse.searchType === 'mixed') {
    const countryResults = countries.filter(country => {
      const matchesPrimary = 
        country.name.toLowerCase().includes(searchTerm) ||
        country.continent.toLowerCase().includes(searchTerm) ||
        country.popularPrograms.some(p => p.toLowerCase().includes(searchTerm))

      const matchesRelated = relatedTerms.some(term =>
        country.name.toLowerCase().includes(term) ||
        country.popularPrograms.some(p => p.toLowerCase().includes(term))
      )

      return matchesPrimary || matchesRelated
    })

    results.countries = countryResults.slice(0, 10)
  }

  return results
}

async function generateNaturalResponse(
  query: string, 
  results: any, 
  interpretation: AISearchResponse
): Promise<string> {
  const totalResults = results.universities.length + results.courses.length + results.countries.length

  if (totalResults === 0) {
    return `I couldn't find specific results for "${query}". Try searching for universities by name (e.g., "Harvard"), courses by field (e.g., "Computer Science"), or countries (e.g., "USA").`
  }

  let response = `Based on your search for "${query}", `

  if (interpretation.intent) {
    response += `I understand you're looking for ${interpretation.intent}. `
  }

  response += `Here's what I found:\n\n`

  if (results.universities.length > 0) {
    response += `**Universities (${results.universities.length} found):**\n`
    results.universities.slice(0, 3).forEach((uni: any) => {
      response += `• ${uni.name} - ${uni.location} (Rank #${uni.ranking})\n`
    })
    response += '\n'
  }

  if (results.courses.length > 0) {
    response += `**Courses (${results.courses.length} found):**\n`
    results.courses.slice(0, 3).forEach((course: any) => {
      response += `• ${course.name} - ${course.level} (${course.duration})\n`
    })
    response += '\n'
  }

  if (results.countries.length > 0) {
    response += `**Study Destinations (${results.countries.length} found):**\n`
    results.countries.slice(0, 3).forEach((country: any) => {
      response += `• ${country.name} - ${country.universities}+ universities\n`
    })
    response += '\n'
  }

  if (interpretation.suggestions.length > 0) {
    response += `**You might also want to search for:**\n`
    interpretation.suggestions.slice(0, 3).forEach(suggestion => {
      response += `• ${suggestion}\n`
    })
  }

  return response
}

// Fallback search when OpenAI is not available
function fallbackSearch(query: string) {
  const searchTerm = query.toLowerCase()
  
  // Simple keyword-based search
  const universityResults = searchUniversities(searchTerm, 'all', 'all')
  
  const courseResults = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm) ||
    course.field.toLowerCase().includes(searchTerm) ||
    course.skills.some(skill => skill.toLowerCase().includes(searchTerm))
  )
  
  const countryResults = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm) ||
    country.continent.toLowerCase().includes(searchTerm)
  )

  return NextResponse.json({
    success: true,
    query,
    interpretation: {
      searchType: 'mixed',
      searchTerms: {
        primary: query,
        related: []
      },
      filters: {},
      intent: 'general search',
      suggestions: []
    },
    results: {
      universities: universityResults.slice(0, 10),
      courses: courseResults.slice(0, 10),
      countries: countryResults.slice(0, 10)
    },
    naturalResponse: `Found ${universityResults.length + courseResults.length + countryResults.length} results for "${query}"`,
    totalResults: universityResults.length + courseResults.length + countryResults.length,
    fallbackMode: true
  })
}