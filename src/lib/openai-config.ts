import OpenAI from 'openai'

// Centralized OpenAI configuration
class OpenAIService {
  private client: OpenAI | null = null
  private isConfigured = false

  constructor() {
    this.initialize()
  }

  private initialize() {
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey || apiKey === '' || apiKey === 'your-actual-openai-api-key-here') {
      console.warn('⚠️ OpenAI API key not configured. AI features will use fallback mode.')
      this.isConfigured = false
      return
    }

    if (!apiKey.startsWith('sk-')) {
      console.error('❌ Invalid OpenAI API key format. Key must start with "sk-"')
      this.isConfigured = false
      return
    }

    try {
      this.client = new OpenAI({
        apiKey,
        organization: process.env.OPENAI_ORGANIZATION || undefined,
        timeout: 30000, // 30 seconds timeout
        maxRetries: 2,
      })
      this.isConfigured = true
      console.log('✅ OpenAI client initialized successfully')
    } catch (error) {
      console.error('❌ Failed to initialize OpenAI client:', error)
      this.isConfigured = false
    }
  }

  getClient(): OpenAI | null {
    return this.client
  }

  isReady(): boolean {
    return this.isConfigured && this.client !== null
  }

  async testConnection(): Promise<boolean> {
    if (!this.isReady()) return false

    try {
      const response = await this.client!.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Test connection' }],
        max_tokens: 5,
      })
      
      console.log('✅ OpenAI API connection test successful')
      return true
    } catch (error) {
      console.error('❌ OpenAI API connection test failed:', error)
      return false
    }
  }

  // Enhanced chat completion with error handling and retries
  async createChatCompletion(params: OpenAI.Chat.Completions.ChatCompletionCreateParams) {
    if (!this.isReady()) {
      throw new Error('OpenAI client not configured')
    }

    try {
      return await this.client!.chat.completions.create(params)
    } catch (error: any) {
      // Enhanced error handling
      if (error?.status === 401) {
        throw new Error('OpenAI API authentication failed. Please check your API key.')
      } else if (error?.status === 429) {
        throw new Error('OpenAI API rate limit exceeded. Please try again later.')
      } else if (error?.status === 500 || error?.status === 503) {
        throw new Error('OpenAI API service temporarily unavailable.')
      } else if (error?.status === 400) {
        throw new Error(`OpenAI API request error: ${error?.message || 'Invalid request'}`)
      }
      
      throw error
    }
  }
}

// Singleton instance
export const openaiService = new OpenAIService()

// Helper function for components
export const isOpenAIConfigured = () => openaiService.isReady()

// Default models configuration
export const OPENAI_MODELS = {
  CHAT: 'gpt-3.5-turbo',
  CHAT_ADVANCED: 'gpt-4',
  EMBEDDING: 'text-embedding-ada-002',
} as const

// Common prompts and configurations
export const AI_PROMPTS = {
  UNIVERSITY_SEARCH: `You are an expert education counselor specializing in international university admissions. 
Your role is to understand user search queries and provide relevant university recommendations.

When a user searches, analyze their intent and return structured search parameters.`,
  
  STUDENT_MATCHING: `You are an expert education counselor specializing in university admissions. 
Your role is to analyze student profiles and recommend the best matching universities based on their academic profile, preferences, and goals.`,
  
  ESSAY_REVIEW: `You are an experienced admissions counselor who specializes in reviewing application essays and statements of purpose.
Provide constructive feedback on structure, content, clarity, and overall impact.`,
} as const

export default openaiService