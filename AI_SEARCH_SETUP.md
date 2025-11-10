# AI-Powered Search Setup Guide

## Overview
The AdmitVerse search functionality has been enhanced with ChatGPT integration to provide intelligent, context-aware search results across universities, courses, and study destinations.

## Setup Instructions

### 1. Add OpenAI API Key

Add your OpenAI API key to the `.env` file:

```bash
OPENAI_API_KEY=your-openai-api-key-here
```

To get an OpenAI API key:
1. Go to https://platform.openai.com/
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy and paste it into your `.env` file

### 2. How It Works

#### Search Flow:
1. **User enters search query** → 
2. **Query sent to `/api/ai-search`** → 
3. **ChatGPT analyzes intent and context** → 
4. **AI extracts search parameters** → 
5. **Backend searches databases with AI parameters** → 
6. **Results returned with natural language response**

#### AI Features:
- **Intent Understanding**: ChatGPT understands what users are looking for
- **Smart Filtering**: Automatically extracts filters like country, field of study, budget
- **Natural Language Response**: Provides conversational explanations of results
- **Related Suggestions**: Offers related searches based on context
- **Fallback Mode**: Works without OpenAI API key using basic search

### 3. API Endpoint

**POST `/api/ai-search`**

Request body:
```json
{
  "query": "universities for computer science in USA",
  "context": "optional additional context"
}
```

Response:
```json
{
  "success": true,
  "query": "universities for computer science in USA",
  "interpretation": {
    "searchType": "university",
    "searchTerms": {
      "primary": "computer science",
      "related": ["CS", "programming", "software engineering"]
    },
    "filters": {
      "country": "USA",
      "field": "Computer Science"
    },
    "intent": "universities offering computer science programs in the USA",
    "suggestions": ["MIT", "Stanford Computer Science", "Top CS programs USA"]
  },
  "results": {
    "universities": [...],
    "courses": [...],
    "countries": [...]
  },
  "naturalResponse": "Based on your search for computer science universities in the USA...",
  "totalResults": 15
}
```

### 4. Frontend Integration

The search has been integrated in two places:

#### Home Page (`/src/app/page.tsx`):
- Search button now shows "AI Search" with sparkles icon
- Queries are processed through ChatGPT
- Results redirect to AI-powered search page

#### Search Page (`/src/app/search/ai-page.tsx`):
- Displays AI understanding of the query
- Shows natural language response
- Presents categorized results (Universities, Courses, Countries)
- Offers related search suggestions

### 5. Testing the AI Search

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Test searches**:
   - "best universities for MBA"
   - "study computer science in Canada"
   - "affordable countries for international students"
   - "top engineering programs"
   - "universities near Silicon Valley"

3. **Check AI features**:
   - Natural language understanding
   - Automatic filter detection
   - Related suggestions
   - Multi-category results

### 6. Customization

#### Modify AI Behavior:
Edit the system prompt in `/src/app/api/ai-search/route.ts`:
```typescript
const SYSTEM_PROMPT = `Your custom instructions...`
```

#### Adjust Search Logic:
Modify the `searchWithAIParameters` function to change how AI parameters are applied.

#### Change AI Model:
Update the model in the OpenAI call:
```typescript
model: 'gpt-4' // or 'gpt-3.5-turbo'
```

### 7. Cost Optimization

- Using GPT-3.5-turbo (recommended for search): ~$0.001 per search
- Using GPT-4: ~$0.03 per search
- Consider implementing caching for common searches
- Set up rate limiting for production

### 8. Production Considerations

1. **Environment Variables**:
   - Never commit API keys to git
   - Use environment variables in production (Vercel, etc.)

2. **Error Handling**:
   - System falls back to basic search if AI fails
   - Graceful degradation without API key

3. **Performance**:
   - AI search adds ~1-2 seconds latency
   - Consider implementing response caching
   - Use streaming responses for better UX

4. **Security**:
   - Implement rate limiting
   - Add authentication if needed
   - Validate and sanitize all inputs

### 9. Monitoring

Track these metrics:
- Average response time
- API costs
- Search success rate
- User satisfaction with AI responses
- Most common search queries

### 10. Future Enhancements

Potential improvements:
- Voice search integration
- Multi-language support
- Personalized search based on user profile
- Search history and analytics
- Advanced filters from natural language
- Integration with real university APIs
- Embeddings for semantic search

## Troubleshooting

### API Key Issues:
- Ensure `.env` file is in the root directory
- Restart dev server after adding API key
- Check API key has sufficient credits

### Search Not Working:
- Check browser console for errors
- Verify API endpoint is accessible
- Test with fallback mode (no API key)

### Slow Performance:
- Consider using GPT-3.5-turbo instead of GPT-4
- Implement caching for repeated queries
- Optimize database queries

## Support

For issues or questions:
- Check the browser console for detailed error messages
- Review the API logs in terminal
- Test the `/api/ai-search` endpoint directly