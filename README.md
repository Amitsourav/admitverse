# Admitverse - University Search and Management Platform

## Overview
Admitverse is a comprehensive web application for searching, browsing, and managing university information. Built with Next.js 14, TypeScript, and Tailwind CSS, it provides a modern interface for students to explore educational institutions worldwide.

## Features

### Core Features
- 🎓 **University Search**: Advanced search functionality with filters
- 🌍 **Country-based Browsing**: Browse universities by country
- 📚 **Course Discovery**: Explore available courses and programs
- 📱 **Mobile-Responsive Design**: Fully responsive across all devices
- 🔍 **Dynamic University Pages**: Individual pages for each university with detailed information
- 📞 **Lead Generation**: Mobile number popup for capturing user information
- 🛠️ **Admin Panel**: University management interface for administrators

### Technical Features
- Server-side rendering with Next.js App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Custom hooks for state management
- RESTful API endpoints
- Dynamic routing
- Responsive image handling

## Project Structure

```
admitverse/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── page.tsx            # Home page
│   │   ├── layout.tsx          # Root layout
│   │   ├── globals.css         # Global styles
│   │   ├── universities/       # Universities section
│   │   │   ├── page.tsx        # Universities listing
│   │   │   └── [slug]/         # Dynamic university pages
│   │   │       └── page.tsx
│   │   ├── countries/          # Countries section
│   │   │   └── page.tsx        # Countries listing
│   │   ├── courses/            # Courses section
│   │   │   └── page.tsx        # Courses listing
│   │   ├── search/             # Search functionality
│   │   │   └── page.tsx        # Search page
│   │   ├── admin/              # Admin panel
│   │   │   └── universities/   # University management
│   │   │       └── page.tsx
│   │   └── api/                # API routes
│   │       └── universities/   # University API endpoints
│   │           ├── route.ts    # GET all, POST new
│   │           └── [slug]/     
│   │               └── route.ts # GET, PUT, DELETE by slug
│   ├── components/             # React components
│   │   ├── Header.tsx          # Site header
│   │   ├── Footer.tsx          # Site footer
│   │   ├── SearchBar.tsx       # Search component
│   │   ├── UniversityCard.tsx  # University card component
│   │   ├── MobileNumberPopup.tsx # Lead capture popup
│   │   └── ...                 # Other components
│   ├── hooks/                  # Custom React hooks
│   │   ├── useMobilePopup.ts   # Mobile popup state management
│   │   └── useUniversities.ts  # Universities data hook
│   ├── lib/                    # Utility libraries
│   │   └── university-data.ts  # University data and helpers
│   └── types/                  # TypeScript type definitions
│       └── index.ts            # Shared types
├── public/                     # Static assets
│   ├── images/                 # Image assets
│   └── icons/                  # Icon files
├── .env                        # Environment variables (create from .env.example)
├── .gitignore                  # Git ignore rules
├── next.config.js              # Next.js configuration
├── package.json                # Project dependencies
├── package-lock.json           # Locked dependencies
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── postcss.config.js          # PostCSS configuration
```

## Installation

### Prerequisites
- Node.js 18.0 or later
- npm or yarn package manager
- Git

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/Amitsourav/admitverse.git
cd admitverse
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
# Database
DATABASE_URL=your_database_url

# API Keys (if applicable)
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Authentication (if implemented)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key

# Other configurations
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check

# Testing (if configured)
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
```

### Code Style Guidelines

- Use TypeScript for all new files
- Follow the existing component structure
- Use Tailwind CSS for styling
- Implement responsive design for all features
- Write meaningful commit messages
- Add proper TypeScript types for all data

## API Documentation

### University Endpoints

#### Get All Universities
```http
GET /api/universities
```
Response:
```json
[
  {
    "id": "1",
    "name": "University Name",
    "slug": "university-name",
    "location": "City, Country",
    "ranking": 1,
    "description": "...",
    "imageUrl": "..."
  }
]
```

#### Get University by Slug
```http
GET /api/universities/[slug]
```
Response:
```json
{
  "id": "1",
  "name": "University Name",
  "slug": "university-name",
  "location": "City, Country",
  "ranking": 1,
  "description": "...",
  "programs": [...],
  "facilities": [...],
  "admissionRequirements": {...}
}
```

#### Create University (Admin)
```http
POST /api/universities
Content-Type: application/json

{
  "name": "New University",
  "location": "City, Country",
  "description": "..."
}
```

#### Update University (Admin)
```http
PUT /api/universities/[slug]
Content-Type: application/json

{
  "name": "Updated Name",
  "location": "New Location"
}
```

#### Delete University (Admin)
```http
DELETE /api/universities/[slug]
```

## Components Documentation

### MobileNumberPopup
A modal component for capturing user phone numbers for lead generation.

```tsx
import { MobileNumberPopup } from '@/components/MobileNumberPopup';

// Usage
<MobileNumberPopup />
```

### UniversityCard
Displays university information in a card format.

```tsx
import { UniversityCard } from '@/components/UniversityCard';

// Usage
<UniversityCard 
  university={{
    name: "University Name",
    location: "Location",
    imageUrl: "/image.jpg"
  }}
/>
```

## Custom Hooks

### useMobilePopup
Manages the state and logic for the mobile number popup.

```tsx
import { useMobilePopup } from '@/hooks/useMobilePopup';

const { isOpen, openPopup, closePopup } = useMobilePopup();
```

### useUniversities
Fetches and manages university data.

```tsx
import { useUniversities } from '@/hooks/useUniversities';

const { universities, loading, error } = useUniversities();
```

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure environment variables
4. Deploy

### Manual Deployment
1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

### Environment Variables for Production
Ensure all environment variables are properly set in your deployment platform:
- DATABASE_URL
- NEXT_PUBLIC_API_URL
- NEXTAUTH_SECRET (if using authentication)
- Any other API keys

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

#### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

#### Build Errors
```bash
# Check for TypeScript errors
npm run type-check

# Check for linting errors
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is proprietary and confidential.

## Support

For support, email support@admitverse.com or open an issue in the GitHub repository.

## Changelog

### Latest Updates
- Added university management admin panel
- Implemented dynamic university pages
- Added mobile number popup for lead generation
- Created RESTful API endpoints
- Added custom hooks for state management
- Updated UI components with Tailwind CSS
- Improved search functionality
- Enhanced responsive design

---

**Note**: This documentation should be updated as new features are added or existing ones are modified.